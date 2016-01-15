'use strict';

let h = require('./fetchHelper');

let addAccountForm = document.getElementById('add-account-form');
addAccountForm.addEventListener('submit', onAddAccount);

let editAccountForm = document.getElementById('edit-account-form');
editAccountForm.addEventListener('submit', onModifyAccount);

let accountsTable = document.getElementById('accounts-table');
accountsTable.addEventListener('click', onClick);

let id;

function onAddAccount(e) {
  e.preventDefault();

  fetch('/accounts/me', {
      method: 'post',
      body: new FormData(addAccountForm),
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(h.checkStatus)
    .then(h.parseJSON)
    .then(data => {
      if (data.success) window.location.reload();
      else console.log(data);
    })
    .catch(console.log);
}

function onModifyAccount(e) {
    e.preventDefault();
    console.log(id);

    fetch(`/accounts/me/${id}`, {
        method: 'PATCH',
        body: new FormData(editAccountForm),
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(h.checkStatus)
      .then(h.parseJSON)
      .then(data => {
        if (data.success) window.location.reload();
        else console.log(data);
      })
      .catch(console.log);

  }


function onClick(e) {
  let target, accountName, pinned;

  if (e.target.closest('#btnRemove')) {
    e.preventDefault();

    id = e.target.closest('#btnRemove').dataset.id;
    target = e.target.closest('#btnRemove');
    fetch(`/accounts/me/${id}`, {
        method: 'delete',
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(h.checkStatus)
      .then(h.parseJSON)
      .then(data => {
        if (data.success) window.location.reload();
        else console.log(data);
      })
      .catch(console.log);
  }

  if (e.target.closest('#btnEdit')) {
    id = e.target.closest('#btnEdit').dataset.id;
    accountName = e.target.closest('#btnEdit').dataset.name;
    pinned = e.target.closest('#btnEdit').dataset.pinned;

    target = e.target.closest('#btnEdit');
    editAccountForm.elements[0].value = accountName;
    editAccountForm.elements[1].checked = pinned;

  }

}

// let Form = require('./Form.js');

// let addAccountForm = new Form({
//   form: document.getElementById('account-form'),
//   url: '/accounts/me',
//   method: 'POST',
//   reload: true
// });

// let accountsTable = document.getElementById('accounts-table');

// accountsTable.addEventListener('click', e => {
//   e.preventDefault();
//   let target;
//   let id;

//   if (e.target.closest('#btnRemove')) {

//     id = e.target.closest('#btnRemove').dataset.id;
//     target = e.target.closest('#btnRemove');

//     let deleteAccountForm = new Form({
//       url: `/accounts/me/${id}`,
//       method: 'DELETE',
//       reload: true
//     });
//     deleteAccountForm.send(e);

//   }

// });
