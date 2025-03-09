<template>
    <div ref="qrcode"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue';
import { QRCode, QRErrorCorrectLevel } from 'ts-qrcode/src/QRCode';

const props = defineProps({
    qrtext: {
        type: String,
        required: true
    }
});

const qrcode = ref();

onMounted(() => {
    const options = {
        width: 74,
        height: 74,
        correctLevel: QRErrorCorrectLevel.H,
        background: "#ffffff",
        foreground: "#000000",
        text: props.qrtext
    };
    qrcode.value.appendChild(QRCode.createCanvas(options))
});
</script>

<style lang="css" scoped>
div {
    width: 74px;
    height: 74px;
    position: relative;
    top: -16px;
}
</style>