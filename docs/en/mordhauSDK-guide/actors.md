# Actors

An **actor** is anything that exists in a level: a wall, a light, a spawn point, a capture point, a horse. If you can select it in the viewport and it has a position, rotation and scale, it is an actor.

The Editor is Unreal Engine 4, so most of what you place is plain UE4 — meshes, lights, volumes, the nav mesh — and every UE4 tutorial applies to it unchanged. What no UE4 tutorial covers is the handful of classes Triternion wrote for Mordhau's own maps. Those are what this page is about, because they are the part you cannot look up anywhere else.

::: warning
The names and properties below come from Mordhau's own classes as they are exposed to modders. Triternion changes things between patches, and your Content Browser is always the authority: if something here does not match what the Editor shows you, trust the Editor and [tell us](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) so we can fix the page.
:::

## Placing and configuring one

Two ways in, both standard Unreal:

- **Place Actors** panel — for engine primitives: lights, volumes, geometry, cameras.
- **Content Browser** — for everything Mordhau ships. Search for the class or Blueprint, then drag it into the viewport.

Once it is in the level, select it and the **Details** panel on the right lists its properties. Editing a property there changes *that placed copy only* — the instance, not the class. That is the whole workflow for objectives: you place the same `ControlPoint` five times and give each copy a different name, capture area and prerequisite list.

If you want a change to apply everywhere the actor is used, you are no longer configuring an instance — you need a [Blueprint subclass](/en/mordhauSDK-guide/blueprints).

::: danger Check which level you are placing into
A Mordhau map is a base level plus one sublevel per game mode. In the **Levels** window, the level highlighted in blue is the one you are editing, and anything you drop into the viewport goes into it.

Placing Frontline's capture points while the base level is selected is the classic beginner mistake — the objectives then exist in every mode that loads the base map. Right-click in the viewport → **Move Selected Actors to Level** fixes it after the fact. The [sublevel layout](/en/mordhauSDK-guide/blueprints#sublevels) is on the Blueprints page.
:::

## Spawns — `MordhauPlayerStart` {#spawns-mordhauplayerstart}

Mordhau's replacement for UE4's `PlayerStart`. Every map needs these, in every mode sublevel.

| Property | What it does |
| --- | --- |
| `Team` | Which team may use this start. An integer; the class default is `5`. Which numbers a mode expects is best read off a shipped map — open one and look. |
| `bIsSpawnDisabled` | Turns the start off. Objective modes flip this at runtime as the front line moves. |
| `Token` | A grouping tag. `ControlPoint` has matching `SpawnsTeam` and `SpawnsToken` values, which is how a captured point takes ownership of a whole cluster of starts at once. |

It also exposes two events you can implement in a Blueprint subclass:

- `IsAllowedSpawnFor(Controller)` — return whether this player may use the start at all
- `GetSpawnPreferenceFor(Controller)` — return a score; the mode prefers higher-scoring starts

The game mode is what calls into these, through its own `IsSpawnpointAllowed` and `GetSpawnpointPreference`. If you want unusual spawn logic — spawn near your squad, spawn away from enemies — that pair of events is where it goes.

## Capture objectives — `ControlPoint` {#capture-objectives-controlpoint}

The actor behind Frontline and Invasion points. It carries most of the objective logic already; a map author mainly fills in properties.

| Property | What it does |
| --- | --- |
| `Name` | The label players see on the point and in the top bar |
| `CaptureArea` | The primitive component players must stand in to capture |
| `bIsCapturable` | Whether it can be taken at all — used for decorative or scripted points |
| `bIsHiddenPoint` | Keeps it out of the UI while still functioning |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | Arrays of other `ControlPoint`s that must be owned first. This is how a Frontline lane is ordered, and how you stop a team leapfrogging to the last point |
| `SpawnPoints` | The `MordhauPlayerStart`s this point hands over when it changes hands |
| `SpawnsTeam`, `SpawnsToken` | Which team and which spawn group the point controls |
| `bPreventSpawningIfContested` | Stops spawning on a point while enemies are standing on it |
| `CaptureSpeedCurve`, `NeutralizeSpeedCurve`, `UncaptureSpeed` | Capture rate as a curve driven by how many players are present |
| `AwardScoreCapturing`, `AwardScoreCaptured`, `AwardScoreNeutralizing`, `AwardScoreNeutralized`, `AwardScoreInterval` | Score handed out for objective work |
| `Banners` | The `CapturePointBanner` actors that visually flip when the point changes owner |

