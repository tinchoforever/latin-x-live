'use strict';

angular.module('initApp',['ngRoute', 'ngAnimate'])
.config(['$compileProvider', function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|whatsapp|file|tel):/);
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/check/main.html',
        controller: 'mainController'
      })
       .when('/pregunta', {
        templateUrl: 'views/check/question.html',
        controller: 'questionController'
      })
        .when('/respuesta', {
        templateUrl: 'views/check/answer.html',
        controller: 'questionController'
      })
      .when('/fin', {
        templateUrl: 'views/check/end.html',
        controller: 'endController'
      })
      .when('/stats', {
        templateUrl: 'views/check/stats.html',
        controller: 'statsController'
      })
});
 
new WOW().init();
 var socket = io('https://latin-x-map.herokuapp.com/');
       
           
/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
