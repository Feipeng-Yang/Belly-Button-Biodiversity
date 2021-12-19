// This code is partly taken from Dom's office hour section on Dec 11. 
console.log("This is plots.js..");

function DrawBarChart(sampleId) {
    console.log(`DrawBarChart (${sampleId})`);

    d3.json("samples.json").then(data => {
        // console.log(data);
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id ===sampleId);
        let result = resultArray[0];
        // console.log(result);
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let yticks = otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`).reverse();
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        };
        let barArray = [barData];
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }
        Plotly.newPlot("bar", barArray, barLayout);
    });
}

function DrawBubbleChart(sampleId) {
    console.log(`DrawBubbleChart (${sampleId})`);
    d3.json("samples.json").then(data => {
        console.log(data);
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id ===sampleId);
        let result = resultArray[0];
        // console.log(result);
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;
        let barData = {
            x: otu_ids,
            y: sample_values,
            type: "scatter",
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Portland"
              },
            text: otu_labels

        };
        let bubbleArray = [barData];
        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30, l: 30}
        }
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}


function ShowMetaData(sampleId) {
    console.log(`ShowMetaData (${sampleId})`);
    d3.json("samples.json").then(data => {
        let metadata  = data.metadata;
        // console.log(metadata);
        let metaArray = metadata.filter(m => m.id === parseInt(sampleId));
        let result = metaArray[0];
        let demoArray = Object.entries(result);
        console.log(demoArray);
        let selector = d3.select("#sample-metadata");
        selector.html("");
        demoArray.forEach(([key,value]) => {
            selector.append("p")
                .text(`${key}:${value}`);
        });
    });
}


function DrawGaugeChart(sampleId) {
    console.log(`DrawGaugeChart (${sampleId})`);
    d3.json("samples.json").then(data => {
        // console.log(data);
        let metadata  = data.metadata;
        // console.log(metadata);
        let metaArray = metadata.filter(m => m.id === parseInt(sampleId));
        let result = metaArray[0];

        let sampdata = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: result.wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] }
                  }
            }
        ];
        
        let layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };


        Plotly.newPlot("gauge", sampdata, layout);
    });
}

function optionChanged(id) {
    console.log(`optionChanged (${id})`);

    // Display the barChart
    DrawBarChart(id);

    DrawBubbleChart(id);

    DrawGaugeChart(id);

    ShowMetaData(id);
    // Display the bubbleChart

    // Populate demographic infor
}


function InitDashboard()
{
    console.log("Initializing Dashboard.");

    let selector = d3.select("#selDataset");

    d3.json("samples.json").then(data=>{
        // console.log(data);

        let sampleNames = data.names;

        sampleNames.forEach(sampleId => {

            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);

        });

        let sampleId = sampleNames[0];

        DrawBarChart(sampleId);
        DrawBubbleChart(sampleId);
        DrawGaugeChart(sampleId);
        ShowMetaData(sampleId);


    });
}


InitDashboard();