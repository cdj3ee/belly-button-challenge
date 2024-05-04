// url
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// fetch/console log data
d3.json(url).then(function(data){
    console.log(data);
}); 

// create init function; dropdown with ids
function init(){
    let dropdown = d3.select("#selDataset");

    d3.json(url).then((data) => {
    let ids = data.names;
    console.log(ids);
        for (id of ids){
            dropdown.append("option").attr("value", id).text(id);
        };

    let variable_one = ids[0];
    console.log(variable_one);
    
    // create charts
    makeBar(variable_one);
    makeBubble(variable_one);
    makeDemographics(variable_one);
    });
};

// bar chart
function makeBar(sample){
    d3.json(url).then((data) => {
        let sdata = data.samples;
        let fdata = sdata.filter(id => id.id == sample);
        let variable_one = fdata[0];
        console.log(variable_one);
        let svalues = variable_one.sample_values.slice(0,10);
        let oids = variable_one.otu_ids.slice(0,10);
        let olabels = variable_one.otu_labels.slice(0,10);
        console.log(svalues);
        console.log(oids);
        console.log(olabels);

        let trace = {
            x: svalues.reverse(),
            y: oids.map(item => `OTU ${item}`).reverse(),
            text: olabels.reverse(),
            type: 'bar',
            orientation: 'h'
        };

        let final = {title: "OTU Top 10"};
        Plotly.newPlot("bar", [trace], final);
    });
};

// bubble chart
function makeBubble(sample){
    d3.json(url).then((data) => {
        let sdata = data.samples;
        //creating sample id filter
        let fdata = sdata.filter(id => id.id == sample);
        //logging first result
        let variable_one = fdata[0];
        console.log(variable_one);
        //store the results to display in the bubble chart
        let svalues = variable_one.sample_values;
        let oids = variable_one.otu_ids;
        let olabels = variable_one.otu_labels;
        console.log(svalues);
        console.log(oids);
        console.log(olabels);

        let trace = {
            x: oids.reverse(),
            y: svalues.reverse(),
            text: olabels.reverse(),
            mode: 'markers',
            marker: {
                size: svalues,
                color: oids,
            }
        };

        let final = {
            title: "OTU ID Bacteria",
            xaxis: {title: 'ID'},
            yaxis: {title: '# of Bacteria'}
        };
        Plotly.newPlot('bubble', [trace], final);
    });
};

// demographics
function makeDemographics(sample){
    d3.json(url).then((data) => {
    let demos = data.metadata;
    let fdemos = demos.filter(id => id.id == sample);
    let variable_one = fdemos[0];
    console.log(variable_one);
    d3.select('#sample-metadata').text('');

    Object.entries(variable_one).forEach(([key,value]) => {
        console.log(key,value);

        d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
    });
    
    });
};

//changing the charts when a different selection is made from the dropdown menu
function optionChanged(value){
    console.log(value);
    makeBar(value);
    makeBubble(value);
    makeDemographics(value);
};

init();