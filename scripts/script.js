// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, i) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // add an id number for each journal entry
        const entryNum = i + 1;
        newPost.id = 'entry' + entryNum;

        newPost.addEventListener('click', function(){
          setState("HI");
          history.pushState({entryId: newPost.id}, "Entry " + entryNum, "#entry" + entryNum );

          document.body.removeChild( document.body.querySelector('entry-page') ); // Deletes old entry page
          let singlePost = document.createElement('entry-page');
          singlePost.entry = newPost.entry;
          document.body.appendChild(singlePost);
          document.body.className = 'single-entry';
        });
      });
    });
});

window.onpopstate = function(event) {
  let state = event.state;
  console.log(state);

  if (state) {
    console.log(state.entryId);
  }

  document.body.className = '';

  /*
  document.body.removeChild( document.body.querySelector('entry-page') ); // Deletes old entry page
  let singlePost = document.createElement('entry-page');
  singlePost.entry = newPost.entry;
  document.body.appendChild(singlePost);
  document.body.className = 'single-entry';
  */
  /*
  if (state) {
    document.body.className = ''; //state.className;
  }
  */
  //history.pushState(null, '', location.hash);
};

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