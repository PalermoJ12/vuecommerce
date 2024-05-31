<template>
  <div class="container mx-auto py-16 flex justify-center">
    <div class="w-full max-w-lg bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4 text-center">Manage Products</h2>
      <form @submit.prevent="handleAddProduct" class="mb-8">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
          <input v-model="newProduct.name" id="name" type="text" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="newProduct.description" id="description" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input v-model="newProduct.price" id="price" type="number" step="0.01" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" class="w-full px-4 py-2 bg-[#2d3748] text-white rounded-md hover:bg-indigo-700">Add Product</button>
      </form>
    </div>
  </div>
  <div>
        <h3 class="text-xl font-bold mb-2 text-center">Product List</h3>
        <ul class="space-y-4">
          <li v-for="(product, index) in products" :key="index" class="border-b border-gray-200 py-2">
            <strong>{{ product.name }}</strong>: {{ product.description }} - ${{ product.price.toFixed(2) }}
          </li>
        </ul>
      </div>
</template>

<script>
export default {
  name: 'ManageProduct',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: 0,
      },
    };
  },
  methods: {
    handleAddProduct() {
      this.$emit('add-product', { ...this.newProduct });
      this.newProduct.name = '';
      this.newProduct.description = '';
      this.newProduct.price = 0;
    },
  },
};
</script>

<style scoped>

</style>
