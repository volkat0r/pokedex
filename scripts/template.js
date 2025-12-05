function pokemonTemplate(pokeIndex){

    return `
    <section class="nes-container pokemon item-${pokeIndex}" onclick="openDetails(${pokeIndex})">
        <div class="pokemon-header">
            <span>#${pokemonCollection[pokeIndex].id}</span>
        </div>
        <div class="pokemon-main">
            <div class="poke-img">
                <img loading="lazy" src="${pokemonCollection[pokeIndex].sprites.versions["generation-i"]["red-blue"].front_transparent}" alt="Pokemon ${pokemonCollection[pokeIndex].name}">
            </div>                         
            <h3>${pokemonCollection[pokeIndex].name}</h3>
        </div>
        <div class="pokemon-footer">
            <div class="poke-stats">
                <span>weight: ${pokemonCollection[pokeIndex].weight}lbs</span>
                <span>height: ${pokemonCollection[pokeIndex].height}ft</span>
            </div>
            <div class="poke-type">
                <span>Type(s):</span>
                <span class="container">
                    ${pokemonTypes(pokemonCollection[pokeIndex])}
                </span>
            </div>
        </div>
    </section>
    `
}

function typeTemplate(typeName) {
    return `<span class="${typeName}">${typeName}</span>`;
}

function statsTemplate(name, base) {
    return `<p>${name}: <b>${base}</b></p>`;
}

function abilitiesTemplate(absName, absSlot){
    return `<p>Slot ${absSlot}: <b>${absName}</b></p>`;
}

function noSearchResult(){
    return `
    <div class="emptyResult">
        <span class="ash"></span>
        <p class="nes-balloon from-left nes-pointer">No Pokemon to catch!</p>
    </div>`;
}

function pokemonDetailsTemplate(pokeIndex){
    return `
        <div id="inner-dialog">
            <div class="pokemon-header">
                <h3>${pokemonCollection[pokeIndex].name}</h3>
                <button class="nes-btn is-error" id="close-dialog" onclick="closePokemonDetails()" alt="close dialog">X</button>
            </div>
            <div class="pokemon-main">
                <div class="poke-img">
                    <img loading="lazy" src="${pokemonCollection[pokeIndex].sprites.versions["generation-i"]["red-blue"].front_transparent}" alt="Pokemon ${pokemonCollection[pokeIndex].name}">
                </div>     

                <div class="btn-tabs" role="tablist">
                    <button class="nes-btn tab-btn is-primary" role="tab" onclick="openTab(event, 'stats1')">Info</button>
                    <button class="nes-btn tab-btn" role="tab" onclick="openTab(event, 'stats2')">Stats</button>
                    <button class="nes-btn tab-btn" role="tab" onclick="openTab(event, 'stats3')">Abilities</button>
                </div>
                <div class="tab-content">
                    <div id="stats1" class="tab-pane is-active" role="tabpanel">
                        <div class="nes-container is-rounded">
                            <p>weight: <b>${pokemonCollection[pokeIndex].weight}lbs</b></p>
                            <p>height: <b>${pokemonCollection[pokeIndex].height}</b>ft</p>
                        </div>
                        <div class="poke-type">
                            <span>Type(s):</span>
                            <span class="container">
                                ${pokemonTypes(pokemonCollection[pokeIndex])}
                            </span>
                        </div>
                    </div>
                    <div id="stats2" class="tab-pane" role="tabpanel">
                        <div class="nes-container is-rounded">
                            ${pokemonStats(pokemonCollection[pokeIndex])}
                        </div>
                    </div>
                    <div id="stats3" class="tab-pane" role="tabpanel">
                        <div class="nes-container is-rounded">
                            ${pokemonAbs(pokemonCollection[pokeIndex])}
                        </div>
                    </div>
                </div>
            </div>
            <div class="pokemon-footer">
                <menu class="dialog-menu">
                    <button class="nes-btn is-primary" id="prev-dialog-btn" onclick="prevPokemon()"><</button>
                    <button class="nes-btn is-primary" id="next-dialog-btn" onclick="nextPokemon()">></button>
                </menu>
            </div>
        </div>
    `;
}