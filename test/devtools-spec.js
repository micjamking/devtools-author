describe('DevTools Extension setup', function (){
  var app;

  beforeAll(function(){
    app = window.app;
  });

  it('should creates Author Settings panel', function(){
  	expect(app).toBeDefined();
  	expect(chrome.devtools).toBeDefined();
  });

  it('should load theme CSS file from storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

});
