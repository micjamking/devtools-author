/*
 * App
 */
(function(
  w,  // window
  $,  // document.querySelectorAll.bind(document)
  DA  // window.DA (DevTools Author global)
){
  'use strict';

  var internalLinks = $('a[href^="#"]'),
      currentYear   = $('.currentYear')[0],
      links         = $('.share-links')[0];

  function initSocial(){
    if (links){
      links.style.display = 'block';
    }
  }

  function initUI(){
    DA.UI.setYear(currentYear);
    DA.UI.scrollToInternalLinks(internalLinks);
  }
  
  w.addEventListener('DOMContentLoaded', initUI);
  //w.addEventListener('load', initUI);
  w.addEventListener('social-loaded', initSocial);

})( window, document.querySelectorAll.bind(document), window.DA );