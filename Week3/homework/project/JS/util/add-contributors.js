/* eslint-disable import/extensions */
import { addCard } from './add-card.js';
import { showError } from './show-error.js';

/**
 * Requests contributors information for the selected repository
 * @param {HTMLElement} node cards placeholder
 * @param {string} url selected repository URL
 */
export function addContributors(node, url) {
  node.innerHTML = '';
  fetch(url)
    .then(data => data.json())
    .then(contributors => {
      contributors.forEach(contributor => {
        addCard(node, contributor);
      });
    })
    .catch(err => showError(err));
}

export default addContributors;
