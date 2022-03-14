export function sortBurgerElementsForShow(size, ingredients, types = []) {
    // First the burger size (Requiered)
    var elements = [size];
    const protein = ingredients.find(element => element.type === 'PROTEIN');

    // Second the protein (Requiered)
    elements = elements.concat([protein]);

    // Third the ingredients sorted by types (Optionals)
    var ingredientsByType = {};
    types.map((type, _) => {
        ingredientsByType[type] =[];
    })

    ingredients.filter(element => element.type !== 'PROTEIN')
            .map((ingredient, _) => {
                if(ingredient.type in ingredientsByType){
                    ingredientsByType[ingredient.type] = ingredientsByType[ingredient.type].concat([ingredient]);
                }
                else {
                    types = types.concat([ingredient.type])
                    ingredientsByType[ingredient.type] = [ingredient]
                }
            })

    types.map((type, _) => {
        var sortedIngredients = ingredientsByType[type].sort(function(a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });

        ingredientsByType[type] = sortedIngredients;
    })

    const sortedTypes = types.sort(function(a, b) {
        if(a.toLowerCase() < b.toLowerCase()) return -1;
        if(a.toLowerCase() > b.toLowerCase()) return 1;
        return 0;
    });

    sortedTypes.map((type, _) => {
        elements = elements.concat(ingredientsByType[type])
    })

    return elements;
}