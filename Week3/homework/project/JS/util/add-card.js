/**
 * Adds a contributor's card to the page
 * @param {*} node cards placeholder
 * @param {*} contributor
 */
export function addCard(node, contributor) {
  const card = document.createElement('div');
  card.className = 'contributors-card';
  card.innerHTML = `
  <a href="${contributor.html_url}">
    <img src="${contributor.avatar_url}" class="contributors-image" alt="contributor.login"/>
  </a>
  <a href="${contributor.html_url}">
    ${contributor.login}
  </a>
  <div class="contributors-number">
    ${contributor.contributions}
  </div>
  `;
  node.appendChild(card);
}
export default addCard;
