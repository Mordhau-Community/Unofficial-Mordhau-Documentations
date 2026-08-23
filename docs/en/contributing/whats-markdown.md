# What is Markdown

Markdown is a lightweight markup language used to format text in a simple and efficient way. It was created in 2004 by John Gruber and Aaron Swartz, with the goal of making plain text documents visually appealing and easily convertible to structured formats like HTML. Markdown is widely used in documentation, blogging, emails, and code repositories like GitHub.

This markup language has no connection to the game Mordhau, its development, or the creation of mods for it. It is simply a field of knowledge that exists independently and has multiple uses across various domains. We are explaining it here solely because we use it to contribute to the documentation of the game Mordhau, through which you are reading this page.

::: info
**Information for those who are unfamiliar with programming or websites:**
<br>
HTML is also a markup language and is the foundational structure for all websites. On this page, you are not required to learn or understand it if your intention is only to contribute to Mordhau documentation. You simply need to learn Markdown, which ultimately gets converted into HTML code.
<br><br>
We do not aim to explain programming complexities or immerse you in a world full of technical details. Our sole objective is to direct your focus toward contributing to Mordhau documentation only! Whether you are a beginner in programming languages or have no knowledge of them at all, we are striving to simplify things as much as possible to make your path to contribution easier
:::

## Where is Markdown Used?

Markdown is used in various contexts due to its simplicity and versatility. Here are some common areas where Markdown is applied:

1. **Technical Documentation:**<br> Markdown is widely used for writing README files in repositories like GitHub, GitLab, and Bitbucket.
2. **Blogging Platforms:**<br> Many platforms, such as Medium or Jekyll, support Markdown for creating well-formatted posts with ease.
3. **Content Management Systems (CMS):**<br> Markdown is often used in static site generators like Hugo and Gatsby.
4. **Email and Messaging:**<br> Markdown helps in formatting clean and professional emails or chat messages, especially in tools like Slack or Discord.
5. **Note-Taking Applications:**<br> Popular tools like Notion, Obsidian, and Evernote support Markdown for efficient note organization.
6. **Educational Platforms:**<br> Markdown is used in wikis and tutorials to present clean, structured information.

## How Does Markdown Work?

Markdown uses plain text syntax with special characters to define formatting. Here are some examples:

### 1- Headings:

```md
# Heading 1

## Heading 2

### Heading 3
```

A heading is a line starting with one to six `#` characters. One `#` is the page title, `##` is a section, `###` is a subsection. Leave a blank line after it.

### 2- Emphasis:

```md
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~struck through~~
```

### 3- Lists:

```md
- first item
- second item
  - a nested item, indented by two spaces

1. numbered
2. list
3. of things
```

Numbered lists renumber themselves, so you can write `1.` on every line and Markdown will still count correctly.

### 4- Links:

```md
[text people click](https://example.com)
```

### 5- Images:

```md
![description of the image](/path/to/image.webp)
```

The description in the square brackets is what screen readers announce and what shows if the image fails to load, so write something real there.

### 6- Code:

Wrap a few words in single backticks to mark them as code — useful for file names, commands and config keys. For anything longer, use three backticks and name the language:

````md
```bash
node -v
```
````

### 7- Quotes:

```md
> Anything after a > is a quote block.
```

### 8- Tables:

```md
| Setting | Meaning |
| --- | --- |
| MaxSlots | How many players fit on the server |
| ServerName | The name shown in the browser |
```

The dashes on the second line are what turn it into a table. The columns do not have to line up in the source.

## What Markdown does not do

Markdown deliberately has no syntax for colours, fonts, text alignment or layout. That is the point of it — the document describes its structure, and the site decides how structure looks. If you find yourself fighting it, you are usually trying to do something the theme should handle instead.

## Next

The syntax above is standard Markdown and works anywhere. This site also adds a handful of extras on top of it — callout boxes, tabbed code blocks, page frontmatter. Those are covered in [How to use Markdown](/en/contributing/how-to-use-markdown).
