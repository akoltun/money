'use strict';

import overviewComponent from './overviewComponent.js';

export default angular.module('overview', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard.overview', {
      url: '/overview',
      controller: function(transactions, accounts, categories) {
        this.transactions = transactions;
        this.accounts = accounts;
        this.categories = categories;
      },
      controllerAs: '$ctrl',
      template: `<overview transactions="$ctrl.transactions"
                           accounts="$ctrl.accounts"
                           categories="$ctrl.categories">
                 </overview>`
    });

})

.component('overview', overviewComponent);