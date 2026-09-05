# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).



## [1.1.0] (05 / 09 / 2026)

### Added

- Actors page in the Mordhau SDK guide, in all six languages. Covers what an
  actor is, the difference between configuring a placed copy and changing the
  class every copy comes from, and then the part no Unreal tutorial can teach
  you: the classes Triternion wrote for Mordhau's own maps.
  `MordhauPlayerStart`, `ControlPoint`, `PushableActor`, the `MordhauActor`
  mesh family, `EnvironmentMovable`, `MasterField` and `SubField` each get
  their properties in a table. It says plainly that the Content Browser is the
  authority when a name has moved between patches, and asks for the values
  nobody has measured rather than inventing them.

- Blueprints page in the Mordhau SDK guide, in all six languages. The game
  mode Blueprint as the first one anybody touches, the base level plus one
  sublevel per mode layout, the metadata that tells the game what your map is,
  the Level Blueprint, and the weapon, equipment and bot classes. Closes on
  the five worth learning first.

- In this guide index on the SDK guide landing page, pointing at both new
  pages, and the map-making walkthrough now links into them at the steps that
  mention spawns, game modes and objectives instead of describing them in
  passing.

- Flags on the language switcher and on the language list at the foot of the
  landing page. Sixteen by twelve, with a hairline ring so Japan, which is a
  white field, does not dissolve into a light page. They are the flag-icons
  SVGs, six of them, served from `docs/public/flags/` rather than inlined, so
  they cache as their own files instead of riding in the stylesheet. The
  switcher matches them on the locale segment of each link, because the order
  of that list changes with the language being read and nothing in it can be
  counted positionally. A flag stands for a country and not a language, which
  never lines up cleanly: English is flying the British one and Arabic the
  Saudi one, both of which are conventions rather than facts.

- MORDHAU Editor on the Epic Games Store, in the modding list on References.

### Changed

- The footer is a band the page fades into rather than a strip cut away from
  it. VitePress ended the document with a 1px rule drawn the full width of the
  viewport and two centred paragraphs at the same size, weight and colour, so
  nothing in it was ranked and the line closed the page instead of finishing
  it. The rule is gone: the page darkens into the alt surface over 150px, hung
  in the empty space that already sat under the last thing on a page — 154px
  on a document, 122px on a phone, 96px on a landing page — so the footer is
  no taller for having it. Inside, a seam rules the band's own content off and
  everything sits under it on one row: the attribution and the licence stacked
  at the start, the places to go at the end. The seam is one hairline that
  fades out before both ends of the measure, the reader's accent laid across
  its middle at three tenths, and it sits clear of the top of the band — 44px
  down on a phone, 48px on a wide screen — so it reads as ruling the footer
  off rather than as the cut the wash was put there to avoid. It is the notch
  in the nav bar's underline again — a line here is allowed to stop. The band
  is capped at the width of the text column above it and centred, off the same
  token, so the reader's width setting moves the two together instead of
  leaving the footer spanning 1440px under a 720px page, and it is generous
  with the space it has: 52px under the last line on a phone, 60px on a wide
  screen, and the two sentences led at 1.7 rather than 1.65 so they settle
  rather than stack.

- The band closes every page, including the ones VitePress will not put a
  footer under at all. Its own rule hides the footer wherever there is a
  sidebar, which here is the contributing series and the SDK guide, between
  them the two longest reads on the site: both ended with nothing under the
  pager. Nothing moves to make room for it either. The sidebar and the outline
  are fixed columns, out of the flow and on the layer above the band, so it
  arriving under the article neither shortens them, shifts them nor covers a
  pixel of them. They stand where they stood the whole way down, and the
  reader meets the band at the end of the page the same way as on a page
  without them.

- What the band is padded by is the article's own gutters rather than the
  window: --vp-sidebar-width where there is a sidebar, the same again on the
  side the outline is pinned to, and the layout shell's share of the window
  past 1440px, which is what the content area is inset by in each of those
  cases. Only the contents move — a background paints across padding, so the
  band still runs edge to edge. Centred on the window it would miss: at 1024
  with a sidebar the article sits 136px right of the middle, and at 1280 with
  an outline and no sidebar the seam would run 24px in under the outline rail
  at one end and stop 56px short of the article at the other. It tracks the
  column at every width, in both directions, and follows the article out to
  the edges in read mode.

