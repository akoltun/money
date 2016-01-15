var login =
webpackJsonp_name_([2,5],[
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY2xpZW50L2xvZ2luLmpzIiwid2VicGFjazovLy9jbGllbnQvZmV0Y2hIZWxwZXIuanM/MWU2MyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmxldCBoID0gcmVxdWlyZSgnLi9mZXRjaEhlbHBlcicpO1xubGV0IGxvZ2luRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbi1mb3JtJyk7XG5sb2dpbkZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgb25Mb2dpbik7XG5cbmZ1bmN0aW9uIG9uTG9naW4oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgZmV0Y2goJy9sb2dpbicsIHtcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgYm9keTogbmV3IEZvcm1EYXRhKGxvZ2luRm9ybSksXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfVxuICAgIH0pXG4gICAgLnRoZW4oaC5jaGVja1N0YXR1cylcbiAgICAudGhlbihoLnBhcnNlSlNPTilcbiAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgaWYgKGRhdGEuc3VjY2Vzcykgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoJy9kYXNoYm9hcmQnKTtcbiAgICAgIGVsc2UgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSlcbiAgICAuY2F0Y2goY29uc29sZS5sb2cpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjbGllbnQvbG9naW4uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuY2hlY2tTdGF0dXMgPSBmdW5jdGlvbiBjaGVja1N0YXR1cyhyZXNwb25zZSkge1xuICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDIwMCAmJiByZXNwb25zZS5zdGF0dXMgPCAzMDApIHtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbiAgaWYgKFs0MDAsIDQwMSwgNDA5XS5maW5kKGUgPT4gZSA9PT0gcmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIGxldCBlcnIgPSBuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gIGVyci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICB0aHJvdyBlcnI7XG59O1xuXG5leHBvcnRzLnBhcnNlSlNPTiA9IGZ1bmN0aW9uIHBhcnNlSlNPTihyZXNwb25zZSkge1xuICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L2ZldGNoSGVscGVyLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBRUE7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=