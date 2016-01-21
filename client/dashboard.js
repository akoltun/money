'use strict';

jQuery('#add-transaction-form .input-group.date input').datepicker({
  autoclose: true,
  language: 'de-DE',
  todayHighlight: true
});

let transactionTypeSelect = document.getElementById('transaction-type-select');
let categorySelect = document.getElementById('category-select');
let accountsSelect = document.getElementById('accounts-select');

let buttons = transactionTypeSelect.children;
transactionTypeSelect.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  let target = e.target;

  if (target.tagName !== 'A') return;
  if (target.classList.contains('active')) return;

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }

  target.classList.add('active');

  if (target.dataset.type === 'transfer') {
    accountsSelect.classList.remove('hidden');
    categorySelect.classList.add('hidden');
  } else {
    accountsSelect.classList.add('hidden');
    categorySelect.classList.remove('hidden');
  }

}
