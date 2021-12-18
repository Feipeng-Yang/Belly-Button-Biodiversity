console.log("This is plots.js..");

// This code is taken from Dom's office hour section on Dec 11. 

function DrawBarChart(sampleId) {
    console.log(`DrawBarChart (${sampleId})`);

    d3.json("samples.json").then(data => {
        // console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id ===sampleId);
        let result = resultArray[0];

        console.log(result);

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
}

function ShowMetaData(sampleId) {
    console.log(`ShowMetaData (${sampleId})`);
}



function optionChanged(id) {
    console.log(`optionChanged (${id})`);

    // Display the barChart
    DrawBarChart(id);

    DrawBubbleChart(id);

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
        ShowMetaData(sampleId);


    });
}


InitDashboard();