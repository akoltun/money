'use strict';

let h = require('./fetchHelper');
let loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', onLogin);

function onLogin(e) {
  e.preventDefault();

  fetch('/login', {
      method: 'post',
      body: new FormData(loginForm),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(h.checkStatus)
    .then(h.parseJSON)
    .then((data) => {
      if (data.success) window.location.replace('/dashboard');
      else console.log(data);
    })
    .catch(console.log);
}

