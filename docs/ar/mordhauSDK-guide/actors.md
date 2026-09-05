# الكائنات (Actors) {#actors}

**الكائن (Actor)** هو أي شيء موجود داخل المستوى: جدار، أو ضوء، أو نقطة ظهور، أو نقطة سيطرة، أو حصان. إذا كان بإمكانك تحديده في نافذة العرض وله موضع ودوران وحجم، فهو كائن.

المحرر هو Unreal Engine 4، لذا فإن معظم ما تضعه هو UE4 قياسي — الشبكات (Meshes)، والإضاءة، والحجوم (Volumes)، وشبكة التنقل (NavMesh) — وأي درس تعليمي عن UE4 ينطبق عليه كما هو. ما لا يغطيه أي درس عن UE4 هو تلك المجموعة الصغيرة من الفئات (Classes) التي كتبتها Triternion لخرائط Mordhau نفسها. وهذا هو موضوع هذه الصفحة، لأنه الجزء الذي لن تجده في أي مكان آخر.

::: warning
الأسماء والخصائص أدناه مأخوذة من فئات Mordhau كما هي متاحة لصانعي التعديلات. تُغيّر Triternion الأمور بين تحديث وآخر، ويبقى Content Browser لديك هو المرجع الأعلى دائمًا: إذا لم يطابق شيء هنا ما يعرضه المحرر، فثِق بالمحرر و[أخبرنا](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) لنصحح الصفحة.
:::

## وضع الكائن وضبطه {#placing-and-configuring-one}

طريقتان، وكلتاهما قياسيتان في Unreal:

- لوحة **Place Actors** — لعناصر المحرك الأساسية: الإضاءة، والحجوم، والأشكال الهندسية، والكاميرات.
- **Content Browser** — لكل ما تشحنه Mordhau. ابحث عن الفئة أو المخطط (Blueprint)، ثم اسحبه إلى نافذة العرض.

بعد أن يصبح داخل المستوى، حدّده لتعرض لوحة **Details** على اليمين خصائصه. تعديل خاصية هناك يغيّر *تلك النسخة الموضوعة فقط* — أي الحالة (Instance) لا الفئة. وهذا هو أسلوب العمل مع الأهداف بأكمله: تضع نفس `ControlPoint` خمس مرات، وتمنح كل نسخة اسمًا ومنطقة سيطرة وقائمة متطلبات مختلفة.

أما إذا أردت أن يسري التغيير على كل استخدامات الكائن، فأنت لم تعد تضبط حالة واحدة — أنت بحاجة إلى [فئة فرعية من Blueprint](/ar/mordhauSDK-guide/blueprints).

::: danger تحقق من المستوى الذي تضع فيه
خريطة Mordhau هي مستوى أساسي (Base Level) بالإضافة إلى مستوى فرعي (Sublevel) لكل وضع لعب. في نافذة **Levels**، المستوى المميّز باللون الأزرق هو الذي تحرره، وكل ما تُسقطه في نافذة العرض يذهب إليه.

