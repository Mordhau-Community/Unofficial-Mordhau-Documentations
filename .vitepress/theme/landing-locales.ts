export type LandingLocale = "en" | "ar" | "fr" | "ja" | "ru" | "zh";

type GuideState = "written" | "outline";

export interface LandingCopy {
  eyebrow: string;
  headline: string;
  subtitle: string;
  lede: string;
  findGuide: string;
  helpWrite: string;
  featuresTitle: string;
  features: Array<{ title: string; body: string }>;
  quickrefTitle: string;
  fullServerGuide: string;
  copyLabel: string;
  copiedLabel: string;
  quickref: Array<{
    label: string;
    value: string;
    note: string;
    flagged?: boolean;
  }>;
  guidesTitle: string;
  states: Record<GuideState, string>;
  lanes: Array<{
    audience: string;
    line: string;
    links: Array<{ text: string; path: string; state: GuideState }>;
  }>;
  languagesTitle: string;
  languagesBody: string;
  correctionTitle: string;
  correctionBody: string;
  announcement: string;
  closeAnnouncement: string;
}

export const localeOptions: Array<{
  locale: LandingLocale;
  code: string;
  label: string;
}> = [
  { locale: "en", code: "EN", label: "English" },
  { locale: "ar", code: "AR", label: "العربية" },
  { locale: "fr", code: "FR", label: "Français" },
  { locale: "ja", code: "JA", label: "日本語" },
  { locale: "ru", code: "RU", label: "Русский" },
  { locale: "zh", code: "ZH", label: "中文" },
];

const landingGuidePaths = [
  "contributing/",
  "combat-mechanics/",
  "game-modes/",
  "weapons/",
  "glossary/",
  "mordhau-game/",
  "dedicated-server-guide/",
  "dedicated-server-guide/dedicated-game-server-providers",
  "rcon-guide/",
  "solutions-and-errors/",
  "mordhauSDK-guide/",
  "references/",
] as const;

const localizedRoutes: Record<LandingLocale, ReadonlySet<string>> = {
  en: new Set(landingGuidePaths),
  ar: new Set(landingGuidePaths),
  fr: new Set(landingGuidePaths),
  ja: new Set(landingGuidePaths),
  ru: new Set(landingGuidePaths),
  zh: new Set(landingGuidePaths),
};

export function normalizeLandingLocale(lang: string): LandingLocale {
  const locale = lang.toLowerCase().split("-")[0] as LandingLocale;
  return locale in landingCopies ? locale : "en";
}

export function resolveLandingRoute(locale: LandingLocale, path: string) {
  const localized = localizedRoutes[locale].has(path);
  const targetLocale = localized ? locale : "en";

  return {
    path: `/${targetLocale}/${path}`,
    fallback: locale !== "en" && !localized,
  };
}

