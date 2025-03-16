<template>
  <div>
    <h3 class="fs-4">HW Accelerator of Neural Networks</h3>
    <div class="algorithm">
    <img src="/resnet_alg2.svg" alt="ResNet Algorithm" />
    </div>
  </div>
</template>

<script setup lang="ts">

import { defineProps, defineComponent } from 'vue';
const props = defineProps({
  /*scale: {
    type: Number,
    default: 100,
  },*/
});
</script>

<style scoped>
h3 {
  text-align: center;
}

/* Add any styles you need here */
.algorithm {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  max-width: 100%;
}

.algorithm>img {
  max-width: 100%;
  height: auto;
  overflow-x: auto;
}
</style>