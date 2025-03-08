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

                <label class="form-label">Iteration: {{ runidx + 1 }} / <a class="last" href="#" @click.prevent="gotoFinal()" >{{ runs.length }}</a></label>
                <div class="d-flex align-items-center">
                    <div class="progress flex-grow-1 me-4" @click="updateRunIdx($event)">
                        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
                            :style="{ width: `${(100 * runidx / (runs.length-1)).toFixed(0)}%` }"></div>
                    </div>
                    <RoundButton v-model="isPlaying" />
                </div>
            </div>
        </div>

        <br>
        <Graph :data="plotdata" :data2="plotdata2" :highlight="detailid"
            @point-clicked="pointClicked" />

        <div v-if="detail">
            <h3 class="pb-2 mb-4 border-bottom">
                <span v-if="!detailid.accurate">
                Detail of candidate solution #{{ detailid.idx }}
                </span>
                <span v-else>Detail of accurate solution</span> 
            </h3>


            <div class="row cards1">
                <div class="col-2">
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

                <div class="col-2">
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

                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Power consumption
                            </h6>
                            <span class="h2 mb-0">
                                {{ detail.power.toFixed(3) }} <small>mW</small>
                            </span><br>
                            <span class="badge text-bg-success-subtle mt-n1">
                                per what?
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col-2">
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

                <div class="col-3">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-uppercase text-body-secondary mb-2">
                                Computational complexity
                            </h6>
                            <span class="h2 mb-0">
                                {{ (modelinfo) ? (modelinfo.multcnt/1e6).toFixed(2) : '&mdash;' }}M <small>MACs</small>
                            </span>
                            <br>&nbsp;
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mapping: {{ detail.chrom.slice(detail.tiles) }}
            <br> -->

            <ResNet :size="detail.multconf.length" :assignment="detailAssignments" :colors="colors" />

            <div>
            Computational cost of each convolutional layer: 
            <span v-for="(item, index) in modelinfo.layer_macs" :key="index"><span v-if="index > 0">, </span>{{ (item/1e6).toFixed(1) }}M</span>
            MACs
            </div>
          
            <div v-if="detailAssignments" class="mt-3">
                <h3>Designed HW accelerator</h3>
                <h4>Structure</h4>
                The HW accelerator consists of {{ detailAssignments.tiles.length }} systolic arrays, array for special
                layers and memory unit.
                The crossbar connects the tiles and the memory unit.

                <div class="row mt-4">
                    <div class="col-6">
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
                                        font-size="3.5278px" letter-spacing="0px" stroke-width=".26458"
                                        word-spacing="0px" style="line-height:1.25" xml:space="preserve">
                                        <tspan x="137.31866" y="117.353" font-family="Arial" stroke-width=".26458"
                                            text-align="center" text-anchor="middle">Memory</tspan>
                                    </text>
                                    <rect x="121.71" y="115.1" width="5.2917" height="2.6458" stroke="#000"
                                        stroke-width=".26458" />
                                </g>
                                <g id="gcross">
                                    <rect id="crossbar" x="34.396" y="112.46"
                                        :width="(detailAssignments.tiles.length - 1) * 30 + 25" height="7.9375"
                                        fill="#ccc" stroke="#000" stroke-width=".265" />
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
                                        font-size="3.5278px" letter-spacing="0px" stroke-width=".26458"
                                        word-spacing="0px" style="line-height:1.25" xml:space="preserve">
                                        <tspan x="46.513481" y="137.85172" font-family="Arial" stroke-width=".26458"
                                            text-align="center" text-anchor="middle">{{ item.mul.id }}</tspan>
                                    </text>
                                    <text x="46.650414" y="131.52295" fill="#000000" font-family="sans-serif"
                                        font-size="3.5278px" letter-spacing="0px" stroke-width=".26458"
                                        word-spacing="0px" style="line-height:1.25" xml:space="preserve">
                                        <tspan x="46.650414" y="131.52295" font-family="Arial" font-weight="bold"
                                            stroke-width=".26458" text-align="center" text-anchor="middle">Tile #{{
                                                index + 1
                                            }}</tspan>
                                    </text>
                                </g>
                                <g id="gother">
                                    <rect x="7.9375" y="111.13" width="21.167" height="10.583" fill="#1a1a1a"
                                        stroke="#000" stroke-width=".265" />
                                    <text x="18.136606" y="115.58382" fill="#ffffff" font-family="Arial"
                                        font-size="3.5278px" letter-spacing="0px" stroke-width=".26458"
                                        text-anchor="middle" word-spacing="0px" style="line-height:1.05"
                                        xml:space="preserve">
                                        <tspan x="18.136606" y="115.58382" text-align="center">Other </tspan>
                                        <tspan x="18.136606" y="119.32882" text-align="center">layers</tspan>
                                    </text>
                                    <rect x="29.104" y="115.1" width="5.2917" height="2.6458" stroke="#000"
                                        stroke-width=".26458" />
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="col-6">

                    </div>
                </div>

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


                <h4>Computational plan</h4>              
                Example (not related to the evolved design)<br><br>
                <svg width="139.56mm" height="34.885mm" version="1.1" viewBox="0 0 139.56 34.885" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
 <defs>
  <marker id="marker5416" overflow="visible" orient="auto">
   <path transform="scale(-.6)" d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z" fill="#f00" fill-rule="evenodd" stroke="#f00" stroke-linejoin="round" stroke-width=".625"/>
  </marker>
  <marker id="TriangleOutL" overflow="visible" orient="auto">
   <path transform="scale(.8)" d="m5.77 0-8.65 5v-10z" fill-rule="evenodd" stroke="#000" stroke-width="1pt"/>
  </marker>
  <marker id="marker5416-5" overflow="visible" orient="auto">
   <path transform="scale(-.6)" d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z" fill="#f00" fill-rule="evenodd" stroke="#f00" stroke-linejoin="round" stroke-width=".625"/>
  </marker>
  <marker id="marker5416-2" overflow="visible" orient="auto">
   <path transform="scale(-.6)" d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z" fill="#f00" fill-rule="evenodd" stroke="#f00" stroke-linejoin="round" stroke-width=".625"/>
  </marker>
  <marker id="marker5416-59" overflow="visible" orient="auto">
   <path transform="scale(-.6)" d="m8.7186 4.0337-10.926-4.0177 10.926-4.0177c-1.7455 2.3721-1.7354 5.6175-6e-7 8.0354z" fill="#f00" fill-rule="evenodd" stroke="#f00" stroke-linejoin="round" stroke-width=".625"/>
  </marker>
 </defs>
 <g transform="translate(-20.029 -132.43)">
  <rect x="38.012" y="138.65" width="121.53" height="28.575" fill="#ccc"/>
  <g fill="none" stroke="#000" stroke-dasharray="0.264, 0.264" stroke-width=".264">
   <path d="m38.1 138.96h121.36"/>
   <path d="m38.1 144.6h121.36"/>
   <path d="m38.1 150.24h121.36"/>
   <path d="m38.1 155.89h121.36"/>
   <path d="m38.1 161.53h121.36"/>
   <path d="m38.1 167.18h121.36"/>
  </g>
  <g fill="#000000" font-family="sans-serif" letter-spacing="0px" word-spacing="0px">
   <g stroke-width=".26458">
    <text x="21.959648" y="147.24031" style="line-height:0%" xml:space="preserve"><tspan x="21.959648" y="147.24031" font-size="3.5278px" stroke-width=".26458" style="line-height:1.25">Tile T1</tspan></text>
    <text x="21.959648" y="153.32965" style="line-height:0%" xml:space="preserve"><tspan x="21.959648" y="153.32965" font-size="3.5278px" stroke-width=".26458" style="line-height:1.25">Tile T2</tspan></text>
    <text x="21.959648" y="159.4147" style="line-height:0%" xml:space="preserve"><tspan x="21.959648" y="159.4147" font-size="3.5278px" stroke-width=".26458" style="line-height:1.25">Tile T3</tspan></text>
    <text x="21.959648" y="142.83774" style="line-height:0%" xml:space="preserve"><tspan x="21.959648" y="142.83774" font-size="3.5278px" stroke-width=".26458" style="line-height:1.25">Mem<tspan baseline-shift="sub" font-size="2.1167px">read</tspan></tspan></text>
   </g>
   <text x="34.560432" y="165.27179" stroke-width="1px" text-align="end" text-anchor="end" style="line-height:0%" xml:space="preserve"><tspan x="34.560432" y="165.27179" font-size="3.5278px" style="line-height:1.25">Mem<tspan baseline-shift="sub" font-size="2.1167px">write</tspan></tspan></text>
  </g>
  <g stroke="#000" stroke-width=".264">
   <rect x="38.1" y="138.96" width="31.044" height="5.6444" fill="#fff"/>
   <rect x="43.744" y="144.6" width="31.044" height="5.6444" :fill="colors[0]"/>
   <rect x="46.567" y="150.24" width="31.044" height="5.6444" :fill="colors[1]"/>
   <rect x="40.922" y="155.89" width="31.044" height="5.6444" :fill="colors[2]"/>
   <rect x="49.389" y="161.53" width="31.044" height="5.6444" fill="#fff"/>
   <rect x="80.433" y="138.96" width="31.044" height="5.6444" fill="#fff"/>
   <rect x="86.078" y="144.6" width="31.044" height="5.6444" :fill="colors[0]"/>
   <rect x="83.256" y="150.24" width="31.044" height="5.6444" :fill="colors[1]"/>
   <rect x="88.9" y="155.89" width="31.044" height="5.6444" :fill="colors[2]"/>
   <rect x="91.722" y="161.53" width="31.044" height="5.6444" fill="#fff"/>
   <rect x="122.77" y="138.96" width="31.044" height="5.6444" fill="#fff"/>
   <rect x="125.59" y="144.6" width="31.044" height="5.6444" :fill="colors[0]"/>
   <rect x="128.41" y="161.53" width="31.044" height="5.6444" fill="#fff"/>
  </g>
  <g fill="none" stroke="#f00" stroke-width=".182">
   <path d="m38.1 144.6c1e-5 2.8222 0.56445 11.571 2.54 14.111" marker-end="url(#marker5416)"/>
   <path d="m40.922 155.89c0-2.8222 0.28222-5.6444 2.2578-8.1844" marker-end="url(#marker5416-5)"/>
   <path d="m43.744 150.24c0 1.4111 0 1.4111 2.2578 2.8222" marker-end="url(#marker5416-2)"/>
   <path d="m46.567 155.89c0 2.8222 0.28222 5.9267 2.2578 8.4667" marker-end="url(#marker5416-59)"/>
  </g>
  <g fill="#000000" font-family="sans-serif" letter-spacing="0px" word-spacing="0px">
   <g stroke-width=".564" text-anchor="middle">
    <text x="56.463387" y="160.12653" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="56.463387" y="160.12653" font-size="3.8806px" style="line-height:1.25">L1</tspan></text>
    <text x="59.205086" y="148.86226" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="59.205086" y="148.86226" font-size="3.8806px" style="line-height:1.25">L2</tspan></text>
    <text x="62.047203" y="154.47736" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="62.047203" y="154.47736" font-size="3.8806px" style="line-height:1.25">L3</tspan></text>
    <text x="98.683983" y="154.47736" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="98.683983" y="154.47736" font-size="3.8806px" style="line-height:1.25">L4</tspan></text>
    <text x="101.5498" y="148.80354" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="101.5498" y="148.80354" font-size="3.8806px" style="line-height:1.25">L5</tspan></text>
    <text x="104.33981" y="160.11894" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="104.33981" y="160.11894" font-size="3.8806px" style="line-height:1.25">L6</tspan></text>
    <text x="141.04575" y="148.83292" text-align="center" style="line-height:0%" xml:space="preserve"><tspan x="141.04575" y="148.83292" font-size="3.8806px" style="line-height:1.25">L7</tspan></text>
   </g>
   <text x="46.667" y="135.53645" stroke-width="1px" text-align="end" text-anchor="end" style="line-height:0%" xml:space="preserve"><tspan x="46.667" y="135.53645" font-size="3.5278px" style="line-height:1.25">Time</tspan></text>
  </g>
  <path d="m38.1 136.13h23.989" fill="none" marker-end="url(#TriangleOutL)" stroke="#000" stroke-width=".282"/>
  <path d="m38.1 167.18v-28.222" fill="none" stroke="#000" stroke-dasharray="0.282, 0.282" stroke-width=".282"/>
  <g fill="#000000" font-family="sans-serif" letter-spacing="0px" stroke-width="1px" text-anchor="end" word-spacing="0px">
   <text x="54.774254" y="143.47214" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="54.774254" y="143.47214" font-size="3.8806px" style="line-height:1.25">R</tspan></text>
   <text x="97.107597" y="143.18846" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="97.107597" y="143.18846" font-size="3.8806px" style="line-height:1.25">R</tspan></text>
   <text x="139.44092" y="143.18846" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="139.44092" y="143.18846" font-size="3.8806px" style="line-height:1.25">R</tspan></text>
   <text x="66.827705" y="165.76624" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="66.827705" y="165.76624" font-size="3.8806px" style="line-height:1.25">W</tspan></text>
   <text x="109.16103" y="165.76624" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="109.16103" y="165.76624" font-size="3.8806px" style="line-height:1.25">W</tspan></text>
   <text x="145.84991" y="165.76624" text-align="end" style="line-height:0%" xml:space="preserve"><tspan x="145.84991" y="165.76624" font-size="3.8806px" style="line-height:1.25">W</tspan></text>
  </g>
 </g>
</svg>
            </div>

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
import type { Individual, DataType, ResNetAssignment } from "./database";

import data_ from "@/../data/data.json";
import accurate_data_ from "@/../data/accurate.json";
import { nnConfig, multConfig } from './nns.ts';
import type {NNConfigItem} from './nns.ts'; 

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

let detailid = ref({idx: null as number | null, accurate: false});
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
        let d = ((detailid.value.accurate) ? filteredAccurateData.value[0] : runData.value.data[detailid.value.idx]) as Detail;
        if (filteredAccurateData.value.length) {
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
    d.layer_macs = d.layers_list.map((l : string) => d.layers[l]);
    return d;
});

let detailAssignments = computed(() => {
    if (detail.value === null) return null;
    let tiles = detail.value.tiles;

    return {
        layers: (detail.value.chrom.slice(tiles) as number[]).map((c) => ({
            mul_index: c,
            mul: (detail.value && detail.value.chrom[c]) ? detail.value.chrom[c] : '',
            mul_power_ratio: (detail.value && detail.value.chrom[c]) ? multConfig.power[detail.value.chrom[c]] / multConfig.power[multConfig.accurate] : 1.0,
            tiles: tiles
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

a.last {
    text-decoration: none;
}
</style>