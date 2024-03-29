let fetchedPokemons = [];
const totalPokemonCount = 800;
let currentPokemonIndex = 1;
let isFetchingData = false;


//**Pokemons's colors */
const colors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
};

//**download API */
function showLoadingAnimation() {
    loadingAnimation.style.display = 'block';
}

function hideLoadingAnimation() {
    loadingAnimation.style.display = 'none';
}

async function loadPokemons() {
    if (isFetchingData) {
        return; // Wenn bereits eine Anfrage läuft, wird die Funktion beendet
    }

    showLoadingAnimation();
    isFetchingData = true; // Die Variable wird auf true gesetzt, um anzuzeigen, dass eine Anfrage läuft

    for (let i = 0; i < 20; i++) {
        if (currentPokemonIndex <= totalPokemonCount) {
            let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemonIndex}`;
            let response = await fetch(url);
            let currentPokemon = await response.json();
            fetchedPokemons.push(currentPokemon);
            renderPokemonCards(currentPokemonIndex);
            currentPokemonIndex++;
        }
    }

    hideLoadingAnimation();
    isFetchingData = false; // Die Variable wird auf false gesetzt, da die Anfrage abgeschlossen ist
}

//**search Pokemons */
function searchPokemon() {
    let search = document.getElementById('searchBar').value;
    search = search.toLowerCase();

    document.getElementById('allPokemon').innerHTML = '';
    for (let i = 0; i < fetchedPokemons.length; i++) {
        if (fetchedPokemons[i]['name'].toLowerCase().includes(search)) {
            renderPokemonCards(i + 1);
        }
    }
}

function renderPokemonCards(pokemonIndex) {
    // Code zum Rendern der Pokémon-Karten hier einfügen
    // Hier ist Ihr vorhandener Code, der die Pokémon-Karten rendert, angepasst für den übergebenen Index
    const pokemon = pokemonIndex - 1;
    const name = fetchedPokemons[pokemon]['name'].charAt(0).toUpperCase() + fetchedPokemons[pokemon]['name'].slice(1);
    const image = fetchedPokemons[pokemon]['sprites']['other']['dream_world']['front_default'];
    const number = fetchedPokemons[pokemon]['id'].toString().padStart(3, '0');
    const id = fetchedPokemons[pokemon]['id'].toString();
    const type = fetchedPokemons[pokemon]['types'][0]['type']['name'].charAt(0).toUpperCase() + fetchedPokemons[pokemon]['types'][0]['type']['name'].slice(1);
    const color = colors[type.toLowerCase()];

    let container = document.getElementById('allPokemon');

    container.innerHTML += `<div id="pokeBox${id}" class="pokeBox" onclick="showPokemonInfo(${id - 1})"> 
        <h5>${name}</h5>
        <img src="${image}">
        <div style="border-radius: 5px"><b>${type}</b></div>
        <div><b>#${number}</b></div>`;

    document.getElementById('pokeBox' + id).style.backgroundColor = `${color}`;
}

//**show selected Pokemon in seperate div*/
function showPokemonInfo(value) {

    document.getElementById('pokemonInfo').innerHTML = '';

    document.getElementById('body').classList.add('noScroll');
    document.getElementById('header').classList.add('d-none');
    generateInfoCardHtml(value);

}

function closePokemonInfo() {
    document.getElementById('pokemonInfoBg').classList.add('d-none');
    document.getElementById('pokemonInfoTrans').classList.add('d-none');
    document.getElementById('body').classList.remove('noScroll');
    document.getElementById('header').classList.remove('d-none');
}