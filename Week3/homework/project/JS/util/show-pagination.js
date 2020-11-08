/* eslint-disable import/extensions */
import addCard from './add-card.js';

const cardsPerPage = 5;
// убрать node из параметров функции.
export function showPagination(node, contributors, pageNumber) {
  // eslint-disable-next-line no-console
  const numberOfPages = Math.ceil(contributors.length / cardsPerPage);
  const placeHolder = document.getElementById('pagination');
  placeHolder.innerHTML = '';
  for (let i = 0; i < numberOfPages; ++i) {
    const number = document.createElement('span');
    number.innerHTML = i;
    number.className = 'page-number';
    number.addEventListener('click', () => {
      showPagination(node, contributors);
    });
    placeHolder.appendChild(number);
  }
  for (let i = pageNumber; i < pageNumber + cardsPerPage; i++) {
    addCard(node, contributors[i]);
  }

  /* console.log(
    `node: ${node}, pages: ${numberOfPages}, page number: ${pageNumber}`,
  ); */
}
export default showPagination;
