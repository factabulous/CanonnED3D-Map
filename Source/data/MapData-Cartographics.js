var canonnEd3d_cartographics = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems - POI",
					"color": "FF9D00"
				}
			},
			"Generation Ships - (GEN)": {
				"600": {
					"name": "Generation Ship",
					"color": "cc00cc"
				}
			},
			"Megaships - (MS)": {
				"1100": {
					"name": "Megaship",
					"color": "5d9a76"
				}
			},
			"Unidentified Signal Source - (USS)": {
				"1400": {
					"name": "Non-Human Signal Source",
					"color": "442299"
				},
				"1401": {
					"name": "Distress Call",
					"color": "4444dd"
				},
				"1402": {
					"name": "Degraded Emissions",
					"color": "11aabb"
				},
				"1403": {
					"name": "Weapons Fire",
					"color": "22ccaa"
				},
				"1404": {
					"name": "Encoded Emissions",
					"color": "a6cc33"
				},
				"1405": {
					"name": "Combat Aftermath",
					"color": "69d025"
				},
				"1406": {
					"name": "Mission Target",
					"color": "aacc22"
				},
				"1407": {
					"name": "High Grade Emissions",
					"color": "d0c310"
				},
				"1408": {
					"name": "Convoy Dispersal Pattern",
					"color": "ccbb33"
				},
				"1409": {
					"name": "Ceremonial Comms",
					"color": "ff9933"
				},
				"1410": {
					"name": "Trading Beacon",
					"color": "ff6644"
				},
				"1411": {
					"name": "Unknown",
					"color": "f80c12"
				}
			}
		},
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
		}]
	},

	formatGEN: function (data) {

		//Here you format GEN JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var genSite = {};
				genSite["name"] = data[i].nameSystem;
				genSite["cat"] = [600];
				genSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(genSite);
			}

		}

	},

	formatMS: function (data) {

		//Format MS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var msSite = {};
				msSite["name"] = data[i].system;
				msSite["cat"] = [1100];
				msSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(msSite);
			}

		}

	},

	formatUSS: function (data) {

		//Here you format USS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var ussSite = {};
				ussSite["name"] = data[i].system;

				//Check Site Type and match categories
				if (data[i].type.toString() == "Non-Human Signal Source") {
					ussSite["cat"] = [1400];
				} else if (data[i].type.toString() == "Distress Call") {
					ussSite["cat"] = [1401];
				} else if (data[i].type.toString() == "Degraded Emissions") {
					ussSite["cat"] = [1402];
				} else if (data[i].type.toString() == "Weapons Fire") {
					ussSite["cat"] = [1403];
				} else if (data[i].type.toString() == "Encoded Emissions") {
					ussSite["cat"] = [1404];
				} else if (data[i].type.toString() == "Combat Aftermath") {
					ussSite["cat"] = [1405];
				} else if (data[i].type.toString() == "Mission Target") {
					ussSite["cat"] = [1406];
				} else if (data[i].type.toString() == "High Grade Emissions") {
					ussSite["cat"] = [1407];
				} else if (data[i].type.toString() == "Convoy Dispersal Pattern") {
					ussSite["cat"] = [1408];
				} else if (data[i].type.toString() == "Ceremonial Comms") {
					ussSite["cat"] = [1409];
				} else if (data[i].type.toString() == "Trading Beacon") {
					ussSite["cat"] = [1140];
				} else {
					ussSite["cat"] = [1419];
				}
				ussSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_cartographics.systemsData.systems.push(ussSite);
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

		//GEN Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/genDataCache.csv", canonnEd3d_cartographics.formatGEN, resolve);
		});

		//MS Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/msDataCache.csv", canonnEd3d_cartographics.formatMS, resolve);
		});

		//USS Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_cartographics.parseData("data/csvCache/ussDataCache.csv", canonnEd3d_cartographics.formatUSS, resolve);
		});

		Promise.all([p1, p2, p3]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_cartographics.systemsData,
				withFullscreenToggle: false,
				withHudPanel: true,
				hudMultipleSelect: true,
				effectScaleSystem: [50, 10000],
				startAnim: false,
				showGalaxyInfos: true,
				cameraPos: [25, 14100, -12900],
				systemColor: '#FF9D00'
			});
		});
	}
};