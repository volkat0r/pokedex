function pokemonTemplate(pokeIndex, details){
    const img = pokemonImage(details);
    const pIndex = pokeIndex +1;
    const types = pokemonTypes(details);
    const height = pokemonHeight(details);
    const weight = pokemonWeight(details);

    return `
    <section class="nes-container pokemon item-${pIndex}" onclick="openDetails(${pIndex})">
        <div class="pokemon-header">
            <span>#${pIndex}</span>
            <span>colorIcon</span>
        </div>
        <div class="pokemon-main">
            <div class="poke-img">
                <img loading="lazy" src="${img}" alt="Pokemon ${details.name}">
            </div>                         
            <h3>${details.name}</h3>
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

function pokemonDetailsTemplate(details){
    const img = pokemonImage(details);
    return `
        <div id="inner-dialog">
            <div class="pokemon-header">
                <h3>${details.name}</h3>
                <button class="nes-btn" id="close-dialog" onclick="closePokemonDetails()">X</button>
            </div>
            <div class="pokemon-main">
                <div class="poke-img">
                    <img loading="lazy" src="${img}" alt="Pokemon ${details.name}">
                </div>     

                <div class="btn-tabs" role="tablist">
                    <button class="nes-btn tab-btn is-primary" role="tab" onclick="openTab(event, 'stats1')">Stats 1</button>
                    <button class="nes-btn tab-btn" role="tab" onclick="openTab(event, 'stats2')">Stats 2</button>
                    <button class="nes-btn tab-btn" role="tab" onclick="openTab(event, 'stats3')">Stats 3</button>
                </div>
                <div class="tab-content">
                    <div id="stats1" class="tab-pane is-active" role="tabpanel">
                        <div class="nes-container is-rounded">
                            <p><b>Stats 1</b> Good morning. Thou hast had a good night's sleep, I hope.</p>
                        </div>
                    </div>
                    <div id="stats2" class="tab-pane" role="tabpanel">
                        <div class="nes-container is-rounded">
                            <p><b>Stats 2</b> Good morning. Thou hast had a good night's sleep, I hope.</p>
                        </div>
                    </div>
                    <div id="stats3" class="tab-pane" role="tabpanel">
                        <div class="nes-container is-rounded">
                            <p><b>Stats 3</b> Good morning. Thou hast had a good night's sleep, I hope.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pokemon-footer">
                <menu class="dialog-menu">
                    <button class="nes-btn is-primary" id="prev-dialog" onclick="prevPokemon()"><</button>
                    <button class="nes-btn is-primary" id="next-dialog" onclick="nextPokemon()">></button>
                </menu>
            </div>
        </div>
    `;
}