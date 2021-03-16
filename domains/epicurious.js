console.log('running on food epicurious.com');
let ingredients = document.querySelectorAll('li.ingredient');
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = globalThis.convertIngredient(ingredient.innerHTML))
);
