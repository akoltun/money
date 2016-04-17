'use strict';

import dashboardTmpl from './templates/dashboard.tmpl.jade';

export default {
  bindings: {
    user: '='
  },
  template: dashboardTmpl()
};