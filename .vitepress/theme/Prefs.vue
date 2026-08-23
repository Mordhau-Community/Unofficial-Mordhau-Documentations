<script setup lang="ts">
/**
 * Customization panel, mounted beside the appearance switch.
 *
 * Corners and accent apply to the whole site. Background is picked per theme,
 * since a dark page and a white page have nothing in common. Everything lives
 * as attributes on <html> and in localStorage; the inline script in config.mts
 * stamps them before the first paint so nothing flashes on load.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const KEYS = {
  corners: "mh-corners",
  accent: "mh-accent",
  width: "mh-width",
  bgDark: "mh-bg-dark",
  bgLight: "mh-bg-light",
  heading: "mh-heading",
  text: "mh-text",
};

/*
 * Text roles rather than fixed hexes, so each one resolves correctly in both
 * themes. The swatch is painted with the same variable the text will use, so
 * it previews the real colour.
 */
const textRoles = [
  { id: "default", label: "Default", swatch: "var(--vp-c-text-1)" },
  { id: "strong", label: "Strong", swatch: "var(--mh-text-strong)" },
  { id: "muted", label: "Muted", swatch: "var(--vp-c-text-2)" },
  { id: "soft", label: "Soft", swatch: "var(--vp-c-text-3)" },
  { id: "warm", label: "Warm", swatch: "var(--mh-text-warm)" },
  { id: "cool", label: "Cool", swatch: "var(--mh-text-cool)" },
  { id: "mono", label: "Mono", swatch: "var(--mh-text-mono)" },
  { id: "sepia", label: "Sepia", swatch: "var(--mh-text-sepia)" },
];

const accents = [
  { id: "oxblood", label: "Oxblood", swatch: "#a32a38" },
  { id: "steel", label: "Steel", swatch: "#2f6f8f" },
  { id: "brass", label: "Brass", swatch: "#8a6a1f" },
  { id: "moss", label: "Moss", swatch: "#3f6b3a" },
  { id: "iron", label: "Iron", swatch: "#4a4f57" },
  { id: "teal", label: "Teal", swatch: "#1f6f6a" },
  { id: "violet", label: "Violet", swatch: "#5c4a9e" },
  { id: "rust", label: "Rust", swatch: "#9a4a22" },
];

/** Swatches are painted in the page colour each preset produces. */
const darkBackgrounds = [
  { id: "default", label: "Default", swatch: "#1b1b1f" },
  { id: "black", label: "Black", swatch: "#0e0e10" },
  { id: "coal", label: "Coal", swatch: "#141414" },
  { id: "ink", label: "Ink", swatch: "#101318" },
  { id: "slate", label: "Slate", swatch: "#15181e" },
  { id: "warm", label: "Warm", swatch: "#1c1a18" },
  { id: "forest", label: "Forest", swatch: "#131a15" },
  { id: "plum", label: "Plum", swatch: "#1a1419" },
];

const lightBackgrounds = [
  { id: "default", label: "Default", swatch: "#ffffff" },
  { id: "paper", label: "Paper", swatch: "#faf9f6" },
  { id: "mist", label: "Mist", swatch: "#f6f8fa" },
  { id: "sand", label: "Sand", swatch: "#f7f3ea" },
  { id: "rose", label: "Rose", swatch: "#fbf6f6" },
  { id: "sage", label: "Sage", swatch: "#f4f7f3" },
  { id: "lavender", label: "Lavender", swatch: "#f7f6fb" },
  { id: "slate", label: "Slate", swatch: "#eef1f4" },
];

const open = ref(false);
const corners = ref("square");
const width = ref("default");
const accent = ref("oxblood");
const bgDark = ref("default");
const bgLight = ref("default");
const heading = ref("default");
const text = ref("default");
const root = ref<HTMLElement | null>(null);

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage. The choice still applies to this page
    // view, it just will not survive a reload.
  }
}

function set(attr: string, key: string, target: { value: string }, value: string) {
  target.value = value;
  document.documentElement.setAttribute(attr, value);
  persist(key, value);
}

const setCorners = (v: string) => set("data-mh-corners", KEYS.corners, corners, v);
const setWidth = (v: string) => set("data-mh-width", KEYS.width, width, v);
const setAccent = (v: string) => set("data-mh-accent", KEYS.accent, accent, v);
const setBgDark = (v: string) => set("data-mh-bg-dark", KEYS.bgDark, bgDark, v);
const setBgLight = (v: string) => set("data-mh-bg-light", KEYS.bgLight, bgLight, v);
const setHeading = (v: string) => set("data-mh-heading", KEYS.heading, heading, v);
const setText = (v: string) => set("data-mh-text", KEYS.text, text, v);

