# VitePress 是什么？ {#what-is-vitepress}

VitePress 是将这个存储库变成一个网站的东西。您编写 Markdown 文件，VitePress 将它们呈现为带有导航、搜索和已附加主题的 HTML 页面。

您不需要理解它来编写文档。当您想要更改某些结构时，可以使用此页面 - 将页面添加到侧边栏、添加语言或找出开发服务器抱怨的原因。

## 项目如何组合在一起 {#how-the-project-fits-together}

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

下的每个 `.md` 文件`docs/` 成为页面。URL 跟随文件路径，因此在 `/docs/en/rcon-guide/` 处提供 `docs/en/rcon-guide/index.md`。

## 这三个命令 {#the-three-commands}

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev` 是您将使用的命令。每次保存文件时，它都会在浏览器中重新加载页面。

::: tip
开发服务器在启动时打印它正在监听的地址，通常是 `http://localhost:5173`。使用它打印的任何内容，而不是假设一个端口——如果该端口被占用，它会选择一个不同的端口。
:::

## 配置文件 {#the-config-file}

`.vitepress/config.mts` 是唯一需要小心的文件，因为其中的语法错误会阻止整个站点构建而不是破坏一页。

您最有可能接触的部分：

**`themeConfig.nav`** - 顶部栏上的链接。

**`themeConfig.sidebar`** — 左侧导航。它由路径前缀键入，因此 `"/en/contributing/"` 块仅显示在该路径下的页面上。

**`locales`** — 每种语言一个条目。每个都有自己的 `nav` 和 `sidebar`，加上 `ltr` 或 `rtl` 的 `dir`。

将页面添加到侧边栏如下所示：

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

`link` 是 URL，而不是文件路径 —没有 `docs/` 前缀，末尾也没有 `.md`。

::: warning
在开发服务器运行时保存配置并自行重新启动。如果它因错误而停止，请阅读最后几行 - 它几乎总是缺少逗号或未闭合的括号，它会告诉您行号。
:::

## 从右到左语言 {#right-to-left-languages}

阿拉伯语语言环境设置 `dir: "rtl"`，并且 `postcss-rtl` 在构建时自动镜像样式表。您不需要为其编写单独的 CSS。

## 合并更改时会发生什么 {#what-happens-when-your-change-is-merged}

Netlify 正在监视 `main` 分支。合并触发 `npm run docs:build`，并发布生成的站点。这需要一两分钟。

构建输出进入 `.vitepress/dist/` 并故意不提交 - 它每次都是从 Markdown 重新生成，因此提交它只会产生冲突。

## 了解更多 {#learning-more}

[虚拟新闻文档](https://vitepress.dev) 详尽且可读。[标记下延](https://vitepress.dev/guide/markdown) 页面特别列出了比我们在这里使用的更多内容 - 如果您想要某个功能并想知道它是否存在，它可能就在该页面上。
