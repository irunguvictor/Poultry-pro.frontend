import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import StockManagement from '@/views/Stockmanagement.vue';
import SalesExpenses from '@/views/SalesExpenses.vue';
import ReportsAnalytics from '@/views/ReportsAnalytics.vue';
import HealthMonitoring from '@/views/HealthMonitoring.vue';
import EggDetails from '@/views/EggDetailsView.vue';
import FeedManagement from '@/views/FeedManagement.vue'; 
import Login from '@/views/UserLogin.vue';
import Signup from '@/views/UserSignup.vue';

const routes = [
  { path: '/', component: DashboardView },
  { path: '/stock-management', component: StockManagement },
  { path: '/sales-expenses', component: SalesExpenses },
  { path: '/reports-analytics', component: ReportsAnalytics },
  { path: '/health-monitoring', component: HealthMonitoring },
  { path: '/egg-details', component: EggDetails },
  { path: '/feeds', component: FeedManagement },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }, // changed to lowercase
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
