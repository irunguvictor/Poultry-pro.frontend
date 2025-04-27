<template>
  <v-container>
    <h1>Reports & Analytics</h1>

    <v-card class="mt-5">
      <v-card-title>Summary</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4"><strong>Total Sales:</strong> ${{ totalSales }}</v-col>
          <v-col cols="4"><strong>Total Expenses:</strong> ${{ totalExpenses }}</v-col>
          <v-col cols="4"><strong>Net Profit:</strong> ${{ netProfit }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '@/Services/api.js'

export default {
  name: 'ReportsAnalytics',
  setup() {
    const allItems = ref([])

    const sales = computed(() => allItems.value.filter(item => item.type === 'sale'))
    const expenses = computed(() => allItems.value.filter(item => item.type === 'expense'))

    const totalSales = computed(() =>
      sales.value.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    )

    const totalExpenses = computed(() =>
      expenses.value.reduce((sum, item) => sum + parseFloat(item.amount), 0)
    )

    const netProfit = computed(() => totalSales.value - totalExpenses.value)

    const fetchData = async () => {
      try {
        const res = await api.get('sales-expenses') // same endpoint as sales page
        allItems.value = res.data.data || res.data
      } catch (err) {
        console.error('Failed to fetch report data:', err)
      }
    }

    onMounted(fetchData)

    return {
      totalSales,
      totalExpenses,
      netProfit
    }
  }
}
</script>
