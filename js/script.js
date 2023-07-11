let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //functions to add to the pokemon array
    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
    }
    //function to add an event listener to show details of the pokemon when the button clicked
    function clickEventButton(button, pokemon){
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }
    return {
        
        //function selects the pokemon array and creates a list of buttons of each pokemon name
        addListItem: function(pokemon){
            let pokemonlist = document.querySelector('.pokemon-list');
            let listItem = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('pokemonButton');
            listItem.appendChild(button);
            pokemonlist.appendChild(listItem);
            // adds an event listener to each button created that show additional detail
            clickEventButton(button, pokemon)
        },
        
        loadList: function(){
            return fetch(apiUrl).then(function (response) {
              return response.json();
            }).then(function (json) {
              json.results.forEach(function (item) {
                let pokemon = {
                  name: item.name,
                  detailsUrl: item.url
                };
                add(pokemon);
              });
            }).catch(function (e) {
              console.error(e);
            })
        },
        findPokemon: function(pokemon){
            pokemonList.forEach(function(pokemonItem){
                pokemonItem.filter(pokemonItems => pokemonItems.name === pokemon)
            })
        },
        getAll: function() {
            return pokemonList;
          },
          findPokemon: function(pokemon){
              pokemonList.forEach(function(pokemonItem){
                  pokemonItem.filter(pokemonItems => pokemonItems.name === pokemon)
            })
        }
      };
})();

pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });