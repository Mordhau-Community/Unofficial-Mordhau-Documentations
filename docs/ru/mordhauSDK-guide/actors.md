# Акторы {#actors}

**Актор** (Actor) — это всё, что существует в уровне: стена, источник света, точка появления, точка захвата, лошадь. Если объект можно выделить во вьюпорте и у него есть позиция, поворот и масштаб — это актор.

Редактор — это Unreal Engine 4, поэтому большая часть того, что вы размещаете, — обычный UE4: меши, свет, объёмы, навмеш. Любой туториал по UE4 применим к ним без оговорок. Чего не покрывает ни один туториал по UE4 — это горстка классов, написанных Triternion для карт самого Mordhau. О них и эта страница, потому что именно эту часть больше нигде не найти.

::: warning
Имена и свойства ниже взяты из классов Mordhau в том виде, в каком они доступны моддерам. Triternion меняет вещи между патчами, и ваш Content Browser всегда главнее: если что-то здесь не совпадает с тем, что показывает редактор, верьте редактору и [сообщите нам](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues), чтобы мы исправили страницу.
:::

## Как разместить и настроить {#placing-and-configuring-one}

Два пути, оба стандартные для Unreal:

- Панель **Place Actors** — для примитивов движка: свет, объёмы, геометрия, камеры.
- **Content Browser** — для всего, что поставляется с Mordhau. Найдите класс или Blueprint и перетащите его во вьюпорт.

Когда актор уже в уровне, выделите его — панель **Details** справа покажет его свойства. Изменение свойства там меняет *только эту размещённую копию* — экземпляр, а не класс. На этом и построена вся работа с целями: вы ставите один и тот же `ControlPoint` пять раз и задаёте каждой копии своё имя, свою зону захвата и свой список предварительных точек.

Если изменение должно действовать везде, где используется актор, вы уже настраиваете не экземпляр — вам нужен [подкласс Blueprint](/ru/mordhauSDK-guide/blueprints).

::: danger Проверьте, в какой уровень вы ставите объект
Карта Mordhau — это базовый уровень плюс по одному подуровню на каждый игровой режим. В окне **Levels** уровень, подсвеченный синим, — тот, который вы редактируете, и всё, что вы бросаете во вьюпорт, попадает именно в него.

