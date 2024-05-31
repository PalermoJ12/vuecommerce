<template>
  <div class="flex min-h-screen flex-1 flex-col justify-center px-4 py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">Sign in to your account</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-5 text-gray-700">Email address</label>
          <div class="mt-1">
            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-5 text-gray-700">Password</label>
          <div class="mt-1">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        </div>

        <div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:ring-2 shadow-sm transition duration-150 ease-in-out">
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Not a member?
        <router-link to="/register" class="font-semibold leading-6 text-slate-700 hover:text-indigo-500">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>
