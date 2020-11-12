/* eslint-disable import/extensions */
// Create a separate .js for every function you create
// Import all top-level functions into the script.js file to execute when the window has loaded
import { addDetails } from './util/add-details.js';
import { displayHTML } from './util/display-html.js';
import { createOptions } from './util/create-options.js';
import { fetchDetails } from './util/fetch-details.js';
import { fetchContributors } from './util/fetch-contributors.js';

/**
 * Creates HTML page showing HackYourFuture repositories and contributors
 */
function main() {
  displayHTML();
  const reposSelect = document.querySelector('header select');
  const repoDetails = document.querySelector('.repo-details');

  // assignment: Populate the <select> with options. Use the data fetched from the GitHub API, using this URL:
  fetchDetails(
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100',
  ).then(data => {
    // fill select field in the header with options
    createOptions(reposSelect, data);
    // fill the details of currently selected repository
    const firstRepo = data[reposSelect.value];
    addDetails(repoDetails, firstRepo);
    fetchContributors(firstRepo.contributors_url);
    // When a user changes the option in the <select> tag, listen to that "change" event and make an HTTP Request to the GitHub API to get repository-specific data.
    reposSelect.addEventListener('change', event => {
      const selectedRepo = data[event.target.value];
      addDetails(repoDetails, selectedRepo);
      fetchContributors(selectedRepo.contributors_url);
    });
  });
}

// Create a main function that will execute all of your functions only when the window has fully loaded
window.addEventListener('load', main);
