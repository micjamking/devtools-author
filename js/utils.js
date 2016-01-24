/**
 * Utility methods
 */

/** @type {Object} Window */
export var w = window;

/** @type {Function} Query selector */
export var $ = document.querySelectorAll.bind(document);

/**
 * utility methods 
 */
export default class utils {
  
  /**
   * Setup 
   */
  constructor(){
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
   * Easing Timing
   * @param {String} easingFunction - Name of easing function to use
   * @param {Number} elapsedTime - Length of time (ms) that has passed since start
   * @param {Number} start - Initial (y) starting position
   * @param {Number} change - Distance to travel
   * @param {Number} duration - Speed of travel
   * @return {Number} eased timing
   */
  ease(easingFunction, elapsedTime, start, change, duration) {

    var time        = Math.min(1, (elapsedTime / duration)),
        easedTiming = this._easing[easingFunction](time);

    return (easedTiming * change) + start;

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
  throttleEvent(type, name, obj) {

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
   * @return {Boolean} true|false - Returns true if bottom and right property of element is greater
   * than 0, and top and left property of element is less than the window height and width respectively,
   * taking in to account a threshold percentage of the screen.
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