
import { createRouter, createWebHistory } from 'vue-router';
import ManageProduct from '@/Pages/ManageProduct.vue';
import ManageUser from '@/Pages/ManageUser.vue';
import HomeView from '@/Pages/HomeView.vue';
import LoginPage from '@/Pages/LoginPage.vue';
import RegisterPage from '@/Pages/RegisterPage.vue';

const routes = [
  { path: '/', component: HomeView, name: 'HomeView' },
  { path: '/manageproduct', component: ManageProduct, name: 'ManageProduct' },
  { path: '/manageuser', component: ManageUser, name: 'ManageUser' },
  { path: '/signin', component: LoginPage, name: 'LoginPage' },
  { path: '/register', component: RegisterPage, name: 'RegisterPage' },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
