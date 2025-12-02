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
let pokemonResultCollection = []; // empty array after searching
let currentDialogIndex = 1;
const pokemonDialog = document.getElementById("dialog-pokemon");
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
        const details = await pokemonDataIndex(pokeIndex);
        resultRef.innerHTML += pokemonTemplate(pokeIndex, details);
    }
}

function renderDetailsPokemon(details){
    pokemonDialog.innerHTML = pokemonDetailsTemplate(details);
    pokemonDialog.showModal();
}

async function pokemonDataIndex(pokeIndex){
    pokeIndex = pokeIndex + 1;
    let pokeIndexUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
    const responseSingle = await fetch(pokeIndexUrl);
    return await responseSingle.json();
}

async function pokemonDataById(id){
    const pokeSingleUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(pokeSingleUrl);
    return await response.json();
}
// #endregion

// #region Dialog
function openTab(event, activeTab){
    const tabPane = document.getElementsByClassName("tab-pane");
    const tabBtn = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabPane.length; i++) {
        tabPane[i].style.display = "none";
    }
    for (let i = 0; i < tabBtn.length; i++) {
        tabBtn[i].classList.remove("is-primary");
    }
    document.getElementById(activeTab).style.display = "flex";
    event.currentTarget.classList.add("is-primary");
}

async function openDetails(dialogIndex){
    currentDialogIndex = dialogIndex;
    const body = document.querySelector("body");
    body.classList.add("overflow-hidden");
    const details = await pokemonDataById(dialogIndex);
    renderDetailsPokemon(details);
}

function closePokemonDetails(){
    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
    pokemonDialog.close();
}

pokemonDialog.addEventListener('click', (outsideClick) => {
    const dialogInner = document.getElementById("inner-dialog");
    if(!dialogInner.contains(outsideClick.target)){
        closePokemonDetails();
    }
});

async function refreshDialog(dialogIndex){
    const details = await pokemonDataIndex(dialogIndex);
    renderDetailsPokemon(details);
}

// next Button in Dialog
function nextPokemon(){
    let collectionTotal = pokemonCollection.length;
    if(currentDialogIndex < collectionTotal -1){
        currentDialogIndex++;
    } else{
        currentDialogIndex = 0;
    }
    refreshDialog(currentDialogIndex);
}

// previous Button in Dialog
function prevPokemon(){ 
    let collectionTotal = pokemonCollection.length;
    if(currentDialogIndex > 0){
        currentDialogIndex--;
    } else {
        currentDialogIndex = collectionTotal -1;
    }
    refreshDialog(currentDialogIndex);
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



// #region - Pokemon Information/Stats Functions
function pokemonImage(pokeData){
    return pokeData.sprites.versions["generation-i"]["red-blue"].front_transparent;
}

function pokemonTypes(pokeData){
    console.log(pokeData);
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
