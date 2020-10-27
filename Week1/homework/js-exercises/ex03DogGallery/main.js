/* eslint-disable no-console */
/* 
Write a function that makes a HTTP Request to https://dog.ceo/api/breeds/image/random.
It should trigger after clicking a button in your webpage. Every time the button
is clicked it should append a new dog image to the DOM.
*/
const randomDogURL = 'https://dog.ceo/api/breeds/image/random';

const imagesContainer = document.getElementById('image-container');
const xhrButton = document.getElementById('xhr-button');
const axiosButton = document.getElementById('axios-button');
const fetchButton = document.getElementById('fetch-button');

function addImage(imageURL) {
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = imageURL;
  img.classList.add('dog-image');
  // After receiving the data, append to the <ul> a <li> that contains
  // an <img> element with the dog image
  li.appendChild(img);
  imagesContainer.appendChild(li);
}
// Write two versions for the button functionality: one with XMLHttpRequest
function xhrButtonPressed() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', randomDogURL, true);
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      const imageURL = JSON.parse(xhr.responseText).message;
      addImage(imageURL);
    }
    // Incorporate error handling: log to the console the error message
    // Received responce but it has an error state
    if (xhr.status === 404) {
      console.error('XHR: Page can not be found.');
    }
  });
  // Incorporate error handling: log to the console the error message
  // There was an error in sending or receiving request/responce
  xhr.addEventListener('error', error => {
    console.error('XHR: ', error);
  });
  xhr.send();
}
// Write two versions for the button functionality:... and the other with axios
function axiosButtonPressed() {
  axios
    .get(randomDogURL)
    .then(response => {
      const imageURL = JSON.parse(response.request.responseText).message;
      addImage(imageURL);
    })
    .catch(err => {
      console.error('Axios: ', err);
    });
}

function fetchButtonPressed() {
  fetch(randomDogURL)
    .then(response => response.json())
    .then(data => {
      addImage(data.message);
    })
    .catch(err => {
      console.error('Fetch: ', err);
    });
}

// When any one of the 2 buttons is clicked it should make a HTTP Request
xhrButton.addEventListener('click', xhrButtonPressed);
axiosButton.addEventListener('click', axiosButtonPressed);
fetchButton.addEventListener('click', fetchButtonPressed);
