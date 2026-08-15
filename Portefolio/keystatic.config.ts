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

const projectCover =
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
			aspect: fields.select({
				label: 'Proportion d’affichage',
				options: imageAspects,
				defaultValue: 'landscape',
			}),
		},
		{ label: 'Image de couverture' },
	);

const galleryImage = fields.image({
	label: 'Image de galerie',
	directory: 'public/images/projects',
	publicPath: '/images/projects/',
	validation: { isRequired: true },
});

export default config({
	storage,
	cloud: {
    	project: 'jeremy-tabatah/portfolio-tabatah',
  	},
	ui: {
		brand: { name: 'Portfolio — Administration' },
		navigation: ['projects', 'siteContent', 'cv', 'contact'],
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
				cover: projectCover,
				gallery: fields.array(galleryImage, {
					label: 'Galerie',
					description: 'Ajoutez, supprimez ou réorganisez les images. Chaque image affiche son aperçu natif.',
					itemLabel: ({ value }) => value?.filename || 'Nouvelle image',
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
		siteContent: singleton({
			label: 'Contenus du site',
			path: 'src/data/site-content',
			format: 'json',
			schema: {
				profileImage: fields.image({
					label: 'Photo de profil / photo principale',
					directory: 'public/images/profile',
					publicPath: '/images/profile/',
					validation: { isRequired: true },
				}),
				profileImageAlt: fields.text({
					label: 'Description accessible de la photo',
					validation: { isRequired: true },
				}),
				profileImageCaption: fields.text({ label: 'Légende facultative de la photo' }),
				home: fields.object(
					{
						carousel: fields.object(
							{
								title: fields.text({
									label: 'Titre du Hero',
									validation: { isRequired: true },
								}),
								quote: fields.text({
									label: 'Phrase inspirante',
									multiline: true,
									validation: { isRequired: true },
								}),
								images: fields.array(
									fields.object({
										src: fields.image({
											label: 'Image',
											directory: 'public/images/home/carousel',
											publicPath: '/images/home/carousel/',
											validation: { isRequired: true },
										}),
										alt: fields.text({
											label: 'Texte alternatif',
											description: 'Décrivez brièvement la photographie pour les personnes qui ne peuvent pas la voir.',
											validation: { isRequired: true },
										}),
									}),
									{
										label: "Images du carousel d'accueil",
										description: 'Ajoutez, supprimez ou réorganisez les images du Hero.',
										itemLabel: ({ fields }) => fields.alt.value || 'Nouvelle image',
									},
								),
							},
							{ label: "Hero carousel" },
						),
						hero: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Prénom et nom', validation: { isRequired: true } }),
								profession: fields.text({ label: 'Métier ou activité', validation: { isRequired: true } }),
								intro: fields.text({ label: 'Introduction', multiline: true, validation: { isRequired: true } }),
								primaryActionLabel: fields.text({ label: 'Libellé du lien Portfolio', validation: { isRequired: true } }),
								secondaryActionLabel: fields.text({ label: 'Libellé du lien CV', validation: { isRequired: true } }),
							},
							{ label: 'Hero' },
						),
						about: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
								paragraphs: fields.array(
									fields.text({ label: 'Paragraphe', multiline: true, validation: { isRequired: true } }),
									{ label: 'Paragraphes', itemLabel: ({ value }) => value || 'Nouveau paragraphe' },
								),
								linkLabel: fields.text({ label: 'Libellé du lien CV', validation: { isRequired: true } }),
							},
							{ label: 'Présentation' },
						),
						featured: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
								description: fields.text({ label: 'Description', multiline: true }),
								emptyMessage: fields.text({ label: 'Message sans projet', validation: { isRequired: true } }),
								linkLabel: fields.text({ label: 'Libellé du lien Portfolio', validation: { isRequired: true } }),
							},
							{ label: 'Projets mis en avant' },
						),
						cta: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
								text: fields.text({ label: 'Texte', multiline: true, validation: { isRequired: true } }),
								primaryActionLabel: fields.text({ label: 'Libellé du lien Portfolio', validation: { isRequired: true } }),
								secondaryActionLabel: fields.text({ label: 'Libellé du lien Contact', validation: { isRequired: true } }),
							},
							{ label: 'Appel final' },
						),
					},
					{ label: 'Page Qui suis-je' },
				),
				portfolio: fields.object(
					{
						index: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
								description: fields.text({ label: 'Introduction', multiline: true, validation: { isRequired: true } }),
							},
							{ label: 'Introduction du portfolio' },
						),
						expertise: fields.object(
							{
								eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
								title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
								introduction: fields.text({ label: 'Introduction', multiline: true, validation: { isRequired: true } }),
								items: fields.array(
									fields.object({
										title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
										description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
									}),
									{ label: 'Compétences', itemLabel: ({ fields }) => fields.title.value || 'Nouvelle compétence' },
								),
							},
							{ label: 'Compétences' },
						),
						categories: fields.object(
							{
								photography: fields.object({
									label: fields.text({ label: 'Nom affiché', validation: { isRequired: true } }),
									description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
								}, { label: 'Photographie' }),
								illustration: fields.object({
									label: fields.text({ label: 'Nom affiché', validation: { isRequired: true } }),
									description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
								}, { label: 'Illustration numérique' }),
								artDirection: fields.object({
									label: fields.text({ label: 'Nom affiché', validation: { isRequired: true } }),
									description: fields.text({ label: 'Description', multiline: true, validation: { isRequired: true } }),
								}, { label: 'Direction artistique' }),
							},
							{ label: 'Catégories' },
						),
						filtersLabel: fields.text({ label: 'Libellé des filtres', validation: { isRequired: true } }),
						allProjectsLabel: fields.text({ label: 'Libellé Tous les projets', validation: { isRequired: true } }),
						emptyMessage: fields.text({ label: 'Message sans projet', validation: { isRequired: true } }),
						project: fields.object({
							backLabel: fields.text({ label: 'Retour au portfolio', validation: { isRequired: true } }),
							detailsTitle: fields.text({ label: 'Titre de la description', validation: { isRequired: true } }),
							toolsTitle: fields.text({ label: 'Titre des outils', validation: { isRequired: true } }),
							galleryTitle: fields.text({ label: 'Titre de la galerie', validation: { isRequired: true } }),
							navigationTitle: fields.text({ label: 'Titre de navigation', validation: { isRequired: true } }),
							previousLabel: fields.text({ label: 'Projet précédent', validation: { isRequired: true } }),
							nextLabel: fields.text({ label: 'Projet suivant', validation: { isRequired: true } }),
						}, { label: 'Page projet' }),
					},
					{ label: 'Portfolio' },
				),
				contact: fields.object(
					{
						page: fields.object({
							eyebrow: fields.text({ label: 'Petit titre', validation: { isRequired: true } }),
							title: fields.text({ label: 'Titre', validation: { isRequired: true } }),
							intro: fields.text({ label: 'Introduction', multiline: true, validation: { isRequired: true } }),
						}, { label: 'Introduction' }),
						info: fields.object({
							title: fields.text({ label: 'Titre des coordonnées', validation: { isRequired: true } }),
							emailLabel: fields.text({ label: 'Libellé e-mail', validation: { isRequired: true } }),
							phoneLabel: fields.text({ label: 'Libellé téléphone', validation: { isRequired: true } }),
							locationLabel: fields.text({ label: 'Libellé localisation', validation: { isRequired: true } }),
							socialsLabel: fields.text({ label: 'Libellé réseaux', validation: { isRequired: true } }),
						}, { label: 'Libellés des coordonnées' }),
						form: fields.object({
							nameLabel: fields.text({ label: 'Champ nom', validation: { isRequired: true } }),
							namePlaceholder: fields.text({ label: 'Exemple du nom', validation: { isRequired: true } }),
							emailLabel: fields.text({ label: 'Champ e-mail', validation: { isRequired: true } }),
							emailPlaceholder: fields.text({ label: 'Exemple de l’e-mail', validation: { isRequired: true } }),
							subjectLabel: fields.text({ label: 'Champ sujet', validation: { isRequired: true } }),
							subjectPlaceholder: fields.text({ label: 'Exemple du sujet', validation: { isRequired: true } }),
							messageLabel: fields.text({ label: 'Champ message', validation: { isRequired: true } }),
							messagePlaceholder: fields.text({ label: 'Exemple du message', validation: { isRequired: true } }),
							submitLabel: fields.text({ label: 'Bouton d’envoi', validation: { isRequired: true } }),
							helpText: fields.text({ label: 'Texte d’aide', multiline: true, validation: { isRequired: true } }),
							sendingMessage: fields.text({ label: 'Message pendant l’envoi', validation: { isRequired: true } }),
							successMessage: fields.text({ label: 'Message de succès', validation: { isRequired: true } }),
							errorMessage: fields.text({ label: 'Message d’erreur', validation: { isRequired: true } }),
						}, { label: 'Formulaire' }),
					},
					{ label: 'Textes de Contact' },
				),
			},
		}),
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
