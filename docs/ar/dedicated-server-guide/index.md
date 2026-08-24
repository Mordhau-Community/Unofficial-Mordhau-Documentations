# دليل استضافة الخادم المخصص {#dedicated-server-hosting-guide}

ستجد أدناه كيفية استضافة خادم مخصص Mordhau على Windows وعلى Linux.

يفترض الكثير من هذا أنك تستضيف الخادم بنفسك، إما على جهاز على شبكتك المنزلية أو على VPS أو صندوق مخصص تستأجره. إذا كنت تفضل عدم إدارة أي منها، فهناك قائمة بـ [متعهدو خدمة ألعاب مخصصون](/ar/dedicated-server-guide/dedicated-game-server-providers) الذين سيقومون بإعداد واحدة لك ويمنحونك لوحة تحكم بدلاً من ذلك.

بينما يحاول هذا الدليل أن يكون كاملاً قدر الإمكان، فإن Mordhau لمالك الخادم Discord لا يزال أفضل مكان للحصول على مساعدة بشأن مشكلة خاصة بالإعداد الخاص بك.

## قبل أن تبدأ {#before-you-start}

سوف تحتاج إلى:

- آلة تظل قيد التشغيل. الخادم الذي يصبح غير متصل بالإنترنت عند إغلاق اللعبة لا يفيد كثيرًا أي شخص.
- **SteamCMD**، أداة سطر أوامر Valve لتنزيل ملفات الخادم.
- القدرة على إعادة توجيه المنافذ على جهاز التوجيه الخاص بك، إذا كنت تستضيف من المنزل.

** لا ** تحتاج إلى امتلاك Mordhau على الحساب الذي تستخدمه. الخادم المخصص عبارة عن تنزيل مجاني منفصل وتثبيت من خلال تسجيل دخول مجهول Steam.

::: tip
ثنائي الخادم هو تطبيق Steam **629800**. وهذا يختلف عن اللعبة نفسها، وهي 629760. إن تنزيل اللعبة الخاطئة هو الخطأ الأكثر شيوعًا الذي يرتكبه الأشخاص هنا.
:::

## تثبيت SteamCMD {#installing-steamcmd}

::: مجموعة التعليمات البرمجية

```powershell [Windows]
# Download steamcmd.zip from
# https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip
# and extract it somewhere sensible, for example C:\steamcmd
```

```bash [Linux]
sudo apt update
sudo apt install lib32gcc-s1
mkdir -p ~/steamcmd && cd ~/steamcmd
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

:::

::: warning
SteamCMD هو برنامج 32 بت. في تثبيت Linux 64 بت، لن يبدأ إلا بعد وجود مكتبات دعم 32 بت، وهو ما يهدف إليه `lib32gcc-s1`. في التوزيعات الأقدم، تسمى هذه الحزمة `lib32gcc1`.
:::

## تحميل السيرفر {#downloading-the-server}

::: مجموعة الكود

```powershell [Windows]
.\steamcmd.exe +force_install_dir C:\mordhau-server +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

:::

إنها بضعة غيغابايت، لذا امنحها وقتًا. قم بتشغيل نفس الأمر مرة أخرى عندما تريد تحديث الخادم بعد التصحيح.

::: warning
ضع `+force_install_dir` **قبل** `+login`. يقوم SteamCMD بمعالجة الوسائط بالترتيب، وإذا تم تسجيل الدخول أولاً، فإنه يتجاهل دليل التثبيت الخاص بك ويقوم بالتنزيل في المجلد الخاص به بدلاً من ذلك.
:::

## الإطلاق الأول {#first-launch}

قم بتشغيل الخادم مرة واحدة بدون وسائط. لن يكون قابلاً للتشغيل بعد - النقطة المهمة هي أنه يكتب ملفات التكوين الخاصة به، ثم تقوم بإيقافه.

::: مجموعة الرموز

```powershell [Windows]
cd C:\mordhau-server
.\MordhauServer.exe
```

```bash [Linux]
cd ~/mordhau-server
./MordhauServer.sh
```

