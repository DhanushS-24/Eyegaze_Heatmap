app.controller('WorkspaceController', ['$scope', function ($scope) {
    let datapoints = [];

    let max = 0;

    var config = {
        container: document.querySelector('.heatmap'),
        radius: 50,
    };

    var heatmapInstance = h337.create(config);
    webgazer.setGazeListener(function (data, elapsedTime) {

        let valpoint = 0;

        if (data == null) {
            return;
        }

        try {
            let elem = document.querySelector('.heatmap').getBoundingClientRect()


            datapoints.push({
                x: (data.x - elem.left),//these x coordinates are relative to the viewport
                y: (data.y - elem.top),//these y coordinates are relative to the viewport
                value: 16
            })
            datapoints.forEach((item) => {
                for (let i = -config.radius; i < config.radius; i++) {
                    for (let j = -config.radius; j < config.radius; j++) {
                        try {
                            if ((item.x + i) === data.x && (item.y + j) === data.y) {
                                valpoint = valpoint + 1;
                            }
                        } catch (e) {
                            console.log(e);
                        }

                    }
                }
            })
            max = Math.max(max, valpoint);

            let heatmap = {
                max: max,
                min: 0,
                data: datapoints
            };
            heatmapInstance.setData(heatmap);
        } catch (e) {
            console.log(e)
        }

    });
}]);