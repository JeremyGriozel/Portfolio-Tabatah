import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import contactConfig from '../../data/contact.json';
import { contactFormLimits, validateContactForm } from '../../lib/contact-form';

export const prerender = false;

const resendEndpoint = 'https://api.resend.com/emails';
const sender = 'Tabatah Lux <contact@tabatah-lux.fr>';
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jsonResponse = (status: number, body: { success: boolean; message?: string }) =>
	new Response(JSON.stringify(body), {
		status,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});

async function readPayload(request: Request): Promise<unknown> {
	const contentType = request.headers.get('content-type') ?? '';

	if (contentType.includes('application/json')) {
		return request.json();
	}

	if (
		contentType.includes('application/x-www-form-urlencoded') ||
		contentType.includes('multipart/form-data')
	) {
		return Object.fromEntries(await request.formData());
	}

	throw new Error('Unsupported content type');
}

export const POST: APIRoute = async ({ request }) => {
	const contentLength = Number(request.headers.get('content-length') ?? 0);
	if (contentLength > contactFormLimits.request) {
		return jsonResponse(413, { success: false, message: "Impossible d'envoyer le message." });
	}

	let input: unknown;
	try {
		input = await readPayload(request);
	} catch {
		return jsonResponse(400, { success: false, message: 'Données de formulaire invalides.' });
	}

	const payload = validateContactForm(input);
	if (!payload) {
		return jsonResponse(400, { success: false, message: 'Données de formulaire invalides.' });
	}

	// Le honeypot répond comme un envoi réussi afin de ne pas aider les robots à le contourner.
	if (payload.website) {
		return jsonResponse(200, { success: true });
	}

	const recipient = contactConfig.formRecipient.trim().toLowerCase();
	if (!emailPattern.test(recipient)) {
		return jsonResponse(500, { success: false, message: "Impossible d'envoyer le message." });
	}

	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		return jsonResponse(503, { success: false, message: "Impossible d'envoyer le message." });
	}

	const emailText = [
		'Nouveau message depuis tabatah-lux.fr',
		'',
		'Nom :',
		payload.name,
		'',
		'Email :',
		payload.email,
		'',
		'Sujet :',
		payload.subject,
		'',
		'Message :',
		payload.message,
	].join('\n');

	try {
		const resendResponse = await fetch(resendEndpoint, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: sender,
				to: [recipient],
				reply_to: payload.email,
				subject: `[Portfolio Tabatah] ${payload.subject}`,
				text: emailText,
			}),
		});

		if (!resendResponse.ok) {
			return jsonResponse(502, { success: false, message: "Impossible d'envoyer le message." });
		}

		return jsonResponse(200, { success: true });
	} catch {
		return jsonResponse(502, { success: false, message: "Impossible d'envoyer le message." });
	}
};

export const ALL: APIRoute = () =>
	new Response(JSON.stringify({ success: false, message: 'Méthode non autorisée.' }), {
		status: 405,
		headers: {
			Allow: 'POST',
			'Content-Type': 'application/json; charset=utf-8',
			'Cache-Control': 'no-store',
		},
	});
