'use strict';

angular.module('initApp')
  .controller('mainController', function ($scope, $rootScope, $location) {
    var url = 'data.csv';
    $scope.players = 0;
    $scope.votes = 0;
    $scope.max = 0 ;
    $scope.words = [];
   var socket = io('https://latin-x-map.herokuapp.com');
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

                  z.words.map(function(w){
                     $scope.words.map(function(ww){
                       if (w == ww.key){
                         ww.count++;
                       }
                     })
                  })

                }
                if ($scope.max < z.votes){
                  $scope.max = z.votes;
                }
              }
              for (var i = 0; i < $rootScope.readyToCheck.length; i++) {
                var z = $rootScope.readyToCheck[i];
                z.percentage = z.votes * 80 / $scope.max;
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
            d.words = d.tags.split(',').map(function(tag){
              tag = tag.replace('#','').trim();
              if (tag != ''){
                $scope.words.push(tag);
              }
              return tag;
            });
            
            $rootScope.readyToCheck.push(d);
        });
        
        $scope.words= d3.nest()
              .key(function(d) {
                return d;
              })
              .entries($scope.words);
       $scope.words = $scope.words.map(function(w){
         w.count = 0;
         return w;
       });
       console.log($scope.words);
      });
    });
    setTimeout(function(){
//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('word-cloud');

},2000);

setTimeout(function(){
//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('word-cloud');
//Start cycling through the demo data
showNewWords(myWordCloud);

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i ++ % words.length))
    setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}



},8000);

});


