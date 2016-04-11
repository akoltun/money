'use strict';

angular.module('transactions', [])

.config(($stateProvider, RestangularProvider) => {

  RestangularProvider.setRequestInterceptor((e, operation, route, url) => {
      if (route === 'transactions') {
        if ((operation === 'patch') || operation === 'post') {
          if (e.account) e.account = e.account._id;
          if (e.sourceAccount) e.sourceAccount = e.sourceAccount._id;
          if (e.destinationAccount) e.destinationAccount = e.destinationAccount._id;
          if (e.categories) e.categories = e.categories.map(c => c._id);
        }
      }
      return e;
    });

  $stateProvider
    .state('dashboard.transactions', {
      url: '/transactions',
      abstract: true,
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<transactions></transactions>'
    })
    .state('dashboard.transactions.list', {
      url: '',
      controller: function(transactions) {
        this.transactions = transactions;
      },
      controllerAs: '$ctrl',
      template: `<transactions-list transactions="$ctrl.transactions">
                 <transactions-list/>`
    })
    .state('dashboard.transactions.new', {
      url: '/new',
      controller: function(accounts, categories) {
        this.accounts = accounts;
        this.categories = categories;
      },
      controllerAs: '$ctrl',
      template: `<transaction-new accounts="$ctrl.accounts"
                                  categories="$ctrl.categories">
                 </transaction-new>`
    })
    .state('dashboard.transactions.details', {
      url: '/:id',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<transaction-detail><transaction-detail/>'
    })
    .state('dashboard.transactions.edit', {
      url: '/edit/:id',
      controller: function($stateParams, transactions, accounts, categories) {
        this.transaction = transactions.find(t => t._id === $stateParams.id);
        this.accounts = accounts;
        this.categories = categories;
      },
      controllerAs: '$ctrl',
      template: `<transaction-edit transaction="$ctrl.transaction"
                                   accounts="$ctrl.accounts"
                                   categories="$ctrl.categories">
                 <transaction-edit/>`
    });

})

.component('transactions', {
  bindings: {},
  controller: function() {
  },
  templateUrl: 'transactions/templates/transactions.tmpl.html'
})

.component('transactionsList', {
  bindings: {
    transactions: '=',
    account: '=',
    category: '='
  },
  controller: function(TransactionService, AccountService, CategoryService) {

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

  },
  templateUrl: 'transactions/templates/transactions-list.tmpl.html'
})

.directive('singleTransaction', function() {
  return {
    restrict: 'A',
    scope: {
      transaction: '=',
      remove: '&'
    },
    templateUrl: 'transactions/templates/transaction.tmpl.html'
  };
})

.component('transactionEdit', {
  bindings: {
    transaction: '=',
    accounts: '=',
    categories: '='
  },
  controller: function($state, TransactionService, AccountService, CategoryService) {

    this.editableTransaction = Object.assign({}, this.transaction);

    this.save = () => {
      this.transaction.patch(this.editableTransaction)
        .then(transaction => {
          if (this.transaction.account) delete this.transaction.account;
          if (this.transaction.sourceAccount) delete this.transaction.sourceAccount;
          if (this.transaction.destinationAccount) delete this
              .transaction.destinationAccount;
          return Object.assign(this.transaction, transaction);
        })
        .then(transaction => AccountService.updateStats())
        .then(res => AccountService.updateAccounts())
        .then(res => CategoryService.updateCategories())
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

  },
  templateUrl: 'transactions/templates/transaction-edit.tmpl.html'
})

.component('transactionNew', {
  bindings: {
    accounts: '=',
    categories: '='
  },
  controller: function($state, TransactionService, AccountService, CategoryService) {

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

  },
  templateUrl: 'transactions/templates/transaction-edit.tmpl.html'
})

.service('TransactionService', function(Restangular, $q) {

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


});