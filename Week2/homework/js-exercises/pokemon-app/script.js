/* eslint-disable no-console */
/* eslint-disable no-alert */

// Exercise 3: Gotta catch 'em all

// Inside of your homework folder, create another folder called pokemon-app. There, create an index.html and script.js file

// Create 3 functions: fetchData, addPokemonToDOM and main

let button;
let selectElement;
let image;

// In the fetchData function, make use of fetch and its Promise syntax in order to get the data from the public API

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    return alert(error);
  }
}

function addPokemonToDOM(pokemons) {
  pokemons.forEach((pokemon, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.innerText = pokemon.name;
    selectElement.appendChild(option);
  });
  selectElement.style.cursor = 'pointer';
  selectElement.addEventListener('change', event => {
    fetchData(pokemons[event.target.value].url).then(data => {
      image.src = data.sprites.front_default;
    });
  });
}

// The main function executes the other functions and contains all the variables

function main() {
  const pokemonsURL = 'https://pokeapi.co/api/v2/pokemon?offset=150&limit=150';
  button = document.createElement('button');
  button.innerHTML = 'Get Pokemon!';
  button.addEventListener('click', () => {
    fetchData(pokemonsURL).then(pokemons => {
      addPokemonToDOM(pokemons.results);
    });
  });
  button.style.cursor = 'pointer';
  selectElement = document.createElement('select');
  image = document.createElement('img');
  [button, selectElement, image].forEach(element => {
    element.style.display = 'block';
    element.style.margin = '2rem 1rem';
    document.body.appendChild(element);
  });
}

// Execute the main function when the window has finished loading

main();
