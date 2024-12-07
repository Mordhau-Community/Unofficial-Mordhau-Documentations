import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unofficial Mordhau Documentation",
  description: "Mordhau Documentation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

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
