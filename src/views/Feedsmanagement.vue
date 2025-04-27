<template>
    <v-container>
      <v-card class="pa-4">
        <v-card-title>Daily Feed Calculator</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitFeed">
            <v-row>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Date"
                  v-model="feed.date"
                  type="date"
                  required
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Number of Chickens"
                  v-model.number="feed.chickenCount"
                  type="number"
                  required
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  label="Feed per Chicken (kg)"
                  v-model.number="feed.perChickenKg"
                  type="number"
                  required
                  outlined
                  dense
                />
              </v-col>
            </v-row>
  
            <v-row class="mt-2">
              <v-col cols="12" sm="8">
                <v-text-field
                  label="Total Feed Needed (kg)"
                  :value="totalFeed.toFixed(2)"
                  readonly
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="12" sm="4" class="d-flex align-end">
                <v-btn type="submit" color="primary" block>
                  Save
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
  
      <v-card class="pa-4 mt-6" v-if="records.length">
        <v-card-title>Feed Records</v-card-title>
        <v-data-table
          :headers="headers"
          :items="records"
          :items-per-page="5"
          class="elevation-1"
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.date }}</td>
              <td>{{ item.chicken_count }}</td>
              <td>{{ item.per_chicken_kg }}</td>
              <td>{{ item.total_feed_kg }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
  
      <v-card class="pa-4 mt-6" v-else>
        <v-card-text>No feed records yet.</v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue'
  import api from '@/Services/api.js'
  
  export default {
    name: 'FeedManagement',
    setup() {
      // form model
      const feed = ref({
        date: '',
        chickenCount: 0,
        perChickenKg: 0,
      })
  
      // computed total
      const totalFeed = computed(() =>
        feed.value.chickenCount * feed.value.perChickenKg
      )
  
      // table data
      const records = ref([])
  
      const headers = [
        { text: 'Date', value: 'date' },
        { text: 'Chickens', value: 'chicken_count' },
        { text: 'Feed/Chicken (kg)', value: 'per_chicken_kg' },
        { text: 'Total Feed (kg)', value: 'total_feed_kg' },
      ]
  
      // fetch existing records
      const fetchRecords = async () => {
        try {
          const res = await api.get('feeds')
          // expect API to return array of objects like
          // { date, chicken_count, per_chicken_kg, total_feed_kg }
          records.value = res.data.data || res.data
        } catch (err) {
          console.error('Failed to fetch feed records:', err)
        }
      }
  
      // submit new record
      const submitFeed = async () => {
        const { date, chickenCount, perChickenKg } = feed.value
        if (!date || chickenCount <= 0 || perChickenKg <= 0) return
  
        try {
          await api.post('feeds', {
            date,
            chicken_count: chickenCount,
            per_chicken_kg: perChickenKg,
            total_feed_kg: totalFeed.value,
          })
          await fetchRecords()
          // reset form
          feed.value = { date: '', chickenCount: 0, perChickenKg: 0 }
        } catch (err) {
          console.error('Error saving feed record:', err)
        }
      }
  
      onMounted(fetchRecords)
  
      return {
        feed,
        totalFeed,
        records,
        headers,
        submitFeed,
      }
    },
  }
  </script>
  