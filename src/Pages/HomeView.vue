<template>
    <div class="bg-gray-100 min-h-screen ml-[250px]">
      <!-- Hero Section -->
      <div class="bg-gradient-to-r from-black to-slate-700 py-16 px-8 text-center text-white">
        <h1 class="text-2xl md:text-4xl font-bold mb-4">"Unlock Your Ultimate Shopping Experience: Where Innovation Meets Satisfaction!"</h1>
        <p class="text-lg md:text-xl mb-8">Your one-stop shop for all your needs!</p>
        <router-link to="/signin" class="inline-block bg-white text-indigo-600 py-2 px-8 rounded-full shadow-lg hover:bg-indigo-700 hover:text-white transition duration-300 font-medium">
          Shop Now
        </router-link>
      </div>
      
      <button @click="redirectToManageProduct" class="bg-[#2d3748] text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">Add to Cart</button>

  
      <!-- Featured Products Section -->
      <div class="container mx-auto py-16">
        <h2 class="text-3xl font-semibold text-gray-800 mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="(product, index) in products" :key="index" class="bg-white rounded-lg shadow-md p-6">
            <img :src="product.image" alt="Product Image" class="w-full h-40 object-cover mb-4">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
            <p class="text-gray-600 mb-4">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-xl font-bold text-indigo-600">{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomeView',
    data() {
      return {
        products: [
          { name: 'Product 1', description: 'Product 1 Description', price: '$19.99', image: 'https://via.placeholder.com/300' },
          { name: 'Product 2', description: 'Product 2 Description', price: '$29.99', image: 'https://via.placeholder.com/300' },
          { name: 'Product 3', description: 'Product 3 Description', price: '$39.99', image: 'https://via.placeholder.com/300' },
          { name: 'Product 4', description: 'Product 4 Description', price: '$49.99', image: 'https://via.placeholder.com/300' },
        ]
      };
    },
    methods: {
      redirectToManageProduct() {
        this.$router.push('/manageproduct');
      }
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  