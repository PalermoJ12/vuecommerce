import { createStore } from "vuex";
import axiosClient from "@/Axios/axios-js";

const store = createStore({
  state() {
    return {
      products: [],
      users: [],
      userLogged: localStorage.getItem("token"),
      user_id: localStorage.getItem("user"),
      cart: [],
      totalPrice: 0,
    };
  },
  mutations: {
    setProduct(state, products) {
      state.products = products;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setCart(state, cartProduct) {
      const check = state.cart.some(cart => cartProduct.id == cart.id)
      if (check) {
        var obj = state.cart.findIndex(carts => carts.id == cartProduct.id);
        state.cart[obj].quantity++;
        state.cart[obj].price = state.cart[obj].price * state.cart[obj].quantity;
      } else {
        state.cart.push(cartProduct);
      }
    },
    removeCart(state, productToRemove) {
      state.cart.splice(productToRemove, 1);
    }

  },
  actions: {
    async getProduct({ commit }) {
      try {
        const res = await axiosClient.get("/products");
        console.log(res.data);
        commit("setProduct", res.data.products);
      } catch (err) {
        console.error(err);
      }
    },

    async getUsers({ commit }) {
      try {
        const res = await axiosClient.get("/users");
        console.log(res.data);
        commit("setUsers", res.data.users);
      } catch (err) {
        console.error(err);
      }
    },
  },
  getters: {
    allProducts: (state) => state.products,
    allUsers: (state) => state.users,
    allCart: (state) => state.cart,
    totalPrice: (state) => state.totalPrice = state.cart.reduce((total, curVal) => {
      return total + curVal.price;
    }, 0)
  },
});

export default store;
