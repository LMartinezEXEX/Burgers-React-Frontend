export default function sortIngredientsByType(unsortedIngredients, priorityType = []) {
    var sorted = [];
    var typeWithIngredients = {};

    // Fill dict with ingredients according their type
    unsortedIngredients.map((ingredient, _) => {
        if(ingredient.type in typeWithIngredients){
            var newIngredients = typeWithIngredients[ingredient.type].concat([ingredient]);
            typeWithIngredients[ingredient.type] = newIngredients;
        }
        else {
            typeWithIngredients[ingredient.type] = [ingredient];
        }
    });

    
    // Sort ingredients within same type
    const currentTypes = Object.keys(typeWithIngredients);
    currentTypes.map((type, _) => {
        var sortedIngredients = typeWithIngredients[type].sort(function(a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

        typeWithIngredients[type] = sortedIngredients;
    });

    // Fill list of ingredients with priority types (assumed to be in descending order of priority)
    priorityType.map((priType, _) => {
        if(currentTypes.includes(priType)){
            console.log("Entro");
            sorted = sorted.concat(typeWithIngredients[priType]);
            typeWithIngredients[priType] = [];
        }
    });

    // Fill with the remaining types 
    currentTypes.map((type, _) => {
        sorted = sorted.concat(typeWithIngredients[type]);
    });

    return sorted;
};