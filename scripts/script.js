// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
// Make sure you register your service worker here too

var i = 1;



document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.id = i;

        newPost.addEventListener('click', function(){
          document.body.removeChild( document.body.querySelector('entry-page') ); // Deletes old entry page
          let singlePost = document.createElement('entry-page');
          singlePost.entry = newPost.entry;
          singlePost.querySelector("h3");
          /* console.log( singlePost.h3.textContent ); */
          document.body.appendChild(singlePost);
          document.body.className = "single-entry";
          history.pushState({entry : ""}, "Normal", "" );
          history.pushState({entry : "single-entry"}, "Entry " + newPost.id, "#entry" + newPost.id);
        });
        i++;

      });
    });
});

let settings = document.querySelector('img');
settings.addEventListener('click', function() {
  document.body.className = 'settings';
  let header = document.querySelector('h1');
  header.innerHTML = 'Settings';
  header.addEventListener('click', function() {
    document.body.className = '';
    header.innerHTML = 'Journal Entries';
  });
});

