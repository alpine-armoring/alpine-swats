const routes = {
  about: {
    collection: 'swat-about',
    paths: {
      en: '/about-us',
      es: '/hacerca-de-nosotros',
    },
  },
  inventory: {
    collection: 'swat-listing-inventory',
    collectionSingle: 'inventories',
    paths: {
      en: '/inventory',
      es: '/disponible-ahora',
    },
  },
  models: {
    collection: 'swat-listing-model',
    collectionSingle: 'vehicles-we-armors',
    paths: {
      en: '/models',
      es: '/vehiculos-que-blindamos',
    },
  },
  ballisticTesting: {
    collection: 'swat-ballistic-testing',
    paths: {
      en: '/armored-vehicle-testing',
      es: '/pruebas-balisticas',
    },
  },
  privacyPolicy: {
    collection: 'privacy-policy',
    paths: {
      en: '/privacy-policy',
      es: '/politica-de-privacidad',
    },
  },
};

const utils = {
  getLocalizedPath: (paths, locale, slug) => {
    const basePath = paths[locale] || paths.en;
    return locale === 'en'
      ? `${basePath}/${slug}`
      : `/${locale}${basePath}/${slug}`;
  },

  getRewrites: (paths, typePath) => {
    return Object.entries(paths)
      .filter(([locale]) => locale !== 'en')
      .flatMap(([locale, path]) => {
        const rewrites = [
          {
            source: `${path}`,
            destination: paths.en,
          },
          {
            source: `${path}/:slug`,
            destination: `${paths.en}/:slug`,
          },
        ];

        if (typePath && typePath[locale]) {
          rewrites.push({
            source: `${path}/${typePath[locale]}/:type`,
            destination: `${paths.en}/type/:type`,
          });
        }

        return rewrites;
      });
  },

  getLanguageUrls: (route, currentPage, locale) => {
    if (!route || !currentPage?.slug) return {};

    const languageUrls = {};

    languageUrls[locale] = route.getLocalizedPath(locale, currentPage.slug);

    if (currentPage.localizations?.data) {
      currentPage.localizations.data.forEach((localization) => {
        const localeCode = localization.attributes.locale;
        languageUrls[localeCode] = route.getLocalizedPath(
          localeCode,
          localization.attributes.slug
        );
      });
    }

    return languageUrls;
  },

  getIndexLanguageUrls: (paths) => {
    return Object.entries(paths).reduce((acc, [currentLocale, path]) => {
      acc[currentLocale] =
        currentLocale === 'en' ? path : `/${currentLocale}${path}`;
      return acc;
    }, {});
  },
};

Object.entries(routes).forEach(([key, config]) => {
  routes[key] = {
    ...config,
    getLocalizedPath: (locale, slug) =>
      utils.getLocalizedPath(config.paths, locale, slug),
    getRewrites: () => utils.getRewrites(config.paths, config.typePath),
    getLanguageUrls: (currentPage, locale) =>
      utils.getLanguageUrls(routes[key], currentPage, locale),
    getIndexLanguageUrls: (locale) =>
      utils.getIndexLanguageUrls(config.paths, locale),
  };
});

module.exports = routes;
