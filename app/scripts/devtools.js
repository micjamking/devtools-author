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
  app.loadTheme = function(object){

    // AJAX load of stylesheet
    var _request = function(stylesheet){
      var ajax = new XMLHttpRequest();
      ajax.open('GET', './' + stylesheet);
      ajax.send(null);

      ajax.onreadystatechange = function(){
        if (ajax.readyState === 4) {
          if (ajax.status === 200) {
            return panel.applyStyleSheet(ajax.responseText);
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
      'Theme',  // Panel title
      null,     // Panel icon
      pagePath, // Path of panel's HTML page
      null      // Callback
    );

    // Get theme from Chrome storage
    storage.get('devtools-theme', function(object){

      var theme = object['devtools-theme'] || 'solarized-dark';

      app.loadTheme({
        theme: stylesDir + 'themes/' + theme + '.css',
        isCanary: stylesDir + 'modules/canary.css'
      });
    });
  };

  // Fire app
  app.init();
})(chrome);
