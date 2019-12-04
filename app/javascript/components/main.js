// import "core-js/stable";//эти строки для главной точки входа
// import "regenerator-runtime/runtime";
// import {ClearCalibration} from './calibration'
// import {PopUpInstruction} from './calibration'
var heatmapInstance = null;
window.onload = function() {

    //start the webgazer tracker
    window.datapoints = [] || window.datapoints; window.iscalibration = false || window.iscalibration;
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
            if (true || iscalibration) {
                if (data == null) {
                    return;
                }
                // xprediction = data.x; //these x coordinates are relative to the viewport
                // yprediction = data.y; //these y coordinates are relative to the viewport
                point = {
                    x: data.x,
                    y: data.y,
                    value: 1,
                };

                datapoints.push(point);
                if (!!heatmapInstance){
                    heatmapInstance.addData(datapoints);
                }

                // console.log(datapoints);
            }
           // console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
            //console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */

        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */


    //Set up the webgazer video feedback.
    var setup = function() {

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
    setTimeout(checkIfReady,100);
};

window.onbeforeunload = function() {
    webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
    //window.localStorage.clear(); //Comment out if you want to save data across different sessions
};

/**
 * Restart the calibration process by clearing the local storage and reseting the calibration point
 */
Restart = function(){
    document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
    ClearCalibration();
    PopUpInstruction();
    window.iscalibration = false;
    window.datapoints= [];

};

// document.getElementById("Restbutt").addEventListener("click", Restart, false);
document.addEventListener('click', function(ev) {if(ev.target.id == 'Restbutt')Restart()});
// $(document).on('click', '#Restbutt', Restart);
// Heatmap = function () {
//     var config = {
//         container: document.getElementById('heatmapContainer'),
//         radius: 10,
//         maxOpacity: .5,
//         minOpacity: 0,
//         blur: .75,
//         gradient: {
//             // enter n keys between 0 and 1 here
//             // for gradient color customization
//             '.5': 'blue',
//             '.8': 'red',
//             '.95': 'white'
//         }
//     };
//     var heatmapInstance = h337.create(config);
//     heatmapInstance.addData(datapoints);
// };
var h337 = Heatmap;
// alert(Heatmap.h337);
// setTimeout(function() {
//
// }, 60000);

// document.addEventListener('click',function(ev) {if(ev.target.id == 'showheatmapbutton') Heatmap()} )
var config = {
    container: document.getElementById('heatmapContainer'),
    radius: 10,
    maxOpacity: .5,
    minOpacity: 0,
    blur: .75,
    gradient: {
        // enter n keys between 0 and 1 here
        // for gradient color customization
        '.5': 'blue',
        '.8': 'red',
        '.95': 'white'
    }
};
var heatmapInstance = h337.create(config);
