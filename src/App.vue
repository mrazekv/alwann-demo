<template>
    <BootstrapIcons />
    <div class="container px-4 py-5">
        <h2 class="pb-2 border-bottom">
            <VutLogo :scale="50" /> AI accelerator design space exploration
            <QR class="float-end" qrtext="https://ehw.fit.vutbr.cz" />
        </h2>
        <div class="row g+4 py-5">
            <div class="col-md-8">
                <Algorithm />
            </div>
            <div class="col-md-4">
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em">
                            <use xlink:href="#cpu-fill" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-4">HW acceleration of neural networks</h3>
                        <p>
                            The HW accelerator leverages systolic arrays to optimize the inference process, focusing primarily on accelerating multiplication operations with efficient memory usage. These operations, numbering in the millions for each image, form the backbone of the computational workload.
                        </p>
                    </div>
                </div>
                <div class="col d-flex align-items-start">
                    <div
                        class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                        <svg class="bi" width="1em" height="1em">
                            <use xlink:href="#tools" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="fs-4">AI optimization</h3>
                        <p>
                            Evolutionary algorithms optimize the design by searching for power-efficient multiplier implementations and strategically assigning these operations to the multipliers within the systolic array, enhancing overall quality and energy tradeoff.
                        </p>
                        <!--                    <a href="#" class="btn btn-primary"> Primary button </a> -->
                    </div>
                </div>
            </div>
        </div>
        <!--
        <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="col d-flex align-items-start">
                <div
                    class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <svg class="bi" width="1em" height="1em">
                        <use xlink:href="#toggles2" />
                    </svg>
                </div>
                <div>
                    <h3 class="fs-4">Featured title</h3>
                    <p>
                        Paragraph of text beneath the heading to explain the heading. We'll
                        add onto it with another sentence and probably just keep going until
                        we run out of words.
                    </p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <div
                    class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <svg class="bi" width="1em" height="1em">
                        <use xlink:href="#cpu-fill" />
                    </svg>
                </div>
                <div>
                    <h3 class="fs-4">Featured title</h3>
                    <p>
                        Paragraph of text beneath the heading to explain the heading. We'll
                        add onto it with another sentence and probably just keep going until
                        we run out of words.
                    </p>
                </div>
            </div>
            <div class="col d-flex align-items-start">
                <div
                    class="icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    <svg class="bi" width="1em" height="1em">
                        <use xlink:href="#tools" />
                    </svg>
                </div>
                <div>
                    <h3 class="fs-4">Featured title</h3>
                    <p>
                        Paragraph of text beneath the heading to explain the heading. We'll
                        add onto it with another sentence and probably just keep going until
                        we run out of words.
                    </p>
                   
                </div>
            </div>
        </div>-->

        <h3 class="pb-2 mb-4 border-bottom">
            DNN optimization
        </h3>
        <div class="row g-3">
            <div class="col-md-4">
                <label for="inputModel" class="form-label">DNN model</label>
                <select class="form-select" id="inputModel" v-model="selected.model">
                    <option v-for="option in models" :value="option.value" :key="option.value">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="col-md-3">
                <label for="inputL" class="form-label">Systolic array</label>
                <select class="form-select" id="inputL" v-model="selected.array">
                    <option v-for="option in arrays" :value="option.value" :key="option.value">
                        {{ option.name }}
                    </option>
                </select>
            </div>
            <div class="col-md-5">

                <label class="form-label">Iteration: {{ runidx + 1 }} / <a class="last" href="#"
                        @click.prevent="gotoFinal()">{{ runs.length }}</a></label>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-4" @click="updateRunIdx($event)">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                            :style="{ width: `${(100 * runidx / (runs.length - 1)).toFixed(0)}%` }"></div>
                    </div>
                    <RoundButton v-model="isPlaying" />
                </div>
            </div>
        </div>

        <br>
        <Graph :data="plotdata" :data2="plotdata2" :highlight="detailid" @point-clicked="pointClicked" />

        <div v-if="detail">
            <h3 class="pb-2 mb-4 border-bottom">
                <span v-if="!detailid.accurate">
                    Detail of candidate solution #{{ detailid.idx }}
                </span>
                <span v-else>Detail of accurate solution</span>
            </h3>


            <div class="row cards1">
                <div class="col-md-2 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                DNN accuracy
                            </h6>
                            <span class="h2 mb-0">
                                {{ (detail.accuracy * 100.0).toFixed(1) }} <small>%</small>
                            </span><br>
                            <span class="badge text-bg-success-subtle mt-n1">
                                CIFAR-10
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-2 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Accuracy drop
                            </h6>

                            <span class="h2 mb-0">
                                {{ detail.accuracy_drop.toFixed(0) }} <small>%</small>
                            </span><br>
                            <span class="badge text-bg-success-subtle mt-n1">
                                to baseline
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Power consumption
                            </h6>
                            <span class="h2 mb-0">
                                {{ detail.power.toFixed(3) }} <small>mW</small>
                            </span><br>
                            <span class="badge text-bg-success-subtle mt-n1">
                                per MAC
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-2 col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Power reduction
                            </h6>
                            <span class="h2 mb-0">
                                {{ detail.power_reduction_pct.toFixed(0) }} <small>%</small>
                            </span><br>
                            <span class="badge text-bg-success-subtle mt-n1">
                                to baseline
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-md-3 col-sm-12">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Computational complexity
                            </h6>
                            <span class="h2 mb-0">
                                {{ (modelinfo) ? (modelinfo.multcnt / 1e6).toFixed(2) : '&mdash;' }}M
                                <small>MACs</small>
                            </span>
                            <br>&nbsp;
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mapping: {{ detail.chrom.slice(detail.tiles) }}
            <br> -->

            <ResNet :size="detail.layers" :assignment="detailAssignments" :colors="colors" />

            <div>
                Computational cost of each convolutional layer:
                <span v-for="(item, index) in modelinfo.layer_macs" :key="index"><span v-if="index > 0">, </span>{{
                    (item / 1e6).toFixed(1) }}M</span>
                MACs
            </div>

            <h4 class="mt-4">Encoded candidate solution:</h4>

            <p class="mt-4 mb-4">
                The encoded solution consist of two parts:
            </p>
            <ul>
                <li>Multipliers mapping - i.e. assignment of approximate multipliers to each of {{ detail.tile }} tiles
                </li>
                <li>Layers mapping - i.e. assignment of each layer to a tile</li>
            </ul>
            <p>
                The assignment of each layer to a tile gives arise a computational plan which influences the duration of
                the
                inference on the considered HW accelerator.
            </p>


            <div class="chromroot">
                <svg version="1.1" :viewBox="`0 0 ${detail.chrom.length * 7} 26`" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="Arrow2Send" overflow="visible" orient="auto">
                            <path transform="matrix(-.3 0 0 -.3 .69 0)"
                                d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                                fill="context-stroke" fill-rule="evenodd" stroke="context-stroke"
                                stroke-linejoin="round" stroke-width=".625" />
                        </marker>
                        <marker id="Arrow2Sstart" overflow="visible" orient="auto">
                            <path transform="scale(.3) translate(-2.3)"
                                d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z"
                                fill="context-stroke" fill-rule="evenodd" stroke="context-stroke"
                                stroke-linejoin="round" stroke-width=".625" />
                        </marker>

                    </defs>

                    <g id="gtiles" transform="translate(-12.175 -59)">
                        <path :d="`m13 80.805h${detail.tiles * 7 - 1}`" fill="none" marker-end="url(#Arrow2Send)"
                            marker-start="url(#Arrow2Sstart)" stroke="#000" stroke-width=".265" />
                        <text x="27.028669" y="83.949165" fill="#000000" font-family="'Arial'" font-size="2.4694px"
                            stroke-width=".58461" style="line-height:1.25" xml:space="preserve">
                            <tspan :x="(2 * 13 + detail.tiles * 7 - 1) / 2" y="83.949165" fill="#000000"
                                font-family="Arial" font-size="2.4694px" stroke-width=".58461" text-align="center"
                                text-anchor="middle">
                                multipliers</tspan>
                        </text>
                    </g>

                    <g id="gmults" :transform="`translate(${-12.175 + detail.tiles * 7} -59)`">
                        <path :d="`m13 80.805h${(detail.chrom.length - detail.tiles) * 7 - 1}`" fill="none"
                            marker-end="url(#Arrow2Send)" marker-start="url(#Arrow2Sstart)" stroke="#000"
                            stroke-width=".265" />
                        <text x="27.028669" y="83.949165" fill="#000000" font-family="'Arial'" font-size="2.4694px"
                            stroke-width=".58461" style="line-height:1.25" xml:space="preserve">
                            <tspan :x="(2 * 13 + (detail.chrom.length - detail.tiles) * 7 - 1) / 2" y="83.949165"
                                fill="#000000" font-family="Arial" font-size="2.4694px" stroke-width=".58461"
                                text-align="center" text-anchor="middle">layer to tile mapping</tspan>
                        </text>
                    </g>

                    <g v-for="(item, index) in detail.chrom" :key="index">
                        <g :transform="`translate(${-19 + index * 7}, -60)`" v-if="index < detail.tiles">
                            <rect x="19.855" y="64.965" width="5.8795" height="16" ry="1.4254" :fill="colors[index]"
                                opacity=".99" stroke="#000" stroke-linecap="round" stroke-miterlimit="10"
                                stroke-width=".26458" />
                            <text x="22.693041" y="64.37944" fill="#000000" font-family="'Arial'" font-size="2.4694px"
                                stroke-width=".58461" style="line-height:1.25" xml:space="preserve">
                                <tspan x="22.693041" y="64.37944" fill="#000000" font-family="Arial"
                                    font-size="2.4694px" stroke-width=".58461" text-align="center" text-anchor="middle">
                                    T{{ index + 1 }}</tspan>
                            </text>
                            <text transform="rotate(-90)" x="-73" y="24" fill="#000000" font-family="'Arial'"
                                font-size="2.4694px" stroke-width=".26458" style="line-height:1.25"
                                xml:space="preserve">
                                <tspan x="-73" y="24" fill="#000000" font-size="2.4694px" stroke-width=".26458"
                                    text-align="center" text-anchor="middle">{{ item }}</tspan>
                            </text>
                        </g>
                        <g :transform="`translate(${-19 + index * 7}, -60)`" v-if="index >= detail.tiles">



                            <rect x="19.855" y="64.965" width="5.8795" height="16" ry="1.4254" fill="#f2f2f2"
                                opacity=".99" stroke="#000" stroke-linecap="round" stroke-miterlimit="10"
                                stroke-width=".26458" />
                            <!-- <text x="22.724239" y="73.79982" fill="#000000" font-family="'Arial'" font-size="5.4564px"
                                font-stretch="condensed" stroke-width=".58461" style="line-height:1.25"
                                xml:space="preserve">
                                <tspan x="22.724239" y="73.79982" fill="#000000" font-family="Arial"
                                    font-size="5.4564px" font-stretch="condensed" stroke-width=".58461"
                                    text-align="center" text-anchor="middle">{{ item }}</tspan>
                            </text> -->
                            <text transform="rotate(-90)" x="-72.052246" y="24" fill="#000000" font-family="'Arial'"
                                font-size="2.5px" stroke-width=".26458" style="line-height:1.25" font-stretch="normal"
                                xml:space="preserve">
                                <tspan x="-72.052246" y="24" fill="#000000" text-align="center" text-anchor="middle">
                                    TILE {{ parseInt(item.toString()) + 1 }}</tspan>
                            </text>

                            <text x="22.883718" y="64.405525" fill="#000000" font-family="'Arial'" font-size="2.4694px"
                                stroke-width=".58461" style="line-height:1.25" xml:space="preserve">
                                <tspan x="22.883718" y="64.405525" fill="#000000" font-family="Arial"
                                    font-size="2.4694px" stroke-width=".58461" text-align="center" text-anchor="middle">
                                    L{{ index - detail.tiles + 1 }}</tspan>
                            </text>
                        </g>
                    </g>
                </svg>
            </div>

            <div v-if="detailAssignments" class="mt-3">
                <h3>Designed HW accelerator</h3>
                <h4>Structure</h4>
                The HW accelerator consists of {{ detailAssignments.tiles.length }} systolic arrays, array for special
                layers and memory unit.
                The crossbar connects the tiles and the memory unit.

                <div class="hwstruct">
                    <svg height="100" version="1.1"
                        :viewBox="`0 0 ${(detailAssignments.tiles.length - 1) * 30 + 25 + 34 + 20} 30.692`"
                        xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#"
                        xmlns:dc="http://purl.org/dc/elements/1.1/"
                        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
                        <g transform="translate(-7.805 -111)">
                            <g id="gmem"
                                :transform="`translate(${(detailAssignments.tiles.length - 1) * 30 - 62.5},0)`">
                                <rect x="127" y="111.13" width="21.167" height="10.583" fill="#fff" stroke="#000"
                                    stroke-width=".265" />
                                <text x="137.31866" y="117.353" fill="#000000" font-family="sans-serif"
                                    font-size="3.5278px" letter-spacing="0px" stroke-width=".26458" word-spacing="0px"
                                    style="line-height:1.25" xml:space="preserve">
                                    <tspan x="137.31866" y="117.353" font-family="Arial" stroke-width=".26458"
                                        text-align="center" text-anchor="middle">Memory</tspan>
                                </text>
                                <rect x="121.71" y="115.1" width="5.2917" height="2.6458" stroke="#000"
                                    stroke-width=".26458" />
                            </g>
                            <g id="gcross">
                                <rect id="crossbar" x="34.396" y="112.46"
                                    :width="(detailAssignments.tiles.length - 1) * 30 + 25" height="7.9375" fill="#ccc"
                                    stroke="#000" stroke-width=".265" />
                                <text :x="(2 * 34.396 + (detailAssignments.tiles.length - 1) * 30 + 25) / 2"
                                    y="117.70441" fill="#000000" font-family="sans-serif" font-size="3.5278px"
                                    letter-spacing="0px" stroke-width=".26458" word-spacing="0px"
                                    style="line-height:1.25" xml:space="preserve">
                                    <tspan font-family="Arial" stroke-width=".26458" text-align="center"
                                        text-anchor="middle">Cross Bar</tspan>
                                </text>
                            </g>
                            <g v-for="(item, index) in detailAssignments.tiles" :key="index"
                                :transform="`translate(${index * 30},0)`">
                                <rect transform="rotate(-90)" x="-125.69" y="44.979" width="5.2917" height="2.6458"
                                    stroke="#000" stroke-width=".26458" />
                                <rect x="31.75" y="125.69" width="29.104" height="15.875" :fill="colors[index]"
                                    stroke="#000" stroke-width=".265" />
                                <text x="46.513481" y="137.85172" fill="#000000" font-family="sans-serif"
                                    font-size="3.5278px" letter-spacing="0px" stroke-width=".26458" word-spacing="0px"
                                    style="line-height:1.25" xml:space="preserve">
                                    <tspan x="46.513481" y="137.85172" font-family="Arial" stroke-width=".26458"
                                        text-align="center" text-anchor="middle">{{ item.mul.id }}</tspan>
                                </text>
                                <text x="46.650414" y="131.52295" fill="#000000" font-family="sans-serif"
                                    font-size="3.5278px" letter-spacing="0px" stroke-width=".26458" word-spacing="0px"
                                    style="line-height:1.25" xml:space="preserve">
                                    <tspan x="46.650414" y="131.52295" font-family="Arial" font-weight="bold"
                                        stroke-width=".26458" text-align="center" text-anchor="middle">Tile #{{
                                            index + 1
                                        }}</tspan>
                                </text>
                            </g>
                            <g id="gother">
                                <rect x="7.9375" y="111.13" width="21.167" height="10.583" fill="#1a1a1a" stroke="#000"
                                    stroke-width=".265" />
                                <text x="18.136606" y="115.58382" fill="#ffffff" font-family="Arial"
                                    font-size="3.5278px" letter-spacing="0px" stroke-width=".26458" text-anchor="middle"
                                    word-spacing="0px" style="line-height:1.05" xml:space="preserve">
                                    <tspan x="18.136606" y="115.58382" text-align="center">Other </tspan>
                                    <tspan x="18.136606" y="119.32882" text-align="center">layers</tspan>
                                </text>
                                <rect x="29.104" y="115.1" width="5.2917" height="2.6458" stroke="#000"
                                    stroke-width=".26458" />
                            </g>
                        </g>
                    </svg>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th></th>
                                <th colspan="7" style="text-align: center">Parameters of the multipliers</th>
                            </tr>
                            <tr>
                                <th></th>
                                <th>multiplier</th>
                                <th>power</th>
                                <th>area</th>
                                <th>delay</th>
                                <th>ep</th>
                                <th>mae</th>
                                <th>mre</th>
                                <th>wce</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detailAssignments.tiles" :key="index">
                                <td><b>Tile #{{ index + 1 }}</b></td>
                                <td>{{ item.mul.id }}</td>
                                <td>{{ item.mul.power.toFixed(3) }} mW <span class="badge text-bg-success-subtle">{{
                                    -item.mul.power_pct.toFixed(2) }}%</span></td>
                                <td>{{ item.mul.area.toFixed(3) }} <span class="badge text-bg-success-subtle">{{
                                    -item.mul.area_pct.toFixed(2) }}%</span></td>
                                <td>{{ item.mul.delay.toFixed(3) }} <span class="badge text-bg-success-subtle">{{
                                    -item.mul.delay_pct.toFixed(2) }}%</span></td>
                                <td>{{ item.mul.ep_pct.toFixed(2) }}%</td>
                                <td>{{ item.mul.mae_pct.toFixed(2) }}%</td>
                                <td>{{ item.mul.mre_pct.toFixed(2) }}%</td>
                                <td>{{ item.mul.wce_pct.toFixed(2) }}%</td>


                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4>Computational plan</h4>
                <p>Computational plan for HW accelerator utilizing tile power gating approach.</p>

                <PlanPowerGating :size="detail.layers" :assignment="detailAssignments" :colors="colors" />
            </div>

        </div>

    </div>

