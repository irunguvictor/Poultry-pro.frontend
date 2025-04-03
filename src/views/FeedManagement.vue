<template>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1>Feed Management</h1>
          <p>Calculate the daily feed requirement for your chickens.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Average Weight (kg)"
            v-model.number="avgWeight"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Number of Chickens"
            v-model.number="chickenCount"
            type="number"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn color="primary" @click="calculateFeed">Calculate Feed</v-btn>
        </v-col>
      </v-row>
      <v-row v-if="feedResult !== null">
        <v-col cols="12" class="text-center">
          <h2>Total Daily Feed Requirement: {{ feedResult }} kg</h2>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'FeedManagement',
    setup() {
      const avgWeight = ref(0);
      const chickenCount = ref(0);
      const feedResult = ref(null);
  
      const calculateFeed = () => {
        if (avgWeight.value > 0 && chickenCount.value > 0) {
          
          const feedPerChickenGrams = (avgWeight.value / 2) * 140;
        
          const totalFeedKg = (feedPerChickenGrams * chickenCount.value) / 1000;
          feedResult.value = totalFeedKg.toFixed(2);
        } else {
          feedResult.value = 0;
        }
      };
  
      return { avgWeight, chickenCount, feedResult, calculateFeed };
    }
  };
  </script>
  
  