mapboxgl.accessToken = 'pk.eyJ1IjoicGV0bzE1OSIsImEiOiJjaXIxc2w4cXowMDdwaTNtZ2VsYnFlOTRrIn0.E4I3oXqYxrr9Bah6HTm4Vg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [2.349, 48.86],
    zoom: 13
});


map.on('load', function() {
    map.addControl(new mapboxgl.Geocoder());


    map.addSource("arrondissements",{
        type: "geojson",
        data: "arrondissements.geojson",
    });
    map.addSource("quartier",{
        type: "geojson",
        data: "quartier_paris.geojson",
    });
    map.addLayer(
        {
            "id": "arrondissements1",
            "source": "arrondissements",
            "type": "line",
            'layout': {},
            'paint' : {
                'line-color': '#008',
                'line-opacity' : 0.2,
                'line-width' : 4.
            }
        }
    );
    map.addLayer(
        {
            "id": "quartier1",
            "source": "quartier",
            "type": "line",
            'layout': {},
            'paint' : {
                'line-color': '#005',
                'line-opacity' : 0.2,
                'line-width' : 2.
            }
        }
    );

    map.addSource("antenas", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "liste-des-antennes-wifi.geojson",
        cluster: true,
        //clusterMaxZoom: 3, // Max zoom to cluster points on
        clusterRadius: 20 // Use small cluster radius for the heatmap look
    });
    var layers = [
        [0, 'green'],
        [2, 'orange'],
        [3, 'red']
    ];


    layers.forEach(function (layer, i) {
        map.addLayer({
            "id": "antenas-" + i,
            "type": "circle",
            "source": "antenas",
            "paint": {
                "circle-color": layer[1],
                "circle-radius": 70,
                "circle-blur": 1 // blur the circles to get a heatmap look
            },
            "filter": i === layers.length - 1 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i + 1][0]]]
        }, 'waterway-label');
    });

    map.addLayer({
        "id": "antenas-5",
        "type": "circle",
        "source": "antenas",
        "paint": {
            "circle-color": 'rgba(0,255,0,0.5)',
            "circle-radius": 20,
            "circle-blur": 1
        },
        "filter": ["!=", "cluster", true]
    }, 'waterway-label');
    turnedOn=0;
    turnedOnButt=null;
    var toggleableLayerIds = [ 'antenas', 'Pure Map' ];
    var toggleableLayers= [['antenas-0','antenas-1','antenas-2','antenas-5'],[]]

    for (var i = 0; i < toggleableLayerIds.length; i++) {
        function name() {
            var id = toggleableLayerIds[i];
            var shadedI = i + 0;
            var link = document.createElement('a');
            link.href = '#';
            link.className = (i == 0) ? 'active' : '';
            link.textContent = id;
            if (i == 0)
            {
                turnedOnButt = link;

            }
            var idds = toggleableLayers[shadedI];
            for (var j = 0; j < idds.length; j++) {
                map.setLayoutProperty(idds[j], 'visibility', (i==turnedOn )?'visible':'none');
            }

            link.onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();

                console.log(turnedOn);
                console.log(turnedOnButt);

                var idds2 = toggleableLayers[turnedOn];
                console.log(idds2);

                for (var j = 0; j < idds2.length; j++) {

                    console.log(idds2[j]);
                    map.setLayoutProperty(idds2[j], 'visibility', 'none');
                    console.log(idds2[j]);
                }
                turnedOnButt.className = '';
                console.log(shadedI + 0);

                var idds = toggleableLayers[shadedI];
                console.log(idds);
                for (var j = 0; j < idds.length; j++) {
                    map.setLayoutProperty(idds[j], 'visibility', 'visible');
                }
                this.className = 'active';
                turnedOnButt = this;
                turnedOn = shadedI;
                console.log(turnedOnButt);
            };

            var menubutton = document.getElementById('menu');
            menubutton.appendChild(link);
        }
        name();
    }
});