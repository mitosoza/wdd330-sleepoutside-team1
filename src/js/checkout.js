import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
  .querySelector("#zip")
  .addEventListener("blur", checkout.calculateOrderTotal.bind(checkout));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms["checkout"];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  console.log("Form Status: ", chk_status);

  if(chk_status)
    checkout.checkout();
});

loadHeaderFooter();