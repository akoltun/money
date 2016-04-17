'use strict';

import accountEditTmpl from './templates/account-edit.tmpl.jade';
import accountEditController from './accountEditController.js';

export default {
  bindings: {
    account: '='
  },
  controller: accountEditController,
  template: accountEditTmpl()
};