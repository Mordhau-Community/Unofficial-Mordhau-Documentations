<script setup lang="ts">
/**
 * Shared localized landing page for every documentation locale.
 *
 * VitePress passes `layout: Landing` to this registered component. The route
 * map keeps translated links local when a matching page exists and marks an
 * intentional English fallback when it does not.
 */
import { computed, ref } from "vue";
import { useData, withBase } from "vitepress";
import {
  landingCopies,
  localeOptions,
  normalizeLandingLocale,
  resolveLandingRoute,
  type LandingCopy,
} from "./landing-locales";

const { lang } = useData();
const locale = computed(() => normalizeLandingLocale(lang.value));
const copy = computed(() => landingCopies[locale.value]);
const languages = computed(() =>
  localeOptions.map((option) => ({
    ...option,
    to: `/${option.locale}/`,
    current: option.locale === locale.value,
  })),
);

const routeInfo = (path: string) => resolveLandingRoute(locale.value, path);
const routeHref = (path: string) => withBase(routeInfo(path).path);

const copied = ref("");
let copyTimer: ReturnType<typeof setTimeout> | undefined;

async function copyValue(item: LandingCopy["quickref"][number]) {
  try {
    await navigator.clipboard.writeText(item.value);
    copied.value = item.value;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => (copied.value = ""), 1400);
  } catch {
    // Clipboard is blocked outside a secure context. The value is still
    // selectable, so there is nothing useful to say here.
  }
}
</script>

