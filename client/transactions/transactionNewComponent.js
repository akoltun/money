'use strict';

import transactionNewTmpl from './templates/transaction-edit.tmpl.jade';
import transactionNewController from './transactionNewController.js';

export default {
  bindings: {
    accounts: '=',
    categories: '='
  },
  controller: transactionNewController,
  template: transactionNewTmpl()
};
