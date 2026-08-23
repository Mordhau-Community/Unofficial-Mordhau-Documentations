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
  bgDark: "mh-bg-dark",
  bgLight: "mh-bg-light",
};

const accents = [
  { id: "oxblood", label: "Oxblood", swatch: "#a32a38" },
  { id: "steel", label: "Steel", swatch: "#2f6f8f" },
  { id: "brass", label: "Brass", swatch: "#8a6a1f" },
  { id: "moss", label: "Moss", swatch: "#3f6b3a" },
  { id: "iron", label: "Iron", swatch: "#4a4f57" },
];

/** Swatches are painted in the page colour each preset produces. */
const darkBackgrounds = [
  { id: "default", label: "Default", swatch: "#1b1b1f" },
  { id: "black", label: "Black", swatch: "#0e0e10" },
  { id: "slate", label: "Slate", swatch: "#15181e" },
  { id: "warm", label: "Warm", swatch: "#1c1a18" },
];

const lightBackgrounds = [
  { id: "default", label: "Default", swatch: "#ffffff" },
  { id: "paper", label: "Paper", swatch: "#faf9f6" },
  { id: "mist", label: "Mist", swatch: "#f7f8fa" },
  { id: "sand", label: "Sand", swatch: "#f8f5ef" },
];

const open = ref(false);
const corners = ref("square");
const accent = ref("oxblood");
const bgDark = ref("default");
const bgLight = ref("default");
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
const setAccent = (v: string) => set("data-mh-accent", KEYS.accent, accent, v);
const setBgDark = (v: string) => set("data-mh-bg-dark", KEYS.bgDark, bgDark, v);
const setBgLight = (v: string) => set("data-mh-bg-light", KEYS.bgLight, bgLight, v);

function onPointerDown(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = false;
}

onMounted(() => {
  const el = document.documentElement;
  corners.value = el.getAttribute("data-mh-corners") || "square";
  accent.value = el.getAttribute("data-mh-accent") || "oxblood";
  bgDark.value = el.getAttribute("data-mh-bg-dark") || "default";
  bgLight.value = el.getAttribute("data-mh-bg-light") || "default";
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", onPointerDown);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div ref="root" class="mh-prefs">
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
  position: relative;
  display: flex;
  align-items: center;
  margin-inline-start: 8px;
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
  position: absolute;
  top: calc(100% + 12px);
  inset-inline-end: 0;
  z-index: 100;
  width: 224px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--mh-r);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

/* Matches .VPMenuGroup .title in the nav dropdowns: 14px, 600, text-2. */
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
}

.mh-prefs-swatch {
  width: 24px;
  height: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--mh-r-sm);
  background-color: var(--swatch);
  transition:
    outline-color 0.16s ease,
    transform 0.16s ease;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.mh-prefs-swatch:hover {
  transform: translateY(-1px);
}

.mh-prefs-swatch.is-on {
  outline-color: var(--vp-c-text-1);
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
