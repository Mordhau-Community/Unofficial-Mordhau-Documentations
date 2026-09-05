# المخططات (Blueprints) {#blueprints}

**المخطط (Blueprint)** هو نظام البرمجة المرئية في Unreal: فئة تبنيها في رسم بياني بدل كتابتها بلغة C++‎. وفي محرر Mordhau نادرًا ما تكتب مخططًا من الصفر؛ بل ترث شيئًا تشحنه اللعبة أصلًا وتغيّر الجزء الذي يهمك.

هذا هو التصور الذي يستحق أن تحمله قبل أن تفتح أي شيء:

- **فئات C++‎** — كتبتها Triternion وتُصرَّف داخل اللعبة: `MordhauGameMode`، `ControlPoint`، `MordhauPlayerStart`، `MordhauWeapon`. لا يمكنك تعديلها.
- **أصول Blueprint** — موجودة في `/Game/Mordhau/Blueprints/…` داخل Content Browser، وهي ما تستخدمه الخرائط والأوضاع الرسمية فعليًا. تُسمّى `BP_شيء`.
- **مخططاتك أنت** — فئات فرعية من فئاتهم، تعيش في مجلد التعديل الخاص بك. وهذا كل ما تصنعه.

إبقاء عملك في مجلدك الخاص ليس مسألة ترتيب فحسب؛ فتعديل مخططات اللعبة في مكانها يُنتج تعديلًا يتعارض مع كل تعديل آخر فعل الشيء نفسه.

::: warning
المسارات وأسماء الخصائص أدناه مأخوذة من فئات اللعبة وأدوات المجتمع وملفات إعدادات الخوادم. والتحديثات تنقل الأشياء من مكانها. تحقّق من كل ما يهمّك داخل Content Browser لديك، و[أخبرنا](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) عندما تتغير الأمور.
:::

## وضع اللعب هو أول مخطط ستلمسه {#the-game-mode-is-the-first-blueprint-you-will-touch}

كل وضع هو زوج: **GameMode** يملك القواعد ويعمل على الخادم، و**GameState** يحمل ما يجب أن يراه كل العملاء — المؤقّت، والنتائج، وحالة الأهداف.

| الوضع | المخططات، ضمن `/Game/Mordhau/Blueprints/GameModes/` |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

وتتبع البقية التسمية نفسها `BP_<الوضع>GameMode` / `BP_<الوضع>GameState` — راجع المجلد بدل التخمين.

هذه هي الفئات نفسها التي يحررها مشرف الخادم في `Game.ini`، ولهذا يبدو السطر `[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` مألوفًا إن كنت قد قرأت [دليل الخادم المخصص](/ar/dedicated-server-guide/). مفاتيح الإعدادات وخصائص المخطط هي الخصائص ذاتها.

### ما ترثه من `MordhauGameMode` {#what-you-inherit-from-mordhaugamemode}

مهما كان الوضع الذي ترث منه، فهذه تأتي معه. وهي المقابض التي تحركها معظم الأوضاع المخصصة فعليًا:

| الخاصية | الأثر |
| --- | --- |
| `PlayerRespawnTime`، `bPlayersSpawnInWaves`، `bUsesSlowPlayerSpawning` | توقيت إعادة الظهور، وهل يكون على شكل موجات |
| `SpawnProtectionDuration` | مدة الحصانة بعد الظهور |
| `DamageFactor`، `TeamDamageFactor`، `TeamDamageFlinch` | معاملات الضرر العامة، بما فيها ضرر الفريق |
| `bDisableDamage`، `bDisableStamina` | تعطيل أنظمة القتال — أساس معظم الأوضاع غير القتالية |
| `bPlayersDropAllGearOnDeath`، `bEquipmentDoesNotDespawn`، `OverrideEquipmentDespawnTime` | سلوك العتاد المتساقط |
| `KillScoreChange`، `KillTeamScoreChange`، `TeamKillScoreChange`، `AssistScoreFactor`، `bIsScoringDisabled` | احتساب النقاط |
| `AutoKickOnTeamKillAmount` | عقوبة قتل الزملاء |
| `HorseRespawnTime`، `CatapultRespawnTime`، `BallistaRespawnTime` | إعادة ظهور المركبات ومعدات الحصار |
| `MapRotation`، `MapVoteMaps` | ما الذي يأتي بعد المباراة |