</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, provide } from "vue";

import QR from "./components/QR.vue";
import Algorithm from "./components/Algorithm.vue";
import VutLogo from "./components/VutLogo.vue";
import BootstrapIcons from "./components/BootstrapIcons.vue";
import Graph from "./components/Graph.vue";
import RoundButton from "./components/RoundButton.vue";
import ResNet from "./components/ResNet.vue";
import PlanPowerGating from "./components/PlanPowerGating.vue";
import type { Individual, DataType, ResNetAssignment } from "./database";

import data_ from "@/../data/data.json";
import accurate_data_ from "@/../data/accurate.json";
import { nnConfig, multConfig } from './nns.ts';
import type { NNConfigItem } from './nns.ts';

const data: DataType[] = data_ as DataType[];
const accurate_data: DataType[] = accurate_data_ as DataType[];

const colors = ['#d1dff2', '#fdeedb', '#e6ecca', '#f1dff2'];

function filterData(data: DataType[], model: string, systolic: string) {
    //filteredAccurate = accurate_data.filter((d) => d["model"] === model)[0]["data"];
    //console.log(filteredAccurate);
    return data.filter((d) => d["model"] === model && d["systolic"] === systolic);
}

function getRuns(data: DataType[]) {
    return data.map((d) => d["run"]).sort((a, b) => a - b);
}

