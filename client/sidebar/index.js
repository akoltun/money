'use strict';

import sidebarComponent from './sidebarComponent.js';
import statsComponent from './statsComponent.js';
import sidebarMenuComponent from './sidebarMenuComponent.js';

let sidebar = angular.module('sidebar', []);

sidebar.component('sidebar', sidebarComponent);
sidebar.component('stats', statsComponent);
sidebar.component('sidebarMenu', sidebarMenuComponent);

export default sidebar;