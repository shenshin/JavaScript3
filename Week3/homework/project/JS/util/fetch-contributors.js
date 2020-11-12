/* eslint-disable import/extensions */
// import { addCard } from './add-card.js';
import { fetchDetails } from './fetch-details.js';
import { showPagination } from './show-pagination.js';

/**
 * Requests contributors information for the selected repository
 * @param {string} url selected repository URL
 */
export function fetchContributors(url) {
  fetchDetails(url).then(contributors => {
    contributors.sort((a, b) =>
      a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1,
    );
    showPagination(contributors);
  });
}

export default fetchContributors;
