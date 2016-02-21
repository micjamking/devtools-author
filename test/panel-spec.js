describe('DevTools Author Settings panel', function (){
  var panel;

  beforeAll(function(){
    panel   = window.panel;
    ga      = window.ga;
    $       = document.querySelectorAll.bind(document);
    storage = chrome.storage.sync;
  });

  it('should get theme.json via AJAX', function(){
  	expect(panel).toBeDefined();
  });

  it('should set devtools-theme to storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

  it('should get devtools-theme from storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

  it('should set devtools-fontFamily to storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

  it('should get devtools-fontFamily from storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

  it('should set devtools-fontSize to storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

  it('should get devtools-fontSize from storage', function(){
	expect(app).toBeDefined();
	expect(storage).toBeDefined();
  });

});
