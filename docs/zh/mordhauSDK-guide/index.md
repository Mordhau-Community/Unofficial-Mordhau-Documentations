# MordhauSDK 指南 {#mordhausdk-guide}

**Mordhau 编辑器**是用于为 Mordhau 构建自定义地图和游戏模式的官方工具。它是 Unreal Engine 的构建，其中加载了 Mordhau 的资产和游戏代码，因此您正在使用真实的武器、角色和游戏玩法，而不是它们的近似值。

Triternion 于2021年12月14日发布。社区中通常将其称为SDK。

::: warning
此页面是一个入门指南，而不是完整的教程。Mordhau 改装在任何地方都没有很好的记录，这正是该网站要填补的空白 - 但正确地填补它需要真正发送地图的人。如果那是你，[请贡献](/zh/contributing/methods)。我们宁愿发布您的粗略笔记，也不愿发布由别人猜测的精美页面。
:::

## 你可以做什么 {#what-you-can-make}

- **地图** — 现有模式的新关卡
- **游戏模式** — 自定义规则和目标
- **化妆品和资产** - 引入游戏的模型和材料

Mod 通过 **mod.io** 分发，这也是游戏内 Mod 浏览器读取的内容。玩家在那里订阅，游戏下载内容。

## 本指南包含 {#in-this-guide}

- [Actor](/zh/mordhauSDK-guide/actors) —— 你在关卡里放置的一切，以及每张地图都需要的 Mordhau 专有 Actor：出生点、占领点、推动目标
- [蓝图](/zh/mordhauSDK-guide/blueprints) —— 游戏自带蓝图是怎么组织的、该继承哪些，以及最重要的那几个

## 获取 {#getting-it}

编辑器 **不在 Steam 上**。它是 **Epic Games Store** 上一个独立的免费产品，通过 Epic Games 启动器安装：

1. 打开 [Epic Games Store 的 MORDHAU Editor 页面](https://store.epicgames.com/p/mordhau--editor)，用 Epic 账号登录并领取——它是免费的。
2. 打开 Epic Games 启动器，在 **库** 中找到 **MORDHAU Editor** 并安装。

它在 Epic 而不在 Steam 上，并不是 Triternion 的偏好：编辑器是 Unreal Editor 的一个构建版本，而 Epic 的引擎许可只允许通过 Epic Games Store 分发编辑器构建版本。

编辑器与游戏分开领取，也不与你的 Steam 版本绑定——但要真正游玩你做出来的内容，仍然需要 Mordhau 本体。编辑器还附带了几张示例地图和游戏模式，可以作为起点。

::: warning
一些旧教程让你在 Steam 库的 **工具** 分类里找编辑器。那里什么都没有——Mordhau 的编辑器只在 Epic Games Store 上分发。
:::

::: tip
它很大。它是一个完整的 Unreal Engine 编辑器加上游戏的资源库，所以预算比游戏本身占用的磁盘空间要多得多，并且预计第一次发布会花费很长时间来编译着色器。这是正常现象，之后速度会更快。
:::

## 开始之前 {#before-you-start}

编辑器是 Unreal Engine。几乎您需要学习的所有内容都是一般的虚幻知识，而不是 Mordhau 特定的知识 - 关卡编辑器、材质系统、照明、蓝图以及包装的工作原理都是标准的。

这是个好消息：有大量的 Unreal Engine 材料，并且其中大部分都适用。Mordhau 特定的部分相对较小 - 知道要构建游戏的哪些现有类，以及如何为 mod.io 打包。

社区工具通常跟踪 **Unreal Engine 4.26**，因此当您寻找教程时，UE4 材质将比 UE5 材质更好地匹配您所看到的内容。

如果您以前从未打开过虚幻引擎，请先完成一般的初学者关卡设计教程。同时学习引擎和学习Mordhau的细节是一种糟糕的经历。

## 粗略工作流程 {#a-rough-workflow}

一般来说，制作地图的过程如下：

1. 从 Epic Games Store 安装编辑器，并让它完成首次启动。
2. 创建一个新关卡，或打开其中一张附带的地图以查看它是如何组合在一起的。
3. 构建几何体、照明和[出生点](/zh/mordhauSDK-guide/actors#spawns-mordhauplayerstart)。
4. 为你希望支持的每个模式设置[游戏模式](/zh/mordhauSDK-guide/blueprints)和[目标物](/zh/mordhauSDK-guide/actors)，每个模式一个子关卡。
5. 5、本地测试。
6. 打包上传到mod.io。
7. 将其加载到 [专用服务器](/zh/dedicated-server-guide/) 上，以便其他人可以玩它。

打开官方地图确实是最快的学习方式。它们是关于如何组装 Mordhau 关卡的最佳文档。

## 从哪里获得帮助 {#where-to-get-help}

因为写得很少，所以大多数 Mordhau 改装知识都存在于对话中。

- Discord 上的 **Mordhau 改装社区是实际构建地图的人们讨论的地方。去那里问问吧。YouTube 上的
- [津巴布韦 绘图和模拟教程系列](https://www.youtube.com/watch?v=kA_BYvN4cfA) — 涵盖基础知识的社区视频系列
- [mod.io](https://mod.io) — 浏览其他人发布的内容，看看他们如何描述他们的设置
- [不真实的引擎文档](https://dev.epicgames.com/documentation/en-us/unreal-engine) — 对于真正的引擎问题而不是问题Mordhau 问题
- 我们自己的 [Discord](https://discord.gg/zuX58yRV84)

## 帮助我们完成此页面 {#help-us-finish-this-page}

事情的诚实状态：没有人写过正确的端到端Mordhau 改装指南，此页面也还不是。

如果你制作了一张地图，即使是一张糟糕的地图，你也会知道任何地方都没有记录下来的事情。准确的包装设置。自定义模式要继承哪个类。编辑失败时会做什么以及原因。任何一个都比另一个概述更有价值。

打开[问题](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues)，或将其粘贴到Discord中，我们将帮助将其转换为页面。粗略的笔记就可以了——我们会进行格式化。
