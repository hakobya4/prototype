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
]

//loops over the pokemonlist array and prints out  the name and height of each porkemon
pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + ' (height: ' +pokemon.height + ') ')
    //if pokemon's height is bigger than 20 it is big
    if (pokemon.height> 20){
        document.write('- Wow thats big! ')
    }
    document.write('<br>')
})()
