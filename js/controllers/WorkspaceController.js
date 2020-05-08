app.controller('WorkspaceController', ['$scope', function ($scope) {
    // create configuration object
    let datapoint = {};
    let datapoints = [];
    let index = 0;
    var config = {
        container: document.querySelector('.heatmap'),
        radius: 90,
    };
    var heatmapInstance = h337.create(config);
    webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
            return;
        }
        heatmapInstance.addData({
            x: data.x,
            y: data.y,
            value:1
        });
        // console.log(datapoint)
       // datapoints.push(datapoint);
       //
       //  index = index + 1;
       //  if (index == 20) {
       //      heatmapInstance.addData(datapoints);
       //      console.log('in index',datapoints);
       //      index = 0;
       //  }
       //  // console.log(datapoints)
       //  //heatmapInstance.addData(datapoint);

    });

}]);