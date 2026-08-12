import { collection, config, fields } from '@keystatic/core';

const useLocalStorage = import.meta.env.DEV && import.meta.env.MODE !== 'keystatic-github';

const storage = useLocalStorage
	? ({ kind: 'local' } as const)
	: ({
			kind: 'github',
			repo: 'JeremyGriozel/Portfolio-Tabatah',
			pathPrefix: 'Portefolio',
		} as const);

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
	ui: {
		brand: { name: 'Portfolio — Administration' },
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
});
