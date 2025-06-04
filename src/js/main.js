import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


const dataSource = new ProductData("tents");
const productListElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, productListElement);

// Render all tent products
productList.init();

// Load header and footer templates
loadHeaderFooter()