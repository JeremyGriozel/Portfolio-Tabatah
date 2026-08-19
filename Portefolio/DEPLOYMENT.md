# Déploiement et administration

## Développement local

```bash
npm install
npm run dev
```

Le site est accessible sur `http://localhost:4321` et le CMS local sur
`http://localhost:4321/keystatic`.

Pour tester l'envoi d'e-mails localement, créer un fichier `.env` non versionné avec :

```env
RESEND_API_KEY=la_cle_resend_reelle
```

## Contenu

- Projets Markdown : `src/content/projects/`
- Images des projets : `public/images/projects/`
- Configuration du CV : `src/data/cv.json`
- PDF du CV : `public/documents/cv.pdf`
- Configuration Contact : `src/data/contact.json`
- Textes généraux : `src/data/`

## Git

```bash
git status
git add .
git commit -m "Description de la modification"
git push
```

Les enregistrements effectués depuis Keystatic Cloud créent directement les modifications dans GitHub. Cloudflare reconstruit ensuite le site depuis la branche `main`.

## Keystatic

En développement, `npm run dev` utilise le stockage local. En production,
Keystatic Cloud utilise le projet configuré et le préfixe de dépôt `Portefolio`.

## Modifier le CV

```text
tabatah-lux.fr/keystatic
→ CV
→ sélectionner le PDF
→ Save
```

Le fichier sélectionné remplace `public/documents/cv.pdf`. Le PDF reste l'unique source du CV.

## Modifier les coordonnées

```text
tabatah-lux.fr/keystatic
→ Contact
→ modifier les informations
→ Save
```

Les informations enregistrées alimentent la page Contact et le footer.

## Changer l'adresse recevant les formulaires

```text
Keystatic
→ Contact
→ Adresse de réception du formulaire
```

Valeur initiale : `lux.tabatahpro@gmail.com`. Cette valeur est lue uniquement côté serveur.

## Architecture formulaire

```text
Contact Astro
→ Cloudflare Worker
→ Resend
→ adresse configurée dans Keystatic
```

La route `POST /api/contact` valide les champs et le honeypot, puis appelle l'API Resend. La clé Resend n'est jamais envoyée au navigateur.

## Variables d'environnement

- `RESEND_API_KEY` : secret d'exécution du Worker Cloudflare.
- Les variables Keystatic existantes restent nécessaires à Keystatic Cloud.

## Déploiement

- Hébergeur : Cloudflare Workers
- Branche de production : `main`
- Répertoire racine du build : `Portefolio`
- Commande de build : `npm run build`
- Commande de déploiement : `npx wrangler deploy`
- Publication : automatique après un commit GitHub

## Configuration Resend

1. Créer ou configurer le compte Resend.
2. Ajouter le domaine `tabatah-lux.fr` dans Resend.
3. Copier les enregistrements DNS SPF et DKIM fournis par Resend.
4. Ajouter exactement ces enregistrements dans la zone DNS Cloudflare, sans modifier les autres enregistrements.
5. Attendre que le domaine soit indiqué comme vérifié dans Resend.
6. Créer une API Key disposant du droit d'envoi.
7. Dans Cloudflare, ouvrir le Worker `portfolio-tabatah`, puis **Settings → Variables and Secrets** et ajouter `RESEND_API_KEY` comme **Secret**.
8. Déclencher un nouveau déploiement depuis GitHub.
9. Envoyer un formulaire test depuis `https://tabatah-lux.fr/contact/`.
10. Vérifier sa réception sur `lux.tabatahpro@gmail.com` et tester le bouton Répondre.

L'expéditeur configuré est `contact@tabatah-lux.fr`. L'adresse du visiteur est utilisée uniquement comme `Reply-To`.

## Protection anti-spam future

Le formulaire utilise déjà un honeypot et une validation serveur. Cloudflare Turnstile pourra être ajouté ultérieurement avec une clé de site publique côté formulaire et une clé secrète côté Worker, sans changer l'architecture d'envoi.

## Mise à jour du contenu

```text
connexion à Keystatic
→ modification
→ Save
→ commit GitHub
→ rebuild Cloudflare
→ site public mis à jour
```

## Google Search Console

1. Ouvrir [Google Search Console](https://search.google.com/search-console/).
2. Ajouter une propriété de type **Domaine**.
3. Saisir `tabatah-lux.fr`.
4. Copier l’enregistrement TXT fourni par Google.
5. Dans Cloudflare, ouvrir `tabatah-lux.fr`, puis **DNS → Add record → TXT**.
6. Coller exactement la valeur fournie par Google et enregistrer.
7. Attendre la propagation DNS.
8. Revenir dans Search Console et cliquer sur **Valider**.

### Soumettre le sitemap

Dans **Search Console → Sitemaps**, saisir `sitemap-index.xml`, puis cliquer sur **Envoyer**.

### Demander une première indexation

Dans **Inspection de l’URL**, saisir `https://tabatah-lux.fr/`, cliquer sur **Tester l’URL publiée**, puis sur **Demander une indexation**. Répéter si nécessaire pour `/portfolio/`, `/contact/` et quelques projets importants, sans automatiser ni multiplier les demandes.
