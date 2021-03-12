// console.log('bg script running');
// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked(tab) {
//   // The user clicked the button!
//   // 'tab' is an object with information about the current open tab
//   console.log(tab);
//   console.log('button clicked');
//   const message = 'user clicked!';
//   chrome.tabs.query({ active: true, currentWindow: true }, gotTabs);
//   function gotTabs(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, message);
//   }
// }
