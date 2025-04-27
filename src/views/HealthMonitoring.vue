<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Health Monitoring</v-card-title>
      <v-card-text>
        <!-- Form for adding a new health log -->
        <v-form @submit.prevent="addLog">
          <v-text-field
            label="Chicken ID"
            v-model.number="chickenId"
            type="number"
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
              Chicken {{ log.chicken_id }} - {{ log.date }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ log.description }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- If no logs -->
    <v-card class="pa-4 mt-4" v-else>
      <v-card-text>No health logs found yet.</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/Services/api.js' // Use your token-injected API

export default {
  name: 'HealthMonitoring',
  setup() {
    const logs = ref([])
    const chickenId = ref('')
    const description = ref('')
    const date = ref('')

    const fetchLogs = async () => {
      try {
        const response = await api.get('health-logs')
        logs.value = response.data.data || response.data // Adjust if backend wraps in `data`
      } catch (error) {
        console.error('Error fetching health logs:', error)
      }
    }

    const addLog = async () => {
      if (chickenId.value && description.value && date.value) {
        try {
          await api.post('health-logs', {
            chicken_id: chickenId.value,
            description: description.value,
            date: date.value,
          })

          // After successful post, refresh the logs
          await fetchLogs()

          // Reset the form fields
          chickenId.value = ''
          description.value = ''
          date.value = ''
        } catch (error) {
          console.error('Error adding health log:', error.response?.data || error.message)
        }
      }
    }

    onMounted(fetchLogs)

    return {
      logs,
      chickenId,
      description,
      date,
      addLog,
    }
  }
}
</script>