`CapturePointBanner` comes in a static mesh and a skeletal mesh variant (`StaticMeshCapturePointBanner`, `SkeletalMeshCapturePointBanner`). Place them, then add them to the point's `Banners` array — they animate with capture progress unless you set `bBannersDoNotAnimateCaptureProgress`.

## Push objectives — `PushableActor` {#push-objectives-pushableactor}

The cart, the ram, anything a team shoves along a path.

| Property | What it does |
| --- | --- |
| `PushArea` | The volume players must be inside to push |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | Curves: speed as a function of how many players are pushing |
| `bIsPushingAllowed`, `bIsPullingAllowed` | Which directions are legal, per phase |
| `bStopPushingIfContested` | Freeze it when both teams are on it |
| `bAutoMoveIfAlone`, `AutoMoveSpeed` | Let it drift on its own |
| `Progress` | 0–1 along its path; `SetProgress` moves it from script |
| `ProgressStepToAwardScoreFor`, `ScoreAwardedPerProgressStep` | Score for pushing |

## Meshes that behave like Mordhau's — the `MordhauActor` family {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` is the base for props that participate in combat. Over a plain `AActor` it adds a `DamageableComponent` and the impact-sound properties (`ThudSound`, plus pitch and volume ranges) that make a hit sound like Mordhau instead of like nothing.

- `StaticMeshMordhauActor` — a static mesh that can be damaged. Use it, not a plain `StaticMeshActor`, when players should be able to hit or destroy the thing.
- `SkeletalMeshMordhauActor` — the same for skeletal meshes.
- `LODStaticMeshActor` — a static mesh using Mordhau's own LOD component. Worth knowing about when a map starts costing frames.

## Props that move — `EnvironmentMovable` {#props-that-move-environmentmovable}

Sway for banners, hanging signs, ropes and anything else that should not be rigid. You give it a `SwayingComponent` and then roll/pitch/yaw `Frequency`, `Magnitude` and `Speed` vectors, or call `InitializeMovable` to set all of it at once.

## Timed areas — `MasterField` and `SubField` {#timed-areas-masterfield-and-subfield}

A `MasterField` owns a set of `SubField` volumes and drives them as one unit: `FieldLifeTime`, `FieldDeactivationTime`, `FieldFadeOutTime`, a `CollisionFilter` of classes it cares about, and events `CreateField`, `BeginFieldDeactivation`, `DeactivateAndDestroyField`. `FieldSpawnComponent` is the piece that places things inside a field, with ground snapping (`bSnapLocationToGround`, `SnapGroundRadius`, `MaxAllowedRotation`) and an optional line-of-sight check.

This is the machinery behind areas that appear, shrink and expire on a timer. It is the least documented corner of the SDK — if you have used it in anger, we would very much like your notes.

## Vehicles and siege equipment

`Horse`, `Catapult` and `Turret` (the ballista) are placeable actors, but their **respawn timing does not live on the actor** — it lives on the game mode, as `HorseRespawnTime`, `CatapultRespawnTime` and `BallistaRespawnTime`. Server admins recognise those names because they are the same values that go in [`Game.ini`](/en/dedicated-server-guide/).

## Bots need a nav mesh

Anything with AI in it — Horde especially — needs a `NavMeshBoundsVolume` covering the playable area, and a **Build Paths** pass afterwards. This is ordinary Unreal, but it is the single most common reason bots stand still in a custom map.

## The rest, briefly

| Class | Roughly |
| --- | --- |
| `ProgressActor`, `ProgressDriver`, `SlaveProgressDriver` | Actors driven by an objective progress value; used for gates, doors and staged objectives |
| `MapCameraActor` | Camera used for map-level views rather than gameplay |
| `ParticleSystemActor`, `GoreActor` | Effect actors the game spawns |
| `MordhauEquipment`, `MordhauWeapon`, `MordhauShield`, `MordhauProjectile`, `Quiver` | Everything a player can hold — see [Blueprints](/en/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) |
| `BuildingSystemComponent` and the `Buildable*Trace` classes | The toolbox building system |

## Help us finish this page

This is assembled from the game's exposed classes, community tooling and the shipped maps — not from a manual, because there isn't one. If you have built objectives in the Editor and know which values a mode actually expects, that knowledge is worth more than anything on this page. [Open an issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) or drop it in the [Discord](https://discord.gg/zuX58yRV84) and we will write it up.
