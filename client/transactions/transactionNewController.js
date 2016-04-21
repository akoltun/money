'use strict';

export default
/*@ngInject*/
function($state, TransactionService, AccountService, CategoryService) {

  this.editableTransaction = {};
  this.editableTransaction.categories = [];

  this.save = () => {
    TransactionService.rest.post(this.editableTransaction)
      .then(transaction => TransactionService.transactions.unshift(transaction))
      .then(() => AccountService.updateStats())
      .then(() => AccountService.updateAccounts())
      .then(() => CategoryService.updateCategories())
      .then(() => $state.go('dashboard.transactions.list'));
  };

  this.cancelEdit = () => {
    $state.go('dashboard.transactions.list');
  };

  this.swapAccounts = () => {
    let tmp = this.editableTransaction.destinationAccount;
    this.editableTransaction.destinationAccount =
      this.editableTransaction.sourceAccount;
    this.editableTransaction.sourceAccount = tmp;
  };

  this.isChecked = category => {
    if (this.editableTransaction.categories) {
      return this.editableTransaction.categories
        .some(c => c._id === category._id);
    }
    return false;
  };

  this.change = category => {

    if (this.editableTransaction.categories) {
      let exist = this.editableTransaction.categories
        .some(c => c._id === category._id);

      if (exist) {
        let index = this.editableTransaction.categories
          .findIndex(c => c._id === category._id);
        this.editableTransaction.categories.splice(index, 1);
      } else {
        this.editableTransaction.categories.push(category);
      }
    }

  };

}
