import { w, $ } from 'utils.js';
import UI from 'ui.js';

var $internalLinks = $('a[href^="#"]'),
    $panels        = $('.panel'),
    $currentYear   = $('.currentYear')[0],
    $links         = $('.share-links')[0];

function initSocialUI(){
  if ( $links ){
    $links.style.display = 'block';
  }
}

function initUI(){
  if ( $currentYear ){
      UI.setYear( $currentYear );
  }
  if ( $internalLinks ){
      UI.scrollToInternalLinks( $internalLinks );
  }
  if ( $panels ){
      UI.addClassOnScrollInToView( $panels );
  }
}

function initSocial(){
  /**
   * Google API
   */
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) { return; }
     js = d.createElement(s); 
     js.id = id;
     js.src = '//apis.google.com/js/platform.js';
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'google-sdk'));

  /**
   * Twitter Widgets API
   */
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = '//platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'twitter-wjs'));

  /**
   * Facebook SDK
   */
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) { return; }
     js = d.createElement(s); 
     js.id = id;
     js.src = '//connect.facebook.net/en_US/sdk.js';
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  /**
   * Facebook SDK Init
   */
  window.fbAsyncInit = function() {
    FB.init({
      appId   : '1686524291587989',
      xfbml   : true,
      version : 'v2.5'
    });

    // Publish event after Facebook 
    // share has rendered (since it *seems* to take the longest)
    FB.Event.subscribe('xfbml.render', function() {
      var fbLoaded = new CustomEvent( 'social-loaded' );
      window.dispatchEvent( fbLoaded );
    });
  };
}

w.addEventListener( 'DOMContentLoaded', initUI );
w.addEventListener( 'load', initSocial );
w.addEventListener( 'social-loaded', initSocialUI );