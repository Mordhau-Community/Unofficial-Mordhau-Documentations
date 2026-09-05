# 蓝图 {#blueprints}

**蓝图（Blueprint）** 是 Unreal 的可视化脚本：一个用图表搭出来、而不是用 C++ 写出来的类。在 Mordhau 编辑器里，你很少从零开始写一个蓝图，而是继承游戏已有的东西，只改自己关心的部分。

打开任何东西之前，先建立这个概念模型：

- **C++ 类** —— Triternion 写好并编译进游戏的。`MordhauGameMode`、`ControlPoint`、`MordhauPlayerStart`、`MordhauWeapon`。你改不了它们。
- **蓝图资源** —— 位于 Content Browser 的 `/Game/Mordhau/Blueprints/…`，官方地图和模式实际用的就是这些，命名为 `BP_某某`。
- **你的蓝图** —— 它们的子类，放在你自己的 Mod 文件夹里。你做的一切都属于这一层。

把成果放在自己的文件夹里不只是整洁问题。直接改动游戏自带的蓝图，会做出一个与所有同样干法的 Mod 互相冲突的 Mod。

::: warning
下面的路径和属性名取自游戏的类、社区工具以及服务器配置文件。补丁会挪动东西。重要的内容请在自己的 Content Browser 里确认，发现对不上时[告诉我们](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)。
:::

## 你最先要动的蓝图是游戏模式 {#the-game-mode-is-the-first-blueprint-you-will-touch}

每个模式都是一对：持有规则、运行在服务器上的 **GameMode**，和承载所有客户端都要看到的信息（计时、比分、目标状态）的 **GameState**。

| 模式 | 蓝图，位于 `/Game/Mordhau/Blueprints/GameModes/` |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

其余模式遵循同样的 `BP_<模式>GameMode` / `BP_<模式>GameState` 命名——去文件夹里看，别猜。

这些正是服务器管理员在 `Game.ini` 里编辑的类，所以如果你读过[专用服务器指南](/zh/dedicated-server-guide/)，`[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` 会显得很眼熟。配置项和蓝图属性本来就是同一批属性。

### 从 `MordhauGameMode` 继承到什么 {#what-you-inherit-from-mordhaugamemode}

无论你继承哪个模式，这些都会一并带过来。自定义模式真正会去拨动的，多半就在其中：

| 属性 | 效果 |
| --- | --- |
| `PlayerRespawnTime`、`bPlayersSpawnInWaves`、`bUsesSlowPlayerSpawning` | 重生节奏，以及是否按波次重生 |
| `SpawnProtectionDuration` | 出生后的无敌时间 |
| `DamageFactor`、`TeamDamageFactor`、`TeamDamageFlinch` | 全局伤害倍率，含友军伤害 |
| `bDisableDamage`、`bDisableStamina` | 关闭战斗系统——大多数非战斗模式的基础 |
| `bPlayersDropAllGearOnDeath`、`bEquipmentDoesNotDespawn`、`OverrideEquipmentDespawnTime` | 掉落物行为 |
| `KillScoreChange`、`KillTeamScoreChange`、`TeamKillScoreChange`、`AssistScoreFactor`、`bIsScoringDisabled` | 计分 |
| `AutoKickOnTeamKillAmount` | 对误杀队友的处罚 |
| `HorseRespawnTime`、`CatapultRespawnTime`、`BallistaRespawnTime` | 载具与攻城器械的重生 |
| `MapRotation`、`MapVoteMaps` | 一局结束后接什么 |

以及值得记住的函数和事件，它们是自定义行为的挂载点：

- `IsSpawnpointAllowed(PlayerStart, Controller)` 和 `GetSpawnpointPreference(PlayerStart, Controller)` —— 出生点筛选，与 [`MordhauPlayerStart`](/zh/mordhauSDK-guide/actors#spawns-mordhauplayerstart) 上的事件成对使用
- `OnAfterLogin`、`OnBeforeLogout` —— 玩家加入与离开
- `OnMessageBroadcasted`、`OnRconStringCommand` —— 聊天与 RCON，模式需要响应管理员命令时很有用
- `GetNextMap`、`GetNextMaps`、`VoteLevel` —— 轮换与投票

## 子关卡 —— 每个模式一个关卡 {#sublevels}

一张 Mordhau 地图不是一个关卡。它是承载几何体的**基础关卡**，加上**每个游戏模式一个子关卡**，各自承载该模式的出生点和目标物。告诉游戏这是哪个模式的，是子关卡名称的前缀。

| 前缀 | 模式 |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

在编辑器里的大致流程：

1. 先把地图本体当作普通关卡做出来——几何体、灯光、道具。
2. 为每个模式建一个空关卡，前缀在前：`SKM_CabbageLand`。
3. 打开它，打开 **Levels** 窗口，把持久关卡的流送方式设为 **Always Loaded**。每新建一个子关卡它都会退回 Blueprint-only，所以每次都要设。
4. **Add Existing** → 选择你的基础地图，让子关卡在下方加载几何体。
5. 再双击持久关卡让它重新变蓝——蓝色的才是你正在编辑的——并锁定基础关卡，避免误改。
6. 放置该模式的游戏模式、出生点和目标物。

之后用 `changemap SKM_CabbageLand` 就能加载它。

[放置警告](/zh/mordhauSDK-guide/actors)之所以重要，正是因为这个结构：目标物若落进基础关卡而不是模式子关卡，就会在所有模式里同时出现。

::: tip
对于不在这张前缀表里的模式，社区的 [MetaMod](https://mod.io/g/mordhau/m/metamod) 扩展了一张地图能支持的范围。上面的流程浓缩自 [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki)，那边配有截图。
:::

## 元数据 —— 游戏怎么知道你的地图是什么 {#metadata-how-the-game-knows-what-your-map-is}

菜单上显示的一切，由两个很小的 Blueprintable 类承载。它们容易被忘掉，忘了地图就既没名字也没图。

**`MapMetaData`**

| 属性 | 内容 |
| --- | --- |
| `Name`、`Description` | 玩家在浏览器里看到的信息 |
| `BaseMap` | 基础关卡 |
| `GameModeMaps` | 属于这张地图的模式子关卡 |
| `Thumbnail`、`BackgroundImages`、`ForegroundImages` | 菜单与加载画面的美术资源 |
| `Tips` | 加载画面提示 |

**`GameModeMetadata`**

| 属性 | 内容 |
| --- | --- |
| `Prefix` | 上表中的子关卡前缀——这个约定就是在这里定义的 |
| `Name`、`Description`、`Thumbnail`、`Tips` | 模式的呈现信息 |

因此，做一个真正全新的模式，意味着除了 GameMode 和 GameState，还要有一个带自己前缀的 `GameModeMetadata` 子类。

## 关卡蓝图 {#the-level-blueprint}

每个关卡都有一个，在 Mordhau 中它继承自 `MordhauLevelScriptActor`。它适合放*只属于这张地图*的脚本——达到某个分数就开启的门，某个点失守后垮塌的桥。

地图级的系统也在这里启动。例如社区的[随机出生点系统](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau)，安装方式就是把它的控制器拖进关卡蓝图，并接到 `Event BeginPlay`。

想跨地图复用的东西，应该做成正规的蓝图类：关卡蓝图无法被继承。

## 武器、装备与机器人 {#weapons-equipment-and-bots}

| 内容 | 从哪里开始 |
| --- | --- |
| 角色 | `/Game/Mordhau/Blueprints/Characters/` 下的 `BP_MordhauCharacter` |
| 近战武器 | `MordhauWeapon` 与 `MordhauEquipment`，以及 `MordhauShield`、`FistsWeapon`、`KickWeapon` |
| 远程武器 | `MordhauProjectile` 与 `Quiver` |
| 攻击时序 | `AttackMotion` 及各类 motion —— 前摇、释放、假动作、格挡、还击各有其一 |
| 动画 | `MeleeWeaponAnimationProfile` —— 武器所指向的 `AnimationProfile` |
| 机器人 | `BotProfile` 与 `BotBehaviorProfile`，行为树节点为 `BTTask_MeleeAttack`、`BTTask_MeleeDefend`、`BTTask_RangedAttack` 等 |

复制一把现成武器之后，做自定义武器基本就是调数值：前摇、释放、按护甲类型的伤害数组、体力消耗、击退。[Mordhau Modding Wiki 的武器变量页面](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md)是关于每个值含义的最佳文字参考，动手改之前值得先读一遍。

## 如果只学五样 {#if-you-only-learn-five}

1. **你自己的游戏模式蓝图** —— 从最接近的官方模式继承而来
2. **`MordhauPlayerStart`** —— 没有出生点，就没有地图
3. **`ControlPoint`** 及其旗帜 —— Frontline 和 Invasion 的整个目标层
4. **`MapMetaData` 与 `GameModeMetadata`** —— 地图如何表明自己的身份
5. **关卡蓝图** —— 让一张地图独一无二的一次性脚本

## 帮我们把这页写完 {#help-us-finish-this-page}

没有人写过一份从头到尾的 Mordhau Mod 制作手册，这一页也只是一张勾勒地形的图，而不是它本该成为的分步指南。如果你发布过模式或地图，你所知道的——哪些属性真正有用、打包时什么会坏、官方地图有哪些不显眼的做法——正是这里缺的。[提一个 issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)，或者把草稿笔记贴到 [Discord](https://discord.gg/zuX58yRV84)，排版我们来做。
