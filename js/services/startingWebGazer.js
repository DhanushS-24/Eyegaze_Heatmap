app.factory('startingWebGazer', function () {
    return {
       startgazer: function () {
            webgazer.begin()
                .showPredictionPoints(true);
       }}
});