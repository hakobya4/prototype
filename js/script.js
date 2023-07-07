let pokemonRepository =(function(){
    let pokemonList = [
        {
        name: 'Butterfree',
        height: 12,
        type: ['bug', 'flying']
        },
        {
        name: 'Fearow',
        height: 22,
        type: ['normal', 'flying']
        },
        {
        name: 'Clefairy',
        height: 35,
        type: 'fairy'
        },
    ];

    function showDetails(pokemon){
        console.log(pokemon.name)
    }
    //function to add an event listener to show details of the pokemon when the button clicked
    function clickEventButton(button, pokemon){
        button.addEventListener('click', function () {
            showDetails(pokemon);
        })
    }
    return {
         //functions to add to the pokemon array
        add: function(pokemon) {
            if (typeof pokemon=== "object" && Object.keys(pokemon)!==['name','height','type']){
                pokemonList.push(pokemon);
            }else{
                console.log("Please enter an array in this format: {name: pokemon, height: number, type: types} ")
            }
        },
        
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

//calls addlistItem function from the IIFE 
pokemonRepository.getAll().forEach(function(pokemonItem){
    pokemonRepository.addListItem(pokemonItem)
})