function onPointerDown(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = false;
}

/*
 * Closes on the way out, the way the nav menus do.
 *
 * Focus inside the panel keeps it open: someone tabbing through the swatches
 * has no pointer in there, and a stray mouse movement should not yank the
 * panel out from under them. Focus on the button does not count, that is
 * where it lands after a click and is the normal case for closing.
 *
 * mouseleave rather than pointerleave, so a touch does not dismiss it the
 * instant it opens.
 */
function onLeave() {
  const panel = root.value?.querySelector(".mh-prefs-panel");
  if (panel && panel.contains(document.activeElement)) return;
  open.value = false;
}

/*
 * Reads a stored setting, falling back when the value names an option that no
 * longer exists. Without this a stale choice from an older build leaves every
 * swatch in the row unselected, so the panel looks like nothing is set.
 */
function restore(attr: string, key: string, ids: string[], fallback: string) {
  const el = document.documentElement;
  const raw = el.getAttribute(attr) || fallback;
  const value = ids.includes(raw) ? raw : fallback;
  if (value !== raw) {
    el.setAttribute(attr, value);
    persist(key, value);
  }
  return value;
}

onMounted(() => {
  const ids = (list: { id: string }[]) => list.map((o) => o.id);
  corners.value = restore("data-mh-corners", KEYS.corners, ["square", "rounded"], "square");
  width.value = restore("data-mh-width", KEYS.width, ["default", "wide"], "default");
  accent.value = restore("data-mh-accent", KEYS.accent, ids(accents), "oxblood");
  bgDark.value = restore("data-mh-bg-dark", KEYS.bgDark, ids(darkBackgrounds), "default");
  bgLight.value = restore("data-mh-bg-light", KEYS.bgLight, ids(lightBackgrounds), "default");
  heading.value = restore("data-mh-heading", KEYS.heading, ids(textRoles), "default");
  text.value = restore("data-mh-text", KEYS.text, ids(textRoles), "default");
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div ref="root" class="mh-prefs" :class="{ 'is-open': open }" @mouseleave="onLeave">
    <button
      type="button"
      class="mh-prefs-button"
      :class="{ 'is-open': open }"
      aria-label="Customization"
      :aria-expanded="open"
      @click="open = !open"
    >
      <!-- Sliders: this adjusts things, it is not a second theme toggle. -->
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M3.75 7.5h7.5M16.5 7.5h3.75M3.75 16.5h3.75M12.75 16.5h7.5" />
        <circle cx="13.5" cy="7.5" r="2.4" />
        <circle cx="10" cy="16.5" r="2.4" />
      </svg>
    </button>

    <div v-show="open" class="mh-prefs-panel" role="group" aria-label="Customization">
      <p class="mh-prefs-label">Corners</p>
      <div class="mh-prefs-row">
        <button
          type="button"
          class="mh-prefs-choice"
          :class="{ 'is-on': corners === 'square' }"
          :aria-pressed="corners === 'square'"
          @click="setCorners('square')"
        >
          Square
        </button>
        <button
          type="button"
          class="mh-prefs-choice"
          :class="{ 'is-on': corners === 'rounded' }"
          :aria-pressed="corners === 'rounded'"
          @click="setCorners('rounded')"
        >
          Rounded
        </button>
      </div>

      <p class="mh-prefs-label">Width</p>
      <div class="mh-prefs-row">
        <button
          type="button"
          class="mh-prefs-choice"
          :class="{ 'is-on': width === 'default' }"
          :aria-pressed="width === 'default'"
          @click="setWidth('default')"
        >
          Default
        </button>
        <button
          type="button"
          class="mh-prefs-choice"
          :class="{ 'is-on': width === 'wide' }"
          :aria-pressed="width === 'wide'"
          @click="setWidth('wide')"
        >
          Wide
        </button>
      </div>

      <p class="mh-prefs-label">Accent</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in accents"
          :key="option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': accent === option.id }"
          :style="{ '--swatch': option.swatch }"
          :aria-label="option.label"
          :title="option.label"
          :aria-pressed="accent === option.id"
          @click="setAccent(option.id)"
        />
      </div>

      <p class="mh-prefs-label">Headings</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in textRoles"
          :key="'h-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': heading === option.id }"
          :style="{ '--swatch': option.swatch }"
          :aria-label="option.label + ' heading text'"
          :title="option.label"
          :aria-pressed="heading === option.id"
          @click="setHeading(option.id)"
        />
      </div>

      <p class="mh-prefs-label">Body text</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in textRoles"
          :key="'t-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': text === option.id }"
          :style="{ '--swatch': option.swatch }"
          :aria-label="option.label + ' body text'"
          :title="option.label"
          :aria-pressed="text === option.id"
          @click="setText(option.id)"
        />
      </div>

      <p class="mh-prefs-label">Dark theme</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in darkBackgrounds"
          :key="'d-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': bgDark === option.id }"
          :style="{ '--swatch': option.swatch }"
          :aria-label="option.label + ' background for the dark theme'"
          :title="option.label"
          :aria-pressed="bgDark === option.id"
          @click="setBgDark(option.id)"
        />
      </div>

      <p class="mh-prefs-label">White theme</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in lightBackgrounds"
          :key="'l-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': bgLight === option.id }"
          :style="{ '--swatch': option.swatch }"
          :aria-label="option.label + ' background for the white theme'"
          :title="option.label"
          :aria-pressed="bgLight === option.id"
          @click="setBgLight(option.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mh-prefs {
  --mh-panel-w: 272px;
  position: relative;
  display: flex;
  align-items: center;
  /* Stretched to the full height of the bar so the panel can be offset from
     the bar's bottom edge rather than from the middle of a 28px button. */
  align-self: stretch;
  margin-inline-start: 8px;
}

/*
 * Bridges the 6px between the bar and the panel. Without it the pointer
 * crosses ground belonging to neither and counts as having left, so the panel
 * shuts on the way to it.
 *
 * It lives on the container rather than the panel because the panel is a
 * scroll container, and overflow: auto clips a pseudo element sitting above
 * its box. Only while open, otherwise an invisible strip would sit over the
 * page swallowing clicks.
 */
.mh-prefs.is-open::after {
  content: "";
  position: absolute;
  top: 100%;
  inset-inline-end: 0;
  width: var(--mh-panel-w);
  height: 6px;
}

.mh-prefs-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.mh-prefs-button:hover,
.mh-prefs-button.is-open {
  color: var(--vp-c-text-1);
}

.mh-prefs-panel {
  --mh-swatch-pad: rgba(0, 0, 0, 0.16);
  position: absolute;
  /* 100% is the bar, +1px clears the divider under it, +5px is the gap. */
  top: calc(100% + 1px + 5px);
  inset-inline-end: 0;
  z-index: 100;
  /* 8 swatches at 21px plus 7 gaps of 8px need 224px. The extra allows for
     the scrollbar that appears when the panel is taller than the window;
     without it the rows wrap, which makes the panel taller still. */
  width: var(--mh-panel-w);
  scrollbar-gutter: stable;
  max-height: calc(100vh - var(--vp-nav-height) - 24px);
  overflow-y: auto;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--mh-r);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

/* Matches .VPMenuGroup .title in the nav dropdowns: 14px, 600, text-2. */
.dark .mh-prefs-panel {
  --mh-swatch-pad: rgba(0, 0, 0, 0.55);
}

.mh-prefs-label {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.mh-prefs-row {
  display: flex;
  gap: 6px;
}

.mh-prefs-row + .mh-prefs-label {
  margin-top: 18px;
}

.mh-prefs-choice {
  flex: 1;
  padding: 6px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--mh-r-sm);
  font-size: 12px;
  color: var(--vp-c-text-2);
  transition:
    border-color 0.16s ease,
    color 0.16s ease;
}

.mh-prefs-choice:hover {
  color: var(--vp-c-text-1);
}

.mh-prefs-choice.is-on {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.mh-prefs-swatches {
  gap: 8px;
  flex-wrap: wrap;
}

.mh-prefs-swatch {
  width: 21px;
  height: 21px;
  border: 1px solid var(--vp-c-divider);
  /* Fixed on purpose: swatches stay rounded squares whatever the corner
     setting is, so the row reads as a palette rather than restating it. */
  border-radius: 4px;
  background-color: var(--swatch);
  transition:
    box-shadow 0.16s ease,
    transform 0.16s ease;
}

.mh-prefs-swatch:hover {
  transform: translateY(-1px);
}

/*
 * Selection is a darker pad behind the chip rather than a ring around it. A
 * ring has to contrast with both the panel and the swatch, which is not
 * possible for pale swatches; a pad only has to be darker than the panel, so
 * it holds for every colour in the row.
 */
.mh-prefs-swatch.is-on {
  box-shadow: 0 0 0 4px var(--mh-swatch-pad);
}

.mh-prefs-button:focus-visible,
.mh-prefs-choice:focus-visible,
.mh-prefs-swatch:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .mh-prefs-swatch:hover {
    transform: none;
  }
}

/* The nav bar collapses into the hamburger screen below this. */
@media (max-width: 767px) {
  .mh-prefs {
    display: none;
  }
}
</style>
