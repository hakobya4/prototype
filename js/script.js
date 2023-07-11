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
          // Adds the details to the item
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }
    //opens a modal to show pokemon name, height, picture
    function showDetails(pokemon) {
        
      loadDetails(pokemon).then(function () {
        showModal(pokemon);
      });

      let modalContainer = document.querySelector('#modal-container');
  
      function showModal(item) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = item.name.toUpperCase();

        let contentElement = document.createElement('p');
        contentElement.innerText = "HEIGHT: " + pokemon.height;

        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement)
        modalContainer.appendChild(modal);
        modal.appendChild(closeButtonElement);
            
        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        modalContainer.classList.remove('is-visible');
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
      });
  
      modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      document.querySelector('#show-modal').addEventListener('click', () => {
        showModal(pokemon);
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