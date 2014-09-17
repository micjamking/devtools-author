(function(){
	'use strict';

	var xhr        = new XMLHttpRequest();
	var	stylesheet = 'dist/themes/solarized-dark.css';

	xhr.open('GET', '/' + stylesheet, false);
	xhr.send();
	chrome.devtools.panels.applyStyleSheet(xhr.responseText);
})();
