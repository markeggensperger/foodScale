// chrome.storage.sync.get('color', ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });
// console.log('popup script runnning');
// let buttons = document.getElementsByTagName('button');
// console.log(buttons);
// [...buttons].forEach((button) => {
//   button.addEventListener('click', () => changeColor(button.id));
//   console.log('added event listen for ', button.id);
// });

// function changeColor(color) {
//   console.log(color, '  clicked');
//   chrome.tabs.query({ active: true, currentWindow: true }, gotTabs);
//   function gotTabs(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { type: 'color', color });
//   }

let convert = document.getElementById('convert');
convert.addEventListener('click', convertItems);

function convertItems() {
  console.log('in convert');
  chrome.tabs.query({ active: true, currentWindow: true }, gotTabs);
  function gotTabs(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'convert' });
  }
}
convert;
