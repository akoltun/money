'use strict';

import categoriesListTmpl from './templates/categories-list.tmpl.jade';
import categoriesListController from './categoriesListController.js';

export default {
  bindings: {
    categories: '='
  },
  controller: categoriesListController,
  template: categoriesListTmpl()
};
