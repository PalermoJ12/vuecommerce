<template>
    <!-- Main Content -->
    <div class="py-8">


        <div class="container mx-auto">
            <h2 class="text-3xl font-semibold text-gray-800 mb-8 "> Products</h2>
            <div class="bg-white rounded-lg shadow-md p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


                    <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md p-6">
                        <img src="https://i.ibb.co/HYx5FYq/2016-09-06-what-is-a-product.png"
                            alt="2016-09-06-what-is-a-product" class="w-full h-fit object-cover mb-4">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
                        <p class="text-gray-600 text-sm text-justify mb-4">{{ product.description }}</p>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-bold text-indigo-600">₱{{ product.price }}</span>
                            <!-- <button
                                class="bg-slate-700 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">Add
                                to Cart</button> -->

                            <div @click="showModalInfo(product)"
                                class="hover:cursor-pointer bg-slate-600 text-white hover:bg-slate-900 rounded-lg p-2">
                                 Info
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div v-if="showProductInfo"
        class="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 w-1/2 mx-auto shadow-lg">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900">Product Info</h2>
                <div class="w-6">
                    <CIcon icon="cilX" class="hover:cursor-pointer hover:text-red-500"
                        @click="showProductInfo = false" />
                </div>
            </div>
            <div class="flex flex-row gap-4">
                <div class="w-1/2">
                    <img src="https://i.ibb.co/HYx5FYq/2016-09-06-what-is-a-product.png"
                        alt="2016-09-06-what-is-a-product" class="w-full h-auto object-cover rounded mb-4">
                </div>
                <div class="w-1/2">
                    <h1 class="text-xl font-semibold text-gray-800 mb-2">{{ selectedProduct.name }}</h1>
                    <p class="text-gray-600 mb-2">{{ selectedProduct.description }}</p>
                    <p class="text-gray-800 font-bold text-lg mb-2"><span class="text-gray-600 mr-4 ">Price:</span>₱{{
                        selectedProduct.price }}</p>
                    <p class="text-gray-600 mb-2">Stock: {{ selectedProduct.quantity }}</p>
                    <p class="text-gray-600">Category: {{ selectedProduct.category }}</p>
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
            showProductInfo: false,
            selectedProduct: {}
        }
    },
    methods: {
        showModalInfo(product) {
            this.selectedProduct = product;
            this.showProductInfo = !this.showProductInfo;
        },


    },
    mounted() {
        this.$store.dispatch('getProduct');
    },
    computed: {
        products() {
            return this.$store.getters.allProducts;
        },
    },


}
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>
