'use strict';

import categoriesComponent from './categoriesComponent.js';
import categoriesListComponent from './categoriesListComponent.js';
import singleCategoryDirective from './singleCategoryDirective.js';
import categoryEditComponent from './categoryEditComponent.js';
import categoryNewComponent from './categoryNewComponent.js';
import categoryService from './categoryService.js';

let categories = angular.module('categories', [])

.config(($stateProvider) => {

  $stateProvider
    .state('dashboard.categories', {
      url: '/categories',
      abstract: true,
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
      template: `<transactions-list transactions="$ctrl.transactions"
                                     category="$ctrl.category">
                 <transactions-list/>`
    })
    .state('dashboard.categories.edit', {
      url: '/edit/:id',
      controller: function($stateParams, categories) {
        this.category = categories.find(c => c._id === $stateParams.id);
      },
      controllerAs: '$ctrl',
      template: '<category-edit category="$ctrl.category"><category-edit/>'
    });

});

categories.component('categories', categoriesComponent);
categories.component('categoriesList', categoriesListComponent);
categories.directive('singleCategory', singleCategoryDirective);
categories.component('categoryEdit', categoryEditComponent);
categories.component('categoryNew', categoryNewComponent);
categories.service('CategoryService', categoryService);

export default categories;