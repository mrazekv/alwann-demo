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
                    <a href="#" class="btn btn-primary"> Primary button </a>
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
                    <a href="#" class="btn btn-primary"> Primary button </a>
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
                    <a href="#" class="btn btn-primary"> Primary button </a>
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
                
                <label class="form-label">Iteration: {{ runidx+1 }} / {{ runs.length }}</label>
                
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-4" @click="updateRunIdx($event)">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                            :style="{width: `${parseInt(100*runidx/runs.length)}%`}"></div>
                    </div>
                    <RoundButton v-model="isPlaying" />
                </div>
            </div>
        </div>


        
        <h2>Pareto front</h2>

        <Graph :data="plotdata" :data2="plotdata2" @point-clicked="pointClicked" />

        {{ selected }}
    </div>



    <div>

        <button class="rundis" id="runAnimation">Optimize</button>
        <button id="restart">Random</button>
        <button class="rundis" id="final">Final solution</button>
        <div id="elementDetails"></div>
        <div id="hoverinfo"></div>
    </div>

</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, provide } from "vue";

import VutLogo from "./components/VutLogo.vue";
import BootstrapIcons from "./components/BootstrapIcons.vue";
import Graph from "./components/Graph.vue";
import RoundButton from "./components/RoundButton.vue";
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

let selected = ref({ model: (models.length) ? models[0].value : '', array: '' });

let arrays = computed(() => {
    var systolics = Array.from(new Set(data.filter(
        (d) => d["model"] === selected.value.model
    ).map((d) => d["systolic"])));

    return systolics.map((s: string) => {
        return { name: s, value: s };
    });
});

selected.value.array = arrays.value[0].value;

let filteredData = ref([]);
let filteredAccurateData = ref([]);
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
});

var plotdata = ref({ x: [], y: [], records: [] });
var plotdata2 = ref({ x: [], y: [], records: [] });

watch(runidx, (newVal, oldVal) => {
    let rd = getRunData(filteredData.value, newVal % runs.value.length);
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
    console.log('point', evt);
};

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
</style>