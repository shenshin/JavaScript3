// repos selector in the page header
const reposSelect = document.querySelector('header select');
// place to add cotributors cards
const contributorsCards = document.getElementById('contributors-cards');

// fills select field with repo names from an array of repos objects
function createOptions(arrayOfObjects) {
  arrayOfObjects.forEach((object, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerHTML = object.name;
    reposSelect.appendChild(option);
  });
}

// adds contributor's card to the page
function addCard(imageURL, accountName, accountURL, number) {
  /* contributorsCards.innerHTML += `
  <div class="contributors-card">
    <a href="${accountURL}">
      <img class="contributors-image" src="${imageURL}" alt="${accountName}"/>
    </a>
    <a href="${accountURL}">
      ${accountName}
    </a>
    <div class="contributors-number">
      ${number}
    </div>
  </div>`; */
  const card = document.createElement('div');
  card.className = 'contributors-card';
  const image = document.createElement('img');
  image.className = 'contributors-image';
  image.src = imageURL;
  image.alt = accountName;
  card.appendChild(image);
  const anchor = document.createElement('a');
  anchor.href = accountURL;
  anchor.innerHTML = accountName;
  card.appendChild(anchor);
  const numberDiv = document.createElement('div');
  numberDiv.className = 'contributors-number';
  numberDiv.innerHTML = number;
  card.appendChild(numberDiv);
  contributorsCards.appendChild(card);
}

// adds repository information to the repo details column
function addRepoDetails(repoObject) {
  const repoAnchor = document.createElement('a');
  repoAnchor.href = repoObject.git_url;
  repoAnchor.innerHTML = repoObject.name;
  document.getElementById('repo-details-repository').appendChild(repoAnchor);
  document.getElementById('repo-details-description').innerHTML =
    repoObject.description;
  document.getElementById('repo-details-forks').innerHTML =
    repoObject.forks_count;
  document.getElementById('repo-details-updated').innerHTML =
    repoObject.updated_at;
}

// adds cards in contributors column
function addContibutors(url) {
  fetch(url)
    .then(response => response.json())
    .then(contributors => {
      contributorsCards.innerText = '';
      contributors.forEach(person => {
        addCard(
          person.avatar_url,
          person.login,
          person.html_url,
          person.contributions,
        );
      });
    });
}

function main() {
  // Populate the <select> with options. Use the data fetched from the GitHub API, using this URL:
  fetch('https://api.github.com/orgs/HackYourFuture/repos?per_page=100')
    .then(response => response.json())
    .then(data => {
      // fill select field in the header with options
      createOptions(data);
      // fill the details of currently selected repository
      const firstRecord = data[reposSelect.value];

      // When the repository-specific has been fetched, populate the right columns: contributors and repository details.
      addRepoDetails(firstRecord);
      addContibutors(firstRecord.contributors_url);

      // When a user changes the option in the <select> tag, listen to that "change" event and make an HTTP Request to the GitHub API to get repository-specific data.
      reposSelect.addEventListener('change', event => {
        const repo = data[event.target.value];
        addRepoDetails(repo);
        addContibutors(repo.contributors_url);
      });
    });
}
main();
// Create a main function that will execute all of your functions only when the window has fully loaded
// window.addEventListener('load', main);
