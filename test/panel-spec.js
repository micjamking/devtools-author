describe('DevTools Author Settings panel', function (){
  
  var panel, storage;
  
  /** Global modules & chrome.* API stubs */
  beforeAll(function(){
    panel     = window.panel;
    storage   = chrome.storage.sync;
  });
  
  /** panel.init */
  it('should GET theme.json via AJAX', function(){
	spyOn(XMLHttpRequest.prototype, 'open').and.callThrough();
	spyOn(XMLHttpRequest.prototype, 'send');

	panel.init();

  	expect(panel).toBeDefined();
	expect(XMLHttpRequest.prototype.open).toHaveBeenCalled();
  });

  /** panel.setTheme */
  it('should set devtools-theme to storage', function(){
  	var event = {
  	  target: {
  		options: [
  		  {
			value: '3024',
			text: '3024'
  		  }
  		],
		selectedIndex: 0
  	  },
  	  type: 'change',
  	  bubbles: true,
  	  cancelable: false
  	};
 
  	var theme = panel.setTheme(event);

	expect(panel.setTheme).toBeDefined();
	expect(storage.set.calledWith({ 'devtools-theme': '3024' })).toBe(true);
	expect(theme).toEqual('3024');
  });

  /** panel.getTheme */
  it('should return devtools-theme from storage or default', function(){
    var themeJSON = [
	  { "name": "Default", "colors": [] },
	  { "name": "3024",    "colors": [] },
	  { "name": "Monokai", "colors": [] },
	];

  	expect(panel.getTheme).toBeDefined();
	expect(panel.getTheme()).toEqual('3024');
	expect(storage.set.calledWith({ 'devtools-theme': '3024' })).toBe(true);
	expect(panel.getTheme(themeJSON, 'monokai')).toEqual('Monokai');
  });

  /** panel.setFontFamily */
  it('should set devtools-fontFamily to storage', function(){
  	var event = {
  	  target: {
		value: 'Hack'
  	  },
  	  type: 'change',
  	  bubbles: true,
  	  cancelable: false
  	};
 
  	var fontFamily = panel.setFontFamily(event);

	expect(panel.setFontFamily).toBeDefined();
	expect(storage.set.calledWith({ 'devtools-fontFamily': 'Hack' })).toBe(true);
	expect(fontFamily).toEqual('Hack');
  });

  /** panel.getFontFamily */
  it('should return devtools-fontFamily from storage or default', function(){
  	expect(panel.getFontFamily).toBeDefined();
	expect(panel.getFontFamily()).toEqual('Hack');
	expect(storage.set.calledWith({ 'devtools-fontFamily': 'Hack' })).toBe(true);
	expect(panel.getFontFamily('Menlo')).toEqual('Menlo');
  });

  /** panel.setFontSize */
  it('should set devtools-fontSize to storage', function(){
  	var event = {
  	  target: {
		value: 16
  	  },
  	  type: 'change',
  	  bubbles: true,
  	  cancelable: false
  	};
 
  	var fontSize = panel.setFontSize(event);

	expect(panel.setFontSize).toBeDefined();
	expect(storage.set.calledWith({ 'devtools-fontSize': 16 })).toBe(true);
	expect(fontSize).toEqual(16);
  });

  /** panel.getFontSize */
  it('should return devtools-fontSize from storage or default', function(){
  	expect(panel.getFontSize).toBeDefined();
	expect(panel.getFontSize()).toEqual(14);
	expect(storage.set.calledWith({ 'devtools-fontSize': 14 })).toBe(true);
	expect(panel.getFontSize(12)).toEqual(12);
  });

});