console.log('running on food tasty.com');
let ingredients = document.querySelectorAll('li.ingredient');
console.log(ingredients);
[...ingredients].forEach(
  (ingredient) =>
    (ingredient.innerHTML = globalThis.convertIngredient(ingredient.innerText))
);
