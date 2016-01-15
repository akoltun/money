var categories =
webpackJsonp_name_([1,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Form = __webpack_require__(2);

	// let addCategoryForm = new Form({
	//   form: document.getElementById('category-form'),
	//   url: '/categories/me',
	//   method: 'POST',
	//   reload: true
	// });undefined
	

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * CLASS FORM.
	 */

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Form = (function () {
	  function Form(options) {
	    var _this = this;

	    _classCallCheck(this, Form);

	    this.form = options.form;
	    this.url = options.url;
	    this.method = options.method;
	    if (this.form) this.form.addEventListener('submit', function (e) {
	      return _this.send(e);
	    });
	    this.reload = options.reload || false;
	    this.redirect = options.redirect || false;
	  }

	  _createClass(Form, [{
	    key: 'send',
	    value: function send(e) {
	      var _this2 = this;

	      e.preventDefault();

	      fetch('' + this.url, {
	        method: '' + this.method,
	        body: this.form ? new FormData(this.form) : null,
	        credentials: 'same-origin',
	        headers: {
	          'Accept': 'application/json'
	        }
	      }).then(this._checkStatus).then(this._parseJSON).then(function (data) {
	        if (data.success) {
	          if (_this2.reload) return window.location.reload('');
	          if (_this2.redirect) return window.location.replace(_this2.redirect);
	        } else {
	          console.log(data);
	        }
	      }).catch(function (error) {
	        console.log('request failed', error);
	      });
	    }
	  }, {
	    key: '_checkStatus',
	    value: function _checkStatus(response) {

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
	    }
	  }, {
	    key: '_parseJSON',
	    value: function _parseJSON(response) {

	      return response.json();
	    }
	  }]);

	  return Form;
	})();

		module.exports = Form;

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmllcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9jbGllbnQvY2F0ZWdvcmllcy5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L0Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xubGV0IEZvcm0gPSByZXF1aXJlKCcuL0Zvcm0uanMnKTtcblxuLy8gbGV0IGFkZENhdGVnb3J5Rm9ybSA9IG5ldyBGb3JtKHtcbi8vICAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhdGVnb3J5LWZvcm0nKSxcbi8vICAgdXJsOiAnL2NhdGVnb3JpZXMvbWUnLFxuLy8gICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgcmVsb2FkOiB0cnVlXG4vLyB9KTtcblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBjbGllbnQvY2F0ZWdvcmllcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDTEFTUyBGT1JNLlxuICovXG5cbmNsYXNzIEZvcm0ge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgdGhpcy5mb3JtID0gb3B0aW9ucy5mb3JtO1xuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmw7XG4gICAgdGhpcy5tZXRob2QgPSBvcHRpb25zLm1ldGhvZDtcbiAgICBpZiAodGhpcy5mb3JtKSB0aGlzLmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB0aGlzLnNlbmQoZSkpO1xuICAgIHRoaXMucmVsb2FkID0gb3B0aW9ucy5yZWxvYWQgfHwgZmFsc2U7XG4gICAgdGhpcy5yZWRpcmVjdCA9IG9wdGlvbnMucmVkaXJlY3QgfHwgZmFsc2U7XG4gIH1cblxuICBzZW5kKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBmZXRjaChgJHt0aGlzLnVybH1gLCB7XG4gICAgICAgIG1ldGhvZDogYCR7dGhpcy5tZXRob2R9YCxcbiAgICAgICAgYm9keTogdGhpcy5mb3JtID8gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSkgOiBudWxsLFxuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbih0aGlzLl9jaGVja1N0YXR1cylcbiAgICAgIC50aGVuKHRoaXMuX3BhcnNlSlNPTilcbiAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBpZiAodGhpcy5yZWxvYWQpIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCcnKTtcbiAgICAgICAgICBpZiAodGhpcy5yZWRpcmVjdCkgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHRoaXMucmVkaXJlY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3QgZmFpbGVkJywgZXJyb3IpO1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIF9jaGVja1N0YXR1cyhyZXNwb25zZSkge1xuXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICAgIGlmIChbNDAwLCA0MDEsIDQwOV0uZmluZChlID0+IGUgPT09IHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgIGVyci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICAgIHRocm93IGVycjtcblxuICB9XG5cbiAgX3BhcnNlSlNPTihyZXNwb25zZSkge1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblxuICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb3JtO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogY2xpZW50L0Zvcm0uanNcbiAqKi8iXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7Ozs7OztBQURBOzs7Ozs7OztBQ0RBO0FBQ0E7Ozs7O0FBREE7QUFDQTs7O0FBS0E7QUFDQTs7O0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7O0FBVUE7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTtBQUNBO0FBRUE7OztBQXZEQTs7O0FBMkRBOzs7Iiwic291cmNlUm9vdCI6IiJ9