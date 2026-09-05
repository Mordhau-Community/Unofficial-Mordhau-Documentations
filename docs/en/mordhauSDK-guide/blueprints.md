# Blueprints

A **Blueprint** is Unreal's visual scripting: a class you build in a graph instead of in C++. In the Mordhau Editor you rarely write one from nothing. You subclass something the game already ships and change the parts you care about.

That is the mental model worth having before you open anything:

- **C++ classes** — written by Triternion, compiled into the game. `MordhauGameMode`, `ControlPoint`, `MordhauPlayerStart`, `MordhauWeapon`. You cannot edit these.
- **Blueprint assets** — live under `/Game/Mordhau/Blueprints/…` in the Content Browser, and are what the shipped maps and modes actually use. Named `BP_Something`.
- **Your Blueprints** — subclasses of theirs, living in your own mod folder. This is everything you make.

Keeping your work in your own folder is not just tidiness. Editing the game's Blueprints in place makes a mod that conflicts with every other mod that did the same.

::: warning
Paths and property names below are taken from the game's classes, community tooling and server configuration files. Patches move things. Confirm anything important in your own Content Browser, and [tell us](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) when it has drifted.
:::

## The game mode is the first Blueprint you will touch

Every mode is a pair: a **GameMode** that owns the rules and runs on the server, and a **GameState** that holds what all clients need to see — the clock, the scores, the objective status.

| Mode | Blueprints, under `/Game/Mordhau/Blueprints/GameModes/` |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

The rest follow the same `BP_<Mode>GameMode` / `BP_<Mode>GameState` naming — check the folder rather than guessing.

These are the same classes a server admin edits in `Game.ini`, which is why `[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` looks familiar if you have read the [dedicated server guide](/en/dedicated-server-guide/). Config keys and Blueprint properties are the same properties.

### What you inherit from `MordhauGameMode`

Whatever mode you subclass, these come with it. They are the levers most custom modes actually pull:

| Property | Effect |
| --- | --- |
| `PlayerRespawnTime`, `bPlayersSpawnInWaves`, `bUsesSlowPlayerSpawning` | Respawn timing and whether it is wave-based |
| `SpawnProtectionDuration` | Invulnerability window after spawning |
| `DamageFactor`, `TeamDamageFactor`, `TeamDamageFlinch` | Global damage scaling, including friendly fire |
| `bDisableDamage`, `bDisableStamina` | Turn combat systems off — the basis of most non-combat modes |
| `bPlayersDropAllGearOnDeath`, `bEquipmentDoesNotDespawn`, `OverrideEquipmentDespawnTime` | Loot behaviour |
| `KillScoreChange`, `KillTeamScoreChange`, `TeamKillScoreChange`, `AssistScoreFactor`, `bIsScoringDisabled` | Scoring |
| `AutoKickOnTeamKillAmount` | Teamkill punishment |
| `HorseRespawnTime`, `CatapultRespawnTime`, `BallistaRespawnTime` | Vehicle and siege respawns |
| `MapRotation`, `MapVoteMaps` | What comes next after the match |

And the functions and events worth knowing, because they are the hooks for custom behaviour:

