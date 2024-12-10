import { defineConfig } from "vitepress";
import { version } from "../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "uMordhau Documentations",
  description: "Mordhau Documentation",
  srcDir: "docs",
  outDir: ".vitepress/dist/docs",
  base: "/docs/",
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    css: {
      postcss: "./postcss.config.js",
    },
  },
  rewrites(id) {
    return id.replace(/\/en\//, "/");
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // TODO: should fix it later..
    // logo: "/logo.webp",
    // i18nRouting: false,
    footer: {
      message: "Released under the (CDL) License.",
      copyright: "Copyright © 2024-present Mordhau-Community - John Brayden",
    },
    editLink: {
      pattern:
        "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/edit/main/docs/:path",
    },
    search: {
      provider: "local",
      options: {
        _render(src, env, md) {
          const html = md.render(src, env);
          if (env.frontmatter?.title)
            return md.render(`# ${env.frontmatter.title}`) + html;
          return html;
        },
      },
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentation",
      },
      { icon: "discord", link: "https://discord.gg/zuX58yRV84" },
    ],
  },

  // https://vitepress.dev/guide/i18n
  locales: {
    root: {
      label: "English",
      lang: "en",
      link: "/en/",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Contributing", link: "/en/contributing/" },
          {
            text: "Informations",
            items: [
              { text: "About us", link: "/en/about-us/" },
              {
                text: "About Mordhau and docs",
                link: "/en/about-mordhau-and-docs/",
              },
            ],
          },
          {
            text: "Docs Sections",
            items: [
              { text: "RCON Guide", link: "/en/rcon-guide/" },
              { text: "MordhauSDK Guide", link: "/en/mordhauSDK-guide/" },
              {
                text: "Dedicated Server Guide",
                link: "/en/dedicated-server-guide/",
              },
              { text: "Encountering Errors", link: "/en/encountering-errors/" },
            ],
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: {
          "/en/contributing/": [
            {
              text: "Guide",
              items: [
                { text: "hello", link: "/en/contributing/" },
                { text: "testing", link: "/en/contributing/one" },
                { text: "boooo", link: "/en/contributing/two" },
              ],
            },
          ],
          "/config/": [
            {
              text: "Config",
              items: [
                { text: "Index", link: "/config/" },
                { text: "Three", link: "/config/three" },
                { text: "Four", link: "/config/four" },
              ],
            },
          ],
        },
      },
    },
    ar: {
      label: "العربية",
      lang: "ar",
      dir: "rtl",
      themeConfig: {
        nav: [
          { text: "Home", link: "/ar/" },
          { text: "Contributing", link: "/ar/contributing/" },
          { text: "RCON", link: "/ar/rcon-guide/" },
          { text: "MordhauSDK", link: "/ar/mordhauSDK-guide/" },
          {
            text: "Dedicated Server",
            link: "/ar/dedicated-server-guide/",
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Get Started",
            items: [
              {
                text: "Contributing in Mordhau Documentations",
                link: "/en/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/en/mordhauSDK-guide/",
              },
            ],
          },
        ],
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/ru/" },
          { text: "Contributing", link: "/ru/contributing/" },
          { text: "RCON", link: "/ru/rcon-guide/" },
          { text: "MordhauSDK", link: "/ru/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/ru/dedicated-server-guide/",
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Get Started",
            items: [
              {
                text: "Contributing in Mordhau Documentations",
                link: "/ru/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/ru/mordhauSDK-guide/",
              },
            ],
          },
        ],
      },
    },
    ja: {
      label: "日本語",
      lang: "ja",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/ja/" },
          { text: "Contributing", link: "/ja/contributing/" },
          { text: "RCON", link: "/ja/rcon-guide/" },
          { text: "MordhauSDK", link: "/ja/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/ja/dedicated-server-guide/",
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Get Started",
            items: [
              {
                text: "Contributing in Mordhau Documentations",
                link: "/ja/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/ja/mordhauSDK-guide/",
              },
            ],
          },
        ],
      },
    },
    fr: {
      label: "Français",
      lang: "fr",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/fr/" },
          { text: "Contributing", link: "/fr/contributing/" },
          { text: "RCON", link: "/fr/rcon-guide/" },
          { text: "MordhauSDK", link: "/fr/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/fr/dedicated-server-guide/",
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Get Started",
            items: [
              {
                text: "Contributing in Mordhau Documentations",
                link: "/fr/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/fr/mordhauSDK-guide/",
              },
            ],
          },
        ],
      },
    },
    zh: {
      label: "中文",
      lang: "zh",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/zh/" },
          { text: "Contributing", link: "/zh/contributing/" },
          { text: "RCON", link: "/zh/rcon-guide/" },
          { text: "MordhauSDK", link: "/zh/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/zh/dedicated-server-guide/",
          },
          {
            text: version,
            items: [
              {
                text: "changelog",
                link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
              },
            ],
          },
        ],
        sidebar: [
          {
            text: "Get Started",
            items: [
              {
                text: "Contributing in Mordhau Documentations",
                link: "/zh/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/zh/mordhauSDK-guide/",
              },
            ],
          },
        ],
      },
    },
  },
});
