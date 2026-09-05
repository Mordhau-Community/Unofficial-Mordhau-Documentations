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
  sdkOverview: string;
  actors: string;
  blueprints: string;
  editPage: string;
  lastUpdated: string;
  onThisPage: string;
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
    sdkOverview: "نظرة عامة",
    actors: "الكائنات (Actors)",
    blueprints: "المخططات (Blueprints)",
    editPage: "تعديل هذه الصفحة",
    lastUpdated: "آخر تحديث",
    onThisPage: "في هذه الصفحة",
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
    sdkOverview: "Vue d’ensemble",
    actors: "Acteurs",
    blueprints: "Blueprints",
    editPage: "Modifier cette page",
    lastUpdated: "Dernière mise à jour",
    onThisPage: "Sur cette page",
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
    sdkOverview: "概要",
    actors: "アクター",
    blueprints: "ブループリント",
    editPage: "このページを編集",
    lastUpdated: "最終更新",
    onThisPage: "このページの内容",
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
    sdkOverview: "Обзор",
    actors: "Акторы",
    blueprints: "Блюпринты",
    editPage: "Редактировать страницу",
    lastUpdated: "Последнее обновление",
    onThisPage: "На этой странице",
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
    sdkOverview: "概述",
    actors: "Actor",
    blueprints: "蓝图",
    editPage: "编辑此页",
    lastUpdated: "最后更新",
    onThisPage: "本页目录",
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
  const sdkPrefix = `/${locale}/mordhauSDK-guide`;

  return {
    [`${sdkPrefix}/`]: [
      {
        text: copy.sdk,
        items: [
          { text: copy.sdkOverview, link: `${sdkPrefix}/` },
          { text: copy.actors, link: `${sdkPrefix}/actors` },
          { text: copy.blueprints, link: `${sdkPrefix}/blueprints` },
        ],
      },
    ],
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


/*
 * The two strings under every documentation page, plus how the date is
 * written. VitePress replaces a themeConfig key per locale rather than
 * merging into it, so the format options travel with the text instead of
 * sitting once at the root and being dropped by the first locale that
 * overrides the label.
 *
 * forceLocale writes the date in the page's language rather than the reader's
 * browser, which is the whole point of having translated the page. The clock
 * time is gone with it: a short date and a short time put a comma between two
 * runs that a right to left line then reorders, and the hour a paragraph was
 * last touched was never the useful half.
 */
const editLinkPattern =
  "https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/edit/main/docs/:path";

const lastUpdatedFormat = {
  dateStyle: "medium",
  forceLocale: true,
} as const;

/*
 * "On this page", the heading over the outline rail.
 *
 * English is left to VitePress, whose default is already the string this site
 * would have written; only the five translated locales override it, so there
 * is no English copy here restating a default.
 */
function localizedOutline(locale: TranslatedLocale) {
  return {
    outline: {
      label: navigationCopy[locale].onThisPage,
    },
  };
}

function localizedFooter(locale: TranslatedLocale) {
  return {
    editLink: {
      pattern: editLinkPattern,
      text: navigationCopy[locale].editPage,
    },
    lastUpdated: {
      text: navigationCopy[locale].lastUpdated,
      formatOptions: lastUpdatedFormat,
    },
  };
}


/*
 * The band at the foot of every page, in the language of the page.
 *
 * Not to be confused with localizedFooter above it, which is the edit link
 * and the date under a documentation page. This is the site footer: two
 * places to go and the two statements the site has to make.
 *
 * Rendered through v-html, so the anchors come out as links. It shows
 * everywhere: VitePress hides its footer on anything carrying a sidebar, and
 * style.css puts it back, so the contributing series and the SDK guide end
 * the same way the rest of the site does.
 *
 * The split is by what each thing is, not by where it goes. The message is
 * the places to go and nothing else; the copyright is the two statements, the
 * attribution and then the licence under it. style.css puts the first at the
 * end of its row and stacks the other two, so the markup is the only place
 * that split is written down.
 *
 * The heart on the support link is drawn in CSS rather than sat here as an
 * emoji: the system one rendered pink beside an oxblood palette and ignored
 * the reader's accent.
 *
 * The two sentences are written as sentences with a slot in them rather than
 * as markup, so a translator writes prose and never an anchor, and the two
 * addresses are declared once. Both are named in the slot rather than
 * numbered, because a language is free to put them wherever its grammar wants
 * them.
 *
 * There is no dir="ltr" on them any more. It was there because one English
 * string ran on all six locales, and a full stop closing an English sentence
 * is a neutral character that a right to left paragraph reorders to the far
 * side of it — ".Licensed under CC BY-SA 4.0". The Arabic page now carries an
 * Arabic sentence, so the same reordering is the correct one and the isolate
 * would be the thing getting it wrong.
 */
type SiteLocale = "en" | TranslatedLocale;

interface FooterCopy {
  disclaimer: string;
  support: string;
  attribution: string;
  licence: string;
}

const triternionLink =
  '<a href="https://triternion.com/" target="_blank" rel="noreferrer">Triternion</a>';

const licenceLink =
  '<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>';

const footerCopy: Record<SiteLocale, FooterCopy> = {
  en: {
    disclaimer: "Disclaimer",
    support: "Support the docs",
    attribution:
      "Mordhau © {triternion}. This site is unofficial and not affiliated with them.",
    licence: "Licensed under {licence}.",
  },
  /*
   * Arabic keeps every Latin run away from the ends of its sentences, which
   * is why these two do not read as the English ones do.
   *
   * A full stop is a neutral character. In a right to left paragraph it
   * takes the paragraph's direction, so it is laid out to the left of
   * whatever precedes it — and when what precedes it is a Latin run, the
   * left of that run is where a reader's eye arrives first. "Mordhau ©
   * Triternion." opening the line put its stop hard against the M and read
   * as ".Mordhau", and "مرخّص بموجب CC BY-SA 4.0." ended on one and read
   * as ".CC BY-SA 4.0". Both were correctly ordered and both looked like a
   * mistake.
   *
   * Nothing in the markup can move a stop that follows its run in logical
   * order; an isolate or a right to left mark puts it in exactly the same
   * place. So the sentences are written the way an Arabic editor would write
   * them instead. Each line opens on an Arabic word and closes on one, and
   * carries a single full stop, at its end, after Arabic — which is where a
   * right to left line wants its punctuation and where nobody reads it as
   * belonging to the word beside it. The two clauses of the first line are
   * joined with و rather than split by a stop, for the same reason: a stop
   * between them would land against Triternion.
   *
   * Mordhau, Triternion and the licence therefore all sit in the middle of a
   * line with Arabic on both sides, and no punctuation touches any of them.
   * The copyright sign goes with the rewrite — حقوق محفوظة says the same
   * thing in words — and الدولية closing the licence line is the licence's
   * own name rather than padding: CC BY-SA 4.0 International.
   */
  ar: {
    disclaimer: navigationCopy.ar.disclaimer,
    support: navigationCopy.ar.support,
    attribution:
      "حقوق لعبة Mordhau محفوظة لشركة {triternion} وهذا الموقع غير رسمي وغير تابع لها.",
    licence: "مرخّص بموجب رخصة {licence} الدولية.",
  },
  fr: {
    disclaimer: navigationCopy.fr.disclaimer,
    support: navigationCopy.fr.support,
    attribution:
      "Mordhau © {triternion}. Ce site est non officiel et n'y est pas affilié.",
    licence: "Sous licence {licence}.",
  },
  ja: {
    disclaimer: navigationCopy.ja.disclaimer,
    support: navigationCopy.ja.support,
    attribution:
      "Mordhau © {triternion}。本サイトは非公式であり、同社とは提携していません。",
    licence: "{licence} ライセンスのもとで公開しています。",
  },
  ru: {
    disclaimer: navigationCopy.ru.disclaimer,
    support: navigationCopy.ru.support,
    attribution:
      "Mordhau © {triternion}. Этот сайт неофициальный и не связан с ними.",
    licence: "Под лицензией {licence}.",
  },
  zh: {
    disclaimer: navigationCopy.zh.disclaimer,
    support: navigationCopy.zh.support,
    attribution:
      "Mordhau © {triternion}。本站为非官方站点，与其没有关联。",
    licence: "采用 {licence} 许可协议。",
  },
};

function localizedSiteFooter(locale: SiteLocale) {
  const copy = footerCopy[locale];
  return {
    footer: {
      message: [
        '<span class="mh-foot-go">',
        `<a href="/docs/${locale}/disclaimer/">${copy.disclaimer}</a>`,
        '<a class="mh-foot-support" href="https://buymeacoffee.com/mordhaucommunity" target="_blank" rel="noreferrer">',
        copy.support,
        "</a>",
        "</span>",
      ].join(""),
      copyright: [
        '<span class="mh-foot-attrib">',
        copy.attribution.replace("{triternion}", triternionLink),
        "</span>",
        '<span class="mh-foot-licence">',
        copy.licence.replace("{licence}", licenceLink),
        "</span>",
      ].join(""),
    },
  };
}



/*
 * The search box, in the language of the page.
 *
 * Every string it shows is here: the placeholder in the field, the line of key
 * hints under it, what it says when a query finds nothing, and the labels a
 * screen reader reads off the keys. VitePress keys these by locale rather than
 * merging them into each locale's themeConfig, so they sit in one record and
 * are spread into the search options below.
 *
 * English is left out on purpose. VitePress's own defaults are already the
 * strings this site would have written, and an English copy here would only be
 * one more place to keep them in step.
 */
interface SearchCopy {
  search: string;
  details: string;
  reset: string;
  back: string;
  noResults: string;
  select: string;
  selectKey: string;
  navigate: string;
  upKey: string;
  downKey: string;
  close: string;
  closeKey: string;
}

const searchCopy: Record<TranslatedLocale, SearchCopy> = {
  ar: {
    search: "بحث",
    details: "عرض القائمة التفصيلية",
    reset: "مسح البحث",
    back: "إغلاق البحث",
    noResults: "لا توجد نتائج لـ",
    select: "للاختيار",
    selectKey: "إدخال",
    navigate: "للتنقل",
    upKey: "سهم لأعلى",
    downKey: "سهم لأسفل",
    close: "للإغلاق",
    closeKey: "خروج",
  },
  fr: {
    search: "Rechercher",
    details: "Afficher la liste détaillée",
    reset: "Effacer la recherche",
    back: "Fermer la recherche",
    noResults: "Aucun résultat pour",
    select: "pour sélectionner",
    selectKey: "entrée",
    navigate: "pour naviguer",
    upKey: "flèche haut",
    downKey: "flèche bas",
    close: "pour fermer",
    closeKey: "échap",
  },
  ja: {
    search: "検索",
    details: "詳細リストを表示",
    reset: "検索をリセット",
    back: "検索を閉じる",
    noResults: "結果が見つかりません:",
    select: "選択",
    selectKey: "Enter",
    navigate: "移動",
    upKey: "上矢印",
    downKey: "下矢印",
    close: "閉じる",
    closeKey: "Esc",
  },
  ru: {
    search: "Поиск",
    details: "Показать подробный список",
    reset: "Очистить поиск",
    back: "Закрыть поиск",
    noResults: "Ничего не найдено по запросу",
    select: "выбрать",
    selectKey: "ввод",
    navigate: "перейти",
    upKey: "стрелка вверх",
    downKey: "стрелка вниз",
    close: "закрыть",
    closeKey: "escape",
  },
  zh: {
    search: "搜索",
    details: "显示详细列表",
    reset: "清除搜索",
    back: "关闭搜索",
    noResults: "无法找到相关结果",
    select: "选择",
    selectKey: "回车",
    navigate: "切换",
    upKey: "上箭头",
    downKey: "下箭头",
    close: "关闭",
    closeKey: "退出",
  },
};

function localizedSearch() {
  return Object.fromEntries(
    (Object.keys(searchCopy) as TranslatedLocale[]).map((locale) => {
      const copy = searchCopy[locale];
      return [
        locale,
        {
          translations: {
            button: { buttonText: copy.search, buttonAriaLabel: copy.search },
            modal: {
              displayDetails: copy.details,
              resetButtonTitle: copy.reset,
              backButtonTitle: copy.back,
              noResultsText: copy.noResults,
              footer: {
                selectText: copy.select,
                selectKeyAriaLabel: copy.selectKey,
                navigateText: copy.navigate,
                navigateUpKeyAriaLabel: copy.upKey,
                navigateDownKeyAriaLabel: copy.downKey,
                closeText: copy.close,
                closeKeyAriaLabel: copy.closeKey,
              },
            },
          },
        },
      ];
    }),
  );
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
  // written by .vitepress/theme/Prefs.vue, except mh-announce, which
  // Announce.vue writes to sessionStorage so it lasts one browsing session.
  head: [
    [
      "script",
      {},
      [
        "(function(){var e=document.documentElement,g=function(k,d){",
        "try{return localStorage.getItem(k)||d}catch(_){return d}},",
        "s=function(k,d){try{return sessionStorage.getItem(k)||d}catch(_){return d}};",
        "e.setAttribute('data-mh-corners',g('mh-corners','square'));",
        "e.setAttribute('data-mh-accent',g('mh-accent','oxblood'));",
        "e.setAttribute('data-mh-width',g('mh-width','default'));",
        "e.setAttribute('data-mh-bg-dark',g('mh-bg-dark','default'));",
        "e.setAttribute('data-mh-bg-light',g('mh-bg-light','default'));",
        "e.setAttribute('data-mh-heading',g('mh-heading','default'));",
        "e.setAttribute('data-mh-text',g('mh-text','default'));",
        `e.setAttribute('data-mh-announce',s('mh-announce','')===${JSON.stringify(version)}?'off':'on');`,
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
    editLink: {
      pattern: editLinkPattern,
      text: "Edit this page",
    },
    lastUpdated: {
      text: "Last updated",
      formatOptions: lastUpdatedFormat,
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
        locales: localizedSearch(),
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
        ...localizedSiteFooter("en"),
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
          "/en/mordhauSDK-guide/": [
            {
              text: "MordhauSDK Guide",
              items: [
                { text: "Overview", link: "/en/mordhauSDK-guide/" },
                { text: "Actors", link: "/en/mordhauSDK-guide/actors" },
                { text: "Blueprints", link: "/en/mordhauSDK-guide/blueprints" },
              ],
            },
          ],
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
        ...localizedFooter("ar"),
        ...localizedOutline("ar"),
        ...localizedSiteFooter("ar"),
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
        ...localizedFooter("ru"),
        ...localizedOutline("ru"),
        ...localizedSiteFooter("ru"),
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
        ...localizedFooter("ja"),
        ...localizedOutline("ja"),
        ...localizedSiteFooter("ja"),
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
        ...localizedFooter("fr"),
        ...localizedOutline("fr"),
        ...localizedSiteFooter("fr"),
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
        ...localizedFooter("zh"),
        ...localizedOutline("zh"),
        ...localizedSiteFooter("zh"),
      },
    },
  },
});
