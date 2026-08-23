# How to use Markdown

Everything in the [previous page](/en/contributing/whats-markdown) works here. This page covers the extras VitePress adds on top, and the conventions we follow in this repository.

## Frontmatter

The block at the very top of a file, fenced by three dashes, is frontmatter. It configures the page rather than appearing on it, and it has to be the first thing in the file:

```md
---
layout: doc
sidebar: false
aside: false
---

# My Page
```

The keys worth knowing:

| Key | Effect |
| --- | --- |
| `layout` | `doc` for a normal page, `home` for a landing page |
| `sidebar` | `false` hides the left navigation |
| `aside` | `false` hides the on-page table of contents on the right |
| `title` | Overrides the browser tab title |

Most pages need no frontmatter at all. Add it only when you want to turn something off.

## Callout boxes

These are the coloured panels used throughout the site. Open with three colons and the type, close with three colons:

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

You can give any of them a custom heading by putting text after the type:

```md
::: tip RECOMMENDED
This shows "RECOMMENDED" as the box title instead of "TIP".
:::
```

Use these sparingly. A page where every other paragraph is in a coloured box is harder to read than one with none.

## Code blocks

Always name the language after the opening backticks. It turns on syntax highlighting and tells the reader what they are looking at:

````md
```bash
steamcmd +login anonymous +app_update 629800 validate +quit
```
````

`bash`, `ini`, `json`, `md`, `js` and `ts` cover almost everything in these docs.

### Highlighting specific lines

Put line numbers in curly braces to draw attention to part of a block:

````md
```ini{2}
[/Script/Mordhau.MordhauGameSession]
MaxSlots=64
ServerName=My Server
```
````

### Windows and Linux side by side

When a step differs by platform, use a code group rather than writing the section twice:

````md
::: code-group

```powershell [Windows]
.\steamcmd.exe +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +login anonymous +app_update 629800 validate +quit
```

:::
````

The reader gets tabs and only sees the one they need.

## Links between pages

Internal links start from the language folder and leave off the `.md`:

```md
[Required Tools](/en/contributing/tools)
[RCON Guide](/en/rcon-guide/)
```

A path ending in `/` points at that folder's `index.md`.

::: warning
Write internal links with the full path from the site root, not relative ones like `../tools`. Relative links break as soon as a page moves, and they behave differently in the GitHub preview than they do on the site.
:::

When you link to a page in a translated section, keep the reader in their language. From a French page link to `/fr/rcon-guide/`, not `/en/rcon-guide/`.

## Images

Put the file in the same folder as the page that uses it and link it from the site root:

```md
![Server browser showing a custom server](/en/dedicated-server-guide/browser.webp)
```

Save screenshots as `.webp` where you can. They are a fraction of the size of PNG at the same quality, and this repository is already large enough.

## Adding a new page

Creating the file is only half of it — a page nobody can navigate to may as well not exist.

1. Create the `.md` file in the right folder under `docs/`.
2. Open `.vitepress/config.mts`.
3. Find the locale you are adding to, and add an entry to its `nav` or `sidebar` pointing at your page.
4. Run `npm run docs:dev` and click through to it.

If your page belongs in every language, add the English one first and leave the others for translators. An empty page is worse than a missing one.

## House style

- One `#` heading per page, at the top, and it should match what the sidebar calls the page.
- Do not skip heading levels — an `###` should sit under an `##`, not directly under the `#`.
- Put a blank line before and after headings, lists, code blocks and callouts. Markdown is forgiving about this until suddenly it is not.
- Use backticks for file names, commands, config keys and values. `Game.ini`, not "Game.ini".
- Let Prettier handle line wrapping. Do not add manual line breaks to keep lines short.
