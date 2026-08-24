---
layout: doc
sidebar: false
aside: false
---

# Mordhau Lack

Mordhau is well documented as a game to play and barely documented as a game to
run. Everything past joining a server — hosting one, administering it, building
for it, or fixing it when it breaks — has no maintained official reference.

## Where the gaps are

**Dedicated servers.** Installing through SteamCMD, the shape of `Game.ini`,
which ports have to be open and what each one is for: all of it has to be
reconstructed from forum threads that frequently disagree with each other.

**RCON.** The protocol works and the commands exist, but there is no
authoritative list of them, no record of which ones have changed, and no
explanation of the ones whose names do not describe what they do.

**The SDK.** Enough to open the editor is findable. Enough to finish and ship a
working map or mod is mostly oral tradition.

**Errors.** The failure messages are terse and the causes are rarely obvious.
Most of the answers exist in a Discord reply somewhere, written once, to one
person.

## Why it stays that way

Documentation is usually the first thing a small studio drops and the last
thing a community picks up. It is slow to write, it is never finished, and
every patch that moves a value or renames a key puts part of it out of date
again.

The knowledge did not disappear, though. It simply never got written down
anywhere durable. It lives in threads that scroll out of reach, on forums that
have since gone quiet, and in the memory of server owners who worked it out by
trial and error and have long since stopped playing. When they leave, it leaves
with them.

## What that costs

A steep entry cost for anyone who wants to run or build something. The same
questions answered from scratch every few weeks. Servers left misconfigured
because the correct setting was never written down anywhere findable. And
people who give up before they reach the part that would have been interesting.

## What this site does about it

It writes the missing half down. [The guides](/en/dedicated-server-guide/) are
the attempt, and [contributing](/en/contributing/) is how the remaining gaps
get closed.
