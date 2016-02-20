/**
 * @file DevTools Extension setup
 */
(function(
app,      // Global app module
storage,  // Chrome Storage API
panel     // Chrome DevTools Panels API
){
  'use strict';
  
  // App Module
  app = (function(){

    // App directory
    var _dir = 'dist/';
    
    // AJAX requests
    function AJAX(url, callback){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send(null);

      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(xhr);
          } else {
            return console.log('Status Code: ' + xhr.status + '\nThere was an error with your request');
          }
        }
      };
    }

      // Method: load themes
    function loadTheme(object, cb){

      // GET Theme CSS
      AJAX('./' + object.theme, function(ajax){
        panel.applyStyleSheet(ajax.responseText);
        cb();
      });
      
      // GET Canary CSS if pre-release (beta, canary, dev)
      AJAX('https://omahaproxy.appspot.com/mac', function(ajax){
        if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > parseInt(ajax.responseText, 10)) {
          AJAX('./' + object.isCanary, function(ajax){
            panel.applyStyleSheet(ajax.responseText);
          });
        }
      });
    }

    function applyFontSettings(){
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
    }

    // Method: initialize app
    function init(){

      var stylesDir = _dir + 'styles/',
          pagePath  = _dir + 'panel.html';

      // Create DevTools panel
      panel.create(
        'Author Settings',  // Panel title
        null,     // Panel icon
        pagePath, // Path of panel's HTML page
        null      // Callback
      );

      // Get theme from storage & load in to DevTools
      storage.get('devtools-theme', function(object){

        var theme = object['devtools-theme'] || '3024';
        
        loadTheme({
          theme: stylesDir + 'themes/' + theme + '.css',
          isCanary: stylesDir + 'canary.css'
        }, applyFontSettings);
      
      });
    
    }

    // Reveal public pointers to
    // private functions and properties
    return {
      loadTheme: loadTheme,
      init: init
    };
  })();

  // Initialize app
  app.init();
})(
window.app = window.app || {},
chrome.storage.sync,
chrome.devtools.panels
);