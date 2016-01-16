var login =
webpackJsonp_name_([3,6],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var h = __webpack_require__(1);
	var loginForm = document.getElementById('login-form');
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
	  }).then(h.checkStatus).then(h.parseJSON).then(function (data) {
	    if (data.success) window.location.replace('/dashboard');else console.log(data);
	  }).catch(console.log);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY2xpZW50L2xvZ2luLmpzIiwid2VicGFjazovLy9jbGllbnQvZmV0Y2hIZWxwZXIuanM/MWU2MyoiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgaCA9IHJlcXVpcmUoJy4vZmV0Y2hIZWxwZXInKTtcbmxldCBsb2dpbkZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4tZm9ybScpO1xubG9naW5Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIG9uTG9naW4pO1xuXG5mdW5jdGlvbiBvbkxvZ2luKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGZldGNoKCcvbG9naW4nLCB7XG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIGJvZHk6IG5ldyBGb3JtRGF0YShsb2dpbkZvcm0pLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgIH1cbiAgICB9KVxuICAgIC50aGVuKGguY2hlY2tTdGF0dXMpXG4gICAgLnRoZW4oaC5wYXJzZUpTT04pXG4gICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvZGFzaGJvYXJkJyk7XG4gICAgICBlbHNlIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pXG4gICAgLmNhdGNoKGNvbnNvbGUubG9nKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2xvZ2luLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLmNoZWNrU3RhdHVzID0gZnVuY3Rpb24gY2hlY2tTdGF0dXMocmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9XG4gIGlmIChbNDAwLCA0MDEsIDQwOV0uZmluZChlID0+IGUgPT09IHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBsZXQgZXJyID0gbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICBlcnIucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5wYXJzZUpTT04gPSBmdW5jdGlvbiBwYXJzZUpTT04ocmVzcG9uc2UpIHtcbiAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGNsaWVudC9mZXRjaEhlbHBlci5qc1xuICoqLyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFFQTtBQUVBOzs7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Iiwic291cmNlUm9vdCI6IiJ9