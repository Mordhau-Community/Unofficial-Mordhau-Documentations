# MordhauSDK Guide

The **Mordhau Editor** is the official tool for building custom maps and game modes for Mordhau. It is a build of Unreal Engine with Mordhau's assets and game code loaded into it, so you are working with the real weapons, characters and gameplay rather than approximations of them.

Triternion released it on 14 December 2021. People in the community usually call it the SDK.

::: warning
This page is an orientation, not a full tutorial. Mordhau modding is not well documented anywhere, which is exactly the gap this site exists to fill — but filling it properly needs people who have actually shipped a map. If that is you, [please contribute](/en/contributing/methods). We would rather publish your rough notes than a polished page written by someone guessing.
:::

## What you can make

- **Maps** — new levels for the existing modes
- **Game modes** — custom rules and objectives
- **Cosmetics and assets** — models and materials brought into the game

Mods are distributed through **mod.io**, which is also what the in-game mod browser reads from. Players subscribe there and the game downloads the content.

## In this guide

- [Actors](/en/mordhauSDK-guide/actors) — what you place in a level, and the Mordhau-specific ones a map needs: spawns, capture points, push objectives
- [Blueprints](/en/mordhauSDK-guide/blueprints) — how the game's own Blueprints are organised, which ones you subclass, and the few that matter most

## Getting it

The Editor is **not on Steam**. It is a separate, free product on the **Epic Games Store**, and you install it through the Epic Games Launcher:

1. Open the [MORDHAU Editor page on the Epic Games Store](https://store.epicgames.com/p/mordhau--editor), sign in with an Epic account and claim it — it costs nothing.
2. Open the Epic Games Launcher, find **MORDHAU Editor** in your **Library**, and install it from there.

That it lives on Epic rather than Steam is not a preference of Triternion's: the Editor is a build of the Unreal Editor, and Epic's engine licence only allows editor builds to be distributed through the Epic Games Store.

The Editor is claimed separately from the game and is not tied to your Steam copy — you still need Mordhau itself to play what you build. It ships with a few sample maps and game modes to start from.

::: warning
Older guides tell you to look under **Tools** in your Steam library. There is nothing there — the Mordhau Editor has only ever been distributed on the Epic Games Store.
:::

::: tip
It is large. It is a full Unreal Engine editor plus the game's asset library, so budget considerably more disk space than the game itself takes, and expect the first launch to sit compiling shaders for a long time. This is normal and it is faster afterwards.
:::

## Before you start

The Editor is Unreal Engine. Almost everything you need to learn is general Unreal knowledge, not Mordhau-specific knowledge — the level editor, the material system, lighting, Blueprints, and how packaging works are all standard.

That is good news: there is an enormous amount of Unreal Engine material out there, and most of it applies. The Mordhau-specific part is comparatively small — knowing which of the game's existing classes to build on, and how to package for mod.io.

The community tooling has generally tracked **Unreal Engine 4.26**, so when you are looking for tutorials, UE4 material will match what you see far better than UE5 material will.

If you have never opened Unreal before, work through a general beginner level-design tutorial first. Learning the engine and learning Mordhau's specifics at the same time is a bad experience.

## A rough workflow

Broadly, making a map goes:

1. Install the Editor from the Epic Games Store and let it finish its first launch.
2. Create a new level, or open one of the shipped maps to see how it is put together.
3. Build your geometry, lighting and [spawn points](/en/mordhauSDK-guide/actors#spawns-mordhauplayerstart).
4. Set up the [game mode](/en/mordhauSDK-guide/blueprints) and [objectives](/en/mordhauSDK-guide/actors) for the modes you want it to support, one sublevel per mode.
5. Test it locally.
6. Package it and upload to mod.io.
7. Load it on a [dedicated server](/en/dedicated-server-guide/) so other people can play it.

Opening the official maps is genuinely the fastest way to learn. They are the best documentation that exists for how a Mordhau level is supposed to be assembled.

## Where to get help

Because so little is written down, most Mordhau modding knowledge lives in conversations.

- The **Mordhau modding community on Discord** is where people who actually build maps talk. Ask there.
- [Mordhau Mapping & Modding tutorial series](https://www.youtube.com/watch?v=kA_BYvN4cfA) on YouTube — a community video series covering the basics
- [mod.io](https://mod.io) — browse what other people have published, and look at how they describe their setups
- [Unreal Engine documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine) — for everything that is really an engine question rather than a Mordhau question
- Our own [Discord](https://discord.gg/zuX58yRV84)

## Help us finish this page

The honest state of things: nobody has written a proper end-to-end Mordhau modding guide, and this page is not one either yet.

If you have made a map, even a bad one, you know things that are not written down anywhere. The exact packaging settings. Which class to inherit from for a custom mode. What the Editor does when it fails and why. Any of that is worth more than another overview.

Open an [issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues), or paste it into the Discord and we will help turn it into a page. Rough notes are fine — we will do the formatting.
