<script setup lang="ts">
/**
 * Landing page for the English docs.
 *
 * Rendered through `layout: Landing` in docs/en/index.md. VitePress passes any
 * unknown layout name straight to <component :is>, and VPNav and VPFooter live
 * outside that, so the nav bar and footer come along unchanged.
 */
import { withBase } from "vitepress";

/**
 * Attack phases, from docs/en/combat-mechanics. The widths are the point: the
 * parry window is a sliver next to the swing that precedes it, which is the
 * single thing that makes Mordhau's combat read as unfair until it clicks.
 */
const phases = [
  { name: "Windup", hint: "feint until the last moment", width: 46 },
  { name: "Release", hint: "the only part that hurts", width: 31 },
  { name: "Recovery", hint: "you are stuck here", width: 23 },
];

const lanes = [
  {
    audience: "Players",
    line: "Why the swing that looked early still landed.",
    links: [
      { text: "Combat mechanics", to: "/en/combat-mechanics/", state: "written" },
      { text: "Glossary", to: "/en/glossary/", state: "written" },
      { text: "About Mordhau", to: "/en/about-mordhau/", state: "written" },
    ],
  },
  {
    audience: "Server owners",
    line: "From an empty box to a server that shows up in the browser.",
    links: [
      { text: "Dedicated server guide", to: "/en/dedicated-server-guide/", state: "written" },
      { text: "RCON guide", to: "/en/rcon-guide/", state: "written" },
      { text: "Solutions and errors", to: "/en/solutions-and-errors/", state: "written" },
      {
        text: "Server providers",
        to: "/en/dedicated-server-guide/dedicated-game-server-providers",
        state: "written",
      },
    ],
  },
  {
    audience: "Modders",
    line: "The Editor, and an honest note about what is still missing.",
    links: [
      { text: "MordhauSDK guide", to: "/en/mordhauSDK-guide/", state: "outline" },
      { text: "References", to: "/en/references/", state: "written" },
    ],
  },
];

const languages = [
  { code: "EN", label: "English", to: "/en/", full: true },
  { code: "AR", label: "العربية", to: "/ar/", full: false },
  { code: "FR", label: "Français", to: "/fr/", full: false },
  { code: "JA", label: "日本語", to: "/ja/", full: false },
  { code: "RU", label: "Русский", to: "/ru/", full: false },
  { code: "ZH", label: "中文", to: "/zh/", full: false },
];
</script>

