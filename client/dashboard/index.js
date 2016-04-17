'use strict';

import dashboardComponent from './dashboardComponent.js';

let dashboard = angular.module('dashboard', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard', {
      abstract: true,
      resolve: {
        user: function(AuthService, $state) {
          return AuthService.getUser()
            .then(user => {
              if (user && user.email) return user;
              return $state.go('auth');
            })
            .catch(res => {
              console.log(res.data.error);
              return $state.go('auth');
            });
        },
        transactions: function(TransactionService) {
          return TransactionService.getTransactions();
        },
        accounts: function(AccountService) {
          return AccountService.getAccounts();
        },
        categories: function(CategoryService) {
          return CategoryService.getCategories();
        }
      },
      url: '/dashboard',
      controllerAs: '$ctrl',
      template: `<dashboard></dashboard>`
    });

});

dashboard.component('dashboard', dashboardComponent);

export default dashboard;
