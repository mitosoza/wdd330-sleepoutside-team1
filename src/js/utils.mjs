// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// retrieve query parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
// render a list of items using a template
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// render templates
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// load a template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
// render header and footer templates
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  // Once the header is injected, wire up the nav-search form
  const searchForm = document.getElementById("nav-search");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = e.target.q.value.trim();
      if (!query) return;
      window.location.href = `/product_listing/index.html?search=${encodeURIComponent(query)}`;
    });
  }

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}
