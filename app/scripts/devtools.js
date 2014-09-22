(function($){
  'use strict';

  // Initialize app module
  var app = app || {};
  
  // Assign Chrome storage to local variable.
  var storage = $.storage.local;
  
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
    
    // GET Canary CSS if Canary
    if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 34) {
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
