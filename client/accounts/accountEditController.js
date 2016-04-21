'use strict';

export default
/*@ngInject*/
function($state, AccountService) {

  this.editableAccount = Object.assign({}, this.account);

  this.save = () => {
    this.account.patch(this.editableAccount)
      .then(account => Object.assign(this.account, account))
      .then(() => AccountService.updateStats())
      .then(() => $state.go('dashboard.accounts.list'));
  };

  this.cancelEdit = () => {
    $state.go('dashboard.accounts.list');
  };

}