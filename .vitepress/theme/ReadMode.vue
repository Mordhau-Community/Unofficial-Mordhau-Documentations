<script setup lang="ts">
import { onMounted, ref } from "vue";

/*
 * Read mode strips the page back to the article.
 *
 * The button hangs off the bottom edge of the nav bar. Turn read mode on and
 * the nav is gone, so the button detaches and floats at the top of the window
 * instead: it is the only way back out, so it has to stay reachable.
 *
 * All this component owns is the flag. The layout work lives in style.css,
 * keyed off data-mh-read on <html>, so the nav, both sidebars and the content
 * column all move off a single attribute and cannot fall out of step.
 */

const on = ref(false);

function persist(value: boolean) {
  try {
    localStorage.setItem("mh-read", value ? "on" : "off");
  } catch {
    // Private mode or blocked storage. The choice still applies to this page
    // view, it just will not survive a reload.
  }
}

function toggle() {
  on.value = !on.value;
  document.documentElement.setAttribute(
    "data-mh-read",
    on.value ? "on" : "off"
  );
  persist(on.value);
}

onMounted(() => {
  // The pre-paint script in config.mts has already stamped the attribute from
  // storage, so read the state back off the document rather than going to
  // storage a second time. That way the button can never disagree with what
  // is actually on screen.
  on.value = document.documentElement.getAttribute("data-mh-read") === "on";
});
</script>

<template>
  <!--
    A full width dock with the button centred inside it, rather than a centred
    button. Centring with translateX would put a literal number in a transform,
    which postcss-rtl mirrors; flex centring is direction agnostic and needs no
    guarding.
  -->
  <div class="mh-read-dock" :class="{ 'is-on': on }">
    <button
      type="button"
      class="mh-read"
      :class="{ 'is-on': on }"
      :aria-pressed="on"
      :title="
        on
          ? 'Bring the navigation and sidebars back'
          : 'Hide the navigation and sidebars'
      "
      @click="toggle"
    >
      <svg
        class="mh-read-icon"
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 7.2v11.6" />
        <path
          d="M12 7.2C10.4 5.9 8.3 5.4 5.4 5.7a.9.9 0 0 0-.8.9v9.9a.9.9 0 0 0 1 .9c2.5-.3 4.5.2 6.4 1.4"
        />
        <path
          d="M12 7.2c1.6-1.3 3.7-1.8 6.6-1.5a.9.9 0 0 1 .8.9v9.9a.9.9 0 0 1-1 .9c-2.5-.3-4.5.2-6.4 1.4"
        />
      </svg>
      <span class="mh-read-label">Read Mode</span>
    </button>
  </div>
</template>

<style scoped>
.mh-read-dock {
  position: fixed;
  /*
   * Where the dock sits is worked out in style.css, because it depends on what
   * VitePress has pinned at the top of the window at that width. The button's
   * own top border is transparent and lands on that line, which is why there
   * is no seam and no 1px jump later when the border becomes visible.
   */
  top: var(--mh-dock-top, var(--vp-nav-height));
  left: 0;
  right: 0;
  /* Over the nav (30) and over the desktop sidebar (25), under the mobile
     drawer and its backdrop so an open menu still covers it. */
  z-index: 35;
  display: flex;
  justify-content: center;
  pointer-events: none;
  /* Shared with the layout so the button and the furniture it hangs from
     always move together. */
  transition: top var(--mh-read-ease);
}

.mh-read {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 29px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-top-color: transparent;
  border-radius: 0 0 var(--mh-r-sm) var(--mh-r-sm);
  background-color: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: color 0.25s, background-color 0.25s, border-color 0.25s,
    border-radius 0.25s, box-shadow 0.25s;
}

/* Deliberately no border change on hover: the top border is transparent while
   the button is docked, and a shorthand here would light it up. */
.mh-read:hover {
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
}

.mh-read:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.mh-read.is-on {
  border-top-color: var(--vp-c-divider);
  border-radius: var(--mh-r-sm);
  box-shadow: var(--vp-shadow-2);
}

/* The one bit of colour. Enough to read as on without turning a page that is
   meant to be free of distractions into a billboard. */
.mh-read.is-on .mh-read-icon {
  color: var(--vp-c-brand-1);
}

@media (prefers-reduced-motion: reduce) {
  .mh-read-dock,
  .mh-read {
    transition: none;
  }
}
</style>
