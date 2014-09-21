(function(){
  'use strict';

  // Initialize app module
  var app = app || {};
  
  // App directory
  app.dir = 'dist/';
  
  // Themes
  app.themes = [
    '3024',
    'bongzilla',
    'clouds',
    'coda',
    'cssedit',
    'monokai',
    'nodejs',
    'solarized-dark',
    'solarized-light'
  ];
  
  // Method: load themes 
  app.loadTheme = function(object){
    
    // AJAX load of stylesheet
    var _request = function(stylesheet){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/' + stylesheet, false);
      xhr.send();
      chrome.devtools.panels.applyStyleSheet(xhr.responseText);
    };
    
    // GET theme
    _request(object.theme);
    
    // GET Canary CSS if Canary
    if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 34) {
      _request(object.isCanary);
    }
  };
  
  // Method: Theme selector panel
  app.themeSelector = function(panel){
    console.log(panel);
  };
  
  // Initialization method
  app.init = function(){

    var stylesDir = this.dir + 'styles/';

    chrome.devtools.panels.create(
      'Theme',
      null,
      this.dir + '/panel/theme.html',
      this.themeSelector
    );
   
    this.loadTheme({
      theme: stylesDir + 'themes/3024.css',
      isCanary: stylesDir + 'modules/canary.css'
    });
  };
  
  // Fire app
  app.init();
})();
