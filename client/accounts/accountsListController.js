'use strict';

export default function(AccountService, CategoryService, TransactionService) {

  this.thead = [
    { name: 'name', title: 'Name' },
    { name: 'transactionsCount', title: 'Transactions' },
    { name: 'spent', title: 'Spent' },
    { name: 'earned', title: 'Earned' },
    { name: 'withdrawal', title: 'Withdrawal' },
    { name: 'deposits', title: 'Deposits' },
    { name: 'summary', title: 'Summary' }
  ];

  this.remove = account => {
    let index = this.accounts.findIndex(a => a._id === account._id);
    account.remove()
      .then(() => AccountService.updateStats())
      .then(() => TransactionService.updateTransactions())
        .then(transactions => {
          for (let i = 0; i <= transactions.length; i++) {
            if (typeof transactions[i] !== 'object') return;
            if (!transactions[i].account) return;
            if (transactions[i].account._id === account._id) {
              transactions.splice(i, 1);
              i--;
            }
          }
        })
        .then(() => CategoryService.updateCategories())
        .then(() => this.accounts.splice(index, 1));
  };

}