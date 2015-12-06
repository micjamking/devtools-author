/*
 * Custom behavior
 */
(function(
  w,  // window
  $,  // document.querySelectorAll
  DA  // DevTools Author global
){
  'use strict';

  var internalLinks = $('a[href^="#"]');

  function initSocial(){
    var links = $('.share-links')[0];
    
    if (links){
      links.style.display = 'block';
    }
  }
  
  function setYear(){
    var year = $('.currentYear')[0];
    var date = new Date();
    
    if (year){
      year.innerHTML = date.getFullYear();
    }
  }

  function scrollToInternalLinks(linksArray){
    
    function scrollToListener(event){
      event.preventDefault();
      
      var hash    = (event.target.href) ? event.target.getAttribute('href') : event.target.parentNode.getAttribute('href'), 
          element = $(hash)[0];
      
      function changeURLHash(){
        w.location.hash = hash;
      }
      
      DA.UI.scrollTo(element, 1250, changeURLHash);
    }

    if (linksArray){
      for (var i = 0; i < linksArray.length; i++){
        linksArray[i].addEventListener('click', scrollToListener, true);
      }
    } else {
      console.log('No internal links found!');
    }
  }

  function init(){
    setYear();
    scrollToInternalLinks(internalLinks);
  }

  w.addEventListener('load', init);
  w.addEventListener('social-loaded', initSocial);

})( window, document.querySelectorAll.bind(document), window.DA );