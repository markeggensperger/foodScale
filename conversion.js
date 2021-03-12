const convertibleIngredients = require('./conversionChart');

function convertIngredient(ingredient) {
  let idx = convertibleIngredients.findIndex((stdIngredient) =>
    ingredient.includes(stdIngredient.name)
  );
  if (idx > -1) {
    let [qty, measure, ingredientString] = prepIngredientString(ingredient);
    if (measure === 'cups' || measure === 'cup') {
      qty *= convertibleIngredients[idx].cups;
      measure = 'grams';
    } else if (measure === 'tbsp' || measure === 'tbsps') {
      qty *= convertibleIngredients[idx].tbsp;
      measure = 'grams';
    } else if (measure === 'tsps' || measure === 'tsps') {
      qty *= convertibleIngredients[idx].tsp;
      measure = 'grams';
    }
    ingredient = [parseInt(qty), measure, ingredientString].join(' ');
  }
  return ingredient;
}

function prepIngredientString(string) {
  let words = string.split(' ');
  words = words.map((word) => {
    if (
      word.includes('/') &&
      word.split.length === 2 &&
      word.split('/').every((num) => !isNaN(num))
    ) {
      return eval(word);
    }
    return word.toLowerCase();
  });

  for (let i = 0; i < words.length - 1; i++) {
    if (!isNaN(words[i]) && !isNaN(words[i + 1])) {
      words[i] = parseFloat(words[i]) + parseFloat(words[i + 1]);
      words.splice(i + 1, 1);
    }
  }
  return [words[0], words[1], words.slice(2).join(' ')];
}

module.export = convertIngredient;
