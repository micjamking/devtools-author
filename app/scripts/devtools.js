(function($){
  'use strict';

  // Initialize app module
  var app = app || {};

  // Assign chrome methods to local variables
  var storage = $.storage.sync;
  var panel   = $.devtools.panels;

  // App directory
  app.dir = 'dist/';

  // AJAX request for Chrome version
  var getChromeVersion = function(){
    var ajax = new XMLHttpRequest();
    // Chromium release tracker API
    ajax.open('GET', 'https://omahaproxy.appspot.com/mac');
    ajax.send(null);

    ajax.onreadystatechange = function(){
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          return parseInt(ajax.responseText, 10);
        } else {
          console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
        }
      }
    };
  };

  // Method: load themes
  app.loadTheme = function(object, cb){

    // AJAX load of stylesheet
    var _request = function(stylesheet){
      var ajax = new XMLHttpRequest();
      ajax.open('GET', './' + stylesheet);
      ajax.send(null);

      ajax.onreadystatechange = function(){
        if (ajax.readyState === 4) {
          if (ajax.status === 200) {
            panel.applyStyleSheet(ajax.responseText);
            cb();
          } else {
            return console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
          }
        }
      };
    };

    // GET theme
    _request(object.theme);

    // GET Canary CSS if pre-release (beta, canary, dev)
    if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > getChromeVersion()) {
      _request(object.isCanary);
    }
  };

  // Method: initialize app
  app.init = function(){

    var stylesDir = app.dir + 'styles/',
        pagePath  = app.dir + 'panel.html';

    // Create Devtools panel
    panel.create(
      'Author Settings',  // Panel title
      null,     // Panel icon
      pagePath, // Path of panel's HTML page
      null      // Callback
    );

    // Get theme from Chrome storage
    storage.get('devtools-theme', function(object){

      var theme = object['devtools-theme'] || '3024';

      app.loadTheme({
        theme: stylesDir + 'themes/' + theme + '.css',
        isCanary: stylesDir + 'canary.css'
      }, function(){
        // Get fontSize from Chrome storage
        storage.get('devtools-fontSize', function(object){

          var fontSize = object['devtools-fontSize'];

          if (fontSize){
            var styles = ':host-context(.platform-mac) .monospace, :host-context(.platform-mac) .source-code, body.platform-mac .monospace, body.platform-mac .source-code, body.platform-mac ::shadow .monospace, body.platform-mac ::shadow .source-code { font-size: ' + fontSize + 'px !important; } :host-context(.platform-windows) .monospace, :host-context(.platform-windows) .source-code, body.platform-windows .monospace, body.platform-windows .source-code, body.platform-windows ::shadow .monospace, body.platform-windows ::shadow .source-code { font-size: ' + fontSize + 'px !important; } :host-context(.platform-linux) .monospace, :host-context(.platform-linux) .source-code, body.platform-linux .monospace, body.platform-linux .source-code, body.platform-linux ::shadow .monospace, body.platform-linux ::shadow .source-code { font-size: ' + fontSize + 'px !important; }';
            panel.applyStyleSheet(styles);
          }
        });
        
        // Get fontFamily from Chrome storage
        storage.get('devtools-fontFamily', function(object){

          var fontFamily = object['devtools-fontFamily'];

          if (fontFamily){
            var styles = ':host-context(.platform-mac) .monospace, :host-context(.platform-mac) .source-code, body.platform-mac .monospace, body.platform-mac .source-code, body.platform-mac ::shadow .monospace, body.platform-mac ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; } :host-context(.platform-windows) .monospace, :host-context(.platform-windows) .source-code, body.platform-windows .monospace, body.platform-windows .source-code, body.platform-windows ::shadow .monospace, body.platform-windows ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; } :host-context(.platform-linux) .monospace, :host-context(.platform-linux) .source-code, body.platform-linux .monospace, body.platform-linux .source-code, body.platform-linux ::shadow .monospace, body.platform-linux ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; }';
            panel.applyStyleSheet(styles);
          }
        });
      });
    });
  };

  // Fire app
  app.init();
})(chrome);
