<template>
    <div ref="plotly"></div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, defineProps, defineEmits } from "vue";

import Plotly from 'plotly.js-dist';
import type { Individual } from "../database";

const props = defineProps({
    data: {
        type: Object,
        default: { x: [], y: [], records: [] },
    },
    data2: {
        type: Object,
        default: { x: [], y: [], records: [] },
    },
    highlight: {
        type: Object,
        default: { idx: -1, accurate: false},
    }
});

const emit = defineEmits(['point-clicked']);

const plotly = ref();

var t1 = {
    x: [0.1, 0.5] as number[],
    y: [10, 50] as number[],
    records: [] as Individual[],
    recordid: 1,
    type: 'scatter',
    // no lines
    mode: 'markers',
    marker: { size: 12, color: '#e4002b' as string|string[] },
    hovertemplate: 'Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',
    // hide legend
    //showlegend: true
    name: 'Candidate solutions'
};

var t2 = {
    x: [] as number[],
    y: [] as number[],
    records: [] as Individual[],
    recordid: 2,
    type: 'scatter',
    // no lines
    mode: 'markers',
    marker: { size: 12, color: '#808080' },
    //showlegend: true,
    hovertemplate: '<b>Acccurate solution</b><br>Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',
    name: 'Accurate solution'
};

var t3 = {
    x: [] as number[],
    y: [] as number[],
    type: 'scatter',
    // no lines
    mode: 'markers',
    marker: { size: 12, color: '#000000' },
    hovertemplate: 'Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',
    showlegend: false,
};
var plotly_data = [t1, t2, t3];

onMounted(() => {


    Plotly.newPlot(plotly.value, plotly_data, {
        margin: { t: 0 },
        title: 'Auto-Resize',
        yaxis: { range: [0, 100], autorange: false, title: { text: '<b>Accuracy</b> [%]', } },
        xaxis: { range: [0, 0.4], title: { text: '<b>Power</b> [mW]' } },
        hovermode: 'closest',
        modebar: { orientation: 'v' },
        paper_bgcolor: "#ffffffff", //background color of the chart container space
        plot_bgcolor: "#f0f0f0", //background color of plot area
        showlegend: true,
        legend: {
            bgcolor: "rgba(0,0,0,0)",
            x: 0.99,
            xanchor: 'right',
            yanchor: 'bottom',
            y: 0.05
        }
    });

    plotly.value.on('plotly_click', function (data: any) {
        const ind = data.points[0].pointIndex;
        if (!data.points[0].data.records || (data.points[0].data.records.length <= ind)) return;
        //console.log(props/.data.fullData[ind]);
        //    showDetails(document.querySelector<HTMLDivElement>("#elementDetails")!, data.points[0].data.fullData[ind], model);
        //alert("klik " + data.points[0].x + " ");
        // get the power value
        //data.points[0].data.fullData[ind]
        emit('point-clicked', { id: data.points[0].data.recordid, data: data.points[0].data, record: data.points[0].data.records[ind], index: ind });
    });


    watchEffect(() => {
        if (!plotly.value) return;
        console.log('plot new data');
        t1.x = [...props.data.x]; //[...props.data.x,...props.data2.x];
        t1.y = [...props.data.y]; //[...props.data.y,...props.data2.y];
        t1.records = [...props.data.records]; //[...props.data.records,...props.data2.records];
        //t1.marker.color = [...props.data.records.map((r: Individual) => r.isAccurate ? '#808080' : '#e4002b'), ...props.data2.records.map((r: Individual) => '#808080')];
            

        //console.log('t1', t1, plotly.value);
       
        t2.x = [...props.data2.x];
        t2.y = [...props.data2.y];
        t2.records = [...props.data2.records];

        t3.x = [];
        t3.y = [];
        let hilid = (props.highlight.accurate) ? props.data2 : props.data;
        if ((props.highlight.idx >= 0) && (props.highlight.idx  < hilid.x.length)) {
            t3.x = [hilid.x[props.highlight.idx ]];
            t3.y = [hilid.y[props.highlight.idx ]];
        }
        //console.log('t2', t2, plotly.value);
        Plotly.redraw(plotly.value);
    });


});

</script>

<style scoped>
div {
    width: 100%;
    height: 300px;
}
</style>