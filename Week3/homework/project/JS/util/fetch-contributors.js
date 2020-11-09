/* eslint-disable import/extensions */
// import { addCard } from './add-card.js';
import { showError } from './show-error.js';
import { showPagination } from './show-pagination.js';

/**
 * Requests contributors information for the selected repository
 * @param {string} url selected repository URL
 */
export function fetchContributors(url) {
  fetch(url)
    .then(data => data.json())
    .then(contributors => {
      showPagination(contributors);
    })
    .catch(err => showError(err));
}

export default fetchContributors;
