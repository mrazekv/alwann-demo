<template>
    <div>
        <svg version="1.1" :viewBox="viewbox" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="Arrow2Send" overflow="visible" orient="auto">
                    <path transform="matrix(-.3 0 0 -.3 .69 0)"
                        d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                        fill="context-stroke" fill-rule="evenodd" stroke="context-stroke" stroke-linejoin="round"
                        stroke-width=".625" />
                </marker>
                <pattern id="hatch" patternUnits="userSpaceOnUse" width="2" height="2">
                 <path d="M-0.5,0.5 l1,-1 M0,2 l2,-2 M1.5,2.5 l1,-1" style="stroke:black; stroke-width:0.2; opacity:0.5" />
                </pattern>
            </defs>

            <!-- input -->
            <g id="resinp" transform="translate(-30 -20)">
                <g stroke="#000">
                    <rect x="35.269" y="27.256" width="5.8795" height="20.158" fill="#ccc" opacity=".99"
                        stroke-dasharray="0.53, 0.53" stroke-linecap="round" stroke-miterlimit="10"
                        stroke-width=".265" />
                        <rect x="43.483" y="27.256" width="5.8795" :height="items.first.boxh*20.158" :fill="items.first.boxfill" stroke="none" />
                        <!-- <rect x="43.483" y="27.256" width="5.8795" :height="items.first.boxh*20.158" fill="url(#hatch)" stroke="none" /> -->
                        <rect x="43.483" :y="27.256+items.first.boxh*20.158" width="5.8795" :height="(1-items.first.boxh)*20.158" fill="url(#hatch)" stroke="none" />

                    <rect x="43.483" y="27.256" width="5.8795" height="20.158" fill="none" 
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <path d="m41.149 37.476h1.8228" fill="none" marker-end="url(#Arrow2Send)" stroke-width=".26458px" />
                    <path d="m49.311 37.476h1.8228" fill="none" marker-end="url(#Arrow2Send)" stroke-width=".26458px" />
                </g>
                <g font-family="'Arial'" font-size="2.4694px" stroke-width=".26458">
                    <text transform="rotate(-90)" x="-37.385654" y="53.388752" style="line-height:1.25"
                        xml:space="preserve">
                        <tspan x="-37.385654" y="53.388752" fill="#666666" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">MaxPool</tspan>
                    </text>
                    <text transform="rotate(-90)" x="-37.549553" y="38.982327" fill="#4d4d4d" style="line-height:1.25"
                        xml:space="preserve">
                        <tspan x="-37.549553" y="38.982327" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">Image</tspan>
                    </text>
                    <text transform="rotate(-90)" x="-37.577667" y="47.033211" fill="#4d4d4d" style="line-height:1.25"
                        xml:space="preserve">
                        <tspan x="-37.577667" y="47.033211" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">7x7,64</tspan>
                    </text>

                    <text x="46.471874" y="25.287804" style="line-height:1.25" xml:space="preserve">
                        <tspan x="46.471874" y="25.287804" fill="#000000" font-family="Arial" font-size="2.4694px"
                            stroke-width=".26458" text-align="center" text-anchor="middle">{{ items.first.name }}</tspan>
                    </text>

                </g>
            </g>


            <!-- block 2 -->
            <g v-for="(item, index) in items.b2" :key="index" :transform="`translate(${item.x}, ${item.y})`">
                <g>

                    <rect x="35.269" y="27.256" width="5.8795" :height="item.box1h*20.158" :fill="item.box1fill" stroke="none" />
                    <rect x="35.269" :y="27.256+item.box1h*20.158" width="5.8795" :height="(1-item.box1h)*20.158" fill="url(#hatch)" stroke="none" />

                    <rect x="35.269" y="27.256" width="5.8795" height="20.158" fill="none" stroke="#000"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />

                    <rect x="43.483" y="27.256" width="5.8795" :height="item.box2h*20.158" :fill="item.box2fill" stroke="none" />
                    <rect x="43.483" :y="27.256+item.box2h*20.158" width="5.8795" :height="(1-item.box2h)*20.158" fill="url(#hatch)" stroke="none" />

                    <rect x="43.483" y="27.256" width="5.8795" height="20.158" fill="none" stroke="#000"
                        stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <g fill="none" stroke="#000" stroke-width=".26458px">
                        <path d="m41.149 37.476h1.8228" marker-end="url(#Arrow2Send)" />
                        <path d="m49.311 37.476h1.8228" :marker-end="item.r ? 'url(#Arrow2Send)' : ''" />
                        <path d="m33.038 37.476h1.8228" marker-end="url(#Arrow2Send)" />
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
            <!-- block 4-->
            <g v-for="(item, index) in items.b4" :key="index" :transform="`translate(${item.x}, ${item.y})`">
                <path d="m49.311 37.476h1.8228" fill="none" :marker-end="item.r ? 'url(#Arrow2Send)' : ''" stroke="#000"
                    stroke-width=".26458px" />
                <path d="m11.746 37.476v-12.947h38.342v12.888" fill="none" stroke="#000" stroke-width=".26458px" />
                <path d="m30.836 23.949 0.59549 0.5932-0.59549 0.6247z" />
                <text x="30.924694" y="22.450239" font-family="'Arial'" font-size="2.4694px" stroke-width=".26458"
                    style="line-height:1.25" xml:space="preserve">
                    <tspan x="30.924694" y="22.450239" font-size="2.4694px" stroke-width=".26458" text-align="center"
                        text-anchor="middle">{{ item.name }}</tspan>
                </text>
                <path d="m10.706 37.476h1.8228" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                    stroke-width=".26458px" />
                <path d="m41.642 37.476h1.3294" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                    stroke-width=".26458px" />

                <rect x="35.773" y="27.256" width="5.8795" :height="item.box2h*20.158" :fill="item.box2fill" stroke="none" />
                <rect x="35.773" :y="27.256+item.box2h*20.158" width="5.8795" :height="(1-item.box2h)*20.158" fill="url(#hatch)" stroke="none" />

                <rect x="35.773" y="27.256" width="5.8795" height="20.158" fill="none" stroke="#000"
                    stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                <text transform="rotate(-90)" x="-37.549553" y="39.486286" fill="#4d4d4d" font-family="'Arial'"
                    font-size="2.4694px" stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                    <tspan x="-37.549553" y="39.486286" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                        text-align="center" text-anchor="middle">1x1, 128</tspan>
                </text>
                <g transform="translate(-7.6353)">
                    <path d="m41.642 37.476h1.3294" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                        stroke-width=".26458px" />
                    <rect x="35.773" y="27.256" width="5.8795" height="20.158" :fill="items.bfill" opacity=".99"
                        stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <text transform="rotate(-90)" x="-37.549553" y="39.486286" fill="#4d4d4d" font-family="'Arial'"
                        font-size="2.4694px" stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                        <tspan x="-37.549553" y="39.486286" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">ReLu</tspan>
                    </text>
                </g>
                <g transform="translate(-15.199)">
                    <path d="m41.642 37.476h1.3294" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                        stroke-width=".26458px" />
                    <rect x="35.773" y="27.256" width="5.8795" height="20.158" :fill="items.bfill" opacity=".99"
                        stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <text transform="rotate(-90)" x="-37.549553" y="39.486286" fill="#4d4d4d" font-family="'Arial'"
                        font-size="2.4694px" stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                        <tspan x="-37.549553" y="39.486286" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">BatchNorm</tspan>
                    </text>
                </g>
                <g transform="translate(-22.834)">
                    <path d="m41.642 37.476h1.3294" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                        stroke-width=".26458px" />

                    <rect x="35.773" y="27.256" width="5.8795" :height="item.box1h*20.158" :fill="item.box1fill" stroke="none" />
                    <!-- <rect x="35.773" y="27.256" width="5.8795" :height="item.box1h*20.158" fill="url(#hatch)" stroke="none" /> -->
                    <rect x="35.773" :y="27.256+item.box1h*20.158" width="5.8795" :height="(1-item.box1h)*20.158" fill="url(#hatch)" stroke="none" />


                    <rect x="35.773" y="27.256" width="5.8795" height="20.158" fill="none"
                        stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width=".26458" />
                    <text transform="rotate(-90)" x="-37.549553" y="39.486286" fill="#4d4d4d" font-family="'Arial'"
                        font-size="2.4694px" stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                        <tspan x="-37.549553" y="39.486286" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">1x1, 128</tspan>
                    </text>
                </g>
                <g stroke-width=".26458">
                    <rect x="43.483" y="27.256" width="5.8795" height="20.158" :fill="items.bfill" opacity=".99"
                        stroke="#000" stroke-linecap="round" stroke-miterlimit="10" />
                    <text transform="rotate(-90)" x="-37.577667" y="47.033211" fill="#4d4d4d" font-family="'Arial'"
                        font-size="2.4694px" style="line-height:1.25" xml:space="preserve">
                        <tspan x="-37.577667" y="47.033211" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                            text-align="center" text-anchor="middle">BatchNorm</tspan>
                    </text>
                </g>
            </g>


            <!-- output -->
            <g id="resout" :transform="`translate(${output_x - 37} -20)`">
                <rect x="43.5" y="27.256" width="5.8795" height="20.158" fill="#ccc" opacity=".99" stroke="#000"
                    stroke-linecap="round" stroke-miterlimit="10" stroke-width=".265" />
                <path d="m41.149 37.476h1.8228" fill="none" marker-end="url(#Arrow2Send)" stroke="#000"
                    stroke-width=".26458px" />
                <text transform="rotate(-90)" x="-37.553642" y="40.369804" font-family="'Arial'" font-size="2.4694px"
                    stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                    <tspan x="-37.553642" y="40.369804" fill="#666666" font-size="2.4694px" stroke-width=".26458"
                        text-align="center" text-anchor="middle">AvgPool</tspan>
                </text>
                <text transform="rotate(-90)" x="-37.549553" y="46.961681" fill="#4d4d4d" font-family="'Arial'"
                    font-size="2.4694px" stroke-width=".26458" style="line-height:1.25" xml:space="preserve">
                    <tspan x="-37.549553" y="46.961681" fill="#4d4d4d" font-size="2.4694px" stroke-width=".26458"
                        text-align="center" text-anchor="middle">FC</tspan>
                </text>
            </g>


            <!-- legend -->
            <g>
                <g v-for="(item, index) in legend" :key="index" :transform="`translate(${item.x}, ${item.y})`"
                    stroke-width=".26458">
                    <rect x="35.305" y="50.342" width="5.7115" height="5.2916" :fill="item.fill" stroke="#000"
                        stroke-linecap="round" stroke-miterlimit="10" />
                    <text x="43.714394" y="53.558167" font-family="'Arial'" font-size="2.4694px"
                        style="line-height:1.25" xml:space="preserve">
                        <tspan x="43.714394" y="53.558167" font-size="2.4694px" stroke-width=".26458">{{ item.name }}
                        </tspan>
                    </text>
                </g>

                <text x="5" y="36" font-family="'Arial'" font-size="2.4694px" xml:space="preserve"
                    style="line-height: 1.25;">
                    <tspan font-size="2.4694px" stroke-width=".26458" style="font-weight:bold">Tiles: </tspan>
                </text>
            </g>

        </svg>
    </div>