- Every link in the footer is drawn the same way, and none of them is a box.
  Disclaimer and Support the docs are places to go, so they stand on their own
  — and on nothing else: they take the same underline the licence and
  Triternion carry inside the sentences beside them, because colour alone does
  not mark a link, softened to the dimmest text tone at rest and up to full
  strength under the pointer, where the words take the accent and the line
  follows them to it. A footer with four links in it marks a link exactly one
  way; the rank between a destination and a word in a sentence is carried by a
  point of size, a step of weight and which end of the row it sits at, not by
  a second treatment invented for two of them. The heart on the support link
  is Hugeicons' FavouriteIcon drawn as a mask rather than the ❤️ it was, which
  rendered as a pink system emoji beside an oxblood palette and ignored the
  accent setting; drawn as a mask it turns with the words.

- Both sentences are set a step up from the dimmest text tone rather than in
  it: measured against the band on the light theme the dimmest lands at
  2.96:1, under the 4.5:1 body text wants, and the licence is not a line to
  make anyone squint at.

- The footer is written in the language of the page. Its four strings were one
  English set served to all six locales, so an Arabic, Japanese or Chinese
  page closed in English, and the Disclaimer link pointed at the English page
  whatever you were reading — the one link on the site that put you back into
  a language you had just left. Each locale carries its own now, and the two
  destinations reuse the labels the nav bar already had for them rather than
  translating the same two words a second time. The sentences are stored as
  sentences with a named slot in them, so a translation is prose and never
  markup, and the addresses for Triternion and for the licence are declared
  once for all six.

- The search box is in the language of the page: the placeholder in the field,
  the three key hints under it, what it says when a query finds nothing, and
  the labels a screen reader reads off the arrow, enter and escape keys.
  VitePress keys these by locale rather than by themeConfig, so they sit in
  one record beside the other translated copy and are spread into the search
  options from there. English is left to VitePress, whose defaults are already
  the strings this site would have written.

- "On this page", the heading over the outline rail, is translated. English is
  left to VitePress, whose default is already the string this site would have
  written, so only the five translated locales carry an override and there is
  no English copy in the config restating a default.

- The read mode button is in the language of the page, label and tooltip both.
  Its three strings sit with the release banner's in the theme's copy file, so
  a locale that has one has the other.

- The notch cut out of the nav bar's underline, which the read mode button
  hangs off, is republished from an observer on the button rather than
  measured at the few moments the width seemed likely to change. It follows
  whatever a label needs, and the six of them span 96px to 133px, including
  when the language changes under it, which is the case a width
  taken on mount could not see: VitePress switches language without unmounting
  anything, so the notch would have stayed cut for the locale before, 20px too
  narrow going from English to Russian and 17px too wide going to Chinese,
  with the underline running over the button's shoulders one way and stopping
  short of them the other. The observer also covers a browser zoom and a
  reader's larger default type, which the mount, font-load and resize hooks it
  replaces did not.

- The width it publishes is the button's real one rather than its offsetWidth,
  which is rounded to a whole pixel. The notch is cut symmetrically about the
  centre, so a rounding error is halved and then applied to both shoulders at
  once: 107.31px published as 107 ran the Arabic segments a sixth of a pixel
  too far onto the button and left a hair of extra line at each corner, and
  125.55px published as 126 left the Japanese ones a quarter of a pixel short
  and a hair of gap instead. Taken off the rect the arithmetic closes — the
  button is centred, so a segment of half the bar less half the button plus a
  pixel ends exactly one pixel past its edge — and the overlap now measures
  1.000px in all six languages, against 0.78 to 1.16 before.

- The isolate on those two sentences went with the English in them.
  dir="ltr" was holding an English run together inside an Arabic paragraph,
  and it was the wrong tool: a full stop is a neutral character, so in a right
  to left line it takes the line's direction and is laid to the left of
  whatever it follows. After a Latin run, the left of that run is where a
  reader's eye arrives first, which is why the licence line read as ".CC BY-SA
  4.0" and the attribution read as ".Mordhau".

