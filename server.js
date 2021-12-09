const { animals } = require('./data/animals.json');
const express = require('express');
const PORT = process.envPORT || 3001;
const app = express();


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;

    if(query.personalityTraits){
        //save personalityTraits as a dedicated array
        //if personalityTraits is a string, place it into a new array and save 
        if(typeof query.personalityTraits === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array: 
        personalityTraitsArray.forEach(trait => {
            //Check the trait against each animal in the fileteredResults array.
            //Remember, it is intitially a copy of the animalsArray, 
            //but here we're updating it for each trait in the .forEach() loop.
            //For each trait being targeted by the filter, the fileteredResults
            //array will then contain only the entries that contain the trait, 
            //so at the end we'll have an array of animals that have every one 
            //of the trais when the .forEach() loop is finished. 
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }

    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}
//res is short for response req is short for request
app.get('/api/animals', (req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});