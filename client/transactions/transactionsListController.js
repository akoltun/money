'use strict';

export default
/*@ngInject*/
function(TransactionService, AccountService, CategoryService, $state) {
  this.$state = $state;

  this.thead = [
    {name: 'amount', title: 'Amount'},
    {name: 'date', title: 'Date'},
    {name: 'account', title: 'Account'},
    {name: 'categories', title: 'Categories'},
    {name: 'description', title: 'Description'}
  ];

  this.remove = transaction => {
    let index = this.transactions.findIndex(t => t._id === transaction._id);
    transaction.remove()
      .then(() => AccountService.updateStats())
      .then(() => AccountService.updateAccounts())
      .then(() => CategoryService.updateCategories())
      .then(() => this.transactions.splice(index, 1));
  };

}