export const landingCopies: Record<LandingLocale, LandingCopy> = {
  en: {
    eyebrow: "Unofficial · written by the community",
    headline: "Mordhau Guides",
    subtitle: "The complete guide for the Mordhau game",
    lede:
      "Dedicated servers, RCON, the SDK and the combat system — pulled out of Discord threads and dead forum posts, and kept somewhere you can actually find them.",
    findGuide: "Find your guide",
    helpWrite: "Help write it",
    featuresTitle: "What you get here",
    features: [
      {
        title: "No ads, no trackers",
        body: "Nothing sits between you and the answer. No pop-ups, no newsletter wall, no autoplay video in front of the command you came for.",
      },
      {
        title: "In order, not scattered",
        body: "One page per topic, start to finish, with the exact commands and file paths. Not forty Discord threads and a forum post from 2019.",
      },
      {
        title: "Made to read your way",
        body: "Adjust the accent, page width, type, corners, and background to suit you, then switch on Read Mode for a clean, distraction-free page.",
      },
    ],
    quickrefTitle: "Quick reference · server setup",
    fullServerGuide: "Full server guide →",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    quickref: [
      {
        label: "Steam app",
        value: "629800",
        note: "the dedicated server, not the game (629760)",
      },
      { label: "Game port", value: "7777/UDP", note: "" },
      {
        label: "Beacon port",
        value: "15000/UDP",
        note: "closed, and your server runs fine but never appears",
        flagged: true,
      },
      { label: "Query port", value: "27015/UDP", note: "" },
      {
        label: "Config file",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "WindowsServer on Windows",
      },
    ],
    guidesTitle: "Start where you are",
    states: { written: "written", outline: "outline" },
    lanes: [
      {
        audience: "Players",
        line: "Why the swing that looked early still landed.",
        links: [
          { text: "Combat mechanics", path: "combat-mechanics/", state: "written" },
          { text: "Game modes", path: "game-modes/", state: "written" },
          { text: "Weapons and loadouts", path: "weapons/", state: "written" },
          { text: "Glossary", path: "glossary/", state: "written" },
          { text: "Mordhau game", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "Server owners",
        line: "From an empty box to a server that shows up in the browser.",
        links: [
          {
            text: "Dedicated server guide",
            path: "dedicated-server-guide/",
            state: "written",
          },
          { text: "RCON guide", path: "rcon-guide/", state: "written" },
          {
            text: "Solutions and errors",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "Server providers",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "Modders",
        line: "The Editor, and an honest note about what is still missing.",
        links: [
          { text: "MordhauSDK guide", path: "mordhauSDK-guide/", state: "outline" },
          { text: "References", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "Read it in your language",
    languagesBody:
      "Every guide is available in English, Arabic, French, Japanese, Russian, and Chinese, with the same page structure in every language.",
    correctionTitle: "Something here is wrong",
    correctionBody:
      "Probably. The game gets patched and pages go stale. Every page has an edit link at the bottom, and a correction from someone who just hit the problem beats anything we could guess at.",
    announcement:
      "is here — the guides are stable, and corrections are always welcome.",
    closeAnnouncement: "Close",
  },

  ar: {
    eyebrow: "غير رسمي · كتبه المجتمع",
    headline: "أدلة Mordhau",
    subtitle: "الدليل الشامل للعبة Mordhau",
    lede:
      "الخوادم المخصصة (Dedicated Servers)، والتحكم عن بُعد (RCON)، وحزمة تطوير البرمجيات (SDK)، ونظام القتال — جُمعت من نقاشات Discord ومنشورات المنتديات القديمة، وحُفظت في مكان يسهل العثور عليها فيه.",
    findGuide: "اعثر على دليلك",
    helpWrite: "ساهم في الكتابة",
    featuresTitle: "ما الذي ستجده هنا",
    features: [
      {
        title: "بلا إعلانات أو أدوات تتبّع",
        body: "لا شيء يفصل بينك وبين الإجابة: لا نوافذ منبثقة، ولا اشتراك إخباري، ولا فيديو يعمل تلقائيًا أمام الأمر الذي تبحث عنه.",
      },
      {
        title: "مرتّبة وليست مبعثرة",
        body: "صفحة واحدة لكل موضوع من البداية إلى النهاية، مع الأوامر ومسارات الملفات الدقيقة، بدلًا من عشرات نقاشات Discord ومنشور منتدى قديم.",
      },
      {
        title: "اقرأها بالطريقة التي تناسبك",
        body: "خصّص لون التمييز (Accent)، وعرض الصفحة، والخط، والزوايا، والخلفية، ثم فعّل وضع القراءة (Read Mode) لصفحة واضحة بلا مشتتات.",
      },
    ],
    quickrefTitle: "مرجع سريع · إعداد الخادم (Server Setup)",
    fullServerGuide: "دليل الخادم الكامل ←",
    copyLabel: "نسخ",
    copiedLabel: "تم النسخ",
    quickref: [
      {
        label: "تطبيق Steam (Steam App)",
        value: "629800",
        note: "الخادم المخصص (Dedicated Server)، وليس اللعبة (629760)",
      },
      { label: "منفذ اللعبة (Game Port)", value: "7777/UDP", note: "" },
      {
        label: "منفذ الإشارة (Beacon Port)",
        value: "15000/UDP",
        note: "إذا كان مغلقًا، يعمل الخادم لكنه لا يظهر في القائمة",
        flagged: true,
      },
      { label: "منفذ الاستعلام (Query Port)", value: "27015/UDP", note: "" },
      {
        label: "ملف الإعدادات (Config File)",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "استخدم WindowsServer على Windows",
      },
    ],
    guidesTitle: "ابدأ من موقعك",
    states: { written: "مكتمل", outline: "مخطط" },
    lanes: [
      {
        audience: "اللاعبون (Players)",
        line: "لماذا أصابت الضربة (Swing) رغم أنها بدت مبكرة؟",
        links: [
          {
            text: "ميكانيكيات القتال (Combat Mechanics)",
            path: "combat-mechanics/",
            state: "written",
          },
          { text: "أوضاع اللعب (Game Modes)", path: "game-modes/", state: "written" },
          {
            text: "الأسلحة والعتاد (Weapons & Loadouts)",
            path: "weapons/",
            state: "written",
          },
          { text: "قاموس المصطلحات (Glossary)", path: "glossary/", state: "written" },
          { text: "لعبة Mordhau", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "مالكو الخوادم (Server Owners)",
        line: "من جهاز فارغ إلى خادم يظهر في متصفح الخوادم (Server Browser).",
        links: [
          {
            text: "دليل الخادم المخصص (Dedicated Server Guide)",
            path: "dedicated-server-guide/",
            state: "written",
          },
          {
            text: "دليل التحكم عن بُعد (RCON Guide)",
            path: "rcon-guide/",
            state: "written",
          },
          {
            text: "الحلول والأخطاء (Solutions & Errors)",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "مزودو الخوادم (Server Providers)",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "صانعو التعديلات (Modders)",
        line: "المحرر (Editor)، مع توضيح صريح لما لا يزال ناقصًا.",
        links: [
          {
            text: "دليل MordhauSDK",
            path: "mordhauSDK-guide/",
            state: "outline",
          },
          { text: "المراجع (References)", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "اقرأها بلغتك",
    languagesBody:
      "كل دليل متاح بالإنجليزية والعربية والفرنسية واليابانية والروسية والصينية، مع بنية الصفحات نفسها في كل لغة.",
    correctionTitle: "هل وجدت معلومة خاطئة؟",
    correctionBody:
      "هذا وارد. تتلقى اللعبة تحديثات وقد تصبح الصفحات قديمة. ستجد رابط تعديل أسفل كل صفحة، وتصحيح ممن واجه المشكلة أفضل من أي تخمين.",
    announcement:
      "متاح الآن — الأدلة مستقرة، ونرحب دائمًا بالتصحيحات.",
    closeAnnouncement: "إغلاق",
  },

  fr: {
    eyebrow: "Non officiel · écrit par la communauté",
    headline: "Guides Mordhau",
    subtitle: "Le guide complet du jeu Mordhau",
    lede:
      "Serveurs dédiés, RCON, SDK et système de combat — réunis depuis des discussions Discord et d’anciens forums, puis conservés dans un endroit où vous pouvez réellement les retrouver.",
    findGuide: "Trouver votre guide",
    helpWrite: "Contribuer",
    featuresTitle: "Ce que vous trouverez ici",
    features: [
      {
        title: "Sans publicité ni suivi",
        body: "Rien ne s’interpose entre vous et la réponse : aucune fenêtre surgissante, aucune inscription obligatoire et aucune vidéo automatique devant la commande recherchée.",
      },
      {
        title: "Ordonné, pas dispersé",
        body: "Une page par sujet, du début à la fin, avec les commandes et chemins exacts. Pas quarante discussions Discord et un message de forum datant de 2019.",
      },
      {
        title: "Une lecture à votre façon",
        body: "Réglez la couleur d’accent, la largeur, la typographie, les angles et l’arrière-plan, puis activez le mode Lecture pour une page claire et sans distraction.",
      },
    ],
    quickrefTitle: "Référence rapide · configuration du serveur",
    fullServerGuide: "Guide complet du serveur →",
    copyLabel: "Copier",
    copiedLabel: "Copié",
    quickref: [
      {
        label: "Application Steam",
        value: "629800",
        note: "le serveur dédié, pas le jeu (629760)",
      },
      { label: "Port de jeu", value: "7777/UDP", note: "" },
      {
        label: "Port Beacon",
        value: "15000/UDP",
        note: "s’il est fermé, le serveur fonctionne mais n’apparaît jamais",
        flagged: true,
      },
      { label: "Port de requête", value: "27015/UDP", note: "" },
      {
        label: "Fichier de configuration",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "WindowsServer sous Windows",
      },
    ],
    guidesTitle: "Commencez là où vous en êtes",
    states: { written: "rédigé", outline: "plan" },
    lanes: [
      {
        audience: "Joueurs",
        line: "Pourquoi ce coup qui semblait trop tôt a quand même touché.",
        links: [
          { text: "Mécaniques de combat", path: "combat-mechanics/", state: "written" },
          { text: "Modes de jeu", path: "game-modes/", state: "written" },
          { text: "Armes et équipements", path: "weapons/", state: "written" },
          { text: "Glossaire", path: "glossary/", state: "written" },
          { text: "Jeu Mordhau", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "Propriétaires de serveurs",
        line: "D’une machine vide à un serveur visible dans le navigateur.",
        links: [
          {
            text: "Guide du serveur dédié",
            path: "dedicated-server-guide/",
            state: "written",
          },
          { text: "Guide RCON", path: "rcon-guide/", state: "written" },
          {
            text: "Solutions et erreurs",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "Hébergeurs de serveurs",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "Moddeurs",
        line: "L’Editor, avec un point honnête sur ce qui manque encore.",
        links: [
          { text: "Guide MordhauSDK", path: "mordhauSDK-guide/", state: "outline" },
          { text: "Références", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "Lisez dans votre langue",
    languagesBody:
      "Chaque guide est disponible en anglais, arabe, français, japonais, russe et chinois, avec la même structure de pages dans chaque langue.",
    correctionTitle: "Quelque chose est incorrect ?",
    correctionBody:
      "C’est possible. Le jeu évolue et les pages vieillissent. Chaque page propose un lien de modification, et la correction d’une personne ayant rencontré le problème vaut mieux qu’une supposition.",
    announcement:
      "est disponible — les guides sont stables et les corrections sont toujours les bienvenues.",
    closeAnnouncement: "Fermer",
  },

  ja: {
    eyebrow: "非公式 · コミュニティ制作",
    headline: "Mordhau ガイド",
    subtitle: "Mordhau を網羅する完全ガイド",
    lede:
      "専用サーバー、RCON、SDK、戦闘システムの情報を、Discord のスレッドや古いフォーラム投稿から集め、必要なときに見つけられる場所へまとめました。",
    findGuide: "ガイドを探す",
    helpWrite: "執筆に参加する",
    featuresTitle: "このサイトで得られるもの",
    features: [
      {
        title: "広告なし、追跡なし",
        body: "答えを探す邪魔になるものはありません。ポップアップも、メルマガ登録も、必要なコマンドを隠す自動再生動画もありません。",
      },
      {
        title: "整理され、散らばっていない",
        body: "各トピックを最初から最後まで1ページにまとめ、正確なコマンドとファイルパスを掲載。大量の Discord スレッドや2019年の投稿を探し回る必要はありません。",
      },
      {
        title: "自分に合った読み方",
        body: "アクセント色、ページ幅、書体、角、背景を調整し、Read Mode を使えば、気が散らない読みやすいページになります。",
      },
    ],
    quickrefTitle: "クイックリファレンス · サーバー設定",
    fullServerGuide: "サーバー完全ガイド →",
    copyLabel: "コピー",
    copiedLabel: "コピー済み",
    quickref: [
      {
        label: "Steam アプリ",
        value: "629800",
        note: "ゲーム本体（629760）ではなく専用サーバー",
      },
      { label: "ゲームポート", value: "7777/UDP", note: "" },
      {
        label: "Beacon ポート",
        value: "15000/UDP",
        note: "閉じているとサーバーは動作しても一覧に表示されません",
        flagged: true,
      },
      { label: "Query ポート", value: "27015/UDP", note: "" },
      {
        label: "設定ファイル",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "Windows では WindowsServer",
      },
    ],
    guidesTitle: "目的から始める",
    states: { written: "完成", outline: "概要" },
    lanes: [
      {
        audience: "プレイヤー",
        line: "早すぎるように見えた攻撃が、なぜ命中したのか。",
        links: [
          { text: "戦闘メカニクス", path: "combat-mechanics/", state: "written" },
          { text: "ゲームモード", path: "game-modes/", state: "written" },
          { text: "武器とロードアウト", path: "weapons/", state: "written" },
          { text: "用語集", path: "glossary/", state: "written" },
          { text: "Mordhau ゲーム", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "サーバー管理者",
        line: "空のマシンから、ブラウザーに表示されるサーバーまで。",
        links: [
          {
            text: "専用サーバーガイド",
            path: "dedicated-server-guide/",
            state: "written",
          },
          { text: "RCON ガイド", path: "rcon-guide/", state: "written" },
          {
            text: "解決策とエラー",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "サーバープロバイダー",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "Mod 制作者",
        line: "Editor と、まだ不足している内容についての正直な説明。",
        links: [
          { text: "MordhauSDK ガイド", path: "mordhauSDK-guide/", state: "outline" },
          { text: "参考資料", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "自分の言語で読む",
    languagesBody:
      "すべてのガイドを英語、アラビア語、フランス語、日本語、ロシア語、中国語で利用でき、どの言語でも同じページ構成です。",
    correctionTitle: "内容に誤りがありますか？",
    correctionBody:
      "その可能性があります。ゲームは更新され、ページは古くなります。各ページの編集リンクから、実際に問題を経験した方の修正を送ってください。推測よりも確実です。",
    announcement:
      "を公開しました — ガイドは安定版となり、修正提案もいつでも歓迎します。",
    closeAnnouncement: "閉じる",
  },

  ru: {
    eyebrow: "Неофициально · создано сообществом",
    headline: "Руководства Mordhau",
    subtitle: "Полное руководство по игре Mordhau",
    lede:
      "Выделенные серверы, RCON, SDK и боевая система — собраны из обсуждений Discord и старых форумов и сохранены там, где их действительно можно найти.",
    findGuide: "Найти руководство",
    helpWrite: "Помочь с текстом",
    featuresTitle: "Что вы найдёте здесь",
    features: [
      {
        title: "Без рекламы и слежки",
        body: "Ничто не мешает добраться до ответа: никаких всплывающих окон, обязательных подписок и автоматически запускаемых видео перед нужной командой.",
      },
      {
        title: "По порядку, а не вразброс",
        body: "Одна страница на тему, от начала до конца, с точными командами и путями к файлам. Не сорок веток Discord и сообщение на форуме за 2019 год.",
      },
      {
        title: "Читайте так, как удобно вам",
        body: "Настройте акцентный цвет, ширину страницы, шрифт, углы и фон, а затем включите режим чтения для чистой страницы без отвлекающих элементов.",
      },
    ],
    quickrefTitle: "Краткая справка · настройка сервера",
    fullServerGuide: "Полное руководство по серверу →",
    copyLabel: "Копировать",
    copiedLabel: "Скопировано",
    quickref: [
      {
        label: "Приложение Steam",
        value: "629800",
        note: "выделенный сервер, а не игра (629760)",
      },
      { label: "Игровой порт", value: "7777/UDP", note: "" },
      {
        label: "Порт Beacon",
        value: "15000/UDP",
        note: "если закрыт, сервер работает, но не появляется в списке",
        flagged: true,
      },
      { label: "Порт запросов", value: "27015/UDP", note: "" },
      {
        label: "Файл конфигурации",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "WindowsServer в Windows",
      },
    ],
    guidesTitle: "Начните со своей задачи",
    states: { written: "готово", outline: "план" },
    lanes: [
      {
        audience: "Игроки",
        line: "Почему слишком ранний на вид удар всё же попал в цель.",
        links: [
          { text: "Механика боя", path: "combat-mechanics/", state: "written" },
          { text: "Режимы игры", path: "game-modes/", state: "written" },
          { text: "Оружие и снаряжение", path: "weapons/", state: "written" },
          { text: "Глоссарий", path: "glossary/", state: "written" },
          { text: "Игра Mordhau", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "Владельцы серверов",
        line: "От пустой машины до сервера, видимого в браузере.",
        links: [
          {
            text: "Руководство по выделенному серверу",
            path: "dedicated-server-guide/",
            state: "written",
          },
          { text: "Руководство RCON", path: "rcon-guide/", state: "written" },
          {
            text: "Решения и ошибки",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "Провайдеры серверов",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "Моддеры",
        line: "Editor и честный список того, чего пока не хватает.",
        links: [
          { text: "Руководство MordhauSDK", path: "mordhauSDK-guide/", state: "outline" },
          { text: "Источники", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "Читайте на своём языке",
    languagesBody:
      "Все руководства доступны на английском, арабском, французском, японском, русском и китайском языках с одинаковой структурой страниц.",
    correctionTitle: "Нашли ошибку?",
    correctionBody:
      "Такое возможно. Игра обновляется, а страницы устаревают. Внизу каждой страницы есть ссылка для редактирования, и исправление от человека, столкнувшегося с проблемой, лучше любой догадки.",
    announcement:
      "уже доступна — руководства стабильны, а исправления всегда приветствуются.",
    closeAnnouncement: "Закрыть",
  },

  zh: {
    eyebrow: "非官方 · 由社区编写",
    headline: "Mordhau 指南",
    subtitle: "完整的 Mordhau 游戏指南",
    lede:
      "专用服务器、RCON、SDK 与战斗系统资料——从 Discord 讨论和旧论坛帖子中整理，并集中保存到真正容易查找的地方。",
    findGuide: "查找指南",
    helpWrite: "参与编写",
    featuresTitle: "你可以在这里获得什么",
    features: [
      {
        title: "无广告，无追踪",
        body: "答案与你之间没有阻碍：没有弹窗、没有订阅墙，也没有挡住所需命令的自动播放视频。",
      },
      {
        title: "井然有序，不再零散",
        body: "每个主题集中在一个页面，从头到尾提供准确命令和文件路径，无需翻找几十个 Discord 讨论和 2019 年的论坛帖子。",
      },
      {
        title: "按你的方式阅读",
        body: "调整强调色、页面宽度、字体、圆角和背景，再开启阅读模式，获得清晰且不受干扰的页面。",
      },
    ],
    quickrefTitle: "快速参考 · 服务器设置",
    fullServerGuide: "完整服务器指南 →",
    copyLabel: "复制",
    copiedLabel: "已复制",
    quickref: [
      {
        label: "Steam 应用",
        value: "629800",
        note: "专用服务器，而不是游戏本体（629760）",
      },
      { label: "游戏端口", value: "7777/UDP", note: "" },
      {
        label: "Beacon 端口",
        value: "15000/UDP",
        note: "若关闭，服务器仍会运行，但不会出现在列表中",
        flagged: true,
      },
      { label: "查询端口", value: "27015/UDP", note: "" },
      {
        label: "配置文件",
        value: "Mordhau/Saved/Config/LinuxServer/Game.ini",
        note: "Windows 系统使用 WindowsServer",
      },
    ],
    guidesTitle: "从你的目标开始",
    states: { written: "已完成", outline: "提纲" },
    lanes: [
      {
        audience: "玩家",
        line: "看似出手过早的攻击为什么仍然命中。",
        links: [
          { text: "战斗机制", path: "combat-mechanics/", state: "written" },
          { text: "游戏模式", path: "game-modes/", state: "written" },
          { text: "武器与配装", path: "weapons/", state: "written" },
          { text: "术语表", path: "glossary/", state: "written" },
          { text: "Mordhau 游戏", path: "mordhau-game/", state: "written" },
        ],
      },
      {
        audience: "服务器管理员",
        line: "从空白主机到能在浏览器中显示的服务器。",
        links: [
          {
            text: "专用服务器指南",
            path: "dedicated-server-guide/",
            state: "written",
          },
          { text: "RCON 指南", path: "rcon-guide/", state: "written" },
          {
            text: "解决方案与错误",
            path: "solutions-and-errors/",
            state: "written",
          },
          {
            text: "服务器提供商",
            path: "dedicated-server-guide/dedicated-game-server-providers",
            state: "written",
          },
        ],
      },
      {
        audience: "模组制作者",
        line: "Editor，以及对尚缺内容的坦诚说明。",
        links: [
          { text: "MordhauSDK 指南", path: "mordhauSDK-guide/", state: "outline" },
          { text: "参考资料", path: "references/", state: "written" },
        ],
      },
    ],
    languagesTitle: "用你的语言阅读",
    languagesBody:
      "所有指南均提供英语、阿拉伯语、法语、日语、俄语和中文版本，并在每种语言中保持相同的页面结构。",
    correctionTitle: "发现内容有误？",
    correctionBody:
      "这很可能发生。游戏会更新，页面也会过时。每页底部都有编辑链接；亲自遇到问题的人提交的修正，比任何猜测都更可靠。",
    announcement:
      "现已发布——指南已进入稳定版本，也始终欢迎修正建议。",
    closeAnnouncement: "关闭",
  },
};
