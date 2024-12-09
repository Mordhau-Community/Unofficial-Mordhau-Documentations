import { defineConfig } from "vitepress";
import { version } from "../package.json";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "uMordhau Documentation",
  description: "Mordhau Documentation",
  srcDir: "docs",
  outDir: ".vitepress/dist/docs",
  base: "/docs/",
  ignoreDeadLinks: true,
  cleanUrls: true,
  rewrites(id) {
    return id.replace(/\/en\//, "/");
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // logo: "/logo.webp",
    i18nRouting: false,
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
          { text: "How to contributing", link: "/en/how-to-contributing/" },
          { text: "RCON", link: "/en/rcon-guide/" },
          { text: "MordhauSDK", link: "/en/mordhauSDK-guide/" },
          {
            text: "Dedicated server",
            link: "/en/dedicated-server-guide/",
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
                link: "/en/how-to-contributing/",
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
    ar: {
      label: "العربية",
      lang: "ar",
      dir: "rtl",
      themeConfig: {
        nav: [
          { text: "الرئسية", link: "/ar/" },
          { text: "How to contributing", link: "/ar/how-to-contributing/" },
          { text: "RCON", link: "/ar/rcon-guide/" },
          { text: "MordhauSDK", link: "/ar/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/ar/create-your-own-server-guide/",
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
                link: "/en/how-to-contributing/",
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
          { text: "Home", link: "/en/" },
          { text: "How to contributing", link: "/en/how-to-contributing/" },
          { text: "RCON", link: "/en/rcon-guide/" },
          { text: "MordhauSDK", link: "/en/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/en/create-your-own-server-guide/",
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
                link: "/en/how-to-contributing/",
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
    ja: {
      label: "日本語",
      lang: "ja",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "How to contributing", link: "/en/how-to-contributing/" },
          { text: "RCON", link: "/en/rcon-guide/" },
          { text: "MordhauSDK", link: "/en/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/en/create-your-own-server-guide/",
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
                link: "/en/how-to-contributing/",
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
    fr: {
      label: "Français",
      lang: "fr",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "How to contributing", link: "/en/how-to-contributing/" },
          { text: "RCON", link: "/en/rcon-guide/" },
          { text: "MordhauSDK", link: "/en/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/en/create-your-own-server-guide/",
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
                link: "/en/how-to-contributing/",
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
    zh: {
      label: "中文",
      lang: "zh",
      dir: "ltr",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "How to contributing", link: "/en/how-to-contributing/" },
          { text: "RCON", link: "/en/rcon-guide/" },
          { text: "MordhauSDK", link: "/en/mordhauSDK-guide/" },
          {
            text: "Create your own server",
            link: "/en/create-your-own-server-guide/",
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
                link: "/en/how-to-contributing/",
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
  },
});
