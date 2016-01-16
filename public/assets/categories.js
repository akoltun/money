var categories =
webpackJsonp_name_([1,6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var h = __webpack_require__(1);

	var addCategoryForm = document.getElementById('add-form');
	addCategoryForm.addEventListener('submit', onAddCategory);

	var editCategoryForm = document.getElementById('edit-form');
	editCategoryForm.addEventListener('submit', onModifyCategory);

	var categoriesTable = document.getElementById('categories-table');
	categoriesTable.addEventListener('click', onClick);

	var id = undefined;

	function onAddCategory(e) {
	  e.preventDefault();

	  fetch('/categories/me', {
	    method: 'post',
	    body: new FormData(addCategoryForm),
	    credentials: 'same-origin',
	    headers: {
	      'Accept': 'application/json'
	    }
	  }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	    if (data.success) window.location.reload();else console.log(data);
	  }).catch(console.log);
	}

	function onModifyCategory(e) {
	  e.preventDefault();

	  fetch('/categories/me/' + id, {
	    method: 'PATCH',
	    body: new FormData(editCategoryForm),
	    credentials: 'same-origin',
	    headers: {
	      'Accept': 'application/json'
	    }
	  }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	    if (data.success) window.location.reload();else console.log(data);
	  }).catch(console.log);
	}

	function onClick(e) {
	  var categoryName = undefined;

	  if (e.target.closest('#btnRemove')) {
	    e.preventDefault();

	    id = e.target.closest('#btnRemove').dataset.id;
	    fetch('/categories/me/' + id, {
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
	    categoryName = e.target.closest('#btnEdit').dataset.name;
	    editCategoryForm.elements[0].value = categoryName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvY2F0ZWdvcmllcy5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2ZldGNoSGVscGVyLmpzPzFlNjMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgaCA9IHJlcXVpcmUoJy4vZmV0Y2hIZWxwZXInKTtcblxubGV0IGFkZENhdGVnb3J5Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtZm9ybScpO1xuYWRkQ2F0ZWdvcnlGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uQWRkQ2F0ZWdvcnkpO1xuXG5sZXQgZWRpdENhdGVnb3J5Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0LWZvcm0nKTtcbmVkaXRDYXRlZ29yeUZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25Nb2RpZnlDYXRlZ29yeSk7XG5cbmxldCBjYXRlZ29yaWVzVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0ZWdvcmllcy10YWJsZScpO1xuY2F0ZWdvcmllc1RhYmxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG5cbmxldCBpZDtcblxuZnVuY3Rpb24gb25BZGRDYXRlZ29yeShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBmZXRjaCgnL2NhdGVnb3JpZXMvbWUnLCB7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGJvZHk6IG5ldyBGb3JtRGF0YShhZGRDYXRlZ29yeUZvcm0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgLnRoZW4oaC5wYXJzZUpTT04pXG4gICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbn1cblxuZnVuY3Rpb24gb25Nb2RpZnlDYXRlZ29yeShlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBmZXRjaChgL2NhdGVnb3JpZXMvbWUvJHtpZH1gLCB7XG4gICAgICBtZXRob2Q6ICdQQVRDSCcsXG4gICAgICBib2R5OiBuZXcgRm9ybURhdGEoZWRpdENhdGVnb3J5Rm9ybSksXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oaC5jaGVja1N0YXR1cylcbiAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5sb2cpO1xuXG59XG5cblxuZnVuY3Rpb24gb25DbGljayhlKSB7XG4gIGxldCBjYXRlZ29yeU5hbWU7XG5cbiAgaWYgKGUudGFyZ2V0LmNsb3Nlc3QoJyNidG5SZW1vdmUnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGlkID0gZS50YXJnZXQuY2xvc2VzdCgnI2J0blJlbW92ZScpLmRhdGFzZXQuaWQ7XG4gICAgZmV0Y2goYC9jYXRlZ29yaWVzL21lLyR7aWR9YCwge1xuICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpKSB7XG4gICAgaWQgPSBlLnRhcmdldC5jbG9zZXN0KCcjYnRuRWRpdCcpLmRhdGFzZXQuaWQ7XG4gICAgY2F0ZWdvcnlOYW1lID0gZS50YXJnZXQuY2xvc2VzdCgnI2J0bkVkaXQnKS5kYXRhc2V0Lm5hbWU7XG4gICAgZWRpdENhdGVnb3J5Rm9ybS5lbGVtZW50c1swXS52YWx1ZSA9IGNhdGVnb3J5TmFtZTtcblxuICB9XG5cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2NhdGVnb3JpZXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuY2hlY2tTdGF0dXMgPSBmdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgaWYgKFs0MDAsIDQwMSwgNDA5XS5maW5kKGUgPT4gZSA9PT0gcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGxldCBlcnIgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIGVyci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLnBhcnNlSlNPTiA9IGZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2ZldGNoSGVscGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==