import { defineConfig } from "vitepress";
import { version } from "../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mordhau Guides",
  description: "Mordhau Guides",
  srcDir: "docs",
  outDir: ".vitepress/dist/docs",
  base: "/docs/",
  ignoreDeadLinks: false,
  cleanUrls: true,
  lastUpdated: true,

  // Stamps the reader's corner and accent choices on <html> before the first
  // paint, so neither flashes the default on load. Keys match the ones
  // written by .vitepress/theme/Prefs.vue.
  head: [
    [
      "script",
      {},
      [
        "(function(){var e=document.documentElement,g=function(k,d){",
        "try{return localStorage.getItem(k)||d}catch(_){return d}};",
        "e.setAttribute('data-mh-corners',g('mh-corners','square'));",
        "e.setAttribute('data-mh-accent',g('mh-accent','oxblood'));",
        "e.setAttribute('data-mh-width',g('mh-width','default'));",
        "e.setAttribute('data-mh-bg-dark',g('mh-bg-dark','default'));",
        "e.setAttribute('data-mh-bg-light',g('mh-bg-light','default'));",
        "e.setAttribute('data-mh-heading',g('mh-heading','default'));",
        "e.setAttribute('data-mh-text',g('mh-text','default'));",
        "e.setAttribute('data-mh-read',g('mh-read','off'));})();",
      ].join(""),
    ],
  ],
  vite: {
    css: {
      postcss: "./postcss.config.js",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // TODO: should fix it later..
    logo: "/logo.webp",
    // i18nRouting: false,
    footer: {
      // Rendered through v-html, so the anchor comes out as a link. The
      // footer is hidden on pages that carry a sidebar, which is VitePress's
      // own default, so this shows everywhere except the contributing series.
      message:
        "Released under <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noreferrer\">CC BY-SA 4.0</a>. &middot; <a href=\"/docs/en/disclaimer/\">Disclaimer</a> &middot; <a href=\"https://buymeacoffee.com/mordhaucommunity\" target=\"_blank\" rel=\"noreferrer\">&#10084;&#65039; Support the docs</a>",
      copyright:
        "Copyright © 2024-present Mordhau Community. Mordhau and all related content are the property of <a href=\"https://triternion.com/\" target=\"_blank\" rel=\"noreferrer\">Triternion</a>. This site is unofficial and not affiliated with them.",
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
        link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations",
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
                text: "Mordhau Lack",
                link: "/en/mordhau-lack/",
              },
              {
                text: "How read?",
                link: "/en/how-to-read/",
              },
              {
                text: "",
                items: [
                  { text: "Contributing", link: "/en/contributing/" },
                  { text: "Support the docs", link: "/en/donate/" },
                  { text: "Disclaimer", link: "/en/disclaimer/" },
                ],
              },
            ],
          },
          {
            text: "Guides",
            items: [
              {
                text: "Players Guides and wiki",
                items: [
                  { text: "Mordhau Game", link: "/en/mordhau-game/" },
                  {
                    text: "Combat Mechanics",
                    link: "/en/combat-mechanics/",
                  },
                  { text: "Game Modes", link: "/en/game-modes/" },
                  { text: "Weapons & Loadouts", link: "/en/weapons/" },
                  { text: "Glossary", link: "/en/glossary/" },
                  {
                    text: "Patch Notes",
                    link: "https://store.steampowered.com/news/app/629760",
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
                  text: "Contributing",
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
                {
                  text: "What Still Needs Writing",
                  link: "/en/contributing/what-needs-writing",
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
                  link: "/en/contributing/how-to-use-markdown",
                },
              ],
            },
            {
              text: "Git & Github",
              items: [
                { text: "What is Git?", link: "/en/contributing/git" },
                { text: "What is Github?", link: "/en/contributing/github" },
              ],
            },
            {
              text: "VitePress",
              items: [
                {
                  text: "What is VitePress?",
                  link: "/en/contributing/vitepress",
                },
              ],
            },
            {
              text: "More Resources",
              items: [
                { text: "Links & Reading", link: "/en/contributing/resources" },
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
                link: "/ar/contributing/",
              },
              {
                text: "How to understand the docs?",
                link: "/ar/mordhauSDK-guide/",
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
      },
    },
  },
});