- The Arabic footer is written so that problem cannot arise, because nothing
  in the markup can move a stop that follows its run in logical order — an
  isolate or a right to left mark puts it in exactly the same place. Each line
  opens on an Arabic word and closes on one, and carries a single full stop,
  at its end, after Arabic. The two clauses of the attribution are joined with
  a conjunction rather than split by a stop, for the same reason: a stop
  between them would have landed against Triternion. Mordhau, Triternion and
  the licence all sit in the middle of a line with Arabic on both sides now,
  and no punctuation touches any of them. The copyright sign goes with the
  rewrite, since Arabic says reserved rights in words, and the licence line
  closes on the Arabic for International, which is the licence's own name
  rather than padding.

- The edit link and the last updated date under a documentation page are one
  strip now, rather than two items shoved to the ends of a row with nothing
  around them. The alt surface behind a hairline, corners off the same token
  as everything else, the edit link at the start and the date at the end, and
  deliberately flat, because the pager directly below it is made of bordered
  boxes that are links and this one is not. The edit link is body text that
  takes the accent on hover; the date stays muted. Icons are Hugeicons:
  PencilEdit02Icon in place of VitePress's square pen, and Calendar02Icon on
  the date, which had no icon at all. Both are masks rather than background
  images, which is how VitePress draws its own, so they take their colour from
  the text and need no light and dark variants.

- No rule between the page meta strip and the previous/next pager. The strip
  is a bounded box already, so a line a few pixels beneath it drew a second
  horizontal edge parallel to the first and the two read as a mistake rather
  than a division. The strip's own bottom margin carries the separation.

- Copy button on a code block uses Hugeicons' CopyIcon, two offset sheets
  rather than VitePress's board and clip. It goes through --vp-icon-copy, so
  the button's size, hover and copied states are untouched. The icon is drawn
  in the same fixed grey VitePress used rather than the currentColor Hugeicons
  ships it with, because a background-image has no cascade to resolve that
  against.

- Release notice carries Hugeicons' Megaphone03Icon ahead of its text. A mask
  like the others, so it takes the bar's own text colour and follows the
  accent setting rather than needing one copy per palette, and it turns around
  on the Arabic pages, because the horn points the way the line is read. It
  gives a couple of pixels back on a narrow screen, where the notice text is
  already truncating.

- The page's scrollbar stays at the right edge of the window in every
  language. A native one follows the document's direction and moves to the
  left on an Arabic page, and the bar this theme draws in its place was doing
  the same, because its offset is logical and a logical offset resolves
  against a right to left root by going left. It is pinned now, which also
  keeps the thumb's transparent grab margin on the inner side of the strip
  rather than needing a correction of its own.

- The nav bar reads left to right in every language. An Arabic page mirrors
  the article and no longer mirrors the bar above it: the logo stays at the
  left, the menus and the icons stay at the right, and only the words in them
  change, each still laid out right to left inside itself. Setting the bar's
  direction does most of that, because every row in it is a flex container and
  a flex row lays its items along the inline axis. The rest is about two dozen
  physical offsets that postcss-rtl had already mirrored for the Arabic build
  — the title block's pin, which edge each flyout hangs from, the appearance
  knob, the hamburger's three states, every negative margin that pulls a group
  flush to an edge — restated at their English values in logical properties,
  which postcss-rtl leaves alone, and with the transforms behind custom
  properties, which it cannot evaluate and so cannot flip.

- The two columns beside a documentation page start their contents on the same
  line. VitePress pads the outline clear of the nav bar and then some, and
  lets the sidebar begin almost against it, so the first sidebar link sat 22px
  above "On this page" across the width of the window — 10px under the bar
  against the outline's 32. Both read one figure now, so they cannot drift
  apart again: measured at 960, 1440 and 1920, with the release notice up and
  closed and on the Arabic pages, each column's first line lands exactly 32px
  below the bar.

