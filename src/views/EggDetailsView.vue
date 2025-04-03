<template>
  <v-container>
    <h1 class="text-center">Egg Details</h1>
    <v-row>
      <v-col class="text-center">
        <h1>Egg Details Calculator</h1>
      </v-col>
    </v-row>


    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field
          label="Egg Price (ksh)"
          v-model.number="eggPrice"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>

    
    <v-card class="pa-4">
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Opening Stock"
                v-model.number="record.openingStock"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Production"
                v-model.number="record.production"
                type="number"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                label="Sales"
                v-model.number="record.sales"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary">Add Record</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Table showing egg details with field titles in each row -->
    <v-card class="pa-4 mt-4" v-if="records.length">
      <v-card-title>Egg Details Records</v-card-title>
      <v-data-table :headers="headers" :items="records" class="mt-2">
        <template v-slot:item="props">
          <tr>
            <td><strong>Date:</strong> {{ props.item.date }}</td>
            <td><strong>Opening Stock:</strong> {{ props.item.opening_stock }}</td>
            <td><strong>Production:</strong> {{ props.item.production }}</td>
            <td><strong>Sales:</strong> {{ props.item.sales }}</td>
            <td><strong>Closing Stock:</strong> {{ props.item.closing_stock }}</td>
            <td><strong>Total Cash:</strong> \${{ props.item.total_cash }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/Services/api'; 

export default {
  name: 'EggDetailsView',
  setup() {
    
    const eggPrice = ref(0.5);
    const record = ref({
      date: '',
      openingStock: 0,
      production: 0,
      sales: 0
    });
    const records = ref([]);
    
    
    const headers = [{ text: 'Record', value: 'record' }];

    
    const fetchRecords = async () => {
      try {
        const response = await api.get('/egg-details');
        records.value = response.data;
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

  
    const submitRecord = async () => {
      const { date, openingStock, production, sales } = record.value;
      if (date && openingStock != null && production != null && sales != null) {
        try {
          const response = await api.post('/egg-details', {
            date,
            opening_stock: Number(openingStock),
            production: Number(production),
            sales: Number(sales),
            egg_price: eggPrice.value
          });
          
          records.value.push(response.data);
          
          record.value = { date: '', openingStock: 0, production: 0, sales: 0 };
        } catch (error) {
          console.error('Error adding record:', error);
        }
      }
    };

    
    onMounted(fetchRecords);

    return { eggPrice, record, records, headers, submitRecord };
  }
}
</script>
