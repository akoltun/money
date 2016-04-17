'use strict';

import accountNewTmpl from './templates/account-edit.tmpl.jade';
import accountNewController from './accountNewController.js';

export default {
  bindings: {},
  controller: accountNewController,
  template: accountNewTmpl()
};