import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartListeElement = document.querySelector(".cart-list");
  const cartList = new ShoppingCart(cartItems, cartListeElement);

  cartList.init();
}

loadHeaderFooter();
renderCartContents();
