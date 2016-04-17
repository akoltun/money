'use strict';

import overviewTmpl from './templates/overview.tmpl.jade';

export default {
  bindings: {
    transactions: '=',
    accounts: '=',
    categories: '='
  },
  template: overviewTmpl()
};