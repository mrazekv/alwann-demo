<template>
    <div>
        <svg version="1.1" :viewBox="viewbox" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="Arrow2Send-2" overflow="visible" orient="auto">
                    <path transform="matrix(-.3 0 0 -.3 .69 0)"
                        d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                        fill="context-stroke" fill-rule="evenodd" stroke="context-stroke" stroke-linejoin="round"
                        stroke-width=".625" />
                </marker>
                <marker id="Arrow2Send-6-9" overflow="visible" orient="auto">
                    <path transform="matrix(-.3 0 0 -.3 .69 0)"
                        d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                        fill="context-stroke" fill-rule="evenodd" stroke="context-stroke" stroke-linejoin="round"
                        stroke-width=".625" />
                </marker>
                <marker id="Arrow2Send-5-8" overflow="visible" orient="auto">
                    <path transform="matrix(-.3 0 0 -.3 .69 0)"
                        d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                        fill="context-stroke" fill-rule="evenodd" stroke="context-stroke" stroke-linejoin="round"
                        stroke-width=".625" />
                </marker>
            </defs>

            <!-- block -->

            <g v-for="(item, index) in items" :key="index" :transform="`translate(${item.x}, ${item.y})`">
                <g>
                    <rect x="35.269" y="27.256" width="5.8795" height="20.158" :fill="item.fill" stroke="#000"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <rect x="43.483" y="27.256" width="5.8795" height="20.158" :fill="item.fill" stroke="#000"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <g fill="none" stroke="#000" stroke-width=".26458px">
                        <path d="m41.149 37.476h1.8228" marker-end="url(#Arrow2Send-2)" />
                        <path d="m49.311 37.476h1.8228" :marker-end="item.r ? 'url(#Arrow2Send-6-9)' : ''" />
                        <path d="m33.038 37.476h1.8228" marker-end="url(#Arrow2Send-5-8)" />
                        <path d="m34.17 37.476v-12.947h15.919v12.888" />
                    </g>
                    <path d="m42.12 23.949 0.59549 0.5932-0.59549 0.6247z" />
                    <g font-family="'Arial'" font-size="2.4694px" stroke-width=".26458">
                        <text x="42.387383" y="22.450239" style="line-height:1.25" xml:space="preserve">
                            <tspan x="42.387383" y="22.450239" font-size="2.4694px" stroke-width=".26458"
                                text-align="center" text-anchor="middle">{{ item.name }}</tspan>
                        </text>
                        <text transform="rotate(-90)" x="-37.549553" y="38.982327" fill="#4d4d4d"
                            style="line-height:1.25" xml:space="preserve">
                            <tspan x="-37.549553" y="38.982327" fill="#4d4d4d" font-size="2.4694px"
                                stroke-width=".26458" text-align="center" text-anchor="middle">{{ item.box1 }}</tspan>
                        </text>
                        <text transform="rotate(-90)" x="-37.577667" y="47.033211" fill="#4d4d4d"
                            style="line-height:1.25" xml:space="preserve">
                            <tspan x="-37.577667" y="47.033211" fill="#4d4d4d" font-size="2.4694px"
                                stroke-width=".26458" text-align="center" text-anchor="middle">{{ item.box2 }}</tspan>
                        </text>
                    </g>
                </g>
            </g>

            <!-- legend -->
            <g v-for="(item, index) in legend" :key="index" :transform="`translate(${item.x}, ${item.y})`"
                stroke-width=".26458">
                <rect x="35.305" y="50.342" width="5.7115" height="5.2916" :fill="item.fill" stroke="#000"
                    stroke-linecap="round" stroke-miterlimit="10" />
                <text x="43.714394" y="53.558167" font-family="'Arial'" font-size="2.4694px" style="line-height:1.25"
                    xml:space="preserve">
                    <tspan x="43.714394" y="53.558167" font-size="2.4694px" stroke-width=".26458">{{ item.name }}
                    </tspan>
                </text>
            </g>
        
            <text x="5" y="36" font-family="'Arial'" font-size="2.4694px" xml:space="preserve" style="line-height: 1.25;"><tspan font-size="2.4694px" stroke-width=".26458" style="font-weight:bold">Tiles: </tspan></text>

        </svg>
    </div>
</template>

<script setup lang="ts">

import { ref, defineProps, watchEffect } from 'vue';

const props = defineProps({
    size: {
        type: Number,
        default: 8,
    },
    assignment: {
        type: Object,
        default: {layers:[], tiles:[]},
    },
});

let items = ref({});
let legend = ref([]);
let viewbox = ref([0, 0, 10, 1].join(' '));
let colors = ['#d1dff2', '#fdeedb', '#e6ecca', '#f1dff2'];

let updateSvg = () => {
    items.value = [];
    legend.value = [];

   
    for (let i = 0; i < props.size; i++) {
        var el = (i < props.assignment.layers.length) ? props.assignment.layers[i] : { mul_index: i % colors.length };

        items.value.push({
            x: -30 + 16.5 * i,
            y: -20,
            name: `Conv2D-${i + 1}`,
            box1: '1x1, 128',
            box2: '3x3, 128',
            fill: colors[el.mul_index % colors.length],
            r: i == (props.size - 1)
        });

      
        /*


        if (legend.value.findIndex((x) => x.mul == el.mul) == -1) {
            legend.value.push({
                x: -30 + 40 * legend.value.length,
                y: -18,
                name: `multiplier ${el.mul}`,
                fill: colors[el.mul_index % colors.length],
                mul: el.mul
            });
        } */
    }

    props.assignment.tiles.map((t, i) => {
        legend.value.push({
            x: -30 + 10 + 30 * i,
            y: -18,
            name: t,
            fill: colors[i % colors.length],
        });
    });

    console.log(legend.value);
    viewbox.value = [0, 0, 15 + 16.5 * items.value.length, 30 + 10].join(' ');
};

watchEffect(() => {
    console.log('size', props.size);
    updateSvg();
});

updateSvg();
</script>

<style lang="scss" scoped>
div {
    /* enable scrolling */
    width: 100%;
    overflow-x: auto;
    /* border: solid 1px red; */
    background-color: #f0f0f0;
    padding: 20px;
    padding-top: 30px;
}
svg {
    /* background-color: #f0f0f0; */
    display:block;
    margin-left: auto;
    margin-right:auto;
    height: 190px;
    /*max-height:200px;*/
}
</style>