function getRunData(data: DataType[], run: number) {
    // return the first element of the filtered data
    return data.filter((d) => d["run"] === run)[0];
}

//extend models with name attribute for select
var models = Array.from(new Set(data.map((d) => d["model"]))).map((m: string) => {
    return { name: m.replace("resnet_", "ResNet ").replace("_v2", ""), value: m };
});

let selected = ref({ model: (models.length > 1) ? models[1].value : '', array: '' });

let detailid = ref({ idx: null as number | null, accurate: false });
//let detail = ref(null as Individual | null);

let arrays = computed(() => {
    var systolics = Array.from(new Set(data.filter(
        (d) => d["model"] === selected.value.model
    ).map((d) => d["systolic"])));

    return systolics.map((s: string) => {
        return { name: s[s.length - 1] + ' tiles', value: s };
    });
});

selected.value.array = arrays.value[0].value;



let filteredData = ref([] as DataType[]);
let filteredAccurateData = ref([] as Individual[]);
let runData = ref({} as DataType);
let runs = ref([] as number[]);

function updatedata() {
    filteredData.value = filterData(data, selected.value.model, selected.value.array);

    filteredAccurateData.value =
        accurate_data.filter((d) => d["model"] === selected.value.model)[0]["data"];

    runs.value = getRuns(filteredData.value);
}

