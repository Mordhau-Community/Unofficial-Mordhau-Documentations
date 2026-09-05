<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useData } from "vitepress";
import { version } from "../../package.json";
import {
  landingCopies,
  normalizeLandingLocale,
} from "./landing-locales";

const { lang } = useData();
const copy = computed(
  () => landingCopies[normalizeLandingLocale(lang.value)],
);

/*
 * The release banner, above the nav.
 *
 * Always rendered, never behind a v-if. Whether it shows is decided in CSS
 * from data-mh-announce and the current Read Mode state. The pre-paint script
 * in config.mts stamps the stored dismissal before anything is drawn. A v-if
 * would render it on the server and then tear it out again on hydration, which
 * is a flash of a banner for everybody who has already closed it.
 *
 * The dismissal goes to sessionStorage, not localStorage, so closing the
 * banner silences it for the rest of the browsing session and it comes back
 * the next time the browser is opened. What gets stored is the version it was
 * dismissed for, not a boolean, so a release shipped mid-session brings it
 * back too, without needing a new key or a reset.
 */

function dismiss() {
  shown.value = false;
  document.documentElement.setAttribute("data-mh-announce", "off");
  try {
    sessionStorage.setItem("mh-announce", version);
  } catch {
    // Private mode or blocked storage. It closes for this page view and comes
    // back next time, which is the harmless way for this to fail.
  }
}

const shown = ref(true);
onMounted(() => {
  shown.value =
    document.documentElement.getAttribute("data-mh-announce") !== "off";
});
</script>

<template>
  <div class="mh-announce" role="status" :aria-hidden="!shown">
    <span class="mh-announce-icon" aria-hidden="true" />

    <p class="mh-announce-text">
      <strong>Mordhau Guides {{ version }}</strong> {{ copy.announcement }}
    </p>

    <button
      type="button"
      class="mh-announce-close"
      :aria-label="copy.closeAnnouncement"
      draggable="false"
      @click="dismiss"
      @dragstart.prevent
    >
      {{ copy.closeAnnouncement }}
    </button>
  </div>
</template>

<style scoped>
.mh-announce {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Above the nav, which sits below it rather than under it, so they never
     actually overlap; this is only insurance. */
  z-index: var(--vp-z-index-layout-top);
  display: flex;
  align-items: center;
  justify-content: center;
  /* Fixed rather than content sized, because --vp-layout-top-height has to
     match it exactly or every fixed element on the page offsets wrongly. */
  height: var(--mh-announce-h);
  padding: 0 48px;
  background-color: var(--vp-c-brand-3);
  color: var(--vp-button-brand-text);
  font-family: var(--vp-font-family-base);
  font-size: 13px;
  line-height: 1;
  -webkit-user-select: none;
  user-select: none;
  visibility: visible;
  transform: translateY(0);
  transition:
    transform var(--mh-read-ease),
    visibility 0s;
}

