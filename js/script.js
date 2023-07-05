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

    //functions to add to the pokemon array and 
    return {
        add: function(pokemon) {
            if (typeof pokemon=== "object" && Object.keys(pokemon)!==['name','height','type']){
                pokemonList.push(pokemon);
            }else{
                console.log("Please enter an array in this format: {name: pokemon, height: number, type: types} ")
            }
        },
        getAll: function() {
          return pokemonList;
        }
      };
})();


//loops over the pokemonlist array and prints out  the name and height of each porkemon
pokemonRepository.getAll().forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' +pokemon.height + ') ')
    //if pokemon's height is bigger than 20 it is big
    if (pokemon.height> 20){
        document.write('- Wow thats big! ')
    }
    document.write('<br>')
})