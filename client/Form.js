'use strict';

/**
 * CLASS FORM.
 */

class Form {
  constructor(options) {
    this.form = options.form;
    this.url = options.url;
    this.method = options.method;
    if (this.form) this.form.addEventListener('submit', e => this.send(e));
    this.reload = options.reload || false;
    this.redirect = options.redirect || false;
  }

  send(e) {
    e.preventDefault();

    fetch(`${this.url}`, {
        method: `${this.method}`,
        body: this.form ? new FormData(this.form) : null,
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json'
        },
      })
      .then(this._checkStatus)
      .then(this._parseJSON)
      .then((data) => {
        if (data.success) {
          if (this.reload) return window.location.reload('');
          if (this.redirect) return window.location.replace(this.redirect);
        } else {
          console.log(data);
        }
      }).catch((error) => {
        console.log('request failed', error);
      });

  }

  _checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    if ([400, 401, 409].find(e => e === response.status)) {
      return response;
    }

    let err = new Error(response.statusText);
    err.response = response;
    throw err;

  }

  _parseJSON(response) {

    return response.json();

  }

}

module.exports = Form;