</template>

<script setup lang="ts">

import { ref, defineProps, watchEffect } from 'vue';
import type { PropType } from 'vue';
import type { ResNetAssignment } from "../database";

const props = defineProps({
    size: {
        type: Number,
        default: 8,
    },
    assignment: {
        type: Object as PropType<ResNetAssignment|null>,
        default: null,
    },
    colors: {
        type: Array as PropType<string[]>,
        default:['red', 'green', 'yellow', 'blue']
    }
});

interface ResnetL {
    x: number;
    y: number;
    name: string;
    box1: string;
    box2: string;
    box1fill: string;
    box2fill: string;
    box1h: number;
    box2h: number;
    r: boolean;
}

interface ResnetConfig {
    first: {
        name: string;
        boxfill: string;
        boxh: number;
    }
    b2: ResnetL[];
    b4: ResnetL[];
    bfill: string;
};

interface TileLegend {
    x: number;
    y: number;
    name: string;
    fill: string;
}

let items = ref({ first: { name: 'Conv2D-1', boxfill: '#fff', boxh:1 }, b2: [], b4: [], bfill:'#cccccc' } as ResnetConfig);
let legend = ref([] as TileLegend[]);
let viewbox = ref([0, 0, 10, 1].join(' '));
let output_x = ref(0);

