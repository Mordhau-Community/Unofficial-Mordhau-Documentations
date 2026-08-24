import { defineConfig } from "vitepress";
import { version } from "../package.json";

type TranslatedLocale = "ar" | "fr" | "ja" | "ru" | "zh";

interface NavigationCopy {
  home: string;
  information: string;
  about: string;
  lack: string;
  read: string;
  contributing: string;
  support: string;
  disclaimer: string;
  guides: string;
  players: string;
  game: string;
  combat: string;
  modes: string;
  weapons: string;
  glossary: string;
  patches: string;
  developers: string;
  rcon: string;
  sdk: string;
  server: string;
  errors: string;
  references: string;
  changelog: string;
  getStarted: string;
  methods: string;
  tools: string;
  rules: string;
  needsWriting: string;
  markdown: string;
  whatMarkdown: string;
  useMarkdown: string;
  gitAndGitHub: string;
  whatGit: string;
  whatGitHub: string;
  vitepress: string;
  whatVitePress: string;
  moreResources: string;
  linksReading: string;
}

const navigationCopy: Record<TranslatedLocale, NavigationCopy> = {
  ar: {
    home: "الرئيسية",
    information: "معلومات",
    about: "من نحن",
    lack: "نقص توثيق Mordhau",
    read: "كيف تقرأ الأدلة؟",
    contributing: "المساهمة",
    support: "دعم الأدلة",
    disclaimer: "إخلاء المسؤولية",
    guides: "الأدلة",
    players: "أدلة اللاعبين (Player Guides) والويكي",
    game: "لعبة Mordhau",
    combat: "ميكانيكيات القتال (Combat Mechanics)",
    modes: "أوضاع اللعب (Game Modes)",
    weapons: "الأسلحة والعتاد (Weapons & Loadouts)",
    glossary: "قاموس المصطلحات (Glossary)",
    patches: "ملاحظات التحديث (Patch Notes)",
    developers: "أدلة المطورين وصانعي التعديلات (Modders)",
    rcon: "التحكم عن بُعد (RCON)",
    sdk: "دليل MordhauSDK",
    server: "دليل الخادم المخصص (Dedicated Server)",
    errors: "الحلول والأخطاء (Solutions & Errors)",
    references: "المراجع",
    changelog: "سجل التغييرات (Changelog)",
    getStarted: "ابدأ هنا",
    methods: "طرق المساهمة",
    tools: "الأدوات المطلوبة",
    rules: "شروط وقواعد المساهمة",
    needsWriting: "ما الذي ما زال يحتاج إلى كتابة؟",
    markdown: "Markdown",
    whatMarkdown: "ما هو Markdown؟",
    useMarkdown: "كيف تستخدم Markdown؟",
    gitAndGitHub: "Git وGitHub",
    whatGit: "ما هو Git؟",
    whatGitHub: "ما هو GitHub؟",
    vitepress: "VitePress",
    whatVitePress: "ما هو VitePress؟",
    moreResources: "موارد إضافية",
    linksReading: "روابط ومواد للقراءة",
  },
  fr: {
    home: "Accueil",
    information: "Informations",
    about: "À propos",
    lack: "Lacunes de Mordhau",
    read: "Comment lire les guides ?",
    contributing: "Contribuer",
    support: "Soutenir les guides",
    disclaimer: "Avertissement",
    guides: "Guides",
    players: "Guides des joueurs et wiki",
    game: "Jeu Mordhau",
    combat: "Mécaniques de combat",
    modes: "Modes de jeu",
    weapons: "Armes et équipements",
    glossary: "Glossaire",
    patches: "Notes de mise à jour",
    developers: "Guides des développeurs et moddeurs",
    rcon: "Guide RCON",
    sdk: "Guide MordhauSDK",
    server: "Guide du serveur dédié",
    errors: "Solutions et erreurs",
    references: "Références",
    changelog: "Journal des modifications",
    getStarted: "Bien démarrer",
    methods: "Méthodes de contribution",
    tools: "Outils requis",
    rules: "Conditions et règles",
    needsWriting: "Contenu restant à écrire",
    markdown: "Markdown",
    whatMarkdown: "Qu’est-ce que Markdown ?",
    useMarkdown: "Comment utiliser Markdown ?",
    gitAndGitHub: "Git et GitHub",
    whatGit: "Qu’est-ce que Git ?",
    whatGitHub: "Qu’est-ce que GitHub ?",
    vitepress: "VitePress",
    whatVitePress: "Qu’est-ce que VitePress ?",
    moreResources: "Ressources supplémentaires",
    linksReading: "Liens et lectures",
  },
  ja: {
    home: "ホーム",
    information: "情報",
    about: "このサイトについて",
    lack: "Mordhau の情報不足",
    read: "ガイドの読み方",
    contributing: "コントリビュート",
    support: "ガイドを支援",
    disclaimer: "免責事項",
    guides: "ガイド",
    players: "プレイヤーガイドと Wiki",
    game: "Mordhau ゲーム",
    combat: "戦闘メカニズム",
    modes: "ゲームモード",
    weapons: "武器とロードアウト",
    glossary: "用語集",
    patches: "パッチノート",
    developers: "開発者・Mod 制作者向けガイド",
    rcon: "RCON ガイド",
    sdk: "MordhauSDK ガイド",
    server: "専用サーバーガイド",
    errors: "解決策とエラー",
    references: "参考資料",
    changelog: "変更履歴",
    getStarted: "はじめに",
    methods: "コントリビュート方法",
    tools: "必要なツール",
    rules: "条件とルール",
    needsWriting: "執筆が必要な内容",
    markdown: "Markdown",
    whatMarkdown: "Markdown とは？",
    useMarkdown: "Markdown の使い方",
    gitAndGitHub: "Git と GitHub",
    whatGit: "Git とは？",
    whatGitHub: "GitHub とは？",
    vitepress: "VitePress",
    whatVitePress: "VitePress とは？",
    moreResources: "その他の資料",
    linksReading: "リンクと参考資料",
  },
  ru: {
    home: "Главная",
    information: "Информация",
    about: "О нас",
    lack: "Пробелы в документации Mordhau",
    read: "Как читать руководства?",
    contributing: "Участие",
    support: "Поддержать руководства",
    disclaimer: "Отказ от ответственности",
    guides: "Руководства",
    players: "Руководства игроков и вики",
    game: "Игра Mordhau",
    combat: "Боевая механика",
    modes: "Режимы игры",
    weapons: "Оружие и комплекты",
    glossary: "Глоссарий",
    patches: "Примечания к обновлениям",
    developers: "Руководства разработчиков и моддеров",
    rcon: "Руководство RCON",
    sdk: "Руководство MordhauSDK",
    server: "Руководство выделенного сервера",
    errors: "Решения и ошибки",
    references: "Источники",
    changelog: "История изменений",
    getStarted: "Начало работы",
    methods: "Способы участия",
    tools: "Необходимые инструменты",
    rules: "Условия и правила",
    needsWriting: "Что ещё нужно написать",
    markdown: "Markdown",
    whatMarkdown: "Что такое Markdown?",
    useMarkdown: "Как использовать Markdown?",
    gitAndGitHub: "Git и GitHub",
    whatGit: "Что такое Git?",
    whatGitHub: "Что такое GitHub?",
    vitepress: "VitePress",
    whatVitePress: "Что такое VitePress?",
    moreResources: "Дополнительные ресурсы",
    linksReading: "Ссылки и материалы",
  },
  zh: {
    home: "首页",
    information: "信息",
    about: "关于我们",
    lack: "Mordhau 文档缺失",
    read: "如何阅读指南？",
    contributing: "参与贡献",
    support: "支持文档",
    disclaimer: "免责声明",
    guides: "指南",
    players: "玩家指南与 Wiki",
    game: "Mordhau 游戏",
    combat: "战斗机制",
    modes: "游戏模式",
    weapons: "武器与配装",
    glossary: "术语表",
    patches: "更新说明",
    developers: "开发者与模组制作者指南",
    rcon: "RCON 指南",
    sdk: "MordhauSDK 指南",
    server: "专用服务器指南",
    errors: "解决方案与错误",
    references: "参考资料",
    changelog: "更新日志",
    getStarted: "入门",
    methods: "贡献方式",
    tools: "所需工具",
    rules: "贡献条款与规则",
    needsWriting: "仍需编写的内容",
    markdown: "Markdown",
    whatMarkdown: "什么是 Markdown？",
    useMarkdown: "如何使用 Markdown？",
    gitAndGitHub: "Git 与 GitHub",
    whatGit: "什么是 Git？",
    whatGitHub: "什么是 GitHub？",
    vitepress: "VitePress",
    whatVitePress: "什么是 VitePress？",
    moreResources: "更多资源",
    linksReading: "链接与阅读资料",
  },
};

