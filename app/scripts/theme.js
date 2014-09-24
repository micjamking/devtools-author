(function(storage, $){
  'use strict';
  
  // Panel model
  var panel = panel || {};
  
  // Available themes
  panel.themes = [
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
  
  // Select menu
  var select = $('[data-options]');
  
  // Build select menus like ngOptions
  var _buildSelectMenu = function(object){

    for (var i = 0; i < select.length; i++){
      var options, array;
      
      // Get the data attribute value
      options = select[i].dataset.options;

      // Clean string and create reverse array
      options = options.replace(/in\s/g, '').split(' ');

      // Assign array from object by property name
      // using the value from the last item in options
      array   = object[options[options.length - 1]];
      
      for (var j = 0; j < array.length; j++){

        var option = document.createElement('option');

        // Assign option value & text from array
        option.value = array[j];
        option.text  = array[j];
        
        // Select currentTheme option
        if (panel.currentTheme === array[j]){
          option.selected = 'selected';
        }

        select[i].add(option, null);
      }
    }
  };

  // Create event listeners for select menus
  var selectListener = function(){
    var val = select[0].options[select[0].selectedIndex].value;
    
    storage.set({
      'devtools-theme': val
    }, function(){
      panel.currentTheme = val;
    });
  };

  var observer = function(changes){
    changes.forEach(function(change){
      $('#currentTheme')[0].innerHTML = change.object[change.name];
      console.log(change); // all changes
    });
  };

  // Get current theme from Chrome sync
  storage.get('devtools-theme', function(object){
    panel.currentTheme = object['devtools-theme'] || 'solarized-dark';
  
    // Build select menus
    _buildSelectMenu(panel);
  });
      
  // Listen for changes to the select menu
  select[0].addEventListener('change', selectListener);

  // Observe changes to panel model
  Object.observe(panel, observer, ['add', 'update']);

})(
chrome.storage.sync,
document.querySelectorAll.bind(document)
);