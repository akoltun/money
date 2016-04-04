'use strict';

angular.module('sidebar', [])


.component('sidebar', {
  bindings: {},
  controller: function() {
    
  },
  templateUrl: 'sidebar/sidebar.tmpl.html'
})

.component('stats', {
  bindings: {},
  controller: function(AccountService) {
    this.stats =  AccountService.getStats();
  },
  templateUrl: 'sidebar/stats.tmpl.html'
})

.component('sidebarMenu', {
  bindings: {},
  controller: function(AuthService, $state) {

    this.logout = () => {
      AuthService.logout()
        .then(() => $state.go('auth'))
        .catch(res => console.log(res.data.error));
    };

    this.menu = [
      {name: 'Overview', state: 'overview', icon: 'home'},
      {name: 'Accounts', state: 'accounts-list', icon: 'usd'},
      {name: 'Transactions', state: 'transactions', icon: 'list-alt'},
      {name: 'Categories', state: 'categories-list', icon: 'tags'}
    ];

  },
  templateUrl: 'sidebar/sidebar-menu.tmpl.html'
});





