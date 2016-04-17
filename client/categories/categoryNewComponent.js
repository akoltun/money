'use strict';

import categoryNewTmpl from './templates/category-edit.tmpl.jade';
import categoryNewController from './categoryNewController.js';

export default {
  bindings: {},
  controller: categoryNewController,
  template: categoryNewTmpl()
};