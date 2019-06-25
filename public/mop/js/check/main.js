'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data.csv';
    $scope.players = 0;
    $scope.votes = 0;
   var socket = io('https://latin-x-map.herokuapp.com/');
          socket.on('new-user', function(msg){
            $scope.$apply(function() {
              $scope.players++;
            });
          });
          socket.on('user-vote', function(msg){
             $scope.$apply(function() {
              $scope.votes++;
              for (var i = 0; i < $rootScope.readyToCheck.length; i++) {
                var z = $rootScope.readyToCheck[i];
                if (z.filename === msg.filename){
                  z.votes++;
                  
                }
                z.percentage = z.votes*2 * 80 / $scope.votes;
                
              }
             });
          });
  	d3.csv(url, function(data){
      $rootScope.$apply(function(){
        $rootScope.checks = data;
        $rootScope.readyToCheck = [];
        data.map(function(d){
            d.votes = 0;
            d.percentage = 0;
            $rootScope.readyToCheck.push(d);
        });
        
       
      });
    });

});