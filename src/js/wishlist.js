import { loadHeaderFooter, getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

// 1) Bootstrap header/footer
loadHeaderFooter();

// 2) Grab stored wishlist (browser-local for now)
let wishlist = getLocalStorage("so-wishlist") || [];

// 3) Template for each wishlist item
function wishCard(item) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${item.Id}">
        <img src="${item.Images?.PrimaryMedium}" alt="${item.Name}" />
        <h3 class="card__brand">${item.Brand?.Name || ""}</h3>
        <h2 class="card__name">${item.Name}</h2>
        <p class="product-card__price">$${item.FinalPrice}</p>
      </a>
      <div class="wishlist-actions">
        <button class="move-to-cart" data-id="${item.Id}">🛒 Move to Cart</button>
        <button class="remove-from-wishlist" data-id="${item.Id}">✖ Remove</button>
      </div>
    </li>
  `;
}

// 4) Render the list
const listEl = document.querySelector(".wishlist-list");
renderListWithTemplate(wishCard, listEl, wishlist, "afterbegin", true);

// 5) Wire up buttons via event delegation
listEl.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  // Move to cart
  if (e.target.classList.contains("move-to-cart")) {
    const cart = getLocalStorage("so-cart") || [];
    const itemToMove = wishlist.find(i => i.Id === id);
    if (itemToMove) {
      // add to cart
      cart.push({ ...itemToMove, Quantity: 1 });
      setLocalStorage("so-cart", cart);
      // remove from wishlist
      wishlist = wishlist.filter(i => i.Id !== id);
      setLocalStorage("so-wishlist", wishlist);
      // re-render
      renderListWithTemplate(wishCard, listEl, wishlist, "afterbegin", true);
    }
  }
  // Remove from wishlist
  if (e.target.classList.contains("remove-from-wishlist")) {
    wishlist = wishlist.filter(i => i.Id !== id);
    setLocalStorage("so-wishlist", wishlist);
    renderListWithTemplate(wishCard, listEl, wishlist, "afterbegin", true);
  }
});
