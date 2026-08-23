<script setup lang="ts">
/**
 * Corner and accent picker, mounted beside the appearance switch.
 *
 * Accent is stored per theme, so a colour that reads well on white and one
 * that reads well on near black can be picked independently. Everything lives
 * as attributes on <html> and in localStorage; the inline script in config.mts
 * stamps them before the first paint so nothing flashes on load.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const KEYS = {
  corners: "mh-corners",
  dark: "mh-accent-dark",
  light: "mh-accent-light",
};

/** Swatches show the value each accent actually resolves to in that theme. */
const accents = [
  { id: "oxblood", label: "Oxblood", light: "#a32a38", dark: "#ec949b" },
  { id: "steel", label: "Steel", light: "#2f6f8f", dark: "#8fc4de" },
  { id: "brass", label: "Brass", light: "#8a6a1f", dark: "#dfc07a" },
  { id: "moss", label: "Moss", light: "#3f6b3a", dark: "#9dc79a" },
  { id: "iron", label: "Iron", light: "#4a4f57", dark: "#b9bfc8" },
];

const open = ref(false);
const corners = ref("square");
const accentDark = ref("oxblood");
const accentLight = ref("oxblood");
const root = ref<HTMLElement | null>(null);

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage. The choice still applies to this page
    // view, it just will not survive a reload.
  }
}

function setCorners(value: string) {
  corners.value = value;
  document.documentElement.setAttribute("data-mh-corners", value);
  persist(KEYS.corners, value);
}

function setAccent(theme: "dark" | "light", value: string) {
  if (theme === "dark") accentDark.value = value;
  else accentLight.value = value;
  document.documentElement.setAttribute(`data-mh-accent-${theme}`, value);
  persist(KEYS[theme], value);
}

function onPointerDown(event: PointerEvent) {
  if (root.value && !root.value.contains(event.target as Node)) open.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") open.value = false;
}

onMounted(() => {
  const el = document.documentElement;
  corners.value = el.getAttribute("data-mh-corners") || "square";
  accentDark.value = el.getAttribute("data-mh-accent-dark") || "oxblood";
  accentLight.value = el.getAttribute("data-mh-accent-light") || "oxblood";
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

      <p class="mh-prefs-label">Dark theme</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in accents"
          :key="'dark-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': accentDark === option.id }"
          :style="{ '--swatch': option.dark }"
          :aria-label="option.label + ' in dark theme'"
          :title="option.label"
          :aria-pressed="accentDark === option.id"
          @click="setAccent('dark', option.id)"
        />
      </div>

      <p class="mh-prefs-label">White theme</p>
      <div class="mh-prefs-row mh-prefs-swatches">
        <button
          v-for="option in accents"
          :key="'light-' + option.id"
          type="button"
          class="mh-prefs-swatch"
          :class="{ 'is-on': accentLight === option.id }"
          :style="{ '--swatch': option.light }"
          :aria-label="option.label + ' in white theme'"
          :title="option.label"
          :aria-pressed="accentLight === option.id"
          @click="setAccent('light', option.id)"
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
