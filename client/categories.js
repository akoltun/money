'use strict';

let h = require('./fetchHelper');

let addCategoryForm = document.getElementById('add-form');
addCategoryForm.addEventListener('submit', onAddCategory);

let editCategoryForm = document.getElementById('edit-form');
editCategoryForm.addEventListener('submit', onModifyCategory);

let categoriesTable = document.getElementById('categories-table');
categoriesTable.addEventListener('click', onClick);

let id;

function onAddCategory(e) {
  e.preventDefault();

  fetch('/categories/me', {
      method: 'post',
      body: new FormData(addCategoryForm),
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

function onModifyCategory(e) {
  e.preventDefault();

  fetch(`/categories/me/${id}`, {
      method: 'PATCH',
      body: new FormData(editCategoryForm),
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
  let categoryName;

  if (e.target.closest('#btnRemove')) {
    e.preventDefault();

    id = e.target.closest('#btnRemove').dataset.id;
    fetch(`/categories/me/${id}`, {
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
    categoryName = e.target.closest('#btnEdit').dataset.name;
    editCategoryForm.elements[0].value = categoryName;

  }

}

