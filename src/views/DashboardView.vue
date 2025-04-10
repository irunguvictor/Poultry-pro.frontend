<template>
  <v-container>
    <!-- Welcome Message -->
    <v-row>
      <v-col cols="12" class="text-center">
        <h1>Welcome, {{ userName }}!</h1>
        <p>Here you can do the following:</p>
        <p>
          <router-link to="/login" class="link">Log in</router-link>
          or
          <router-link to="/signup" class="link">create an account</router-link>
          to access past information.
        </p>
      </v-col>
    </v-row>

    <!-- Logout Button -->
    <v-row class="my-4" justify="center">
      <v-btn color="error" @click="handleLogout">
        Logout
      </v-btn>
    </v-row>

    <!-- Feature Cards Section -->
    <v-row>
      <v-col v-for="(feature, index) in features" :key="index" cols="12" sm="6" md="4">
        <router-link :to="feature.route" class="card-link">
          <v-card class="hoverable">
            <v-img :src="feature.image" height="200px"></v-img>
            <v-card-title>{{ feature.title }}</v-card-title>
            <v-card-text>{{ feature.description }}</v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-footer color="primary" dark class="mt-5">
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            <p>Contact Us: support@PoultryPro.com | Phone: +123 456 789</p>
            <p>&copy; 2025 Poultry Pro. All Rights Reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/Services/auth.service.js'
import api from '@/Services/api.js' // To call the backend logout route if needed

const router = useRouter()
const userName = ref('Guest')

// Load user from localStorage
onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  if (storedUser && storedUser.name) {
    userName.value = storedUser.name
  }
})

const handleLogout = async () => {
  try {
    await api.post('logout') // Call backend logout
  } catch (error) {
    console.error('Error logging out:', error)
  }

  authService.logout() // Clear token and user
  router.push({ name: 'Home' }) // Redirect to homepage or login
}

// Features List
const features = [
  { image: '/stock.jpeg', title: 'Current Stock', description: 'View your current stock of chickens and eggs.', route: '/stock-management' },
  { image: '/sales.jpeg', title: 'Track Sales & Expenses', description: 'Track sales and expenses efficiently.', route: '/sales-expenses' },
  { image: '/reports.jpeg', title: 'Reports & Analytics', description: 'Generate detailed reports and analytics.', route: '/reports-analytics' },
  { image: '/health.jpeg', title: 'Health Monitoring', description: 'Monitor the health of your chickens.', route: '/health-monitoring' },
  { image: '/eggs.jpeg', title: 'Egg Production Details', description: 'View detailed information about egg production.', route: '/egg-details' },
  { image: '/feeds.jpeg', title: 'Feed Management', description: 'Manage feed inventory and usage.', route: '/feeds' }
]
</script>


<style scoped>
.hoverable {
  transition: transform 0.2s ease-in-out;
}
.hoverable:hover {
  transform: scale(1.05);
}
.link {
  color: #1976D2;
  font-weight: bold;
  text-decoration: underline;
}
.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
