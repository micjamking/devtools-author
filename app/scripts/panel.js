/**
 * @file DevTools Author Settings panel
 */
(function(
  w,        // Window
  ga,       // Google Analytics
  $,        // document.querySelectorAll
  storage   // Chrome Storage API
){
  'use strict';
  
  /**
   * Panel module
   * @namespace panel
   * @global
   */
  var panel = (function(){

    /** @private */
    var $select = $('#theme-options')[0];

    /** @private */
    var $range = $('#font-size-input')[0];

    /** @private */
    var $output = $('#font-size-output')[0];

    /** @private */
    var $fontInput = $('#font-family-input')[0];

    /** @private */
    var $palette = $('.palette')[0];

    /** @private */
    var $themeTitle = $('#currentTheme')[0];

    /** @private */
    var $footerLink = $('.footer a')[0];

    /** @private */
    var $alert = $('.alert')[0];
    
    /** @private */
    var _panel = _panel || {};

    /** @private */
    var _themeJSON = '/dist/scripts/themes.json';

    /** @private */
    var _defaultTheme = '3024';

    /** @private */
    var _defaultFontSize = 14;

    /** @private */
    var _defaultFontFamily = 'Hack';

    /** @private */
    var _currentTheme = null;
   
    /** @private */
    var _currentFontSize = null;
    
    /** @private */
    var _currentFontFamily = null;

    /**
     * Creates HTML list of colors
     * @function _createLI
     * @param {Array} palette - List of theme colors in hex
     */
    function _createLI(palette){
        
      /** Filter palette to remove duplicate colors */
      palette = palette.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      });

      for (var i = 0; i < palette.length; i++){
        /** Create list item */
        var item = document.createElement('li');

        /** Style list item */
        item.style.backgroundColor = palette[i];
        item.style.width = (100 / palette.length) + '%';

        /** Add item to the list */
        $palette.appendChild(item);
      }
    
    }

    /**
     * Find theme colors
     * @function _themeLookUp
     * @param {String} theme - Theme name
     * @returns {Array} List of theme colors in hex
     */
    function _themeLookUp(theme){
      
      for (var i = 0; i < _panel.themes.length; i++){
        if (_panel.themes[i].name === theme) {
          return _panel.themes[i].colors;
        }
      }
    
    }

    /**
     * Recreate $palette using current theme
     * @function _updatePalette
     * @param {String} theme - Currently selected theme name
     */
    function _updatePalette(theme){
      var children = $palette.querySelectorAll('li');

      if (children.length){
        for (var i = 0; i < children.length; i++){
          $palette.removeChild(children[i]);
        }
      }

      _createLI(_themeLookUp(theme));
    }

    /**
     * Build select menus like ngOptions
     * @function _buildSelectMenu
     * @param {HTMLElement} menu - Theme select menu element (empty)
     * @param {Object} model - Panel model containing available themes and current settings
     * @returns {HTMLElement} menu - Theme select menu element, with available themes appended
     */
    function _buildSelectMenu(menu, model){
      
      var options, array;

      /** Get the data attribute value */
      options = menu.dataset.options;

      /** Clean string and create array */
      options = options.replace(/in\s/g, '').split(' ');

      /** 
       * Assign array from model by property name
       * using the value from the last item in options 
       */
      array = model[options[options.length - 1]];

      for (var j = 0; j < array.length; j++){

        var option = document.createElement('option');

        /** Assign option value & text from array */
        option.value = array[j].name.replace(/\s+/g, '-').toLowerCase();
        option.text  = array[j].name;

        /** Select currentTheme option */
        if (model.currentTheme === array[j].name){
          option.selected = 'selected';
        }

        menu.add(option, null);
      }

      return menu;
    
    }

    /**
     * Alert notification test
     * @function _notification
     * @param {String} oldValue - Original value for alert notification test
     * @param {String} newValue - New value for alert notification test
     */
    function _notification(oldValue, newValue){
      if (oldValue !== newValue){
        $alert.style.display = 'block';
      }
    }

    /**
     * Object.defineProperty custom setters and getters for _panel model
     * @function _panelModelSetup
     */
    function _panelModelSetup(){

      /** Observe changes to _panel.currentTheme */
      Object.defineProperty(_panel, 'currentTheme', {
        enumerable: true,
        configurable: true,
        get: function() {
          return _currentTheme;
        },
        set: function(newValue) {
          _notification(_currentTheme, newValue);
          $themeTitle.innerHTML = _currentTheme = newValue;
          _updatePalette(_currentTheme);
        }
      });

      /** Observe changes to _panel.currentFontSize */
      Object.defineProperty(_panel, 'currentFontSize', {
        enumerable: true,
        configurable: true,
        get: function() {
          return _currentFontSize;
        },
        set: function(newValue) {
          _notification(_currentFontSize, newValue);
          $range.value = $output.value = _currentFontSize = newValue;
        }
      });

      /** Observe changes to _panel.currentFontFamily */
      Object.defineProperty(_panel, 'currentFontFamily', {
        enumerable: true,
        configurable: true,
        get: function() {
          return _currentFontFamily;
        },
        set: function(newValue) {
          _notification(_currentFontFamily, newValue);
          $fontInput.value = _currentFontFamily = newValue;
        }
      });
    }

    /**
     * Setup event listeners and get settings from storage
     * @function _panelSetup
     */
    function _panelSetup(){
      
      /** Observe changes to _panel model */
      _panelModelSetup();
      
      /** Listen for changes to the select menu */
      $select.addEventListener('change', setTheme);

      /** Listen for changes to the text input */
      $fontInput.addEventListener('change', setFontFamily);

      /** Listen for changes to the range input */
      $range.addEventListener('change', setFontSize);

      /** Listen for click on footer element */
      $footerLink.addEventListener('click', function(){
        ga('send', 'event', 'Link', 'Click', 'Mike King on GitHub');
      });

      /** Get current theme setting from storage */
      storage.get('devtools-theme', function(object){
        _panel.currentTheme = _currentTheme = getTheme( _panel.themes, object['devtools-theme'] );
        _buildSelectMenu($select, _panel);
        
        /** Send Google Analytics 'Install' event on initial install */
        if (!object['devtools-theme'] && _panel.currentTheme === _defaultTheme){
          ga('send', 'event', 'Install', 'Install', 'Devtools Author', 1);
        }
      });

      /** Get current `font-family` setting from storage */
      storage.get('devtools-fontFamily', function(object){
        _panel.currentFontFamily = _currentFontFamily = getFontFamily(object['devtools-fontFamily']);
      });

      /** Get current `font-size` setting from storage */
      storage.get('devtools-fontSize', function(object){
        _panel.currentFontSize = _currentFontSize = getFontSize(object['devtools-fontSize']);
      });
    
    }

    /**
     * Set & save theme based on select menu change event
     * @function setTheme
     * @memberof! app
     * @param {Event} event - Event object
     * @param {Object} obj - Object for theme settings defaults
     */
    function setTheme(event, obj){
      
      function save(theme){
        storage.set({ 'devtools-theme': theme.value }, function(){
          _panel.currentTheme = theme.text;
        });
        return theme.value;
      }
      
      if (event && event.type === 'change'){
        var el     = event.target || event.srcElement;
        var option = el.options[el.selectedIndex];
        return save(option);
      } else if (event === null && obj){
        return save(obj);
      }
    
    }

    /**
     * Set & save `font-family` based on input change event
     * @function setFontFamily
     * @memberof! app
     * @param {Event} event - Event object
     * @param {Object} value - Value for `font-family` settings
     */
    function setFontFamily(event, value){
      
      function save(fontFamily){
        storage.set({ 'devtools-fontFamily': fontFamily }, function(){
          _panel.currentFontFamily = fontFamily;
        });
        return fontFamily;
      }
      
      if (event && event.type === 'change'){
        var el = event.target || event.srcElement;
        return save(el.value);
      } else if (event === null && value){
        return save(value);
      }
    
    }

    /**
     * Set & save `font-size` based on input menu change event
     * @function setFontSize
     * @memberof! app
     * @param {Event} event - Event object
     * @param {Object} value - Value for `font-size` settings
     */
    function setFontSize(event, value){
      
      function save(fontSize){
        storage.set({ 'devtools-fontSize': fontSize }, function(){
          _panel.currentFontSize = fontSize;
        });
        return fontSize;
      }
      
      if (event && event.type === 'change'){
        var el = event.target || event.srcElement;
        return save(el.value);
      } else if (event === null && value){
        return save(value);
      }
    
    }

    /**
     * Get theme settings
     * @function getTheme
     * @memberof! app
     * @param {Array} array - List of themes
     * @param {String} string - Value for theme settings
     * @returns {String} Theme name
     */
    function getTheme(array, string){
      
      if (!array || !string){
        setTheme(null, {
          value: _defaultTheme.replace(/\s+/g, '-').toLowerCase(),
          text: _defaultTheme
        });
        return _defaultTheme;
      }
      
      for (var i = 0; i < array.length; i++){
        if (array[i].name.replace(/\s+/g, '-').toLowerCase() === string){
          return array[i].name;
        }
      }
    
    }

    /**
     * Get `font-family` settings
     * @function getFontFamily
     * @memberof! app
     * @param {String} value - Value for `font-family` settings
     * @returns {String} value - Value for `font-family` settings
     */
    function getFontFamily(value){
      
      if (!value){
        setFontFamily(null, _defaultFontFamily);
        return _defaultFontFamily;
      } else {
        return value;
      }
    
    }

    /**
     * Get `font-size` settings
     * @function getFontSize
     * @memberof! app
     * @param {String} value - Value for `font-size` settings
     * @returns {String} value - Value for `font-size` settings
     */
    function getFontSize(value){
      
      if (!value){
        setFontSize(null, _defaultFontSize);
        return _defaultFontSize;
      } else {
        return value;
      }
    
    }

    /**
     * GET themes JSON and setup panel settings
     * @function init
     * @memberof! app
     */
    function init(){

      var ajax = new XMLHttpRequest();
      
      ajax.open('GET', _themeJSON);
      ajax.send(null);
      
      ajax.onreadystatechange = function(){
        if (ajax.readyState === 4) {
          if (ajax.status === 200) {
            _panel.themes = JSON.parse(ajax.responseText);

            _panel.themes.sort(function(a, b){
              if(a.name < b.name) { return -1; }
              if(a.name > b.name) { return 1; }
              return 0;
            });

            return _panelSetup();
          } else {
            return console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
          }
        }
      };
    
    }

    /** Public methods */
    return {
      init: init,
      getTheme: getTheme,
      setTheme: setTheme,
      getFontSize: getFontSize,
      setFontSize: setFontSize,
      getFontFamily: getFontFamily,
      setFontFamily: setFontFamily
    };
  })();
  
  /** Initialize panel */
  panel.init();

  /** Export as global */
  w.panel = panel;

})(
  /** Globals */
  window,
  window.ga,
  document.querySelectorAll.bind(document),
  chrome.storage.sync
);