import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { showDetails } from './details.ts'
import Plotly from 'plotly.js-dist';
import { Individual, DataType } from './database.ts';


//import * as a from "../data/data.json";
// import ../data/data.json as mixed array
import a from "../data/data.json" assert { type: "json" };
import aacc from "../data/accurate.json" assert { type: "json" };





const data: DataType[] = a as DataType[];

const accurate_data: DataType[] = aacc as DataType[];

console.log("Orig data");
console.log(data);
console.log(accurate_data);


var model = 'resnet_14_v2';
var systolic = 'systolic_np_a3';

function filterData(data: DataType[], model: string, systolic: string) {
  filteredAccurate = accurate_data.filter((d) => d["model"] === model)[0]["data"];
  console.log(filteredAccurate);
  return data.filter((d) => d["model"] === model && d["systolic"] === systolic);
}

function getRuns(data: DataType[]) {
  return data.map((d) => d["run"]).sort((a, b) => a - b);
}

function getRunData(data: DataType[], run: number) {
  // return the first element of the filtered data
  return data.filter((d) => d["run"] === run)[0];
}

var filteredData = filterData(data, model, systolic);
var filteredAccurate: any = accurate_data.filter((d) => d["model"] === model)[0]["data"];

var runs = getRuns(filteredData);

console.log(getRuns(filteredData));


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>

    <select id="model"></select>
    <select id="systolic"></select>

    <!--<a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>-->
    <h2>Generation <span id="generations">0</span></h2>
    <div id="myDiv"></div>
    <button class="rundis" id="runAnimation">Optimize</button>
    <button id="restart">Random</button>
    <button class="rundis" id="final">Final solution</button>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div id="elementDetails"></div>
    <div id='hoverinfo'></div>
  </div>
