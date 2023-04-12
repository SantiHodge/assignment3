const dispatcher = d3.dispatch('filterRegions');
let filteredRegion = [];
let data = [];

d3.csv('africa_country_profile_variables.csv')
    .then(csvData => {
        data = csvData.map(d => {
            d["GDP: Gross domestic product (million current US$)"] = parseFloat(d["GDP: Gross domestic product (million current US$)"]);
            d["Urban population (% of total population)"] = parseFloat(d["Urban population (% of total population)"]);
            d["GDP per capita (current US$)"] = parseFloat(d["GDP per capita (current US$)"]);
            d["Economy: Agriculture (% of GVA)"] = parseFloat(d["Economy: Agriculture (% of GVA)"]);
            d["Economy: Industry (% of GVA)"] = parseFloat(d["Economy: Industry (% of GVA)"]);
            d["Economy: Services and other activity (% of GVA)"] = parseFloat(d["Economy: Services and other activity (% of GVA)"]);
            return d;
        });

        const barchart = new Barchart({parentElement:"#barchart-container", containerHeight: 400}, data);
        barchart.updateVis();
        const scatterplot = new Scatterplot({parentElement:"#scatterplot-container", containerHeight: 400}, data);
        scatterplot.updateVis();

        d3.select('body').append('button').text('Show All Data').on('click', function () {
            // Clear filteredRegion array
            filteredRegion = [];
            // Update scatterplot to show all data points
            scatterplot.data = data;
            scatterplot.updateVis();
        });

        d3.select('body').append('button').text('Just on Northern Africa').on('click', function () {
            const searchString = "NorthernAfrica";
            scatterplot.data = data.filter(d => d.Region === searchString);
            scatterplot.updateVis();
        });

        d3.select('body').append('button').text('Just on Middle Africa').on('click', function () {
            const searchString = "MiddleAfrica";
            scatterplot.data = data.filter(d => d.Region === searchString);
            scatterplot.updateVis();
        });

        d3.select('body').append('button').text('Just on Western Africa').on('click', function () {
            const searchString = "WesternAfrica";
            scatterplot.data = data.filter(d => d.Region === searchString);
            scatterplot.updateVis();
        });

        d3.select('body').append('button').text('Just on Southern Africa').on('click', function () {
            const searchString = "SouthernAfrica";
            scatterplot.data = data.filter(d => d.Region === searchString);
            scatterplot.updateVis();
        });

        dispatcher.on('filterRegions', region =>{
            console.log(region);
            if (region.selected) {
                filteredRegion = filteredRegion.filter(d => d != region.name);
            } else {
                filteredRegion.push(region.name);
            }
            scatterplot.data = data.filter(d => !filteredRegion.includes(d.Region));
            scatterplot.updateVis();
        });
    });
