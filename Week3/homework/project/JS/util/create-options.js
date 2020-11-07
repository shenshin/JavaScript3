/**
 * Fills <select> in the page header with the repositories names
 * @param {HTMLElement} selectNode select html element in the page header
 * @param {object[]} reposArray array of repositories, comming from Git API
 */
export function createOptions(selectNode, reposArray) {
  // sort repo names in alphabetical order
  reposArray.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
  );
  reposArray.forEach((object, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = object.name;
    selectNode.appendChild(option);
  });
}
export default createOptions;
