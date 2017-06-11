'use strict';

/**
 * @ngdoc overview
 * @name myPropApp
 * @description
 * # myPropApp
 *
 * Main module of the application.
 */
angular
  .module('myPropApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/aa.html',
        controller: 'AACtrl',
        controllerAs: 'aa'
      })
      .otherwise({
        templateUrl: '404.html',
      });
  });
