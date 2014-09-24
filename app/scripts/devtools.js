(function($){
  'use strict';

  // Initialize app module
  var app = app || {};
  
  // Assign Chrome storage to local variable.
  var storage = $.storage.sync;
  
  // AJAX request for Chrome version
  var getChromeVersion = function(){
    var ajax = new XMLHttpRequest();
    // Chromium release tracker API
    ajax.open('GET', 'https://omahaproxy.appspot.com/mac', false);
    ajax.send();

    return parseInt(ajax.responseText, 10) || console.log('There was an error with your request');
  };
  
  // App directory
  app.dir = 'dist/';
  
  // Method: load themes 
  app.loadTheme = function(object){
    
    // AJAX load of stylesheet
    var _request = function(stylesheet){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/' + stylesheet, false);
      xhr.send();
      $.devtools.panels.applyStyleSheet(xhr.responseText);
    };
    
    // GET theme
    _request(object.theme);
    
    // GET Canary CSS if pre-release (beta, canary, dev)
    if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > getChromeVersion()) {
      _request(object.isCanary);
    }
  };
  
  // Initialization method
  app.init = function(){

    var stylesDir = app.dir + 'styles/',
        pagePath  = app.dir + '/panel/theme.html';

    $.devtools.panels.create(
      'Theme',  // Panel title
      null,     // Panel icon
      pagePath, // Path of panel's HTML page
      null      // Callback
    );

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
