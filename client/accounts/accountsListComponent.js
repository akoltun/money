'use strict';

import accountsListTmpl from './templates/accounts-list.tmpl.jade';
import accountsListController from './accountsListController.js';

export default {
  bindings: {
    accounts: '='
  },
  controller: accountsListController,
  template: accountsListTmpl()
};
