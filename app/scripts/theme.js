(function($, storage){
  'use strict';
  
  // Panel model
  var panel = panel || {};
  
  // Available themes
  panel.themes = [
    '3024',
    'Bongzilla',
    'Clouds',
    'Coda',
    'CSSedit',
    'Monokai',
    'Nodejs',
    'Solarized Dark',
    'Solarized Light'
  ];
  
  // Select menu
  var select = $('[data-options]');
  
  // Build select menus like ngOptions
  var _buildSelectMenu = function(object){
    var options, array;

    // Get the data attribute value
    options = select[0].dataset.options;

    // Clean string and create array
    options = options.replace(/in\s/g, '').split(' ');

    // Assign array from object by property name
    // using the value from the last item in options
    array = object[options[options.length - 1]];

    for (var j = 0; j < array.length; j++){

      var option = document.createElement('option');

      // Assign option value & text from array
      option.value = array[j].replace(/\s+/g, '-').toLowerCase();
      option.text  = array[j];

      // Select currentTheme option
      if (panel.currentTheme === array[j]){
        option.selected = 'selected';
      }

      select[0].add(option, null);
    }
  };

  // Event listener for select menu
  var selectListener = function(){
    storage.set({
      'devtools-theme': select[0].options[select[0].selectedIndex].value
    }, function(){
      panel.currentTheme = select[0].options[select[0].selectedIndex].text;
    });
  };

  var observer = function(changes){
    changes.forEach(function(change){
      $('#currentTheme')[0].innerHTML = change.object[change.name];
      console.log(change); // all changes
    });
  };

  var getTheme = function(array, string){
    if (!array){ return false; }
    for (var i = 0; i < array.length; i++){
      if (array[i].replace(/\s+/g, '-').toLowerCase() === string){
        return array[i];
      }
    }
  };

  // Get current theme from Chrome sync
  storage.get('devtools-theme', function(object){

    panel.currentTheme = getTheme(panel.themes, object['devtools-theme']) || 'Solarized Dark';
  
    // Build select menus
    _buildSelectMenu(panel);
  });
      
  // Listen for changes to the select menu
  select[0].addEventListener('change', selectListener);

  // Observe changes to panel model
  Object.observe(panel, observer, ['add', 'update']);

})(
document.querySelectorAll.bind(document),
chrome.storage.sync
);