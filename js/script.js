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
for (let i=0; i<pokemonList.length; i++){
    document.write(pokemonList[i].name + ' (height: ' +pokemonList[i].height + ') ')
    //if pokemon's height is bigger than 20 it is big
    if (pokemonList[i].height> 20){
        document.write('- Wow thats big! ')
    }
    document.write('<br>')
}