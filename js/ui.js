/**
 * @file User Interface
 */
import { utils, w, $ } from './utils.js';
  
/** @object UI */
var UI = {};

/**
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
        document.body.scrollTop = utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration); 
        if (elapsedTime < duration) {
            w.requestAnimationFrame(() => { animateScroll(elapsedTime); });
        } else if (elapsedTime >= duration) {
          return callback();
        }
    })(0);
};

/**
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
  }
};

/**
 * Add class to element when it is scrolled in to view
 * @params {HTMLElement} elements - Array of HTML elements to watch
 */
UI.addClassOnScrollInToView = function(elements){

  function toggleActiveClass(el){
    if (utils.isElementInViewport(el, 0.75)) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  }

  function scrollCallback(){
    Array.prototype.forEach.call(elements, toggleActiveClass);
  }

  utils.throttle('scroll', 'optimizedScroll');
  w.addEventListener('optimizedScroll', scrollCallback);
};

/**
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
export default UI;