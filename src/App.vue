<template>
<v-app>
<v-app-bar app color="primary" dark>
  <v-toolbar-title>Chicken Farm Manager</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items>
    <v-btn  text to="/">Dashboard</v-btn>
    <v-btn text to="/stock-management">Stocks</v-btn>
    <v-btn text to="/sales-expenses">Sales & Expenses</v-btn>
    <v-btn text to="/reports-analytics">Reports</v-btn>
    <v-btn text to="/health-monitoring">Health check</v-btn>
    <v-btn text to="/egg-details">egg-details </v-btn>
    <v-btn text to="/feeds">FeedsManagement</v-btn>
    <v-btn text to="/login">Login</v-btn>
    <v-btn text to="/signup">Signup</v-btn>

  </v-toolbar-items>
</v-app-bar>


    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
