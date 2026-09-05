# Actor {#actors}

**Actor** 就是关卡里存在的一切：一堵墙、一盏灯、一个出生点、一个占领点、一匹马。只要能在视口里选中它，并且它有位置、旋转和缩放，它就是一个 Actor。

编辑器就是 Unreal Engine 4，所以你放进关卡的绝大部分东西都是标准 UE4——模型、灯光、体积、导航网格——任何 UE4 教程都能原样套用。UE4 教程不会讲的，是 Triternion 为 Mordhau 自家地图写的那一小批类。本页讲的就是它们，因为这部分在别处根本查不到。

::: warning
下面的类名和属性名来自 Mordhau 向 Mod 作者公开的类。Triternion 会在补丁之间改动，而你的 Content Browser 永远说了算：如果这里的写法和编辑器显示的不一致，请以编辑器为准，并[告诉我们](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)，我们会修正页面。
:::

## 放置与配置 {#placing-and-configuring-one}

两个入口，都是 Unreal 的标准做法：

- **Place Actors** 面板——放引擎自带的东西：灯光、体积、几何体、摄像机。
- **Content Browser**——放 Mordhau 自带的一切。搜索类或蓝图，然后拖进视口。

放进关卡后选中它，右侧的 **Details** 面板会列出它的属性。在这里改属性，改的*只是这一个放置副本*——是实例，不是类。目标物的整套工作流就是这样：同一个 `ControlPoint` 放五份，每份给不同的名称、占领范围和前置点列表。

如果你希望某个改动对该 Actor 的所有用处都生效，那你要做的就不是配置实例，而是[蓝图子类](/zh/mordhauSDK-guide/blueprints)。

::: danger 确认你正在往哪个关卡里放
一张 Mordhau 地图是一个基础关卡，加上每个游戏模式各一个子关卡。在 **Levels** 窗口里，蓝色高亮的关卡才是你正在编辑的那个，拖进视口的东西都会落到它里面。