`


// log a structure from the JSON file

// fill model (select) with unique values
var modelSelect = document.querySelector<HTMLSelectElement>('#model')!;
var models = Array.from(new Set(data.map((d) => d["model"])));
models.forEach((m) => {
  var option = document.createElement('option');
  option.text = m.replace("resnet_", "ResNet ").replace("_v2", "");
  option.value = m;
  if (m === model) {
    option.selected = true;
  }
  modelSelect.add(option);
});

var systolicSelect = document.querySelector<HTMLSelectElement>('#systolic')!;
function refreshSystolic() {
  // fill systolic (select) with unique values
  var systolics = Array.from(new Set(data.filter(
    (d) => d["model"] === model
  ).map((d) => d["systolic"])));
  systolicSelect.innerHTML = '';
  systolics.forEach((s) => {
    var option = document.createElement('option');
    if (s.includes("np")) {
      option.text = s.replace("systolic_", "").replace("np_a", "Power gated ") + " tiles";
    } else {
    option.text = s.replace("systolic_", "").replace("a", "Permuted ") + " tiles";
    }
    option.value = s;
    systolicSelect.add(option);
  });
}
refreshSystolic();

modelSelect.addEventListener('change', () => {
  model = modelSelect.value;
  refreshSystolic();
  systolic = systolicSelect.value;
  filteredData = filterData(data, model, systolic);
  runs = getRuns(filteredData);
  setFirstData();

});

systolicSelect.addEventListener('change', () => {
  systolic = systolicSelect.value;
  filteredData = filterData(data, model, systolic);
  runs = getRuns(filteredData);
  setFirstData();
});


var t1 = {
  x: [0.1, 0.5],
  y: [10, 50],
  type: 'scatter',
  // no lines
  mode: 'markers',
  fullData: [] as Individual[], // new list of individuals
  marker: { size: 12 },
  hovertemplate: 'Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',
  // hide legend
  showlegend: false
};

var t2 = {
  x: [],
  y: [],
  fullData: [] as Individual[], // just as hint
  type: 'scatter',
  // no lines
  mode: 'markers',
  marker: { size: 12 },
  showlegend: false,
  hovertemplate: 'ACCURATE<br>Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',

};

var plotly_data = [t1, t2];

Plotly.newPlot('myDiv', plotly_data, {
  margin: { t: 0 },
  title: 'Auto-Resize',
  yaxis: { range: [0, 100], autorange: false, title: { text: 'Accuracy [%]' } },
  xaxis: { range: [0, 0.4], title: { text: 'Power [mW]' } },
  hovermode: 'closest',
  width: 800
});


// onclick to myDiv plotly_click
(document.querySelector('#myDiv') as any).on('plotly_click', function (data: any) {
  console.log(data);
  var ind = data.points[0].pointIndex;
  console.log(data.points[0].data.fullData[ind]);
  showDetails(document.querySelector<HTMLDivElement>("#elementDetails")!,
    data.points[0].data.fullData[ind],
    model);
  //alert("klik " + data.points[0].x + " ");
  // get the power value
});


function setData(dataAll: any) {

  // hide details
  document.querySelector<HTMLDivElement>("#elementDetails")!.innerHTML = '';

  //return;
  var data: Individual[] = dataAll["data"];
  console.log(dataAll);
  t1["x"] = data.map((d) => d["power"]);
  t1["y"] = data.map((d) => d["accuracy"] * 100.0);
  t1["fullData"] = data;

  t2["x"] = filteredAccurate.map((d: Individual) => d["power"]);
  t2["y"] = filteredAccurate.map((d: Individual) => d["accuracy"] * 100.0);
  t2["fullData"] = filteredAccurate;

  // accurate data
  console.log(filteredAccurate);


  // if transition update with 100ms transition

  //Plotly.update('myDiv', update, {});


  Plotly.redraw('myDiv');

  document.querySelector<HTMLSpanElement>('#generations')!.innerText = dataAll["run"];

  //Plotly.restyle('myDiv', update);
}



function setFirstData() {
  if (runs[0] !== undefined) {
    setData(getRunData(filteredData, runs[0]));

    // show runAnimation button
    document.querySelector<HTMLButtonElement>('#runAnimation')!.style.display = 'inline-block';
    // hide self
    document.querySelector<HTMLButtonElement>('#restart')!.style.display = 'none';

  } else {
    console.error("No runs available");
  }
}

setFirstData();

// set hover action on scatter
(document.querySelector<HTMLDivElement>('#myDiv') as any).addEventListener('plotly_hover', function (data: any) {
  var infotext = data.points.map(function (d: any) {
    return ('x=' + d.x + ' y=' + d.y.toPrecision(3));
  });

  document.querySelector<HTMLDivElement>('#hoverinfo')!.innerHTML = infotext.join('<br/>');
}
);

document.querySelector<HTMLButtonElement>('#runAnimation')!.addEventListener('click', () => {

  // go over all runs and display with 1 second delay
  var i = 0;

  // set runAnimation button class to running
  document.querySelector<HTMLButtonElement>('#runAnimation')!.classList.add('running');
  // disable button
  document.querySelector<HTMLButtonElement>('#runAnimation')!.disabled = true;
  document.querySelector<HTMLButtonElement>('#final')!.disabled = true;
  var interval = setInterval(() => {

      if (runs[i] !== undefined) {
        setData(getRunData(filteredData, runs[i]));
      }
      i++;
    if (i >= runs.length) {
      clearInterval(interval);
      // hide runAnimation button
      document.querySelector<HTMLButtonElement>('#runAnimation')!.style.display = 'none';
      // show restart button
      document.querySelector<HTMLButtonElement>('#restart')!.style.display = 'inline-block';
      // set runAnimation button class to running
      document.querySelector<HTMLButtonElement>('#runAnimation')!.classList.remove('running');
      // enable button
      document.querySelector<HTMLButtonElement>('#runAnimation')!.disabled = false;
      document.querySelector<HTMLButtonElement>('#final')!.disabled = false;
    }
  }, 200);
});

document.querySelector<HTMLButtonElement>('#restart')!.addEventListener('click', setFirstData);

document.querySelector<HTMLButtonElement>('#final')!.addEventListener('click', () => {

  
  setData(getRunData(filteredData, runs[runs.length - 1]));
  console.log(runs);
});

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

