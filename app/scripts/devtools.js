(function(){
	'use strict';

	var xhr        = new XMLHttpRequest();
	var	stylesheet = 'dist/styles/main.css';

	// if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 34) {
	// 	stylesheet = 'dist/styles/main.css';
	// }

	xhr.open('GET', '/' + stylesheet, false);
	xhr.send();
	chrome.devtools.panels.applyStyleSheet(xhr.responseText);
})();
