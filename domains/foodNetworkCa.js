console.log('running on foodnetwork.ca');
let recipes = document.getElementsByClassName('recipe-ingredients');
[...recipes].forEach((recipe) => {
  let ingredients = recipe.getElementsByTagName('p');
  [...ingredients].forEach(
    (ingredient) =>
      (ingredient.innerHTML = globalThis.convertIngredient(
        ingredient.innerHTML
      ))
  );
});
