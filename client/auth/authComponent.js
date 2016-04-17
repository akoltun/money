'use strict';

import authTmpl from './templates/auth.tmpl.jade';
import authController from './authController.js';

export default {
  bindings: {},
  controller: authController,
  template: authTmpl()
};