<template>
  <div class="landing">
    <!-- Hero ------------------------------------------------------------ -->
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Unofficial &middot; written by the community</p>

        <h1 class="headline">
          <span class="headline-thin">The parts of Mordhau</span>
          <span class="headline-heavy">nobody wrote down.</span>
        </h1>

        <p class="lede">
          Dedicated servers, RCON, the SDK and the combat system — pulled out of
          Discord threads and dead forum posts, and kept somewhere you can
          actually find them.
        </p>

        <div class="cta-row">
          <a class="cta cta-primary" href="#guides">Find your guide</a>
          <a class="cta cta-ghost" :href="withBase('/en/contributing/')">
            Help write it
          </a>
        </div>
      </div>

      <div class="hero-mark" aria-hidden="true">
        <span class="hero-glow" />
        <img class="hero-logo" :src="withBase('/logo.webp')" alt="" />
      </div>

      <!-- Signature: one swing, to scale. -->
      <a class="phases" :href="withBase('/en/combat-mechanics/')">
        <p class="phases-title">One swing, to scale</p>

        <div class="phases-bar">
          <span
            v-for="phase in phases"
            :key="phase.name"
            class="phases-seg"
            :style="{ flexGrow: phase.width }"
          >
            <span class="phases-name">{{ phase.name }}</span>
            <span class="phases-hint">{{ phase.hint }}</span>
          </span>
          <span class="phases-sweep" />
          <span class="phases-parry"><em>parry window</em><i /></span>
        </div>

        <p class="phases-note">
          The window to block is a sliver at the tail of a swing you watched
          the whole way in. Read the combat guide &rarr;
        </p>
      </a>
    </section>

    <!-- Guides ---------------------------------------------------------- -->
    <section id="guides" class="guides">
      <h2 class="section-title">Start where you are</h2>

      <div class="lane" v-for="lane in lanes" :key="lane.audience">
        <div class="lane-head">
          <h3 class="lane-audience">{{ lane.audience }}</h3>
          <p class="lane-line">{{ lane.line }}</p>
        </div>

        <ul class="lane-links">
          <li v-for="link in lane.links" :key="link.to">
            <a :href="withBase(link.to)">
              <span class="lane-text">{{ link.text }}</span>
              <span class="state" :class="`state-${link.state}`">
                {{ link.state }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Close ----------------------------------------------------------- -->
    <section class="close">
      <div class="close-block">
        <h2 class="close-title">Read it in your language</h2>
        <p class="close-line">
          English is the furthest along. The rest are only as complete as the
          people who speak them have made them so far.
        </p>
        <ul class="langs">
          <li v-for="lang in languages" :key="lang.code">
            <a :href="withBase(lang.to)" :class="{ 'is-full': lang.full }">
              <span class="lang-code">{{ lang.code }}</span>
              <span class="lang-label">{{ lang.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="close-block">
        <h2 class="close-title">Something here is wrong</h2>
        <p class="close-line">
          Probably. The game gets patched and pages go stale. Every page has an
          edit link at the bottom, and a correction from someone who just hit
          the problem beats anything we could guess at.
        </p>
        <div class="cta-row">
          <a
            class="cta cta-primary"
            href="https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations"
            target="_blank"
            rel="noreferrer"
            >GitHub</a
          >
          <a
            class="cta cta-ghost"
            href="https://discord.gg/zuX58yRV84"
            target="_blank"
            rel="noreferrer"
            >Discord</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Tokens are the site's own, only re-expressed with landing-page spacing. */
.landing {
  --bleed: clamp(20px, 6vw, 96px);
  --rule: var(--vp-c-divider);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--bleed) 96px;
}

/* --- Hero ------------------------------------------------------------- */

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 32px;
  padding: clamp(48px, 9vw, 104px) 0 0;
}

.hero-copy {
  /* Sized so the two headline lines each hold on one line at desktop. Note
     ch here would resolve against the 16px body size, not the display size. */
  max-width: 820px;
}

.eyebrow {
  margin: 0 0 28px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.headline {
  margin: 0;
  font-family: var(--mh-font-display);
  font-size: clamp(38px, 6.2vw, 68px);
  line-height: 1.0;
  letter-spacing: -0.035em;
  border: 0;
}

.headline span {
  display: block;
}

.headline-thin {
  font-weight: 300;
  color: var(--vp-c-text-2);
}

.headline-heavy {
  font-weight: 800;
  color: var(--vp-c-text-1);
}

.lede {
  margin: 28px 0 0;
  max-width: 52ch;
  font-size: 16px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}

.cta {
  display: inline-flex;
  align-items: center;
  height: 42px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease;
}

.cta-primary {
  background-color: var(--vp-c-brand-3);
  color: #fff;
  border: 1px solid var(--vp-c-brand-3);
}

.cta-primary:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.cta-ghost {
  border: 1px solid var(--rule);
  color: var(--vp-c-text-1);
}

.cta-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.hero-mark {
  position: relative;
  display: grid;
  place-items: center;
  width: clamp(120px, 17vw, 188px);
  aspect-ratio: 1;
}

.hero-glow {
  position: absolute;
  inset: -32%;
  border-radius: 50%;
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
}

.hero-logo {
  position: relative;
  width: 100%;
  filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.4));
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

/* --- Signature: one swing, to scale ----------------------------------- */

.phases {
  grid-column: 1 / -1;
  display: block;
  margin-top: clamp(34px, 5vw, 56px);
  padding-top: 26px;
  border-top: 1px solid var(--rule);
  text-decoration: none;
  color: inherit;
}

.phases-title {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

/* Sentence case. A line this long in all caps mono is a wall. */
.phases-note {
  margin: 0;
  max-width: 62ch;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-3);
  transition: color 0.16s ease;
}

.phases-bar {
  position: relative;
  display: flex;
  margin: 18px 0 44px;
  overflow: visible;
}

.phases-seg {
  position: relative;
  flex-basis: 0;
  padding: 12px 12px 0 0;
  border-top: 2px solid var(--vp-c-text-3);
  min-width: 0;
}

/* Tick at the start of every phase, so the widths read as measurements. */
.phases-seg::before {
  content: "";
  position: absolute;
  top: -2px;
  inset-inline-start: 0;
  width: 1px;
  height: 9px;
  background-color: var(--vp-c-text-3);
}

.phases-seg:first-child {
  border-top-color: var(--vp-c-text-1);
}

.phases-seg:nth-child(2) {
  border-top-color: var(--vp-c-brand-1);
}

.phases-name {
  display: block;
  font-family: var(--mh-font-display);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
}

.phases-hint {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-3);
}

