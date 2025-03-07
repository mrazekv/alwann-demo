<template>
  <span class="header__logo">
    <span
      class="icon-svg"
      :style="{
        width: `${(313 * scale) / 100}px`,
        height: `${(110 * scale) / 100}px`,
      }"
    >
      <svg class="icon-svg__svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <use
          xlink:href="/icons-svg.svg#icon-logo"
          x="0"
          y="0"
          width="100%"
          height="100%"
        ></use>
      </svg>
    </span>
  </span>
</template>  

<script setup lang="ts">
import { defineProps, defineComponent } from 'vue';

const props = defineProps({
  scale: {
    type: Number,
    default: 100,
  },
});

</script>

<style scoped>
.header__logo .icon-svg--logo {
  width: 313px;
  height: 110px;
}

.icon-svg {
  display: inline-block;
  vertical-align: middle;
  position: relative;
}

.icon-svg__svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: currentColor;
  pointer-events: none;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.icon-svg:before {
  content: "";
  display: block;
}
</style>