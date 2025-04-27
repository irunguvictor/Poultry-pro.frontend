import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import StockManagement from '@/views/Stockmanagement.vue';
import SalesExpenses from '@/views/SalesExpenses.vue';
import ReportsAnalytics from '@/views/ReportsAnalytics.vue';
import HealthMonitoring from '@/views/HealthMonitoring.vue';
import EggDetails from '@/views/EggDetailsView.vue';
import Login from '@/views/UserLogin.vue';
import Signup from '@/views/UserSignup.vue';
import Feedsmanagement from '@/views/Feedsmanagement.vue';
const routes = [
  { path: '/', name: 'Home', component: DashboardView },
  { path: '/stock-management', name: 'StockManagement', component: StockManagement },
  { path: '/sales-expenses', name: 'SalesExpenses', component: SalesExpenses },
  { path: '/reports-analytics', name: 'ReportsAnalytics', component: ReportsAnalytics },
  { path: '/health-monitoring', name: 'HealthMonitoring', component: HealthMonitoring },
  { path: '/egg-details', name: 'EggDetails', component: EggDetails },
  {path : '/feeds-management', name: 'FeedsManagement', component: Feedsmanagement}, // ✅ Added name
  { path: '/login', name: 'Login', component: Login },   // ✅ Added name
  { path: '/signup', name: 'Signup', component: Signup }, // ✅ Added name
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