ثم الدوال والأحداث الجديرة بالمعرفة، لأنها نقاط التعليق للسلوك المخصص:

- `IsSpawnpointAllowed(PlayerStart, Controller)` و`GetSpawnpointPreference(PlayerStart, Controller)` — اختيار نقطة الظهور، وتعمل بالتوازي مع أحداث [`MordhauPlayerStart`](/ar/mordhauSDK-guide/actors#spawns-mordhauplayerstart)
- `OnAfterLogin` و`OnBeforeLogout` — دخول اللاعبين وخروجهم
- `OnMessageBroadcasted` و`OnRconStringCommand` — الدردشة وRCON، ومفيدة إن كان وضعك يجب أن يتفاعل مع أوامر الإدارة
- `GetNextMap` و`GetNextMaps` و`VoteLevel` — التدوير والتصويت

## المستويات الفرعية — مستوى لكل وضع لعب {#sublevels}

خريطة Mordhau ليست مستوى واحدًا. بل **مستوى أساسي** يحمل الأشكال الهندسية، و**مستوى فرعي لكل وضع لعب** يحمل نقاط ظهور ذلك الوضع وأهدافه. وبادئة اسم المستوى الفرعي هي ما يخبر اللعبة بالوضع المقصود.

| البادئة | الوضع |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

وشكل العمل داخل المحرر:

1. ابنِ الخريطة نفسها كمستوى عادي — أشكال هندسية وإضاءة وعناصر.
2. أنشئ مستوى فارغًا لكل وضع، والبادئة أولًا: `SKM_CabbageLand`.
3. افتحه، ثم افتح نافذة **Levels**، واضبط طريقة البثّ للمستوى الدائم على **Always Loaded**. تعود القيمة إلى Blueprint-only مع كل مستوى فرعي جديد، فاضبطها في كل مرة.
4. **Add Existing** ← خريطتك الأساسية، ليحمّل المستوى الفرعي الأشكال الهندسية تحته.
5. انقر نقرًا مزدوجًا على المستوى الدائم ليعود أزرق — والأزرق هو ما تحرره — واقفل المستوى الأساسي تجنبًا لتعديله سهوًا.
6. ضَع وضع اللعب الخاص بذلك الوضع، ونقاط الظهور، والأهداف.

بعدها يحمّله الأمر `changemap SKM_CabbageLand`.

وهذه البنية هي بالضبط سبب أهمية [التحذير الخاص بالوضع](/ar/mordhauSDK-guide/actors): فالأهداف التي تُسقَط في المستوى الأساسي بدل المستوى الفرعي تظهر في كل الأوضاع دفعة واحدة.

::: tip
للأوضاع خارج قائمة البادئات هذه، يوسّع [MetaMod](https://mod.io/g/mordhau/m/metamod) المجتمعي ما يمكن للخريطة دعمه. والخطوات أعلاه مختصرة من [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki)، حيث تجد لقطات الشاشة.
:::

## البيانات الوصفية — كيف تعرف اللعبة ما هي خريطتك {#metadata-how-the-game-knows-what-your-map-is}

فئتان صغيرتان قابلتان للاشتقاق تحملان كل ما تعرضه القوائم. يسهل نسيانهما، وحينها تبقى خريطتك بلا اسم وبلا صورة.

**`MapMetaData`**

| الخاصية | ما تحمله |
| --- | --- |
| `Name`، `Description` | ما يراه اللاعبون في المتصفح |
| `BaseMap` | المستوى الأساسي |
| `GameModeMaps` | المستويات الفرعية للأوضاع التابعة لهذه الخريطة |
| `Thumbnail`، `BackgroundImages`، `ForegroundImages` | صور القوائم وشاشات التحميل |
| `Tips` | نصائح شاشة التحميل |

**`GameModeMetadata`**

| الخاصية | ما تحمله |
| --- | --- |
| `Prefix` | بادئة المستوى الفرعي من الجدول أعلاه — وهنا بالضبط يُعرَّف هذا العُرف |
| `Name`، `Description`، `Thumbnail`، `Tips` | طريقة عرض الوضع |

لذا فإن صنع وضع جديد فعلًا يعني فئة فرعية من `GameModeMetadata` ببادئتك الخاصة، إلى جانب GameMode وGameState.

## مخطط المستوى (Level Blueprint) {#the-level-blueprint}

لكل مستوى واحد منه، وفي Mordhau يرث من `MordhauLevelScriptActor`. وهو المكان الصحيح للبرمجة التي تخص *هذه الخريطة وحدها* — باب يُفتح عند نتيجة معينة، أو جسر ينهار عند سقوط نقطة.

وهو أيضًا حيث تنطلق الأنظمة الخاصة بالخريطة. فمثلًا [نظام الظهور العشوائي](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau) المجتمعي يُثبَّت بإسقاط وحدة التحكم الخاصة به داخل مخطط المستوى وربطها بـ `Event BeginPlay`.

أما ما تريد إعادة استخدامه عبر عدة خرائط فيجب أن يكون فئة Blueprint كاملة: لا يمكن الوراثة من مخططات المستويات.

## الأسلحة والعتاد والروبوتات {#weapons-equipment-and-bots}

| الموضوع | من أين تبدأ |
| --- | --- |
| الشخصيات | `BP_MordhauCharacter` في `/Game/Mordhau/Blueprints/Characters/` |
| الأسلحة | `MordhauWeapon` و`MordhauEquipment`، إضافة إلى `MordhauShield` و`FistsWeapon` و`KickWeapon` |
| الأسلحة البعيدة | `MordhauProjectile` و`Quiver` |
| توقيت الهجمات | `AttackMotion` وفئات الحركة — لكل من التحضير والإطلاق والخداع والصد والرد فئة خاصة |
| الرسوم المتحركة | `MeleeWeaponAnimationProfile` — أي `AnimationProfile` الذي يشير إليه السلاح |
| الروبوتات | `BotProfile` و`BotBehaviorProfile`، مع `BTTask_MeleeAttack` و`BTTask_MeleeDefend` و`BTTask_RangedAttack` وأمثالها كعُقد لشجرة السلوك |

صنع سلاح مخصص هو في معظمه تمرين على الأرقام بعد أن تنسخ سلاحًا موجودًا: التحضير، والإطلاق، ومصفوفات الضرر حسب الدرع، وتكاليف اللياقة، والارتداد. و[صفحة متغيرات الأسلحة في Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md) هي أفضل مرجع مكتوب لمعنى كل قيمة، ويستحق أن يُقرأ قبل تغيير أي رقم.

## إن لم تتعلم إلا خمسة {#if-you-only-learn-five}

1. **مخطط وضع اللعب الخاص بك** — مشتق من أقرب وضع رسمي
2. **`MordhauPlayerStart`** — بلا نقاط ظهور لا توجد خريطة
3. **`ControlPoint`** ورايته — طبقة الأهداف كاملة في Frontline وInvasion
4. **`MapMetaData` و`GameModeMetadata`** — كيف تعرّف خريطتك عن نفسها
5. **مخطط المستوى** — للبرمجة الفريدة التي تجعل الخريطة خريطتك

## ساعدنا في إكمال هذه الصفحة {#help-us-finish-this-page}

لم يكتب أحد دليلًا متكاملًا لتعديل Mordhau من البداية إلى النهاية، وهذه الصفحة خريطة للمنطقة أكثر منها دليلًا خطوة بخطوة كما ينبغي أن تكون. فإذا سبق أن نشرت وضعًا أو خريطة، فما تعرفه — أي الخصائص تهم فعلًا، وما الذي ينكسر عند التغليف، وما تفعله الخرائط الرسمية مما ليس بديهيًا — هو تحديدًا ما ينقص هنا. [افتح مشكلة](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) أو ألصق ملاحظاتك الخام في [Discord](https://discord.gg/zuX58yRV84) وسنتولى التنسيق.
