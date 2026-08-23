# Required Tools

You do not need much to work on these docs. Everything listed here is free and runs on Windows, macOS and Linux.

## Node.js

VitePress runs on Node, so this one is not optional. Download the **LTS** build from [nodejs.org](https://nodejs.org/en) — anything from Node 18 upwards works.

Once the installer is done, open a terminal and check it:

```bash
node -v
npm -v
```

If both print a version number you are good. If the terminal tells you the command was not found, close it and open a new one. The installer only adds Node to your PATH for terminals opened after it ran.

## Git

Git is what you use to download the repository and send your changes back. Get it from [git-scm.com](https://git-scm.com/downloads).

On a fresh install you should tell Git who you are, otherwise your commits will have no author on them:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email address as your GitHub account, or GitHub will not connect the commits to your profile.

## Visual Studio Code

Any text editor will do, but the repository is set up for [VS Code](https://code.visualstudio.com/) and the rest of this guide assumes you are using it.

When you open the project folder for the first time, VS Code will show a notification asking whether you want to install the recommended extensions. Say yes. The list lives in `.vscode/extensions.json` and it is short:

| Extension | What it does |
| --- | --- |
| Prettier | Formats Markdown so everyone's files look the same |
| Markdown Preview Enhanced | Side-by-side preview while you type |
| Even Better TOML | Syntax highlighting for `netlify.toml` |
| Todo Tree | Collects every `TODO:` in the project into one panel |

::: tip
Turn on **Format on Save** in VS Code settings. Prettier will then clean up your Markdown every time you hit save and you never have to think about spacing again.
:::

## A GitHub account

Free, and you need one to open a pull request. Sign up at [github.com](https://github.com).

If you plan to push from your machine rather than editing in the browser, set up an SSH key as well — GitHub's [own walkthrough](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) covers it better than we could.

## What you do not need

You are writing Markdown, not code. You do not need to know Vue, TypeScript, or anything about how VitePress works internally. If you can write a forum post, you can write a page here.
