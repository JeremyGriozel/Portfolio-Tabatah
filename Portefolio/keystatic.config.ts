import { collection, config, fields, singleton } from '@keystatic/core';

const useLocalStorage =
  import.meta.env.DEV &&
  import.meta.env.MODE !== 'keystatic-cloud';

const storage = useLocalStorage
  ? ({ kind: 'local' } as const)
  : ({
      kind: 'cloud',
      pathPrefix: 'Portefolio',
    } as const);

const emailPattern = {
	regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	message: 'Saisissez une adresse e-mail valide.',
};

const imageAspects = [
	{ label: 'Automatique', value: 'auto' },
	{ label: 'Portrait', value: 'portrait' },
	{ label: 'Paysage', value: 'landscape' },
	{ label: 'Carré', value: 'square' },
	{ label: 'Panoramique', value: 'wide' },
] as const;

const projectImage = (label: string) =>
	fields.object(
		{
			src: fields.image({
				label: 'Fichier image',
				directory: 'public/images/projects',
				publicPath: '/images/projects/',
				validation: { isRequired: true },
			}),
			alt: fields.text({
				label: 'Texte alternatif',
				description: "Décrivez brièvement l’image pour les personnes qui ne peuvent pas la voir.",
				validation: { isRequired: true },
			}),
			caption: fields.text({ label: 'Légende' }),
			aspect: fields.select({
				label: 'Proportion d’affichage',
				options: imageAspects,
				defaultValue: 'auto',
			}),
			width: fields.integer({ label: 'Largeur en pixels', validation: { min: 1 } }),
			height: fields.integer({ label: 'Hauteur en pixels', validation: { min: 1 } }),
		},
		{ label },
	);

export default config({
	storage,
	cloud: {
    	project: 'jeremy-tabatah/portfolio-tabatah',
  	},
	ui: {
		brand: { name: 'Portfolio — Administration' },
		navigation: ['projects', 'cv', 'contact'],
	},
	collections: {
		projects: collection({
			label: 'Projets',
			path: 'src/content/projects/*',
			slugField: 'slug',
			columns: ['title', 'category', 'published', 'featured', 'order'],
			format: { contentField: '_content' },
			schema: {
				slug: fields.slug({
					name: {
						label: 'Identifiant du projet',
						description: 'Conservez-le identique au slug de l’URL publique.',
						validation: { isRequired: true },
					},
					slug: {
						label: 'Slug du fichier et de l’URL',
						description: 'Exemple : portraits-en-lumiere. Le modifier change l’URL du projet.',
					},
				}),
				title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
				category: fields.select({
					label: 'Catégorie',
					options: [
						{ label: 'Photographie', value: 'photographie' },
						{ label: 'Illustration numérique', value: 'illustration' },
						{ label: 'Direction artistique', value: 'direction-artistique' },
					],
					defaultValue: 'photographie',
				}),
				date: fields.date({ label: 'Date', validation: { isRequired: true } }),
				shortDescription: fields.text({
					label: 'Description courte',
					multiline: true,
					validation: { isRequired: true },
				}),
				detailedDescription: fields.text({ label: 'Description détaillée', multiline: true }),
				cover: projectImage('Image de couverture'),
				gallery: fields.array(projectImage('Image de galerie'), {
					label: 'Galerie',
					description: 'Ajoutez, supprimez ou réorganisez les images par glisser-déposer.',
					itemLabel: ({ fields }) => fields.alt.value || 'Nouvelle image',
				}),
				tools: fields.array(fields.text({ label: 'Outil ou technique' }), {
					label: 'Outils et techniques',
					itemLabel: ({ value }) => value || 'Nouvel outil',
				}),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: ({ value }) => value || 'Nouveau tag',
				}),
				featured: fields.checkbox({ label: 'Projet mis en avant', defaultValue: false }),
				order: fields.integer({ label: 'Ordre d’affichage', defaultValue: 0, validation: { min: 0 } }),
				published: fields.checkbox({ label: 'Projet publié', defaultValue: true }),
				_content: fields.emptyContent({ extension: 'md' }),
			},
		}),
	},
	singletons: {
		cv: singleton({
			label: 'CV',
			path: 'src/data/cv',
			format: 'json',
			schema: {
				cv: fields.file({
					label: 'Fichier PDF du CV',
					description: 'Sélectionnez un fichier PDF. Il remplacera le CV actuellement publié.',
					directory: 'public/documents',
					publicPath: '/documents/',
					validation: { isRequired: true },
				}),
			},
		}),
		contact: singleton({
			label: 'Contact',
			path: 'src/data/contact',
			format: 'json',
			schema: {
				publicEmail: fields.text({
					label: 'Adresse e-mail affichée',
					validation: { isRequired: true, pattern: emailPattern },
				}),
				phone: fields.text({ label: 'Numéro de téléphone' }),
				showPhone: fields.checkbox({
					label: 'Afficher le téléphone',
					defaultValue: true,
				}),
				location: fields.text({ label: 'Localisation' }),
				socials: fields.array(
					fields.object({
						label: fields.text({ label: 'Nom du réseau', validation: { isRequired: true } }),
						href: fields.url({ label: 'Lien', validation: { isRequired: true } }),
					}),
					{
						label: 'Réseaux sociaux',
						itemLabel: ({ fields }) => fields.label.value || 'Nouveau réseau',
					},
				),
				formRecipient: fields.text({
					label: 'Adresse de réception du formulaire',
					description: 'Cette adresse reste côté serveur et reçoit les messages envoyés depuis le site.',
					validation: { isRequired: true, pattern: emailPattern },
				}),
			},
		}),
	},
});