function updaterundata() {
    runData.value = getRunData(filteredData.value, runidx.value % runs.value.length);

    //sort rundata data according to power and accuracy pair
    runData.value.data.sort((a, b) => {
        if (a["power"] === b["power"]) {
            return b["accuracy"] - a["accuracy"];
        }
        return a["power"] - b["power"];
    });
}

let runidx = ref(0);
let isPlaying = ref(true);

setInterval(() => {
    if (!isPlaying.value) return;
    runidx.value = (runidx.value + 1) % runs.value.length;
}, 1000);

watch(() => selected.value.model + '.' + selected.value.array, (newVal, oldVal) => {
    //check if selected.value.array is in arrays
    if (!arrays.value.map((a) => a.value).includes(selected.value.array)) {
        selected.value.array = arrays.value[0].value;
    }

    //get data
    updatedata();

    //reset animation
    runidx.value = 0;
    detailid.value.idx = null;
    //detail.value = null;
    updaterundata();
});

interface PlotData {
    x: number[];
    y: number[];
    records: Individual[];
};

var plotdata = ref({ x: [], y: [], records: [] } as PlotData);
var plotdata2 = ref({ x: [], y: [], records: [] } as PlotData);

watch(runidx, (newVal, oldVal) => {
    updaterundata();
    let rd = runData.value;
    //console.log(newVal, oldVal);
    //console.log(rd.data);
    //console.log('filteredAccurateData', filteredAccurateData.value);

    plotdata.value = { x: rd.data.map((d) => d["power"]), y: rd.data.map((d) => d["accuracy"] * 100.0), records: rd.data.map((d) => d) };

    plotdata2.value = {
        x: filteredAccurateData.value.map((d) => d["power"]),
        y: filteredAccurateData.value.map((d) => d["accuracy"] * 100.0),
        records: filteredAccurateData.value.map((d) => d)
    };
});

