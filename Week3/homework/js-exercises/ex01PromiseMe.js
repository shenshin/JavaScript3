/* eslint-disable no-console */
/* 
Exercise 1: Promise me to wait

In this exercise you'll practice refactoring Promise syntax into async/await + try/catch syntax. Rewrite exercise A & B using async/await + try/catch syntax.
*/
// Exercise A #####################################
const randomImage = 'https://randomfox.ca/floof/';

// function with promise syntax
function getData(url) {
  fetch(url)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error));
}

getData(randomImage);

// async-await-try-catch syntax
async function getData2(url) {
  try {
    const response = await fetch(url);
    response.json().then(data => console.log(data));
  } catch (error) {
    console.log(error);
  }
}

getData2(randomImage);

// Exercise B ####################################
const arrayOfWords = ['pomodores', 'tomatos', 'avocado'];

// promise syntax
const makeAllCaps = array => {
  return new Promise((resolve, reject) => {
    const capsArray = array.map(word => {
      if (typeof word === 'string') {
        return word.toUpperCase();
      }
      return reject(
        new Error('Error: Not all items in the array are strings!'),
      );
    });
    resolve(capsArray);
  });
};

makeAllCaps(arrayOfWords)
  .then(result => console.log(result))
  .catch(error => console.log(error));

// async-await-try-catch syntax
const makeAllCaps2 = async array => {
  let capsArray;
  try {
    capsArray = await array.map(word => {
      if (typeof word === 'string') {
        return word.toUpperCase();
      }
      throw new Error('Error: Not all items in the array are strings!');
    });
  } catch (err) {
    return err;
  }
  return capsArray;
};

makeAllCaps2(arrayOfWords)
  .then(result => console.log(result))
  .catch(error => console.log(error));
