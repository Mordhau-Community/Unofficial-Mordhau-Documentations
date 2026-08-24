# ما هو VitePress؟ {#what-is-vitepress}

VitePress هو الشيء الذي يحول هذا المستودع إلى موقع ويب. إذا قمت بكتابة ملفات Markdown، فإن VitePress يعرضها في صفحات HTML مع التنقل والبحث والموضوع المرفق بالفعل.

لا تحتاج إلى فهمها لكتابة الوثائق. توجد هذه الصفحة عندما تريد تغيير شيء هيكلي - أضف صفحة إلى الشريط الجانبي، أو أضف لغة، أو اكتشف سبب شكوى خادم التطوير.

## كيف يتناسب المشروع معًا {#how-the-project-fits-together}

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

كل ملف `.md` ضمن`docs/` يصبح صفحة. يتبع عنوان URL مسار الملف، لذا يتم عرض `docs/en/rcon-guide/index.md` على `/docs/en/rcon-guide/`.

## الأوامر الثلاثة {#the-three-commands}

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev` هو الذي ستستخدمه. يقوم بإعادة تحميل الصفحة في متصفحك في كل مرة تقوم فيها بحفظ ملف.

::: tip
يقوم خادم التطوير بطباعة العنوان الذي يستمع إليه عند بدء التشغيل، عادةً `http://localhost:5173`. استخدم ما تطبعه بدلاً من استخدام منفذ - فهو يختار منفذاً مختلفاً إذا تم أخذ هذا المنفذ.
:::

## ملف التكوين {#the-config-file}

`.vitepress/config.mts` هو الملف الوحيد الذي تحتاج إلى توخي الحذر فيه، لأن هناك خطأ في بناء الجملة يمنع الموقع بأكمله من البناء بدلاً من كسر صفحة واحدة.

الأجزاء التي من المرجح أن تلمسها:

**`themeConfig.nav`** — الروابط عبر الشريط العلوي.

**`themeConfig.sidebar`** — شريط التنقل الأيسر. يتم ربطه بواسطة بادئة المسار، لذلك تظهر الكتلة `"/en/contributing/"` فقط على الصفحات الموجودة ضمن هذا المسار.

**`locales`** — إدخال واحد لكل لغة. ولكل منها `nav` و`sidebar`، بالإضافة إلى `dir` من `ltr` أو `rtl`.

تبدو إضافة صفحة إلى الشريط الجانبي كما يلي:

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

`link` هو عنوان URL، وليس مسار الملف— لا توجد بادئة `docs/` ولا `.md` في النهاية.

::: warning
احفظ التكوين أثناء تشغيل خادم dev ويقوم بإعادة تشغيل نفسه. إذا توقف مع وجود خطأ، فاقرأ الأسطر القليلة الأخيرة - فهي غالبًا ما تكون عبارة عن فاصلة مفقودة أو قوس غير مغلق، وتخبرك برقم السطر.
:::

## اللغات من اليمين إلى اليسار {#right-to-left-languages}

تقوم اللغة العربية بتعيين `dir: "rtl"`، وتعكس `postcss-rtl` ورقة الأنماط تلقائيًا في وقت الإنشاء. لا تحتاج إلى كتابة CSS منفصل لها.

## ماذا يحدث عند دمج التغيير {#what-happens-when-your-change-is-merged}

Netlify يراقب فرع `main`. يؤدي الدمج إلى تشغيل `npm run docs:build`، ويتم نشر الموقع الذي تم إنشاؤه. يستغرق هذا دقيقة أو دقيقتين.

يتم إدخال مخرجات البناء في `.vitepress/dist/` ولم يتم الالتزام بها عمدًا - يتم تجديدها من Markdown في كل مرة، لذا فإن الالتزام بها سيؤدي فقط إلى خلق تعارضات.

## تعلم المزيد {#learning-more}

إن [VitePress](https://vitepress.dev) شامل وسهل القراءة. تسرد صفحة [Markdown](https://vitepress.dev/guide/markdown) على وجه الخصوص أكثر مما نستخدمه هنا - إذا كنت تريد ميزة وتتساءل عما إذا كانت موجودة، فمن المحتمل أنها موجودة في تلك الصفحة.
