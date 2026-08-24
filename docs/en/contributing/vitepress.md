# What is VitePress?

VitePress is the thing that turns this repository into a website. You write Markdown files, VitePress renders them into HTML pages with navigation, search and a theme already attached.

You do not need to understand it to write documentation. This page exists for when you want to change something structural — add a page to the sidebar, add a language, or work out why the dev server is complaining.

## How the project fits together

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

Every `.md` file under `docs/` becomes a page. The URL follows the file path, so `docs/en/rcon-guide/index.md` is served at `/docs/en/rcon-guide/`.

## The three commands

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev` is the one you will use. It reloads the page in your browser every time you save a file.

::: tip
The dev server prints the address it is listening on when it starts, usually `http://localhost:5173`. Use whatever it prints rather than assuming a port — it picks a different one if that port is taken.
:::

## The config file

`.vitepress/config.mts` is the only file where you need to be careful, because a syntax error there stops the whole site from building rather than breaking one page.

The parts you are most likely to touch:

**`themeConfig.nav`** — the links across the top bar.

**`themeConfig.sidebar`** — the left navigation. It is keyed by path prefix, so the `"/en/contributing/"` block only shows on pages under that path.

**`locales`** — one entry per language. Each has its own `nav` and `sidebar`, plus a `dir` of `ltr` or `rtl`.

Adding a page to the sidebar looks like this:

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

The `link` is the URL, not the file path — no `docs/` prefix and no `.md` on the end.

::: warning
Save the config while the dev server is running and it restarts itself. If it stops with an error, read the last few lines — it is almost always a missing comma or an unclosed bracket, and it tells you the line number.
:::

## Right-to-left languages

The Arabic locale sets `dir: "rtl"`, and `postcss-rtl` mirrors the stylesheet automatically at build time. You do not need to write separate CSS for it.

## What happens when your change is merged

Netlify is watching the `main` branch. A merge triggers `npm run docs:build`, and the generated site is published. This takes a minute or two.

The build output goes in `.vitepress/dist/` and is deliberately not committed — it is regenerated from the Markdown every time, so committing it would just create conflicts.

## Learning more

The [VitePress documentation](https://vitepress.dev) is thorough and readable. The [Markdown Extensions](https://vitepress.dev/guide/markdown) page in particular lists more than we use here — if you want a feature and wonder whether it exists, it is probably on that page.
