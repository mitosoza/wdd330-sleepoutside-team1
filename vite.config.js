import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product_listing/index.html"),
        newletter: resolve(__dirname, "src/newsletter/index.html"),
        privacyPolicy: resolve(__dirname, "src/newsletter/privacy-policy.html"),
        nesletterThankYou: resolve(__dirname, "src/newsletter/thankyou.html"),
        orderSuccess: resolve(__dirname, "src/checkout/success.html"),
      },
    },
  },
});
