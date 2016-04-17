'use strict';

import './auth';
import './dashboard';
import './sidebar';
import './overview';
import './accounts';
import './categories';
import './transactions';

angular.module('moneyApp', [
  'ngMessages',
  'ui.router',
  'restangular',
  'auth',
  'dashboard',
  'sidebar',
  'overview',
  'accounts',
  'categories',
  'transactions'
])


.config(($urlRouterProvider, RestangularProvider, $httpProvider) => {

  RestangularProvider
    .setBaseUrl('/api/')
    .setRestangularFields({
      id: '_id'
    });

  $urlRouterProvider.otherwise('/dashboard/overview');
  $httpProvider.defaults.withCredentials = true;

});