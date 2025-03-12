<template>
    <div>
        <svg version="1.1" :viewBox="`0 0 ${plan.width} 42`" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <marker id="marker5416" overflow="visible" orient="auto">
                    <path transform="scale(-.6)"
                        d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                        fill="#f00" fill-rule="evenodd" stroke="#f00" stroke-linejoin="round" stroke-width=".625" />
                </marker>
                <marker id="TriangleOutL" overflow="visible" orient="auto">
                    <path transform="scale(.8)" d="m5.77 0-8.65 5v-10z" fill-rule="evenodd" stroke="#000"
                        stroke-width="1pt" />
                </marker>
            </defs>
            <!-- BG & lines & titles-->
            <g>
                <rect x="18" y="2" :width="plan.width" :height="(assignment.tiles.length + 2) * 6" fill="#f0f0f0" />

                <g fill="none" stroke="#000" stroke-dasharray="0.264, 0.264" stroke-width=".264">
                    <path :d="`m18 ${2 + (index - 1) * 6}h${plan.width}`" v-for="index in (assignment.tiles.length + 3)"
                        :key="index" />
                </g>

                <g fill="#000000" font-family="Arial" letter-spacing="0px" word-spacing="0px">
                    <text x="3" :y="12 + index * 6" xml:space="preserve" v-for="(item, index) in assignment.tiles"
                        :key="index">
                        <tspan font-size="3.5px" stroke-width=".26458" style="line-height:1.25">Tile T{{ index + 1 }}
                        </tspan>
                    </text>

                    <text x="3" y="6" style="line-height:0%" xml:space="preserve">
                        <tspan font-size="3.5px" stroke-width=".26458" style="line-height:1.25">Mem<tspan
                                baseline-shift="sub" font-size="2.5px">
                                read</tspan>
                        </tspan>
                    </text>

                    <text x="3" :y="12 + assignment.tiles.length * 6" stroke-width="1px" xml:space="preserve">
                        <tspan font-size="3.5px" style="line-height:1.25">Mem
                            <tspan baseline-shift="sub" font-size="2.5px">write</tspan>
                        </tspan>
                    </text>
                </g>
            </g>
            <g stroke="#000" stroke-width="0.4">
                <rect :x="item.x" :y="item.y" :width="item.width" :height="item.height" :fill="item.color"
                    v-for="(item, index) in plan.plan.filter((e)=>e.border)" :key="index" />
            </g>
            <g stroke="none">
                <rect :x="item.x" :y="item.y" :width="item.width" :height="item.height" :fill="item.color"
                    v-for="(item, index) in plan.plan.filter((e)=>!e.border)" :key="index" />
            </g>
            <g>
                <text :x="item.x + item.width / 2" :y="item.y + 4" text-align="center" text-anchor="middle" font-family="Arial"
                    xml:space="preserve" v-for="(item, index) in plan.plan" :key="index">
                    <tspan font-size="3.4px" style="line-height:1.25">
                        {{ item.title }}
                    </tspan>
                </text>
            </g>
        </svg>
    </div>
</template>
<script setup lang="ts">
import type { ResNetAssignment } from '../database';
import { defineProps, computed, type PropType } from 'vue';

const props = defineProps({
    size: {
        type: Number,
        default: 8,
    },
    assignment: {
        type: Object as PropType<ResNetAssignment | null>,
        default: null,
    },
    colors: {
        type: Array as PropType<string[]>,
        default: ['red', 'green', 'yellow', 'blue']
    }
});

interface PlanItem {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    title: string;
    border: boolean;
}

let plan = computed(() => {
    if (props.assignment == null) return;

    let plan: PlanItem[] = [];

    //get maximum cost of layers from assignment.layers
    const maxLayerCost = props.assignment.layers.reduce((max, layer) => {
        return layer.cost > max ? layer.cost : max;
    }, 0) || 0;

    let lastx = 18;
    let tilelastx = props.assignment.tiles.map(() => lastx);

    const normwidth = 32, read_ltncy = 1, write_ltncy = 1, stroke = 0.2, minwidth=5, pwr_ltncy = 1.5;
    for (let i = 0; i < props.assignment.layers.length; i++) {
        const layer = (props.assignment as ResNetAssignment).layers[i] as ResNetLayerAssignment;
        const cost = layer.cost / maxLayerCost;
        let w = normwidth * cost;
        if (w == 0) continue;
        if (w < minwidth) w = minwidth;

        plan.push({
            x: lastx,
            y: 2 + stroke,
            width: w,
            height: 6 - 2 * stroke,
            color: '#ffffff',
            title: 'R',
            border: true
        });
        lastx += read_ltncy;

        if ((lastx - tilelastx[layer.mul_index]) > 2*pwr_ltncy) {
            plan.push({
                x: tilelastx[layer.mul_index],
                y: 8 + 6 * layer.mul_index + stroke,
                width: lastx - tilelastx[layer.mul_index] - pwr_ltncy,
                height: 6 - 2 * stroke,
                color: '#ccc',
                title: `off`,
                border: false
            });
        }

        plan.push({
            x: lastx,
            y: 8 + 6 * layer.mul_index + stroke,
            width: w,
            height: 6 - 2 * stroke,
            color: props.colors[layer.mul_index],
            title: `L${i + 1}`,
            border: true
        });
        tilelastx[layer.mul_index] = lastx + w + pwr_ltncy;
        lastx += write_ltncy;
        plan.push({
            x: lastx,
            y: 8 + 6 * layer.tiles + stroke,
            width: w,
            height: 6 - 2 * stroke,
            color: '#ffffff',
            title: 'W',
            border: true
        });
        lastx += w;
    }
    for (let i = 0; i < props.assignment.tiles.length; i++) {
        if ((lastx - tilelastx[i]) > 4) {
            plan.push({
                x: tilelastx[i],
                y: 8 + 6 * i + stroke,
                width: lastx - tilelastx[i] + 2,
                height: 6 - 2 * stroke,
                color: '#ccc',
                title: `off`,
                border: false
            });
        }
    }
    return { plan: plan, width: lastx };
});

</script>
<style lang="css" scoped>
div {
    /* enable scrolling */
    width: 100%;
    overflow-x: auto;
    /* background-color: #f0f0f0; */ 
    padding: 20px;
    padding-top: 30px;
}

svg {
    border: 1px solid transparent;
    display: block;
    margin-left: auto;
    margin-right: auto;
    height: 150px;
}

svg text {
    user-select: none;
}
</style>