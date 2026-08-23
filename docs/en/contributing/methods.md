# Contribution Methods

There is more than one way to help here, and not all of them involve cloning a repository. Pick whichever matches how much time you feel like spending.

## 1. Open an issue

The lowest effort option, and honestly the most useful one when you have spotted something wrong. Found a command that does not work any more? A dead link? A page that contradicts itself? Open an [issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) and describe it.

A good issue says what page you were on, what you expected, and what actually happened. You do not have to know the fix.

## 2. Edit a page from the browser

Every page on this site has an **Edit this page** link at the bottom. Clicking it opens that exact file in GitHub's editor. Make your change, write a short note describing it, and GitHub will fork the repository and open the pull request for you.

This is the right choice for typos, a broken link, a sentence that reads badly, or a small addition. No terminal, no install, nothing to set up.

## 3. Work locally

Once you are changing more than one file — or adding a page, or touching the sidebar — it is worth setting the project up on your machine so you can see the result before you send it. The [introduction](/en/contributing/) walks through the clone and the dev server.

Work locally when you are:

- adding a whole new page
- restructuring a section
- editing the navigation in `.vitepress/config.mts`
- adding images

## 4. Translate

The site already runs in English, Arabic, French, Japanese, Russian and Chinese, but most of the translated folders are far behind the English ones. Filling in a page in a language you actually speak is one of the most valuable things you can do here.

Translations live in `docs/<language>/`, mirroring the English structure. Copy the English file to the matching path in your language folder and translate the body. Leave the frontmatter keys alone — only translate the values.

::: warning
Please do not submit machine translated pages. A rough page written by someone who speaks the language beats a fluent looking one that gets the technical terms wrong, and we have no way to review a language none of us read.
:::

## 5. Share what you already know

A lot of Mordhau knowledge is sitting in Discord threads and old forum posts. If you have run a server for years, or you have figured out something about the SDK that is written down nowhere, you do not need to turn it into a polished page yourself. Drop it in the [Discord](https://discord.gg/zuX58yRV84) or paste it into an issue and someone will help shape it.

Half the point of this project is collecting things before the people who know them move on.
