<template>
  <div class="flex">
    <!-- Sidebar Navigation -->
    <div class="bg-slate-700 p-4 text-white w-[250px] min-h-screen fixed">
      <div class="flex flex-col">
        <div class="p-2 text-2xl">ECOMMERCE</div>
        <div class="flex flex-col gap-4 mt-6 mx-4">
          <div @click="$router.push('/signin')" class="hover:bg-slate-100 rounded-md p-2 hover:text-black cursor-pointer">Sign In</div>
          <div @click="$router.push('/')" class="hover:bg-slate-100 rounded-md p-2 hover:text-black cursor-pointer">Home</div>
          <div @click="$router.push('/manageproduct')" class="hover:bg-slate-100 rounded-md p-2 hover:text-black cursor-pointer">Manage Product</div>
          <div @click="$router.push('/manageuser')" class="hover:bg-slate-100 rounded-md p-2 hover:text-black cursor-pointer">Manage User</div>
          <div @click="showLogoutModal = true" class="hover:bg-slate-100 rounded-md p-2 hover:text-black cursor-pointer">Logout</div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="ml-[250px] p-4 flex-1">
      <router-view :products="products" @add-product="addProduct" />
    </div>

    <!-- Logout Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg p-8 max-w-sm mx-auto">
        <h2 class="text-xl mb-4">Confirm Logout</h2>
        <p class="mb-6">Are you sure you want to log out?</p>
        <div class="flex justify-end gap-4">
          <button @click="logout" class="bg-slate-700 text-white px-4 py-2 rounded-md">Logout</button>
          <button @click="showLogoutModal = false" class="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showLogoutModal: false,
      products: []
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
      this.showLogoutModal = false;
      this.$router.push('/signin');
    },
    addProduct(product) {
      this.products.push(product);
      console.log("Product added:", product);
    }
  }
};
</script>