let updateSvg = () => {
    legend.value = [];

    const layers = Math.floor(props.size / 2)
    let itms = [];
    let itms_max_x = 0;
    
    let ass = props.assignment || {layers:[], tiles:[]};
    if (ass.layers.length) {
        items.value.first.boxfill = props.colors[ass.layers[0].mul_index % props.colors.length];
        items.value.first.boxh = ass.layers[0].mul_power_ratio;
    }
    
    for (let i = 0; i < layers; i++) {
        var el1 = (1+2*i < ass.layers.length) ? ass.layers[2*i+1] : { mul_index: i % props.colors.length, mul_power_ratio:1 };
        var el2 = (1+2*i+1 < ass.layers.length) ? ass.layers[2*i+1+1] : { mul_index: i % props.colors.length, mul_power_ratio:1 };

        let x = (props.size < 15) ? 13 + 39 * i : -9 + 16.5 * i;
        let xto = (props.size < 15) ? 25 + 39 * (i + 1) : -9 + 35 + 16.5 * (i + 1);
        if (xto > itms_max_x) itms_max_x = xto;

        itms.push({
            x: x,
            y: -20,
            name: `Conv2D-${i + 2}`,
            box1: '1x1, 128',
            box2: '3x3, 128',
            box1fill: props.colors[el1.mul_index % props.colors.length],
            box2fill: props.colors[el2.mul_index % props.colors.length],
            box1h: el1.mul_power_ratio,
            box2h: el2.mul_power_ratio,
            r: i == (layers - 1)
        });
    }
    output_x.value = itms_max_x;
    itms_max_x += 15;
    items.value.b4 = (props.size < 15) ? itms : [];
    items.value.b2 = (props.size < 15) ? [] : itms;
    //console.log('show layers: ', props.size);

    let leg_max_x = 0;
    ass.tiles.map((t, i) => {
        let x = -30 + 10 + 30 * i;
        let xto = x + 30;
        if (xto > leg_max_x) leg_max_x = xto;
        legend.value.push({
            x: x,
            y: -18,
            name: t.mul.id,
            fill: props.colors[i % props.colors.length],
        });
    });

    //console.log(legend.value);
    viewbox.value = [0, 0, Math.max(itms_max_x, leg_max_x), 30 + 10].join(' ');
};

watchEffect(() => {
    //console.log('size', props.size);
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
    border: 1px solid transparent;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 180px;
    /*max-height:200px;*/
}

svg text{
   user-select: none;
}
</style>
