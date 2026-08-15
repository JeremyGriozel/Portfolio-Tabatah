import contactData from './contact.json';
import siteContent from './site-content.json';

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

export const contactContent = siteContent.contact;
