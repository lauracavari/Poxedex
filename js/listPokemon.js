$(document).ready(function () {
    // Array de pokemon ordenados
    let sortedPokemon = [];
    let limit = 62; // Limite de pokemon a mostrar

    // Primera llamada a la API para conseguir el listado
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + limit)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            let pokemonList = result.results;

            // Lanzamos una nueva petición a la API por cada pokemon del primer listado que hemos recibido
            pokemonList.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

    // Función que pide a la API los datos de un pokemon y los ordena en un array
    function fetchPokemonData(pokemon) {
        let urlPokemon = pokemon.url;

        // Con esta llamada pedimos los detalles de cada pokemon
        fetch(urlPokemon)
            .then(function (response) {
                return response.json();
            })
            .then(function (pokemonDetails) {
                // console.log(pokemonDetails);
                // Insertamos el primer pokemon (y sus datos) en el array sortedPokemon
                sortedPokemon.push(pokemonDetails);
                sortedPokemon.sort(function (a, b) {
                    return a.id - b.id; // Ordenar por id en orden ascendente
                });

                renderPokemonCard();

                // Disparamos el evento personalizado "allPokemonLoaded" cuando se han cargado los detalles de todos los pokemon
                // Asi evitamos errores al intentar ordenar o filtrar pokemon que aún no se han cargado
                if (sortedPokemon.length === limit) {
                    $(document).trigger("allPokemonLoaded");
                }
            })
            .then(function () {
                // console.log(sortedPokemon);
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    // Función para renderizar los datos de cada pokemon en un card
    // Esta función recorrerá el array sortedPokemon
    function renderPokemonCard() {
        $("#pokeCont").empty(); // Limpia el contenido de HTML antes de renderizar
        sortedPokemon.forEach(function (pokemonDetails) {
            // Nombre pokemon primera letra mayúscula
            if (pokemonDetails.name) {
                var pokeName =
                    pokemonDetails.name.charAt(0).toUpperCase() + pokemonDetails.name.slice(1);
            }

            let pokeHTML = `
                    <div class="pokemon col-lg-3 col-md-4 col-sm-12 type-${pokemonDetails.types[0].type.name}">
                        <div class="card">
                            <img src="${pokemonDetails.sprites.front_default}" class="card-img-top p-3" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${pokeName}</h5>
                                <p class="card-text">#<span class="pokemon-number">${pokemonDetails.id}</span></p>
                                <a href="#" class="btn btn-primary">¡Más información!</a>
                            </div>
                        </div>
                    </div>
            `;

            $("#pokeCont").append(pokeHTML);
        });
    }
});
