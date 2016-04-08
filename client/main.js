'use strict';

angular.module('moneyApp', [
  'ngMessages',
  'ui.router',
  'restangular',
  'auth',
  'dashboard',
  'sidebar',
  'accounts',
  'categories',
  'transactions'
])


.config(($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider) => {

  RestangularProvider
    .setBaseUrl('/api/')
    .setRestangularFields({
      id: '_id'
    });

  $urlRouterProvider.otherwise('/dashboard/overview');
  $httpProvider.defaults.withCredentials = true;

});




