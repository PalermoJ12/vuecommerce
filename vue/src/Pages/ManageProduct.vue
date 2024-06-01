<template>

    <div class="py-8">


        <div class="container mx-auto">
            <div class="flex flex-row justify-between">
                <h2 class="text-3xl font-semibold text-gray-800 mb-8 "> Manage Product</h2>


            </div>
            <div class="bg-white rounded-lg shadow-lg p-6">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="col-span-3 flex justify-end m-2"> <button
                            class="bg-slate-600 text-sm text-white px-4 py-2 rounded-2xl mb-2 hover:bg-slate-900 hover:text-white"
                            @click="showAddProductModal">Add
                            Product</button>

                    </div>
                    <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex flex-col justify-between">
                            <div>
                                <img src="https://i.ibb.co/HYx5FYq/2016-09-06-what-is-a-product.png"
                                    alt="2016-09-06-what-is-a-product" class="w-full h-fit object-cover mb-4">
                                <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ product.name }}</h3>
                                <p class="text-gray-600 text-sm text-justify mb-4">{{ product.description }}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-xl font-bold text-indigo-600">₱{{ product.price }}</span>
                                <div class="flex flex-row gap-4 w-1/4  ">
                                    <CIcon icon="cilColorBorder" class="hover:cursor-pointer hover:text-indigo-500 "
                                        @click="setSelectedProduct(product)" />
                                    <CIcon icon="cilXCircle" class="hover:cursor-pointer hover:text-red-500"
                                        @click="setDeleteId(product.id)" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div v-if="showEdit" class="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 w-3/4 mx-auto">
            <h2 class="text-xl mb-4">Edit Product</h2>
            <form @submit.prevent="updateProduct" class="w-full">
                <div class="grid grid-cols-1 gap-4 ">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">Product name</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" placeholder="Product name" v-model="selectedProduct.name" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="description">Description</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description" type="textarea" placeholder="Description"
                                v-model="selectedProduct.description" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="price">Price</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price" type="number" placeholder="Price" v-model="selectedProduct.price" />
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">Quantity</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="number" v-model="selectedProduct.quantity" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="description">Category</label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description" type="text" v-model="selectedProduct.category" />
                        </div>

                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button @click="showEdit = false"
                        class="bg-gray-300 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit"
                        class="bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    </div>


    <div v-if="showAddProduct"
        class="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 w-3/4 mx-auto">
            <h2 class="text-xl mb-4">Add a Product</h2>
            <form @submit.prevent="addProduct" class="w-full">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">Product name</label>
                            <input v-model="newProduct.name" name="name" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name" type="text" placeholder="Product name" />
                            <span v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="description">Description</label>
                            <input v-model="newProduct.description" name="description" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="description" type="textarea" placeholder="Description" />
                            <span v-if="errors.description" class="text-red-500">{{ errors.description[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="price">Price</label>
                            <input v-model="newProduct.price" name="price" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price" type="number" placeholder="Price" />
                            <span v-if="errors.price" class="text-red-500">{{ errors.price[0] }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="quantity">Quantity</label>
                            <input v-model="newProduct.quantity" name="quantity" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="quantity" type="number" />
                            <span v-if="errors.quantity" class="text-red-500">{{ errors.quantity[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="category">Category</label>
                            <input v-model="newProduct.category" name="category" required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="category" type="text" placeholder="e.g Food" />
                            <span v-if="errors.category" class="text-red-500">{{ errors.category[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button @click="showAddProduct = false"
                        class="bg-gray-300 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit"
                        class="bg-slate-600 text-white hover:bg-slate-900 hover:text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    </div>




    <div v-if="showDelete" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 max-w-sm mx-auto">
            <h2 class="text-xl mb-4">Confirm Delete</h2>
            <p class="mb-6">Are you sure you want to delete this?</p>
            <div class="flex justify-end gap-4">
                <button @click="handleDelete" class="bg-slate-700 text-white px-4 py-2 rounded-md">Confirm</button>
                <button @click="showDeleteModal" class="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
            </div>
        </div>
    </div>

</template>

<script>
import axiosClient from '@/Axios/axios-js';
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
    mounted() {
        this.$store.dispatch('getProduct');
    },

    methods: {
        showEditModal() {

            this.showEdit = !this.showEdit;
        },
        showAddProductModal() {

            this.showAddProduct = !this.showAddProduct;
        },
        showDeleteModal() {

            this.showDelete = !this.showDelete;
        },

        setSelectedProduct(product) {
            this.selectedProduct.id = product.id;
            this.selectedProduct.name = product.name;
            this.selectedProduct.description = product.description;
            this.selectedProduct.price = product.price;
            this.selectedProduct.category = product.category;
            this.selectedProduct.quantity = product.quantity;

            this.showEditModal();
        },
        setDeleteId(id) {
            this.deleteId = id;
            this.showDeleteModal();
        },
        async handleDelete() {
            await axiosClient.delete(`/products/${this.deleteId}`).then((res) => {
                console.log(res);
                this.$store.dispatch('getProduct');
                alert('Successfully delete product.');
                this.showDeleteModal();
            }).catch((error) => {
                console.log(error);
            })
        },

        async updateProduct() {



            await axiosClient.put(`/products/${this.selectedProduct.id}`, this.selectedProduct).then((res) => {
                console.log(res);
                this.$store.dispatch('getProduct');
                alert('Successfully updated product.');
                this.showEdit = false;
            }).catch((error) => {
                console.log(error);
            })



        },
        async addProduct() {
            try {
                const response = await axiosClient.post('/products', this.newProduct);

                this.newProduct = {
                    name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category: '',
                };
                this.errors = {};
                alert('Successfully added product.');
                this.showAddProduct = false;
                this.$store.dispatch('getProduct');
                console.log(response.data);
            } catch (error) {

                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {

                    console.error(error);
                }
            }
        }




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