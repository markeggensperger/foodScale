console.log('running on food allrecipes.com');
let ingredients = document.getElementsByClassName('IngredientLine');
const { convertibleIngredients, fractionChars, measurements } = globalThis;

console.log(globalThis.convertibleIngredients);
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = convertIngredient(ingredient))
);


function convertIngredient(ingredient) {
  let idx = convertibleIngredients.findIndex((stdIngredient) =>
    stdIngredient.names.some((name) => ingredient.innerText.includes(name))
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

function prepIngredientString(ingredient) {
  let qty = ingredient.getElementsByClassName('amount')
  let unit = ingredient.getElementsByClassName('unit')
  if (qty.length && unit.length) {
    if (qty.firstChild.children.length === 4) {
        qty = qty.child(eval(qty.child)
    }
  }
}