在选中基础关卡的状态下摆 Frontline 的占领点，是最经典的新手错误——这些目标物会出现在所有加载该基础地图的模式里。视口中右键 → **Move Selected Actors to Level** 可以事后补救。[子关卡结构](/zh/mordhauSDK-guide/blueprints#sublevels)在 Blueprints 页面。
:::

## 出生点 —— `MordhauPlayerStart` {#spawns-mordhauplayerstart}

Mordhau 用来替代 UE4 `PlayerStart` 的类。每张地图都需要，而且每个模式子关卡里都要有。

| 属性 | 作用 |
| --- | --- |
| `Team` | 哪支队伍可以使用这个出生点。整数，类的默认值是 `5`。各模式期待哪些数值，最好打开官方地图看一眼。 |
| `bIsSpawnDisabled` | 关闭这个出生点。目标类模式会在对局中随战线推移动态切换它。 |
| `Token` | 分组标签。`ControlPoint` 上有配套的 `SpawnsTeam` 和 `SpawnsToken`，占领点就是靠它一次性接管一整组出生点的。 |

它还暴露了两个事件，可以在蓝图子类里实现：

- `IsAllowedSpawnFor(Controller)` —— 返回该玩家能否使用这个出生点
- `GetSpawnPreferenceFor(Controller)` —— 返回一个分数，模式会优先选分数高的出生点

调用它们的是游戏模式，通过自己的 `IsSpawnpointAllowed` 和 `GetSpawnpointPreference`。想做特别的出生逻辑——在小队附近出生、远离敌人出生——就写在这两个事件里。

## 占领目标 —— `ControlPoint` {#capture-objectives-controlpoint}

Frontline 和 Invasion 占领点背后的 Actor。目标物逻辑基本都已内置，地图作者主要是填属性。

| 属性 | 作用 |
| --- | --- |
| `Name` | 玩家在点位上和顶栏看到的名称 |
| `CaptureArea` | 玩家必须站进去才能占领的碰撞组件 |
| `bIsCapturable` | 能否被占领——用于装饰性或脚本控制的点 |
| `bIsHiddenPoint` | 从 UI 中隐藏，但功能保留 |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | 必须先拥有的其他 `ControlPoint` 数组。Frontline 的推进顺序靠它排定，也靠它阻止一方直接跳到最后一个点 |
| `SpawnPoints` | 该点易手时一并移交的 `MordhauPlayerStart` |
| `SpawnsTeam`、`SpawnsToken` | 该点控制的队伍与出生点分组 |
| `bPreventSpawningIfContested` | 有敌人站在点上时禁止在该点出生 |
| `CaptureSpeedCurve`、`NeutralizeSpeedCurve`、`UncaptureSpeed` | 用曲线表示的占领速度，随点内人数变化 |
| `AwardScoreCapturing`、`AwardScoreCaptured`、`AwardScoreNeutralizing`、`AwardScoreNeutralized`、`AwardScoreInterval` | 完成目标任务获得的分数 |
| `Banners` | 随点位易主而在视觉上换边的 `CapturePointBanner` Actor |

`CapturePointBanner` 有静态网格体和骨骼网格体两个版本（`StaticMeshCapturePointBanner`、`SkeletalMeshCapturePointBanner`）。先放置，再加进点位的 `Banners` 数组——除非勾选 `bBannersDoNotAnimateCaptureProgress`，否则它们会随占领进度做动画。

## 推动目标 —— `PushableActor` {#push-objectives-pushableactor}

推车、攻城槌，以及任何需要一支队伍沿路径推动的东西。

| 属性 | 作用 |
| --- | --- |
| `PushArea` | 玩家必须处在其中才能推动的体积 |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | 曲线：速度随推动人数变化 |
| `bIsPushingAllowed`、`bIsPullingAllowed` | 当前阶段允许哪些方向 |
| `bStopPushingIfContested` | 两队都在上面时冻结它 |
| `bAutoMoveIfAlone`、`AutoMoveSpeed` | 让它自行前进 |
| `Progress` | 路径上的 0–1 进度；`SetProgress` 可从脚本移动它 |
| `ProgressStepToAwardScoreFor`、`ScoreAwardedPerProgressStep` | 推进获得的分数 |

## 表现得像 Mordhau 的网格体 —— `MordhauActor` 家族 {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` 是参与战斗的道具基类。相比普通的 `AActor`，它多了 `DamageableComponent` 和撞击音效属性（`ThudSound`，以及音高与音量范围），有没有它，决定了一次命中是「像 Mordhau」还是「什么反馈都没有」。

- `StaticMeshMordhauActor` —— 可受伤害的静态网格体。凡是玩家应该能砍、能打坏的东西，用它，别用裸的 `StaticMeshActor`。
- `SkeletalMeshMordhauActor` —— 骨骼网格体版本。
- `LODStaticMeshActor` —— 使用 Mordhau 自有 LOD 组件的静态网格体。地图开始吃帧数时就用得上了。

## 会动的道具 —— `EnvironmentMovable` {#props-that-move-environmentmovable}

旗帜、悬挂招牌、绳索等一切不该看起来僵硬的东西的摆动。给它一个 `SwayingComponent`，再设置横滚／俯仰／偏航的 `Frequency`、`Magnitude` 和 `Speed` 向量，或者调用 `InitializeMovable` 一次性设完。

## 限时区域 —— `MasterField` 与 `SubField` {#timed-areas-masterfield-and-subfield}

`MasterField` 拥有一组 `SubField` 体积，并把它们当作一个整体驱动：`FieldLifeTime`、`FieldDeactivationTime`、`FieldFadeOutTime`、关心哪些类的 `CollisionFilter`，以及 `CreateField`、`BeginFieldDeactivation`、`DeactivateAndDestroyField` 等事件。`FieldSpawnComponent` 负责在场域内放置东西，带地面吸附（`bSnapLocationToGround`、`SnapGroundRadius`、`MaxAllowedRotation`）和可选的视线检查。

这套机制支撑着那些会出现、收缩并按计时消失的区域。它也是 SDK 里资料最少的一角——如果你真正用它做过东西，我们非常想要你的笔记。

## 载具与攻城器械 {#vehicles-and-siege-equipment}

`Horse`、`Catapult` 和 `Turret`（弩炮）都是可放置的 Actor，但**它们的重生时间不在 Actor 上**，而在游戏模式上：`HorseRespawnTime`、`CatapultRespawnTime`、`BallistaRespawnTime`。服务器管理员对这些名字不会陌生，因为它们正是写进 [`Game.ini`](/zh/dedicated-server-guide/) 的那些值。

## 机器人需要导航网格 {#bots-need-a-nav-mesh}

凡是涉及 AI 的内容——尤其是 Horde——都需要一个覆盖可玩区域的 `NavMeshBoundsVolume`，并且之后要执行一次 **Build Paths**。这是普通的 Unreal 操作，却是自定义地图里机器人杵着不动最常见的原因。

## 其余的，简单说 {#the-rest-briefly}

| 类 | 大致用途 |
| --- | --- |
| `ProgressActor`、`ProgressDriver`、`SlaveProgressDriver` | 由目标进度值驱动的 Actor：闸门、大门、分阶段目标 |
| `MapCameraActor` | 用于地图视角而非战斗的摄像机 |
| `ParticleSystemActor`、`GoreActor` | 游戏生成的特效类 Actor |
| `MordhauEquipment`、`MordhauWeapon`、`MordhauShield`、`MordhauProjectile`、`Quiver` | 玩家能拿在手里的一切——见 [Blueprints](/zh/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) |
| `BuildingSystemComponent` 及 `Buildable*Trace` 系列 | 工具箱的建造系统 |

## 帮我们把这页写完 {#help-us-finish-this-page}

这一页是从游戏公开的类、社区工具和官方地图拼出来的，而不是抄自手册——因为根本没有手册。如果你在编辑器里搭过目标物，知道某个模式实际期待什么数值，那份知识比这页上的任何内容都值钱。[提一个 issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)，或者丢进 [Discord](https://discord.gg/zuX58yRV84)，排版交给我们。
