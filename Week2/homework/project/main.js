// fills <select> field with repo names from an array of repos objects
const createOptions = ({ node, reposArray }) => {
  // sort repo names in alphabetical order
  reposArray.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
  );
  reposArray.forEach((object, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = object.name;
    node.appendChild(option);
  });
};

// adds contributor's card to the page
const addCard = ({ node, contributor }) => {
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
};

// adds repository information on the page
const addRepoDetails = ({ node, repoObject }) => {
  // assignment: Recreate all the HTML elements using JavaScript
  node.innerHTML = `
  <table>
    <tr>
      <td>
        Repository:
      </td>
      <td>
        <a href="${repoObject.html_url}">${repoObject.name}</a>
      </td>
    </tr>
    <tr>
      <td>
        Description:
      </td>
      <td>${repoObject.description || repoObject.name}</td>
    </tr>
    <tr>
      <td>
        Forks:
      </td>
      <td>${repoObject.forks_count}</td>
    </tr>
    <tr>
      <td>
        Updated:
      </td>
      <td>${new Date(repoObject.updated_at).toLocaleString()}</td>
    </tr>
  </table>
  `;
};

// If there's an error in the HTTP Request, display the following:
const showError = error => {
  const parentNode = document.querySelector('.page-container');
  const errorNode = document.createElement('div');
  errorNode.className = 'error-message';
  errorNode.innerHTML = `${error}`;
  parentNode.insertBefore(errorNode, document.querySelector('main'));
  setTimeout(() => {
    parentNode.removeChild(errorNode);
  }, 4000);
};

// When the repository-specific has been fetched, populate the right columns: contributors and repository details.
const addContributorsCards = ({ node, url }) => {
  node.innerHTML = '';
  fetch(url)
    .then(data => data.json())
    .then(contributors => {
      contributors.forEach(contributor => {
        addCard({ node, contributor });
      });
    })
    .catch(err => showError(err));
};

// Create a main function that will execute all of your functions
const main = () => {
  // assignment: Recreate all the HTML elements using JavaScript
  document.body.innerHTML = `
  <div class="page-container">
    <header>
      <p>HYF&nbsp;Repositories</p>
      <select></select>
    </header>
    <main>
      <section class="repo-details"></section>
      <section class="contributors">
        <div class="contributors-header">
          Contributors
        </div>
        <div class="contributors-cards"></div>
      </section>
    </main>
  </div>
  `;
  const reposSelect = document.querySelector('header select');
  const repoDetails = document.querySelector('.repo-details');
  const contributorsCards = document.querySelector('.contributors-cards');

  // assignment: Populate the <select> with options. Use the data fetched from the GitHub API, using this URL:
  fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(data => data.json())
    .then(data => {
      // fill select field in the header with options
      createOptions({ node: reposSelect, reposArray: data });
      // fill the details of currently selected repository
      const firstRepo = data[reposSelect.value];
      addRepoDetails({ node: repoDetails, repoObject: firstRepo });
      addContributorsCards({
        node: contributorsCards,
        url: firstRepo.contributors_url,
      });
      // When a user changes the option in the <select> tag, listen to that "change" event and make an HTTP Request to the GitHub API to get repository-specific data.
      reposSelect.addEventListener('change', event => {
        const selectedRepo = data[event.target.value];
        addRepoDetails({ node: repoDetails, repoObject: selectedRepo });
        addContributorsCards({
          node: contributorsCards,
          url: selectedRepo.contributors_url,
        });
      });
    })
    .catch(err => showError(err));
};

// Create a main function that will execute all of your functions only when the window has fully loaded
window.addEventListener('load', main);
