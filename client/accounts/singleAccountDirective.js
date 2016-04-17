'use strict';

import accountTmpl from './templates/account.tmpl.jade';

export default function() {
  return {
    restrict: 'A',
    scope: {
      account: '=',
      remove: '&'
    },
    template: accountTmpl()
  };
}