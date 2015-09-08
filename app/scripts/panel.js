(function($, storage){
  'use strict';

  // Panel model
  var panel = panel || {};

  // Select menu
  var $select = $('[data-options]')[0];

  // Current theme
  panel.currentTheme = '';

  // Default theme
  panel.defaultTheme = 'Solarized Dark';

  // Available themes
  panel.themes = [
    {
      'name': '3024',
      'colors': ['#F7F7F7', '#F0F0F0', '#807d7c', '#4a4543', '#a16a94', '#ed0c8c', '#01a252', '#db2d20', '#cdab53']
    },
    {
      'name': 'Bongzilla',
      'colors': ['#1F1F1F', '#262626', '#AEAEAE', '#F8F8F8', '#8DA6CE', '#FF593E', '#FF6400', '#7F90AA', '#78CE91', '#FFCC66']
    },
    {
      'name': 'Clouds',
      'colors': []
    },
    {
      'name': 'Coda',
      'colors': []
    },
    {
      'name': 'CSSedit',
      'colors': []
    },
    {
      'name': 'Monokai',
      'colors': []
    },
    {
      'name': 'Nodejs',
      'colors': []
    },
    {
      'name': 'Solarized Dark',
      'colors': []
    },
    {
      'name': 'Solarized Light',
      'colors': []
    }
  ];

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
      var el     = event.target || event.srcElement;
      var option = el.options[el.selectedIndex];
      save(option);
    } else if (event === null && obj){
      save(obj);
    }
  }

  // Object observer for current theme
  function observer(changes){
    changes.forEach(function(change){
      if (change.name === 'currentTheme') {
        $('#currentTheme')[0].innerHTML = change.object.currentTheme;
      }
    });
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

    // Observe changes to panel model
    Object.observe(panel, observer, ['add', 'update']);

    // Get current theme from Chrome sync
    storage.get('devtools-theme', function(object){

      panel.currentTheme = getTheme(panel.themes, object['devtools-theme']);

      // Build select menus
      _buildSelectMenu($select, panel);
    });
  }
  
  init();
})(
document.querySelectorAll.bind(document),
chrome.storage.sync
);
