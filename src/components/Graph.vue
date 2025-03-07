<template>
    <div ref="plotly"></div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, onMounted, defineProps, defineEmits } from "vue";

import Plotly from 'plotly.js-dist';
import { Individual } from "../database";

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
        type: Number,
        default: -1,
    }
});

const emit = defineEmits(['point-clicked']);

const plotly = ref();

var t1 = {
    x: [0.1, 0.5] as number[],
    y: [10, 50] as number[],
    records: [] as Individual[],
    type: 'scatter',
    // no lines
    mode: 'markers',
    marker: { size: 12, color: '#e4002b' },
    hovertemplate: 'Power: %{x:.3f} mW<br>Accuracy: %{y:.2f}%<extra></extra>',
    // hide legend
    //showlegend: true
    name: 'Candidate solutions'
};

var t2 = {
    x: [] as number[],
    y: [] as number[],
    records: [] as Individual[],
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
        //console.log(props/.data.fullData[ind]);
        //    showDetails(document.querySelector<HTMLDivElement>("#elementDetails")!, data.points[0].data.fullData[ind], model);
        //alert("klik " + data.points[0].x + " ");
        // get the power value
        //data.points[0].data.fullData[ind]
        emit('point-clicked', { data: data.points[0].data, record: data.points[0].data.records[ind], index: ind });
    });


    watchEffect(() => {
        if (!plotly.value) return;
        console.log('plot new data');
        t1.x = [...props.data.x];
        t1.y = [...props.data.y];
        t1.records = [...props.data.records];
        //console.log('t1', t1, plotly.value);
        t2.x = [...props.data2.x];
        t2.y = [...props.data2.y];
        t2.records = [...props.data2.records];

        t3.x = [];
        t3.y = [];
        if ((props.highlight >= 0) && (props.highlight < props.data.x.length)) {
            t3.x = [props.data.x[props.highlight]];
            t3.y = [props.data.y[props.highlight]];
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