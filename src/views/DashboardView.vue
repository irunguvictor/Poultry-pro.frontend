<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1>Welcome to Chicken Farm Manager</h1>
          <p>Here you can do the following:</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="(feature, index) in features"
          :key="index"
          cols="12" sm="6" md="4"
        >
        <router-link :to="feature.route" style="text-decoration: none; color: inherit;">
          <v-card class hoverable>
            <v-img :src="feature.image" height="200px"></v-img>
            <v-card-title>{{ feature.title }}</v-card-title>
            <v-card-text>{{ feature.description }}</v-card-text>
          </v-card>
        </router-link>
        </v-col>
      </v-row>

      <v-footer color="primary" dark class="mt-5">
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            <p>Contact Us: support@chickenfarm.com | Phone: +123 456 789</p>
            <p>&copy; 2025 Chicken Farm Manager. All Rights Reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    </v-container>
  </template>
  
  <script>
  export default {
    name: 'FeaturesView',
    data() {
      return {
        features: [
  {
    image: '/stock.jpeg',
    title: 'Current Stock',
    description: 'View your current stock of chickens and eggs.',
    route: '/stock-management'
  },
  {
    image: '/sales.jpeg',
    title: 'Track Sales & Expenses',
    description: 'Track sales and expenses efficiently.',
    route: '/sales-expenses'
  },
  {
    image: '/reports.jpeg',
    title: 'Reports & Analytics',
    description: 'Generate detailed reports and analytics.',
    route: '/reports-analytics'
  },
  {
    image: '/health.jpeg',
    title: 'Health Monitoring',
    description: 'Monitor the health of your chickens.',
    route: '/health-monitoring'
  },
  {
    image: '/eggs.jpeg',
    title: 'Egg Production Details',
    description: 'View detailed information about egg production.',
    route: '/egg-details'
  },
  {
    image: '/feeds.jpeg',
    title: 'Feed Management',
    description: 'Manage feed inventory and usage.',
    route: '/feeds'
    },
  
        ]
      }
    }
  }
  </script>
  