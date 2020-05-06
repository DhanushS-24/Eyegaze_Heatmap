app.controller('WorkspaceController', ['$scope','startingWebGazer', function ($scope, startingWebGazer) {
    // create configuration object
    $scope.startingWebGazer = startingWebGazer;
    var xprediction = startingWebGazer.x;
    var yprediction = startingWebGazer.y;
    //до сюда работает
    console.log('WorkspaceController rabotaet');
console.log(xprediction);
console.log(yprediction);

        //start the webgazer tracker
        // webgazer.setGazeListener(function (data, elapsedTime) {
        //     if (data == null) {
        //         return;
        //     }
        //     xprediction = data.x; //these x coordinates are relative to the viewport
        //     console.log(xprediction) Дату показывает!
            // yprediction = data.y; //these y coordinates are relative to the viewport
            //console.log(yprediction)
            //console.log(elapsedTime); //elapsed time is based on time since begin was called
            var dataPoint = {
                x: xprediction, // x coordinate of the datapoint, a number
                y: yprediction, // y coordinate of the datapoint, a number
                value: 100 // the value at datapoint(x, y)
            };
            //console.log(dataPoint);

            //  heatmapInstance.repaint();
        // }).begin()
        //     .showPredictionPoints(true);


        //Set up the webgazer video feedback.
   /*     var setup = function () {

            //Set up the main canvas. The main canvas is used to calibrate the webgazer.
            var canvas = document.getElementById("plotting_canvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            canvas.style.position = 'fixed';
        };

        function checkIfReady() {
            if (webgazer.isReady()) {
                setup();
            } else {
                setTimeout(checkIfReady, 100);
            }
        }

        setTimeout(checkIfReady, 100);
*/
        // create configuration object
    var config = {
        container: document.getElementById('heatMap'),
        radius: 10,
        maxOpacity: .5,
        minOpacity: 0,
        blur: .75
    };
// create heatmap with configuration
    var heatmapInstance = h337.create(config);
        var heatmapInstance = h337.create(config);
        // create heatmap with configuration
        // var dataPoint = {
        //     x: xprediction, // x coordinate of the datapoint, a number
        //     y: yprediction, // y coordinate of the datapoint, a number
        //     value: 100 // the value at datapoint(x, y)
        // };
        // heatmapInstance.addData(dataPoint);
        // var data = {
        //     max: 100,
        //     min: 0,
        //     data: [
        //         dataPoint, dataPoint, dataPoint, dataPoint
        //     ]
        // };
        // heatmapInstance.setData(data);
        // heatmapInstance.setDataMin(0);
        // heatmapInstance.repaint();
    heatmapInstance.addData(dataPoint);
    heatmapInstance.setDataMax(100);

}]);