<template>
  <main class="landing">
    <!-- Hero ------------------------------------------------------------ -->
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">{{ copy.eyebrow }}</p>

        <h1 class="headline">
          <span class="headline-heavy">{{ copy.headline }}</span>
          <span class="headline-thin">{{ copy.subtitle }}</span>
        </h1>

        <p class="lede">{{ copy.lede }}</p>

        <div class="cta-row">
          <a class="cta cta-primary" href="#guides">{{ copy.findGuide }}</a>
          <a class="cta cta-ghost" :href="routeHref('contributing/')">
            {{ copy.helpWrite }}
          </a>
        </div>
      </div>

      <div class="hero-mark" aria-hidden="true">
        <span class="hero-glow" />
        <img class="hero-logo" :src="withBase('/logo.webp')" alt="" />
      </div>

      <div class="features">
        <p class="features-title">{{ copy.featuresTitle }}</p>
        <ul class="features-list">
          <li v-for="feature in copy.features" :key="feature.title">
            <h2 class="features-name">{{ feature.title }}</h2>
            <p class="features-body">{{ feature.body }}</p>
          </li>
        </ul>
      </div>

      <!-- Signature: the answers people turn up needing. -->
      <div class="quickref">
        <div class="quickref-head">
          <p class="quickref-title">{{ copy.quickrefTitle }}</p>
          <a class="quickref-more" :href="routeHref('dedicated-server-guide/')">
            {{ copy.fullServerGuide }}
          </a>
        </div>

        <ul class="quickref-list">
          <li
            v-for="item in copy.quickref"
            :key="item.label"
            class="quickref-row"
            :class="{ 'is-flagged': item.flagged }"
          >
            <span class="quickref-label">{{ item.label }}</span>

            <button
              type="button"
              class="quickref-value"
              :aria-label="`${item.value} ${
                copied === item.value ? copy.copiedLabel : copy.copyLabel
              } ${item.label}`"
              @click="copyValue(item)"
            >
              <code>{{ item.value }}</code>
              <span
                class="quickref-copy"
                :class="{ 'is-copied': copied === item.value }"
                >{{
                  copied === item.value ? copy.copiedLabel : copy.copyLabel
                }}</span
              >
            </button>

            <span class="quickref-note">{{ item.note }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Guides ---------------------------------------------------------- -->
    <section id="guides" class="guides">
      <h2 class="section-title">{{ copy.guidesTitle }}</h2>

      <div class="lane" v-for="lane in copy.lanes" :key="lane.audience">
        <div class="lane-head">
          <h3 class="lane-audience">{{ lane.audience }}</h3>
          <p class="lane-line">{{ lane.line }}</p>
        </div>

        <ul class="lane-links">
          <li v-for="link in lane.links" :key="link.path">
            <a
              :href="routeHref(link.path)"
              :hreflang="routeInfo(link.path).fallback ? 'en' : locale"
            >
              <span class="lane-text">{{ link.text }}</span>
              <span
                class="state"
                :class="
                  routeInfo(link.path).fallback
                    ? 'state-fallback'
                    : `state-${link.state}`
                "
              >
                {{
                  routeInfo(link.path).fallback
                    ? "EN"
                    : copy.states[link.state]
                }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Close ----------------------------------------------------------- -->
    <section class="close">
      <div class="close-block">
        <h2 class="close-title">{{ copy.languagesTitle }}</h2>
        <p class="close-line">{{ copy.languagesBody }}</p>
        <ul class="langs">
          <li v-for="lang in languages" :key="lang.locale">
            <a
              :href="withBase(lang.to)"
              :class="{ 'is-current': lang.current }"
              :aria-current="lang.current ? 'page' : undefined"
              :hreflang="lang.locale"
            >
              <img
                class="lang-flag"
                :src="withBase(`/flags/${lang.locale}.svg`)"
                alt=""
                width="16"
                height="12"
                loading="lazy"
                draggable="false"
              />
              <span class="lang-label">{{ lang.label }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="close-block">
        <h2 class="close-title">{{ copy.correctionTitle }}</h2>
        <p class="close-line">{{ copy.correctionBody }}</p>
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
  </main>
</template>

<style scoped>
/* Tokens are the site's own, only re-expressed with landing-page spacing. */
.landing {
  --bleed: clamp(20px, 6vw, 96px);
  --rule: var(--vp-c-divider);
  max-width: var(--mh-landing-max, 1200px);
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

/*
 * The second line reads as a description of the first rather than the other
 * half of a sentence, so it is set as a subtitle. It also has to be: at the
 * display size it measures about 1190px against a 820px column, and there is
 * no size that holds both lines without gutting the name above it.
 */
.headline-thin {
  margin-top: 14px;
  font-size: clamp(17px, 2.1vw, 25px);
  font-weight: 300;
  letter-spacing: -0.005em;
  line-height: 1.25;
  color: var(--vp-c-text-2);
}

.headline-heavy {
  font-weight: 800;
  color: var(--mh-heading-color);
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
  border-radius: var(--mh-r);
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
  /* Longer period than the logo so the two never settle into lockstep. */
  animation: logo-glow 9s ease-in-out 0.9s infinite;
}

.hero-logo {
  position: relative;
  width: 100%;
  animation: logo-float 7s ease-in-out 0.9s infinite;
  filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.4));
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
}

/* --- Features --------------------------------------------------------- */

.features {
  grid-column: 1 / -1;
  margin-top: clamp(34px, 5vw, 56px);
  padding-top: 26px;
  border-top: 1px solid var(--rule);
}

.features-title {
  margin: 0 0 20px;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.features-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Hairline between the columns rather than boxes around them, so this reads
   as part of the same ruled page as everything below it. */
.features-list li + li {
  padding-inline-start: 28px;
  border-inline-start: 1px solid var(--rule);
}

.features-name {
  margin: 0;
  font-family: var(--mh-font-display);
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--vp-c-text-1);
  border: 0;
  padding: 0;
}

.features-body {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* --- Quick reference -------------------------------------------------- */

.quickref {
  grid-column: 1 / -1;
  margin-top: clamp(34px, 5vw, 56px);
  padding-top: 26px;
  border-top: 1px solid var(--rule);
}

.quickref-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.quickref-title {
  margin: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
}

.quickref-more {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.quickref-more:hover {
  text-decoration: underline;
}

.quickref-list {
  border-radius: var(--mh-r);
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--rule);
}

.quickref-row {
  display: grid;
  grid-template-columns: 128px auto minmax(0, 1fr);
  align-items: center;
  gap: 18px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--rule);
}

.quickref-row:last-child {
  border-bottom: 0;
}

.quickref-label {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.quickref-value {
  border-radius: var(--mh-r-sm);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  margin: 0;
  padding: 4px 9px;
  border: 1px solid transparent;
  background: none;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease;
}

.quickref-value code {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  /* The config path has nothing to break on, so let it break anywhere
     rather than widen the whole column. */
  overflow-wrap: anywhere;
  text-align: start;
  color: var(--vp-c-text-1);
  background: none;
  padding: 0;
}

.quickref-value:hover {
  border-color: var(--rule);
}

.quickref-value:hover code {
  color: var(--vp-c-brand-1);
}

/* Only surfaces on hover or keyboard focus, so the card reads as data first. */
.quickref-copy {
  font-family: var(--vp-font-family-mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  opacity: 0;
  transition: opacity 0.15s ease;
}

.quickref-row:hover .quickref-copy,
.quickref-value:focus-visible .quickref-copy {
  opacity: 1;
}

.quickref-copy.is-copied {
  opacity: 1;
  color: var(--vp-c-brand-1);
}

.quickref-note {
  min-width: 0;
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--vp-c-text-2);
}

.quickref-row.is-flagged .quickref-note {
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
  border-radius: var(--mh-r-sm);
  display: inline-flex;
  align-items: center;
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

.langs a.is-current {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}

.state-fallback {
  color: var(--vp-c-brand-1);
}

/*
 * A flag and the language's own name, and nothing between them. The row used
 * to carry the locale's two letters as well, set in mono at 10px, which is
 * why it aligned on the baseline: it had two type sizes to sit on one line.
 * With one size left there is nothing for a baseline to do that centring does
 * not, and the flag no longer has to opt out of it.
 *
 * The ring keeps Japan, which is a white field, from dissolving into a light
 * page.
 */
.lang-flag {
  flex: 0 0 auto;
  width: 16px;
  height: 12px;
  border-radius: 2px;
  object-fit: cover;
  box-shadow: 0 0 0 1px var(--rule);
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
.features,
.quickref {
  animation: rise 0.6s cubic-bezier(0.22, 0.68, 0.31, 1) both;
}

/* Keyed on position, not on weight. The two were the same thing until the
   heavy line moved to the top, and then the second line was arriving first. */
.headline span:nth-child(1) {
  animation-delay: 0.06s;
}
.headline span:nth-child(2) {
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
.features {
  animation-delay: 0.34s;
}
.quickref {
  animation-delay: 0.42s;
}

@keyframes logo-float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-8px) rotate(-1deg);
  }
  75% {
    transform: translateY(8px) rotate(1deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes logo-glow {
  0% {
    transform: scale(1);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.09);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.85;
  }
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

/* --- Narrow ----------------------------------------------------------- */

@media (max-width: 820px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-mark {
    order: -1;
    justify-self: start;
  }

  .lane {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }

  .features-list {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .features-list li + li {
    padding-inline-start: 0;
    border-inline-start: 0;
    padding-top: 22px;
    border-top: 1px solid var(--rule);
  }

  .quickref-row {
    grid-template-columns: 1fr;
    gap: 4px;
    padding: 12px 14px;
  }

  .quickref-value {
    margin-inline-start: -9px;
  }

  /* No hover on touch, and dropping it gives the config path the room to
     stay on one line. */
  .quickref-copy {
    display: none;
  }

  .quickref-value code {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .eyebrow,
  .headline-thin,
  .headline-heavy,
  .lede,
  .cta-row,
  .hero-mark,
  .hero-logo,
  .hero-glow,
  .features,
  .quickref {
    animation: none;
  }
}
</style>
