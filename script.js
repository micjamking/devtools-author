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
	
	  /**
	   * Setup DOM references and event listeners
	   */
	
	  function DevToolsAuthor() {
	    _classCallCheck(this, DevToolsAuthor);
	
	    /** 
	     * DOM References to primary elements
	     * @type {Object} _$els
	     * @property {HTMLElement} internalLinks - Anchor links with a hash (#) href value
	     * @property {HTMLElement} panels - Elements with the class of `.panel`
	     * @property {HTMLElement} currentYear - Element with the class of `.currentYear`
	     * @property {HTMLElement} links - Element with the class of `.share-links`
	     * @private
	     */
	    this._$els = {
	      internalLinks: (0, _utils.$)('a[href^="#"]'),
	      panels: (0, _utils.$)('.panel'),
	      currentYear: (0, _utils.$)('.currentYear')[0],
	      links: (0, _utils.$)('.share-links')[0]
	    };
	
	    /**
	     * Reference to user interface methods
	     * @type {Object} _ui
	     * @private
	     */
	    this._ui = new _ui2.default();
	
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
	
	      if (this._$els.currentYear) {
	        this._ui.setYear(this._$els.currentYear);
	      }
	
	      if (this._$els.internalLinks) {
	        this._ui.scrollToInternalLinks(this._$els.internalLinks);
	      }
	
	      if (this._$els.panels) {
	        this._ui.addClassOnScrollInToView(this._$els.panels);
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
	
	      if (this._$els.links) {
	        this._$els.links.style.display = 'block';
	      }
	    }
	
	    /**
	     * Setup Event Listeners
	     * @listens {DOMContentLoaded} Initialize UI
	     * @listens {load} Initialize Social Media API
	     * @listens {social-loaded} Initialize Social Media UI
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
	
	/** @type {Object} Window */
	var w = exports.w = window;
	
	/** @type {Function} Query selector */
	var $ = exports.$ = document.querySelectorAll.bind(document);
	
	/**
	 * utility methods 
	 */
	
	var utils = function () {
	
	  /**
	   * Setup 
	   */
	
	  function utils() {
	    _classCallCheck(this, utils);
	
	    /**
	     * Easing Functions
	     * @see http://gizma.com/easing/
	     * @type {Object} _easing
	     * @property {Function(t: Number): Number} linear - no easing, no acceleration
	     * @property {Function(t: Number): Number} easeInQuad - accelerating from zero velocity
	     * @property {Function(t: Number): Number} easeOutQuad - decelerating to zero velocity
	     * @property {Function(t: Number): Number} easeInOutQuad - acceleration until halfway, then deceleration
	     * @property {Function(t: Number): Number} easeInCubic - accelerating from zero velocity
	     * @property {Function(t: Number): Number} easeOutCubic - decelerating to zero velocity
	     * @property {Function(t: Number): Number} easeInOutCubic - acceleration until halfway, then deceleration
	     * @property {Function(t: Number): Number} easeInQuart - accelerating from zero velocity
	     * @property {Function(t: Number): Number} easeOutQuart - decelerating to zero velocity
	     * @property {Function(t: Number): Number} easeInOutQuart - acceleration until halfway, then deceleration
	     * @property {Function(t: Number): Number} easeInQuint - accelerating from zero velocity
	     * @property {Function(t: Number): Number} easeOutQuint - decelerating to zero velocity
	     * @property {Function(t: Number): Number} easeInOutQuint - acceleration until halfway, then deceleration
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
	   * Easing Timing
	   * @param {String} easingFunction - Name of easing function to use
	   * @param {Number} elapsedTime - Length of time (ms) that has passed since start
	   * @param {Number} start - Initial (y) starting position
	   * @param {Number} change - Distance to travel
	   * @param {Number} duration - Speed of travel
	   * @return {Number} eased timing
	   */
	
	  _createClass(utils, [{
	    key: "ease",
	    value: function ease(easingFunction, elapsedTime, start, change, duration) {
	
	      var time = Math.min(1, elapsedTime / duration),
	          easedTiming = this._easing[easingFunction](time);
	
	      return easedTiming * change + start;
	    }
	
	    /**
	     * Throttle an event and provide custom event for callback
	     * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
	     * @param {String} type - Type of event to throttle
	     * @param {String} name - Name of new CustomEvent to dispatch
	     * @param {Object} obj - Object to attach event to and dispatch the custom event from
	     * @listens {type} Listen for event to throttle and dispatch custom event for
	     * @emits {name} Custom event to dispatch on object
	     */
	
	  }, {
	    key: "throttleEvent",
	    value: function throttleEvent(type, name, obj) {
	
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
	     * @return {Boolean} true|false - Returns true if bottom and right property of element is greater
	     * than 0, and top and left property of element is less than the window height and width respectively,
	     * taking in to account a threshold percentage of the screen.
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
	
	var _utils2 = __webpack_require__(1);
	
	var _utils3 = _interopRequireDefault(_utils2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Reference to utility method
	 * @type {Object} _utils
	 * @private
	 */
	var _utils = new _utils3.default();
	
	/**
	 * Sets up user interface 
	 */
	
	var UI = function () {
	
	  /**
	   * Constructor
	   */
	
	  function UI() {
	    _classCallCheck(this, UI);
	  }
	
	  /**
	   * Scroll to element
	   * @param {HTMLElement} targetElement - Element to scroll to
	   * @param {Number} duration - Speed of scroll animation
	   * @param {Function} callback - Callback function after scroll has completed
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
	        document.body.scrollTop = _utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration);
	        if (elapsedTime < duration) {
	          _utils2.w.requestAnimationFrame(function () {
	            animateScroll(elapsedTime);
	          });
	        } else if (elapsedTime >= duration) {
	          return callback();
	        }
	      })(0);
	    }
	
	    /**
	     * Scroll to all anchors
	     * @param {Array} linksArray - Array of anchor elements
	     * @listens {click} Listen for click event on internal links and fire callback method
	     */
	
	  }, {
	    key: 'scrollToInternalLinks',
	    value: function scrollToInternalLinks(linksArray) {
	      var _this = this;
	
	      /** Click event callback */
	      function _scrollToListener(event, scrollTo) {
	        event.preventDefault();
	
	        var hash = event.target.href ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'),
	            element = (0, _utils2.$)(hash)[0];
	
	        function changeURLHash() {
	          _utils2.w.location.hash = hash;
	        }
	
	        scrollTo(element, 1250, changeURLHash);
	      }
	
	      /** Attach click event listener */
	      if (linksArray) {
	        for (var i = 0; i < linksArray.length; i++) {
	          linksArray[i].addEventListener('click', function (e) {
	            _scrollToListener(e, _this._scrollTo);
	          }, true);
	        }
	      }
	    }
	
	    /**
	     * Add class to element when it is scrolled in to view
	     * @param {Array} elements - Array of HTML elements to watch
	     * @listens {scroll} Listen for scroll event on window (default)
	     * @listens {optimizedScroll} Listen for optimizedScroll event on window and fire callback function
	     * @emits {optimizedScroll} Dispatch custom scroll event after throttling default scroll event
	     */
	
	  }, {
	    key: 'addClassOnScrollInToView',
	    value: function addClassOnScrollInToView(elements) {
	
	      /** Scroll event callback  */
	      function _scrollCallback() {
	
	        function toggleActiveClass(el) {
	          if (_utils.isElementInViewport(el, 0.75)) {
	            el.classList.add('active');
	          } else {
	            el.classList.remove('active');
	          }
	        }
	
	        Array.prototype.forEach.call(elements, toggleActiveClass);
	      }
	
	      /** Throttle default scroll event and listen for optimizedScroll event */
	      _utils.throttleEvent('scroll', 'optimizedScroll');
	      _utils2.w.addEventListener('optimizedScroll', function () {
	        _scrollCallback();
	      });
	    }
	
	    /**
	     * Set current year in footer
	     * @param {HTMLElement} year - Element to set year text within
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