- An info, tip, warning or danger box carries an icon beside its word and a
  hairline around its edge. VitePress leaves both off: a block was a tinted
  rectangle with a bold word at the top of it, so the four kinds were told
  apart by a wash of colour alone — the weakest signal on the page for the one
  element whose whole job is to say how much attention to pay, and no signal
  at all to a reader who cannot separate the tints. The icons are Hugeicons,
  the family the rest of the theme draws from, and the ones the shapes argue
  for: a circle for information, a bulb for a tip, a triangle for a warning,
  an octagon for danger — the last two being the road-sign pair, so the two
  that matter carry the two shapes a reader already reads as caution and stop.
  Drawn as masks like every other icon here, so each takes its block's own
  text colour. The border was already declared at 1px and merely transparent,
  so the hairline is four colour tokens pointed at something visible, each
  block taking its own colour at the quiet end of its family.

- A table fills the column it sits in rather than only the part of it the
  cells happen to need. VitePress gives every table `display: block` with a
  horizontal scroll, which is how a wide one is kept from bursting the page,
  but it costs the element its table box: the rows inside are wrapped in an
  anonymous table, an anonymous table is sized to its contents, and the rest
  of the column was left empty beside it — on the left of an Arabic page,
  which is where a right to left table ends. From 640px up they are real
  tables at full width. Below that the block and its scroll stay, because a
  phone is where a property table genuinely will not fit and where scrolling
  one beats breaking its identifiers across lines. Measured over the twenty
  tables on the site at 1440, 900 and 640: every one fills its column exactly,
  none overhangs it.

- What opens out of the nav bar does read right to left. The bar is chrome and
  holds its shape whatever the language; a menu is a list of the page's own
  words, so on an Arabic page each label meets the reader at the right of the
  panel and each flag sits at the reading edge of its row. The direction goes
  on the panel and not on the box around it, which is the deliberate half of
  it: the box is what hangs a menu off its button, and turning that round
  would swing every panel to the wrong side of the thing that opened it.
  Three corrections this release had been making inside a panel — the indent
  on an external item, the language heading's padding, the appearance row's
  margin — are gone with it rather than reversed a second time.

  The switch is the one exception, in the bar and in the overflow menu alike.
  It is a control rather than a sentence: a track with two ends and a knob
  that travels a fixed distance between them, so a mirrored track would send
  the knob off the end. Measured in both languages, it rests 2px from the same
  end of its track.

- The slashes between the nav bar's groups keep their spacing in Arabic. They
  are not evenly spaced and are not meant to be: each sits 16px from the group
  it follows and 8px from the one it introduces, so it reads as belonging to
  what came before it. Mirrored, both of those 16px landed on the wrong side
  and the row looked as though it had stray padding in it. They are drawn as
  pseudo-elements, which is why they outlasted the rest of the correction.
  Every element in the bar is now compared against the English build with both
  of its pseudo-elements, at ten widths from 390 to 2560 and with the menus
  open and shut: nothing differs on a property that has a direction in it.

- The language being read is drawn as a disabled option in the switcher.
  VitePress puts it at the top of the menu as a heading rather than a link, so
  it is the one row there that cannot be chosen, and it was also the boldest
  and brightest thing in the menu, which said the opposite. It sits a shade
  darker than the menu behind it now, at the weight of the options below it,
  text one step muted and a flag a touch faded, with neither a pointer
  response nor a text selection to drag across it. A light touch throughout:
  taken further, to a whole surface step down and the dimmest text token with
  a flag drained to grey, it read as switched off rather than as where you
  are, and on a dark panel the row looked like a hole cut in the menu.

- Every menu that opens out of the nav bar parts its rows by four pixels
  rather than stacking them flush. A hovered row's fill used to run straight
  into the rows above and below it with nothing between them, which was least
  forgivable in the language menu, where each row carries a flag and so is an
  object with an edge of its own — but it is the same row and the same fill in
  all of them. A group's heading takes the same gap as its links, because a
  heading is a row like the rest here. Measured across the five menus in both
  languages: four pixels between rows, and the twenty-four to twenty-nine
  between whole groups left alone, since those already have a rule and a dozen
  pixels of padding doing that job.

- The language list at the foot of the landing page drops the locale's two
  letters. EN, AR, FR, JA, RU and ZH sat in mono at 10px beside each
  language's own name, from a version of the row that had nothing else in it
  to tell one language from another; the flag beside them does that now, and
  a chip reading "AR العربية" was labelling the same thing twice. With one
  type size left in the row it centres rather than sitting on a baseline,
  which is what having two of them needed.

