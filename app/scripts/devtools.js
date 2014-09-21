(function(){
  'use strict';

  var dir = 'dist/styles/';

  var loadTheme = function(object){

    var _request = function(stylesheet){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/' + stylesheet, false);
      xhr.send();
      chrome.devtools.panels.applyStyleSheet(xhr.responseText);
    };

    _request(object.theme);

    if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 34) {
      _request(object.isCanary);
    }
  };

  loadTheme({
    theme: dir + 'themes/solarized-dark.css',
    isCanary: dir + 'modules/canary.css'
  });
})();
