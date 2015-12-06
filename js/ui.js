/*
 * User Interface
 */
(function(
  w,  // window
  DA  // DevTools Author global
){
  'use strict';
  
  /** @object UI */
  var UI = {};
  
  /*
   * scroll to anchor
   * @params targetElement Element to scroll to
   * @params duration Speed of scroll animation
   * @params callback Callback function after scroll has completed
   */
  UI.scrollTo = function(targetElement, duration, callback) {
      var currentScrollPos = document.body.scrollTop,
          distanceToScroll = targetElement.offsetTop - currentScrollPos,
          speed            = 16;
      
      // Scroll animation
      (function animateScroll(elapsedTime) {  
          elapsedTime += speed;
          document.body.scrollTop = DA.utils.easeInOut(elapsedTime, currentScrollPos, distanceToScroll, duration); 
          if (elapsedTime < duration) {
              w.requestAnimationFrame(function() {
                  animateScroll(elapsedTime);
              });
          } else if (elapsedTime >= duration) {
            return callback();
          }
      })(0);
  };

  /** @export UI */
  DA.UI = UI;
})(window, window.DA = window.DA || {});