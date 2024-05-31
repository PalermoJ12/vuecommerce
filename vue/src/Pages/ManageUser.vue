<template>

    <div class="py-8">


        <div class="container mx-auto">
            <div class="flex flex-row justify-between">
                <h2 class="text-3xl font-semibold text-gray-800 mb-8 "> Manage User</h2>

            </div>
            <div class="bg-white rounded-lg shadow-lg p-6  justify-center flex flex-col">
                <div class="w-full p-2 flex justify-end"><button
                        class="bg-green-700 text-white hover:bg-green-900 px-4 py-2 rounded-md text-xl"
                        @click="showAddModal">+</button></div>
                <div class="w-full">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role</th>
                                <th scope="col"
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">

                            <tr v-for="user in users" :key="user.id">
                                <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ user.email }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{{ user.role === 1 ? 'Admin' : 'User' }}</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex space-x-2">
                                        <button @click="showEditModal(user)"
                                            class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Edit
                                        </button>
                                        <button @click="showDeleteModal(user.id)"
                                            class="bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>


    <div v-if="showAddUser" class="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 w-3/4 mx-auto">
            <h2 class="text-xl mb-4">Add New User</h2>
            <form @submit.prevent="addNewUser" class="w-full">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">Fullname</label>
                            <input v-model="newUser.name" name="name" type="text" placeholder="Fullname"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
                            <input v-model="newUser.email" name="email" type="email" placeholder="Email"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
                            <input v-model="newUser.password" name="password" type="password" placeholder="Password"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.password" class="text-red-500">{{ errors.password[0] }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="password_confirmation">Password
                                Confirm</label>
                            <input v-model="newUser.password_confirmation" name="password_confirmation" type="password"
                                placeholder="Password Confirmation"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.password_confirmation" class="text-red-500">{{
                                errors.password_confirmation[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="role">Role</label>
                            <select v-model="newUser.role" name="role"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                            <span v-if="errors.role" class="text-red-500">{{ errors.role[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button @click="showAddUser = false"
                        class="bg-gray-300 hover:bg-gray-500 hover:text-white  px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit"
                        class="bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="showEditUser" class="fixed inset-0 flex items-center justify-center w-full bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 w-3/4 mx-auto">
            <h2 class="text-xl mb-4">Edit User</h2>
            <form @submit.prevent="editUser" class="w-full">
                <div class="grid grid-cols-1 gap-4">
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="name">Fullname</label>
                            <input v-model="selectedUser.name" name="name" type="text" placeholder="Fullname"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.name" class="text-red-500">{{ errors.name[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="email">Email</label>
                            <input v-model="selectedUser.email" name="email" type="email" placeholder="Email"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.email" class="text-red-500">{{ errors.email[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="password">Password</label>
                            <input v-model="selectedUser.password" name="password" type="password"
                                placeholder="Password"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.password" class="text-red-500">{{ errors.password[0] }}</span>
                        </div>
                    </div>
                    <div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="password_confirmation">Password
                                Confirm</label>
                            <input v-model="selectedUser.password_confirmation" name="password_confirmation"
                                type="password" placeholder="Password Confirmation"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <span v-if="errors.password_confirmation" class="text-red-500">{{
                                errors.password_confirmation[0] }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 font-bold mb-2" for="role">Role</label>
                            <select v-model="selectedUser.role" name="role"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                            <span v-if="errors.role" class="text-red-500">{{ errors.role[0] }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <button @click="showEditUser = false"
                        class="bg-gray-300 hover:bg-gray-500 hover:text-white px-4 py-2 rounded-md">Cancel</button>
                    <button type="submit"
                        class="bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-md">Save</button>
                </div>
            </form>
        </div>
    </div>

    <div v-if="showDelete" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg p-8 max-w-sm mx-auto">
            <h2 class="text-xl mb-4">Confirm Delete</h2>
            <p class="mb-6">Are you sure you want to delete this user?</p>
            <div class="flex justify-end gap-4">
                <button @click="handleDelete" class="bg-slate-700 text-white px-4 py-2 rounded-md">Confirm</button>
                <button @click="showDelete = false" class="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
            </div>
        </div>
    </div>

</template>

<script>
import axiosClient from '../Axios/axios-js';
export default {
    name: 'ManageUser',
    data() {
        return {
            showAddUser: false,
            showEditUser: false,
            showDelete: false,
            deleteId: 0,
            selectedUser: {
                id: 0,
                name: '',
                email: '',
                role: 1,
                password: '',
                confirmPassword: '',
            },
            newUser: {
                name: '',
                email: '',
                role: 1,
                password: '',
                confirmPassword: '',
            },
            userId: localStorage.getItem("user"),

            errors: {}
        }
    },
    mounted() {
        this.$store.dispatch('getUsers');
    },
    computed: {
        users() {
            return this.$store.getters.allUsers;
        },
    },

    methods: {

        showAddModal() {
            this.showAddUser = true;
        },

        showDeleteModal(id) {
            this.deleteId = id;
            this.showDelete = !this.showDelete;

        },

        showEditModal(user) {

            this.selectedUser.id = user.id;
            this.selectedUser.name = user.name;
            this.selectedUser.email = user.email;
            this.selectedUser.role = user.role;

            this.showEditUser = !this.showEditUser;
        },

        async addNewUser() {

            try {

                const response = await axiosClient.post('/users', this.newUser);

                this.selectedUser = {
                    name: '',
                    email: '',
                    role: 1,
                    password: '',
                    confirmPassword: '',
                };

                this.showAddUser = false;

                this.$store.dispatch('getUsers');
                alert('Successfully created account.');
                console.log(response.data);

            } catch (error) {

                if (error.response.status === 422) {

                    this.errors = error.response.data.errors;

                } else {

                    console.error(error);

                }

            }
        },

        async editUser() {
            console.log(this.selectedUser);
            try {
                const response = await axiosClient.put(`/users/${this.selectedUser.id}`, this.selectedUser);
                this.$store.dispatch('getUsers');
                this.showEditUser = false;
                alert('Successfully edited account.');
                console.log(response.data);
            } catch (error) {
                console.log(error)
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;

                } else {
                    console.error(error);
                }

            }
        },

        async handleDelete() {
            if (this.userId == this.deleteId) {
                alert("You can't current delete user.");
                this.showDelete = false;
            } else {
                await axiosClient.delete(`/users/${this.deleteId}`).then(() => {


                    this.$store.dispatch('getUsers');
                    alert('Successfully deleted account.');
                    this.showDelete = false;

                }).catch((error) => {

                    console.log(error);

                });

            }

        },



    }
}
</script>

<style scoped>
.container {
    max-width: 1200px;

    margin: 0 auto;
}
</style>