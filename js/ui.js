/*
 * User Interface
 */
(function(
  w,  // window
  $,  // document.querySelectorAll
  DA  // DevTools Author global
){
  'use strict';
  
  /** @object UI */
  var UI = {};
  
  /*
   * scroll to element
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
          document.body.scrollTop = DA.utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration); 
          if (elapsedTime < duration) {
              w.requestAnimationFrame(function() {
                  animateScroll(elapsedTime);
              });
          } else if (elapsedTime >= duration) {
            return callback();
          }
      })(0);
  };

  /*
   * scroll to all anchors
   * @params linksArray Array of anchor elements
   */
  UI.scrollToInternalLinks = function(linksArray){
    function scrollToListener(event){
      event.preventDefault();
      
      var hash    = (event.target.href) ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'), 
          element = $(hash)[0];
      
      function changeURLHash(){
        w.location.hash = hash;
      }
      
      UI.scrollTo(element, 1250, changeURLHash);
    }

    if (linksArray){
      for (var i = 0; i < linksArray.length; i++){
        linksArray[i].addEventListener('click', scrollToListener, true);
      }
    } else {
      console.log('No internal links found!');
    }
  };
  
  /*
   * Set Year
   * @params year Element to set year text within
   */
  UI.setYear = function(year){
    var date = new Date();
    if (year){
      year.innerHTML = date.getFullYear();
    }
  };

  /** @export UI */
  DA.UI = UI;
})(window, document.querySelectorAll.bind(document), window.DA = window.DA || {});