.mh-announce-icon {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  margin-inline-end: 8px;
  /* A mask rather than an image, so it takes the bar's text colour and
     follows the accent setting with it instead of needing one copy per
     palette.

     Drawn at stroke 2 rather than the 1.5 Hugeicons ships. At this size 1.5
     works out under a pixel, which rasterises at partial alpha and turns a
     white line on a saturated bar into a grey smear. 2 lands it just over a
     pixel, which is also a little heavier than the same icons get elsewhere
     on the site, and it wants to be: nothing else sits on a solid colour. */
  background-color: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%23000'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M7%209V15'%2F%3E%3Cpath%20d%3D'M7%209H6C5.06812%209%204.60218%209%204.23463%209.15224C3.74458%209.35523%203.35523%209.74458%203.15224%2010.2346C3%2010.6022%203%2011.0681%203%2012C3%2012.9319%203%2013.3978%203.15224%2013.7654C3.35523%2014.2554%203.74458%2014.6448%204.23463%2014.8478C4.60218%2015%205.06812%2015%206%2015H7L15.0796%2017.4239C16.0291%2017.7087%2016.5039%2017.8512%2016.9257%2018.1014L16.9459%2018.1135C17.3663%2018.3663%2017.7167%2018.7167%2018.4177%2019.4177L18.5858%2019.5858C18.7051%2019.7051%2018.7647%2019.7647%2018.831%2019.8123C18.9561%2019.9021%2019.1003%2019.9619%2019.2523%2019.9868C19.3327%2020%2019.4171%2020%2019.5858%2020C19.9713%2020%2020.1641%2020%2020.3196%2019.9475C20.6155%2019.8477%2020.8477%2019.6155%2020.9475%2019.3196C21%2019.1641%2021%2018.9713%2021%2018.5858V5.41421C21%205.02866%2021%204.83589%2020.9475%204.68039C20.8477%204.38452%2020.6155%204.15225%2020.3196%204.05245C20.1641%204%2019.9713%204%2019.5858%204C19.4171%204%2019.3327%204%2019.2523%204.0132C19.1003%204.03815%2018.9561%204.09787%2018.831%204.18771C18.7647%204.23526%2018.7051%204.29491%2018.5858%204.41421L18.4177%204.5823C17.7167%205.28326%2017.3663%205.63374%2016.9459%205.88649L16.9257%205.89856C16.5039%206.14884%2016.0291%206.29126%2015.0796%206.57611L7%209Z'%2F%3E%3Cpath%20d%3D'M8%2015.5V18.0458C8%2019.1251%208.87491%2020%209.95416%2020C10.6075%2020%2011.2177%2019.6735%2011.5801%2019.1298L13%2017'%2F%3E%3C%2Fsvg%3E")
    no-repeat center / 100% 100%;
  mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2024%2024'%20fill%3D'none'%20stroke%3D'%23000'%20stroke-width%3D'2'%20stroke-linecap%3D'round'%20stroke-linejoin%3D'round'%3E%3Cpath%20d%3D'M7%209V15'%2F%3E%3Cpath%20d%3D'M7%209H6C5.06812%209%204.60218%209%204.23463%209.15224C3.74458%209.35523%203.35523%209.74458%203.15224%2010.2346C3%2010.6022%203%2011.0681%203%2012C3%2012.9319%203%2013.3978%203.15224%2013.7654C3.35523%2014.2554%203.74458%2014.6448%204.23463%2014.8478C4.60218%2015%205.06812%2015%206%2015H7L15.0796%2017.4239C16.0291%2017.7087%2016.5039%2017.8512%2016.9257%2018.1014L16.9459%2018.1135C17.3663%2018.3663%2017.7167%2018.7167%2018.4177%2019.4177L18.5858%2019.5858C18.7051%2019.7051%2018.7647%2019.7647%2018.831%2019.8123C18.9561%2019.9021%2019.1003%2019.9619%2019.2523%2019.9868C19.3327%2020%2019.4171%2020%2019.5858%2020C19.9713%2020%2020.1641%2020%2020.3196%2019.9475C20.6155%2019.8477%2020.8477%2019.6155%2020.9475%2019.3196C21%2019.1641%2021%2018.9713%2021%2018.5858V5.41421C21%205.02866%2021%204.83589%2020.9475%204.68039C20.8477%204.38452%2020.6155%204.15225%2020.3196%204.05245C20.1641%204%2019.9713%204%2019.5858%204C19.4171%204%2019.3327%204%2019.2523%204.0132C19.1003%204.03815%2018.9561%204.09787%2018.831%204.18771C18.7647%204.23526%2018.7051%204.29491%2018.5858%204.41421L18.4177%204.5823C17.7167%205.28326%2017.3663%205.63374%2016.9459%205.88649L16.9257%205.89856C16.5039%206.14884%2016.0291%206.29126%2015.0796%206.57611L7%209Z'%2F%3E%3Cpath%20d%3D'M8%2015.5V18.0458C8%2019.1251%208.87491%2020%209.95416%2020C10.6075%2020%2011.2177%2019.6735%2011.5801%2019.1298L13%2017'%2F%3E%3C%2Fsvg%3E")
    no-repeat center / 100% 100%;
}

/*
 * The horn points the way the line is read, so it turns around on the Arabic
 * pages. postcss-rtl leaves a transform alone, which is why this is written
 * out rather than left to the flip.
 */
html[dir="rtl"] .mh-announce-icon {
  transform: scaleX(-1);
}

.mh-announce-text {
  min-width: 0;
  margin: 0;
  /* Never wraps, so the bar cannot outgrow the height the layout was told
     about. On a narrow screen it truncates instead. */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.mh-announce-text strong {
  font-weight: 600;
}

.mh-announce-close {
  position: relative;
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  margin-inline-start: 10px;
  padding: 0 2px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  font-weight: 650;
  line-height: 1;
  cursor: pointer;
}

.mh-announce-close::after {
  content: "";
  position: absolute;
  inset-inline: 2px;
  bottom: 3px;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.2s ease;
}

.mh-announce-close:hover::after,
.mh-announce-close:focus-visible::after {
  transform: scaleX(1);
}

.mh-announce-close:focus-visible {
  outline: 2px solid var(--vp-button-brand-text);
  outline-offset: 1px;
}

@media (max-width: 767px) {
  .mh-announce {
    padding: 0 10px;
    font-size: 12px;
  }

  /* The text truncates on a narrow screen, so the icon gives back what it
     can rather than eating the line it sits on. */
  .mh-announce-icon {
    width: 15px;
    height: 15px;
    margin-inline-end: 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mh-announce-close::after {
    transition-duration: 0s;
  }
}
</style>
