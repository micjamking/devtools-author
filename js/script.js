/*
 * App scripts
 */
(function($){
  'use strict';

  var year = $('.currentYear')[0];
  var date = new Date();
  year.innerHTML = date.getFullYear();

//   var ajax = new XMLHttpRequest();
//   ajax.open('GET', 'https://api.github.com/repos/micjamking/devtools-author?access_token=1ca9eca028e56648d0cb35c5e4693b6b836fa614');
//   ajax.send(null);

//   ajax.onreadystatechange = function(){
//     if (ajax.readyState === 4) {
//       if (ajax.status === 200) {
//         if (ajax.responseText) {
//           var github = JSON.parse(ajax.responseText);
//           $('.stargazers')[0].innerHTML = github.watchers + ' stargazers';
//         }
//       } else {
//         console.log('Status Code: ' + ajax.status + '\nThere was an error with your request');
//       }
//     }
//   };
})(
document.querySelectorAll.bind(document),
window
);