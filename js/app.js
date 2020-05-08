var app = angular.module('PredictionApp', ['ngRoute']);
app.config( function ($routeProvider) {
    $routeProvider
        .when('/calibration', {
            controller: 'CalibrationController',
            templateUrl: 'views/calibration.html'
        })
        .when('/workspace', {
            controller: 'WorkspaceController',
            templateUrl: 'views/workspace.html'
        })
        .otherwise({
            redirectTo: '/calibration'
        });
});