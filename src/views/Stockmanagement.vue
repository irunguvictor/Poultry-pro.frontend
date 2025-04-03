<!-- Example: src/views/StockManagement.vue -->
<template>
  <v-container>
    <h1>Stock Management</h1>

    <!-- Add Stock Form -->
    <v-form @submit.prevent="handleAddStock">
      <v-text-field
        label="Item Name"
        v-model="newStock.itemName"
        required
      ></v-text-field>
      <v-text-field
        label="Quantity"
        v-model="newStock.quantity"
        type="number"
        required
      ></v-text-field>
      <v-btn type="submit" color="primary">Add Stock</v-btn>
    </v-form>

    <!-- Stock Table -->
    <v-data-table
      :headers="headers"
      :items="stockItems"
      class="mt-5"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'StockManagement',
  data() {
    return {
      newStock: {
        itemName: '',
        quantity: ''
      },
      headers: [
        { text: 'Item Name', value: 'itemName' },
        { text: 'Quantity', value: 'quantity' }
      ],
      stockItems: []
    }
  },
  methods: {
    handleAddStock() {
      if (this.newStock.itemName && this.newStock.quantity) {
        this.stockItems.push({ ...this.newStock })
        this.newStock.itemName = ''
        this.newStock.quantity = ''
      }
    }
  }
}
</script>

