/*eslint no-console: 1*/
/**
 * Application entry point
 */
import { w, $ } from './utils.js';
import UI from './ui.js';

/**
 * Creates DevTools Author
 */
export class DevToolsAuthor {

  constructor() {
    
    /** 
     * DOM References to primary elements
     * @type {Object}
     */
    this.$els = {
      internalLinks: $('a[href^="#"]'),
      panels: $('.panel'),
      currentYear: $('.currentYear')[0],
      links: $('.share-links')[0]
    };
    
    /** Setup event listeners */
    this._registerListeners();
  
  }
  
  /**
   * Setup UI
   * @private
   */
  _initUI() {
    var ui = new UI();
    
    if ( this.$els.currentYear ){
      ui.setYear( this.$els.currentYear );
    }
    
    if ( this.$els.internalLinks ){
      ui.scrollToInternalLinks( this.$els.internalLinks );
    }
    
    if ( this.$els.panels ){
      ui.addClassOnScrollInToView( this.$els.panels );
    }
  
  }
  
  /**
   * Social Media APIs
   * @emits {social-loaded} Emits event when Facebook API has completely rendered
   * @private
   */
  _initSocial() {
    
    /** Google API */
    ((d, s, id) => {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) { return; }
       js = d.createElement(s); 
       js.id = id;
       js.src = '//apis.google.com/js/platform.js';
       fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'google-sdk');

    /** Twitter API */
    ((d, s, id) => {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s);
      js.id = id;
      js.src = '//platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'twitter-wjs');

    /** Facebook SDK */
    ((d, s, id) => {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) { return; }
       js = d.createElement(s); 
       js.id = id;
       js.src = '//connect.facebook.net/en_US/sdk.js';
       fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    /** Facebook SDK Init */
    window.fbAsyncInit = function() {
      
      FB.init({
        appId   : '1686524291587989',
        xfbml   : true,
        version : 'v2.5'
      });

      /**
       * Publish event after Facebook 
       * share has rendered (since it *seems* to take the longest)
       */
      FB.Event.subscribe('xfbml.render', () => {
        var fbLoaded = new CustomEvent( 'social-loaded' );
        window.dispatchEvent( fbLoaded );
      });
    
    };
  
  }
  
  /**
   * Setup social media UI
   * @private
   */
  _initSocialUI() {
    
    if ( this.$els.links ){
      this.$els.links.style.display = 'block';
    }
  
  }
  
  /**
   * Setup Event Listeners
   * @listens {DOMContentLoaded} Listen for event to initialize UI
   * @listens {load} Listen for event to initialize Social Media API
   * @listens {social-loaded} Listen for event to initialize Social Media UI
   * @private
   */
  _registerListeners() {
    
    w.addEventListener( 'DOMContentLoaded', () => {
       this._initUI(); 
    });
    
    w.addEventListener( 'load', () => { 
      this._initSocial(); 
    });
    
    w.addEventListener( 'social-loaded', () => { 
      this._initSocialUI();
    });
  
  }

}

/** hello.world */
new DevToolsAuthor();