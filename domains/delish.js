console.log('running on food network.com');
let ingredients = document.getElementsByClassName('ingredient-item');
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = globalThis.convertIngredient(ingredient.innerText))
);