let pointClicked = (evt: any) => {
    if (!evt) return;
    isPlaying.value = false;
    if (evt.id == 2) {
        //accurate multiplier
        detailid.value.idx = 0;
        detailid.value.accurate = true;
    } else {
        detailid.value.idx = evt.index;
        detailid.value.accurate = false;
    }
};

interface Detail extends Individual {
    power_reduction_pct: number;
    accuracy_drop: number;
}

let detail = computed(() => {
    if (detailid.value.idx === null) {
        return null;
    } else {
        let d = ((detailid.value.accurate) ? filteredAccurateData.value[0] : ((detailid.value.idx < runData.value.data.length) ? runData.value.data[detailid.value.idx] : null)) as Detail;
        if ((d != null) && (filteredAccurateData.value.length)) {
            d.power_reduction_pct = 100 - 100 * d.power / filteredAccurateData.value[0].power;
            d.accuracy_drop = 100.0 * (filteredAccurateData.value[0].accuracy - d.accuracy);
        }
        return d;
    }
});

interface NNDetail extends NNConfigItem {
    layer_macs: number[];
}

let modelinfo = computed(() => {
    let d = nnConfig[selected.value.model] as NNDetail;
    d.layer_macs = d.layers_list.map((l: string) => d.layers[l]);
    return d;
});

