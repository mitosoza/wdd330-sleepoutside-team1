import { renderListWithTemplate } from "./utils.mjs";

function CartCardTemplate(item) {
  return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images?.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    this.renderList(this.dataSource);
  }

  renderList(list) {
    renderListWithTemplate(CartCardTemplate, this.listElement, list);
  }
}
