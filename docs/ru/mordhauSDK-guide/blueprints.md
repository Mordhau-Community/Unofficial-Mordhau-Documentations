# Blueprints {#blueprints}

**Blueprint** — это визуальный скриптинг Unreal: класс, который вы собираете в графе, а не пишете на C++. В редакторе Mordhau вы редко создаёте его с нуля. Вы наследуетесь от того, что игра уже поставляет, и меняете нужную часть.

Модель, которую стоит держать в голове, прежде чем что-то открывать:

- **Классы C++** — написаны Triternion и скомпилированы в игру. `MordhauGameMode`, `ControlPoint`, `MordhauPlayerStart`, `MordhauWeapon`. Их нельзя редактировать.
- **Ассеты Blueprint** — лежат в `/Game/Mordhau/Blueprints/…` в Content Browser, и именно их используют официальные карты и режимы. Называются `BP_Что-то`.
- **Ваши Blueprint** — подклассы их классов, лежащие в вашей папке мода. Это всё, что вы создаёте.

Держать свою работу в своей папке — не про аккуратность. Правки в Blueprint игры «на месте» дают мод, который конфликтует с каждым другим модом, поступившим так же.

::: warning
Пути и имена свойств ниже взяты из классов игры, общественных инструментов и файлов серверной конфигурации. Патчи двигают вещи с места. Проверяйте всё важное в собственном Content Browser и [сообщайте нам](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues), когда что-то разошлось.
:::

## Игровой режим — первый Blueprint, к которому вы прикоснётесь {#the-game-mode-is-the-first-blueprint-you-will-touch}

Каждый режим — это пара: **GameMode**, который держит правила и работает на сервере, и **GameState**, который несёт то, что должны видеть все клиенты: таймер, счёт, состояние целей.

| Режим | Blueprint, в `/Game/Mordhau/Blueprints/GameModes/` |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

Остальные следуют тому же правилу именования `BP_<Режим>GameMode` / `BP_<Режим>GameState` — лучше посмотреть папку, чем угадывать.

Это те же классы, которые администратор сервера правит в `Game.ini`, поэтому строка `[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` покажется знакомой, если вы читали [руководство по выделенному серверу](/ru/dedicated-server-guide/). Ключи конфига и свойства Blueprint — это одни и те же свойства.

### Что достаётся в наследство от `MordhauGameMode` {#what-you-inherit-from-mordhaugamemode}

Какой бы режим вы ни наследовали, всё это идёт вместе с ним. Это те рычаги, которые пользовательские режимы действительно дёргают:

| Свойство | Эффект |
| --- | --- |
| `PlayerRespawnTime`, `bPlayersSpawnInWaves`, `bUsesSlowPlayerSpawning` | Тайминг возрождения и волновое ли оно |
| `SpawnProtectionDuration` | Окно неуязвимости после появления |
| `DamageFactor`, `TeamDamageFactor`, `TeamDamageFlinch` | Глобальные множители урона, включая дружественный огонь |
| `bDisableDamage`, `bDisableStamina` | Отключение боевых систем — основа большинства небоевых режимов |
| `bPlayersDropAllGearOnDeath`, `bEquipmentDoesNotDespawn`, `OverrideEquipmentDespawnTime` | Поведение выпадающего снаряжения |
| `KillScoreChange`, `KillTeamScoreChange`, `TeamKillScoreChange`, `AssistScoreFactor`, `bIsScoringDisabled` | Начисление очков |
| `AutoKickOnTeamKillAmount` | Наказание за тимкиллы |
| `HorseRespawnTime`, `CatapultRespawnTime`, `BallistaRespawnTime` | Возрождение техники и осадных орудий |
| `MapRotation`, `MapVoteMaps` | Что идёт следующим после матча |

И функции с событиями, которые стоит знать, — это точки подключения своей логики:

