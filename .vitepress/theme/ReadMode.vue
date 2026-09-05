<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { landingCopies, normalizeLandingLocale } from "./landing-locales";

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

const { frontmatter, lang, page } = useData();

/*
 * The button's three strings, in the language of the page. They live with the
 * rest of the theme's copy in landing-locales.ts, which is where the release
 * banner reads its own from.
 *
 * The label's width matters as well as its text: the nav bar's underline is
 * notched to exactly the button's width, and the notch is measured from the
 * rendered element rather than assumed, so a longer word in another language
 * widens the notch to match without anything here knowing about it.
 */
const copy = computed(() => landingCopies[normalizeLandingLocale(lang.value)]);

/*
 * Documentation pages only. A landing page has no sidebar and no outline for
 * read mode to clear away, and dropping the button there while the flag was
 * still set would strand a reader on a page with no nav and nothing to press
 * to bring it back.
 *
 * Written as an allow list rather than a list of exclusions, so a layout added
 * later is left out by default instead of quietly inheriting this.
 */
const isDoc = computed(() => {
  const layout = frontmatter.value.layout;
  return !page.value.isNotFound && (layout === undefined || layout === "doc");
});

// What the reader chose. It outlives any one page.
const pref = ref(false);

// What this page actually shows: that choice, but only where it means
// something.
const on = computed(() => pref.value && isDoc.value);

function persist(value: boolean) {
  try {
    localStorage.setItem("mh-read", value ? "on" : "off");
  } catch {
    // Private mode or blocked storage. The choice still applies to this page
    // view, it just will not survive a reload.
  }
}

function apply(value: boolean) {
  document.documentElement.setAttribute("data-mh-read", value ? "on" : "off");
}

function toggle() {
  pref.value = !pref.value;
  persist(pref.value);
}

const root = ref<HTMLElement | null>(null);

/*
 * The bar's underline is notched to let the button hang off it seamlessly, and
 * the notch has to be exactly as wide as the button. That width depends on the
 * label, the font and the locale, so it is measured rather than assumed and
 * published for the stylesheet to read.
 *
 * Off the rect, not off offsetWidth, because offsetWidth is rounded to a whole
 * pixel and a button is rarely a whole number of pixels wide. The notch is cut
 * symmetrically about the centre, so every rounding error is halved and then
 * applied to both shoulders at once: at 107.313px published as 107, the two
 * segments each ran 0.16px further onto the Arabic button than the design's
 * one pixel, which is a hair of extra line at both corners; at 125.547px
 * published as 126 the Japanese one fell 0.23px short and left a hair of gap
 * instead. Neither is wrong enough to name, and both are visible once you
 * know to look.
 *
 * With the true width published the arithmetic closes: the button is centred,
 * so its near edge sits at (bar - width) / 2, and a segment of
 * 50% - width / 2 + 1px ends exactly one pixel past it, in every language.
 */
function measure() {
  const button = root.value?.querySelector(".mh-read") as HTMLElement | null;
  if (!button) return;
  document.documentElement.style.setProperty(
    "--mh-read-w",
    button.getBoundingClientRect().width + "px"
  );
}

/*
 * Watched, rather than measured at the few moments it seemed likely to change.
 *
 * The width used to be taken on mount, once more when the display face
 * finished loading, and on every window resize. Those are three of the
 * occasions the button changes width and not all of them: switching language
 * is another, and VitePress switches language without unmounting anything, so
 * the label became Режим чтения or 阅读模式 while the published width stayed
 * at whatever the locale before it had measured. The notch was then cut for
 * the wrong word — 20px too narrow going from English to Russian, 17px too
 * wide going to Chinese — and the underline either ran over the button's
 * shoulders or stopped short of them with a gap at each corner.
 *
 * One observer on the button covers every cause at once, including the three
 * the listeners covered and the ones they did not: a browser zoom, a reader's
 * larger default type, a face that swaps in late. It delivers an observation
 * as soon as it starts watching, so there is no first measurement to take by
 * hand either.
 */
let observer: ResizeObserver | undefined;

