/*globals FB*/

window.fbAsyncInit = function() {
  'use strict';

  FB.init({
    appId      : '1686524291587989',
    xfbml      : true,
    version    : 'v2.5'
  });

  FB.Event.subscribe('xfbml.render', function() {
    var fbLoaded = new CustomEvent('facebook-loaded');
    window.dispatchEvent(fbLoaded);
  });
};

(function(d, s, id){
  'use strict';

   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = '//connect.facebook.net/en_US/sdk.js';
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

(function(d,s,id){
  'use strict';

  var js, fjs = d.getElementsByTagName(s)[0],
  p = /^http:/.test(d.location) ? 'http' : 'https';
  if(!d.getElementById(id)){
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  }
}(document, 'script', 'twitter-wjs'));

/*
 * Custom scripts
 */
(function(
  w, // window
  $  // document.querySelectorAll
){
  'use strict';

  function initSocial(){
    var links = $('.share-links')[0];
    if (links){
      links.style.display = 'block';
    }
  }
  
  function setYear(){
    var year = $('.currentYear')[0];
    var date = new Date();
    year.innerHTML = date.getFullYear();
  }

  function init(){
    setYear();
  }

  window.addEventListener('load', init);
  window.addEventListener('facebook-loaded', initSocial);
})(
window,
document.querySelectorAll.bind(document)
);