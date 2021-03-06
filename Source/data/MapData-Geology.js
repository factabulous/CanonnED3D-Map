var canonnEd3d_geology = {

	//Define Categories
	systemsData: {
		"categories": {
			"POI Systems": {
				"100": {
					"name": "Systems - POI",
					"color": "FF9D00"
				}
			},
			"Fumaroles - (FM)": {
				"500": {
					"name": "Fumarole",
					"color": "ffc266"
				}
			},
			"Geysers - (GY)": {
				"800": {
					"name": "Geyser",
					"color": "99ccff"
				}
			},
			"Lave Spouts - (LS)": {
				"1000": {
					"name": "Lave Spout",
					"color": "ff4d4d"
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

	formatFM: function (data) {

		//Here you format FM JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var fmSite = {};
				fmSite["name"] = data[i].system;
				fmSite["cat"] = [500];
				fmSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(fmSite);
			}

		}

	},

	formatGY: function (data) {

		//Here you format GY JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var gySite = {};
				gySite["name"] = data[i].system;
				gySite["cat"] = [800];
				gySite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(gySite);
			}

		}

	},

	formatLS: function (data) {

		//Here you format LS JSON to ED3D acceptable object

		// this is assuming data is an array []
		for (var i = 0; i < data.length; i++) {
			if (data[i].system && data[i].system.replace(" ", "").length > 1) {
				var lsSite = {};
				lsSite["name"] = data[i].system;
				lsSite["cat"] = [1000];
				lsSite["coords"] = {
					"x": parseFloat(data[i].galacticX),
					"y": parseFloat(data[i].galacticY),
					"z": parseFloat(data[i].galacticZ)
				};

				// We can then push the site to the object that stores all systems
				canonnEd3d_geology.systemsData.systems.push(lsSite);
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

		//FM Sites
		var p1 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/fmDataCache.csv", canonnEd3d_geology.formatFM, resolve);
		});

		//GY Sites
		var p2 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/gyDataCache.csv", canonnEd3d_geology.formatGY, resolve);
		});

		//LS Sites
		var p3 = new Promise(function (resolve, reject) {
			canonnEd3d_geology.parseData("data/csvCache/lsDataCache.csv", canonnEd3d_geology.formatLS, resolve);
		});

		Promise.all([p1]).then(function () {
			Ed3d.init({
				container: 'edmap',
				json: canonnEd3d_geology.systemsData,
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