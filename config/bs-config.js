/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */

const config = require('config');

module.exports = {
  ui: {
    port: 9001,
    weinre: {
      port: 9002
    }
  },
  files: [config.client.assets],
  watchOptions: {},
  server: false,
  proxy: {
    target: `${config.server.host}:${config.server.port}`,
    ws: true
  },
  port: 9000,
  middleware: false,
  serveStatic: [],
  ghostMode: {
    clicks: true,
    scroll: true,
    forms: {
      submit: true,
      inputs: true,
      toggles: true
    }
  },
  logLevel: 'info',
  logPrefix: 'BS',
  logConnections: false,
  logFileChanges: true,
  logSnippet: true,
  rewriteRules: false,
  open: false, // one on start
  online: false, // online
  browser: ['google chrome'],
  xip: false,
  hostnameSuffix: false,
  reloadOnRestart: true,
  notify: false, // notifer
  scrollProportionally: true,
  scrollThrottle: 200,
  scrollRestoreTechnique: 'window.name',
  scrollElements: [],
  scrollElementMapping: [],
  reloadDelay: 0,
  reloadDebounce: 500,
  plugins: [],
  injectChanges: true,
  startPath: null,
  minify: true,
  host: null, // host detection
  codeSync: true,
  timestamps: true,
  clientEvents: [
    'scroll',
    'scroll:element',
    'input:text',
    'input:toggles',
    'form:submit',
    'form:reset',
    'click'
  ],
  socket: {
    socketIoOptions: {
      log: false
    },
    socketIoClientConfig: {
      reconnectionAttempts: 50
    },
    path: '/browser-sync/socket.io',
    clientPath: '/browser-sync',
    namespace: '/browser-sync',
    clients: {
      heartbeatTimeout: 5000
    }
  },
  tagNames: {
    less: 'link',
    scss: 'link',
    css: 'link',
    jpg: 'img',
    jpeg: 'img',
    png: 'img',
    svg: 'img',
    gif: 'img',
    js: 'script'
  }
};
