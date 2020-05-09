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

        datapoints.push({
            x:data.x,
            y:data.y,
            value:16
        })

        datapoints.forEach((item) =>{
            for(let i = -config.radius; i < config.radius; i++){
                for(let j = -config.radius; j < config.radius; j++){
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

    });
}]);