var accounts =
webpackJsonp_name_([0,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var h = __webpack_require__(1);

	var addAccountForm = document.getElementById('add-account-form');
	addAccountForm.addEventListener('submit', onAddAccount);

	var editAccountForm = document.getElementById('edit-account-form');
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
	  console.log(id);

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
	  var target = undefined,
	      accountName = undefined,
	      pinned = undefined;

	  if (e.target.closest('#btnRemove')) {
	    e.preventDefault();

	    id = e.target.closest('#btnRemove').dataset.id;
	    target = e.target.closest('#btnRemove');
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

	// });undefined
	

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY2xpZW50L2FjY291bnRzLmpzIiwid2VicGFjazovLy9jbGllbnQvZmV0Y2hIZWxwZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgaCA9IHJlcXVpcmUoJy4vZmV0Y2hIZWxwZXInKTtcblxubGV0IGFkZEFjY291bnRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1hY2NvdW50LWZvcm0nKTtcbmFkZEFjY291bnRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uQWRkQWNjb3VudCk7XG5cbmxldCBlZGl0QWNjb3VudEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdC1hY2NvdW50LWZvcm0nKTtcbmVkaXRBY2NvdW50Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBvbk1vZGlmeUFjY291bnQpO1xuXG5sZXQgYWNjb3VudHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cy10YWJsZScpO1xuYWNjb3VudHNUYWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuXG5sZXQgaWQ7XG5cbmZ1bmN0aW9uIG9uQWRkQWNjb3VudChlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBmZXRjaCgnL2FjY291bnRzL21lJywge1xuICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICBib2R5OiBuZXcgRm9ybURhdGEoYWRkQWNjb3VudEZvcm0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgLnRoZW4oaC5wYXJzZUpTT04pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbn1cblxuZnVuY3Rpb24gb25Nb2RpZnlBY2NvdW50KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc29sZS5sb2coaWQpO1xuXG4gICAgZmV0Y2goYC9hY2NvdW50cy9tZS8ke2lkfWAsIHtcbiAgICAgICAgbWV0aG9kOiAnUEFUQ0gnLFxuICAgICAgICBib2R5OiBuZXcgRm9ybURhdGEoZWRpdEFjY291bnRGb3JtKSxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAudGhlbihoLmNoZWNrU3RhdHVzKVxuICAgICAgLnRoZW4oaC5wYXJzZUpTT04pXG4gICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICBlbHNlIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChjb25zb2xlLmxvZyk7XG5cbiAgfVxuXG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICBsZXQgdGFyZ2V0LCBhY2NvdW50TmFtZSwgcGlubmVkO1xuXG4gIGlmIChlLnRhcmdldC5jbG9zZXN0KCcjYnRuUmVtb3ZlJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBpZCA9IGUudGFyZ2V0LmNsb3Nlc3QoJyNidG5SZW1vdmUnKS5kYXRhc2V0LmlkO1xuICAgIHRhcmdldCA9IGUudGFyZ2V0LmNsb3Nlc3QoJyNidG5SZW1vdmUnKTtcbiAgICBmZXRjaChgL2FjY291bnRzL21lLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpKSB7XG4gICAgaWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQuaWQ7XG4gICAgYWNjb3VudE5hbWUgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQubmFtZTtcbiAgICBwaW5uZWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQucGlubmVkO1xuXG4gICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnI2J0bkVkaXQnKTtcbiAgICBlZGl0QWNjb3VudEZvcm0uZWxlbWVudHNbMF0udmFsdWUgPSBhY2NvdW50TmFtZTtcbiAgICBlZGl0QWNjb3VudEZvcm0uZWxlbWVudHNbMV0uY2hlY2tlZCA9IHBpbm5lZDtcblxuICB9XG5cbn1cblxuLy8gbGV0IEZvcm0gPSByZXF1aXJlKCcuL0Zvcm0uanMnKTtcblxuLy8gbGV0IGFkZEFjY291bnRGb3JtID0gbmV3IEZvcm0oe1xuLy8gICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjb3VudC1mb3JtJyksXG4vLyAgIHVybDogJy9hY2NvdW50cy9tZScsXG4vLyAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICByZWxvYWQ6IHRydWVcbi8vIH0pO1xuXG4vLyBsZXQgYWNjb3VudHNUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2NvdW50cy10YWJsZScpO1xuXG4vLyBhY2NvdW50c1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgbGV0IHRhcmdldDtcbi8vICAgbGV0IGlkO1xuXG4vLyAgIGlmIChlLnRhcmdldC5jbG9zZXN0KCcjYnRuUmVtb3ZlJykpIHtcblxuLy8gICAgIGlkID0gZS50YXJnZXQuY2xvc2VzdCgnI2J0blJlbW92ZScpLmRhdGFzZXQuaWQ7XG4vLyAgICAgdGFyZ2V0ID0gZS50YXJnZXQuY2xvc2VzdCgnI2J0blJlbW92ZScpO1xuXG4vLyAgICAgbGV0IGRlbGV0ZUFjY291bnRGb3JtID0gbmV3IEZvcm0oe1xuLy8gICAgICAgdXJsOiBgL2FjY291bnRzL21lLyR7aWR9YCxcbi8vICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4vLyAgICAgICByZWxvYWQ6IHRydWVcbi8vICAgICB9KTtcbi8vICAgICBkZWxldGVBY2NvdW50Rm9ybS5zZW5kKGUpO1xuXG4vLyAgIH1cblxuLy8gfSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjbGllbnQvYWNjb3VudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuY2hlY2tTdGF0dXMgPSBmdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgaWYgKFs0MDAsIDQwMSwgNDA5XS5maW5kKGUgPT4gZSA9PT0gcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGxldCBlcnIgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIGVyci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLnBhcnNlSlNPTiA9IGZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2ZldGNoSGVscGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQURBOzs7Ozs7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==