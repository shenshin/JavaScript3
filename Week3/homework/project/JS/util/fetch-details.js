/* eslint-disable import/extensions */
import { showError } from './show-error.js';
/**
 * Does fetch requests and shows error messages
 * @param {string} url required repository address
 */
export function fetchDetails(url) {
  return fetch(url)
    .then(data => data.json())
    .catch(err => showError(err));
}

export default fetchDetails;
