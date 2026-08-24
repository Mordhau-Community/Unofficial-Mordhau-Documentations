# Contribution Terms & Rules

Nothing here is complicated. It is mostly a list of things that save the people reviewing your pull request from having to ask.

## Writing

**Write for someone who has never done this before.** The reason this project exists is that the existing Mordhau documentation assumes you already know the answer. If a step needs a prerequisite, say so.

**Be specific.** "Edit the config file" is not useful. "Open `Mordhau/Saved/Config/LinuxServer/Game.ini`" is.

**Say when you are not sure.** A note saying a value is untested is far better than a confident wrong number. Someone will come along and confirm it.

**Keep the existing structure.** If a section already has a pattern, follow it rather than inventing a new one on your page.

## Accuracy

Test what you write. If you are documenting a command, run it. If you are documenting a config key, put it in a real `Game.ini` and start the server.

If you got the information from somewhere else — another site, a Discord message, a hosting provider's knowledge base — link it. Both so readers can go deeper and so the next person can tell how stale it is.

Game updates break documentation. If you notice a page describing something that no longer matches the game, fixing it counts as a contribution.

## Content

- Do not copy and paste text from other sites. Link to them, or write it in your own words.
- No cheats, exploits, or anything that breaks the game's terms of service.
- No advertising. The server providers list exists because the community uses those hosts, not because anyone paid for a slot.
- Screenshots are welcome. Crop out anything personal before you upload.

## Pull requests

Keep one pull request to one topic. A PR that fixes a typo and also rewrites the RCON page is hard to review and hard to revert.

Give it a title that says what changed. "Update" tells the reviewer nothing.

Run the site locally before you submit:

```bash
npm run docs:dev
```

Check that your page renders, your links go where you think they go, and nothing else broke.

If the review comes back with change requests, it is not a rejection. Push another commit to the same branch and the pull request updates itself.

## Behaviour

Be civil. People here are volunteers writing documentation for a game in their free time, in what is often not their first language. Correct the content, not the person.

## Licence

You keep the copyright in what you write. By contributing you license it, to this project and to everyone else, under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), and your credit is recorded in the commit history.

Do not contribute anything you do not have the right to publish.
