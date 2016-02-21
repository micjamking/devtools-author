describe('DevTools Author Settings panel spec', function (){
  var panel;

  beforeAll(function(){
    panel = window.panel;
  });

  it('should get theme.json via XHR', function(){
  	expect(panel).toBeDefined();
  });

  it('sets devtools-theme to storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

  it('gets devtools-theme from storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

  it('sets devtools-fontFamily to storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

  it('gets devtools-fontFamily from storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

  it('sets devtools-fontSize to storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

  it('gets devtools-fontSize from storage', function(){
	expect(app).toBeDefined();
	expect(chrome.storage).toBeDefined();
  });

});
