'use strict';

export default function(Restangular) {

  this.rest = Restangular.all('accounts');

  this.getStats = () => {
    if (this.stats) return this.stats;
    this.stats = this.rest.customGET('stats').$object;
    return this.stats;
  };

  this.updateStats = () => {
    return this.rest.customGET('stats').then(stats => {
      delete this.stats.accounts;
      return Object.assign(this.stats, stats);
    });
  };

  this.getAccounts = () => {
    if (this.accounts) return this.accounts;
    this.accounts = this.rest.getList().$object;
    return this.accounts;
  };

  this.updateAccounts = () => {
    return this.rest.getList()
      .then(accounts => Object.assign(this.accounts, accounts));
  };

}