onMounted(() => {
  // The pre-paint script in config.mts has already stamped the attribute from
  // storage, so read the choice back off the document rather than going to
  // storage a second time. Whether this particular page honours it is then up
  // to the computed above.
  pref.value = document.documentElement.getAttribute("data-mh-read") === "on";
  apply(on.value);

  const button = root.value?.querySelector(".mh-read");
  if (button) {
    observer = new ResizeObserver(measure);
    observer.observe(button);
  }
});

onUnmounted(() => observer?.disconnect());

// Covers pressing the button and walking onto a page where read mode does not
// apply, which is the same thing as far as the document is concerned.
watch(on, apply);
</script>

<template>
  <!--
    A full width dock with the button centred inside it, rather than a centred
    button. Centring with translateX would put a literal number in a transform,
    which postcss-rtl mirrors; flex centring is direction agnostic and needs no
    guarding.
  -->
  <div v-if="isDoc" ref="root" class="mh-read-dock" :class="{ 'is-on': on }">
    <button
      type="button"
      class="mh-read"
      :class="{ 'is-on': on }"
      :aria-pressed="on"
      draggable="false"
      @dragstart.prevent
      :title="on ? copy.readModeShow : copy.readModeHide"
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
      <span class="mh-read-label">{{ copy.readMode }}</span>
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
  /*
   * Under both bars, over the article.
   *
   * The nav is a stacking context of its own at 30, so anything it opens, a
   * dropdown or the appearance panel, is trapped inside it and cannot climb
   * over a button sitting above 30. At 35 the button painted straight through
   * an open nav menu. One below the sticky utility bar puts it under
   * everything pinned at the top and still well clear of the article, where
   * the highest thing VitePress uses is the outline curtain at 10.
   *
   * It also matters below 960px, where the button scrolls with the page: it
   * has to pass behind that bar rather than over it.
   */
  z-index: calc(var(--vp-z-index-local-nav) - 1);
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
  /*
   * No line along the top at all. The button is flush against the underside of
   * the bar and the bar's own underline is notched to make room for it, so
   * there is nothing to draw there: the two surfaces meet and the button reads
   * as a tab of the bar rather than a box parked underneath it.
   */
  border-top: 0;
  border-radius: 0 0 var(--mh-r-sm) var(--mh-r-sm);
  /*
   * The nav bar's own background token, at full strength rather than frosted.
   *
   * Frosting was the obvious way to match the bar and it did match it
   * declaration for declaration, but a backdrop-filter takes its colour from
   * whatever happens to be behind it. The bar has the page ground behind it
   * while the button hangs over the article, so the same glass sitting over a
   * tip block came out visibly lighter than the bar directly above it. Opaque
   * is the only way the two read as one surface wherever the button lands.
   *
   * --vp-nav-bg-color is var(--vp-c-bg), which every background preset
   * redefines, so this still follows the theme along with the bar.
   */
  /* What is left where backdrop-filter is unsupported: the bar's flat colour. */
  background-color: var(--vp-nav-bg-color);
  /* A control, not content: no text selection, no drag, no tap flash. */
  -webkit-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
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

/*
 * Hover lifts the text and nothing else, which is what the nav bar links
 * already do. Tinting the background instead would either fight the frosting
 * or, with one of the translucent soft tokens, make the button look less solid
 * the moment it is pointed at.
 *
 * No border change either: the top border is transparent while the button is
 * docked, and a shorthand here would light it up.
 */
.mh-read:hover {
  color: var(--vp-c-text-1);
}

/*
 * The bar's frosted surface, off the same token and the same blur, so the two
 * match in every theme and follow the background presets together.
 */
@supports (
  (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
) {
  .mh-read {
    background-color: var(--mh-nav-glass);
    -webkit-backdrop-filter: blur(14px) saturate(180%);
    backdrop-filter: blur(14px) saturate(180%);
  }
}

.mh-read:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/*
 * In read mode it sits against the top of the window, so it keeps exactly the
 * shape it has when docked: open along the top, square at the top corners,
 * rounded only at the bottom. All it gains is a shadow, to lift it off the
 * article it is now sitting over.
 */
.mh-read.is-on {
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
