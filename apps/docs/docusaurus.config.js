// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const myTheme = require("./prism-theme");
const darkCodeTheme = require("prism-react-renderer/themes/vsDark");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RizzUI",
  tagline:
    "A Modern, Minimal, TailwindCSS-based React UI Library. Intuitively crafted, easy-to-customize components for seamless integration. Responsive, accessible, and consistent across devices and browsers.",
  favicon: "img/rizz-favicon.svg",

  // Set the production url of your site here
  url: "https://rizzui.com/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "RedQ", // Usually your GitHub org/user name.
  projectName: "rizzui", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // custom external stylesheets
  stylesheets: [
    {
      href: "fonts/geist-font.css",
      type: "text/css",
    },
  ],

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/rizzui/rizzui/apps/docs",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/rizz-social-card.jpg",
      fonts: {
        myFont: ["Inter", "sans-serif"],
        myOtherFont: ["-apple-system", "system-ui", "sans-serif"],
      },
      navbar: {
        // hideOnScroll: true,
        logo: {
          alt: "RizzUI",
          src: "img/rizz-logo.svg",
          width: "96px",
          height: "auto",
        },
        items: [
          {
            to: "docs/guide/getting-started",
            position: "left",
            label: "Documentation",
          },
          {
            to: "docs/buttons/action-icon",
            position: "left",
            label: "Components",
          },
          {
            href: "https://github.com/rizzui/rizzui",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub",
          },
        ],
      },
      prism: {
        theme: myTheme,
        // theme: prismTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
