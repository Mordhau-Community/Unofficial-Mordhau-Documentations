# 什么是 Git？ {#what-is-git}

Git 保留文件夹的历史记录。每次保存检查点（*提交*）时，它都会记录更改的内容、更改时间以及更改者。您可以返回到任何较早的检查点，两个人可以同时处理同一个文件夹，而不会互相覆盖。

与Mordhau 无关。它是一个通用工具，几乎用于现有的每个软件项目，我们在这里使用它是因为这些文档是很多人编辑的文本文件的文件夹。

::: info
Git 和 GitHub 是两个不同的东西。Git 是您计算机上的程序。GitHub 是一个在线存储 Git 存储库的网站。您可以在没有 GitHub 的情况下使用 Git。参见 [GitHub是什么东西?](/zh/contributing/github)。
:::

##  {#the-words}

这个词你会经常遇到这个词汇，所以值得尽早了解。

**存储库**（或存储库）— 项目文件夹及其整个历史记录。该站点是一个存储库。

**克隆** — 下载存储库、历史记录等的副本。

**提交** — 已保存的检查点，其中包含一条描述您更改内容的消息。

**分支** — 单独的工作线。您可以在自己的分支上进行更改，以便主分支在您完成一半时继续工作。

**推送** — 将您的提交从您的计算机发送到 GitHub。

**拉** - 撤销其他人所做的提交。

**合并** — 将一个分支合并到另一个分支中。

## 你实际需要的五个命令 {#the-five-commands-you-actually-need}

您无需正确学习 Git 即可在这里做出贡献。这是整个循环：

```bash
# 1. Get the project onto your machine, once
git clone https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations

# 2. Start a branch for what you are about to do
git checkout -b fix-rcon-ports

# 3. Edit files in your editor, then check what Git noticed
git status

# 4. Save a checkpoint
git add .
git commit -m "Correct the default RCON port"

# 5. Send it to GitHub
git push origin fix-rcon-ports
```

然后，您在网站上打开一个拉取请求，该请求包含在 [GitHub是什么东西?](/zh/contributing/github) 中。

## 两个值得养成的习惯 {#two-habits-worth-having}

**编写有意义的提交消息。** “已修复”六个月后不会告诉任何人任何事情。“更正服务器指南中的信标端口”确实如此。

**为您处理的每件事启动一个新分支。** 它需要一个命令，这意味着您可以在飞行中进行两个不相关的修复，而不会让它们纠缠在一起。

## 保持您的副本最新 {#keeping-your-copy-current}

如果您不久前克隆，那么其他人已经更改了一些内容。在开始新工作之前：

```bash
git checkout main
git pull
git checkout -b my-new-branch
```

## 如果你遇到困难 {#if-you-get-stuck}

众所周知，Git 错误消息毫无帮助。只要您没有删除该文件夹，您在本地所做的任何操作都无法恢复，因此请不要惊慌。

- [吉特官方书](https://git-scm.com/book/en/v2) - 免费，前两章更深入地涵盖上述所有内容
- [哦,该死,吉特!](https://ohshitgit.com/) - 对“我做错了什么，如何撤消它”的简短回答

或在 [Discord](https://discord.gg/zuX58yRV84) 中询问。有人遇到了同样的错误。