### Fixed

- Code blocks read right to left on the Arabic pages. VitePress mirrors them
  deliberately — it ships the rules itself rather than leaving them to the
  right-to-left build — and for a block of prose that would be right, but a
  shell line, a path, a config key and a JSON brace all have a fixed order
  that is part of what they mean. Reversing the line is not a translation of
  it, and nobody types `cd ..` from the right. They run left to right in every
  language now, with the line numbers, the copy button, the language tag and
  the diff markers back in the corners they hold in English. Inline code is
  left alone: it is a Latin run inside an Arabic sentence, which the bidi
  algorithm already lays out correctly, and forcing a direction on it would
  drag the punctuation around it to the wrong end.

- Every down arrow pointed up on the Arabic pages, and every up arrow pointed
  down. VitePress draws one chevron glyph pointing right and one arrow, and
  aims each with a rotation — 90 degrees is down, minus 90 is up — and
  postcss-rtl mirrors a rotation, which is what a glyph meaning "forward"
  wants and the opposite of what one meaning "down" wants. So the nav menus
  sat with their arrows pointing up, opening one turned its arrow down, and
  the up and down keys in the search box's key hints were drawn upside down.
  Both angles are held in custom properties now, the same shield the external
  link arrows already use: postcss-rtl cannot evaluate a var(), so there is no
  number left for it to mirror and one angle serves both builds. Left and
  right are untouched, being the glyphs a mirror is for.

- The outline rail's surface showed through the nav bar, and the outline's own
  heading sat underneath it. The rail was pinned to the top of the window
  rather than to --vp-layout-top-height, which is the release notice's height
  while the notice is up and 0px once it has been closed, and both the clip
  that keeps the rail out from under the bar and the padding above its first
  heading are measured down from its own top edge. So with the notice up the
  rail began drawing 34px above where the bar ends, its panel was visible
  through the frosted bar, and "On this page" sat the same 34px too high. It
  reads the token the left column has always used now: the rail starts at
  98px, which is exactly where the bar ends, and the heading 32px below that.

- The knob on the light and dark switch never moved. The theme changed, the
  sun turned into a moon, and the one part of a switch that shows it has been
  switched sat at the same end of the track in both states. VitePress slides
  it with a rule beginning `.dark`, and postcss-rtl, which rewrites anything
  carrying a transform into a left-to-right copy and a right-to-left one,
  prepends `[dir=ltr]` as a whole extra ancestor when a selector does not
  begin with `html`. That asked for a `.dark` element sitting inside a
  `[dir=ltr]` element; both of those are `<html>` itself and nothing contains
  itself, so the rule never applied. The travel is restated on a selector
  anchored to `html`, where the attribute lands on the compound that carries
  it, and it mirrors on the Arabic pages, where the knob rests at the other
  end of the track and has to travel the other way. Everything else about the
  switch was working, which is why only the knob gave it away.

- The language menu's heading sat 12px to the left of the list under it, on
  pages that have a sidebar. The nav bar's own sidebar reset in this theme
  zeroed `padding` on any `.title` inside `.VPNavBar`, with an !important,
  meaning to catch the logo block; `.title` is also the class VitePress puts
  on the language flyout's heading, and that sits in the same bar. It only
  applied where `.has-sidebar` did, which is what made it look intermittent:
  switching language can land you on a page that has a sidebar when the last
  one did not. The reset is scoped to the title block now. The heading's
  padding is restated as a logical property besides, because VitePress writes
  it asymmetrically and postcss-rtl leaves only a [dir=ltr] and a [dir=rtl]
  copy of it with no unconditional one.

- The release notice never came back once it was closed. The dismissal went to
  localStorage, which has no expiry, so closing the bar once silenced it on
  that browser until the version changed. It goes to sessionStorage now:
  closed for the rest of the browsing session, back on the next visit. What is
  stored is still the version rather than a boolean, so a release shipped
  mid-session brings it back too. Opening the site in a second tab shows it
  again, which is how sessionStorage is scoped.

