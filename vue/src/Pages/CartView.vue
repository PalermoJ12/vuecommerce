<template>
    <div class="py-8">


        <div class="container mx-auto">
            <h2 class="text-3xl font-semibold text-gray-800 mb-8 "> Carts</h2>
            <div class="    bg-white    rounded-lg shadow-md p-6 ">
                <div class="col-span-3 flex justify-end m-2 "> <button class=" bg-slate-600 text-sm text-white px-4 py-2 rounded-2xl mb-2 hover:bg-slate-900
                        hover:text-white" @click="handleCheckout">Checkout</button>

                </div>
                <div class="grid grid-cols-1 gap-8  shadow-xl min-h-[600px]">


                    <div class="w-full">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product Name</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">

                                <tr v-for="(carts, index) in  cart" :key="index">
                                    <td class="px-6 py-4 whitespace-nowrap">{{ carts.name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ carts.quantity }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ carts.price }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">{{ carts.category }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex space-x-2">

                                            <button @click="removeCart(index)"
                                                class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                                Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="text-xl text-bold flex w-full justify-end m-4 p-4">Total Price: ₱ {{ totalPrice }}</div>
            </div>
        </div>
    </div>

</template>


<script>

export default {
    name: 'ManageProduct',
    data() {
        return {
            showEdit: false,
            showAddProduct: false,
            showDelete: false,
            deleteId: 0,
            selectedProduct: { id: 0, name: '', description: '', price: '', quantity: 0, category: '' },
            newProduct: { name: '', description: '', price: '', quantity: 0, category: '', image: 'news' },
            errors: {}
        }
    },
    methods: {
        removeCart(index) {
            this.$store.commit('removeCart', index);
        },
        handleCheckout() {
            alert("Successfully checkout.")
            this.$store.state.cart = [];
            this.$store.state.totalPrice = 0;
        }
    },
    computed: {
        cart() {
            return this.$store.getters.allCart;
        },
        totalPrice() {
            return this.$store.getters.totalPrice;
        }

    },

}


</script>