:::

دعه ينتهي من البدء، ثم أغلقه.

## التكوين {#configuration}

ملفات التكوين موجودة الآن في:

|منصة |المسار |
|--- |--- |
|Windows |`Mordhau\Saved\Config\WindowsServer\` |
|Linux |`Mordhau/Saved/Config/LinuxServer/` |

الشخص الذي يهمك هو `Game.ini`.

::: danger
قم بتحرير هذه الملفات فقط أثناء توقف الخادم. يحتفظ Mordhau بتكوينه في الذاكرة ويكتبه مرة أخرى عند إيقاف التشغيل، لذا فإن أي شيء تقوم بتغييره أثناء تشغيله يتم استبداله بمجرد إغلاقه.
:::

### Game. ini {#gameini}

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
ServerPassword=
AdminPassword=changethis
BannedPlayers=()

[/Script/Mordhau.MordhauGameMode]
PlayerRespawnTime=5.000000
BallistaRespawnTime=30.000000
CatapultRespawnTime=30.000000
HorseRespawnTime=30.000000
DamageFactor=1.000000
TeamDamageFactor=0.500000
MapRotation=FFA_ThePit
MapRotation=TDM_Camp
MapRotation=SKM_Grad
```

**`[/Script/Mordhau.MordhauGameSession]`**

|مفتاح |ماذا يفعل |
|--- |--- |
|`ServerName` |الاسم الظاهر في المتصفح داخل اللعبة |
|`MaxSlots` |قدرة اللاعب |
|`ServerPassword` |اتركه فارغا لخادم عام |
|`AdminPassword` |ما يكتبه المسؤولون باستخدام `adminlogin` في وحدة التحكم |
|`Admins` |معرف Playfab واحد. كرر السطر مرة واحدة لكل مشرف |
|`BannedPlayers` |تتم إدارته بواسطة الأمر `ban`، ونادرًا ما تقوم بتحرير هذا يدويًا |

**`[/Script/Mordhau.MordhauGameMode]`**

أوقات إعادة النشر بالثواني. يقوم `DamageFactor` بقياس كل الأضرار، حيث يكون `1.0` عاديًا و`2.0` يضاعفه. يقوم `TeamDamageFactor` بقياس النيران الصديقة بشكل منفصل، وبالتالي فإن `0.5` الافتراضي يعني أن أعضاء الفريق يحصلون على نصف الضرر من بعضهم البعض.

### تدوير الخريطة {#map-rotation}

قم بإضافة خط `MapRotation` واحد لكل خريطة. الترتيب هو الترتيب الذي يتم اللعب به، وتتحكم القائمة أيضًا في ما يظهر في تصويت الخريطة داخل اللعبة.

أسماء الخرائط هي بادئة الوضع بالإضافة إلى اسم الخريطة:

|البادئة |الوضع |
|--- |--- |
|`FFA_` |الكل ضد الكل (Free for All) |
|`TDM_` |مواجهة الفرق حتى الموت (Team Deathmatch) |
|`SKM_` |المناوشة (Skirmish) |

خرائط المخزون هي `ThePit`، `Camp`، `Grad`،`Contraband`، و`Tourney`، و`MountainPeak`، و`Taiga`، والتي تمنحك أسماء مثل `FFA_Grad` أو `TDM_MountainPeak`.

### Engine. ini {#engineini}

اختياري. الإعداد الذي يلمسه معظم المالكين في النهاية هو معدل التجزئة:

```ini
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=60
```

الأعلى هو أكثر سلاسة ويكلف المزيد من وحدة المعالجة المركزية. لا ترفعه إلا إذا كنت تعلم أن الجهاز يمكنه الاستمرار - فالخادم الذي لا يمكنه الاحتفاظ بمعدل التجزئة الخاص به يبدو أسوأ بكثير من الخادم الأقل المستقر.

## بدء تشغيل الخادم بشكل صحيح {#starting-the-server-properly}

ابدأ الآن بخريطة والمنافذ:

::: مجموعة الأكواد

