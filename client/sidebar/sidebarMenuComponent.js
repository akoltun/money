'use strict';

import sidebarMenuTmpl from './templates/sidebar-menu.tmpl.jade';
import sidebarMenuController from './sidebarMenuController.js';

export default {
  bindings: {},
  controller: sidebarMenuController,
  template: sidebarMenuTmpl()
};