وضع نقاط سيطرة Frontline بينما المستوى الأساسي هو المحدد هو الخطأ الكلاسيكي للمبتدئين — إذ تصبح الأهداف موجودة في كل وضع يحمّل الخريطة الأساسية. النقر بالزر الأيمن في نافذة العرض ← **Move Selected Actors to Level** يصلح الأمر لاحقًا. تجد [بنية المستويات الفرعية](/ar/mordhauSDK-guide/blueprints#sublevels) في صفحة Blueprints.
:::

## نقاط الظهور — `MordhauPlayerStart` {#spawns-mordhauplayerstart}

بديل Mordhau عن `PlayerStart` في UE4. كل خريطة تحتاجه، وفي كل مستوى فرعي لكل وضع.

| الخاصية | ما تفعله |
| --- | --- |
| `Team` | الفريق المسموح له باستخدام نقطة الظهور. عدد صحيح، والقيمة الافتراضية للفئة هي `5`. وأفضل طريقة لمعرفة الأرقام التي يتوقعها كل وضع هي فتح خريطة رسمية ومعاينتها. |
| `bIsSpawnDisabled` | يعطّل نقطة الظهور. أوضاع الأهداف تبدّل هذه القيمة أثناء المباراة مع تحرك خط الجبهة. |
| `Token` | وسم للتجميع. يملك `ControlPoint` قيمتَي `SpawnsTeam` و`SpawnsToken` المقابلتين، وبهما تستولي النقطة المُسيطر عليها على مجموعة كاملة من نقاط الظهور دفعة واحدة. |

كما يوفّر حدثين يمكنك تنفيذهما في فئة فرعية من Blueprint:

- `IsAllowedSpawnFor(Controller)` — يُرجع ما إذا كان يحق لهذا اللاعب استخدام النقطة أصلًا
- `GetSpawnPreferenceFor(Controller)` — يُرجع درجة تفضيل؛ ويفضّل الوضع النقاط ذات الدرجة الأعلى

الذي يستدعيهما هو وضع اللعب، عبر دالتيه `IsSpawnpointAllowed` و`GetSpawnpointPreference`. وإذا أردت منطق ظهور غير تقليدي — الظهور قرب فريقك، أو بعيدًا عن الأعداء — فهذان الحدثان هما مكانه.

## أهداف السيطرة — `ControlPoint` {#capture-objectives-controlpoint}

الكائن الذي تقوم عليه نقاط Frontline وInvasion. معظم منطق الهدف مدمج فيه أصلًا، ودور مصمم الخريطة هو تعبئة الخصائص.

| الخاصية | ما تفعله |
| --- | --- |
| `Name` | الاسم الذي يراه اللاعبون على النقطة وفي الشريط العلوي |
| `CaptureArea` | المكوّن الذي يجب الوقوف داخله للسيطرة |
| `bIsCapturable` | ما إذا كان يمكن الاستيلاء عليها أصلًا — تُستخدم للنقاط الزخرفية أو المُبرمجة |
| `bIsHiddenPoint` | يُخفيها من الواجهة مع بقائها فعّالة |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | مصفوفات من نقاط `ControlPoint` أخرى يجب امتلاكها أولًا. بهذا يُرتَّب خط Frontline، وبهذا تُمنع القفزات المباشرة إلى النقطة الأخيرة |
| `SpawnPoints` | نقاط `MordhauPlayerStart` التي تسلّمها النقطة عند تغيّر مالكها |
| `SpawnsTeam`، `SpawnsToken` | الفريق ومجموعة الظهور اللذان تتحكم بهما النقطة |
| `bPreventSpawningIfContested` | يمنع الظهور عند النقطة ما دام الأعداء واقفين عليها |
| `CaptureSpeedCurve`، `NeutralizeSpeedCurve`، `UncaptureSpeed` | سرعة السيطرة كمنحنى يعتمد على عدد اللاعبين الحاضرين |
| `AwardScoreCapturing`، `AwardScoreCaptured`، `AwardScoreNeutralizing`، `AwardScoreNeutralized`، `AwardScoreInterval` | النقاط الممنوحة مقابل العمل على الهدف |
| `Banners` | كائنات `CapturePointBanner` التي تتغير بصريًا عند تبدّل مالك النقطة |

يأتي `CapturePointBanner` بنسختين: شبكة ثابتة وشبكة عظمية (`StaticMeshCapturePointBanner` و`SkeletalMeshCapturePointBanner`). ضعها ثم أضِفها إلى مصفوفة `Banners` الخاصة بالنقطة — وستتحرك مع تقدّم السيطرة ما لم تفعّل `bBannersDoNotAnimateCaptureProgress`.

## أهداف الدفع — `PushableActor` {#push-objectives-pushableactor}

العربة، وكبش الحصار، وكل ما يدفعه فريق على طول مسار.

| الخاصية | ما تفعله |
| --- | --- |
| `PushArea` | الحجم الذي يجب أن يكون اللاعب داخله ليدفع |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | منحنيات: السرعة بدلالة عدد الدافعين |
| `bIsPushingAllowed`، `bIsPullingAllowed` | الاتجاهات المسموحة في كل مرحلة |
| `bStopPushingIfContested` | يوقفه عندما يقف الفريقان عليه |
| `bAutoMoveIfAlone`، `AutoMoveSpeed` | يجعله يتحرك من تلقاء نفسه |
| `Progress` | من 0 إلى 1 على طول المسار؛ و`SetProgress` يحركه برمجيًا |
| `ProgressStepToAwardScoreFor`، `ScoreAwardedPerProgressStep` | النقاط الممنوحة مقابل الدفع |

## شبكات تتصرف كما في Mordhau — عائلة `MordhauActor` {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` هو الأساس للعناصر التي تشارك في القتال. فهو يضيف إلى `AActor` العادي مكوّن `DamageableComponent` وخصائص صوت الارتطام (`ThudSound` ونطاقات الحدة والصوت) التي تجعل الضربة تبدو كأنها من Mordhau بدل أن تكون بلا استجابة.

- `StaticMeshMordhauActor` — شبكة ثابتة يمكن أن تتلقى ضررًا. استخدمها بدل `StaticMeshActor` المجرّد كلما وجب أن يتمكن اللاعبون من ضرب الشيء أو تحطيمه.
- `SkeletalMeshMordhauActor` — المكافئ للشبكات العظمية.
- `LODStaticMeshActor` — شبكة ثابتة تستخدم مكوّن LOD الخاص بـ Mordhau. يستحق المعرفة عندما تبدأ الخريطة بالتأثير على الأداء.

## عناصر تتحرك — `EnvironmentMovable` {#props-that-move-environmentmovable}

تمايل الرايات واللافتات المعلقة والحبال وكل ما لا يجب أن يبدو جامدًا. تمنحه `SwayingComponent`، ثم متجهات `Frequency` و`Magnitude` و`Speed` للدوران والميل والانحراف، أو تستدعي `InitializeMovable` لضبطها كلها دفعة واحدة.

## مناطق موقوتة — `MasterField` و`SubField` {#timed-areas-masterfield-and-subfield}

يمتلك `MasterField` مجموعة من حجوم `SubField` ويقودها كوحدة واحدة: `FieldLifeTime` و`FieldDeactivationTime` و`FieldFadeOutTime`، ومرشّح `CollisionFilter` للفئات التي تهمّه، والأحداث `CreateField` و`BeginFieldDeactivation` و`DeactivateAndDestroyField`. أما `FieldSpawnComponent` فهو الجزء الذي يضع الأشياء داخل الحقل، مع محاذاة للأرض (`bSnapLocationToGround`، `SnapGroundRadius`، `MaxAllowedRotation`) وفحص اختياري لخط الرؤية.

هذه هي الآلية وراء المناطق التي تظهر وتنكمش وتنتهي بمؤقّت. وهي أيضًا الركن الأقل توثيقًا في الـ SDK — فإذا كنت قد استخدمتها فعليًا، فملاحظاتك مطلوبة بشدة.

## المركبات ومعدات الحصار {#vehicles-and-siege-equipment}

`Horse` و`Catapult` و`Turret` (المِقلاع/البالِستا) كائنات قابلة للوضع، لكن **توقيت إعادة ظهورها ليس على الكائن نفسه** — بل على وضع اللعب، تحت الأسماء `HorseRespawnTime` و`CatapultRespawnTime` و`BallistaRespawnTime`. ويعرف مشرفو الخوادم هذه الأسماء، فهي نفس القيم التي توضع في [`Game.ini`](/ar/dedicated-server-guide/).

## الروبوتات تحتاج شبكة تنقل {#bots-need-a-nav-mesh}

كل ما فيه ذكاء اصطناعي — وخصوصًا Horde — يحتاج إلى `NavMeshBoundsVolume` يغطي منطقة اللعب، ثم تنفيذ **Build Paths**. هذا من أساسيات Unreal، لكنه السبب الأول لوقوف الروبوتات بلا حراك في الخرائط المخصصة.

## البقية باختصار {#the-rest-briefly}

| الفئة | تقريبًا |
| --- | --- |
| `ProgressActor`، `ProgressDriver`، `SlaveProgressDriver` | كائنات تقودها قيمة تقدّم الهدف؛ للبوابات والأبواب والأهداف متعددة المراحل |
| `MapCameraActor` | كاميرا لعروض الخريطة لا للعب نفسه |
| `ParticleSystemActor`، `GoreActor` | كائنات المؤثرات التي تولّدها اللعبة |
| `MordhauEquipment`، `MordhauWeapon`، `MordhauShield`، `MordhauProjectile`، `Quiver` | كل ما يمكن للاعب حمله — انظر [Blueprints](/ar/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) |
| `BuildingSystemComponent` وفئات `Buildable*Trace` | نظام البناء الخاص بصندوق الأدوات |

## ساعدنا في إكمال هذه الصفحة {#help-us-finish-this-page}

جُمعت هذه الصفحة من فئات اللعبة المتاحة وأدوات المجتمع والخرائط الرسمية — لا من دليل رسمي، لأنه غير موجود. فإذا كنت قد بنيت أهدافًا داخل المحرر وتعرف القيم التي يتوقعها كل وضع فعليًا، فتلك المعرفة أثمن من كل ما في هذه الصفحة. [افتح مشكلة](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) أو اكتبها في [Discord](https://discord.gg/zuX58yRV84) وسنتولى نحن التنسيق.
