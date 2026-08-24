# RCON 指南 {#rcon-guide}

RCON 代表*远程控制台*。它允许您从游戏外部通过网络向 Mordhau 服务器发送命令，这样您就可以更改地图、踢某人或检查谁在上，而无需启动 Mordhau 并先加入。

如果您运行服务器，那么这是您最终使用最多的工具。

::: info
此页面假定您已经有一个正在运行的服务器。如果不这样做，请从 [专用服务器指南](/zh/dedicated-server-guide/) 开始。
:::

## 管理命令与 RCON {#admin-commands-vs-rcon}

两者都允许您运行相同的命令，但它们的访问方式不同。

**游戏内管理命令** 在您玩游戏时输入控制台。您使用 `adminlogin` 和 `Game.ini` 中的管理员密码进行身份验证。当您已经在服务器中时很方便。

**RCON** 从任何 RCON 客户端通过 TCP 连接。不需要游戏，当服务器已满或出现问题以至于您无法加入时，它仍然可以运行。

无论哪种方式，命令列表都是相同的。

## 在 {#turning-rcon-on}

RCON 在 `Game.ini` 中配置，与其他服务器设置位于同一部分：

|平台|路径|
|--- |--- |
|Windows |`Mordhau\Saved\Config\WindowsServer\Game.ini` |
|Linux |`Mordhau/Saved/Config/LinuxServer/Game.ini` |

添加这两个键：

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
AdminPassword=changethis
RconPassword=a-different-long-password
RconPort=7778
```

::: danger
之前停止服务器您编辑 `Game.ini`。它会在关机时从内存中重写文件，因此进行了编辑当它运行时被丢弃。
:::

::: warning
如果将 `RconPassword` 留空，服务器会在启动时生成一个随机值，这意味着您不会知道它。自己设置吧。

不要在这里重复使用您的 `AdminPassword`，也不要使用任何短的东西。RCON 是一种未加密的协议 - 任何拥有密码并可以访问该端口的人都可以完全控制您的服务器。
:::

重新启动服务器。如果您愿意，您还可以在命令行上覆盖端口：

```bash
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -RconPort=7778 -log
```

## 打开端口 {#opening-the-port}

RCON 端口是 **TCP**，与游戏不同，信标和查询端口都是UDP。涵盖其他三项的防火墙规则不会涵盖这一项。

仅当您确实需要从机器外部访问 RCON 时才转发它。如果您无论如何都通过 SSH 管理服务器，请将端口对互联网关闭并从盒子上连接到 `127.0.0.1` — 这绝对更安全，而且不需要任何成本。

## 连接 {#connecting}

任何支持 Source RCON 协议的客户端都可以使用。[`mcrcon`](https://github.com/Tiiffi/mcrcon) 体积小、无依赖，并可在 Windows 和 Linux 上运行：

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password
```

这会让您进入交互式提示。要触发单个命令并退出：

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password "playerlist"
```

如果您更愿意拥有一个窗口而不是终端，那么图形客户端也存在 - 大多数通用 Source RCON 工具都可以在 Mordhau 上正常工作。

## 命令 {#commands}

玩家标识符是 **Playfab ID**，而不是 Steam ID。使用 `playerlist` 获取它们。

### 玩家 {#players}

|命令 |它有什么作用 |
|--- |--- |
|`playerlist` |服务器上的每个人都有他们的 ID |
|`kick <name or PlayfabID> <reason>` |移除一名玩家，他们可以重新加入 |
|`ban <name or PlayfabID> <minutes> <reason>` |封禁时间为几分钟 |
|`unban <name or PlayfabID>` |解除禁令 |
|`banlist` |目前所有人都被禁止 |
|`mute <name or PlayfabID> <minutes>` |使语音和文本静音 |
|`cancelvotekick` |停止正在进行的投票 |

### 管理员 {#admins}

|命令 |它有什么作用 |
|--- |--- |
|`adminlogin` |使用任何其他命令之前在游戏中进行身份验证 |
|`adminlist` |现任管理员 |
|`adminadd <PlayfabID>` |授予管理|
|`removeadmin <PlayfabID>` |撤销管理员|

### 比赛 {#the-match}

|命令 |它有什么作用 |
|--- |--- |
|`changelevel <map name>` |开关图，例如`changelevel FFA_Grad`|
|`restartlevel` |重新启动当前地图 |
|`addbots <number>` |添加机器人 |
|`addbots team <number> <0 or 1>` |将机器人添加到团队中，0 为红色，1 为蓝色 |
|`removebots <number>` |删除机器人 |
|`slomo <value>` |更改游戏速度，`0.5` 为一半，`2` 为双倍 |

::: tip
`slomo` 影响服务器上的每个人。它只娱乐一次，然后人们就离开了。
:::

## 日常用品 {#everyday-things}

**在对某人采取行动之前先找到他们的 ID**

```
playerlist
```

**禁止一天**

```
ban 1A2B3C4D5E6F7890 1440 Griefing
```

持续时间为分钟，因此一小时为 `60`，一天为 `1440`，一周为 `10080`。

**提前旋转地图**

```
changelevel TDM_Camp
```

**填充安静的服务器**

```
addbots 8
```

## 无法连接时 {#when-it-will-not-connect}

**连接被拒绝。** RCON 未监听。检查 `RconPort` 是否在 `Game.ini` 中设置，并且您在编辑后重新启动了服务器 - 使用 `-log` 您将在控制台输出中看到 RCON 启动。

**连接超时。** 防火墙正在占用它。请记住端口是 TCP。

**身份验证失败。** 密码错误。如果您将 `RconPassword` 留空，服务器会在启动时发明一个，因此请显式设置它并重新启动。

**命令运行但没有任何反应。** 检查语法和参数顺序。`ban` 特别想要原因之前的持续时间，并且以错误的方式让他们安静地失败。

**您的编辑不断消失。** 您保存时服务器正在运行。先停下来吧。

## 安全性 {#security}

值得重复，因为人们会犯这个错误并因此失去服务器：

- RCON 未加密。密码以路径上任何人都可以读取的形式穿过网络。
- 使用长且唯一的密码。不是您的管理员密码，不是您的Steam 密码。
- 除非必要，否则不要公开暴露端口。本地主机，或 SSH 隧道，或仅限于您自己的 IP 的防火墙规则。
- 如果您将密码粘贴到 Discord 消息、支持票证或屏幕截图中，请更改密码。
