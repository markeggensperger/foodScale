console.log('extension running');
//document.body.style.backgroundColor = 'red';
// Listen for messages

const { convertIngredient } = globalThis;
chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(message, sender, sendResponse) {
  console.log('request received : ', message.type);
  if (message.type === 'convert') {
    console.log('attempting convert');
    let ingredients = document.getElementsByTagName('li');
    [...ingredients].forEach(
      (ingredient) =>
        (ingredient.innerHTML = convertIngredient(ingredient.innerHTML))
    );
  }
}

//<span class="o-Ingredients__a-Ingredient--CheckboxLabel">2 large diced carrots</span>
