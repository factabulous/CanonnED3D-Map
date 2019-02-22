var canonnEd3d_poi = {
	init: function () {
                $.getJSON("data/Anemones.json", function(info) { 
                    Ed3d.init({
                            container: 'edmap',
                            json: info, 
                            withFullscreenToggle: false,
                            withHudPanel: true,
                            hudMultipleSelect: true,
                            effectScaleSystem: [50, 10000],
                            startAnim: false,
                            showGalaxyInfos: true,
                            cameraPos: [25, 14100, -12900],
                            systemColor: '#FF9D00'
                    })});
	}
};
