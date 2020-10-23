function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable('localStorage')) {
  console.log('local storage available');
} else {
  console.log('local storage not available');
}

// ****************************************************************

const button = document.querySelector('.btn');
button.addEventListener('click', handleClick);

function handleClick(e) {
  const form = document.querySelector('form');
  const name = form.id;
  const value = form[name].value;
  console.log('name: ' + name);
  populateStorage(name, value);
}

// ****************************************************************
const form = document.querySelector('form');
if (!localStorage.getItem(form.name)) {
  populateStorage();
} else {
  setStyles();
}

function setStyles() {
  const form = document.querySelector('form');

  var currentRadio = localStorage.getItem(form.name);

  form.value = currentRadio;
}

function populateStorage(name, value) {
  console.log('value: ' + value);
  localStorage.setItem(name, value);
  const test = localStorage.getItem('exampleRadios');
  console.log(test);

  setStyles();
}
