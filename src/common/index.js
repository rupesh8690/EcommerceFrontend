import { Check } from "lucide-react";
import FrequentlyBought from "../components/FrequentlyBought";

const backendDomin = "http://localhost:8080"; //development phase only
// const backendDomin="https://ecommercebackend-xsiz.onrender.com"

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/signin`,
    method: "post",
  },
  forgotPassword: {
    url: `${backendDomin}/api/forgot-password`,
    method: "post",
  },
  resetPassword: {
    url: `${backendDomin}/api/reset-password`,
    method: "post",
  },

  current_user: {
    url: `${backendDomin}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomin}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomin}/api/delete-product`,
    method: "delete",
  },
  categoryProduct: {
    url: `${backendDomin}/api/get-categoryProduct`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/addtocart`,
    method: "post",
  },
  addToCartProductCount: {
    url: `${backendDomin}/api/countAddToCartProduct`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomin}/api/filter-product`,
    method: "post",
  },
  createCheckoutSession: {
    url: `${backendDomin}/api/create-checkout-session`,
    method: "post",
  },
  CheckoutSuccess: {
    url: `${backendDomin}/api/checkout-success`,
    method: "post",
  },
  deleteCartAfterPurchase: {
    url: `${backendDomin}/api/delete-cart-after-purchase`,
    method: "post",
  },
  updateProfile: {
    url: `${backendDomin}/api/update-user-profile`,
    method: "put",
  },
  purchaseHistory: {
    url: `${backendDomin}/api/user-purchase-history`,
    method: "get",
  },
  salesAnalytics: {
    url: `${backendDomin}/api/sales-analytics`,
    method: "get",
  },
  FrequentlyBoughtTogether: {
    url: `${backendDomin}/api/frequently-bought-together`, // no trailing slash needed
    method: "get",
  },
  allOrders: {
    url: `${backendDomin}/api/all-orders`,
    method: "get",
  },
  changeOrderStatus: {
    url: `${backendDomin}/api/change-order-status`,
    method: "post",
  },
  addReview:{
    url: `${backendDomin}/api/add-review`,
    method: "post",
  },
  getReview:{
    url: `${backendDomin}/api/get-review`,
    method: "get",
  },
};

export default SummaryApi;
