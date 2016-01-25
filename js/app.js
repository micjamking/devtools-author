/**
 * Application entry point
 */
import { w, $ } from './utils.js';
import UI from './ui.js';

/**
 * Creates DevTools Author
 */
export class DevToolsAuthor {
  
  /**
   * Setup DOM references and event listeners
   */
  constructor() {
    
    /** 
     * DOM References to primary elements
     * @type {Object} _$els
     * @property {HTMLElement} internalLinks - Anchor links with a hash (#) href value
     * @property {HTMLElement} panels - Elements with the class of `.panel`
     * @property {HTMLElement} currentYear - Element with the class of `.currentYear`
     * @property {HTMLElement} links - Element with the class of `.share-links`
     * @private
     */
    this._$els = {
      internalLinks: $('a[href^="#"]'),
      panels: $('.panel'),
      currentYear: $('.currentYear')[0],
      links: $('.share-links')[0]
    };

    /**
     * Reference to user interface methods
     * @type {Object} _ui
     * @private
     */
    this._ui = new UI();
    
    /** Setup event listeners */
    this._registerListeners();
  }
  
  /**
   * Setup UI
   * @private
   */
  _initUI() {

    if ( this._$els.currentYear ){
      this._ui.setYear( this._$els.currentYear );
    }
    
    if ( this._$els.internalLinks ){
      this._ui.scrollToInternalLinks( this._$els.internalLinks );
    }
    
    if ( this._$els.panels ){
      this._ui.addClassOnScrollInToView( this._$els.panels );
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
    
    if ( this._$els.links ){
      this._$els.links.style.display = 'block';
    }
  
  }
  
  /**
   * Setup Event Listeners
   * @listens {DOMContentLoaded} Initialize UI
   * @listens {load} Initialize Social Media API
   * @listens {social-loaded} Initialize Social Media UI
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