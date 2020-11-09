/* eslint-disable import/extensions */
import { addCard } from './add-card.js';
/**
 * Shows one page of contributors card
 * @param {number} cardsPerPage number of cards to show on the page at once
 * @param {number} pageToShow which page is currently selected
 * @param {object[]} contributors array of contributor objects
 */
export function showCards(cardsPerPage, pageToShow, contributors) {
  // show cards from the selected page
  const cardsPlaceholder = document.querySelector('.contributors-cards');
  cardsPlaceholder.innerHTML = '';
  const firstCardNumber = pageToShow * cardsPerPage;
  for (
    let cardNumber = firstCardNumber;
    cardNumber < firstCardNumber + cardsPerPage;
    cardNumber++
  ) {
    if (cardNumber in contributors) {
      addCard(cardsPlaceholder, contributors[cardNumber]);
    } else {
      break;
    }
  }
}
export default showCards;
