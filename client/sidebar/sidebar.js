'use strict';

angular.module('sidebar', [])


.component('sidebar', {
  bindings: {},
  controller: function() {
    
  },
  templateUrl: 'sidebar/templates/sidebar.tmpl.html'
})

.component('stats', {
  bindings: {},
  controller: function(AccountService) {
    this.stats =  AccountService.getStats();
  },
  templateUrl: 'sidebar/templates/stats.tmpl.html'
})

.component('sidebarMenu', {
  bindings: {},
  controller: function(AuthService, $state) {

    this.$state = $state;

    this.logout = () => {
      AuthService.logout()
        .then(() => $state.go('auth'))
        .catch(res => console.log(res.data.error));
    };

    this.menu = [{
       name: 'Overview',
       parentState: 'dashboard.overview',
       state: 'dashboard.overview',
       icon: 'home'
     }, {
       name: 'Accounts',
       parentState: 'dashboard.accounts',
       state: 'dashboard.accounts.list',
       icon: 'usd'
     }, {
       name: 'Transactions',
       parentState: 'dashboard.transactions',
       state: 'dashboard.transactions.list',
       icon: 'list-alt'
     }, {
       name: 'Categories',
       parentState: 'dashboard.categories',
       state: 'dashboard.categories.list',
       icon: 'tags'
     }];

  },
  templateUrl: 'sidebar/templates/sidebar-menu.tmpl.html'
});





