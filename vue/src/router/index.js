// routes.js
import { createRouter, createWebHistory } from "vue-router";
import ManageProduct from "@/Pages/ManageProduct.vue";
import ManageUser from "@/Pages/ManageUser.vue";
import HomeView from "../Pages/HomeView.vue";
import LoginPage from "../Pages/LoginPage.vue";
import RegisterPage from "@/Pages/RegisterPage.vue";
import CartView from "@/Pages/CartView.vue";
const routes = [
  {
    path: "/user/home",
    component: HomeView,
    name: "HomeView",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") && localStorage.getItem("role") == 0) {
        next();
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == 1
      ) {
        next("/admin/manageproduct");
      } else {
        next("/");
      }
    },
  },
  {
    path: "/user/cart",
    component: CartView,
    name: "CartView",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") && localStorage.getItem("role") == 0) {
        next();
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == 1
      ) {
        next("/admin/manageproduct");
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/manageproduct",
    component: ManageProduct,
    name: "ManageProduct",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") && localStorage.getItem("role") == 1) {
        next();
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == 0
      ) {
        next("/user/home");
      } else {
        next("/");
      }
    },
  },
  {
    path: "/admin/manageuser",
    component: ManageUser,
    name: "ManageUser",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token") && localStorage.getItem("role") == 1) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/",
    component: LoginPage,
    name: "LoginPage",
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
        next();
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == 0
      ) {
        next("/user/home");
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("role") == 1
      ) {
        next("/admin/manageproduct");
      } else {
        next("/");
      }
    },
  },
  { path: "/register", component: RegisterPage, name: "RegisterPage" },
  {
    path: "/logout",
    name: "logout",

    beforeEnter: (to, from, next) => {
      console.log("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