Расставить точки захвата Frontline при выбранном базовом уровне — классическая ошибка новичка: цели после этого существуют во всех режимах, которые загружают базовую карту. Правый клик во вьюпорте → **Move Selected Actors to Level** исправляет это задним числом. [Структура подуровней](/ru/mordhauSDK-guide/blueprints#sublevels) описана на странице Blueprints.
:::

## Точки появления — `MordhauPlayerStart` {#spawns-mordhauplayerstart}

Замена `PlayerStart` из UE4. Нужны любой карте и в каждом подуровне режима.

| Свойство | Что делает |
| --- | --- |
| `Team` | Какая команда может использовать эту точку. Целое число; значение класса по умолчанию — `5`. Какие числа ожидает конкретный режим, проще всего посмотреть в официальной карте. |
| `bIsSpawnDisabled` | Отключает точку. Режимы с целями переключают это по ходу матча, когда линия фронта сдвигается. |
| `Token` | Метка группировки. У `ControlPoint` есть парные `SpawnsTeam` и `SpawnsToken` — так захваченная точка забирает себе сразу целую группу точек появления. |

Кроме того, класс даёт два события, которые можно реализовать в подклассе Blueprint:

- `IsAllowedSpawnFor(Controller)` — можно ли этому игроку вообще использовать точку
- `GetSpawnPreferenceFor(Controller)` — возвращает оценку; режим предпочитает точки с более высокой оценкой

Вызывает их игровой режим — через свои `IsSpawnpointAllowed` и `GetSpawnpointPreference`. Если нужна нестандартная логика появления — рядом с отрядом, подальше от врагов — она пишется именно в этой паре событий.

## Цели захвата — `ControlPoint` {#capture-objectives-controlpoint}

Актор, на котором держатся точки Frontline и Invasion. Основная логика цели в нём уже есть; автор карты в основном заполняет свойства.

| Свойство | Что делает |
| --- | --- |
| `Name` | Подпись, которую игроки видят на точке и в верхней панели |
| `CaptureArea` | Компонент-область, внутри которой нужно стоять для захвата |
| `bIsCapturable` | Можно ли точку захватить вообще — для декоративных или скриптовых точек |
| `bIsHiddenPoint` | Убирает точку из интерфейса, оставляя её рабочей |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | Массивы других `ControlPoint`, которыми нужно владеть сначала. Так задаётся порядок линии Frontline и так команде не дают перепрыгнуть сразу к последней точке |
| `SpawnPoints` | Те `MordhauPlayerStart`, которые точка передаёт при смене владельца |
| `SpawnsTeam`, `SpawnsToken` | Какой командой и какой группой появления управляет точка |
| `bPreventSpawningIfContested` | Запрещает появление на точке, пока на ней есть враги |
| `CaptureSpeedCurve`, `NeutralizeSpeedCurve`, `UncaptureSpeed` | Скорость захвата кривой, зависящей от числа присутствующих игроков |
| `AwardScoreCapturing`, `AwardScoreCaptured`, `AwardScoreNeutralizing`, `AwardScoreNeutralized`, `AwardScoreInterval` | Очки за работу по цели |
| `Banners` | Акторы `CapturePointBanner`, которые визуально меняют сторону вместе с точкой |

`CapturePointBanner` бывает в вариантах со static mesh и skeletal mesh (`StaticMeshCapturePointBanner`, `SkeletalMeshCapturePointBanner`). Разместите их, затем добавьте в массив `Banners` точки — они анимируются вместе с прогрессом захвата, если не выставлен `bBannersDoNotAnimateCaptureProgress`.

## Цели с толканием — `PushableActor` {#push-objectives-pushableactor}

Повозка, таран — всё, что команда толкает по маршруту.

| Свойство | Что делает |
| --- | --- |
| `PushArea` | Объём, внутри которого нужно находиться, чтобы толкать |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | Кривые: скорость в зависимости от числа толкающих |
| `bIsPushingAllowed`, `bIsPullingAllowed` | Какие направления разрешены на данной фазе |
| `bStopPushingIfContested` | Останавливает объект, когда на нём обе команды |
| `bAutoMoveIfAlone`, `AutoMoveSpeed` | Позволяет ему двигаться самому |
| `Progress` | 0–1 вдоль маршрута; `SetProgress` двигает его из скрипта |
| `ProgressStepToAwardScoreFor`, `ScoreAwardedPerProgressStep` | Очки за продвижение |

## Меши, которые ведут себя как в Mordhau — семейство `MordhauActor` {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` — база для пропов, участвующих в бою. По сравнению с обычным `AActor` он добавляет `DamageableComponent` и свойства звука удара (`ThudSound` и диапазоны высоты и громкости), из-за которых попадание звучит как в Mordhau, а не никак.

- `StaticMeshMordhauActor` — статический меш, которому можно наносить урон. Используйте его, а не голый `StaticMeshActor`, когда объект должен быть бьющимся или разрушаемым.
- `SkeletalMeshMordhauActor` — то же самое для скелетных мешей.
- `LODStaticMeshActor` — статический меш с собственным LOD-компонентом Mordhau. Полезно знать, когда карта начинает стоить кадров.

## Пропы, которые шевелятся — `EnvironmentMovable` {#props-that-move-environmentmovable}

Покачивание знамён, вывесок, верёвок и всего, что не должно выглядеть намертво прибитым. Вы задаёте `SwayingComponent`, а затем векторы `Frequency`, `Magnitude` и `Speed` по крену, тангажу и рысканью — либо вызываете `InitializeMovable` и настраиваете всё сразу.

## Временные зоны — `MasterField` и `SubField` {#timed-areas-masterfield-and-subfield}

`MasterField` владеет набором объёмов `SubField` и управляет ими как целым: `FieldLifeTime`, `FieldDeactivationTime`, `FieldFadeOutTime`, `CollisionFilter` из интересующих классов и события `CreateField`, `BeginFieldDeactivation`, `DeactivateAndDestroyField`. `FieldSpawnComponent` — та часть, что размещает объекты внутри поля, с привязкой к земле (`bSnapLocationToGround`, `SnapGroundRadius`, `MaxAllowedRotation`) и необязательной проверкой линии видимости.

Это механика зон, которые появляются, сжимаются и истекают по таймеру. И это самый недокументированный угол SDK — если вы работали с ним всерьёз, ваши заметки нам очень нужны.

## Техника и осадные орудия {#vehicles-and-siege-equipment}

`Horse`, `Catapult` и `Turret` (баллиста) — размещаемые акторы, но **время их возрождения живёт не на акторе**, а на игровом режиме: `HorseRespawnTime`, `CatapultRespawnTime`, `BallistaRespawnTime`. Администраторы серверов узнают эти имена — это ровно те значения, что прописывают в [`Game.ini`](/ru/dedicated-server-guide/).

## Ботам нужен навмеш {#bots-need-a-nav-mesh}

Всему, где есть ИИ, — особенно Horde — нужен `NavMeshBoundsVolume`, накрывающий игровую зону, и последующий проход **Build Paths**. Это обычный Unreal, но именно это чаще всего объясняет, почему боты на пользовательской карте стоят на месте.

## Остальное, кратко {#the-rest-briefly}

| Класс | Примерно |
| --- | --- |
| `ProgressActor`, `ProgressDriver`, `SlaveProgressDriver` | Акторы, управляемые значением прогресса цели: ворота, двери, поэтапные цели |
| `MapCameraActor` | Камера для видов карты, а не для геймплея |
| `ParticleSystemActor`, `GoreActor` | Акторы эффектов, которые спавнит игра |
| `MordhauEquipment`, `MordhauWeapon`, `MordhauShield`, `MordhauProjectile`, `Quiver` | Всё, что игрок может держать в руках — см. [Blueprints](/ru/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) |
| `BuildingSystemComponent` и классы `Buildable*Trace` | Система строительства из ящика с инструментами |

## Помогите дописать эту страницу {#help-us-finish-this-page}

Страница собрана из открытых классов игры, общественных инструментов и официальных карт — не из руководства, потому что руководства не существует. Если вы делали цели в редакторе и знаете, какие значения режим ждёт на самом деле, это знание ценнее всего, что здесь написано. [Откройте issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) или напишите в [Discord](https://discord.gg/zuX58yRV84) — оформление мы возьмём на себя.