- `IsSpawnpointAllowed(PlayerStart, Controller)` and `GetSpawnpointPreference(PlayerStart, Controller)` — the spawn selection pass, paired with the events on [`MordhauPlayerStart`](/en/mordhauSDK-guide/actors#spawns-mordhauplayerstart)
- `OnAfterLogin`, `OnBeforeLogout` — players joining and leaving
- `OnMessageBroadcasted`, `OnRconStringCommand` — chat and RCON, useful if your mode should react to admin commands
- `GetNextMap`, `GetNextMaps`, `VoteLevel` — rotation and voting

## Sublevels — one level per game mode {#sublevels}

A Mordhau map is not one level. It is a **base level** holding the geometry, and one **sublevel per game mode** holding that mode's spawns and objectives. The sublevel's name prefix is what tells the game which mode it is.

| Prefix | Mode |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

The shape of the work, in the Editor:

1. Build the map itself as an ordinary level — geometry, lighting, props.
2. Create an empty level per mode, named prefix-first: `SKM_CabbageLand`.
3. Open it, open the **Levels** window, and set the persistent level's streaming method to **Always Loaded**. It reverts to Blueprint-only every time you make a new sublevel, so set it every time.
4. **Add Existing** → your base map, so the sublevel loads the geometry underneath it.
5. Double-click the persistent level so it turns blue again — blue is what you are editing — and lock the base level to avoid editing it by accident.
6. Place that mode's game mode, spawns and objectives.

Then `changemap SKM_CabbageLand` loads it.

This layout is why the [placement warning](/en/mordhauSDK-guide/actors) matters so much: objectives dropped into the base level instead of the mode sublevel show up in every mode at once.

::: tip
For modes outside that prefix list, the community's [MetaMod](https://mod.io/g/mordhau/m/metamod) extends what a map can support. The sublevel walkthrough above is condensed from the [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki), which has the screenshots.
:::

## Metadata — how the game knows what your map is {#metadata-how-the-game-knows-what-your-map-is}

Two small Blueprintable classes carry everything the menus display. They are easy to forget and then your map has no name and no picture.

**`MapMetaData`**

| Property | What it holds |
| --- | --- |
| `Name`, `Description` | What players see in the browser |
| `BaseMap` | The base level |
| `GameModeMaps` | The mode sublevels that belong to this map |
| `Thumbnail`, `BackgroundImages`, `ForegroundImages` | Menu and loading screen art |
| `Tips` | Loading screen tips |

**`GameModeMetadata`**

| Property | What it holds |
| --- | --- |
| `Prefix` | The sublevel prefix from the table above — this is where that convention is defined |
| `Name`, `Description`, `Thumbnail`, `Tips` | Presentation for the mode |

Making a genuinely new mode means a `GameModeMetadata` subclass with your own prefix, alongside your GameMode and GameState.

## The Level Blueprint

Each level has one, and in Mordhau it derives from `MordhauLevelScriptActor`. It is the right place for scripting that belongs to *this map only* — a door that opens at a score threshold, a bridge that collapses once a point falls.

It is also where map-level systems get started. The community [random spawn system](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau), for example, is installed by dropping its controller into the Level Blueprint and wiring it to `Event BeginPlay`.

Anything you want reusable across maps should be a proper Blueprint class instead. Level Blueprints cannot be inherited from.

## Weapons, equipment and bots {#weapons-equipment-and-bots}

| What | Where to start |
| --- | --- |
| Characters | `BP_MordhauCharacter`, in `/Game/Mordhau/Blueprints/Characters/` |
| Weapons | `MordhauWeapon` and `MordhauEquipment`, plus `MordhauShield`, `FistsWeapon`, `KickWeapon` |
| Ranged | `MordhauProjectile` and `Quiver` |
| Attack timing | `AttackMotion` and the motion classes — windup, release, feint, parry, riposte each have one |
| Animation | `MeleeWeaponAnimationProfile` — the `AnimationProfile` a weapon points at |
| Bots | `BotProfile` and `BotBehaviorProfile`, with `BTTask_MeleeAttack`, `BTTask_MeleeDefend`, `BTTask_RangedAttack` and friends as the behaviour tree nodes |

A custom weapon is largely a numbers exercise once you have duplicated an existing one: windup, release, per-armour damage arrays, stamina costs, knockback. The [Mordhau Modding Wiki's weapon variables page](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md) is the best written reference for what each of those does, and it is worth reading before touching a single value.

## If you only learn five

1. **Your game mode Blueprint** — subclassed from the closest shipped mode
2. **`MordhauPlayerStart`** — no spawns, no map
3. **`ControlPoint`** and its banners — the whole objective layer for Frontline and Invasion
4. **`MapMetaData` and `GameModeMetadata`** — how your map identifies itself
5. **The Level Blueprint** — for the one-off scripting that makes a map yours

## Help us finish this page

Nobody has written a proper end-to-end Mordhau modding manual, and this page is a map of the territory rather than the walkthrough it should be. If you have shipped a mode or a map, the things you know — which properties actually matter, what breaks in packaging, what the shipped maps do that isn't obvious — are exactly what is missing. [Open an issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues), or paste rough notes into the [Discord](https://discord.gg/zuX58yRV84) and we will do the formatting.
