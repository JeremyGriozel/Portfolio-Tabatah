import contactData from './contact.json';

export interface ContactConfig {
	publicEmail: string;
	phone: string;
	showPhone: boolean;
	location: string;
	socials: Array<{
		label: string;
		href: string;
	}>;
	formRecipient: string;
}

export const contactConfig: ContactConfig = contactData;

export const contactContent = {
	page: {
		eyebrow: 'Contact',
		title: 'Parlons de votre prochain projet.',
		intro:
			"Pour une collaboration, une commande ou simplement une question, laissez un message.",
	},
	info: {
		title: 'Coordonnées',
		emailLabel: 'E-mail',
		phoneLabel: 'Téléphone',
		locationLabel: 'Localisation',
		socialsLabel: 'Réseaux',
	},
	form: {
		nameLabel: 'Nom',
		namePlaceholder: 'Votre nom',
		emailLabel: 'E-mail',
		emailPlaceholder: 'vous@exemple.fr',
		subjectLabel: 'Sujet',
		subjectPlaceholder: 'Votre projet en quelques mots',
		messageLabel: 'Message',
		messagePlaceholder: 'Contexte, besoins, calendrier…',
		submitLabel: 'Envoyer le message',
		helpText: 'Tous les champs sont obligatoires. Vos coordonnées servent uniquement à vous répondre.',
		sendingMessage: 'Envoi en cours...',
		successMessage: 'Votre message a bien été envoyé.',
		errorMessage: 'Une erreur est survenue. Veuillez réessayer.',
	},
} as const;
