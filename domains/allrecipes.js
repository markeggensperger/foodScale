console.log('running on food allrecipes.com');
let ingredients = document.getElementsByClassName('ingredients-item-name');
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = globalThis.convertIngredient(ingredient.innerHTML))
);