- The SDK guide sent readers to Steam for the Editor, under a Tools filter
  that has never had it. The Editor is a build of the Unreal Editor, and
  Epic's engine licence only allows those to be distributed through the Epic
  Games Store, so it is claimed there instead, free and separately from the
  game. Getting it is the Epic route start to finish now, the packaging
  walkthrough agrees, and a warning names the older advice so anybody carrying
  it knows why it did not work.

- The last updated date was written in the reader's browser language rather
  than the page's. A reader whose system is set to Arabic saw an English page
  dated ٢٤‏/٨‏/٢٠٢٦, and an Arabic reader on an English browser got the
  mirror of it. The date follows the page now. The clock time went with it: a
  short date and a short time put a comma between two runs that a right to
  left line then reorders, and the hour a paragraph was last touched was never
  the useful half of that string.

- The date now sits in its own bidi run. At the end of an Arabic line it was
  reordered against the label it belongs to, which put the separator on the
  wrong side of it. Isolated rather than forced left to right, because the
  date is written in the page's language and an Arabic one is genuinely right
  to left.

- The footer's sentences reordered on the Arabic pages. That string is not
  translated, so it runs in English inside a right to left paragraph, and the
  full stop closing an English run is a neutral character that resolves to the
  far side of it: the licence line read ".Licensed under CC BY-SA 4.0" and the
  attribution ".Mordhau © Triternion". Both sentences carry dir="ltr" now,
  which isolates them rather than forcing the paragraph — each still sits
  where the paragraph puts it, and only its own characters are laid out left
  to right.

- Edit this page and Last updated were in English on all five translated
  locales. Neither string had ever been set, so every locale fell through to
  VitePress's English default. Both are translated now, and the edit link
  pattern is shared between the six rather than written out per locale.

- Chinese References called the Editor announcement 津巴布韦, which is
  Zimbabwe. The machine translation had taken the game's name as a place.



## [1.0.0] (24 / 08 / 2026)

### Added

- What Still Needs Writing, in the contributing section. Names every gap on the
  site by area, says what closing each one takes, and is blunt that most of
  what is left is measurement rather than writing: numbers somebody has to test
  in game, because they move with patches and inventing them is worse than
  leaving the space empty.

- Weapons and Loadouts page, written from scratch. Covers the families, why
  reach is the first thing to look at, how windup length decides what you can
  do with a weapon rather than only how fast you do it, and how armour and
  perks compete for the same points. It is honest about what it does not have:
  the per-weapon numbers are missing, and the page says so and asks for them
  rather than carrying figures nobody measured.

- Game Modes page, written from scratch. Groups the modes by what they ask of
  you rather than listing them: objective modes, team modes, everyone for
  themselves, and Horde. Says which are worth starting on and why going
  straight to Frontline is what convinces most people the combat is random.
  Ends on the map prefix convention, which ties back to the server guide.

- Disclaimer page. Mordhau and everything that ships with it belong to
  Triternion, this site is not affiliated with or endorsed by them, and every
  page on it is written by players in their own time. It also sets out what the
  documentation is not, the copyright on the writing itself, and how to reach
  the maintainers about anything published here that should not be. The notice
  itself moved into the footer copyright line so it appears on every page that
  shows a footer, and the page is linked from the footer and from Informations.

- Support page, setting out what donations pay for: keeping the site online,
  keeping the guides true as Mordhau patches move values and rename config
  keys, and filling in the pages that are still outlines or untranslated. It
  says plainly what the money does not go to, and it makes the point that
  time is scarcer than money here, with three ways to help that cost nothing.
  Reached from the footer with a heart, and from Informations in the top bar.

- Read mode. A button under the nav bar clears the page down to the article:
  the nav slides up out of frame, the sidebar leaves by its own outer edge,
  the outline leaves by the other, and the text spreads into the space and
  recentres. While it is on the button floats at the top of the window, since
  it is the only way back out. Documentation pages only, remembered between
  visits and applied before the first paint, and the movement stops under
  prefers-reduced-motion. How to Read explains it for readers.

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
- Nav bar groups are separated by a slash instead of a vertical bar.
- Search is an icon in the nav bar rather than a field, sitting to the right
  of the customization button. GitHub and Discord marks are a little smaller.
- Arrow beside a nav menu turns up while the menu is open, and the arrow on an
  external item drifts the way it points on hover.
