'use strict';

export default function($state) {

  this.editableCategory = Object.assign({}, this.category);

  this.save = () => {
    this.category.patch(this.editableCategory)
      .then(category => Object.assign(this.category, category))
      .then(() => $state.go('dashboard.categories.list'));
  };

  this.cancelEdit = () => {
    $state.go('dashboard.categories.list');
  };

}