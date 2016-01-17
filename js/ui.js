/**
 * User Interface
 */
import utils, { w, $ } from './utils.js';
  
/**
 * Sets up user interface 
 */
export default class UI {

  /**
   * Setup utils
   */
  constructor(){
    this._utils = new utils();
  }

  /**
   * Scroll to element
   * @param {HTMLElement} targetElement - Element to scroll to
   * @param {Number} duration - Speed of scroll animation
   * @param {Function} callback - Callback function after scroll has completed
   * @private
   */
  _scrollTo(targetElement, duration, callback) {

      var currentScrollPos = document.body.scrollTop,
          distanceToScroll = targetElement.offsetTop - currentScrollPos,
          speed            = 16;

      /** Scroll animation */
      (function animateScroll(elapsedTime) {  
          elapsedTime += speed;
          document.body.scrollTop = this._utils.ease('easeInOutQuad', elapsedTime, currentScrollPos, distanceToScroll, duration); 
          if (elapsedTime < duration) {
              w.requestAnimationFrame(() => { animateScroll(elapsedTime); });
          } else if (elapsedTime >= duration) {
            return callback();
          }
      })(0);

  }

  /**
   * Scroll to all anchors
   * @param {Array} linksArray - Array of anchor elements
   */
  scrollToInternalLinks(linksArray) {

    /** Click event callback */
    function _scrollToListener(event){
      event.preventDefault();

      var hash    = (event.target.href) ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'), 
          element = $(hash)[0];

      function changeURLHash(){
        w.location.hash = hash;
      }

      this._scrollTo(element, 1250, changeURLHash);
    }

    /** Attach click event listener */
    if (linksArray){
      for (var i = 0; i < linksArray.length; i++){
        linksArray[i].addEventListener('click', (e) => { _scrollToListener(e); }, true);
      }
    }

  }

  /**
   * Add class to element when it is scrolled in to view
   * @param {Array} elements - Array of HTML elements to watch
   */
  addClassOnScrollInToView(elements) {

    var that = this;

    /** Scroll event callback  */
    function _scrollCallback(){

      function toggleActiveClass(el){
        if (that._utils.isElementInViewport(el, 0.75)) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }

      Array.prototype.forEach.call(elements, toggleActiveClass);

    }

    /** Throttle default scroll event and listen for optimizedScroll event */
    this._utils.throttleEvent('scroll', 'optimizedScroll');
    w.addEventListener('optimizedScroll', () => { _scrollCallback(); } );

  }

  /**
   * Set current year in footer
   * @param {HTMLElement} year - Element to set year text within
   */
  setYear(year) {

    var date = new Date();

    if (year){
      year.innerHTML = (date.getFullYear() === 2015) ? date.getFullYear() : '2015 - ' + date.getFullYear();
    }

  }
}