function localizedNav(locale: TranslatedLocale) {
  const copy = navigationCopy[locale];
  const prefix = `/${locale}`;

  return [
    { text: copy.home, link: `${prefix}/` },
    {
      text: copy.information,
      items: [
        { text: copy.about, link: `${prefix}/about-us/` },
        { text: copy.lack, link: `${prefix}/mordhau-lack/` },
        { text: copy.read, link: `${prefix}/how-to-read/` },
        {
          text: "",
          items: [
            { text: copy.contributing, link: `${prefix}/contributing/` },
            { text: copy.support, link: `${prefix}/donate/` },
            { text: copy.disclaimer, link: `${prefix}/disclaimer/` },
          ],
        },
      ],
    },
    {
      text: copy.guides,
      items: [
        {
          text: copy.players,
          items: [
            { text: copy.game, link: `${prefix}/mordhau-game/` },
            { text: copy.combat, link: `${prefix}/combat-mechanics/` },
            { text: copy.modes, link: `${prefix}/game-modes/` },
            { text: copy.weapons, link: `${prefix}/weapons/` },
            { text: copy.glossary, link: `${prefix}/glossary/` },
            {
              text: copy.patches,
              link: "https://store.steampowered.com/news/app/629760",
            },
          ],
        },
        {
          text: copy.developers,
          items: [
            { text: copy.rcon, link: `${prefix}/rcon-guide/` },
            { text: copy.sdk, link: `${prefix}/mordhauSDK-guide/` },
            { text: copy.server, link: `${prefix}/dedicated-server-guide/` },
            { text: copy.errors, link: `${prefix}/solutions-and-errors/` },
          ],
        },
        {
          text: "",
          items: [{ text: copy.references, link: `${prefix}/references/` }],
        },
      ],
    },
    {
      text: version,
      items: [
        {
          text: copy.changelog,
          link: "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/blob/main/CHANGELOG.md",
        },
      ],
    },
  ];
}

