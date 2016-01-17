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
export default class utils {

  constructor(){
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
      linear: (t) => { return t; },
      easeInQuad: (t) => { return t*t; },
      easeOutQuad: (t) => { return t*(2-t); },
      easeInOutQuad: (t) => { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },
      easeInCubic: (t) => { return t*t*t; },
      easeOutCubic: (t) => { return (--t)*t*t+1; },
      easeInOutCubic: (t) => { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
      easeInQuart: (t) => { return t*t*t*t; },
      easeOutQuart: (t) => { return 1-(--t)*t*t*t; },
      easeInOutQuart: (t) => { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
      easeInQuint: (t) => { return t*t*t*t*t; },
      easeOutQuint: (t) => { return 1+(--t)*t*t*t*t; },
      easeInOutQuint: (t) => { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
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
  ease(easingFunction, elapsedTime, start, change, duration) {

    var time        = Math.min(1, (elapsedTime / duration)),
        easedTiming = this._easing[easingFunction](time);

    return (easedTiming * change) + start;

  }

  /**
   * Throttle an event (ie. scroll) and provide custom event for callback
   * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
   * @param {String} type - Type of event to throttle
   * @param {String} name - Name of new event to dispatchEvent
   * @param {Object} obj - Object to attach event to and dispatch the custom event from
   */
  throttle(type, name, obj) {

      obj = obj || w;
      var running = false;

      var func = function() {
          if (running) { return; }
          running = true;
          requestAnimationFrame(() => {
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
  isElementInViewport(element, percentage) {

    var rect = element.getBoundingClientRect();

    percentage = percentage || 1;

    return (
        rect.bottom >= 0 &&
        rect.right  >= 0 &&
        rect.top  <= ( ( window.innerHeight || document.documentElement.clientHeight ) * percentage ) &&
        rect.left <= ( ( window.innerWidth || document.documentElement.clientWidth ) * percentage )
    );

  }
}

export { w, $ };