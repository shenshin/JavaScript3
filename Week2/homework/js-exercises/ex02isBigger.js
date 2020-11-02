/* eslint-disable no-console */
// Exercise 2: Is it bigger than 10?

// Write a function called checkDoubleDigits that:
// Takes 1 argument: a number
function checkDoubleDigits(number) {
  // Returns a new Promise
  return new Promise((resolve, reject) => {
    if (number >= 10) {
      // If the number is bigger than 10, resolve with the string: "The number is bigger than 10!"
      resolve('The number is bigger than 10!');
    } else {
      // If the number is smaller than 10, reject with the error: "Error! The number is smaller than 10..."
      reject(new Error('Error! The number is smaller than 10...'));
    }
  });
}

checkDoubleDigits(9)
  .then(message => console.log(message))
  .catch(error => console.error(error));
