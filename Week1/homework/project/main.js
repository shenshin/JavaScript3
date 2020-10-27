const reposSelect = document.querySelector('header select');

const placeholderRepos = [
  {
    name: 'SampleRepo1',
    description: 'This repository is meant to be a sample',
    forks: 5,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'AndAnotherOne',
    description: 'Another sample repo! Can you believe it?',
    forks: 9,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'HYF-Is-The-Best',
    description:
      "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
    forks: 130,
    updated: '2020-05-27 12:00:00',
  },
];

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
  document.querySelector('.contributors').appendChild(card);
}

// adds repository information on the page
function addRepoDetails(repoObject) {
  document.querySelector('.repo-details-repository').innerHTML =
    repoObject.name;
  document.querySelector('.repo-details-description').innerHTML =
    repoObject.description;
  document.querySelector('.repo-details-forks').innerHTML = repoObject.forks;
  document.querySelector('.repo-details-updated').innerHTML =
    repoObject.updated;
}

// is called on select change
function selectRepo(event) {
  addRepoDetails(placeholderRepos[event.target.value]);
}
// fill select field in the header with options
createOptions(placeholderRepos);
// fill the details of currently selected repository
addRepoDetails(placeholderRepos[reposSelect.value]);

addCard(
  './media/images/wilgert.jpeg',
  'Wilgert',
  'https://github.com/wilgert',
  3,
);
addCard(
  './media/images/demo.jpeg',
  'joostlubach',
  'https://github.com/joostlubach',
  14,
);
// listen to currently selected repository
reposSelect.addEventListener('change', selectRepo);
