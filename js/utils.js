// select dom elements
let selectElement = (selector, parent = document) => {
  return parent.querySelector(selector);
};

// Create DOM elements
let createElement = (elementName) => {
  return document.createElement(elementName);
};

// Debounce
let debounce = (callback, wait) => {
  let timeoutId = null;

  return (...args) => {
    window.clearTimeout(timeoutId);

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

// Responce
let request = async (path, options = { method: "GET" }) => {
  let res = await fetch(`${BASE_URL}${path}`, options);

  let data = await res.json();

  return data;
};
