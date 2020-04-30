app.controller('WorkspaceController', ['$scope', '$heatmap', function($scope, $heatmap) {

        function generateRandomData(len) {
            var max = 100;
            var min = 1;
            var maxX = document.body.clientWidth;
            var maxY = document.body.clientHeight;
            var data = [];
            while (len--) {
                data.push({
                    x: ((Math.random() * maxX) >> 0),
                    y: ((Math.random() * maxY) >> 0),
                    radius: ((Math.random() * 50 + min) >> 0)
                });
            }
            return {
                max: max,
                min: min,
                data: data
            }
        };

        $scope.heatmapData = generateRandomData(1000);
        $scope.heatmapConfig = {
            blur: .9,
            opacity:.5
        };

        $scope.updateData = function() {
            $scope.heatmapData = generateRandomData(1000);
        }
}]);