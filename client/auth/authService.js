'use strict';

export default
/*@ngInject*/
function($http, $q) {

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
    return $http.post('/api/auth/login', this.credentials)
      .then(res => res.data)
      .then(user => Object.assign(this.user, user));
  };

  this.logout = () => {
    return $http.get('/api/auth/logout')
      .then(res => res.data);
  };

}