'use strict';

export default function(Restangular) {

  this.rest = Restangular.all('transactions');

  this.getTransactions = () => {
    if (this.transactions) return this.transactions;
    this.transactions = this.rest.getList().$object;
    return this.transactions;
  };

  this.updateTransactions = () => {
    return this.rest.getList()
      .then(transactions => Object.assign(this.transactions, transactions));
  };

}
