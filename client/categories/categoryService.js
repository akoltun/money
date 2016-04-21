'use strict';

export default
/*@ngInject*/
function(Restangular) {

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

}
