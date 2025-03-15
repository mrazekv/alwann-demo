<template>
    <div class="algorithm">
        <img src="/resnet_alg.svg" alt="ResNet Algorithm" />
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
/* Add any styles you need here */
.algorithm {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    max-width: 100%;    

    
}

.algorithm > img {
      max-width: 100%;
      height: auto;
      overflow-x: auto;
}
</style>