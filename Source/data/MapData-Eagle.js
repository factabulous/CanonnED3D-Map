$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

var canonnEd3d_thargoids = {

    //Define Categories
    systemsData: {
        "categories": {
            "Points of Interest - POI": {
                "100": {
                    "name": "System",
                    "color": "F7F7F7"
                },
            },
            "Eagle Eye": {
                "800": {
                    "name": "Eagle Eye",
                    "color": "ffbf00"
                },
                "801": {
                    "name": "Thargoid Site",
                    "color": "33cc33"
                },
                "802": {
                    "name": "Target Site",
                    "color": "ff0000"
                },				
                "803": {
                    "name": "EagleEye to Thargoid",
                    "color": "0099ff"
                },
				"804": {
                    "name": "Thargoid to Target",
                    "color": "cc33ff"
                },				
            }
        },
        "routes": [],
        "systems": [{
            "name": "Sol",
            "coords": {
                "x": "0",
                "y": "0",
                "z": "0"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "Col 70 Sector FY-N c21-3",
            "coords": {
                "x": "687.0625",
                "y": "-362.53125",
                "z": "-697.0625"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "Merope",
            "coords": {
                "x": "-78.59375",
                "y": "-149.625",
                "z": "-340.53125"
            },
            "cat": [
                "100"
            ]
        }, {
            "name": "HIP 22460",
            "coords": {
                "x": "-41.3125",
                "y": "-58.96875",
                "z": "-354.78125"
            },
            "cat": [
                "100"
            ]
        }, ]
    },


    formatHD: function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].From && data[i].From.replace(" ", "").length > 1) {

                var hdFrom = {}
                hdFrom["name"] = data[i].From;

				if ( data[i].Leg == 1 ) {                
					hdFrom["cat"] = [800];
					hdFrom["coords"] = {
						"x": parseFloat(data[i].FromX),
						"y": parseFloat(data[i].FromY),
						"z": parseFloat(data[i].FromZ)
					};
				}

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(hdFrom);

                var hdTo = {}
                hdTo["name"] = data[i].To;
				
				

                //Ripe or Dead Status not enabled yet, pending CSV fixes
				if ( data[i].Leg == 1 ) {
					hdTo["cat"] = [801];
					hdTo["coords"] = {
						"x": parseFloat(data[i].ToX),
						"y": parseFloat(data[i].ToY),
						"z": parseFloat(data[i].ToZ)
					};
				} else {
						hdTo["cat"] = [802];
						hdTo["coords"] = {
						"x": parseFloat(data[i].ToX),
						"y": parseFloat(data[i].ToY),
						"z": parseFloat(data[i].ToZ)
						}
				}

                // We can then push the site to the object that stores all systems
                canonnEd3d_thargoids.systemsData.systems.push(hdTo);

                var hdRoute = {};

                //hdRoute["title"] = "CMDR " + data[i].CMDR + " " + data[i].From + " to " + data[i].To
                hdRoute["points"] = [{
                    "s": data[i].From,
                    "label": data[i].From
                }, {
                    "s": data[i].To,
                    "label": data[i].To
                }]
				if ( data[i].Leg == 1 ) {
					hdRoute["cat"] = [803]
					hdRoute["circle"] = false
				} else {
					hdRoute["cat"] = [804]
					hdRoute["circle"] = false
				}
				
                

                canonnEd3d_thargoids.systemsData.routes.push(hdRoute);
            }
        }
    },



 
 


    parseData: function (url, callBack, resolvePromise) {
        Papa.parse(url, {
            download: true,
            header: true,
            complete: function (results) {

                callBack(results.data);

                // after we called the callback
                // (which is synchronous, so we know it's safe here)
                // we can resolve the promise

                resolvePromise();
            }
        });
    },

    init: function () {





        // Thargoid Hyperdictions
        var p6 = new Promise(function (resolve, reject) {
            canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vRg80RqBciPxdT2OdQ1N_7MpL_2vZ_6A_bJsfvCvyhkjqXNQaWbaQNcgfslF1LM1UeB9yx5hdmTIqrf/pub?gid=2119042982&single=true&output=csv", canonnEd3d_thargoids.formatHD, resolve);
        });

        //var p7 = new Promise(function (resolve, reject) {
        //	canonnEd3d_thargoids.parseData("https://docs.google.com/spreadsheets/d/e/2PACX-1vS3sabePivfqUNdCie_7UPA6cBHzXVNtFfTP6JnHfcQez4GWQoRRkTxvzIRBNnNbDV2ATfEg0iGK0Cj/pub?gid=640903479&single=true&output=csv", canonnEd3d_thargoids.formatVS, resolve);
        //});


        Promise.all([p6]).then(function () {
            Ed3d.init({
                container: 'edmap',
                json: canonnEd3d_thargoids.systemsData,
                withHudPanel: true,
                hudMultipleSelect: true,
                effectScaleSystem: [28, 10000],
                startAnim: false,
                showGalaxyInfos: true,
                cameraPos: [25, 14100, -12900],
                systemColor: '#FF9D00'
            });
        });
    }
};