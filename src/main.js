import { Golay } from './golay';

// Initialize Golay encoder/decoder
let golay = new Golay();

// Encode message
function encodeMessage() {
  let messageInput = document.getElementById('message').value.trim();
  let message = messageInput.split(' ').map(Number);

  if (message.length !== 12 || message.some(bit => bit !== 0 && bit !== 1)) {
    alert('Invalid message. Please enter 12 bits (0 or 1) separated by spaces.');
    return;
  }

  let encoded = golay.encode(message);
  document.getElementById('encoded').value = `${encoded}`;
}

// Add errors
function addErrors() {
  let errorsInput = document.getElementById('errors').value.trim();
  let errorPositions = errorsInput.split(' ').map(Number);

  if (errorPositions.some(pos => pos < 0 || pos >= 24)) {
    alert('Invalid error positions. Please enter positions between 0 and 23 separated by spaces.');
    return;
  }

  let received = golay.addErrors(errorPositions);
  document.getElementById('received').value = `${received}`;

  let buttonText = document.getElementById('addErrorsBtn').innerText;
  if (buttonText === "Add Errors") {
    document.getElementById('addErrorsBtn').innerText = "Del Errors";
  } else {
    document.getElementById('addErrorsBtn').innerText = "Add Errors";
  }
  resetFormElements('decoded');
}

// Decode message
function decodeMessage() {
  let result = golay.decode();
  if (result.error) {
    document.getElementById('decoded').innerText = result.error;
  } else {
    document.getElementById('decoded').innerText = `Error pattern: ${result.errorPattern}\nDecoded codeword: ${result.decodedMessage}`;
  }
}

// Generate random message
function generateRandomMessage() {
  let message = Array.from({ length: 12 }, () => Math.round(Math.random()));
  document.getElementById('message').value = message.join(' ');
  resetFormElements('encoded', 'decoded');
}

// Generate random errors
function generateRandomErrors() {
  let numErrors = Math.floor(Math.random() * 5);
  let errorPositions = [];
  while (errorPositions.length < numErrors) {
    let pos = Math.floor(Math.random() * 24);
    if (!errorPositions.includes(pos)) {
      errorPositions.push(pos);
    }
  }
  document.getElementById('errors').value = errorPositions.join(' ');
  resetFormElements('received', 'decoded', 'addErrorsBtn');
}

// Clear message input
function clearMessage() {
  resetFormElements('message', 'decoded', 'encoded');
}

// Clear errors input
function clearErrors() {
  resetFormElements('errors', 'received', 'decoded', 'addErrorsBtn');
}

// Reset Forms
function resetFormElements(...elementIds) {
  elementIds.forEach(id => {
    let element = document.getElementById(id);
    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
      element.value = '';
    } else if (element.nodeName === 'BUTTON') {
      element.innerText = 'Add Errors';
    } else if (element.nodeName === 'DIV') {
      element.innerText = '';
    }
  });
}

// Event listeners
document.getElementById('encodeBtn').addEventListener('click', encodeMessage);
document.getElementById('addErrorsBtn').addEventListener('click', addErrors);
document.getElementById('decodeBtn').addEventListener('click', decodeMessage);
document.getElementById('generateMessageBtn').addEventListener('click', generateRandomMessage);
document.getElementById('generateErrorsBtn').addEventListener('click', generateRandomErrors);
document.getElementById('clearMessageBtn').addEventListener('click', clearMessage);
document.getElementById('clearErrorsBtn').addEventListener('click', clearErrors);
