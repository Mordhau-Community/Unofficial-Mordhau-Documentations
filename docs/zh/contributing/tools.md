# 所需工具 {#required-tools}

您不需要在这些文档上做太多工作。这里列出的所有内容都是免费的，并且可以在 Windows、macOS 和 Linux 上运行。

## Node.js {#nodejs}

VitePress 在 Node 上运行，所以这一项不是可选的。从 [nodejs.org](https://nodejs.org/en) 下载 **LTS** 版本 - Node 18 以上的任何版本都可以。

安装程序完成后，打开终端并检查它：

```bash
node -v
npm -v
```

如果两者都打印版本号，则说明一切正常。如果终端告诉您未找到该命令，请将其关闭并打开一个新命令。安装程序仅将 Node 添加到运行后打开的终端的 PATH 中。

## Git {#git}

Git 是您用来下载存储库并将更改发回的工具。从 [git-scm.com](https://git-scm.com/downloads) 获取。

在全新安装时，您应该告诉 Git 您是谁，否则您的提交将没有作者：

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

使用与您的相同的电子邮件地址GitHub 帐户或 GitHub 不会将提交连接到您的个人资料。

## Visual Studio Code {#visual-studio-code}

任何文本编辑器都可以，但存储库是为 [VS Code](https://code.visualstudio.com/) 设置的，本指南的其余部分假设您正在使用它。

当您第一次打开项目文件夹时，VS Code 将显示一条通知，询问您是否要安装推荐的扩展。说是的。该列表位于 `.vscode/extensions.json` 并且很短：

|扩展|它有什么作用 |
|--- |--- |
|更漂亮 |格式为 Markdown，以便每个人的文件看起来都一样 |
|Markdown 预览增强 |键入时并排预览 |
|更好的 TOML |`netlify.toml` 的语法突出显示 |
|都都树 |将项目中的每个 `TODO:` 收集到一个面板中 |

::: tip
在 VS Code 设置中打开**保存时格式化**。每次您点击保存时，Prettier 都会清理您的 Markdown，您再也不用考虑间距了。
:::

## 一个 GitHub 账户 {#a-github-account}

免费，您需要一个来打开拉取请求。注册地址为 [github.com](https://github.com)。

如果您打算从计算机推送而不是在浏览器中编辑，请设置 SSH 密钥 — GitHub 的 [自己走过](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) 比我们更好地介绍了它。

## 你不需要什么 {#what-you-do-not-need}

你正在写 Markdown，而不是代码。您不需要了解 Vue、TypeScript 或任何有关 VitePress 内部工作原理的信息。如果您可以写论坛帖子，您可以在这里写一个页面。
