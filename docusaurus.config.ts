import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PlebnetWiki',
  tagline: 'Bitcoin and Lightning Wiki',
  favicon: 'img/favicon_io/favicon.ico',

  // Set the production url of your site here
  url: 'https://plebnetwiki.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'facebook', // Usually your GitHub org/user name.
  // projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/niteshbalusu11/plebnet-wiki/blob/master/'
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: 'TQIMNK0NOP',

      // Public API key: it is safe to commit it
      apiKey: '92c30b71c8e5ced3d5eff5e699d19673',

      indexName: 'plebnetcom',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: true,
    },
    colorMode: {
      defaultMode: 'dark'
    },
    // Replace with your project's social card
    image: 'img/pleb-net_logo_color.png',
    navbar: {
      title: 'Plebnet Wiki',
      logo: {
        alt: 'My Site Logo',
        src: 'img/pleb-net_logo_color.png',
      },
      items: [
        {
          href: 'https://github.com/niteshbalusu11/plebnet-wiki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://x.com/kycjelly',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/plebnet/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/niteshbalusu11/plebnet-wiki',
            },
          ],
        },
      ],
      copyright: `Built with ❤️ by Plebnet!`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
