import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartListeElement = document.querySelector(".product-list");
  const cartList = new ShoppingCart(cartItems, cartListeElement);

  cartList.init();

  const total = cartItems.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  if (cartItems.length > 0) {
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartFooter.hidden = false;
  } else {
    cartFooter.hidden = true;
  }
}

loadHeaderFooter();
renderCartContents();
