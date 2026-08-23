# What is Git?

Git keeps a history of a folder. Every time you save a checkpoint — a *commit* — it records what changed, when, and who did it. You can go back to any earlier checkpoint, and two people can work on the same folder at once without overwriting each other.

It has nothing to do with Mordhau. It is a general tool, used for almost every software project in existence, and we use it here because these docs are a folder of text files that a lot of people edit.

::: info
Git and GitHub are two different things. Git is the program on your computer. GitHub is a website that stores Git repositories online. You can use Git without GitHub. See [What is GitHub?](/en/contributing/github).
:::

## The words

You will run into this vocabulary constantly, so it is worth getting straight early.

**Repository** (or repo) — the project folder, plus its entire history. This site is one repository.

**Clone** — download a copy of a repository, history and all.

**Commit** — a saved checkpoint, with a message describing what you changed.

**Branch** — a separate line of work. You make your changes on your own branch so that the main one keeps working while you are halfway through.

**Push** — send your commits from your machine up to GitHub.

**Pull** — bring down commits other people have made.

**Merge** — combine one branch into another.

## The five commands you actually need

You do not have to learn Git properly to contribute here. This is the whole loop:

```bash
# 1. Get the project onto your machine, once
git clone https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations

# 2. Start a branch for what you are about to do
git checkout -b fix-rcon-ports

# 3. Edit files in your editor, then check what Git noticed
git status

# 4. Save a checkpoint
git add .
git commit -m "Correct the default RCON port"

# 5. Send it to GitHub
git push origin fix-rcon-ports
```

Then you open a pull request on the website, which is covered in [What is GitHub?](/en/contributing/github).

## Two habits worth having

**Write commit messages that mean something.** "Fixed" tells nobody anything six months later. "Correct the beacon port in the server guide" does.

**Start a new branch for each thing you work on.** It costs one command and it means you can have two unrelated fixes in flight without them getting tangled together.

## Keeping your copy current

If you cloned a while ago, other people have changed things since. Before starting new work:

```bash
git checkout main
git pull
git checkout -b my-new-branch
```

## If you get stuck

Git error messages are famously unhelpful. Nothing you do locally is unrecoverable as long as you have not deleted the folder, so do not panic.

- [The official Git book](https://git-scm.com/book/en/v2) — free, and the first two chapters cover everything above in more depth
- [Oh Shit, Git!?!](https://ohshitgit.com/) — short answers to "I did something wrong, how do I undo it"

Or ask in the [Discord](https://discord.gg/zuX58yRV84). Someone has hit the same error.
