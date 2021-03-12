console.log('extension running');
//document.body.style.backgroundColor = 'red';
// Listen for messages
console.log(globalThis.fractionChars);

const convertibleIngredients = [
  { name: 'brown sugar', cups: 180, tbsp: 11.25, tsp: 3.75 },
  { name: 'sugar', cups: 200, tbsp: 12.5, tsp: 4.2 },
  { name: 'sifted flour', cups: 110, tbsp: 6.8, tsp: 2.3 },
  { name: 'flour', cups: 120, tbsp: 7.5, tsp: 2.5 },
];

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

chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(message, sender, sendResponse) {
  console.log('request received : ', message.type);
  if (message.type === 'color') {
    console.log('attempting recolor');
    document.body.style.backgroundColor = message.color;
  } else {
    console.log('attempting to scrape');
    let ingredients = document.getElementsByClassName(
      'o-Ingredients__a-Ingredient--CheckboxLabel'
    );
    [...ingredients].forEach(
      (ingredient) =>
        (ingredient.innerHTML = convertIngredient(ingredient.innerHTML))
    );
  }
}

//<span class="o-Ingredients__a-Ingredient--CheckboxLabel">2 large diced carrots</span>
