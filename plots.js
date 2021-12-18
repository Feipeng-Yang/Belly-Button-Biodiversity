console.log("This is plots.js..");

// This code is taken from Dom's office hour section on Dec 11. 

function DrawBarChart(sampleId) {
    console.log(`DrawBarChart (${sampleId})`);
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
        console.log(data);

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