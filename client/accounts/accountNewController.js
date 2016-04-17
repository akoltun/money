'use strict';

export default function($state, AccountService) {

  this.editableAccount = {};

  this.save = () => {
    AccountService.rest.post(this.editableAccount)
      .then(account => AccountService.accounts.push(account))
      .then(() => AccountService.updateStats())
      .then(() => $state.go('dashboard.accounts.list'));
  };

  this.cancelEdit = () => {
    $state.go('dashboard.accounts.list');
  };

}