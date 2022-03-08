<template>
  <div class="sidebar">
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import { store, mutations } from "@/store.js";

export default {
  methods: {
    closeSidebarPanel: mutations.toggleNav,
  },
  computed: {
    isPanelOpen() {
      return store.isNavOpen;
    },
  },
};
</script>
<style>

.sidebar-panel {
  overflow-y: auto;
  background-color: #fff;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 20px;
  width: 180px;
}
</style>
