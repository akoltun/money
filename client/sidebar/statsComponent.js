'use strict';

import statsTmpl from './templates/stats.tmpl.jade';

export default {
  bindings: {},
  controller: /*@ngInject*/ function(AccountService) {
    this.stats =  AccountService.getStats();
  },
  template: statsTmpl()
};