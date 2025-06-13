import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

loadHeaderFooter();

document.getElementById("addToCart")
  .addEventListener("click", this.addProductToCart.bind(this));

// NEW: wishlist button
const wishBtn = document.getElementById("addToWishlist");
wishBtn?.addEventListener("click", () => {
  let wishlist = getLocalStorage("so-wishlist") || [];
  // avoid duplicates
  if (!wishlist.find(item => item.Id === this.product.Id)) {
    wishlist.push({ ...this.product, Quantity: 1 });
    setLocalStorage("so-wishlist", wishlist);
    wishBtn.textContent = "✔︎ In Wishlist";
  }
});
