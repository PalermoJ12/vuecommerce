<template>
    <section class="bg-white">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Create an account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="register" @submit="registerUser">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input type="text" name="name" id="name"
                                class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                v-model="name" @input="clearErrors('name')" placeholder="Full Name" required>
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" name="email" id="email"
                                class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                v-model="email" @input="clearErrors('email')" placeholder="name@gmail.com" required>
                            <small v-if="errors.email" class="text-danger" style="color: red;">{{ errors.email[0]
                                }}</small>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                v-model="password" @input="clearErrors('password')" required>
                            <small v-if="errors.password" class="text-danger" style="color: red;">{{ errors.password[0]
                                }}</small>
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm
                                password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                class="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                v-model="confirm" required>
                        </div>
                        <div class="flex items-start">
                        </div>
                        <button type="submit"
                            class="w-full text-white bg-slate-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create
                            an account</button>
                        <p class="text-sm font-light text-gray-500 text-center">
                            Already have an account? <router-link to="/"
                                class="font-medium text-primary-600 hover:underline">Login here</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>

</template>



<script>
import axiosClient from '../Axios/axios-js';
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm: '',
            errors: {}
        };
    },
    methods: {

        async registerUser() {
            try {

                const response = await axiosClient.post('/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.confirm
                });
                if (response.status === 201) {
                    console.log(response);
                    this.name = '';
                    this.email = '';
                    this.password = '';
                    this.confirm = '';
                    alert('Registration successful');
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 500);

                }


            } catch (error) {

                this.errors = error.response.data.errors;
                console.log(error.response.data.errors);
            }
        },

        clearErrors(field) {

            this.errors[field] = null;
        }
    }
};
</script>