/* The parry window: deliberately tiny, sitting under the end of Release. */
/*
 * Sits at the tail of Release, where the window actually is, with the tick
 * resting on the rule so the label is clearly measuring the bar and not
 * floating beside it.
 */
.phases-parry {
  position: absolute;
  top: 0;
  inset-inline-start: 70%;
  transform: translateY(-100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  padding-bottom: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}

.phases-parry em {
  font-style: normal;
}

.phases-parry i {
  display: block;
  width: 30px;
  height: 5px;
  background-color: var(--vp-c-brand-1);
}

.phases-sweep {
  position: absolute;
  top: -2px;
  inset-inline-start: 0;
  width: 2px;
  height: 2px;
  background-color: var(--vp-c-brand-1);
}

.phases:hover .phases-note {
  color: var(--vp-c-brand-1);
}

/* --- Guides ----------------------------------------------------------- */

.section-title,
.close-title {
  margin: 0;
  font-family: var(--mh-font-display);
  font-weight: 700;
  letter-spacing: -0.025em;
  border: 0;
}

.section-title {
  font-size: clamp(26px, 3.4vw, 34px);
  padding-bottom: 18px;
}

.guides {
  margin-top: clamp(40px, 7vw, 72px);
}

.lane {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 24px 40px;
  padding: 30px 0;
  border-top: 1px solid var(--rule);
}

.lane:last-child {
  border-bottom: 1px solid var(--rule);
}

.lane-audience {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  border: 0;
}

.lane-line {
  margin: 10px 0 0;
  font-family: var(--mh-font-display);
  font-size: clamp(19px, 2.3vw, 24px);
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.lane-links {
  margin: 0;
  padding: 0;
  list-style: none;
}

.lane-links a {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 9px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 15px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.16s ease;
}

.lane-links li:last-child a {
  border-bottom: 0;
}

.lane-text {
  flex: 1;
  min-width: 0;
}

.lane-links a:hover {
  color: var(--vp-c-brand-1);
}

.state {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.state-written {
  color: var(--vp-c-text-3);
}

.state-outline {
  color: var(--vp-c-warning-1);
}

/* --- Close ------------------------------------------------------------ */

.close {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: 40px;
  margin-top: clamp(56px, 8vw, 88px);
}

.close-title {
  font-size: clamp(21px, 2.6vw, 25px);
}

.close-line {
  margin: 12px 0 0;
  max-width: 46ch;
  font-size: 15px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.langs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.langs a {
  display: inline-flex;
  align-items: baseline;
  gap: 8px;
  padding: 7px 12px;
  border: 1px solid var(--rule);
  font-size: 13px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition:
    border-color 0.16s ease,
    color 0.16s ease;
}

.langs a:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.langs a.is-full {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.lang-code {
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-3);
}

/* Every interactive thing here is an anchor, so one rule covers the lot. */
.landing a:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

/* --- Load sequence ---------------------------------------------------- */

.eyebrow,
.headline-thin,
.headline-heavy,
.lede,
.cta-row,
.hero-mark,
.phases {
  animation: rise 0.6s cubic-bezier(0.22, 0.68, 0.31, 1) both;
}

.headline-thin {
  animation-delay: 0.06s;
}
.headline-heavy {
  animation-delay: 0.12s;
}
.lede {
  animation-delay: 0.2s;
}
.cta-row {
  animation-delay: 0.27s;
}
.hero-mark {
  animation-delay: 0.1s;
}
.phases {
  animation-delay: 0.36s;
}

/* The swing runs once, after the hero has settled. */
.phases-sweep {
  animation: swing 1.5s cubic-bezier(0.5, 0, 0.7, 1) 0.9s both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes swing {
  from {
    width: 0;
    opacity: 1;
  }
  to {
    width: 100%;
    opacity: 0;
  }
}

/* --- Narrow ----------------------------------------------------------- */

@media (max-width: 820px) {
  .hero {
    grid-template-columns: 1fr;
  }

  .hero-mark {
    order: -1;
    justify-self: start;
  }

  .lane {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .phases-hint {
    display: none;
  }

  .phases-parry {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .headline-thin,
  .headline-heavy,
  .lede,
  .cta-row,
  .hero-mark,
  .phases,
  .phases-sweep {
    animation: none;
  }

  .phases-sweep {
    display: none;
  }
}
</style>
