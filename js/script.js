/*
 * App scripts
 */
(function($){
  'use strict';

  var year = $('.currentYear')[0];
  var date = new Date();
  year.innerHTML = date.getFullYear();

  function documentReady(){
    var links = $('.share-links')[0];
    links.style.display = 'block';
  }

  window.addEventListener('load', documentReady);

  var ajax = new XMLHttpRequest();
  //ajax.open('GET', 'https://api.github.com/repos/micjamking/devtools-author?access_token=aec7d69b1d0123a8ea309431ec4a4150dcc1961d');
  //ajax.send(null);

  ajax.onreadystatechange = function(){
    if (ajax.readyState === 4) {
      if (ajax.status === 200) {
        if (ajax.responseText) {
          var github = JSON.parse(ajax.responseText);
          $('.stargazers')[0].innerHTML = github.watchers + ' GitHub Stargazers';
        }
      } else {
        console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
      }
    }
  };
})(
document.querySelectorAll.bind(document),
window
);