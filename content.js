console.log('extension running');
//document.body.style.backgroundColor = 'red';
// Listen for messages
chrome.runtime.onMessage.addListener(receiver);

// Callback for when a message is received
function receiver(color, sender, sendResponse) {
  console.log('request received');
  document.body.style.backgroundColor = color;
}
