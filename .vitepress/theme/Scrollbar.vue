<script setup lang="ts">
/**
 * Overlay scrollbar for the document.
 *
 * The native bar is hidden in style.css so it stops reserving a gutter and
 * shoving the page sideways. Only the bar is hidden, not the overflow, so the
 * document still scrolls natively: wheel, keyboard, touch, find-in-page, and
 * VitePress's own anchor jumps and outline highlighting all keep working
 * because they are still reading the real document scroll.
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const MIN_THUMB = 32;

const visible = ref(false);
const dragging = ref(false);
const thumbTop = ref(0);
const thumbHeight = ref(0);

let frame = 0;
let observer: ResizeObserver | null = null;
let dragStartY = 0;
let dragStartScroll = 0;

function measure() {
  const doc = document.documentElement;
  const viewport = doc.clientHeight;
  const total = doc.scrollHeight;

  // VitePress locks the page while the search modal or the mobile sidebar is
  // open. Nothing to point at while that is up.
  const locked = getComputedStyle(doc).overflowY === "hidden";

  if (locked || total - viewport <= 1) {
    visible.value = false;
    return;
  }

  const height = Math.max((viewport / total) * viewport, MIN_THUMB);
  const scrollable = total - viewport;
  const travel = viewport - height;

  visible.value = true;
  thumbHeight.value = height;
  thumbTop.value = scrollable > 0 ? (doc.scrollTop / scrollable) * travel : 0;
}

function schedule() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    measure();
  });
}

function onPointerMove(event: PointerEvent) {
  const doc = document.documentElement;
  const viewport = doc.clientHeight;
  const travel = viewport - thumbHeight.value;
  if (travel <= 0) return;

  const scrollable = doc.scrollHeight - viewport;
  const moved = event.clientY - dragStartY;
  doc.scrollTop = dragStartScroll + (moved / travel) * scrollable;
}

function onPointerUp() {
  dragging.value = false;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
}

function onPointerDown(event: PointerEvent) {
  dragging.value = true;
  dragStartY = event.clientY;
  dragStartScroll = document.documentElement.scrollTop;
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  event.preventDefault();
}

onMounted(() => {
  measure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  // Navigating to another route changes the page height without firing either
  // of those, so watch the document itself as well.
  observer = new ResizeObserver(schedule);
  observer.observe(document.body);
});

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame);
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", onPointerUp);
  observer?.disconnect();
});
</script>

<template>
  <div v-show="visible" class="mh-scrollbar" aria-hidden="true">
    <div
      class="mh-scrollbar-thumb"
      :class="{ 'is-dragging': dragging }"
      :style="{
        height: `${thumbHeight}px`,
        transform: `translateY(${thumbTop}px)`,
      }"
      @pointerdown="onPointerDown"
    />
  </div>
</template>
