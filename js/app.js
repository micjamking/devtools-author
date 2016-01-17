/**
 * @file Application entry point
 */
import { w, $ } from './utils.js';
import UI from './ui.js';

/**
 * Creates DevTools Author
 * @class
 */
class DevToolsAuthor {

  /**
   * @constructs
   */
  constructor() {
    
    this.$els_ = {
      internalLinks: $('a[href^="#"]'),
      panels: $('.panel'),
      currentYear: $('.currentYear')[0],
      links: $('.share-links')[0]
    };

    this.registerListeners_();
  
  }
  
  initUI_() {
    
    if ( this.$els_.currentYear ){
      UI.setYear( this.$els_.currentYear );
    }
    
    if ( this.$els_.internalLinks ){
      UI.scrollToInternalLinks( this.$els_.internalLinks );
    }
    
    if ( this.$els_.panels ){
      UI.addClassOnScrollInToView( this.$els_.panels );
    }
  
  }

  initSocial_() {
    
    /**
     * Google API
     */
    ((d, s, id) => {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) { return; }
       js = d.createElement(s); 
       js.id = id;
       js.src = '//apis.google.com/js/platform.js';
       fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-sdk');

    /**
     * Twitter Widgets API
     */
    ((d, s, id) => {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src = '//platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'twitter-wjs');

    /**
     * Facebook SDK
     */
    ((d, s, id) => {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) { return; }
       js = d.createElement(s); 
       js.id = id;
       js.src = '//connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

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
      FB.Event.subscribe('xfbml.render', () => {
        var fbLoaded = new CustomEvent( 'social-loaded' );
        window.dispatchEvent( fbLoaded );
      });
    
    };
  
  }

  initSocialUI_() {
    
    if ( this.$els_.links ){
      this.$els_.links.style.display = 'block';
    }
  
  }

  registerListeners_() {
    
    w.addEventListener( 'DOMContentLoaded', () => {
       this.initUI_(); 
    });
    
    w.addEventListener( 'load', () => { 
      this.initSocial_(); 
    });
    
    w.addEventListener( 'social-loaded', () => { 
      this.initSocialUI_();
    });
  
  }

}

new DevToolsAuthor();