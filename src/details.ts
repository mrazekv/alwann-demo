import { nnConfig, multConfig } from './nns.ts';
import { Individual } from './database.ts';
import {interpolateViridis} from "d3-scale-chromatic";


export function showDetails(element: HTMLDivElement, multData: Individual, selectedModel: string) {
    element.innerHTML = '';
    console.log(multData);

    var nnc = nnConfig[selectedModel];

    // find all used mults
    //var mults = new Set<string>();

    /*
    Object.keys(multData["multconf"]).forEach((key) => {
        mults.add(multData["multconf"][key]);
    });*/

    // go throuch first tiles in chromsome : mults is chromosome[0:tiles]
    var mults = multData.chrom.slice(0, multData.tiles); //.map((mult) => multData.multconf[mult]));

    console.log(mults);

    // declare multClasses as dictionary of strings


    //foreach mult in mults add a new div
    // Convert mults set to array and sort by power




    Array.from(mults).sort((a, b) => multConfig["power"][a] - multConfig["power"][b]).forEach((mult) => {
        var div = document.createElement('div');
        // set class mult-info
        div.classList.add("mult-info");
        div.innerHTML = "<p class=\"name\">" + mult + "</p><p class=\"info\">";
        div.innerHTML += "<i>power</i>: " + multConfig["power"][mult] + " mW<br>";
        div.innerHTML += "<i>area</i>: " + multConfig["area"][mult] + " um2<br>";
        div.innerHTML += "<i>delay</i>: " + multConfig["delay"][mult] + " ns<br>";
        
        div.innerHTML += "<i>mae</i>: " + multConfig["mae_pct"][mult]  + "%<br>";
        // ep_pct
        div.innerHTML += "<i>ep</i>: " + multConfig["ep_pct"][mult] + "%<br>";
        // wce_pct
        div.innerHTML += "<i>wce</i>: " + multConfig["wce_pct"][mult] + "%<br>";

        div.innerHTML += "</p>";

        var powerRange = multConfig["power"][mult] / multConfig["power"]["mul8u_1JFF"];

        if(powerRange < 0.5) {
            div.style.color = "white";
        }
        var color = interpolateViridis(powerRange);
        div.style.backgroundColor = color;

        // set class mult-multid
        //div.classList.add("mult-" + modelid);
        element.appendChild(div);
    });

    var div_layers = document.createElement('div');
    div_layers.classList.add("layers");

    // foreach layer defined in nnc 
    

    var layer_id = 0;
    nnc.layers_list.forEach((layer) => {
        var div = document.createElement('div');
        div.classList.add("layer-info");
        var layerName = layer;
        // replace resnet/tower_0/ with empty string
        layerName = layerName.replace("resnet/tower_0/", "");
        layerName = layerName.replace("/Conv2D/eightbit", "");

        div.innerHTML = "<p class=\"name\">Conv2D(" + multData.multconf[layer_id] + ")</p>";
        div.innerHTML += "<p class=\"layer\">" + layerName + "</p>";
        div.innerHTML += "<p class=\"info\">";
        div.innerHTML += "<i>ops</i>: " + (nnc.layers[layer] / 1e6).toFixed(1) + "M (" + ((nnc.layers[layer] / nnc.multcnt) * 100).toFixed(2) + "%)<br>";
        /*div.innerHTML += "<i>latency</i>: " + layer["latency"] + "<br>";
        div.innerHTML += "<i>mults</i>: ";
        // foreach mult in layer["mults"]
        layer["mults"].forEach((mult) => {
            div.innerHTML += "<span class=\"" + multClasses[mult] + "\">" + mult + "</span> ";
        });*/
        div.innerHTML += "</p>";
        var powerRange = multConfig["power"][multData.multconf[layer_id]] / multConfig["power"]["mul8u_1JFF"];
        if(powerRange < 0.5) {
            div.style.color = "white";
        }
        var color = interpolateViridis(powerRange);
        div.style.backgroundColor = color;
        div_layers.appendChild(div);

        layer_id++;
    }

    );
    element.appendChild(div_layers);
}