describe('DevTools Extension setup', function (){
  var app, storage, panel;

  beforeAll(function(){
    app 	= window.app;
    storage = chrome.storage.sync;
    panel   = chrome.devtools.panels;
  });

  it('should creates Author Settings panel', function(){
  	expect(app).toBeDefined();
  	expect(panel).toBeDefined();
  });

  it('should load theme CSS file from storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

});
