# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [0.0.13.Unreleased] (23 / 08 / 2026)

### Added

- English landing page rebuilt from scratch as its own component rather than
  the VitePress home layout. Hero states what the site is for, a quick
  reference card under it holds the values people turn up looking for (app id,
  the three ports, the Game.ini path) with click to copy on each, and the
  guides are grouped into three lanes by who is reading, each page marked
  written or outline. Closes on the language list and a note asking for
  corrections. Logo, palette and typefaces are unchanged.
- New look for the landing page: steel and oxblood palette taken off the
  logo, replacing the purple and cyan from the VitePress starter.
- Slow float on the hero logo and a slower pulse on the glow behind it, on
  different periods so they do not sync up. Both stop under
  prefers-reduced-motion.
- Hero logo on the Arabic, French, Japanese, Russian and Chinese home pages,
  they had no image at all.
- Bricolage Grotesque for headings and JetBrains Mono for code, both self
  hosted through fontsource so the site makes no Google Fonts request. Body
  and interface text stay on the Inter that VitePress already ships.
- No image anywhere on the site can be selected or dragged off the page,
  screenshots included. Right-click still works on them, and clicking the
  navbar logo still goes home.
- Overlay scrollbar in place of the native page one, on every route. Square,
  no stepper arrows, 6px wide, and it floats over the content instead of
  reserving a gutter, so pages no longer shift sideways depending on whether
  they are long enough to scroll. Scrolling itself is untouched and still
  native. Scrollbars inside the sidebar and code blocks are squared off and
  thinned to match.
- The hero logo drifts again on the rebuilt landing page, with the glow
  behind it pulsing on a longer period. Both stop under prefers-reduced-motion.
- Width setting in the customization panel, default or wide, covering both
  the documentation pages and the landing page.
- Appearance button in the nav bar, beside the theme switch. Corners can be
  set to square or rounded, and every colour row offers eight options: the
  accent, heading and body text colour, and the page background chosen
  separately for the dark and the white theme. Heading and body text colour are separate settings again, each of
  default, strong, muted or accent. Everything persists and is applied before
  the first paint so nothing
  flashes on load. The theme switch itself stays a pill either way, and the
  button uses a sliders icon so it does not read as a second theme toggle.
- Features strip on the landing page above the quick reference: no ads or
  trackers, one ordered page per topic, and walkthroughs shown rather than
  only described.
- Frosted nav bar once the page is scrolled. Translucent with a backdrop
  blur so the content reads through it, and it stays fully opaque at the top
  of the page. Falls back to the old solid bar where backdrop-filter is not
  supported.
- Combat Mechanics page.
- Glossary page.
- Git, Github, VitePress and Resources pages in the contributing section.
- Build settings in netlify.toml so Netlify builds the site itself.
- Project Structure section in the README.

### Changed

- Corners are square everywhere by default. VitePress shipped radii of 4, 6,
  8, 12 and 20px that disagreed with each other, so buttons, the search box,
  code blocks, callouts, badges and menus all run off two tokens now. Rounded
  mode caps at 13px.

- VitePress 1.5.0 to 1.6.4.
- Wrote the Dedicated Server guide properly (SteamCMD, Game.ini, ports).
- Wrote the RCON guide properly (RconPassword, RconPort, command list).
- Filled in Tools, Methods, Terms & Rules, How to Read, References,
  Solutions and Errors and the MordhauSDK page, all were placeholders.
- Finished the Markdown pages, one of them stopped mid sentence.
- Dedicated Game Server Providers is now a table with working links.
- Dead link checking is on, the build fails instead of shipping broken links.
- package.json now has name, private, description, license and engines.

### Fixed

- Customization panel showed nothing selected in a row when the stored choice
  named an option that no longer existed. Values are validated against the
  current list on load and fall back to the default.
- Selected swatch was hard to see on pale colours. Selection is now a darker
  pad behind the chip rather than a ring around it.

- The logo never loaded, anywhere. Loose files under docs/ are not copied by
  the build, only docs/public is, so both the navbar and the hero logo have
  been 404ing. Moved it to docs/public/logo.webp.
- Hero logo sat half its own width off centre. postcss-rtl rewrites the
  :deep() rule VitePress centres it with into [dir=ltr][data-v-hash], which
  matches nothing, so the centering silently never applied. Restated it with
  a selector postcss-rtl handles.
- "Get Start Contributing" on all five translated home pages pointed at
  /en/how-to-contributing, which has never existed.
- The line under the nav bar was drawn with --vp-c-gutter, pure black in dark
  mode, so it read as a heavy bar next to the hairlines in the content. It is
  --vp-c-divider now and matches them. Light mode was already correct.
- Nav and sidebar links that pointed at ssshkdsd, asdasdc and similar.
- Arabic sidebar pointed at the English pages.
- Missing s in the GitHub social link.
- Casing on the how-to-use-markdown link.
- localhost:3000 in the README and contributing pages, it is 5173.
- Build output path, it is .vitepress/dist/docs and not /public.
- References to .vitepress/config.ts, the file is config.mts.

### Removed

- .vitepress/dist and .vitepress/cache from the repository, 172 files of
  build output that should never have been committed.
- The /config/ sidebar left over from the VitePress starter template.
- The rewrites hook, its regex never matched anything.
- The dead [data-v-hash] rules in style.css. Those hashes stopped matching
  several VitePress versions ago, so none of them were doing anything.
- docs/en/encountering-errors, a duplicate of solutions-and-errors.
- Chinese menu entries for pages that do not exist yet, only the homepage
  has been translated so far.



## [0.0.12.Unreleased] (11 / 12 / 2024)

### Added

- Improving the website's appearance
- More Documentations Content.
- Mordhau Logo.
- Custom Style.

### Changed

- Project Structure.
- Style.
- VitePress Config.



## [0.0.11.Unreleased] (11 / 12 / 2024)

### Added

- Improving the website's appearance
- More Documentations Content.



## [0.0.10.Unreleased] (10 / 12 / 2024)

### Added

- Improving the website's appearance
- More Documentations Content.

## Fixed

- Fix RTL ( remove old package and add postcss-rtl pkg).



## [0.0.9.Unreleased] (10 / 12 / 2024)

### Added

- Support RTL.
- More Documentations Content.
- Search Bar.

### Edited

- Documentations Content.



## [0.0.8.Unreleased] (09 / 12 / 2024)

### Added

- Recomended Extentions For Vscode.

### Changed

- Project Structure.

## Fixed

- Redirect System.



## [0.0.5.Unreleased]

### Added

- CHANGELOG File.
- CONTRIBUTING File.
- LICENSE File.
- Change Project Structure.
- Redirect System For Routes.

### Changed

- Project Version.
- LICENSE ext.
- Config File.