- Nav dropdowns and the customization panel open below the nav bar underline
  with a 5px gap, instead of overlapping the bar.
- Customization panel closes when the pointer leaves it, fading out on the
  same timing as the nav menus.
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

- Read mode button is now a tab of the nav bar rather than a box under it. It
  wears the bar's frosted surface off the same token and the same blur, sits
  flush against the underside of the bar with no line along its top, and the
  bar's underline stops either side of it. From 1280px up, where the button
  hangs off the nav bar itself.

- Licence moved from the Custom Documentation License to
  [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). The old
  licence claimed ownership of every contribution and forbade redistribution;
  the new one lets anyone share and adapt the documentation, including
  commercially, on two conditions: credit this project, and license what they
  build under the same terms. Contributors now keep the copyright in what they
  write rather than assigning it.

  The licence is scoped explicitly. Mordhau, its name, trademarks, artwork and
  assets belong to Triternion and are not ours to license, and material reused
  from elsewhere keeps the licence it arrived with. LICENSE.md, README,
  CONTRIBUTING, Terms & Rules, the disclaimer, the footer, package.json and the
  four translated contributing pages all say the same thing now.

- Contributing introduction rewritten. It walked through fork, branch and pull
  request, which Contribution Methods already covers, and listed review rules,
  which Terms & Rules already covers, so a reader met the same material three
  times and none of the three was clearly the one to follow. It is now the
  local setup start to finish and defers to the pages that own the rest, with
  the build step called out because it fails on broken internal links. 577
  words to 383, and the sidebar calls it Contributing rather than
  Introduction, which is what the section's own house style asks for.

- About Mordhau split in two, and both halves renamed. It was one page doing
  two jobs, and both menus pointed at it: Informations called it About
  Mordhau, Guides called it Mordhau Game. The game description now sits at
  /en/mordhau-game/ under the name the Guides menu was already using, and the
  documentation gap it described has a page of its own at /en/mordhau-lack/,
  covering what is missing, why it stays missing, and what that costs.
  /en/about-mordhau/ no longer resolves.

- About Us cut down. Five paragraphs circling the same sentiment became four
  short ones that say who runs the site, why it exists, that it is unofficial
  and not endorsed by Triternion, and how to help. 260 words to 150.

- "On this page" is a right hand sidebar now, not a column floating in the
  article. Same width as the sidebar on the left, same darker surface and
  hairline, pinned to the edge of the window and running its full height. No
  grey rail down the list, and it only scrolls when the outline is genuinely
  too long for the panel.

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

- Corners where the bar's underline meets the read mode button's side borders
  left a hairline gap. The button is an odd number of pixels wide, so centring
  puts its edges on half pixels and the line rounded away from them. The
  segments run a pixel long each now and share the corner pixel with the
  border, which is invisible since both are drawn in the same colour.

- Article sat left of centre on pages that have an outline but no sidebar. The
  outline's gutter opened on the right with nothing answering it on the left,
  so the text landed half the outline's width off centre: 136px at 1280 and
  1440, 176px at 1600, 256px at 1920, while a page with a sidebar was dead
  centre at all four. Both kinds of page now put the text column on the same
  pixel.

- Contributing introduction sent new pages to docs/ rather than the language
  folder under it, and told readers to press a Fork button on the top right of
  "this page", which is the documentation site and has no such button.

- What is VitePress showed the logo loose under docs/ in its project tree,
  which stopped being true when the file moved to docs/public/, and gave the
  build output as .vitepress/dist rather than .vitepress/dist/docs.

- Menu item hover, search shortcut keys, sidebar indicators and the outline
  marker ignored the corner setting.

- Nav bar was laid out around the sidebar, so the search box, logo and
  underline all sat somewhere different on pages that had one and jumped as
  you navigated. The bar is identical on every page now, and the sidebar is a
  box beneath it with a hairline down its right side.

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

- Every outbound link and mention of the Mordhau Fandom wiki: the further
  reading at the foot of Combat Mechanics, the entry in the contributing
  reading list, the Community documentation section of References along with
  its entry under Learning the game, the sourcing note on the server providers
  page, and the passing example in Terms & Rules. Nothing on this site was
  taken from there, so none of these were attribution.

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
