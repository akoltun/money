'use strict';

angular.module('accounts', [])

.config(($stateProvider) => {

  $stateProvider
    .state('accounts', {
      parent: 'dashboard',
      url: '/accounts',
      abstract: true,
      resolve: {
        accounts: function(AccountService) {
          return AccountService.getAccounts();
        }
      },
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<accounts></accounts>'
    })
    .state('accounts-list', {
      parent: 'accounts',
      url: '',
      controller: function(accounts) {
        this.accounts = accounts;
      },
      controllerAs: '$ctrl',
      template: `<accounts-list accounts="$ctrl.accounts">
                 <accounts-list/>`
    })
    .state('accounts-new', {
      parent: 'accounts',
      url: '/new',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<account-new><account-new/>'
    })
    .state('accounts-details', {
      parent: 'accounts',
      url: '/:id',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<account-detail><account-detail/>'
    })
    .state('accounts-edit', {
      parent: 'accounts',
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
  templateUrl: 'accounts/accounts.tmpl.html'
})

.component('accountsList', {
  bindings: {
    accounts: '='
  },
  controller: function(AccountService) {

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
      let index = this.accounts.indexOf(account);
      account.remove().then(res => {
        AccountService.updateStats();
        this.accounts.splice(index, 1);
      });
    };

  },
  templateUrl: 'accounts/accounts-list.tmpl.html'
})

.directive('singleAccount', function() {
  return {
    restrict: 'A',
    scope: {
      account: '=',
      remove: '&'
    },
    templateUrl: 'accounts/account.tmpl.html'
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
        .then(res => AccountService.updateStats())
        .then(() => Object.assign(this.account, this.editableAccount))
        .then(() => $state.go('accounts-list'));
    };

    this.cancelEdit = () => {
      $state.go('accounts-list');
    };

  },
  templateUrl: 'accounts/account-edit.tmpl.html'
})

.component('accountNew', {
  bindings: {},
  controller: function($state, AccountService) {

    this.editableAccount = {};

    this.save = () => {
      AccountService.rest.post(this.editableAccount)
        .then(account => {
          AccountService.accounts.push(account);
          return AccountService.updateStats();
        })
        .then(() => $state.go('accounts-list'));
    };

    this.cancelEdit = () => {
      $state.go('accounts-list');
    };

  },
  templateUrl: 'accounts/account-edit.tmpl.html'
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


});
