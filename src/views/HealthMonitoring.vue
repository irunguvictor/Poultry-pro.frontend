<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Health Monitoring</v-card-title>
      <v-card-text>
        <!-- Form for adding a new health log -->
        <v-form @submit.prevent="addLog">
          <v-text-field
            label="Chicken ID"
            v-model="chickenId"
            required
          ></v-text-field>
          <v-text-field
            label="Log Description"
            v-model="description"
            required
          ></v-text-field>
          <v-text-field
            label="Date"
            v-model="date"
            type="date"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" class="mt-2">Add Log</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Display the logs in a card with a list -->
    <v-card class="pa-4 mt-4" v-if="logs.length">
      <v-card-title>Health Logs ({{ logs.length }})</v-card-title>
      <v-list>
        <v-list-item v-for="(log, index) in logs" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              {{ log.chickenId }} - {{ log.date }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ log.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HealthMonitoring',
  setup() {
    const logs = ref([])
    const chickenId = ref('')
    const description = ref('')
    const date = ref('')

    const addLog = () => {
      if (chickenId.value && description.value && date.value) {
        logs.value.push({
          chickenId: chickenId.value,
          description: description.value,
          date: date.value
        })
        // Reset the form fields
        chickenId.value = ''
        description.value = ''
        date.value = ''
      }
    }

    return { logs, chickenId, description, date, addLog }
  }
}
</script>