let detailAssignments = computed(() => {
    if (detail.value === null) return null;
    let tiles = detail.value.tiles;
    const macs = modelinfo.value.layer_macs;
    return {
        layers: (detail.value.chrom.slice(tiles) as number[]).map((c, index) => ({
            mul_index: c,
            mul: (detail.value && detail.value.chrom[c]) ? detail.value.chrom[c] : '',
            mul_power_ratio: (detail.value && detail.value.chrom[c]) ? multConfig.power[detail.value.chrom[c]] / multConfig.power[multConfig.accurate] : 1.0,
            tiles: tiles,
            cost: (index < macs.length) ? macs[index] : 0,
        })),
        mapseq: detail.value.chrom.slice(tiles),
        tiles: (detail.value.chrom.slice(0, tiles) as string[]).map((c) => ({
            mul: {
                id: c,
                power: multConfig.power[c],
                area: multConfig.area[c],
                delay: multConfig.delay[c],
                power_pct: 100 - 100 * multConfig.power[c] / multConfig.power[multConfig.accurate],
                area_pct: 100 - 100 * multConfig.area[c] / multConfig.area[multConfig.accurate],
                delay_pct: 100 - 100 * multConfig.delay[c] / multConfig.delay[multConfig.accurate],
                ep_pct: multConfig.ep_pct[c],
                mae_pct: multConfig.mae_pct[c],
                mre_pct: multConfig.mre_pct[c],
                wce_pct: multConfig.wce_pct[c],
                wcre_pct: multConfig.wcre_pct[c]
            }
        }))
    } as ResNetAssignment;
});