function localizedSidebar(locale: TranslatedLocale) {
  const copy = navigationCopy[locale];
  const prefix = `/${locale}/contributing`;

  return {
    [`${prefix}/`]: [
      {
        text: copy.getStarted,
        items: [
          { text: copy.contributing, link: `${prefix}/` },
          { text: copy.methods, link: `${prefix}/methods` },
          { text: copy.tools, link: `${prefix}/tools` },
          { text: copy.rules, link: `${prefix}/terms-rules` },
          { text: copy.needsWriting, link: `${prefix}/what-needs-writing` },
        ],
      },
      {
        text: copy.markdown,
        items: [
          { text: copy.whatMarkdown, link: `${prefix}/whats-markdown` },
          { text: copy.useMarkdown, link: `${prefix}/how-to-use-markdown` },
        ],
      },
      {
        text: copy.gitAndGitHub,
        items: [
          { text: copy.whatGit, link: `${prefix}/git` },
          { text: copy.whatGitHub, link: `${prefix}/github` },
        ],
      },
      {
        text: copy.vitepress,
        items: [{ text: copy.whatVitePress, link: `${prefix}/vitepress` }],
      },
      {
        text: copy.moreResources,
        items: [{ text: copy.linksReading, link: `${prefix}/resources` }],
      },
    ],
  };
}

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
        `e.setAttribute('data-mh-announce',g('mh-announce','')===${JSON.stringify(version)}?'off':'on');`,
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
    logo: "/logo.webp",
    // Every locale mirrors the English page tree, so language switching can
    // preserve the current document instead of returning to the locale home.
    i18nRouting: true,
    footer: {
      // Rendered through v-html, so the anchor comes out as a link. The
      // footer is hidden on pages that carry a sidebar, which is VitePress's
      // own default, so this shows everywhere except the contributing series.
      message:
        "Licensed under <a href=\"https://creativecommons.org/licenses/by-sa/4.0/\" target=\"_blank\" rel=\"noreferrer\">CC BY-SA 4.0</a>. &middot; <a href=\"/docs/en/disclaimer/\">Disclaimer</a> &middot; <a href=\"https://buymeacoffee.com/mordhaucommunity\" target=\"_blank\" rel=\"noreferrer\">&#10084;&#65039; Support the docs</a>",
      copyright:
        "Mordhau &copy; <a href=\"https://triternion.com/\" target=\"_blank\" rel=\"noreferrer\">Triternion</a>. This site is unofficial and not affiliated with them.",
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
        langMenuLabel: "Change language",
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
        langMenuLabel: "تغيير اللغة",
        nav: localizedNav("ar"),
        sidebar: localizedSidebar("ar"),
      },
    },
    ru: {
      label: "Русский",
      lang: "ru",
      dir: "ltr",
      themeConfig: {
        langMenuLabel: "Сменить язык",
        nav: localizedNav("ru"),
        sidebar: localizedSidebar("ru"),
      },
    },
    ja: {
      label: "日本語",
      lang: "ja",
      dir: "ltr",
      themeConfig: {
        langMenuLabel: "言語を変更",
        nav: localizedNav("ja"),
        sidebar: localizedSidebar("ja"),
      },
    },
    fr: {
      label: "Français",
      lang: "fr",
      dir: "ltr",
      themeConfig: {
        langMenuLabel: "Changer de langue",
        nav: localizedNav("fr"),
        sidebar: localizedSidebar("fr"),
      },
    },
    zh: {
      label: "中文",
      lang: "zh",
      dir: "ltr",
      themeConfig: {
        langMenuLabel: "切换语言",
        nav: localizedNav("zh"),
        sidebar: localizedSidebar("zh"),
      },
    },
  },
});
