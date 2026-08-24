# Contributing

This site is written by the people who use it. Every page on it started as
someone working something out and then taking the time to write it down.

This page is the local setup, start to finish. You do not need any of it to fix
a typo or report something that is wrong — [contribution methods](/en/contributing/methods) covers the quicker routes, and none of them
involve a terminal. Read the [terms and rules](/en/contributing/terms-rules)
before you open a pull request either way.

## What you need

- [Node.js](https://nodejs.org/en) 18 or newer
- [Git](https://git-scm.com/downloads)
- A [GitHub](https://github.com) account
- An editor — the repository is set up for [VS Code](https://code.visualstudio.com/)

[Required tools](/en/contributing/tools) has the install notes and the
first-run configuration for each of them.

## Set up locally

Fork [the repository](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)
on GitHub, then clone your fork and install:

```bash
git clone https://github.com/YOUR-USERNAME/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations
npm install
```

Start the development server:

```bash
npm run docs:dev
```

It prints the address it is serving on, usually `http://localhost:5173`. Leave
it running — pages reload as you save.

## Make your change

Work on a branch, never on `main`:

```bash
git checkout -b fix-rcon-ports
```

Pages live under `docs/<language>/`, so an English page belongs in `docs/en/`.
A new page also needs an entry in `.vitepress/config.mts`, or nothing on the
site links to it.

[How to use Markdown](/en/contributing/how-to-use-markdown) covers the file
conventions and the house style. [What is VitePress](/en/contributing/vitepress)
covers the config file and how the project fits together.

## Check it before you send it

```bash
npm run docs:build
```

The build fails on broken internal links. That is the easiest mistake to make
and the easiest one to miss in a preview, so it is worth running even for a
one-line change. If it passes, `npm run docs:preview` serves exactly what the
build produced.

## Send it

```bash
git add .
git commit -m "Correct the RCON port numbers"
git push origin fix-rcon-ports
```

GitHub offers to open a pull request from that branch the next time you visit
the repository. Say what changed and why.

If the review comes back asking for something, push another commit to the same
branch — the pull request updates itself. Once it is merged, Netlify rebuilds
and publishes the site, which takes a minute or two.
