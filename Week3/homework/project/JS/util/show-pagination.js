/* eslint-disable import/extensions */

/* Each "page" should contain at maximum 5 contributors. If the repository selected contains more than 5 contributors, it will get split up unto a different page (and thus create another addition)
Slice the array into smaller parts and create a new page every time the maximum has been reached
Allow a user to click from page to page by clicking on the number, or an arrow to go one page forward or backward */

import { showCards } from './show-cards.js';
// maximum number of contributors on the page
const cardsPerPage = 5;
/**
 * Shows a 'cardsPerPage' number of cards on a page
 * @param {object[]} contributors an array containing all contributors for the current repository
 * @param {number} pageToShow a page to show
 */
export function showPagination(contributors, pageToShow = 0) {
  const numbersPlaceholder = document.getElementById('pagination');
  numbersPlaceholder.innerHTML = '';

  // draws one symbol in pagination links
  const addPageLink = (text, pageNumber, isActive = false) => {
    const symbol = document.createElement('span');
    symbol.innerHTML = text;
    symbol.className = 'page-number';
    if (isActive) {
      symbol.classList.add('page-number-active');
    } else {
      symbol.classList.remove('page-number-active');
    }
    symbol.addEventListener('click', () => {
      showPagination(contributors, pageNumber);
    });
    numbersPlaceholder.appendChild(symbol);
  };

  // number of contributors cards pages for the current repo
  const numberOfPages = Math.ceil(contributors.length / cardsPerPage);
  const header = document.querySelector('.contributors-header');

  // show pagination in the top of contributors section
  // if the number of pages is more than one
  if (numberOfPages > 1) {
    header.classList.remove('pagination-one-page');
    header.classList.add('pagination-many-pages');

    // draw left arrow
    addPageLink(
      '&larr;&nbsp;',
      pageToShow > 0 ? pageToShow - 1 : numberOfPages - 1,
    );

    // draw digits representing available pages
    for (let pageNumber = 0; pageNumber < numberOfPages; ++pageNumber) {
      addPageLink(
        `&nbsp;${pageNumber + 1}&nbsp;`,
        pageNumber,
        pageToShow === pageNumber,
      );
    }

    // draw right arrow
    addPageLink(
      '&nbsp;&rarr;',
      pageToShow < numberOfPages - 1 ? pageToShow + 1 : 0,
    );

    // don't show pagination if there's only one page
  } else {
    header.classList.add('pagination-one-page');
    header.classList.remove('pagination-many-pages');
  }
  // show contributors for the current repository
  showCards(cardsPerPage, pageToShow, contributors);
}
export default showPagination;
