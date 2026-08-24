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
 * What gets stored is the version it was dismissed for, not a boolean, so the
 * next release brings it back on its own without needing a new key or a reset.
 */

function dismiss() {
  shown.value = false;
  document.documentElement.setAttribute("data-mh-announce", "off");
  try {
    localStorage.setItem("mh-announce", version);
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
}

@media (prefers-reduced-motion: reduce) {
  .mh-announce-close::after {
    transition-duration: 0s;
  }
}
</style>
