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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*eslint no-console: 1*/
	/**
	 * Application entry point
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DevToolsAuthor = undefined;
	
	var _utils = __webpack_require__(1);
	
	var _ui = __webpack_require__(2);
	
	var _ui2 = _interopRequireDefault(_ui);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Creates DevTools Author
	 */
	
	var DevToolsAuthor = exports.DevToolsAuthor = function () {
	  function DevToolsAuthor() {
	    _classCallCheck(this, DevToolsAuthor);
	
	    /** 
	     * DOM References to primary elements
	     * @type {Object}
	     */
	    this.$els = {
	      internalLinks: (0, _utils.$)('a[href^="#"]'),
	      panels: (0, _utils.$)('.panel'),
	      currentYear: (0, _utils.$)('.currentYear')[0],
	      links: (0, _utils.$)('.share-links')[0]
	    };
	
	    /** Setup event listeners */
	    this._registerListeners();
	  }
	
	  /**
	   * Setup UI
	   * @private
	   */
	
	  _createClass(DevToolsAuthor, [{
	    key: '_initUI',
	    value: function _initUI() {
	      var ui = new _ui2.default();
	
	      if (this.$els.currentYear) {
	        ui.setYear(this.$els.currentYear);
	      }
	
	      if (this.$els.internalLinks) {
	        ui.scrollToInternalLinks(this.$els.internalLinks);
	      }
	
	      if (this.$els.panels) {
	        ui.addClassOnScrollInToView(this.$els.panels);
	      }
	    }
	
	    /**
	     * Social Media APIs
	     * @emits {social-loaded} Emits event when Facebook API has completely rendered
	     * @private
	     */
	
	  }, {
	    key: '_initSocial',
	    value: function _initSocial() {
	
	      /** Google API */
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
	
	      /** Twitter API */
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
	
	      /** Facebook SDK */
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
	
	      /** Facebook SDK Init */
	      window.fbAsyncInit = function () {
	
	        FB.init({
	          appId: '1686524291587989',
	          xfbml: true,
	          version: 'v2.5'
	        });
	
	        /**
	         * Publish event after Facebook 
	         * share has rendered (since it *seems* to take the longest)
	         */
	        FB.Event.subscribe('xfbml.render', function () {
	          var fbLoaded = new CustomEvent('social-loaded');
	          window.dispatchEvent(fbLoaded);
	        });
	      };
	    }
	
	    /**
	     * Setup social media UI
	     * @private
	     */
	
	  }, {
	    key: '_initSocialUI',
	    value: function _initSocialUI() {
	
	      if (this.$els.links) {
	        this.$els.links.style.display = 'block';
	      }
	    }
	
	    /**
	     * Setup Event Listeners
	     * @listens {DOMContentLoaded} Listen for event to initialize UI
	     * @listens {load} Listen for event to initialize Social Media API
	     * @listens {social-loaded} Listen for event to initialize Social Media UI
	     * @private
	     */
	
	  }, {
	    key: '_registerListeners',
	    value: function _registerListeners() {
	      var _this = this;
	
	      _utils.w.addEventListener('DOMContentLoaded', function () {
	        _this._initUI();
	      });
	
	      _utils.w.addEventListener('load', function () {
	        _this._initSocial();
	      });
	
	      _utils.w.addEventListener('social-loaded', function () {
	        _this._initSocialUI();
	      });
	    }
	  }]);
	
	  return DevToolsAuthor;
	}();
	
	/** hello.world */
	
	new DevToolsAuthor();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Utility methods
	 */
	var
	
	/** @type {Object} Window */
	w = window,
	
	/** @type {Function} Query selector */
	$ = document.querySelectorAll.bind(document);
	
	/**
	 * utility object 
	 */
	
	var utils = function () {
	  function utils() {
	    _classCallCheck(this, utils);
	
	    /**
	     * Easing Functions
	     * @see http://gizma.com/easing/
	     * @type {Object} _easing
	     * @type {Function} _easing.linear - no easing, no acceleration
	     * @type {Function} _easing.easeInQuad - accelerating from zero velocity
	     * @type {Function} _easing.easeOutQuad - decelerating to zero velocity
	     * @type {Function} _easing.easeInOutQuad - acceleration until halfway, then deceleration
	     * @type {Function} _easing.easeInCubic - accelerating from zero velocity
	     * @type {Function} _easing.easeOutCubic - decelerating to zero velocity
	     * @type {Function} _easing.easeInOutCubic - acceleration until halfway, then deceleration
	     * @type {Function} _easing.easeInQuart - accelerating from zero velocity
	     * @type {Function} _easing.easeOutQuart - decelerating to zero velocity
	     * @type {Function} _easing.easeInOutQuart - acceleration until halfway, then deceleration
	     * @type {Function} _easing.easeInQuint - accelerating from zero velocity
	     * @type {Function} _easing.easeOutQuint - decelerating to zero velocity
	     * @type {Function} _easing.easeInOutQuint - acceleration until halfway, then deceleration
	     */
	    this._easing = {
	      linear: function linear(t) {
	        return t;
	      },
	      easeInQuad: function easeInQuad(t) {
	        return t * t;
	      },
	      easeOutQuad: function easeOutQuad(t) {
	        return t * (2 - t);
	      },
	      easeInOutQuad: function easeInOutQuad(t) {
	        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
	      },
	      easeInCubic: function easeInCubic(t) {
	        return t * t * t;
	      },
	      easeOutCubic: function easeOutCubic(t) {
	        return --t * t * t + 1;
	      },
	      easeInOutCubic: function easeInOutCubic(t) {
	        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
	      },
	      easeInQuart: function easeInQuart(t) {
	        return t * t * t * t;
	      },
	      easeOutQuart: function easeOutQuart(t) {
	        return 1 - --t * t * t * t;
	      },
	      easeInOutQuart: function easeInOutQuart(t) {
	        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
	      },
	      easeInQuint: function easeInQuint(t) {
	        return t * t * t * t * t;
	      },
	      easeOutQuint: function easeOutQuint(t) {
	        return 1 + --t * t * t * t * t;
	      },
	      easeInOutQuint: function easeInOutQuint(t) {
	        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
	      }
	    };
	  }
	
	  /**
	   * Easing
	   * @params {String} easingFunction - Name of easing function to use
	   * @params {Number} elapsedTime - Length of time (ms) that has passed since start
	   * @params {Number} start - Initial (y) starting position
	   * @params {Number} change - Distance to travel
	   * @params {Number} duration - Speed of travel
	   */
	
	  _createClass(utils, [{
	    key: "ease",
	    value: function ease(easingFunction, elapsedTime, start, change, duration) {
	
	      var time = Math.min(1, elapsedTime / duration),
	          easedTiming = this._easing[easingFunction](time);
	
	      return easedTiming * change + start;
	    }
	
	    /**
	     * Throttle an event (ie. scroll) and provide custom event for callback
	     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
	     * @param {String} type - Type of event to throttle
	     * @param {String} name - Name of new event to dispatchEvent
	     * @param {Object} obj - Object to attach event to and dispatch the custom event from
	     */
	
	  }, {
	    key: "throttle",
	    value: function throttle(type, name, obj) {
	
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
	    }
	
	    /**
	     * Check if element is currently visible in viewport
	     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
	     * @param {HTMLElement} element - DOM element to check if currently visible
	     * @param {Number} percentage - The percentage of screen threshold the element must be within
	     */
	
	  }, {
	    key: "isElementInViewport",
	    value: function isElementInViewport(element, percentage) {
	
	      var rect = element.getBoundingClientRect();
	
	      percentage = percentage || 1;
	
	      return rect.bottom >= 0 && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) * percentage && rect.left <= (window.innerWidth || document.documentElement.clientWidth) * percentage;
	    }
	  }]);
	
	  return utils;
	}();
	
	exports.default = utils;
	exports.w = w;
	exports.$ = $;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * User Interface
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Sets up user interface 
	 */
	
	var UI = function () {
	  function UI() {
	    _classCallCheck(this, UI);
	
	    this._utils = new _utils2.default();
	  }
	
	  /**
	   * Scroll to element
	   * @params {HTMLElement} targetElement - Element to scroll to
	   * @params {Number} duration - Speed of scroll animation
	   * @params {Function} callback - Callback function after scroll has completed
	   * @private
	   */
	
	  _createClass(UI, [{
	    key: '_scrollTo',
	    value: function _scrollTo(targetElement, duration, callback) {
	
	      var currentScrollPos = document.body.scrollTop,
	          distanceToScroll = targetElement.offsetTop - currentScrollPos,
	          speed = 16;
	
	      /** Scroll animation */
	      (function animateScroll(elapsedTime) {
	        elapsedTime += speed;
	        document.body.scrollTop = this._utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration);
	        if (elapsedTime < duration) {
	          _utils.w.requestAnimationFrame(function () {
	            animateScroll(elapsedTime);
	          });
	        } else if (elapsedTime >= duration) {
	          return callback();
	        }
	      })(0);
	    }
	
	    /**
	     * Scroll to all anchors
	     * @params {Array} linksArray - Array of anchor elements
	     */
	
	  }, {
	    key: 'scrollToInternalLinks',
	    value: function scrollToInternalLinks(linksArray) {
	
	      /** Click event callback */
	      function scrollToListener(event) {
	        event.preventDefault();
	
	        var hash = event.target.href ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'),
	            element = (0, _utils.$)(hash)[0];
	
	        function changeURLHash() {
	          _utils.w.location.hash = hash;
	        }
	
	        this._scrollTo(element, 1250, changeURLHash);
	      }
	
	      /** Attach click event listener */
	      if (linksArray) {
	        for (var i = 0; i < linksArray.length; i++) {
	          linksArray[i].addEventListener('click', scrollToListener, true);
	        }
	      }
	    }
	
	    /**
	     * Add class to element when it is scrolled in to view
	     * @params {Array} elements - Array of HTML elements to watch
	     */
	
	  }, {
	    key: 'addClassOnScrollInToView',
	    value: function addClassOnScrollInToView(elements) {
	
	      var that = this;
	
	      /** Scroll event callback  */
	      function _scrollCallback() {
	
	        function toggleActiveClass(el) {
	          if (that._utils.isElementInViewport(el, 0.75)) {
	            el.classList.add('active');
	          } else {
	            el.classList.remove('active');
	          }
	        }
	
	        Array.prototype.forEach.call(elements, toggleActiveClass);
	      }
	
	      /** Throttle default scroll event and listen for optimizedScroll event */
	      this._utils.throttle('scroll', 'optimizedScroll');
	      _utils.w.addEventListener('optimizedScroll', function () {
	        _scrollCallback();
	      });
	    }
	
	    /**
	     * Set current year in footer
	     * @params {HTMLElement} year - Element to set year text within
	     */
	
	  }, {
	    key: 'setYear',
	    value: function setYear(year) {
	
	      var date = new Date();
	
	      if (year) {
	        year.innerHTML = date.getFullYear() === 2015 ? date.getFullYear() : '2015 - ' + date.getFullYear();
	      }
	    }
	  }]);
	
	  return UI;
	}();
	
	exports.default = UI;

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map