'use strict';

angular.module('accounts', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard.accounts', {
      url: '/accounts',
      abstract: true,
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<accounts></accounts>'
    })
    .state('dashboard.accounts.list', {
      url: '',
      controller: function(accounts) {
        this.accounts = accounts;
      },
      controllerAs: '$ctrl',
      template: `<accounts-list accounts="$ctrl.accounts">
                 <accounts-list/>`
    })
    .state('dashboard.accounts.new', {
      url: '/new',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<account-new><account-new/>'
    })
    .state('dashboard.accounts.details', {
      url: '/:id',
      controller: function($stateParams, transactions, accounts) {
        this.transactions = transactions;
        this.account = accounts.find(a => a._id === $stateParams.id);
      },
      controllerAs: '$ctrl',
      template: `<transactions-list transactions="$ctrl.transactions"
                                    account="$ctrl.account">
                 <transactions-list/>`
    })
    .state('dashboard.accounts.edit', {
      url: '/edit/:id',
      controller: function($stateParams, accounts) {
        this.account = accounts.find(a => a._id === $stateParams.id);
      },
      controllerAs: '$ctrl',
      template: '<account-edit account="$ctrl.account"><account-edit/>'
    });

})

.component('accounts', {
  bindings: {},
  controller: function() {
  },
  templateUrl: 'accounts/templates/accounts.tmpl.html'
})

.component('accountsList', {
  bindings: {
    accounts: '='
  },
  controller: function(AccountService, CategoryService, TransactionService) {

    this.thead = [
      {name: 'name', title: 'Name'},
      {name: 'transactionsCount', title: 'Transactions'},
      {name: 'spent', title: 'Spent'},
      {name: 'earned', title: 'Earned'},
      {name: 'withdrawal', title: 'Withdrawal'},
      {name: 'deposits', title: 'Deposits'},
      {name: 'summary', title: 'Summary'}
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

  },
  templateUrl: 'accounts/templates/accounts-list.tmpl.html'
})

.directive('singleAccount', function() {
  return {
    restrict: 'A',
    scope: {
      account: '=',
      remove: '&'
    },
    templateUrl: 'accounts/templates/account.tmpl.html'
  };
})

.component('accountEdit', {
  bindings: {
    account: '='
  },
  controller: function($state, AccountService) {

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

  },
  templateUrl: 'accounts/templates/account-edit.tmpl.html'
})

.component('accountNew', {
  bindings: {},
  controller: function($state, AccountService) {

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

  },
  templateUrl: 'accounts/templates/account-edit.tmpl.html'
})

.service('AccountService', function(Restangular, $q) {

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

});
