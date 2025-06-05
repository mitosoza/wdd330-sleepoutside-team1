import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";


const dataSource = new ExternalServices("tents");
const productListElement = document.querySelector(".product-list");
const productList = new ProductList("tents", dataSource, productListElement);

// Render all tent products
productList.init();

// Load header and footer templates
loadHeaderFooter()