var xhr = new XMLHttpRequest(),
	stylesheet = 'app/styles/stable.css';

if (/Chrome\/(\d\d)/.exec(navigator.userAgent)[1] > 34) {
	stylesheet = 'app/styles/custom.css'
}

xhr.open("GET", "/" + stylesheet, false);
xhr.send();
chrome.devtools.panels.applyStyleSheet(xhr.responseText);
