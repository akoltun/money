'use strict';

import categoryTmpl from './templates/category.tmpl.jade';

export default function() {
  return {
    restrict: 'A',
    scope: {
      category: '=',
      remove: '&'
    },
    template: categoryTmpl()
  };
}