let updateRunIdx = (evt: any) => {
    let rect = evt.target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let w = rect.right - rect.left;
    let idx = Math.floor(x / w * runs.value.length) % runs.value.length;
    runidx.value = idx;
}

let gotoFinal = () => {
    isPlaying.value = false;
    runidx.value = runs.value.length - 1;
}

updatedata();
updaterundata();

detailid.value.accurate = false;
detailid.value.idx = getRunData(filteredData.value, getRuns(filteredData.value).splice(-1)[0]).data.length - 1;
</script>

<style scoped>
.progress {
    height: 5px;
    cursor: pointer;
}


.card {
    --bs-card-margin-bottom: 1.5rem;
    --bs-card-outline-color: #e0e0e0;
    margin-bottom: var(--bs-card-margin-bottom);
    border-color: var(--bs-card-outline-color);
    /* box-shadow: 0 0.75rem 1.5rem rgba(var(--bs-black-rgb), 0.03); */
    min-height: 100px;
}

.card>* {
    flex-shrink: 0
}


.text-bg-success-subtle {
    --bs-success: #00D97E;
    --bs-success-bg-subtle: #ccf7e5;

    color: var(--bs-success) !important;
    background-color: var(--bs-success-bg-subtle) !important
}

a.last {
    text-decoration: none;
}


div.chromroot {
    width: 100%;
    overflow-x: auto;
    margin-left: 20px;

    svg {
        height: 140px;
    }
}

div.hwstruct {
    width: 100%;
    overflow-x: auto;
}

svg text {
    user-select: none;
}
</style>