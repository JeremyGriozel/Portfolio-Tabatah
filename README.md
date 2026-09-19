# Portfolio Tabatah

Portfolio professionnel de Tabatah consacré à la photographie, à l’illustration numérique et à la direction artistique.

Le site est développé avec Astro, administré avec Keystatic Cloud et déployé automatiquement sur Cloudflare Workers depuis la branche `main`.

## Accès rapides

| Outil | Utilisation | Lien |
| --- | --- | --- |
| Site public | Consulter le portfolio en production | [tabatah-lux.fr](https://tabatah-lux.fr/) |
| Keystatic | Modifier les contenus, les projets, le CV et les coordonnées | [Administration du site](https://tabatah-lux.fr/keystatic/) |
| Keystatic Cloud | Gérer le projet et ses accès | [keystatic.cloud](https://keystatic.cloud/) |
| GitHub | Consulter le code et les commits de contenu | [Portfolio-Tabatah](https://github.com/JeremyGriozel/Portfolio-Tabatah) |
| Cloudflare Workers | Suivre les builds, déploiements, logs et variables | [Worker portfolio-tabatah](https://dash.cloudflare.com/09efd6cbada5cb95a9b6625d848acfc9/workers/services/view/portfolio-tabatah/production) |
| Resend | Suivre les e-mails envoyés par le formulaire | [Tableau de bord Resend](https://resend.com/emails) |
| Resend Domains | Vérifier le domaine d’expédition | [Domaines Resend](https://resend.com/domains) |
| Google Search Console | Suivre l’indexation et le référencement | [Search Console](https://search.google.com/search-console/) |

> Les tableaux de bord Keystatic, Cloudflare et Resend nécessitent un compte autorisé. Aucun secret ne doit être ajouté au dépôt Git.

## Fonctionnement de la publication

```text
Keystatic
→ enregistrement du contenu
→ commit dans GitHub
→ build automatique Cloudflare
→ mise à jour de tabatah-lux.fr
```

Les modifications de code suivent le même circuit après un push sur la branche `main`.

## Développement local

L’application Astro se trouve dans le sous-dossier `Portefolio/`.

```bash
cd Portefolio
npm install
npm run dev
```

- Site local : [http://localhost:4321](http://localhost:4321)
- Keystatic local : [http://localhost:4321/keystatic](http://localhost:4321/keystatic)
- Build de vérification : `npm run build`
- Version de Node.js requise : `22.12.0` ou supérieure

## Où modifier le contenu

| Contenu | Emplacement |
| --- | --- |
| Projets | `Portefolio/src/content/projects/` |
| Images des projets | `Portefolio/public/images/projects/` |
| Images de la page d’accueil | `Portefolio/public/images/home/` |
| Photo de profil | `Portefolio/public/images/profile/` |
| CV courant | `Portefolio/public/documents/` |
| Référence du CV | `Portefolio/src/data/cv.json` |
| Coordonnées et destinataire du formulaire | `Portefolio/src/data/contact.json` |
| Identité graphique et thèmes | `Portefolio/src/styles/tokens.css` |

Pour les modifications courantes, utiliser de préférence [Keystatic](https://tabatah-lux.fr/keystatic/) afin que les fichiers et images soient enregistrés proprement dans GitHub.

## Configuration Cloudflare

- Worker : `portfolio-tabatah`
- Branche de production : `main`
- Répertoire racine du build : `Portefolio`
- Commande de build : `npm run build`
- Commande de déploiement : `npx wrangler deploy`
- Secret requis pour le formulaire : `RESEND_API_KEY`

## Documentation technique

- [Procédure de déploiement et d’administration](Portefolio/DEPLOYMENT.md)
- [Documentation Astro](https://docs.astro.build/)
- [Documentation Keystatic](https://keystatic.com/docs/)
- [Documentation Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [Documentation Resend](https://resend.com/docs)

