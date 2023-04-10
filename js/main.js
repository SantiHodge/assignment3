d3.csv("africa_country_profile_variables")
    .then(data => {
        // Convert strings to numbers
        data.forEach(d => {
            d.time = +d.time;
            d.distance = +d.distance;
        });

        // Initialize chart
        const scatterplot = new Scatterplot({ parentElement: '#scatterplot'}, data);

        // Show chart
        scatterplot.updateVis();

        const barchart = new Barchart({ parentElement: '#barchart'}, data);

        // Show chart
        barchart.updateVis();
    })
    .catch(error => console.error(error));
