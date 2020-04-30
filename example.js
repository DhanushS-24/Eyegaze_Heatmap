var n = 150;
var m = 150;
var array = [];
for (var i=0; i < n; i++) {
    var row = [];
    for(var j=0; j < m; j++){
        row.push(0);
    }
    array.push(row);
}
app.controller("CalibrationController", ['$scope', function ($scope){
    $scope.data = [];
    $scope.array = array;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var maxNum = 0;
    $scope.maxNum = 1000;
    $scope.drawHeatmap = function() {
        for(var i=0; i<n; i++){
            for(var j=0; j<m; j++){
                var x = ((1.0*width)/m)*j;
                var x1 = (1.0*width)/m*(j+1);
                var y = (1.0*height)/n*i;
                var y1 = (1.0*height/n)*(i+1);

                for(var k=0; k< $scope.data.length; k++){
                    var el = $scope.data[k];
                    if (el.x >= x && el.x <= x1) {
                        if (el.y >= y && el.y <= y1) {
                            array[i][j]++;
                            if(array[i][j]>$scope.maxNum){
                                maxNum = array[i][j];
                            }
                        }
                    }
                }
            }
        }
        $scope.data = [];
        $scope.maxNum = maxNum;
        setTimeout(function(){
            $scope.drawHeatmap();
        },500);
        // alert("boom");
    }

    var prevX = 0;
    var prevY = 0;
    $scope.start = function () {
        //start the webgazer tracker
        webgazer.setRegression('ridge') /* currently must set regression and tracker */
            .setTracker('clmtrackr')
            .setGazeListener(function(data, clock) {
                // alert(JSON.stringify(data));
                // console.log(data);
                if (!!data){
                    if (Math.abs(data.x-prevX)<600 || (0 == prevX)){
                        if (Math.abs(data.y-prevY)<600 || (0==prevY)){
                            $scope.data.push({
                                x: data.x,
                                y: data.y
                            });
                            prevX = data.x;
                            prevY = data.y;
                            if ($scope.data.length % 10 == 0)
                                $scope.$apply();
                        }
                    }

                }
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
            console.log("setup is working!");
        };

        function checkIfReady() {
            if (webgazer.isReady()) {
                setup();
            } else {
                setTimeout(checkIfReady, 100);
            }
            console.log("is ready working");
        }
        setTimeout(checkIfReady,100);

    };
    // alert(2);
}]);

//
// window.onbeforeunload = function() {
//     //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
//     window.localStorage.clear(); //Comment out if you want to save data across different sessions
// }
//
// /**
//  * Restart the calibration process by clearing the local storage and reseting the calibration point
//  */
// function Restart(){
//     document.getElementById("Accuracy").innerHTML = "<a>Not yet Calibrated</a>";
//     ClearCalibration();
//     PopUpInstruction();
// }
//
//
//
// var PointCalibrate = 0;
// var CalibrationPoints={};
//
// /**
//  * Clear the canvas and the calibration button.
//  */
// function ClearCanvas(){
//     $(".Calibration").hide();
//     var canvas = document.getElementById("plotting_canvas");
//     canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
// }
//
// /**
//  * Show the instruction of using calibration at the start up screen.
//  */
// function PopUpInstruction(){
//     ClearCanvas();
//     swal({
//         title:"Calibration",
//         text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
//         buttons:{
//             cancel: false,
//             confirm: true
//         }
//     }).then(isConfirm => {
//         ShowCalibrationPoint();
//     });
//
// }
// /**
//  * Show the help instructions right at the start.
//  */
// function helpModalShow() {
//     // $('#helpModal').modal('show');
// }
//
// /**
//  * Load this function when the index page starts.
//  * This function listens for button clicks on the html page
//  * checks that all buttons have been clicked 5 times each, and then goes on to measuring the precision
//  */
// $(document).ready(function(){
//     ClearCanvas();
//     helpModalShow();
//     $(".Calibration").click(function(){ // click event on the calibration buttons
//
//         var id = $(this).attr('id');
//
//         if (!CalibrationPoints[id]){ // initialises if not done
//             CalibrationPoints[id]=0;
//         }
//         CalibrationPoints[id]++; // increments values
//
//         if (CalibrationPoints[id]==5){ //only turn to yellow after 5 clicks
//             $(this).css('background-color','yellow');
//             $(this).prop('disabled', true); //disables the button
//             PointCalibrate++;
//         }else if (CalibrationPoints[id]<5){
//             //Gradually increase the opacity of calibration points when click to give some indication to user.
//             var opacity = 0.2*CalibrationPoints[id]+0.2;
//             $(this).css('opacity',opacity);
//         }
//
//         //Show the middle calibration point after all other points have been clicked.
//         if (PointCalibrate == 8){
//             $("#Pt5").show();
//         }
//
//         if (PointCalibrate >= 9){ // last point is calibrated
//             //using jquery to grab every element in Calibration class and hide them except the middle point.
//             $(".Calibration").hide();
//             $("#Pt5").show();
//
//             // clears the canvas
//             var canvas = document.getElementById("plotting_canvas");
//             canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
//
//             // notification for the measurement process
//             swal({
//                 title: "Calculating measurement",
//                 text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
//                 closeOnEsc: false,
//                 allowOutsideClick: false,
//                 closeModal: true
//             }).then( isConfirm => {
//
//                 // makes the variables true for 5 seconds & plots the points
//                 $(document).ready(function(){
//
//                     store_points_variable(); // start storing the prediction points
//
//                     sleep(5000).then(() => {
//                         stop_storing_points_variable(); // stop storing the prediction points
//                         var past50 = get_points() // retrieve the stored points
//                         var precision_measurement = calculatePrecision(past50);
//                         var accuracyLabel = "<a>Accuracy | "+precision_measurement+"%</a>";
//                         document.getElementById("Accuracy").innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
//                         swal({
//                             title: "Your accuracy measure is " + precision_measurement + "%",
//                             allowOutsideClick: false,
//                             buttons: {
//                                 cancel: "Recalibrate",
//                                 confirm: true,
//                             }
//                         }).then(isConfirm => {
//                             if (isConfirm){
//                                 //clear the calibration & hide the last middle button
//                                 ClearCanvas();
//                             } else {
//                                 //use restart function to restart the calibration
//                                 ClearCalibration();
//                                 ClearCanvas();
//                                 ShowCalibrationPoint();
//                             }
//                         });
//                     });
//                 });
//             });
//         }
//     });
// });
//
// /**
//  * Show the Calibration Points
//  */
// function ShowCalibrationPoint() {
//     $(".Calibration").show();
//     $("#Pt5").hide(); // initially hides the middle button
// }
//
// /**
//  * This function clears the calibration buttons memory
//  */
// function ClearCalibration(){
//     window.localStorage.clear();
//     $(".Calibration").css('background-color','red');
//     $(".Calibration").css('opacity',0.2);
//     $(".Calibration").prop('disabled',false);
//
//     CalibrationPoints = {};
//     PointCalibrate = 0;
// }
//
// // sleep function because java doesn't have one, sourced from http://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
// function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }
//
//
// // alert(!!window.h337);