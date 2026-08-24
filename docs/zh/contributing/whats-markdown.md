# 什么是 Markdown {#what-is-markdown}

Markdown 是一种轻量级标记语言，用于以简单高效的方式格式化文本。它由 John Gruber 和 Aaron Swartz 于 2004 年创建，目标是使纯文本文档具有视觉吸引力，并轻松转换为 HTML 等结构化格式。Markdown 广泛应用于文档、博客、电子邮件和代码存储库，如 GitHub。

此标记语言与游戏 Mordhau、其开发或为其创建 mod 没有任何关系。它只是一个独立存在并在各个领域具有多种用途的知识领域。我们在这里解释它只是因为我们使用它来贡献游戏 Mordhau 的文档，您正在通过该文档阅读本页。

::: info
**给那些不熟悉编程或网站的人的信息：**
<br>
HTML 也是一种标记语言，是所有网站。在此页面上，如果您的目的只是为 Mordhau 文档做出贡献，则无需学习或理解它。您只需要学习 Markdown，它最终会转换为 HTML 代码。
<br><br>
我们的目的不是解释编程的复杂性或让您沉浸在充满技术细节的世界中。我们的唯一目标是引导您只专注于为 Mordhau 文档做出贡献！无论您是编程语言的初学者还是根本不了解它们，我们都在努力尽可能地简化事情，让您的贡献之路更容易
:::

## Markdown用在哪里？ {#where-is-markdown-used}

Markdown 由于其简单性和多功能性而在各种情况下使用。以下是 Markdown 的一些常见应用领域：

1. **技术文档：**<br> Markdown 广泛用于在 GitHub、GitLab 和 Bitbucket 等存储库中编写 README 文件。
2. **博客平台：**<br> 许多平台（例如 Medium 或 Jekyll）都支持 Markdown，以便轻松创建格式良好的帖子。
3. **内容管理系统（CMS）：**<br> Markdown 经常用于 Hugo 和 Gatsby 等静态站点生成器。
4. **电子邮件和消息传递：**<br> Markdown 有助于格式化干净且专业的电子邮件或聊天消息，尤其是在 Slack 或 Discord 等工具中。
5. **笔记应用程序：**<br> Notion、Obsidian 和 Evernote 等热门工具支持 Markdown，以实现高效的笔记组织。
6. **教育平台：**<br> Markdown 用于维基和教程中，以呈现清晰、结构化的信息。

## Markdown 如何工作？ {#how-does-markdown-work}

Markdown 使用带有特殊字符的纯文本语法来定义格式。以下是一些示例：

### 1- 标题： {#1-headings}

```md
# Heading 1

## Heading 2

### Heading 3
```

标题是以 1 到 6 开头的行`#` 字符。其中`#`是页面标题，`##`是节，`###`是小节。后面留一个空行。

### 2- 强调： {#2-emphasis}

```md
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~struck through~~
```

### 3- 列表： {#3-lists}

```md
- first item
- second item
  - a nested item, indented by two spaces

1. numbered
2. list
3. of things
```

编号列表会自行重新编号，因此您可以在每个列表上写入 `1.`线和 Markdown 仍将正确计数。

### 4- 链接： {#4-links}

```md
[text people click](https://example.com)
```

### 5- 图片： {#5-images}

```md
![description of the image](/path/to/image.webp)
```

方括号中的描述是屏幕阅读器宣布的内容以及图像加载失败时显示的内容，因此请在那里写一些真实的内容。

### 6- 代码： {#6-code}

将几个单词括在单个反引号中以将它们标记为代码 - 对于文件名、命令和配置键很有用。对于更长的内容，请使用三个反引号并命名语言：

````md
```bash
node -v
```
````

### 7- 行情： {#7-quotes}

```md
> Anything after a > is a quote block.
```

### 8- 表格： {#8-tables}

```md
| Setting | Meaning |
| --- | --- |
| MaxSlots | How many players fit on the server |
| ServerName | The name shown in the browser |
```

第二行上的破折号将其变成表格。这些列不必在源中对齐。

## Markdown 不做什么 {#what-markdown-does-not-do}

Markdown 故意没有颜色、字体、文本对齐或布局的语法。这就是重点——文档描述了它的结构，而站点决定了结构的外观。如果您发现自己在与它作斗争，那么您通常会尝试做一些主题应该处理的事情。

## Next {#next}

上面的语法是标准的 Markdown 并且可以在任何地方使用。该网站还添加了一些其顶部的附加功能 - 标注框、选项卡式代码块、页面 frontmatter。[如何使用马克当](/zh/contributing/how-to-use-markdown) 中涵盖了这些内容。
