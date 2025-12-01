function pokemonTemplate(pokeIndex, details){
    const img = pokemonImage(details);
    const pIndex = pokeIndex +1;
    const types = pokemonTypes(details);
    const height = pokemonHeight(details);
    const weight = pokemonWeight(details);

    return `
    <section class="nes-container pokemon item-${pIndex}" onclick="renderDetailsPokemon()">
        <div class="pokemon-header">
            <span>#${pIndex}</span>
            <span>colorIcon</span>
        </div>
        <div class="pokemon-body">
            <div class="poke-img">
                <img src="${img}">
            </div>                         
            <h3>${pokemonCollection[pokeIndex].name}</h3>
        </div>
        <div class="pokemon-footer">
            <div class="poke-stats">
                <span>weight: ${weight}kg</span>
                <span>height: ${height}m</span>
            </div>
            <div class="poke-type">
                <span>Type(s):</span>
                <span class="container">${types}</span>
            </div>
        </div>
    </section>
    `
}

function typeTemplate(typeName) {
    return `<span class="${typeName}">${typeName}</span>`;
}

function pokemonDetailsTemplate(pokeIndex, details){
    const img = pokemonImage(details);
    return `
        <div class="inner-dialog">
            <button class="nes-btn" id="close-dialog" onclick="closePokemonDetails()">X</button>
            <h3>${pokemonCollection[pokeIndex].name}</h3>
            <div class="poke-img">
                <img src="${img}">
            </div>
            <form method="dialog">
                <p class="title">Dark and Rounded dialog</p>
                <p>Alert: this is a dialog.</p>
                <menu class="dialog-menu">
                    <button class="nes-btn is-primary" onclick="prevPokemon()"><</button>
                    <button class="nes-btn is-primary" onclick="nextPokemon()">></button>
                </menu>
            </form>
        </div>
    `;
}