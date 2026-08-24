fetch("data.json")
    .then(response => response.json())
    .then(data => {

        const traces = [];

        data.films.forEach(film => {

            const dates = film.history.map(point => point.date);

            const counts = film.history.map(
                point => point.shortlist_count
            );

            traces.push({

                x: dates,

                y: counts,

                mode: "lines",

                name: film.title,

                hovertemplate:
                    "<b>" + film.title + "</b><br>" +
                    "Date: %{x}<br>" +
                    "Likes: %{y:,}" +
                    "<extra></extra>"
            });

        });


        const layout = {

            title: {
                text: "2026 — Most Liked",
                font: {
                    size: 24
                }
            },

            xaxis: {
                title: "Date collected"
            },

            yaxis: {
                title: "Likes",
                rangemode: "tozero"
            },

            hovermode: "closest",

            legend: {
                orientation: "v"
            },

            margin: {
                l: 70,
                r: 220,
                t: 80,
                b: 70
            }
        };


        const config = {

            responsive: true,

            displayModeBar: true

        };


        Plotly.newPlot(
            "chart",
            traces,
            layout,
            config
        );

    })

    .catch(error => {

        console.error("Could not load data.json:", error);

        document.getElementById("chart").innerHTML =
            "<p>Unable to load historical data.</p>";

    });
