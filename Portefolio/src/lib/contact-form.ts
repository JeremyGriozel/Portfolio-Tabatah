export const contactFormLimits = {
	name: 100,
	email: 254,
	subject: 160,
	message: 5000,
	request: 12000,
} as const;

export interface ContactFormPayload {
	name: string;
	email: string;
	subject: string;
	message: string;
	website: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getTextValue = (value: unknown) => (typeof value === 'string' ? value : '');

export function validateContactForm(input: unknown): ContactFormPayload | null {
	if (!input || typeof input !== 'object') return null;

	const values = input as Record<string, unknown>;
	const payload = {
		name: getTextValue(values.name).trim().replace(/\s+/g, ' '),
		email: getTextValue(values.email).trim().toLowerCase(),
		subject: getTextValue(values.subject).trim().replace(/\s+/g, ' '),
		message: getTextValue(values.message).trim().replace(/\r\n?/g, '\n'),
		website: getTextValue(values.website).trim(),
	};

	if (payload.website) return payload;
	if (!payload.name || payload.name.length > contactFormLimits.name) return null;
	if (!payload.email || payload.email.length > contactFormLimits.email || !emailPattern.test(payload.email)) return null;
	if (!payload.subject || payload.subject.length > contactFormLimits.subject) return null;
	if (!payload.message || payload.message.length > contactFormLimits.message) return null;

	return payload;
}
