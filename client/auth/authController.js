'use strict';

export default
/*@ngInject*/
function(AuthService, $state) {

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

}