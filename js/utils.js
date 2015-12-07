/*
 * Utility functions
 */
(function(
  w,  // window
  DA  // DevTools Author global
){
  'use strict';

  /** @object utils */
  var utils  = {},
      
      /*
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

  /*
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

  /** @export UI */
  DA.utils = utils;
})(window, window.DA = window.DA || {});