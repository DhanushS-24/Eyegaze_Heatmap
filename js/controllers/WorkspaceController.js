app.controller('WorkspaceController', ['$scope', 'startingWebGazer', function ($scope, startingWebGazer) {
    // create configuration object
    $scope.startingWebGazer = startingWebGazer;
    console.log($scope.startingWebGazer);
    console.log('data in workspace', $scope.startingWebGazer.startgazer());
}]);