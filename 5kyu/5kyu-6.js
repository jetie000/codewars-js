function bulk(arr) {
    let grams = arr.join(', ').match(/[1-9]+/g).map(el => Number(el))
    let foodMy = arr.join(', ').match(/[a-z]+/g).filter(a => a !== 'g')
    return "Total proteins: "+foodMy.reduce((acc, el, i) => acc + food[el][0]/100*grams[i], 0)+" grams, Total calories: "+foodMy.reduce((acc, el, i) => acc + food[el][0]/400*grams[i] + food[el][1]/400*grams[i]+ food[el][2]/900*grams[i], 0)
}


// Given an array of meals where each element is a string in the form '300g turkey, 300g potatoes, 100g cucumber' 
// find out how many proteins and calories you consumed. You like to keep things simple so all values will be expressed in grams. 
// In case you didn't know every gram of protein and carbohydrate has 4 calories, while 1 gram of fat provides 9 calories.
// An object food (in Ruby $food ) is preloaded for you that contains the information about the given food per 100 grams: