# 专用服务器托管指南 {#dedicated-server-hosting-guide}

下面您将了解如何在 Windows 和 Linux 上托管 Mordhau 专用服务器。

其中大部分假设您自己托管服务器，无论是在家庭网络上的计算机上还是在您租用的 VPS 或专用盒子上。如果您不想管理其中任何一个，有一个 [专用游戏服务器供应商](/zh/dedicated-server-guide/dedicated-game-server-providers) 列表，他将为您设置一个并为您提供一个控制面板。

虽然本指南尽力做到完整，但 Mordhau 服务器所有者的 Discord 仍然是针对您的设置特定问题获取帮助的最佳位置。

## 开始之前 {#before-you-start}

您将需要：

- 一台持续运转的机器。当你关闭游戏时服务器就会离线，这对任何人来说都没有多大用处。
- **SteamCMD**，Valve 用于下载服务器文件的命令行工具。
- 如果您在家托管，则能够转发路由器上的端口。

您**不需要**需要在您使用的帐户上拥有 Mordhau。专用服务器是单独免费下载的，并通过匿名 Steam 登录进行安装。

::: tip
服务器二进制文件是 Steam 应用程序 **629800**。这与游戏本身不同，游戏本身是 629760。下载错误的游戏是人们在这里最常犯的错误。
:::

## 安装SteamCMD {#installing-steamcmd}

::: 代码组

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
SteamCMD 是一个 32 位程序。在 64 位 Linux 安装中，只有存在 32 位支持库（这就是 `lib32gcc-s1` 的用途）后，它才会启动。在较旧的发行版上，该软件包称为 `lib32gcc1`。
:::

## 下载服务器 {#downloading-the-server}

::: 代码组

```powershell [Windows]
.\steamcmd.exe +force_install_dir C:\mordhau-server +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

:::

它有几千兆字节，所以给它一些时间。每当您想在打补丁后更新服务器时，请再次运行完全相同的命令。

::: warning
将 `+force_install_dir` **放在** `+login` 之前。SteamCMD 按顺序处理参数，如果首先登录，它将忽略您的安装目录并下载到自己的文件夹中。
:::

## 首次推出 {#first-launch}

不带任何参数启动服务器一次。它还无法播放——关键是它会写出配置文件，然后你就停止它。

::: 代码组

```powershell [Windows]
cd C:\mordhau-server
.\MordhauServer.exe
```

```bash [Linux]
cd ~/mordhau-server
./MordhauServer.sh
```

:::

让它完成启动，然后将其关闭。

## 配置 {#configuration}

配置文件现在位于：

|平台|路径|
| --- | --- |
| Windows | `Mordhau\Saved\Config\WindowsServer\` |
| Linux | `Mordhau/Saved/Config/LinuxServer/` |

您关心的是`Game.ini`。

::: danger
仅在服务器停止时编辑这些文件。Mordhau 将其配置保存在内存中，并在关闭时将其写回，因此您在运行时更改的任何内容都会在关闭时被覆盖。
:::

### Game.ini {#gameini}

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

|关键|它有什么作用 |
| --- | --- |
|`ServerName` |游戏内浏览器中显示的名称 |
|`MaxSlots` |玩家容量|
|`ServerPassword` |对于公共服务器留空 |
|`AdminPassword` |管理员在控制台中使用 `adminlogin` 键入什么 |
|`Admins` |一个 Playfab ID。每个管理员重复该行一次 |
|`BannedPlayers` |由 `ban` 命令管理，您很少手动编辑它 |

**`[/Script/Mordhau.MordhauGameMode]`**

重生时间以秒为单位。`DamageFactor` 会缩放所有伤害，其中 `1.0` 为正常伤害，而 `2.0` 将伤害加倍。`TeamDamageFactor` 单独缩放友军火力，因此默认的 `0.5` 意味着队友受到彼此一半的伤害。

### 地图旋转 {#map-rotation}

每张地图添加一条 `MapRotation` 线。顺序是它们的播放顺序，该列表还控制游戏内地图投票中显示的内容。

地图名称是模式前缀加上地图名称：

|前缀 |模式|
| --- | --- |
|`FFA_` |所有人免费 |
|`TDM_` |团队死亡竞赛 |
|`SKM_` |小冲突|

库存地图为 `ThePit`、`Camp`、`Grad`、`Contraband`、`Tourney`、`MountainPeak` 和 `Taiga`，这为您提供了诸如 `FFA_Grad` 或`TDM_MountainPeak`。

### Engine.ini {#engineini}

选修的。大多数所有者最终接触的设置是滴答率：

```ini
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=60
```

越高越流畅，但 CPU 成本也越高。除非您知道机器可以跟上，否则不要提高它 - 无法保持其滴答率的服务器感觉比稳定的较低服务器要糟糕得多。

## 正确启动服务器 {#starting-the-server-properly}

现在用地图和端口启动它：

::: 代码组

```powershell [Windows]
.\MordhauServer.exe Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

```bash [Linux]
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

:::

将其放入 Windows 上的 `.bat` 文件或 Linux 上的 shell 脚本中，这样您就不必每次都重新输入它。

|参数|目的|
| --- | --- |
|`-Port` |游戏流量|
|`-BeaconPort` |服务器浏览器如何到达您的服务器 |
|`-QueryPort` |Steam查询，浏览器如何读取你的玩家数量|
|`-MultiHome` |绑定到一个特定的本地IP，如果机器有多个|
|`-RconPort` |RCON 监听器，参见 [RCON 向导](/zh/rcon-guide/) |
|`-log` |打印到控制台而不仅仅是打印到文件 |

在 Linux 上，在 `screen` 或 `tmux` 下运行它 - 或者更好，编写一个 systemd 单元 - 这样它就可以在你关闭 SSH 会话后继续存在：

```bash
screen -dmS mordhau ./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

## 港口 {#ports}

|港口|协议|做什么用|
| --- | --- | --- |
|7777 |UDP |游戏|
|15000 | 15000UDP |灯塔|
|27015 | 27015UDP |Steam 查询 |
|您的 RCON 端口 |TCP |远程控制台，仅当您启用它时 |

所有三个 UDP 端口都必须打开并转发，而不仅仅是游戏端口。如果信标或查询端口被阻止，您的服务器运行得很好，并且永远不会出现在浏览器中 - 这是人们最常见的问题。

在同一台机器上运行多个服务器？给每个人自己的一组，间隔开：

```bash
-Port=7779 -BeaconPort=15002 -QueryPort=27018
```

## 检查它是否有效 {#checking-it-worked}

在游戏内浏览器中查找您的服务器名称。如果不存在，请按顺序完成此操作：

**浏览器中根本没有任何内容。**几乎总是信标或查询端口。检查你的转发规则，并检查机器本身的防火墙——Windows 防火墙在第一次运行时会阻止服务器，提示很容易点击过去。

**可见，但无人连接。** 游戏端口。相同的检查，端口 7777。

**在本地网络上很好，在外面看不见。** 您的路由器没有转发，或者您的 ISP 让您位于 CGNAT 后面 - 在这种情况下，您根本无法通过该连接进行托管，并且需要 VPS。

**配置更改没有任何作用。** 您在服务器运行时编辑了文件。停止，编辑，开始。

**服务器启动并立即关闭。** 阅读 `Mordhau/Saved/Logs/` 中的日志。常见原因是端口已在使用。

## 后续步骤 {#next-steps}

- 设置 [连线](/zh/rcon-guide/) 以便您无需进入游戏即可调节服务器
- 如果您觉得自己管理这件事并不有趣，请看看 [提供者列表](/zh/dedicated-server-guide/dedicated-game-server-providers)
