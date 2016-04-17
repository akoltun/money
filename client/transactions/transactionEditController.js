'use strict';

export default function($state, AccountService, CategoryService) {

  this.editableTransaction = Object.assign({}, this.transaction);

  this.save = () => {
    this.transaction.patch(this.editableTransaction)
      .then(transaction => {
        if (this.transaction.account) delete this.transaction.account;
        if (this.transaction.sourceAccount) {
          delete this.transaction.sourceAccount;
        }
        if (this.transaction.destinationAccount) {
          delete this.transaction.destinationAccount;
        }
        return Object.assign(this.transaction, transaction);
      })
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

    let exist = this.editableTransaction.categories
      .some(c => c._id === category._id);

    if (exist) {
      let index = this.editableTransaction.categories
        .findIndex(c => c._id === category._id);
      this.editableTransaction.categories.splice(index, 1);
    } else {
      this.editableTransaction.categories.push(category);
    }

  };

}
