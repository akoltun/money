'use strict';

import transactionTmpl from './templates/transaction.tmpl.jade';

export default function() {
  return {
    restrict: 'A',
    scope: {
      transaction: '=',
      remove: '&'
    },
    template: transactionTmpl()
  };
}
