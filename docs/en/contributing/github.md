# What is GitHub?

GitHub is a website that hosts Git repositories. It stores the project online so everyone works against the same copy, and it adds the things Git itself has no opinion about: issue tracking, code review, and pull requests.

This site's source lives at [Mordhau-Community/Unofficial-Mordhau-Documentations](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations). Every page you read here is a Markdown file in that repository.

If the difference between Git and GitHub is not clear yet, read [What is Git?](/en/contributing/git) first.

## Getting an account

Free. Sign up at [github.com](https://github.com) with an email address and a username — the username is public and appears on everything you contribute, so pick one you are happy to be known by.

Turn on two-factor authentication while you are in the settings. GitHub requires it for contributors anyway.

## Fork, branch, pull request

This is the workflow the whole site runs on, and it is the same everywhere on GitHub.

### 1. Fork

You do not have permission to push directly to the main repository, and that is deliberate. Clicking **Fork** gives you your own complete copy under your own account that you can do whatever you like with.

### 2. Make your changes

Either in the browser, or by cloning your fork and working locally. Put them on a branch rather than straight onto `main`.

### 3. Open a pull request

A pull request is a request to pull your changes into the original repository. GitHub shows exactly what you changed, line by line, and gives everyone a place to discuss it before anything is merged.

Write a description that says what you changed and why. If it fixes an issue, mention the issue number — writing `Fixes #42` closes that issue automatically once the pull request is merged.

### 4. Respond to review

Someone will read it. They may ask for changes. Push another commit to the same branch and the pull request updates on its own — you do not open a new one.

Once it is approved and merged, Netlify rebuilds the site and your change is live within a couple of minutes.

## Editing without any of that

For a typo you do not need to fork anything. Every page here has an **Edit this page** link at the bottom. It opens GitHub's editor on that exact file, and when you save, GitHub silently does the fork and the pull request for you.

## Issues

The [issue tracker](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) is where problems get reported and work gets planned. Open one if you have found something wrong and are not going to fix it yourself, if you want to suggest a page that does not exist, or if you are unsure whether an idea is worth doing before you spend time on it.

Search the existing issues first. Someone may have already raised it.

## Watching the repository

The **Watch** button at the top of the repository will email you when things happen. **Custom → Issues** is usually the right setting if you want to help but do not want a notification for every commit.

## Learning more

GitHub's own [Quickstart](https://docs.github.com/en/get-started/quickstart) is genuinely good and takes about fifteen minutes. GitHub Skills also has a free [Introduction to GitHub](https://github.com/skills/introduction-to-github) course that walks you through opening a real pull request.
