'use strict';

import categoryEditTmpl from './templates/category-edit.tmpl.jade';
import categoryEditController from './categoryEditController.js';

export default {
  bindings: {
    category: '='
  },
  controller: categoryEditController,
  template: categoryEditTmpl()
};
