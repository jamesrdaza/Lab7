// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', function(){
          document.body.removeChild( document.body.querySelector('entry-page') ); // Deletes old entry page
          let singlePost = document.createElement('entry-page');
          singlePost.entry = newPost.entry;
          document.body.appendChild(singlePost);
          document.body.className = "single-entry";
        });
      });
    });
});
