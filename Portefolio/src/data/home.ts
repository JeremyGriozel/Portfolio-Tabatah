import siteContent from './site-content.json';

export const homeContent = {
	carousel: siteContent.home.carousel,
	hero: {
		...siteContent.home.hero,
		name: siteContent.home.hero.title,
		primaryAction: { label: siteContent.home.hero.primaryActionLabel, href: '/portfolio/' },
		secondaryAction: { label: siteContent.home.hero.secondaryActionLabel, href: '/cv/' },
		image: {
			src: siteContent.profileImage,
			alt: siteContent.profileImageAlt,
			caption: siteContent.profileImageCaption,
		},
	},
	about: {
		...siteContent.home.about,
		link: { label: siteContent.home.about.linkLabel, href: '/cv/' },
	},
	featured: {
		...siteContent.home.featured,
		link: { label: siteContent.home.featured.linkLabel, href: '/portfolio/' },
	},
	cta: {
		...siteContent.home.cta,
		primaryAction: { label: siteContent.home.cta.primaryActionLabel, href: '/portfolio/' },
		secondaryAction: { label: siteContent.home.cta.secondaryActionLabel, href: '/contact/' },
	},
} as const;
