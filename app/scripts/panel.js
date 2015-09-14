(function($, storage){
  'use strict';

  // Panel model
  var panel = panel || {};

  // Select menu
  var $select = $('[data-options]')[0];

  // Number input
  var $number = $('input[type=number]')[0];

  // Palette container
  var $palette = $('.palette')[0];
  
  // Theme title
  var $themeTitle = $('#currentTheme')[0];

  // Current theme
  panel.currentTheme = '';

  // Default theme
  panel.defaultTheme = '3024';

  // Default fontSize
  panel.defaultFontSize = 12;

  // Available themes
  panel.themes = [
    {
      'name': '3024',
      'colors': ['#F7F7F7', '#F0F0F0', '#807d7c', '#4a4543', '#a16a94', '#ed0c8c', '#01a252', '#db2d20', '#cdab53']
    },
    {
      'name': 'Arstotzka',
      'colors': ['#211f1e', '#586e75', '#657b83', '#839496', '#93a1a1', '#eee8d5', '#fdf6e3', '#b58900', '#cb4b16', '#dc322f', '#268bd2', '#2aa198', '#859900', '#d33682', '#6c71c4']
    },
    {
      'name': 'Azure',
      'colors': ['#181D26', '#586e75', '#657b83', '#839496', '#93a1a1', '#eee8d5', '#fdf6e3', '#b58900', '#cb4b16', '#dc322f', '#268bd2', '#2aa198', '#859900', '#d33682', '#6c71c4']
    },
    {
      'name': 'Bongzilla',
      'colors': ['#1F1F1F', '#262626', '#AEAEAE', '#F8F8F8', '#8DA6CE', '#FF593E', '#FF6400', '#7F90AA', '#78CE91', '#FFCC66']
    },
    {
      'name': 'Clouds',
      'colors': ['#FFFFFF', '#F7F7F7', '#BCC8BA', '#000000', '#484848', '#484848', '#C52727', '#AF956F', '#5D90CD', '#46A609', '#BF78CC']
    },
    {
      'name': 'Coda',
      'colors': ['#FFFFFF', '#F7F7F7', '#3C802C', '#000000', '#AA1F63', '#881181', '#ED7722', '#916319', '#AA2063']
    },
    {
      'name': 'CSSedit',
      'colors': ['#FFFFFF', '#F7F7F7', '#A8A8A8', '#474747', '#6D4496', '#B84610', '#4678BC', '#5D9629', '#6D4496']
    },
    {
      'name': 'GitHub',
      'colors': ['#ffffff', '#586e75', '#657b83', '#839496', '#93a1a1', '#eee8d5', '#fdf6e3', '#b58900', '#cb4b16', '#dc322f', '#d33682', '#6c71c4', '#268bd2', '#2aa198', '#859900']
    },
    {
      'name': 'Monokai',
      'colors': ['#272822', '#30322A', '#75715E', '#F8F8F0', '#F8F8F0', '#66D9EF', '#A6E22E', '#F92672', '#F92672', '#E6DB74', '#F92672', '#A6E22E']
    },
    {
      'name': 'Nodejs',
      'colors': ['#22252A', '#292D33', '#FFFFFF', '#B4C2D6', '#5D5D5D', '#B6DB51']
    },
    {
      'name': 'Solarized Dark',
      'colors': ['#002b36', '#073642', '#586e75', '#839496', '#93a1a1', '#b58900', '#cb4b16', '#dc322f', '#268bd2', '#2aa198', '#859900', '#d33682']
    },
    {
      'name': 'Solarized Light',
      'colors': ['#586e75', '#657b83', '#93a1a1', '#eee8d5', '#fdf6e3', '#b58900', '#cb4b16', '#dc322f', '#268bd2', '#2aa198', '#859900', '#d33682']
    }
  ];

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
        setTimeout(function(){
          console.log('yo!');
        });
        $themeTitle.style.display = 'block';
        updatePalette(change.object.currentTheme);
      } else if (change.name === 'currentFontSize') {
        $number.value = change.object.currentFontSize;
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
      return panel.defaultTheme;
    }
    for (var i = 0; i < array.length; i++){
      if (array[i].name.replace(/\s+/g, '-').toLowerCase() === string){
        return array[i].name;
      }
    }
  }

  // Initialize theme panel
  function init(){

    // Listen for changes to the select menu
    $select.addEventListener('change', setTheme);
    
    // Listen for changes to the select menu
    $number.addEventListener('change', setFontSize);

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
  
  init();
})(
document.querySelectorAll.bind(document),
chrome.storage.sync
);
