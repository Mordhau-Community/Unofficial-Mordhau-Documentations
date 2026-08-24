# GitHub 是什么？ {#what-is-github}

GitHub 是一个托管 Git 存储库的网站。它将项目存储在网上，让所有人都能使用同一个副本，并提供 Git 本身不负责的功能：问题跟踪、代码审查和拉取请求。

本网站的源代码位于[社区的非官方文档存储库](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)。你在这里阅读的每个页面，都是该存储库中的一个 Markdown 文件。

如果你还不清楚 Git 与 GitHub 的区别，请先阅读[什么是 Git？](/zh/contributing/git)。

## 创建账户 {#getting-an-account}

账户免费。使用电子邮件地址和用户名在 [github.com](https://github.com) 注册。用户名是公开的，并会显示在你的所有贡献中，因此请选择一个你愿意公开使用的名称。

在设置中启用双重身份验证；GitHub 本身也要求贡献者启用此功能。

## Fork、分支、拉取请求 {#fork-branch-pull-request}

这是整个站点运行的工作流程，GitHub 上到处都是一样的。

### 1. Fork {#1-fork}

您没有权限直接推送到主存储库，这是故意的。单击 **Fork** 会在您自己的帐户下提供您自己的完整副本，您可以使用它进行任何您喜欢的操作。

### 2. 进行更改 {#2-make-your-changes}

在浏览器中或通过克隆您的 fork 并在本地工作。将它们放在树枝上，而不是直接放在 `main` 上。

### 3. 打开拉取请求 {#3-open-a-pull-request}

拉取请求是将更改拉取到原始存储库的请求。GitHub逐行准确显示您更改的内容，并为每个人提供在合并任何内容之前进行讨论的地方。

编写说明，说明您更改的内容以及原因。如果它修复了问题，请提及问题编号 - 合并拉取请求后，写入 `Fixes #42` 会自动关闭该问题。

### 4. 回复评论 {#4-respond-to-review}

有人会读它。他们可能会要求改变。将另一次提交推送到同一分支，拉取请求会自行更新 - 您无需打开新的提交。

一旦获得批准并合并，Netlify 就会重建站点，您的更改将在几分钟内生效。

## 不进行任何编辑 {#editing-without-any-of-that}

对于拼写错误，您不需要分叉任何内容。这里的每个页面底部都有一个**编辑此页面**链接。它会在该文件上打开 GitHub 的编辑器，当您保存时，GitHub 会默默地为您执行分叉和拉取请求。

## 问题 {#issues}

[问题跟踪器](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) 是报告问题和计划工作的地方。如果您发现问题并且不打算自行修复，如果您想建议一个不存在的页面，或者您在花时间研究某个想法之前不确定是否值得去做，请打开一个页面。

先搜索存在的问题。可能已经有人提出了。

## 监视存储库 {#watching-the-repository}

存储库顶部的 **监视** 按钮会在事情发生时向您发送电子邮件。如果您想提供帮助但不希望每次提交都收到通知，**自定义 → 问题**通常是正确的设置。

## 了解更多 {#learning-more}

GitHub 自己的 [快速启动](https://docs.github.com/en/get-started/quickstart) 确实很好，大约需要十五分钟。GitHub Skills 还提供免费的 [ZQQPH000Z介绍](https://github.com/skills/introduction-to-github) 课程，可引导您完成真正的拉取请求。
