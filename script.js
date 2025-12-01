function init(){
    fetchPokemons();
}

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

// #region - Global Variables
let pokemonCollection = [];
let url = `https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`;
// #endregion

// #region - Promise Functions
async function fetchPokemons(){
    try {
        const response = await fetch(url);
        const PokeData = await response.json();

        url = PokeData.next;
        pokemonCollection = pokemonCollection.concat(PokeData.results);
        renderPokemon();
    } catch (error) {
        console.error(error.message);
    }
}

async function renderPokemon(){
    const resultRef = document.getElementById("resultArea");
    resultRef.innerHTML = "";

    for(pokeIndex = 0; pokeIndex < pokemonCollection.length; pokeIndex++){
        const details = await pokemonData(pokeIndex);
        resultRef.innerHTML += pokemonTemplate(pokeIndex, details);
    }
}

async function pokemonData(pokeIndex){
    let pokeURL = `https://pokeapi.co/api/v2/pokemon/${pokeIndex + 1}`;
    const responseSingle = await fetch(pokeURL);
    return await responseSingle.json();
}
// #endregion

// #region Dialog
async function renderDetailsPokemon(){
    const dialogRef = document.getElementById("dialog-pokemon");
    dialogRef.innerHTML = "";

    for(pokeIndex = 0; pokeIndex < pokemonCollection.length; pokeIndex++){
        const details = await pokemonData(pokeIndex);
        dialogRef.innerHTML += pokemonDetailsTemplate(pokeIndex, details);
    }
}

function openCheckDetails(){
    const dialog = document.getElementById("dialog-pokemon");
    if (dialog) {
        console.log("Dialog open");
    } else {
        console.log("Dialog closed");
    }
}

function renderDetailsPokemon(details){
    console.log("renderDetailsPokemon");
    const pokemonDetails = document.getElementById("test-dialog");
    pokemonDetails += pokemonDetailsTemplate();

    pokeDetails.showModal();
    openCheckDetails(dialog);
}

function closePokemonDetails(){
    console.log("closeDialog");    
}

function prevPokemon(){
    console.log("previous Pokemon");    
}

function nextPokemon(){
    console.log("next Pokemon");    
}
// #endregion

// #region Loading Functions
function loadMore(){
    if (!url) return;
    fetchPokemons();
}

// lazyloading
// Zwischenspeicher

// #endregion



// #region Functions to get informations
function pokemonImage(pokeData){
    return pokeData.sprites.other["official-artwork"].front_default;
}

function pokemonTypes(pokeData){
    return pokeData.types
        .map(t => typeTemplate(t.type.name))
        .join("");
}

function pokemonHeight(pokeData){
    return pokeData.height;
}

function pokemonWeight(pokeData){
    return pokeData.weight;
}

function searchPokemon(){
    const searchInput = document.getElementById("search-input").value;
    fetchDataJson(searchInput);
}
// #endregion


// API
// 1. fetch url
// 2. build for-loop to get all data (120pokemons)


// CODE:
// Aussagekräftige Namen für Funktionen und Variablen
// camelCase für die Benennung 
// Code ist formatiert
// Höchstens 14 Zeilen pro Funktion
// Gleicher Abstand zwischen Funktionen (1 oder 2 Leerzeilen)
// Lagere HTML Templates aus in extra-Funktionen


// Allgemein:
// Es soll eine bestimmte Anzahl an Pokemon Karten direkt gerendert werden, am besten zwischen 20 und 40.
// Berücksichtige dabei folgende Prinzipien:
// a)	Lazy-Loading: Lade Daten nur dann, wenn sie wirklich gebraucht werden (z. B. Evo-Chain, da neue fetch-url, erst beim klicken auf eine Pokemonkarte).
// b)	Fetch-then-Render: Erst laden, dann rendern.
// c)	Caching: Speichere heruntergeladene Inhalte ab und lade sie nicht mehrfach.

// Für dieses Projekt gibt es kein Mockup, dein Design kann gerne kreativ sein.
// Unten auf der Seite gibt es einen Button, um weitere 20-40 Pokemon zu laden. 
// Es erscheint ein Loadingscreen (Userfeedback).
// Der Button kann während des Ladens nicht erneut angeklickt werden.


// Kleine Pokemonkarte (Listenansicht):
// Werte der kleinen Pokemonkarte:
// Name (Groß geschrieben!)
// Typ/en
// Bild des Pokemons
// Hintergrundfarbe passend zum Typ
// ID (optional)
// Die Karte hat einen Hovereffekt.


// Große Ansicht (Overlay):
// Beim Klicken auf die kleine Pokemonkarte soll sich diese in groß öffnen.
// Benutze ein transparentes Overlay. Wenn man neben die Karte klickt, sollte sie geschlossen werden.
// Der Hintergrund ist nicht scrollbar in der großen Ansicht.
// Wie du diese gestaltest und welche du hier alle anzeigen lässt, ist dir überlassen, jedoch sollten hier mindestens gewisse Werte wie z.B. hp/ attack/ defense etc. des Pokemon angezeigt werden, weiteres ist optional.
// Es gibt Pfeile oder ähnliches, um zwischen den Karten in der großen Ansicht zu wechseln (wie bei der Fotogalerie).
