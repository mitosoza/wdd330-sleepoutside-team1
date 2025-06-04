import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    // Set the product title
    console.log("PRODUCT DETAILS", this.product);
    if (this.product && this.product.Name) {
      document.title = `Sleep Outside | ${this.product.Name}`;
    }

    const section = document.querySelector('.product-detail');
    if (!section || !this.product) return;

    // Build product-detail section
    section.innerHTML = `
      <h3>${this.product.Brand?.Name || ""}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand || this.product.Name}</h2>
      <img
        class="divider"
        src="${this.product.Images?.PrimaryLarge}"
        alt="${this.product.NameWithoutBrand || this.product.Name}"
      />
      <p class="product-card__price">$${this.product.FinalPrice?.toFixed(2) || this.product.ListPrice?.toFixed(2) || ""}</p>
      <p class="product__color">${this.product.Colors?.[0]?.ColorName || ""}</p>
      <p class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>
    `;
  }
}