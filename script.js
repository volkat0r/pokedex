function init(){
    fetchPokemon();
}

// #region - Global Variables
let pokemonCollection = [];
let pokemonResultCollection = [];
let currentRenderCollection = pokemonCollection;
let currentDialogIndex = 0;
let url = `https://pokeapi.co/api/v2/pokemon`;
const resultRef = document.getElementById("resultArea");
const pokemonDialog = document.getElementById("dialog-pokemon");
const body = document.querySelector("body");
const loadingSpinnerRef = document.querySelector("div.loader");
// #endregion

// #region - Promise Functions

async function fetchPokemon(){
    showLoadingSpinner();
    try {    
        const response = await fetch(url);
        const pokeData = await response.json();
        url = pokeData.next;
        await fetchDetails(pokeData.results);
    } catch (error) {
        console.error(error.message);
    }
}

async function fetchDetails(collection){
    for(let index = 0; index < collection.length; index++){
        const pokemon = collection[index];
        const response = await fetch(pokemon.url);
        const details = await response.json();
        pokemonCollection.push(details);
    }
    renderPokemon(pokemonCollection);
}

function renderPokemon(collection){
    resultRef.innerHTML = "";
    showLoadingSpinner();
    currentRenderCollection = collection;
    for(pokeIndex = 0; pokeIndex < collection.length; pokeIndex++){
        resultRef.innerHTML += pokemonTemplate(collection, pokeIndex);
    }
    hideLoadingSpinner();
}

function renderDetailsPokemon(pokeIndex){
    const pokemon = currentRenderCollection[pokeIndex];
    pokemonDialog.innerHTML = pokemonDetailsTemplate(pokemon);
    pokemonDialog.showModal();
}

async function pokemonDataIndex(pokeIndex){
    pokeIndex = pokeIndex + 1;
    let pokeIndexUrl = `https://pokeapi.co/api/v2/pokemon/${pokeIndex}`;
    const responseSingle = await fetch(pokeIndexUrl);
    return await responseSingle.json();
}
// #endregion

// #region Dialog
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

function openDetailTab(event, activeTab){
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

// #region Load-More Functions
function loadMore(){
    if (!url) return;
    fetchPokemon();
}
// #endregion

// #region - Pokemon Data Functions
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
function initSearch() {
    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput.length < 3) {
        pokemonResultCollection = [];
        renderPokemon(pokemonCollection);
        return;
    }
    pokemonResultCollection = searchPokemon(searchInput);
    if (pokemonResultCollection.length === 0) {
        resultRef.innerHTML = noSearchResult();
        return;
    }
    renderPokemon(pokemonResultCollection);
}

function searchPokemon(searchInput) {
    let filtered = [];
    pokemonCollection.forEach(p => {
        if (checkPokemonName(p.name, searchInput)) {
            filtered.push(p);
        }
    });
    return filtered;
}

function checkPokemonName(pokeName, pokeSearch){
    return pokeName.toLowerCase().includes(pokeSearch.toLowerCase());
}
// #endregion

// #region - Scroll-Btn Behavior
window.onscroll = function() {onScrollFunction()};

function onScrollFunction() {
    const scrollTopBtn = document.getElementById("scroll-btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}

function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// #endregion

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

