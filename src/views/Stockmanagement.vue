<template>
  <v-container>
    <h1>Stock Management</h1>

    <!-- Add Stock Form -->
    <v-form @submit.prevent="handleAddStock">
      <v-text-field
        label="Item Name"
        v-model="newStock.item_name"
        required
      ></v-text-field>
      <v-text-field
        label="Quantity"
        v-model="newStock.quantity"
        type="number"
        required
      ></v-text-field>
      <v-text-field
        label="Date"
        v-model="newStock.date"
        type="date"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Add Stock</v-btn>
    </v-form>

    <!-- Stock Table -->
    <v-data-table
      :headers="headers"
      :items="stockItems"
      class="mt-5"
      :items-per-page="5"
    ></v-data-table>
  </v-container>
</template>

<script>
import api from '@/Services/api.js'

export default {
  name: 'StockManagement',
  data() {
    return {
      newStock: {
        item_name: '',
        quantity: '',
        date: ''
      },
      headers: [
        { text: 'Item Name', value: 'item_name' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Date', value: 'date' }
      ],
      stockItems: []
    }
  },
  mounted() {
    this.fetchStocks()
  },
  methods: {
    async fetchStocks() {
      try {
        const response = await api.get('stocks') // no extra slash ✅
        console.log('Fetched stocks:', response.data)
        this.stockItems = response.data.data || response.data // flexible depending on backend format
      } catch (error) {
        console.error('Failed to fetch stocks:', error)
      }
    },
    async handleAddStock() {
      try {
        const payload = {
          item_name: this.newStock.item_name,
          quantity: parseInt(this.newStock.quantity),
          date: this.newStock.date
        }

        const response = await api.post('stocks', payload) // no extra slash ✅
        console.log('Added stock:', response.data)

        // Clear form
        this.newStock = { item_name: '', quantity: '', date: '' }

        // Refresh the stock list
        await this.fetchStocks()
      } catch (error) {
        console.error('Error adding stock:', error.response?.data || error.message)
      }
    }
  }
}
</script>
