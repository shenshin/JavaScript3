/* eslint-disable no-console */

// Write a function that makes a HTTP Request to:
const endpoint = 'https://www.randomuser.me/api/ss';

// Inside the JavaScript file write two functions: one with XMLHttpRequest
function ajaxRequest() {
  const xhr = new XMLHttpRequest();
  // Each function should make a HTTP Request to the given endpoint
  xhr.open('GET', endpoint, true);
  xhr.onload = function onload() {
    if (this.status === 200) {
      const output = JSON.parse(this.responseText);
      // Log the received data to the console
      console.log('XHR: ', output);
    }
    // Incorporate error handling: log to the console the error message
    if (this.status === 404) {
      console.error('XHR: Page can not be found.');
    }
  };
  xhr.onerror = function onerror() {
    // Incorporate error handling: log to the console the error message
    console.error('XHR: Request Error...');
  };
  xhr.send();
}

// Inside the JavaScript file write two functions:... and the other with axios
function axiosRequest() {
  axios
    // Each function should make a HTTP Request to the given endpoint:
    .get(endpoint)
    // Log the received data to the console
    .then(response => console.log('Axios: ', response))
    // Incorporate error handling: log to the console the error message
    .catch(err => {
      // server responded with a status other than 200 range
      if (err.response.status === 404) {
        console.error('Axios: Page can not be found.');
      } else {
        console.error('Axios: Request Error...');
      }
    });
}
ajaxRequest();
axiosRequest();
