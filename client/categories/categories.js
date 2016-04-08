'use strict';

angular.module('categories', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard.categories', {
      url: '/categories',
      abstract: true,
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<categories></categories>'
    })
    .state('dashboard.categories.list', {
      url: '',
      controller: function(categories) {
        this.categories = categories;
      },
      controllerAs: '$ctrl',
      template: `<categories-list categories="$ctrl.categories">
                 <categories-list/>`
    })
    .state('dashboard.categories.new', {
      url: '/new',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<category-new><category-new/>'
    })
    .state('dashboard.categories.details', {
      url: '/:id',
      controller: function($stateParams, transactions, categories) {
        this.transactions = transactions;
        this.category = categories.find(c => c._id === $stateParams.id);
      },
      controllerAs: '$ctrl',
      template: `<category-details transactions="$ctrl.transactions"
                                     category="$ctrl.category">
                 <category-details/>`
    })
    .state('dashboard.categories.edit', {
      url: '/edit/:id',
      controller: function($stateParams, categories) {
        this.category = categories.find(c => c._id === $stateParams.id);
      },
      controllerAs: '$ctrl',
      template: '<category-edit category="$ctrl.category"><category-edit/>'
    });

})

.component('categories', {
  bindings: {},
  controller: function() {
  },
  templateUrl: 'categories/templates/categories.tmpl.html'
})

.component('categoriesList', {
  bindings: {
    categories: '='
  },
  controller: function(AccountService, CategoryService, TransactionService) {

    this.thead = [
      {name: 'name', title: 'Name'},
      {name: 'transactionsCount', title: 'Transactions'},
      {name: 'spent', title: 'Spent'},
      {name: 'earned', title: 'Earned'},
      {name: 'summary', title: 'Summary'}
    ];

    this.remove = category => {
      let index = this.categories.findIndex(c => c._id === category._id);
      category.remove()
        .then(() => TransactionService.updateTransactions())
        .then(() => this.categories.splice(index, 1));
    };

  },
  templateUrl: 'categories/templates/categories-list.tmpl.html'
})

.directive('singleCategory', function() {
  return {
    restrict: 'A',
    scope: {
      category: '=',
      remove: '&'
    },
    templateUrl: 'categories/templates/category.tmpl.html'
  };
})

.component('categoryDetails', {
  bindings: {
    transactions: '=',
    category: '='
  },
  controller: function(AccountService, CategoryService) {

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
  templateUrl: 'categories/templates/category-details.tmpl.html'
})

.component('categoryEdit', {
  bindings: {
    category: '='
  },
  controller: function($state, CategoryService) {

    this.editableCategory = Object.assign({}, this.category);

    this.save = () => {
      this.category.patch(this.editableCategory)
        .then(category => Object.assign(this.category, category))
        .then(() => $state.go('dashboard.categories.list'));
    };

    this.cancelEdit = () => {
      $state.go('dashboard.categories.list');
    };

  },
  templateUrl: 'categories/templates/category-edit.tmpl.html'
})

.component('categoryNew', {
  bindings: {},
  controller: function($state, CategoryService) {

    this.editableCategory = {};

    this.save = () => {
      CategoryService.rest.post(this.editableCategory)
        .then(category => CategoryService.categories.push(category))
        .then(() => $state.go('dashboard.categories.list'));
    };

    this.cancelEdit = () => {
      $state.go('dashboard.categories.list');
    };

  },
  templateUrl: 'categories/templates/category-edit.tmpl.html'
})

.service('CategoryService', function(Restangular, $q) {

  this.rest = Restangular.all('categories');

  this.getCategories = () => {
    if (this.categories) return this.categories;
    this.categories = this.rest.getList().$object;
    return this.categories;
  };

  this.updateCategories = () => {
    return this.rest.getList()
      .then(categories => Object.assign(this.categories, categories));
  };

});
