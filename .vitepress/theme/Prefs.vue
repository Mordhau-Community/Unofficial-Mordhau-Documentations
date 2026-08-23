<script setup lang="ts">
/**
 * Corner and accent picker, mounted beside the appearance switch.
 *
 * Both settings live as attributes on <html> and are written to localStorage.
 * The inline script in config.mts reads them back and stamps them before the
 * first paint, so nothing flashes the wrong shape or colour on load.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const CORNERS_KEY = "mh-corners";
const ACCENT_KEY = "mh-accent";

const accents = [
  { id: "oxblood", label: "Oxblood", swatch: "#a32a38" },
  { id: "steel", label: "Steel", swatch: "#2f6f8f" },
  { id: "brass", label: "Brass", swatch: "#8a6a1f" },
  { id: "moss", label: "Moss", swatch: "#3f6b3a" },
  { id: "iron", label: "Iron", swatch: "#4a4f57" },
];

const open = ref(false);
const corners = ref("square");
const accent = ref("oxblood");
const root = ref<HTMLElement | null>(null);

function persist(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode or blocked storage. The choice still applies for this
    // page view, it just will not survive a reload.
  }
}

function setCorners(value: string) {
  corners.value = value;
  document.documentElement.setAttribute("data-mh-corners", value);
  persist(CORNERS_KEY, value);
}

function setAccent(value: string) {
  accent.value = value;
  document.documentElement.setAttribute("data-mh-accent", value);
  persist(ACCENT_KEY, value);
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
  accent.value = el.getAttribute("data-mh-accent") || "oxblood";
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
      aria-label="Appearance settings"
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

    <div v-show="open" class="mh-prefs-panel" role="group" aria-label="Appearance settings">
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
  width: 208px;
  padding: 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: var(--mh-r);
  background-color: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-3);
}

.mh-prefs-label {
  margin: 0 0 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.mh-prefs-row {
  display: flex;
  gap: 6px;
}

.mh-prefs-row + .mh-prefs-label {
  margin-top: 16px;
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
