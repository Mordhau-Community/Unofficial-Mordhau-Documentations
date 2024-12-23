import { defineConfig } from "vitepress";
import { version } from "../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mordhau Guides",
  description: "Mordhau Guides",
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
    logo: "/logo.webp",
    // i18nRouting: false,
    footer: {
      message: "Released under the (CDL) License.",
      copyright: "Copyright © 2024-present Mordhau Community - John Brayden",
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
          {
            text: "Informations",
            items: [
              { text: "About us", link: "/en/about-us/" },
              {
                text: "About Mordhau",
                link: "/en/about-mordhau/",
              },
              {
                text: "How read?",
                link: "/en/how-to-read/",
              },
              {
                text: "",
                items: [{ text: "Contributing", link: "/en/contributing/" }],
              },
            ],
          },
          {
            text: "Guides",
            items: [
              {
                text: "Players Guides and wiki",
                items: [
                  { text: "Mordhau Game", link: "/en/contributing/ssshkdsd" },
                  {
                    text: "Combat Mechanics",
                    link: "/en/contributing/sdfsswdf",
                  },
                  { text: "Glossary", link: "/en/contributing/sdf5tsdf" },
                  {
                    text: "Release History",
                    link: "/en/contributing/sdfsdsdf",
                  },
                ],
              },
              {
                text: "Devs & Modders Guides",
                items: [
                  { text: "RCON Guide", link: "/en/rcon-guide/" },
                  { text: "MordhauSDK Guide", link: "/en/mordhauSDK-guide/" },
                  {
                    text: "Dedicated Server Guide",
                    link: "/en/dedicated-server-guide/",
                  },
                  {
                    text: "Encountering Errors",
                    link: "/en/solutions-and-errors/",
                  },
                ],
              },
              {
                text: "",
                items: [
                  {
                    text: "References",
                    link: "/en/references/",
                  },
                ],
              },
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
              text: "Get Started",
              items: [
                {
                  text: "Introduction",
                  link: "/en/contributing/",
                },
                {
                  text: "Contribution Methods",
                  link: "/en/contributing/methods",
                },
                { text: "Required Tools", link: "/en/contributing/tools" },
                {
                  text: "Contribution Terms & Rules",
                  link: "/en/contributing/terms-rules",
                },
              ],
            },
            {
              text: "Markdown",
              items: [
                {
                  text: "What is Markdown?",
                  link: "/en/contributing/whats-markdown",
                },
                {
                  text: "How to use Markdown?",
                  link: "/en/contributing/How-to-use-Markdown",
                },
              ],
            },
            {
              text: "Github",
              items: [
                {
                  text: "What is Github?",
                  link: "/en/contributing/asdasdc",
                },
                { text: "Get Started", link: "/en/contributing/get-started" },
              ],
            },
            {
              text: "Git",
              items: [
                {
                  text: "What is Git?",
                  link: "/en/contributing/asdasdasdc",
                },
                { text: "Get Started", link: "/en/contributing/get-started" },
              ],
            },
            {
              text: "VitePress",
              items: [
                {
                  text: "What is VitePress?",
                  link: "/en/contributing/asdas",
                },
                { text: "Get Started", link: "/en/contributing/get-started" },
              ],
            },
            {
              text: "More Resources",
              items: [
                {
                  text: "Markdown Resources",
                  link: "/en/contributing/asdas",
                },
                {
                  text: "Github Resources",
                  link: "/en/contributing/get-started",
                },
                {
                  text: "Git Resources",
                  link: "/en/contributing/get-started",
                },
                {
                  text: "VitePress Resources",
                  link: "/en/contributing/get-started",
                },
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
