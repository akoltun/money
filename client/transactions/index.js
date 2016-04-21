'use strict';

import transactionsComponent from './transactionsComponent.js';
import transactionsListComponent from './transactionsListComponent.js';
import transactionDirective from './transactionDirective.js';
import transactionEditComponent from './transactionEditComponent.js';
import transactionNewComponent from './transactionNewComponent';
import transactionService from './transactionService.js';

export default angular.module('transactions', [])

.config(($stateProvider, RestangularProvider) => {
  RestangularProvider.setRequestInterceptor((e, operation, route) => {
    if (route === 'transactions') {
      if ((operation === 'patch') || operation === 'post') {
        if (e.account) e.account = e.account._id;
        if (e.sourceAccount) e.sourceAccount = e.sourceAccount._id;
        if (e.destinationAccount) {
          e.destinationAccount = e.destinationAccount._id;
        }
        if (e.categories) e.categories = e.categories.map(c => c._id);
      }
    }
    return e;
  });

  $stateProvider
    .state('dashboard.transactions', {
      url: '/transactions',
      abstract: true,
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

.component('transactions', transactionsComponent)
.component('transactionsList', transactionsListComponent)
.directive('singleTransaction', transactionDirective)
.component('transactionEdit', transactionEditComponent)
.component('transactionNew', transactionNewComponent)
.service('TransactionService', transactionService);