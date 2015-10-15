(function($, storage, ga){
  'use strict';

  // Panel model
  var panel = panel || {};

  // Select menu
  var $select = $('#theme-options')[0];

  // Font size range input
  var $range = $('#font-size-input')[0];

  // Font size output
  var $output = $('#font-size-output')[0];

  // Palette container
  var $palette = $('.palette')[0];
  
  // Theme title
  var $themeTitle = $('#currentTheme')[0];

  // Theme JSON file
  panel.themeJSON = '/dist/scripts/themes.json';

  // Current theme
  panel.currentTheme = '';

  // Default theme
  panel.defaultTheme = '3024';

  // Default fontSize
  panel.defaultFontSize = 14;

  function themeLookUp(theme){
    for (var i = 0; i < panel.themes.length; i++){
      if (panel.themes[i].name === theme) {
        return panel.themes[i].colors;
      }
    }
  }

  function createLI(palette){
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

  // Set & save theme based on select menu change event
  function setTheme(event, obj){
    function save(theme){
      storage.set({ 'devtools-theme': theme.value },
      function(){ panel.currentTheme = theme.text; });
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

  // Set & save font size based on input menu change event
  function setFontSize(event, value){
    function save(fontSize){
      storage.set({ 'devtools-fontSize': fontSize },
      function(){ panel.currentFontSize = fontSize; });
    }
    if (event && event.type === 'change'){
      var el = event.target || event.srcElement;
      save(el.value);
      $('.alert')[0].style.display = 'block';
    } else if (event === null && value){
      save(value);
    }
  }

  // Object observer for current theme
  function observer(changes){
    function updatePalette(theme){
      var children = $palette.querySelectorAll('li');
      
      // Remove children from $palette
      if (children.length){
        for (var i = 0; i < children.length; i++){
          $palette.removeChild(children[i]);
        }
      }

      createLI(themeLookUp(theme));
    }

    changes.forEach(function(change){
      if (change.name === 'currentTheme') {
        $themeTitle.innerHTML = change.object.currentTheme;
        $themeTitle.style.display = 'block';
        updatePalette(change.object.currentTheme);
      } else if (change.name === 'currentFontSize') {
        $range.value = $output.value = change.object.currentFontSize;
      }
    });
  }

  // Get fontSize from chrome sync
  function getFontSize(value){
    if (!value){
      setFontSize(null, panel.defaultFontSize);
      return panel.defaultFontSize;
    } else {
      return value;
    }
  }

  // Get theme from chrome sync
  function getTheme(array, string){
    if (!array || !string){
      setTheme(null, {
        value: panel.defaultTheme.replace(/\s+/g, '-').toLowerCase(),
        text: panel.defaultTheme
      });
      ga('send', 'event', 'Install', 'Install', 'Devtools Author', 1);
      return panel.defaultTheme;
    }
    for (var i = 0; i < array.length; i++){
      if (array[i].name.replace(/\s+/g, '-').toLowerCase() === string){
        return array[i].name;
      }
    }
  }

  function trackMe(){
    ga('send', 'event', 'Link', 'Click', 'Mike King on GitHub');
  }

  // Initialize theme panel
  function init(){

    function callback(){
      // Listen for changes to the select menu
      $select.addEventListener('change', setTheme);

      // Listen for changes to the select menu
      $range.addEventListener('change', setFontSize);
      
      // Listen for click on element
      $('.footer a')[0].addEventListener('click', trackMe);

      // Observe changes to panel model
      Object.observe(panel, observer, ['add', 'update']);

      // Get current theme from Chrome sync
      storage.get('devtools-theme', function(object){

        panel.currentTheme = getTheme(panel.themes, object['devtools-theme']);

        // Build select menus
        _buildSelectMenu($select, panel);
      });

      // Get current fontSize from Chrome sync
      storage.get('devtools-fontSize', function(object){
        panel.currentFontSize = getFontSize(object['devtools-fontSize']);
      });
    }

    var ajax = new XMLHttpRequest();
    ajax.open('GET', panel.themeJSON);
    ajax.send(null);
    ajax.onreadystatechange = function(){
      if (ajax.readyState === 4) {
        if (ajax.status === 200) {
          panel.themes = JSON.parse(ajax.responseText);

          panel.themes.sort(function(a, b){
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
  
  // Kickstart panel
  init();
})(
document.querySelectorAll.bind(document),
chrome.storage.sync,
window.ga
);