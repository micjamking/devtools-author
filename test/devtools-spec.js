describe('DevTools Extension setup', function (){
  
  var app, storage, panel, stylesDir;

  beforeAll(function(){
	app       = window.app;
	storage   = chrome.storage.sync;
	panel     = chrome.devtools.panels;
	stylesDir = 'dist/styles/';
	
	spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
	spyOn(XMLHttpRequest.prototype, 'send');
	storage.set({ 'devtools-theme': '3024' });
  });

  describe('Creates Author Settings panel via chrome.devtools.panels', function(){

	it('should load panel HTML', function(){
	  var pagePath  = 'dist/panel.html';

	  panel.create('Author Settings', null, pagePath, function(panelObj){	
	    expect(panelObj).toBeDefined();
	  });
	});

  });

  describe('Get stylesheet name from chrome.storage and load stylesheet via AJAX', function(){
  	var theme;

	it('should get theme settings from storage', function(){
	  storage.get('devtools-theme', function(object){
	  	theme = object['devtools-theme'];
	    expect(theme).toBe('monokai');
	  });
	});


	it('should GET theme CSS file via AJAX', function(){
	  var options = {
	    theme: stylesDir + 'themes/' + theme + '.css'
	  };

	  app.loadTheme(options, function(){
	    expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
	  });
	});
  });

});
