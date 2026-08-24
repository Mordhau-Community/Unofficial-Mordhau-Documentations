---
layout: doc
sidebar: false
aside: false
---

# How to Read Our Guides

A short page about how this site is put together, so you can find things quickly and know what the boxes and tabs mean.

## How it is organised

The top bar splits into two halves.

**Informations** is about the project — who we are, why Mordhau needed this, and how to contribute.

**Guides** is the documentation itself, and it is grouped by who it is for. Player guides cover the game. Developer and modder guides cover running servers, RCON, the SDK, and what to do when something breaks.

The sidebar on the left appears on pages that belong to a series, like the contributing section. If there is no sidebar, the page stands on its own.

On the right, the outline lists the headings on the current page. On a long page like the server guide, that is the fastest way to jump to the part you need.

## Search

The magnifying glass in the top bar, or <kbd>Ctrl</kbd> + <kbd>K</kbd>, searches the full text of every page in the language you are currently reading. If you know the name of a config key or a command, search for it directly.

## Languages

The language icon switches language. Not every page exists in every language yet — English is the most complete, and the others are being filled in as people translate them. If a page has not been translated you will land back on the English version.

Filling one of those gaps is genuinely useful, and [contributing a translation](/en/contributing/methods) does not require any technical knowledge beyond speaking the language.

## Read mode

The **Read Mode** button under the top bar hides the bar, the sidebar and the
outline, leaving just the article. Press it again to bring them back.

While it is on, the button sits at the top of the window. Your choice is
remembered between pages and visits, and it only applies to documentation
pages.

## What the boxes mean

Coloured panels appear throughout the guides and they are not decoration — the colour tells you how much attention to pay.

::: info
Background. Useful to know, but you can carry on without it.
:::

::: tip
Advice. Usually a shortcut, or the way we would do it.
:::

::: warning
Read this one. It marks the places people commonly get wrong.
:::

::: danger
Something that will break your server, lose your configuration, or expose it to strangers. Do not skim past a red box.
:::

## Code blocks

Anything in a grey block is meant to be typed or pasted exactly as written:

```bash
./steamcmd.sh +login anonymous +app_update 629800 validate +quit
```

Where a step is different on Windows and Linux, you get tabs. Click the one that matches your machine — the tabs are not two halves of the same instruction, they are the same instruction written twice.

::: code-group

```powershell [Windows]
.\MordhauServer.exe
```

```bash [Linux]
./MordhauServer.sh
```

:::

Values you need to replace are named for what they are. `RconPassword=a-different-long-password` means put your own password there, not that literal string.

`Inline code` marks file names, config keys, commands and paths — anything where the exact characters matter.

## Following a guide

Work top to bottom. The server guide in particular builds on itself: it installs SteamCMD, then downloads the server, then starts it once to generate the config, then edits that config. Skipping to the config section will not work, because the file does not exist yet.

If a step does not do what the page says it should, check the troubleshooting section at the bottom before assuming you did it wrong. Most of the entries there exist because it happened to one of us.

## When a page is wrong

It happens. Mordhau gets patched, hosts change their panels, and pages go stale.

If something here does not match reality, tell us. The **Edit this page** link at the bottom of every page opens it directly in GitHub, or you can open an [issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) or say something in the [Discord](https://discord.gg/zuX58yRV84). A correction from someone who just hit the problem is worth more than anything we could guess at.
