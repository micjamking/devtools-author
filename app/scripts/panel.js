/**
 * @file DevTools Author Settings panel
 */
(function(
panel,    // Global panel module
$,        // document.querySelectorAll
storage,  // Chrome Storage API
ga        // Google Analytics
){
  'use strict';
  
  // panel Module
  panel = (function(){

    // Select menu
    var $select = $('#theme-options')[0];

    // Font size range input
    var $range = $('#font-size-input')[0];

    // Font size output
    var $output = $('#font-size-output')[0];

    // Font family input
    var $fontInput = $('#font-family-input')[0];

    // Palette container
    var $palette = $('.palette')[0];

    // Theme title
    var $themeTitle = $('#currentTheme')[0];
    
    // panel model
    var _panel = _panel || {};

    // Theme JSON file
    var _themeJSON = '/dist/scripts/themes.json';

    // Default theme
    var _defaultTheme = '3024';

    // Default fontSize
    var _defaultFontSize = 14;

    // Default fontSize
    var _defaultFontFamily = 'Hack';

    function _themeLookUp(theme){
      for (var i = 0; i < _panel.themes.length; i++){
        if (_panel.themes[i].name === theme) {
          return _panel.themes[i].colors;
        }
      }
    }

    function _createLI(palette){
      palette = palette.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      });

      for (var i = 0; i < palette.length; i++){
        // Create the list item:
        var item = document.createElement('li');

        // Style item
        item.style.backgroundColor = palette[i];
        item.style.width = (100 / palette.length) + '%';

        // Add it to the list:
        $palette.appendChild(item);
      }
    }

    // Build select menus like ngOptions
    function _buildSelectMenu(menu, object){
      var options, array;

      // Get the data attribute value
      options = menu.dataset.options;

      // Clean string and create array
      options = options.replace(/in\s/g, '').split(' ');

      // Assign array from object by property name
      // using the value from the last item in options
      array = object[options[options.length - 1]];

      for (var j = 0; j < array.length; j++){

        var option = document.createElement('option');

        // Assign option value & text from array
        option.value = array[j].name.replace(/\s+/g, '-').toLowerCase();
        option.text  = array[j].name;

        // Select currentTheme option
        if (object.currentTheme === array[j].name){
          option.selected = 'selected';
        }

        menu.add(option, null);
      }

      return menu;
    }

    // Object observer for settings updates
    function _observer(changes){
      function updatePalette(theme){
        var children = $palette.querySelectorAll('li');

        // Remove children from $palette
        if (children.length){
          for (var i = 0; i < children.length; i++){
            $palette.removeChild(children[i]);
          }
        }

        _createLI(_themeLookUp(theme));
      }

      changes.forEach(function(change){
        if (change.name === 'currentTheme') {
          $themeTitle.innerHTML = change.object.currentTheme;
          $themeTitle.style.display = 'block';
          updatePalette(change.object.currentTheme);
        } else if (change.name === 'currentFontSize') {
          $range.value = $output.value = change.object.currentFontSize;
        } else if (change.name === 'currentFontFamily') {
          $fontInput.value = change.object.currentFontFamily;
        }
      });
    }

    // Set & save theme based on select menu change event
    function setTheme(event, obj){
      function save(theme){
        storage.set({ 'devtools-theme': theme.value },
        function(){ _panel.currentTheme = theme.text; });
      }
      if (event && event.type === 'change'){
        $themeTitle.style.display = 'none';
        var el     = event.target || event.srcElement;
        var option = el.options[el.selectedIndex];
        save(option);
        $('.alert')[0].style.display = 'block';
      } else if (event === null && obj){
        save(obj);
      }
    }

    // Set & save font family based on input change event
    function setFontFamily(event, value){
      function save(fontFamily){
        storage.set({ 'devtools-fontFamily': fontFamily },
        function(){ _panel.currentFontFamily = fontFamily; });
      }
      if (event && event.type === 'change'){
        var el = event.target || event.srcElement;
        save(el.value);
        $('.alert')[0].style.display = 'block';
      } else if (event === null && value){
        save(value);
      }
    }

    // Set & save font size based on input menu change event
    function setFontSize(event, value){
      function save(fontSize){
        storage.set({ 'devtools-fontSize': fontSize },
        function(){ _panel.currentFontSize = fontSize; });
      }
      if (event && event.type === 'change'){
        var el = event.target || event.srcElement;
        save(el.value);
        $('.alert')[0].style.display = 'block';
      } else if (event === null && value){
        save(value);
      }
    }

    // Get fontFamily from chrome sync
    function getFontFamily(value){
      if (!value){
        setFontFamily(null, _defaultFontFamily);
        return _defaultFontFamily;
      } else {
        return value;
      }
    }

    // Get fontSize from chrome sync
    function getFontSize(value){
      if (!value){
        setFontSize(null, _defaultFontSize);
        return _defaultFontSize;
      } else {
        return value;
      }
    }

    // Get theme from chrome sync
    function getTheme(array, string){
      if (!array || !string){
        setTheme(null, {
          value: _defaultTheme.replace(/\s+/g, '-').toLowerCase(),
          text: _defaultTheme
        });
        ga('send', 'event', 'Install', 'Install', 'Devtools Author', 1);
        return _defaultTheme;
      }
      for (var i = 0; i < array.length; i++){
        if (array[i].name.replace(/\s+/g, '-').toLowerCase() === string){
          return array[i].name;
        }
      }
    }

    // Initialize theme _panel
    function init(){

      function callback(){
        // Listen for changes to the select menu
        $select.addEventListener('change', setTheme);

        // Listen for changes to the text input
        $fontInput.addEventListener('change', setFontFamily);

        // Listen for changes to the range input
        $range.addEventListener('change', setFontSize);

        // Listen for click on element
        $('.footer a')[0].addEventListener('click', function(){
          ga('send', 'event', 'Link', 'Click', 'Mike King on GitHub');
        });

        // Observe changes to _panel model
        Object.observe(_panel, _observer, ['add', 'update']);

        // Get current theme from Chrome sync
        storage.get('devtools-theme', function(object){

          _panel.currentTheme = getTheme(_panel.themes, object['devtools-theme']);

          // Build select menus
          _buildSelectMenu($select, _panel);
        });

        // Get current fontSize from Chrome sync
        storage.get('devtools-fontSize', function(object){
          _panel.currentFontSize = getFontSize(object['devtools-fontSize']);
        });

        // Get current fontSize from Chrome sync
        storage.get('devtools-fontFamily', function(object){
          _panel.currentFontFamily = getFontFamily(object['devtools-fontFamily']);
        });
      }

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

            callback();
          } else {
            console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
          }
        }
      };
    }

    // Reveal public pointers to
    // private functions and properties
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
  
  // Initialize panel
  panel.init();
})(
window.panel = window.panel || {},
document.querySelectorAll.bind(document),
chrome.storage.sync,
window.ga
);