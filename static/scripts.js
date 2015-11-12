(function() {
  "use strict";
  var app = angular.module('livestreamerWebGui', []);

  app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[');
      $interpolateProvider.endSymbol(']}');
  }]);

  app.controller('MainController', ['$scope', '$http', '$interval',
    function($scope, $http, $interval) {

      var INTERVAL_TIME = 10000; //10 seconds

      $scope.model = {
        'stream': '',
    'port': 1337
      };

      $scope.process = null;
      $scope.options = ['--player-continuous-http', '--player-http', '--player-external-http'];

      var getServerIP = function() {
        console.log('running');
        $http.jsonp('https://api.ipify.org?format=jsonp&callback=JSON_CALLBACK').success(function(result){
    $scope.serverIP = result.ip;
      }).error(function(err){
        console.error(err);
      });
      };


      var loadOptions = function() {
        $http.get('/static/livestreamer_options.json').success(function(result){
          console.log(result);
          $scope.options = result.options;
        }).error(function(err){
          console.error(err);
        });
      };

      var check_process = function() {

        $http.get('/process').success(function(result) {
          console.log(result,$scope.options);
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

      var getArguments = function(){
        var argsList = [];
        angular.forEach($scope.options, function(value){
          if(!!value.checked){
            var argStr = '';
            argStr += value.option + ' '; //Add space for spacing of arguments
            if(!!value.value){
              argStr += value.value;
            }
            argsList.push(argStr);
          }
        });
        return argsList;
      };

      var new_process = function() {
        var data = {
          'stream': $scope.model.stream,
          'port': $scope.model.port,
          'arguments': getArguments(),
        };
        console.log(data);
        return $http.post('/process/new', data).success(function(res) {


        }).error(function(err) {
          console.error(err);
        });
      };

      var kill_process = function(){
        return $http.delete('/process/kill').success(function(result){

        }).error(function(err){
          console.error(err);
        });
      };

      $scope.createNewProcess = function() {
        new_process().then(function() {
          check_process();
        });

      };

      $scope.killProcess = function(){
        kill_process().then(function(){
          check_process()
        });
      }

      $scope.enterChannelName = function(channel){
        $scope.model.stream = channel.channel.name;
      }

      var getTwitchChannels = function(){

        Twitch.api({method: 'streams', /*params: {game:'Diablo III', limit:3}*/ }, function(error, list) {
          console.log('GOTTWITCH');
          $scope.channels = list;
          console.log($scope.channels);
        });

      }
      Twitch.init({clientId: 'cbgoo4oyoo3j981jwyk6tk0ursu2uyh'}, function(error, status) {
        getTwitchChannels();
      });
      getServerIP();
      loadOptions();
      start_process_check();
    }
]);
}());
