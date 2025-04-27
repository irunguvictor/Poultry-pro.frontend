<template>
  <v-container>
    <h1 class="text-center mb-4">Egg Details</h1>

    <v-row>
      <v-col cols="12" sm="6" class="mx-auto">
        <v-text-field
          label="Egg Price (Ksh)"
          v-model.number="eggPrice"
          type="number"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card class="pa-4 mt-4">
      <v-card-title>Enter Egg Data</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="submitRecord">
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Date"
                v-model="record.date"
                type="date"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Opening Stock"
                v-model.number="record.openingStock"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Production"
                v-model.number="record.production"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Sales"
                v-model.number="record.sales"
                type="number"
                required
                outlined
                dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary" class="mt-3">Add Record</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-card class="pa-4 mt-5" v-if="records.length">
      <v-card-title>Egg Details Records</v-card-title>
      <v-data-table :headers="headers" :items="records" class="elevation-1" :items-per-page="5">
        <template v-slot:item="{ item }">
          <tr>
            <td><strong>Date:</strong> {{ item.date }}</td>
            <td><strong>Opening Stock:</strong> {{ item.opening_stock }}</td>
            <td><strong>Production:</strong> {{ item.production }}</td>
            <td><strong>Sales:</strong> {{ item.sales }}</td>
            <td><strong>Closing Stock:</strong> {{ item.closing_stock }}</td>
            <td><strong>Revenue:</strong> Ksh {{ item.revenue }}</td>

          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '@/Services/api'

export default {
  name: 'EggDetailsView',
  setup() {
    const eggPrice = ref(0.5)
    const record = ref({
      date: '',
      openingStock: 0,
      production: 0,
      sales: 0,
    })
    const records = ref([])

    const headers = [
      { text: 'Date', value: 'date' },
      { text: 'Opening Stock', value: 'opening_stock' },
      { text: 'Production', value: 'production' },
      { text: 'Sales', value: 'sales' },
      { text: 'Closing Stock', value: 'closing_stock' },
      { text: 'Total Cash', value: 'total_cash' },
    ]

    const fetchRecords = async () => {
      try {
        const response = await api.get('/egg-details')
        records.value = response.data
      } catch (error) {
        console.error('Error fetching records:', error)
      }
    }

    const submitRecord = async () => {
      const { date, openingStock, production, sales } = record.value
      if (date && openingStock != null && production != null && sales != null) {
        try {
          await api.post('/egg-details', {
            date,
            opening_stock: openingStock,
            production,
            sales,
            egg_price: eggPrice.value,
          })
          await fetchRecords()
          record.value = { date: '', openingStock: 0, production: 0, sales: 0 }
        } catch (error) {
          console.error('Error adding record:', error)
        }
      }
    }

    onMounted(fetchRecords)

    return {
      eggPrice,
      record,
      records,
      headers,
      submitRecord,
    }
  },
}
</script>
