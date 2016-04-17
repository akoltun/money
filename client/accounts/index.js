'use strict';

import accountsComponent from './accountsComponent.js';
import accountsListComponent from './accountsListComponent.js';
import singleAccountDirective from './singleAccountDirective.js';
import accountEditComponent from './accountEditComponent.js';
import accountNewComponent from './accountNewComponent.js';
import accountService from './accountService.js';

let accounts = angular.module('accounts', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard.accounts', {
      url: '/accounts',
      abstract: true,
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

});

accounts.component('accounts', accountsComponent);
accounts.component('accountsList', accountsListComponent);
accounts.directive('singleAccount', singleAccountDirective);
accounts.component('accountEdit', accountEditComponent);
accounts.component('accountNew', accountNewComponent);
accounts.service('AccountService', accountService);

export default accounts;
