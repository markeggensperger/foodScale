console.log('getting conversion function');

const { convertibleIngredients, fractionChars, measurements } = globalThis;

globalThis.convertIngredient = (ingredient) => {
  console.log('checking ingredient ', ingredient);
  let idx = convertibleIngredients.findIndex((stdIngredient) =>
    stdIngredient.names.some((name) => ingredient.includes(name))
  );

  if (idx > -1) {
    console.log('converting from ', convertibleIngredients[idx].mainName);
    let [qty, measure, ingredientString] = prepIngredientString(ingredient);
    console.log('qty: ', qty);
    console.log('measture: ', measure);
    console.log('ingredient: ', ingredientString);
    if (isNaN(qty)) return ingredient;
    let qty0 = qty;
    let measure0 = measure;
    for (weight of Object.keys(convertibleIngredients[idx])) {
      if (weight === 'names' || weight === 'mainName') continue;
      if (measurements[weight].includes(measure)) {
        qty *= convertibleIngredients[idx][weight];
        measure = 'grams';
        break;
      }
    }

    if (qty0 !== qty) {
      if (qty >= 10) qty = parseInt(qty);
      ingredient = [qty, measure, ingredientString].join(' ');
      return `
      <span class="foodScaleTooltip">
        <span class="foodScaleTooltipText">
          Converted from ${qty0} ${measure0} ${convertibleIngredients[idx].mainName}
        </span>
        ${ingredient}
      </span>
      `;
    }
  }
  return ingredient;
};

function prepIngredientString(string) {
  let words = string.trim().replace(' ', ' ').replace(' ', ' ').split(' '); //replace turns skinny space to regular space
  words = words.map((word) => {
    console.log('testing ', word);
    if (word.length === 1 && fractionChars[word.charCodeAt(0)]) {
      console.log('converting fraction symbol');
      return fractionChars[word.charCodeAt(0)];
    }
    if (
      word.includes('/') &&
      word.split.length === 2 &&
      word.split('/').every((num) => !isNaN(num))
    ) {
      console.log('evaluating fraction');
      return eval(word);
    }
    return word.toLowerCase();
  });
  console.log('final words: ', words);
  for (let i = 0; i < words.length - 1; i++) {
    if (!isNaN(words[i]) && !isNaN(words[i + 1])) {
      console.log('adding ', words[i], ' + ', words[i + 1]);
      words[i] = parseFloat(words[i]) + parseFloat(words[i + 1]);
      words.splice(i + 1, 1);
    }
  }
  console.log('final words: ', words);
  return [words[0], words[1], words.slice(2).join(' ')];
}
