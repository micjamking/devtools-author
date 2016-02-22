describe('DevTools Extension setup', function (){
  
  var app, pagePath, panel, storage, stylesDir;

  /** Variables & chrome.* API stubs */
  beforeAll(function(){
	app       = window.app;
	storage   = chrome.storage.sync;
	panel     = chrome.devtools.panels;
	stylesDir = '/dist/styles/';
	pagePath  = '/dist/panel.html';
	
	storage.get.withArgs('devtools-theme').yields({ 'devtools-theme': '3024' });
  });

  /** app.init */
  it('should create Author Settings panel using chrome.devtools.panels', function(){
  	spyOn(app, 'init');
	app.init();
	
	expect(app.init).toHaveBeenCalled();
	expect(panel.create.calledWith('Author Settings', null, pagePath)).toBe(true);
  });

  /** app.loadTheme */
  it('should load theme CSS file via AJAX using chrome.storage settings', function(){
  	var theme, themeObject;
  	
	spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
	spyOn(XMLHttpRequest.prototype, 'send');

	storage.get('devtools-theme', function(object){
	  theme 	  = object['devtools-theme'];
	  themeObject = { theme: stylesDir + 'themes/' + theme + '.css' };
	});
	
	expect(theme).toEqual('3024');
	expect(app.loadTheme(themeObject)).toEqual('/dist/styles/themes/3024.css');
	expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
  });

});