(function() {
    "use strict";
    var app = angular.module('livestreamerWebGui', []);

    app.controller('MainController', ['$scope', '$http', '$interval',
        function($scope, $http, $interval) {

            var INTERVAL_TIME = 10000; //10 seconds

            $scope.model = {
                'stream': '',
                'port': ''
            };

            $scope.process = null;
            $scope.options = ['--player-continuous-http', '--player-http', '--player-external-http'];

            var check_process = function() {

                $http.get('/process').success(function(result) {
                    console.log(result);
                    update_process(result);
                }).error(function(err) {
                    console.error(err);
                });

            };

            var update_process = function(result) {
                $scope.process = result.process;
            };

            var start_process_check = function() {
                check_process();
                $interval(check_process, INTERVAL_TIME);
            };

            var new_process = function() {
                var data = {
                    'stream': $scope.model.stream,
                    'port': $scope.model.port,
                    'arguments': '',
                };
                return $http.post('/process/new', data).success(function(res) {

                }).error(function(err) {
                    console.error(err);
                });
            };

            $scope.createNewProcess = function() {

                new_process().then(function() {
                    check_process();
                });

            };

            start_process_check();
        }
    ]);
}());
