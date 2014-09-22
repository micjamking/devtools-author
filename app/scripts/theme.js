(function(chrome, document){
  'use strict';

  var panel   = panel || {};
//   var storage = chrome.storage.local;
  var $ = document.querySelectorAll.bind( document );

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

  var select = $('[data-options]');
  
  for (var i = 0; i < select.length; i++){
    var options = select[i].dataset.options;
    options = options.replace(/for\s/g, '').replace(/in\s/g, '');
    options = options.split(' ').reverse();
    var array = panel[options[0]];
    var value = options[1];
    var label = options[2];
  }


//   angular.module('themeApp', [ 'ngRoute' ])
//   .controller('ThemePanelCtrl', function ($scope, $timeout) {
    
//     // Assign Chrome storage to local variable.
//     var storage = chrome.storage.local;
    
//     // Scope module
//     $scope.panel = {
      
//       // Themes
//       themes: [
//         '3024',
//         'bongzilla',
//         'clouds',
//         'coda',
//         'cssedit',
//         'monokai',
//         'nodejs',
//         'solarized-dark',
//         'solarized-light'
//       ]

//     };

//     storage.get('devtools-theme', function(object){
//       $scope.panel.currentTheme = $scope.panel.selectedTheme = object['devtools-theme'];
//     });

//     $scope.save = function(theme){

//       if (angular.isDefined(theme)) {
//         storage.set({ 'devtools-theme': theme });
//         $scope.currentTheme = theme;
//         $scope.message = 'Theme saved: reload DevTools!';
//       } else {

//         $scope.panel.message = 'Error: no theme specified';
//         return;
//       }
//     };

//     $scope.$watch('panel', function(newValue){
//       $timeout(function(){
//         if (angular.isDefined(newValue.currentTheme)){
//           $scope.currentTheme = newValue.currentTheme;
//         }
//         if (angular.isDefined(newValue.message)){
//           $scope.message = newValue.message;
//         }
//       }, 500);
//     });

//   });
})(chrome, document);