import { renderOrderSummary } from "./checkout/order-summary.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
import { loadProducts } from "../data/products.js";
//import '../data/cart-class.js';

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});

