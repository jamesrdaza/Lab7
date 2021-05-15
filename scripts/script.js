// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const header = document.querySelector('h1');

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, i) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // add id elements to each journal entry
        newPost.id = i + 1;

        newPost.addEventListener('click', function(){
          // Deletes old entry page
          document.body.removeChild(document.body.querySelector('entry-page'));
          // Add back just single entry
          let singlePost = document.createElement('entry-page');
          singlePost.entry = newPost.entry;
          singlePost.querySelector("h3");
          document.body.appendChild(singlePost);
          // Add single-entry styling
          document.body.className = "single-entry";
          // Change Header to Entry title
          header.innerHTML = "Entry " + (i + 1);

          setState('single-entry', 'Entry ' + (i + 1), '#entry' + newPost.id);
        });

      });
    });
});

// Header Event Listener
header.addEventListener('click', function() {
    document.body.className = '';
    header.innerHTML = 'Journal Entries';
    setState('', 'Journal Entries', '/');
});

// Settings Button Event Listener
const settings = document.querySelector('img');
settings.addEventListener('click', function() {
  document.body.className = 'settings';
  header.innerHTML = 'Settings';
  setState('settings', 'Settings', '#settings');
});


// onpopstate Event Listener
window.onpopstate = function(event) {
  var state = event.state;
  if (state) {
    document.body.className = state.entry;
    header.innerHTML = state.header;
  }
  else {
    document.body.className = '';
    header.innerHTML = 'Journal Entries';
  }
};