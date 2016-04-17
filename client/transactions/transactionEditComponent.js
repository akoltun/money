'use strict';

import transactionEditTmpl from './templates/transaction-edit.tmpl.jade';
import transactionEditController from './transactionEditController.js';

export default {
  bindings: {
    transaction: '=',
    accounts: '=',
    categories: '='
  },
  controller: transactionEditController,
  template: transactionEditTmpl()
};