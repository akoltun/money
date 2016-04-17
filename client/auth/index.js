'use strict';

import authService from './authService.js';
import authComponent from './authComponent.js';

let auth = angular.module('auth', [])

.config(($stateProvider) => {
  $stateProvider
  .state('auth', {
      url: '/login',
      controllerAs: '$ctrl',
      template: `<auth></auth>`
    });
});

auth.component('auth', authComponent);
auth.service('AuthService', authService);

export default auth;