- `IsSpawnpointAllowed(PlayerStart, Controller)` и `GetSpawnpointPreference(PlayerStart, Controller)` — выбор точки появления, в паре с событиями [`MordhauPlayerStart`](/ru/mordhauSDK-guide/actors#spawns-mordhauplayerstart)
- `OnAfterLogin`, `OnBeforeLogout` — вход и выход игроков
- `OnMessageBroadcasted`, `OnRconStringCommand` — чат и RCON, полезно, если режим должен реагировать на команды администратора
- `GetNextMap`, `GetNextMaps`, `VoteLevel` — ротация и голосование

## Подуровни — по уровню на режим {#sublevels}

Карта Mordhau — это не один уровень. Это **базовый уровень** с геометрией и **по подуровню на каждый игровой режим** с точками появления и целями этого режима. Именно префикс в имени подуровня сообщает игре, что это за режим.

| Префикс | Режим |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

Как это выглядит в редакторе:

1. Соберите саму карту как обычный уровень — геометрия, освещение, пропы.
2. Создайте по пустому уровню на режим, префикс первым: `SKM_CabbageLand`.
3. Откройте его, откройте окно **Levels** и переключите метод стриминга постоянного уровня на **Always Loaded**. Он сбрасывается обратно на Blueprint-only с каждым новым подуровнем, так что делайте это каждый раз.
4. **Add Existing** → ваша базовая карта, чтобы подуровень подгружал геометрию под собой.
5. Дважды щёлкните по постоянному уровню, чтобы он снова стал синим (синий — то, что вы редактируете), и заблокируйте базовый уровень, чтобы не править его случайно.
6. Разместите игровой режим этого режима, точки появления и цели.

После этого `changemap SKM_CabbageLand` загрузит его.

Именно из-за этой структуры [предупреждение о размещении](/ru/mordhauSDK-guide/actors) настолько важно: цели, положенные в базовый уровень вместо подуровня режима, появятся сразу во всех режимах.

::: tip
Для режимов вне этого списка префиксов общественный [MetaMod](https://mod.io/g/mordhau/m/metamod) расширяет то, что карта может поддерживать. Порядок действий выше сжат из [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki), где есть скриншоты.
:::

## Метаданные — как игра узнаёт, что такое ваша карта {#metadata-how-the-game-knows-what-your-map-is}

Два небольших Blueprintable-класса несут всё, что показывают меню. О них легко забыть — и тогда карта остаётся без названия и без картинки.

**`MapMetaData`**

| Свойство | Что содержит |
| --- | --- |
| `Name`, `Description` | Что игроки видят в браузере |
| `BaseMap` | Базовый уровень |
| `GameModeMaps` | Подуровни режимов, принадлежащие этой карте |
| `Thumbnail`, `BackgroundImages`, `ForegroundImages` | Графика меню и экрана загрузки |
| `Tips` | Подсказки на экране загрузки |

**`GameModeMetadata`**

| Свойство | Что содержит |
| --- | --- |
| `Prefix` | Префикс подуровня из таблицы выше — именно здесь эта договорённость и задаётся |
| `Name`, `Description`, `Thumbnail`, `Tips` | Оформление режима |

Сделать по-настоящему новый режим — значит завести подкласс `GameModeMetadata` со своим префиксом рядом со своими GameMode и GameState.

## Level Blueprint {#the-level-blueprint}

Он есть у каждого уровня, и в Mordhau наследуется от `MordhauLevelScriptActor`. Это правильное место для скриптинга, который принадлежит *только этой карте*: дверь, открывающаяся на определённом счёте, мост, рушащийся после падения точки.

Здесь же запускаются системы уровня карты. Например, общественная [система случайных точек появления](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau) ставится так: контроллер перетаскивается в Level Blueprint и подключается к `Event BeginPlay`.

Всё, что должно переиспользоваться между картами, лучше делать полноценным классом Blueprint: от Level Blueprint нельзя наследоваться.

## Оружие, снаряжение и боты {#weapons-equipment-and-bots}

| Что | С чего начать |
| --- | --- |
| Персонажи | `BP_MordhauCharacter`, в `/Game/Mordhau/Blueprints/Characters/` |
| Оружие | `MordhauWeapon` и `MordhauEquipment`, а также `MordhauShield`, `FistsWeapon`, `KickWeapon` |
| Дальний бой | `MordhauProjectile` и `Quiver` |
| Тайминги атак | `AttackMotion` и классы движений — у windup, release, финта, парирования и рипоста есть свои |
| Анимация | `MeleeWeaponAnimationProfile` — тот `AnimationProfile`, на который ссылается оружие |
| Боты | `BotProfile` и `BotBehaviorProfile`, а узлы дерева поведения — `BTTask_MeleeAttack`, `BTTask_MeleeDefend`, `BTTask_RangedAttack` и им подобные |

Своё оружие после дублирования существующего — во многом упражнение с числами: windup, release, массивы урона по типам брони, расход выносливости, отбрасывание. [Страница переменных оружия в Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md) — лучший письменный справочник по тому, что делает каждая из них, и её стоит прочитать до того, как трогать хоть одно значение.

## Если выучить только пять {#if-you-only-learn-five}

1. **Ваш Blueprint игрового режима** — унаследованный от ближайшего официального режима
2. **`MordhauPlayerStart`** — нет точек появления, нет карты
3. **`ControlPoint`** и его знамёна — весь слой целей Frontline и Invasion
4. **`MapMetaData` и `GameModeMetadata`** — как карта представляет себя
5. **Level Blueprint** — для разовой логики, которая делает карту вашей

## Помогите дописать эту страницу {#help-us-finish-this-page}

Полного руководства по моддингу Mordhau никто так и не написал, и эта страница — карта местности, а не тот пошаговый разбор, которым ей стоило бы быть. Если вы выпускали режим или карту, то, что вы знаете — какие свойства действительно важны, что ломается при упаковке, что делают официальные карты неочевидного — это ровно то, чего не хватает. [Откройте issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) или скиньте черновые заметки в [Discord](https://discord.gg/zuX58yRV84), оформление за нами.
