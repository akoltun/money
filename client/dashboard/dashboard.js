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
        }
      },
      url: '/dashboard',
      controller: function($state) {
      },
      controllerAs: '$ctrl',
      template: `<dashboard></dashboard>`
    })

    .state('overview', {
      parent: 'dashboard',
      url: '/overview',
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<overview><overview/>'
    })

    .state('transactions', {
      parent: 'dashboard',
      url: '/transactions',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<transactions><transactions/>'
    });

})

.component('dashboard', {
  bindings: {
    user: '='
  },
  controller: function() {
  },
  templateUrl: 'dashboard/dashboard.tmpl.html'
});





