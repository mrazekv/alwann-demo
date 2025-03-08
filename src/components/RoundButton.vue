<template>
    <button @click="togglePlayPause" :class="{ 'playing': isPlaying }" class="round-button">
        <span v-if="isPlaying">

            <svg height="24px" width="24px" style="fill: white" version="1.1" viewBox="0 0 512 512" xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g>
                    <path
                        d="M224,435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6   C218.6,448,224,442.6,224,435.8z" />
                    <path
                        d="M371.8,64h-71.6c-6.7,0-12.2,5.4-12.2,12.1v359.7c0,6.7,5.4,12.2,12.2,12.2h71.6c6.7,0,12.2-5.4,12.2-12.2V76.1   C384,69.4,378.6,64,371.8,64z" />
                </g>
            </svg>
        </span>
        <span v-else>
            <svg height="30px" width="30px" style="fill: white" version="1.1" viewBox="0 0 96 96" xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path
                    d="M71.8,43.5L30.6,21.8c-1.9-1-4.2-0.9-6,0.2c-1.6,1-2.6,2.7-2.6,4.5v41.3c0,1.8,1,3.5,2.6,4.5c1,0.6,2.1,0.9,3.2,0.9   c1,0,2-0.2,2.8-0.7l41.2-21.7c1.3-0.7,2.2-2.1,2.2-3.6C74,45.6,73.2,44.2,71.8,43.5z" />
            </svg>
        </span>



    </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const isPlaying = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
});

function togglePlayPause() {
    isPlaying.value = !isPlaying.value;
}
</script>

<style scoped>
.round-button {
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 16px;
}

.round-button.playing {
    background-color: #a0a0a0;
}
</style>
