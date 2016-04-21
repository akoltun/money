'use strict';

export default
/*@ngInject*/
function($state, CategoryService) {

  this.editableCategory = {};

  this.save = () => {
    CategoryService.rest.post(this.editableCategory)
      .then(category => CategoryService.categories.push(category))
      .then(() => $state.go('dashboard.categories.list'));
  };

  this.cancelEdit = () => {
    $state.go('dashboard.categories.list');
  };

}
