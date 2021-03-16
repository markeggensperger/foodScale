console.log('running on food network.com');
let ingredients = document.getElementsByClassName(
  'o-Ingredients__a-Ingredient--CheckboxLabel'
);
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = globalThis.convertIngredient(ingredient.innerHTML))
);
