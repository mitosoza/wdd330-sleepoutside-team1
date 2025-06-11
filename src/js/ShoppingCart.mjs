import {
  getLocalStorage,
  setLocalStorage,
  renderListWithTemplate,
} from "./utils.mjs";

function CartCardTemplate(item) {
  return `<li class="cart-card divider">
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
    <div class="cart-card__quantity-controls">
      <button class="quantity-btn decrease-quantity" data-id="${item.Id}">-</button>
      <p class="cart-card__quantity">${item.Quantity}</p>
      <button class="quantity-btn increase-quantity" data-id="${item.Id}">+</button>
    </div>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function renderEmptyCartMessage() {
  const emptyCartMessage = `
    <div class="cart-card__empty">
      <img src="../images/shopping-cart.jpeg" alt="shopping cart">
      <h2>Your cart is empty</h2>
      <p>
        Looks like you haven't added<br>
        anything to your cart yet.
      </p>
      <div class="cart-card__button">
        <a href="../index.html" class="goHome">
          <button>Go Home</button>
        </a>
      </div>
    </div>
  `;
  const cartFooter = document.querySelector(".cart-footer");
  cartFooter.innerHTML = "";
  const listElement = document.querySelector(".cart-list");
  listElement.innerHTML = emptyCartMessage;
}

export default class ShoppingCart {
  constructor(dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    if (this.dataSource.length === 0) {
      renderEmptyCartMessage();
    } else {
      this.renderList(this.dataSource);
      this.attachEventListeners();
    }
  }

  renderList() {
    if (this.dataSource.length === 0) {
      renderEmptyCartMessage();
      return;
    }

    renderListWithTemplate(
      CartCardTemplate,
      this.listElement,
      this.dataSource,
      "afterbegin",
      true,
    );
    this.calculateAndDisplayTotal();
  }

  calculateAndDisplayTotal() {
    const total = this.dataSource.reduce(
      (sum, item) => sum + Number(item.FinalPrice * item.Quantity),
      0,
    );

    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalElement = document.querySelector(".cart-total");

    if (this.dataSource.length > 0) {
      if (cartTotalElement) {
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
      }
      if (cartFooter) {
        cartFooter.hidden = false;
      }
    } else {
      if (cartFooter) {
        cartFooter.hidden = true;
      }
    }
  }

  attachEventListeners() {
    // Use event delegation on the listElement
    this.listElement.addEventListener("click", (event) => {
      const target = event.target;
      const itemId = target.dataset.id;

      if (!itemId) return;

      if (target.classList.contains("increase-quantity")) {
        this.updateQuantity(itemId, 1);
      } else if (target.classList.contains("decrease-quantity")) {
        this.updateQuantity(itemId, -1);
      } else if (target.classList.contains("cart-card__remove")) {
        this.removeItem(itemId);
      }
    });
  }

  updateQuantity(itemId, change) {
    let cartItems = getLocalStorage("so-cart") || [];
    const itemIndex = cartItems.findIndex((item) => item.Id === itemId);

    if (itemIndex > -1) {
      cartItems[itemIndex].Quantity += change;
      if (cartItems[itemIndex].Quantity <= 0) {
        this.removeItem(itemId);
      } else {
        setLocalStorage("so-cart", cartItems);
        this.dataSource = cartItems;
        this.renderList();
      }
    }
  }

  removeItem(itemId) {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems = cartItems.filter((item) => item.Id !== itemId);
    setLocalStorage("so-cart", cartItems);
    this.dataSource = cartItems;
    this.renderList();
  }
}
