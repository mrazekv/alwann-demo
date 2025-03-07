<template>
    <BootstrapIcons />
    <div class="container px-4 py-5">
        <h2 class="pb-2 border-bottom">
            <VutLogo :scale="50" /> AI accelerator design space exploration
        </h2>
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
<!--                    <a href="#" class="btn btn-primary"> Primary button </a> -->
                </div>
            </div>
        </div>

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

                <label class="form-label">Iteration: {{ runidx + 1 }} / {{ runs.length }}</label>

                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-4" @click="updateRunIdx($event)">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                            :style="{ width: `${parseInt(100 * runidx / runs.length)}%` }"></div>
                    </div>
                    <RoundButton v-model="isPlaying" />
                </div>
            </div>
        </div>

        <br>
        <Graph :data="plotdata" :data2="plotdata2" :highlight="(detailidx === null) ? -1 : detailidx"
            @point-clicked="pointClicked" />

        <div v-if="detail">
            <h3 class="pb-2 mb-4 border-bottom">
                Detail of a candidate solution #{{ detailidx }}
            </h3>


            <div class="row">
                <div class="col-3">

                    <!-- Value  -->
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center gx-0">
                                <div class="col">

                                    <!-- Title -->
                                    <h6 class="text-uppercase text-body-secondary mb-2">
                                        Accuracy
                                    </h6>

                                    <!-- Heading -->
                                    <span class="h2 mb-0">
                                        {{ (detail.accuracy * 100.0).toFixed(1) }} <small>%</small>
                                    </span>
                                    <!-- Badge -->
                                    <span class="badge text-bg-success-subtle mt-n1">
                                        CIFAR-10
                                    </span>
                                </div>

                            </div> <!-- / .row -->
                        </div>
                    </div>

                </div>
                <div class="col-3">

                    <!-- Hours -->
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center gx-0">
                                <div class="col">

                                    <!-- Title -->
                                    <h6 class="text-uppercase text-body-secondary mb-2">
                                        Power consumption
                                    </h6>

                                    <!-- Heading -->
                                    <span class="h2 mb-0">
                                        {{ detail.power.toFixed(3) }} <small>mW</small>
                                    </span>
                                    <span class="badge text-bg-success-subtle mt-n1">
                                        per multiplier
                                    </span>

                                </div>
 
                            </div> <!-- / .row -->
                        </div>
                    </div>

                </div>

                <div class="col-6">

                    <!-- Value  -->
                    <div class="card">
                        <div class="card-body">
                            <div class="row align-items-center gx-0">
                                <div class="col">

                                    <!-- Title -->
                                    <h6 class="text-uppercase text-body-secondary mb-2">
                                        Tile configuration
                                    </h6>

                                    <!-- Heading -->
                                    <span class="h5 mb-0">
                                        {{ detail.chrom.slice(0, detail.tiles).join(', ') }}
                                    </span>
                                </div>
                            </div> <!-- / .row -->
                        </div>
                    </div>

                </div>
            </div>

            <!-- Mapping: {{ detail.chrom.slice(detail.tiles) }}
            <br> -->

            TODO: nezobrazuje se chybny pocet vrstev? - jaktoze je lichy pocet 2D conv?
            <ResNet :size="detail.multconf.length" :assignment="detailAssignments" />
        </div>

    </div>

</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, provide } from "vue";

import VutLogo from "./components/VutLogo.vue";
import BootstrapIcons from "./components/BootstrapIcons.vue";
import Graph from "./components/Graph.vue";
import RoundButton from "./components/RoundButton.vue";
import ResNet from "./components/ResNet.vue";
import type { Individual, DataType } from "./database";

import data from "@/../data/data.json";
import accurate_data from "@/../data/accurate.json";

const typedData: DataType[] = data as DataType[];
const typedAccurateData: DataType[] = accurate_data as DataType[];


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

let detailidx = ref(null as number | null);
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



let filteredData = ref([]);
let filteredAccurateData = ref([]);
let runData = ref([]);
let runs = ref([]);

function updatedata() {
    filteredData.value = filterData(data, selected.value.model, selected.value.array);

    filteredAccurateData.value =
        accurate_data.filter((d) => d["model"] === selected.value.model)[0]["data"];

    runs.value = getRuns(filteredData.value);
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
    detailidx.value = null;
    //detail.value = null;
});

var plotdata = ref({ x: [], y: [], records: [] });
var plotdata2 = ref({ x: [], y: [], records: [] });

watch(runidx, (newVal, oldVal) => {
    runData.value = getRunData(filteredData.value, newVal % runs.value.length);

    //sort rundata data according to power and accuracy pair
    runData.value.data.sort((a, b) => {
        if (a["power"] === b["power"]) {
            return b["accuracy"] - a["accuracy"];
        }
        return a["power"] - b["power"];
    });

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

let pointClicked = (evt) => {
    if (!evt) return;
    console.log('point', evt, evt.index);
    //detail.value = evt;
    detailidx.value = evt.index;
};

let detail = computed(() => {
    if (detailidx.value === null) {
        return null;
    } else {
        return runData.value.data[detailidx.value];
    }
});

let detailAssignments = computed(() => {
    if (!detail.value) return null;
    let tiles = detail.value.tiles;

    console.log('detailAssignments', detail.value);

    //skip first tiles in chrom

    return {
        layers: detail.value.chrom.slice(tiles).map((c) => ({
            mul_index: c,
            mul: detail.value.chrom[c],
            tiles: tiles
        })),
        tiles: detail.value.chrom.slice(0, tiles)
    };
});


let updateRunIdx = (evt) => {
    let rect = evt.target.getBoundingClientRect();
    let x = evt.clientX - rect.left;
    let w = rect.right - rect.left;
    let idx = Math.floor(x / w * runs.value.length) % runs.value.length;
    runidx.value = idx;
}

updatedata();

console.log(runs.value);

console.log(getRunData(filteredData.value, runs.value[0]))

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
</style>