/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file Application entry point
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	var _utils = __webpack_require__(1);
	
	var _ui = __webpack_require__(2);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Creates DevTools Author
	 * @class
	 */
	
	var DevToolsAuthor = function () {
	
	  /**
	   * @constructs
	   */
	
	  function DevToolsAuthor() {
	    _classCallCheck(this, DevToolsAuthor);
	
	    this.$els_ = {
	      internalLinks: (0, _utils.$)('a[href^="#"]'),
	      panels: (0, _utils.$)('.panel'),
	      currentYear: (0, _utils.$)('.currentYear')[0],
	      links: (0, _utils.$)('.share-links')[0]
	    };
	
	    this.registerListeners_();
	  }
	
	  _createClass(DevToolsAuthor, [{
	    key: 'registerListeners_',
	    value: function registerListeners_() {
	      var _this = this;
	
	      _utils.w.addEventListener('DOMContentLoaded', function () {
	        _this.initUI_();
	      });
	
	      _utils.w.addEventListener('load', function () {
	        _this.initSocial_();
	      });
	
	      _utils.w.addEventListener('social-loaded', function () {
	        _this.initSocialUI_();
	      });
	    }
	  }, {
	    key: 'initUI_',
	    value: function initUI_() {
	      if (this.$els_.currentYear) {
	        _ui2.default.setYear(this.$els_.currentYear);
	      }
	      if (this.$els_.internalLinks) {
	        _ui2.default.scrollToInternalLinks(this.$els_.internalLinks);
	      }
	      if (this.$els_.panels) {
	        _ui2.default.addClassOnScrollInToView(this.$els_.panels);
	      }
	    }
	  }, {
	    key: 'initSocial_',
	    value: function initSocial_() {
	      /**
	       * Google API
	       */
	      (function (d, s, id) {
	        var js,
	            fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) {
	          return;
	        }
	        js = d.createElement(s);
	        js.id = id;
	        js.src = '//apis.google.com/js/platform.js';
	        fjs.parentNode.insertBefore(js, fjs);
	      })(document, 'script', 'google-sdk');
	
	      /**
	       * Twitter Widgets API
	       */
	      (function (d, s, id) {
	        var js,
	            fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) {
	          return;
	        }
	        js = d.createElement(s);
	        js.id = id;
	        js.src = '//platform.twitter.com/widgets.js';
	        fjs.parentNode.insertBefore(js, fjs);
	      })(document, 'script', 'twitter-wjs');
	
	      /**
	       * Facebook SDK
	       */
	      (function (d, s, id) {
	        var js,
	            fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) {
	          return;
	        }
	        js = d.createElement(s);
	        js.id = id;
	        js.src = '//connect.facebook.net/en_US/sdk.js';
	        fjs.parentNode.insertBefore(js, fjs);
	      })(document, 'script', 'facebook-jssdk');
	
	      /**
	       * Facebook SDK Init
	       */
	      window.fbAsyncInit = function () {
	        FB.init({
	          appId: '1686524291587989',
	          xfbml: true,
	          version: 'v2.5'
	        });
	
	        // Publish event after Facebook
	        // share has rendered (since it *seems* to take the longest)
	        FB.Event.subscribe('xfbml.render', function () {
	          var fbLoaded = new CustomEvent('social-loaded');
	          window.dispatchEvent(fbLoaded);
	        });
	      };
	    }
	  }, {
	    key: 'initSocialUI_',
	    value: function initSocialUI_() {
	      if (this.$els_.links) {
	        this.$els_.links.style.display = 'block';
	      }
	    }
	  }]);
	
	  return DevToolsAuthor;
	}();
	
	new DevToolsAuthor();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * @file Utility functions
	 */
	
	var w = window,
	    $ = document.querySelectorAll.bind(document),
	    utils = {},
	
	/**
	 * Easing Functions - inspired from http://gizma.com/easing/
	 */
	easing_ = {
	    // no easing, no acceleration
	    linear: function linear(t) {
	        return t;
	    },
	    // accelerating from zero velocity
	    easeInQuad: function easeInQuad(t) {
	        return t * t;
	    },
	    // decelerating to zero velocity
	    easeOutQuad: function easeOutQuad(t) {
	        return t * (2 - t);
	    },
	    // acceleration until halfway, then deceleration
	    easeInOutQuad: function easeInOutQuad(t) {
	        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	    },
	    // accelerating from zero velocity
	    easeInCubic: function easeInCubic(t) {
	        return t * t * t;
	    },
	    // decelerating to zero velocity
	    easeOutCubic: function easeOutCubic(t) {
	        return --t * t * t + 1;
	    },
	    // acceleration until halfway, then deceleration
	    easeInOutCubic: function easeInOutCubic(t) {
	        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	    },
	    // accelerating from zero velocity
	    easeInQuart: function easeInQuart(t) {
	        return t * t * t * t;
	    },
	    // decelerating to zero velocity
	    easeOutQuart: function easeOutQuart(t) {
	        return 1 - --t * t * t * t;
	    },
	    // acceleration until halfway, then deceleration
	    easeInOutQuart: function easeInOutQuart(t) {
	        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	    },
	    // accelerating from zero velocity
	    easeInQuint: function easeInQuint(t) {
	        return t * t * t * t * t;
	    },
	    // decelerating to zero velocity
	    easeOutQuint: function easeOutQuint(t) {
	        return 1 + --t * t * t * t * t;
	    },
	    // acceleration until halfway, then deceleration
	    easeInOutQuint: function easeInOutQuint(t) {
	        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	    }
	};
	
	/**
	 * easing
	 * @params easingFunction Name of easing function to use
	 * @params elapsedTime Length of time (ms) that has passed since start
	 * @params start initial starting point
	 * @params change distance to travel
	 * @params duration speed of travel
	 */
	utils.ease = function (easingFunction, elapsedTime, start, change, duration) {
	    var time = Math.min(1, elapsedTime / duration),
	        easedTiming = easing_[easingFunction](time);
	
	    return easedTiming * change + start;
	};
	
	/**
	 * Throttle an event (ie. scroll) and provide custom event for callback
	 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
	 * @param {String} type - Type of event to throttle
	 * @param {String} name - Name of new event to dispatchEvent
	 * @param {Object} obj - Object to attach event to and dispatch the custom event from
	 */
	utils.throttle = function (type, name, obj) {
	    obj = obj || w;
	    var running = false;
	
	    var func = function func() {
	        if (running) {
	            return;
	        }
	        running = true;
	        requestAnimationFrame(function () {
	            obj.dispatchEvent(new CustomEvent(name));
	            running = false;
	        });
	    };
	
	    obj.addEventListener(type, func);
	};
	
	/**
	 * Check if element is currently visible in viewport
	 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
	 * @param {HTMLElement} element - DOM element to check if currently visible
	 * @param {Number} percentage - The percentage of screen threshold the element must be within
	 */
	utils.isElementInViewport = function (element, percentage) {
	    var rect = element.getBoundingClientRect();
	
	    percentage = percentage || 1;
	
	    return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) * percentage && rect.left <= (window.innerWidth || document.documentElement.clientWidth) * percentage;
	};
	
	exports.w = w;
	exports.$ = $;
	exports.utils = utils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(1);
	
	/** @object UI */
	var UI = {};
	
	/**
	 * scroll to element
	 * @params targetElement Element to scroll to
	 * @params duration Speed of scroll animation
	 * @params callback Callback function after scroll has completed
	 */
	/**
	 * @file User Interface
	 */
	UI.scrollTo = function (targetElement, duration, callback) {
	  var currentScrollPos = document.body.scrollTop,
	      distanceToScroll = targetElement.offsetTop - currentScrollPos,
	      speed = 16;
	
	  // Scroll animation
	  (function animateScroll(elapsedTime) {
	    elapsedTime += speed;
	    document.body.scrollTop = _utils.utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration);
	    if (elapsedTime < duration) {
	      _utils.w.requestAnimationFrame(function () {
	        animateScroll(elapsedTime);
	      });
	    } else if (elapsedTime >= duration) {
	      return callback();
	    }
	  })(0);
	};
	
	/**
	 * scroll to all anchors
	 * @params linksArray Array of anchor elements
	 */
	UI.scrollToInternalLinks = function (linksArray) {
	  function scrollToListener(event) {
	    event.preventDefault();
	
	    var hash = event.target.href ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'),
	        element = (0, _utils.$)(hash)[0];
	
	    function changeURLHash() {
	      _utils.w.location.hash = hash;
	    }
	
	    UI.scrollTo(element, 1250, changeURLHash);
	  }
	
	  if (linksArray) {
	    for (var i = 0; i < linksArray.length; i++) {
	      linksArray[i].addEventListener('click', scrollToListener, true);
	    }
	  }
	};
	
	/**
	 * Add class to element when it is scrolled in to view
	 * @params {HTMLElement} elements - Array of HTML elements to watch
	 */
	UI.addClassOnScrollInToView = function (elements) {
	
	  function toggleActiveClass(el) {
	    if (_utils.utils.isElementInViewport(el, 0.75)) {
	      el.classList.add('active');
	    } else {
	      el.classList.remove('active');
	    }
	  }
	
	  function scrollCallback() {
	    Array.prototype.forEach.call(elements, toggleActiveClass);
	  }
	
	  _utils.utils.throttle('scroll', 'optimizedScroll');
	  _utils.w.addEventListener('optimizedScroll', scrollCallback);
	};
	
	/**
	 * Set Year
	 * @params year Element to set year text within
	 */
	UI.setYear = function (year) {
	  var date = new Date();
	  if (year) {
	    year.innerHTML = date.getFullYear();
	  }
	};
	
	/** @export UI */
	exports.default = UI;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map