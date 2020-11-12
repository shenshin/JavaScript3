/* eslint-disable import/extensions */
import { showError } from './show-error.js';

export function fetchDetails(url) {
  return fetch(url)
    .then(data => data.json())
    .catch(err => showError(err));
}

export default fetchDetails;
