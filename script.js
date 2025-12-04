function init(){
    fetchEmAll();
}

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

// #region - Global Variables
let pokemonCollection = [];
let currentDialogIndex = 0;
let url = `https://pokeapi.co/api/v2/pokemon`;
const pokemonDialog = document.getElementById("dialog-pokemon");
const body = document.querySelector("body");
const loadingSpinnerRef = document.querySelector("div.loader");
// #endregion

// #region - Promise Functions

// fetch url, overwrite url with the next-url
async function fetchEmAll(){
    showLoadingSpinner();
    try {    
        const response = await fetch(url);
        const pokeData = await response.json();
        url = pokeData.next; // get "next" (next pack of pokemons) which is an object of the json 
        await fetchDetails(pokeData.results);
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchDetails(collection){
    for(index = 0; index < collection.length; index++){
        const pokemon = collection[index];
        const response = await fetch(pokemon.url);
        const details = await response.json();
        pokemonCollection.push(details);
    }
    renderPokemon(pokemonCollection);
}

function renderPokemon(collection){
    const resultRef = document.getElementById("resultArea");
    resultRef.innerHTML = "";
    showLoadingSpinner();
    for(pokeIndex = 0; pokeIndex < collection.length; pokeIndex++){
        resultRef.innerHTML += pokemonTemplate(pokeIndex);
    }
    // pokeData.abilities.forEach(function(absObj) {
    // forEach(collection )
    // collection.forEach(function(pokemon, index){
    //     resultRef.innerHTML += pokemonTemplate(pokeIndex, details);
    // });

    hideLoadingSpinner();
}

function renderDetailsPokemon(collection, pokeIndex){
    pokemonDialog.innerHTML = pokemonDetailsTemplate(collection, pokeIndex);
    pokemonDialog.showModal();
}

async function pokemonDataIndex(pokeIndex){
    pokeIndex = pokeIndex + 1;
    let pokeIndexUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
    const responseSingle = await fetch(pokeIndexUrl);
    return await responseSingle.json();
}

// async function pokemonDataById(id){ // was du da gemacht hast
//     const pokeSingleUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
//     const response = await fetch(pokeSingleUrl);
//     return await response.json();
// }

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

function openDetails(dialogIndex){
    currentDialogIndex = dialogIndex;
    body.classList.add("overflow-hidden");
    renderDetailsPokemon(dialogIndex);
}

function closePokemonDetails(){
    body.classList.remove("overflow-hidden");
    pokemonDialog.close();
}

pokemonDialog.addEventListener('click', (outsideClick) => {
    const dialogInner = document.getElementById("inner-dialog");
    if(!dialogInner.contains(outsideClick.target)){
        closePokemonDetails();
    }
});

function refreshDialog(dialogIndex){
    renderDetailsPokemon(dialogIndex);
}

// #region Event-Functions

// next Button in Dialog
// should 
function nextPokemon(){
    const nxtBtnRef = document.getElementById("next-dialog-btn");
    let lastIndex = pokemonCollection.length - 1;
    event.stopPropagation();
    if(currentDialogIndex < lastIndex){
        currentDialogIndex++;
    } else {
        nxtBtnRef.classList.add("is-disabled");
        return;
    }
    refreshDialog(currentDialogIndex);
}

// previous Button in Dialog
function prevPokemon(){
    const prevBtnRef = document.getElementById("prev-dialog-btn");
    event.stopPropagation();
    if(currentDialogIndex > 0){
        currentDialogIndex--;
    } else {
        prevBtnRef.classList.add("is-disabled");
        return;
    }
    refreshDialog(currentDialogIndex);
}

// #endregion


// #region Loading Functions

function loadMore(){
    if (!url) return;
    fetchEmAll();

    setTimeout(hideLoadingSpinner, 1000);
}

// #endregion


// #region - Pokemon Information/Stats Functions

function pokemonTypes(pokeData){
    let types = "";
    pokeData.types.forEach(function(typeObj) {
        const typeName = typeObj.type.name;
        types += typeTemplate(typeName)
    });
    return types;
}

function pokemonStats(pokeData) {
    let stats = "";
    pokeData.stats.forEach(function(statObj) {
        const statName = statObj.stat.name;
        const statBase = statObj.base_stat;
        stats += statsTemplate(statName, statBase)
    });
    return stats;
}

function pokemonAbs(pokeData) {
    let abs = "";
    pokeData.abilities.forEach(function(absObj) {
        const absName = absObj.ability.name;
        const absSlot = absObj.slot;
        abs += abilitiesTemplate(absName, absSlot);
    });
    return abs;
}
// #endregion

// #region - Search Pokemon
function initSearch(){
    const searchInput = document.getElementById("search-input").value;
    if (searchInput.length >= 3){
        searchPokemon(searchInput);
        renderPokemon(pokemonCollection);
    } else if (searchInput.length < 3){
        console.log("du brauchst mindestens 3 Buchstaben");
    } else {
        console.log("nix gefunden! vllt. funny Image reinladen (sad pikachu)!");
    }
}

function searchPokemon(searchInput){
    let actualPokemon = pokemonCollection;
    pokemonCollection = [];
    actualPokemon.forEach(
        function (p) {
            if (checkPokemonName(p.name, searchInput)){
                pokemonCollection.push(p);
            }
        }
    )
}

function checkPokemonName(pokeName, pokeSearch){
    if(pokeName.toLowerCase().includes(pokeSearch.toLowerCase())){
        return true;
    }
}
// #endregion

function scrollToTop(){
    console.log("scroll to Top! muss ich noch feddich machen.")
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {onScrollFunction()};

function onScrollFunction() {
    const scrollTopBtn = document.getElementById("scroll-btn");

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// #region - Loading Spinner
function showLoadingSpinner(){
    body.classList.add("overflow-hidden");
    loadingSpinnerRef.classList.remove("d-none");
}

function hideLoadingSpinner(){
    body.classList.remove("overflow-hidden");
    loadingSpinnerRef.classList.add("d-none");
}
// #endregion

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



