'use strict';

angular.module('categories', [])

.config(($stateProvider) => {

  $stateProvider
    .state('categories', {
      parent: 'dashboard',
      url: '/categories',
      abstract: true,
      resolve: {
        categories: function(CategoryService) {
          return CategoryService.getCategories();
        }
      },
      controller: function() {
      },
      controllerAs: '$ctrl',
      template: '<categories></categories>'
    })
    .state('categories-list', {
      parent: 'categories',
      url: '',
      controller: function(categories) {
        this.categories = categories;
      },
      controllerAs: '$ctrl',
      template: `<categories-list categories="$ctrl.categories">
                 <categories-list/>`
    })
    .state('categories-new', {
      parent: 'categories',
      url: '/new',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<category-new><category-new/>'
    })
    .state('categories-details', {
      parent: 'categories',
      url: '/:id',
      controller: function() {
        
      },
      controllerAs: '$ctrl',
      template: '<categories-detail><categories-detail/>'
    })
    .state('categories-edit', {
      parent: 'categories',
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
  templateUrl: 'categories/categories.tmpl.html'
})

.component('categoriesList', {
  bindings: {
    categories: '='
  },
  controller: function(CategoryService) {

    this.thead = [
      {name: 'name', title: 'Name'},
      {name: 'transactionsCount', title: 'Transactions'},
      {name: 'spent', title: 'Spent'},
      {name: 'earned', title: 'Earned'},
      {name: 'summary', title: 'Summary'}
    ];

    this.remove = category => {
      let index = this.categories.indexOf(category);
      category.remove().then(res => this.categories.splice(index, 1));
    };

  },
  templateUrl: 'categories/categories-list.tmpl.html'
})

.directive('singleCategory', function() {
  return {
    restrict: 'A',
    scope: {
      category: '=',
      remove: '&'
    },
    templateUrl: 'categories/category.tmpl.html'
  };
})

.component('categoryEdit', {
  bindings: {
    category: '='
  },
  controller: function($state, CategoryService) {

    this.editableCategory = Object.assign({}, this.category);

    this.save = () => {
      this.category.patch(this.editableCategory)
        .then(() => Object.assign(this.category, this.editableCategory))
        .then(() => $state.go('categories-list'));
    };

    this.cancelEdit = () => {
      $state.go('categories-list');
    };

  },
  templateUrl: 'categories/category-edit.tmpl.html'
})

.component('categoryNew', {
  bindings: {},
  controller: function($state, CategoryService) {

    this.editableCategory = {};

    this.save = () => {
      CategoryService.rest.post(this.editableCategory)
        .then(category => CategoryService.categories.push(category))
        .then(() => $state.go('categories-list'));
    };

    this.cancelEdit = () => {
      $state.go('categories-list');
    };

  },
  templateUrl: 'categories/category-edit.tmpl.html'
})

.service('CategoryService', function(Restangular, $q) {

  this.rest = Restangular.all('categories');

  this.getCategories = () => {
    if (this.categories) return this.categories;
    this.categories = this.rest.getList().$object;
    return this.categories;
  };


});
