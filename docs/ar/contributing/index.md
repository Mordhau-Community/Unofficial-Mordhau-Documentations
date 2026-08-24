# المساهمة {#contributing}

هذا الموقع مكتوب بواسطة الأشخاص الذين يستخدمونه. بدأت كل صفحة فيها بشخص
يعمل على حل شيء ما ثم يأخذ الوقت الكافي لتدوينه.

هذه الصفحة هي الإعداد المحلي، من البداية إلى النهاية. لا تحتاج إلى أي منها لإصلاح خطأ مطبعي
أو الإبلاغ عن شيء خاطئ — [طرق المساهمة](/ar/contributing/methods) تغطي المسارات الأسرع، ولا تتضمن أي منها
محطة طرفية. اقرأ [الأحكام والقواعد](/ar/contributing/terms-rules)
قبل فتح طلب السحب في كلتا الحالتين.

## ما تحتاجه {#what-you-need}

- [Node.js](https://nodejs.org/en) 18 أو أحدث
- [Git](https://git-scm.com/downloads)
- Aحساب [GitHub](https://github.com)
- محرر - تم إعداد المستودع لـ [VS Code](https://code.visualstudio.com/)

[الأدوات المطلوبة](/ar/contributing/tools) يحتوي على ملاحظات التثبيت وتكوين التشغيل الأول
لكل منها.

## قم بالإعداد محليًا {#set-up-locally}

Fork [المستودع](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)
على GitHub، ثم انسخ الشوكة وقم بتثبيت:

```bash
git clone https://github.com/YOUR-USERNAME/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations
npm install
```

بدء تشغيل خادم التطوير:

```bash
npm run docs:dev
```

يقوم بطباعة العنوان عليهيتم عرضه، عادةً `http://localhost:5173`. اترك
قيد التشغيل - يتم إعادة تحميل الصفحات أثناء الحفظ.

## قم بإجراء التغيير {#make-your-change}

العمل على فرع، وليس على `main`:

```bash
git checkout -b fix-rcon-ports
```

الصفحات موجودة ضمن `docs/<language>/`، لذلك تنتمي الصفحة الإنجليزية إلى `docs/en/`.
تحتاج الصفحة الجديدة أيضًا إلى إدخال في `.vitepress/config.mts`، أو لا يوجد أي رابط على موقع
هو - هي. يغطي

[How to use Markdown](/ar/contributing/how-to-use-markdown) اصطلاحات الملف
ونمط المنزل. يغطي [ما هو VitePress](/ar/contributing/vitepress)
ملف التكوين وكيفية تناسب المشروع معًا.

## تحقق منه قبل إرساله {#check-it-before-you-send-it}

```bash
npm run docs:build
```

فشل البناء على الروابط الداخلية المعطلة. هذا هو أسهل خطأ ترتكبه في
وأسهل خطأ يمكن تفويته في المعاينة، لذا فإن الأمر يستحق التشغيل حتى لتغيير
على سطر واحد. إذا تم اجتيازه، فإن `npm run docs:preview` يخدم بالضبط ما أنتجته نسخة
.

## أرسلها {#send-it}

```bash
git add .
git commit -m "Correct the RCON port numbers"
git push origin fix-rcon-ports
```

GitHub يعرض فتح طلب سحب من هذا الفرع في المرة التالية التي تزور فيها
المستودع. قل ما الذي تغير ولماذا.

إذا عادت المراجعة تطلب شيئًا ما، فادفع التزامًا آخر إلى نفس فرع
- يقوم طلب السحب بتحديث نفسه. بمجرد الدمج، تقوم Netlify بإعادة بناء
وتنشر الموقع، الأمر الذي يستغرق دقيقة أو دقيقتين.
