'use strict';

export default
/*@ngInject*/
function(AccountService, CategoryService, TransactionService) {

  this.thead = [
    { name: 'name', title: 'Name' },
    { name: 'transactionsCount', title: 'Transactions' },
    { name: 'spent', title: 'Spent' },
    { name: 'earned', title: 'Earned' },
    { name: 'summary', title: 'Summary' }
  ];

  this.remove = category => {
    let index = this.categories.findIndex(c => c._id === category._id);
    category.remove()
      .then(() => TransactionService.updateTransactions())
      .then(() => this.categories.splice(index, 1));
  };

}
