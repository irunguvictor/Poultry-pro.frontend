<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-title>Reports & Analytics</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-card outlined class="pa-3">
              <v-card-title>Total Sales</v-card-title>
              <v-card-text>\ksh{{ totalSales }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card outlined class="pa-3">
              <v-card-title>Total Expenses</v-card-title>
              <v-card-text>\ksh{{ totalExpenses }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card outlined class="pa-3">
              <v-card-title>Net Profit</v-card-title>
              <v-card-text>\ksh{{ netProfit }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { computed } from 'vue'
import { financeStore } from '@/stores/FinanceStore.js'

export default {
  name: 'ReportsAnalytics',
  setup() {
    // Calculate Total Sales by summing up all sales amounts
    const totalSales = computed(() =>
      financeStore.sales.reduce((sum, sale) => sum + Number(sale.amount), 0)
    )

    // Calculate Total Expenses by summing up all expense amounts
    const totalExpenses = computed(() =>
      financeStore.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
    )

    // Net Profit is Total Sales minus Total Expenses
    const netProfit = computed(() => totalSales.value - totalExpenses.value)

    return { totalSales, totalExpenses, netProfit }
  }
}
</script>

