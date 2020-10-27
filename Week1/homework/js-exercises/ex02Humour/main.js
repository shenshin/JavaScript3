/* eslint-disable no-console */

// Write a function that makes a HTTP Request to:
const endpoint = 'https://xkcd.now.sh/?comic=latest';

function makeImage(url, alt) {
  const image = document.createElement('img');
  image.src = url;
  image.alt = alt;
  document.body.appendChild(image);
}

// Inside the same file write two programs: one with XMLHttpRequest
function ajaxRequest(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    // received responce with error state
    if (xhr.status >= 400) {
      console.error(`XHR: ${xhr.response}`);
      // responce succeeded
    } else {
      makeImage(xhr.response.img, xhr.response.alt);
    }
  });
  // Incorporate error handling: log to the console the error message
  // there was an error in sending responce
  xhr.addEventListener('error', error => {
    console.error('XHR: ', error);
  });

  xhr.send();
}
function axiosRequest(url) {
  axios
    .get(url)
    .then(res => {
      const response = JSON.parse(res.request.responseText);
      makeImage(response.img, response.alt);
    })
    .catch(err => {
      console.error('Axios: ', err);
    });
}
ajaxRequest(endpoint);
axiosRequest(endpoint);
