
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
              <v-text-field label="Sale Description" v-model="newSale.description" required></v-text-field>
              <v-text-field label="Amount" v-model="newSale.amount" type="number" required></v-text-field>
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
              <v-text-field label="Expense Description" v-model="newExpense.description" required></v-text-field>
              <v-text-field label="Amount" v-model="newExpense.amount" type="number" required></v-text-field>
              <v-btn type="submit" color="red">Add Expense</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Display Sales & Expenses -->
    <v-row class="mt-5">
      <!-- Sales Table -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Sales</v-card-title>
          <v-data-table
            :headers="salesHeaders"
            :items="financeStore.sales"
          ></v-data-table>
        </v-card>
      </v-col>

      <!-- Expenses Table -->
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Expenses</v-card-title>
          <v-data-table
            :headers="expensesHeaders"
            :items="financeStore.expenses"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Summary -->
    <v-card class="mt-5">
      <v-card-title>Summary</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4"><strong>Total Sales:</strong> ${{ financeStore.totalSales }}</v-col>
          <v-col cols="4"><strong>Total Expenses:</strong> ${{ financeStore.totalExpenses }}</v-col>
          <v-col cols="4"><strong>Net Profit:</strong> ${{ financeStore.netProfit }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref } from 'vue'
import { financeStore } from '@/stores/FinanceStore.js'

export default {
  name: 'SalesExpenses',
  setup() {
    // Reactive inputs for sales and expenses
    const newSale = ref({
      description: '',
      amount: ''
    })

    const newExpense = ref({
      description: '',
      amount: ''
    })

    const salesHeaders = [
      { text: 'Description', value: 'description' },
      { text: 'Amount ($)', value: 'amount' }
    ]

    const expensesHeaders = [
      { text: 'Description', value: 'description' },
      { text: 'Amount ($)', value: 'amount' }
    ]

    function handleAddSale() {
      if (newSale.value.description && newSale.value.amount) {
        financeStore.addSale({ ...newSale.value })
        newSale.value.description = ''
        newSale.value.amount = ''
      }
    }

    function handleAddExpense() {
      if (newExpense.value.description && newExpense.value.amount) {
        financeStore.addExpense({ ...newExpense.value })
        newExpense.value.description = ''
        newExpense.value.amount = ''
      }
    }

    return {
      financeStore,
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

