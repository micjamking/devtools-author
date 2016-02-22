/**
 * @file DevTools Extension setup
 */
(function(
  w,        // Window
  storage,  // Chrome Storage API
  panel     // Chrome DevTools Panels API
){
  'use strict';
  
  /**
   * App module
   * @namespace app
   * @global
   */
  var app = (function(){

    /** @private */
    var _dir = '/dist/';
    
    /** @private */
    var _chromeVersionURL = 'https://omahaproxy.appspot.com/mac';
    
    /** @private */
    var _currentChromeVersion = /Chrome\/(\d\d)/.exec(navigator.userAgent)[1];

    /**
     * AJAX function
     * @function _ajax
     * @param {String} url - URL address for XMLHttpRequest 
     * @param {Function} callback - Function called if XMLHttpRequest returns successfully
     * @private
     */
    function _ajax(url, callback){
      
      var xhr = new XMLHttpRequest();
      
      xhr.open('GET', url);
      xhr.send(null);

      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            return callback(xhr);
          } else {
            return console.log('Status Code: ' + xhr.status + '\nThere was an error with your request');
          }
        }
      };
    
    }

    /**
     * Apply `font-size` and `font-family` style settings
     * @function _applyFontSettings
     * @private
     */
    function _applyFontSettings(){
      
      /** Get fontSize from storage */
      storage.get('devtools-fontSize', function(object){
        var fontSize = object['devtools-fontSize'];
        if (fontSize){
          var styles = ':host-context(.platform-mac) .monospace, :host-context(.platform-mac) .source-code, body.platform-mac .monospace, body.platform-mac .source-code, body.platform-mac ::shadow .monospace, body.platform-mac ::shadow .source-code { font-size: ' + fontSize + 'px !important; } :host-context(.platform-windows) .monospace, :host-context(.platform-windows) .source-code, body.platform-windows .monospace, body.platform-windows .source-code, body.platform-windows ::shadow .monospace, body.platform-windows ::shadow .source-code { font-size: ' + fontSize + 'px !important; } :host-context(.platform-linux) .monospace, :host-context(.platform-linux) .source-code, body.platform-linux .monospace, body.platform-linux .source-code, body.platform-linux ::shadow .monospace, body.platform-linux ::shadow .source-code { font-size: ' + fontSize + 'px !important; }';
          panel.applyStyleSheet(styles);
        }
      });

      /** Get fontFamily from storage */
      storage.get('devtools-fontFamily', function(object){
        var fontFamily = object['devtools-fontFamily'];
        if (fontFamily){
          var styles = ':host-context(.platform-mac) .monospace, :host-context(.platform-mac) .source-code, body.platform-mac .monospace, body.platform-mac .source-code, body.platform-mac ::shadow .monospace, body.platform-mac ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; } :host-context(.platform-windows) .monospace, :host-context(.platform-windows) .source-code, body.platform-windows .monospace, body.platform-windows .source-code, body.platform-windows ::shadow .monospace, body.platform-windows ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; } :host-context(.platform-linux) .monospace, :host-context(.platform-linux) .source-code, body.platform-linux .monospace, body.platform-linux .source-code, body.platform-linux ::shadow .monospace, body.platform-linux ::shadow .source-code { font-family: "' + fontFamily + '", monospace !important; }';
          panel.applyStyleSheet(styles);
        }
      });
    
    }

    /**
     * Load Theme CSS file via AJAX
     * @function loadTheme
     * @memberof! app
     * @param {Object} object - Object containing CSS file paths
     * @param {String} object.theme - Theme CSS file path
     * @param {String} object.canary - Canary CSS file path
     * @param {Function} cb - Function called after Theme CSS file loads
     */
    function loadTheme(object, cb){

      /** GET Theme CSS file **/
      _ajax(object.theme, function(ajax){
        panel.applyStyleSheet(ajax.responseText);
        cb(ajax);
      });
      
      /** GET Canary CSS file, if pre-release (beta, canary, dev) **/
      _ajax(_chromeVersionURL, function(ajax){
        if ( _currentChromeVersion > parseInt(ajax.responseText, 10) ) {
          _ajax(object.canary, function(ajax){
            panel.applyStyleSheet(ajax.responseText);
          });
        }
      });

      return object.theme;
    
    }

    /**
     * Create Settings panel and load theme CSS
     * @function init
     * @memberof! app
     */
    function init(){

      var stylesDir = _dir + 'styles/',
          pagePath  = _dir + 'panel.html';
      
      /** Get theme from storage & load in to DevTools */
      function themeSetup(panelObj){

        storage.get('devtools-theme', function(object){

          var theme = object['devtools-theme'] || '3024';

          loadTheme({
            theme: stylesDir + 'themes/' + theme + '.css',
            canary: stylesDir + 'canary.css'
          },
          _applyFontSettings // Callback
          );
        });

        return panelObj;
      }

      /** Create Author Settings panel */
      panel.create(
        'Author Settings',  // Panel title
        null,               // Panel icon
        pagePath,           // Path of panel's HTML page
        themeSetup          // Callback       
      );
    
    }

    /** Public methods */
    return {
      loadTheme: loadTheme,
      init: init
    };

  })();

  /** Initialize app */
  app.init();

  /** Export as global */
  w.app = app;

})(
  /** Globals */
  window,
  chrome.storage.sync,
  chrome.devtools.panels
);