let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
    let modalContainer = document.querySelector("#exampleModal");
    let modalTitle = modalContainer.querySelector(".modal-title");
    let modalContainerBody = modalContainer.querySelector(".modal-body");
    function showModal(item) {
      modalTitle.innerText = item.name.toUpperCase();
      modalContainerBody.innerText = "HEIGHT: " + item.height;
      let imageElement = document.createElement("img");
      let breakPoint = document.createElement("br");
      imageElement.src = pokemon.imageUrl;
      imageElement.classList.add("imgElement");
      imageElement.setAttribute("alt", "picture of a " + pokemon.name);
      modalContainerBody.appendChild(breakPoint);
      modalContainerBody.appendChild(imageElement);
    }
  }
  return {
    addListItem: function (pokemon) {
      let pokemonlist = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemonButton");
      pokemonlist.appendChild(button);
      button.appendChild(listItem);
      listItem.classList.add("list-group-item");
      button.classList.add("g-col-6");
      button.classList.add("g-col-md-4");
      button.classList.add("m-2");
      button.classList.add("btn");
      button.setAttribute("type", "button");
      button.setAttribute("data-bs-toggle", "modal");
      button.setAttribute("data-bs-target", "#exampleModal");
      button.addEventListener("click", function () {
        showDetails(pokemon);
      });
    },
    loadList: function () {
      return fetch(apiUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = { name: item.name, detailsUrl: item.url };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    findPokemon: function (pokemon) {
      pokemonList.forEach(function (pokemonItem) {
        pokemonItem.filter((pokemonItems) => pokemonItems.name === pokemon);
      });
    },
    getAll: function () {
      return pokemonList;
    },
    findPokemon: function (pokemon) {
      pokemonList.forEach(function (pokemonItem) {
        pokemonItem.filter((pokemonItems) => pokemonItems.name === pokemon);
      });
    },
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
let searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("input", function () {
  let fileteredPokemon = pokemonRepository.getAll().filter(function (pokemon) {
    return pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  document.querySelector(".pokemon-list").innerHTML = "";
  fileteredPokemon.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