```powershell [Windows]
.\MordhauServer.exe Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

```bash [Linux]
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

:::

ضع ذلك في`.bat` على Windows أو برنامج نصي Shell على Linux حتى لا تعيد كتابته في كل مرة.

|المعلمة |الغرض |
|--- |--- |
|`-Port` |لعبة المرور |
|`-BeaconPort` |كيف يصل متصفح الخادم إلى الخادم الخاص بك |
|`-QueryPort` |استعلام Steam، كيف يقرأ المتصفح عدد اللاعبين الخاص بك |
|`-MultiHome` |قم بالربط بعنوان IP محلي واحد محدد، إذا كان الجهاز يحتوي على عدة |
|`-RconPort` |مستمع RCON، راجع [دليل RCON](/ar/rcon-guide/) |
|`-log` |الطباعة إلى وحدة التحكم بدلاً من الملف | فقط

على Linux، قم بتشغيله تحت `screen` أو `tmux` - أو الأفضل من ذلك، اكتب وحدة systemd - بحيث تنجو من إغلاق جلسة SSH:

```bash
screen -dmS mordhau ./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

## المنافذ {#ports}

|ميناء |البروتوكول |لماذا |
|--- |--- |--- |
|7777 |يو دي بي |لعبة |
|15000 |يو دي بي |منارة |
|27015 |يو دي بي |استعلام Steam |
|منفذ RCON الخاص بك |برنامج التعاون الفني |وحدة التحكم عن بعد، فقط إذا قمت بتمكينها |

يجب أن تكون جميع منافذ UDP الثلاثة مفتوحة وموجهة، وليس فقط منفذ اللعبة. إذا تم حظر البرنامج الملحق أو منفذ الاستعلام، فإن الخادم الخاص بك يعمل بشكل جيد ولن يظهر أبدًا في المتصفح - وهو الشيء الوحيد الأكثر شيوعًا الذي يسأل عنه الناس.

تشغيل أكثر من خادم على نفس الجهاز؟امنح كل مجموعة مجموعتها الخاصة، مع التباعد بينها:

```bash
-Port=7779 -BeaconPort=15002 -QueryPort=27018
```

## التحقق من نجاحها {#checking-it-worked}

ابحث عن اسم الخادم الخاص بك في المتصفح داخل اللعبة. إذا لم يكن هناك، فاعمل على ذلك بالترتيب:

**لا يوجد شيء في المتصفح على الإطلاق. ** دائمًا ما يكون منفذ الإشارة أو الاستعلام. تحقق من قواعد إعادة التوجيه الخاصة بك، وتحقق من جدار الحماية الموجود على الجهاز نفسه - يقوم جدار الحماية Windows بحظر الخادم عند التشغيل لأول مرة ومن السهل النقر فوق المطالبة.

**مرئي، ولكن لا يمكن لأحد الاتصال. ** منفذ اللعبة. نفس الشيكات، المنفذ 7777.

** جيد على الشبكة المحلية، غير مرئي بالخارج. ** لا يقوم جهاز التوجيه الخاص بك بإعادة التوجيه، أو أن مزود خدمة الإنترنت لديك يدعم CGNAT - وفي هذه الحالة لا يمكنك الاستضافة من هذا الاتصال على الإطلاق وستحتاج إلى VPS.

**تغييرات التكوين لم تفعل شيئًا. ** لقد قمت بتحرير الملف أثناء تشغيل الخادم. توقف، عدل، ابدأ.

**يبدأ الخادم ويغلق على الفور. ** اقرأ السجل في `Mordhau/Saved/Logs/`. المنفذ قيد الاستخدام بالفعل هو السبب المعتاد.

## الخطوات التالية {#next-steps}

- قم بإعداد [RCON](/ar/rcon-guide/) حتى تتمكن من إدارة الخادم دون أن تكون في اللعبة
- ألق نظرة على [قائمة مقدمي الخدمات](/ar/dedicated-server-guide/dedicated-game-server-providers) إذا تبين أن إدارة هذا الأمر بنفسك ليست فكرتك عن المرح
