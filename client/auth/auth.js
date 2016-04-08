'use strict';

angular.module('auth', [])

.config(($stateProvider) => {
  $stateProvider
  .state('auth', {
      url: '/login',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: `<auth></auth>`
    });
})

.component('auth', {
  bindings: {},
  controller: function(AuthService, $state) {

    AuthService.getUser()
      .then(user => {
        if (user && user.email) {
          return $state.go('dashboard.overview');
        }
      })
      .catch(res => console.log(res.data.error));

    this.email = 'admin@google.com';
    this.password = 'admin';

    this.login = () => {
      AuthService.login(this.email, this.password)
        .then(() => $state.go('dashboard.overview'))
        .catch(res => console.log(res.data.error));
    };

  },
  templateUrl: 'auth/templates/auth.tmpl.html'
})

.service('AuthService', function($http, $q) {

  this.user = {};
  this.credentials = {};

  this.getUser = () => {
    if (this.user && this.user.name) return $q.resolve(this.user);
    return $http.get('/api/users/me')
      .then(res => Object.assign(this.user, res.data));
  };

  this.login = (email, password) => {
    this.credentials.email = email;
    this.credentials.password = password;
    return $http.post('/api/login', this.credentials)
      .then(res => res.data)
      .then(user => Object.assign(this.user, user));
  };

  this.logout = () => {
    return $http.get('/api/logout')
      .then(res => res.data);
  };
  
});