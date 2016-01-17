/**
 * Utility functions
 */

/** @object utils */
var utils  = {},
    w = window,

    /**
     * Easing Functions - inspired from http://gizma.com/easing/
     */
    easing = {
      // no easing, no acceleration
      linear: function (t) { return t; },
      // accelerating from zero velocity
      easeInQuad: function (t) { return t*t; },
      // decelerating to zero velocity
      easeOutQuad: function (t) { return t*(2-t); },
      // acceleration until halfway, then deceleration
      easeInOutQuad: function (t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },
      // accelerating from zero velocity 
      easeInCubic: function (t) { return t*t*t; },
      // decelerating to zero velocity 
      easeOutCubic: function (t) { return (--t)*t*t+1; },
      // acceleration until halfway, then deceleration 
      easeInOutCubic: function (t) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },
      // accelerating from zero velocity 
      easeInQuart: function (t) { return t*t*t*t; },
      // decelerating to zero velocity 
      easeOutQuart: function (t) { return 1-(--t)*t*t*t; },
      // acceleration until halfway, then deceleration
      easeInOutQuart: function (t) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },
      // accelerating from zero velocity
      easeInQuint: function (t) { return t*t*t*t*t; },
      // decelerating to zero velocity
      easeOutQuint: function (t) { return 1+(--t)*t*t*t*t; },
      // acceleration until halfway, then deceleration 
      easeInOutQuint: function (t) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
    };

/**
 * easing
 * @params easingFunction Name of easing function to use
 * @params elapsedTime Length of time (ms) that has passed since start
 * @params start initial starting point
 * @params change distance to travel
 * @params duration speed of travel
 */
utils.ease = function(easingFunction, elapsedTime, start, change, duration) {
  var time        = Math.min(1, (elapsedTime / duration)),
      easedTiming = easing[easingFunction](time);

  return (easedTiming * change) + start;
};

/**
 * Throttle an event (ie. scroll) and provide custom event for callback
 * @see https://developer.mozilla.org/en-US/docs/Web/Events/scroll
 * @param {String} type - Type of event to throttle
 * @param {String} name - Name of new event to dispatchEvent
 * @param {Object} obj - Object to attach event to and dispatch the custom event from
 */
utils.throttle = function(type, name, obj) {
    obj = obj || w;
    var running = false;

    var func = function() {
        if (running) { return; }
        running = true;
        requestAnimationFrame(function() {
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
utils.isElementInViewport = function(element, percentage) {
  var rect = element.getBoundingClientRect();

  percentage = percentage || 1;

  return (
      rect.bottom >= 0 &&
      rect.right  >= 0 &&
      rect.top  <= ( ( window.innerHeight || document.documentElement.clientHeight ) * percentage ) &&
      rect.left <= ( ( window.innerWidth || document.documentElement.clientWidth ) * percentage )
  );
};

export { utils, w };
export var $ = document.querySelectorAll.bind(document);