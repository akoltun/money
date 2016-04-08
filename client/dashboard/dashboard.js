'use strict';

angular.module('dashboard', [])


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
      controller: function($state) {
      },
      controllerAs: '$ctrl',
      template: `<dashboard></dashboard>`
    })

    .state('dashboard.overview', {
      url: '/overview',
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<overview><overview/>'
    });

})

.component('dashboard', {
  bindings: {
    user: '='
  },
  controller: function() {
  },
  templateUrl: 'dashboard/templates/dashboard.tmpl.html'
});





