# 贡献 {#contributing}

该网站是由使用它的人编写的。它的每一页都以
开头，有人在研究一些东西，然后花时间把它写下来。

此页面是本地设置，从头到尾。您不需要任何它来修复
拼写错误或报告错误的内容 - [缴款方法](/zh/contributing/methods) 涵盖更快的路线，并且
都不涉及终端。在以任何方式打开拉取请求之前，请先阅读 [条款和规则](/zh/contributing/terms-rules)
。

## 您需要什么 {#what-you-need}

- [Node.js](https://nodejs.org/en) 18 或更新版本
- [图形](https://git-scm.com/downloads)
- A[GitHub](https://github.com) 帐户
- 编辑器 - 存储库是为 [VS Code](https://code.visualstudio.com/)

[所需工具](/zh/contributing/tools) 设置的，其中包含每个安装说明和
首次运行配置。

## 在本地设置 {#set-up-locally}

在 GitHub 上叉 [存储器](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)
，然后克隆你的叉并安装：

```bash
git clone https://github.com/YOUR-USERNAME/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations
npm install
```

启动开发服务器：

```bash
npm run docs:dev
```

它打印地址它的服务位置通常为 `http://localhost:5173`。让
保持运行 — 保存时页面会重新加载。

## 进行更改 {#make-your-change}

在分支上工作，而不是在 `main` 上工作：

```bash
git checkout -b fix-rcon-ports
```

页面位于 `docs/<language>/` 下，因此英文页面属于 `docs/en/`。
新页面还需要 `.vitepress/config.mts` 中的条目，或者
站点上没有任何内容链接到它。

[如何使用马克当](/zh/contributing/how-to-use-markdown)涵盖文件
约定和房屋风格。[维特普雷斯是什么](/zh/contributing/vitepress)
涵盖了配置文件以及项目如何组合在一起。

## 在发送之前检查一下 {#check-it-before-you-send-it}

```bash
npm run docs:build
```

由于内部链接损坏，构建失败。这是最容易犯
的错误，也是预览中最容易错过的错误，因此即使是
一行更改也值得运行。如果通过，则 `npm run docs:preview` 完全符合
构建生成的内容。

## 发送 {#send-it}

```bash
git add .
git commit -m "Correct the RCON port numbers"
git push origin fix-rcon-ports
```

GitHub 提供在您下次访问时从该分支打开拉取请求
存储库。说出发生了什么变化以及原因。

如果审查返回要求某些内容，请将另一个提交推送到同一个
分支 - 拉取请求会自行更新。合并后，Netlify 会重建
并发布站点，这需要一两分钟的时间。
