<template>
  <v-container>
    <h1>Sales & Expenses</h1>

    <v-row>
      <!-- Sales Form -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Add Sale</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleAddSale">
              <v-text-field label="Date" type="date" v-model="newSale.date" required />
              <v-text-field label="Sale Description" v-model="newSale.description" required />
              <v-text-field label="Amount" v-model="newSale.amount" type="number" required />
              <v-btn type="submit" color="green">Add Sale</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Expenses Form -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Add Expense</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleAddExpense">
              <v-text-field label="Date" type="date" v-model="newExpense.date" required />
              <v-text-field label="Expense Description" v-model="newExpense.description" required />
              <v-text-field label="Amount" v-model="newExpense.amount" type="number" required />
              <v-btn type="submit" color="red">Add Expense</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Display Tables -->
    <v-row class="mt-5">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Sales</v-card-title>
          <v-data-table :headers="salesHeaders" :items="sales" :items-per-page="5" />
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Expenses</v-card-title>
          <v-data-table :headers="expensesHeaders" :items="expenses" :items-per-page="5" />
        </v-card>
      </v-col>
    </v-row>

    <!-- ❌ Removed the summary card completely -->
  </v-container>
</template>

<script>
// same script as you have, no changes needed
import { ref, computed, onMounted } from 'vue'
import api from '@/Services/api.js'

export default {
  name: 'SalesExpenses',
  setup() {
    const allItems = ref([])
    const newSale = ref({ date: '', description: '', amount: '' })
    const newExpense = ref({ date: '', description: '', amount: '' })

    const salesHeaders = [
      { text: 'Date', value: 'date' },
      { text: 'Description', value: 'description' },
      { text: 'Amount ($)', value: 'amount' }
    ]

    const expensesHeaders = [
      { text: 'Date', value: 'date' },
      { text: 'Description', value: 'description' },
      { text: 'Amount ($)', value: 'amount' }
    ]

    const sales = computed(() => allItems.value.filter(item => item.type === 'sale'))
    const expenses = computed(() => allItems.value.filter(item => item.type === 'expense'))

    const fetchData = async () => {
      try {
        const res = await api.get('sales-expenses')
        allItems.value = res.data.data || res.data
      } catch (err) {
        console.error('Failed to fetch data:', err)
      }
    }

    const handleAddSale = async () => {
      try {
        await api.post('sales-expenses', { ...newSale.value, type: 'sale' })
        newSale.value = { date: '', description: '', amount: '' }
        await fetchData()
      } catch (err) {
        console.error('Failed to add sale:', err.response?.data || err.message)
      }
    }

    const handleAddExpense = async () => {
      try {
        await api.post('sales-expenses', { ...newExpense.value, type: 'expense' })
        newExpense.value = { date: '', description: '', amount: '' }
        await fetchData()
      } catch (err) {
        console.error('Failed to add expense:', err.response?.data || err.message)
      }
    }

    onMounted(fetchData)

    return {
      sales,
      expenses,
      newSale,
      newExpense,
      salesHeaders,
      expensesHeaders,
      handleAddSale,
      handleAddExpense
    }
  }
}
</script>
