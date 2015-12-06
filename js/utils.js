/*
 * Utility functions
 */
(function(
  w,  // window
  DA  // DevTools Author global
){
  'use strict';

  /** @object utils */
  var utils = {};
  
  /*
   * easeInOut timing function
   * @params currentTime Length of time (ms) that has passed since start
   * @params start initial starting point
   * @params change distance to travel
   * @params duration speed of travel
   */ 
  utils.easeInOut = function(currentTime, start, change, duration) {
      currentTime /= duration / 2;
      if (currentTime < 1) {
          return change / 2 * currentTime * currentTime + start;
      }
      currentTime -= 1;
      return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
  };

  /** @export UI */
  DA.utils = utils;
})(window, window.DA = window.DA || {});