'use strict';

import transactionsListTmpl from './templates/transactions-list.tmpl.jade';
import transactionsListController from './transactionsListController.js';

export default {
  bindings: {
    transactions: '=',
    account: '=',
    category: '='
  },
  controller: transactionsListController,
  template: transactionsListTmpl()
};
