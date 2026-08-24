# 如何使用 Markdown {#how-to-use-markdown}

[上一页](/zh/contributing/whats-markdown) 中的所有内容都在这里工作。本页面涵盖了 VitePress 在顶部添加的额外内容，以及我们在此存储库中遵循的约定。

## Frontmatter {#frontmatter}

文件最顶部由三条短横线包围的区块称为 frontmatter。它用于配置页面，不会显示在正文中，而且必须放在文件的最前面：

```md
---
layout: doc
sidebar: false
aside: false
---

# My Page
```

需要了解的配置项：

|关键|效果|
|--- |--- |
|`layout` |`doc` 为普通页面，`home` 为登陆页面 |
|`sidebar` |`false` 隐藏左侧导航 |
|`aside` |`false` 隐藏右侧页面目录|
|`title` |覆盖浏览器选项卡标题 |

大多数页面根本不需要 frontmatter。仅当您想要关闭某些功能时才添加它。

## 标注框 {#callout-boxes}

这些是整个站点使用的彩色提示面板。用三个冒号加类型开始，再用三个冒号结束：

```md
::: tip
Handy but optional advice.
:::

::: warning
Something the reader can get wrong.
:::

::: danger
Something that will break their server or lose their data.
:::

::: info
Extra background that is not needed to follow the steps.
:::
```

在类型后添加文字，即可为提示框设置自定义标题：

```md
::: tip RECOMMENDED
This shows "RECOMMENDED" as the box title instead of "TIP".
:::
```

谨慎使用这些。如果页面中所有其他段落都在彩色框中，则比没有任何段落的页面更难阅读。

## 代码块 {#code-blocks}

始终在左反引号之后命名语言。它打开语法突出显示并告诉读者它们是什么查看：

````md
```bash
steamcmd +登录匿名+app_update 629800验证+退出
```
````

`bash`、`ini`、`json`、`md`、`js` 和 `ts` 几乎涵盖了这些文档中的所有内容。

### 突出显示特定行 {#highlighting-specific-lines}

将行号放在花括号中以引起对块的一部分的注意：

````md
```ini{2}
[/Script/Mordhau.MordhauGameSession]
MaxSlots=64
ServerName=我的服务器
```
````

### Windows 和 Linux 并排 {#windows-and-linux-side-by-side}

当步骤因平台而异时，请使用代码组而不是将该部分写入两次：

````md
::: code-group

```powershell [Windows]
.\steamcmd.exe +登录匿名 +app_update 629800 验证 +退出
```

```bash [Linux]
./steamcmd.sh +登录匿名 +app_update 629800 验证 +退出
```

:::
````

读者获得选项卡，并且只看到他们需要的选项卡。

## 页面之间的链接 {#links-between-pages}

内部链接从语言文件夹开始，离开 `.md`：

```md
[Required Tools](/en/contributing/tools)
[RCON Guide](/en/rcon-guide/)
```

以 `/` 结尾的路径指向该文件夹的 `index.md`。

::: warning
使用站点根目录的完整路径编写内部链接，而不是像 `../tools` 这样的相对路径。页面移动后，相对链接就会断开，并且它们的行为GitHub 预览中的效果与网站上的效果不同。
:::

当您链接到翻译部分中的页面时，请让读者使用他们的语言。从法语页面链接到 `/fr/rcon-guide/`，而不是 `/en/rcon-guide/`。

## 图片 {#images}

将文件放在与使用它的页面相同的文件夹中，并从站点根目录链接它：

```md
![Server browser showing a custom server](/en/dedicated-server-guide/browser.webp)
```

尽可能将屏幕截图保存为 `.webp`。在相同质量下，它们的大小只是 PNG 的一小部分，而且这个存储库已经足够大了。

## 添加新页面 {#adding-a-new-page}

创建文件只是完成了一半 — 没有人可以导航到的页面可能不存在。

1. 在`docs/` 下的右侧文件夹中创建`.md` 文件。
2. 打开`.vitepress/config.mts`。
3. 找到您要添加的语言环境，然后向其 `nav` 或 `sidebar` 添加一个指向您页面的条目。
4. 运行 `npm run docs:dev` 并单击它。

如果您的页面属于每种语言，请先添加英语页面，然后将其他页面留给翻译人员。空白页比丢失一页更糟糕。

## 文档风格 {#house-style}

- 每页一个 `#` 标题，位于顶部，并且它应该与侧边栏调用页面的内容相匹配。
- 不要跳过标题级别 - `###` 应位于 `##` 下方，而不是直接位于 `#` 下方。
- 在标题、列表、代码块和标注之前和之后放置一个空行。Markdown 对此很宽容，但突然间事实并非如此。
- 对文件名、命令、配置键和值使用反引号。`Game.ini`，而不是“Game.ini”。
- 让 Prettier 处理换行。不要添加手动换行符来保持行短。
