app.service('startingWebGazer', function () {
    this.startgazer = function () {
        var lol = 0;
        window.onload = function () {
            webgazer.setRegression('ridge') /* currently must set regression and tracker */
                .setTracker('clmtrackr')
                .setGazeListener(function (data, elapsedTime) {
                    if (data == null) {
                        return
                    }
                    var xprediction = data.x; //these x coordinates are relative to the viewport
                    lol = data.x;
                    return xprediction;
                    // var yprediction = data.y; //these y coordinates are relative to the viewport
                }).begin()
                .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */
            console.log(lol);

            var setup = function () {

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
        };


        window.onbeforeunload = function () {
            console.log('user want to left the page');
            //webgazer.end(); //Uncomment if you want to save the data even if you reload the page.
            window.localStorage.clear(); //Comment out if you want to save data across different sessions
        }
    }
});