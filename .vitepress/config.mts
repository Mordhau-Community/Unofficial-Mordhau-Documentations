import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "uMordhau Documentation",
  description: "Mordhau Documentation",
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    ar: {
      label: "Arabic",
      lang: "ar",
      link: "/ar/",
      dir: "rtl",
    },
    ru: {
      label: "Russian",
      lang: "ru",
      link: "/ru/",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "How to contributing", link: "/how-to-contributing/" },
      { text: "RCON", link: "/rcon-guide/" },
      { text: "MordhauSDK", link: "/mordhauSDK-guide/" },
      {
        text: "Create your own server",
        link: "/create-your-own-server-guide/",
      },
    ],
    logo: "../resources/MordhauLogo.png",
    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentation",
      },
      { icon: "discord", link: "https://discord.gg/zuX58yRV84" },
    ],
  },
  srcDir: "docs",
  outDir: "./public",
});
