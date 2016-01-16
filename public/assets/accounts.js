var accounts =
webpackJsonp_name_([0,6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var h = __webpack_require__(1);

	var addAccountForm = document.getElementById('add-form');
	addAccountForm.addEventListener('submit', onAddAccount);

	var editAccountForm = document.getElementById('edit-form');
	editAccountForm.addEventListener('submit', onModifyAccount);

	var accountsTable = document.getElementById('accounts-table');
	accountsTable.addEventListener('click', onClick);

	var id = undefined;

	function onAddAccount(e) {
	  e.preventDefault();

	  fetch('/accounts/me', {
	    method: 'post',
	    body: new FormData(addAccountForm),
	    credentials: 'same-origin',
	    headers: {
	      'Accept': 'application/json'
	    }
	  }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	    if (data.success) window.location.reload();else console.log(data);
	  }).catch(console.log);
	}

	function onModifyAccount(e) {
	  e.preventDefault();

	  fetch('/accounts/me/' + id, {
	    method: 'PATCH',
	    body: new FormData(editAccountForm),
	    credentials: 'same-origin',
	    headers: {
	      'Accept': 'application/json'
	    }
	  }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	    if (data.success) window.location.reload();else console.log(data);
	  }).catch(console.log);
	}

	function onClick(e) {
	  var accountName = undefined,
	      pinned = undefined;

	  if (e.target.closest('#btnRemove')) {
	    e.preventDefault();

	    id = e.target.closest('#btnRemove').dataset.id;
	    fetch('/accounts/me/' + id, {
	      method: 'delete',
	      credentials: 'same-origin',
	      headers: {
	        'Accept': 'application/json'
	      }
	    }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	      if (data.success) window.location.reload();else console.log(data);
	    }).catch(console.log);
	  }

	  if (e.target.closest('#btnEdit')) {
	    id = e.target.closest('#btnEdit').dataset.id;
	    accountName = e.target.closest('#btnEdit').dataset.name;
	    pinned = e.target.closest('#btnEdit').dataset.pinned;
	    if (pinned === 'true') pinned = true;else pinned = false;
	    editAccountForm.elements[0].value = accountName;
	    editAccountForm.elements[1].checked = pinned;
	  }
		}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	exports.checkStatus = function checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  }
	  if ([400, 401, 409].find(function (e) {
	    return e === response.status;
	  })) {
	    return response;
	  }

	  var err = new Error(response.statusText);
	  err.response = response;
	  throw err;
	};

	exports.parseJSON = function parseJSON(response) {
	  return response.json();
	};

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY2xpZW50L2FjY291bnRzLmpzIiwid2VicGFjazovLy9jbGllbnQvZmV0Y2hIZWxwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgaCA9IHJlcXVpcmUoJy4vZmV0Y2hIZWxwZXInKTtcblxubGV0IGFkZEFjY291bnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1mb3JtJyk7XG5hZGRBY2NvdW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvbkFkZEFjY291bnQpO1xuXG5sZXQgZWRpdEFjY291bnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VkaXQtZm9ybScpO1xuZWRpdEFjY291bnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uTW9kaWZ5QWNjb3VudCk7XG5cbmxldCBhY2NvdW50c1RhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjY291bnRzLXRhYmxlJyk7XG5hY2NvdW50c1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG5cbmxldCBpZDtcblxuZnVuY3Rpb24gb25BZGRBY2NvdW50KGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGZldGNoKCcvYWNjb3VudHMvbWUnLCB7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGJvZHk6IG5ldyBGb3JtRGF0YShhZGRBY2NvdW50Rm9ybSksXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oaC5jaGVja1N0YXR1cylcbiAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5sb2cpO1xufVxuXG5mdW5jdGlvbiBvbk1vZGlmeUFjY291bnQoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgZmV0Y2goYC9hY2NvdW50cy9tZS8ke2lkfWAsIHtcbiAgICAgIG1ldGhvZDogJ1BBVENIJyxcbiAgICAgIGJvZHk6IG5ldyBGb3JtRGF0YShlZGl0QWNjb3VudEZvcm0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgLnRoZW4oaC5wYXJzZUpTT04pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcblxufVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICBsZXQgYWNjb3VudE5hbWUsIHBpbm5lZDtcblxuICBpZiAoZS50YXJnZXQuY2xvc2VzdCgnI2J0blJlbW92ZScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgaWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuUmVtb3ZlJykuZGF0YXNldC5pZDtcbiAgICBmZXRjaChgL2FjY291bnRzL21lLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpKSB7XG4gICAgaWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQuaWQ7XG4gICAgYWNjb3VudE5hbWUgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQubmFtZTtcbiAgICBwaW5uZWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQucGlubmVkO1xuICAgIGlmIChwaW5uZWQgPT09ICd0cnVlJykgcGlubmVkID0gdHJ1ZTtcbiAgICBlbHNlIHBpbm5lZCA9IGZhbHNlO1xuICAgIGVkaXRBY2NvdW50Rm9ybS5lbGVtZW50c1swXS52YWx1ZSA9IGFjY291bnROYW1lO1xuICAgIGVkaXRBY2NvdW50Rm9ybS5lbGVtZW50c1sxXS5jaGVja2VkID0gcGlubmVkO1xuXG4gIH1cblxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjbGllbnQvYWNjb3VudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuY2hlY2tTdGF0dXMgPSBmdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgaWYgKFs0MDAsIDQwMSwgNDA5XS5maW5kKGUgPT4gZSA9PT0gcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGxldCBlcnIgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIGVyci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLnBhcnNlSlNPTiA9IGZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2ZldGNoSGVscGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBOzs7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9