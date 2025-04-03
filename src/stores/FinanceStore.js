// src/stores/financeStore.js
//eis
import { reactive } from 'vue'

/**
 * A reactive store for managing sales and expenses.
 */
export const financeStore = reactive({
  // State
  sales: [],
  expenses: [],

  // Actions for Sales
  addSale(sale) {
    this.sales.push(sale)
  },
  
  // Actions for Expenses
  addExpense(expense) {
    this.expenses.push(expense)
  },

  // Getters (computed-like properties)
  get totalSales() {
    return this.sales.reduce((sum, sale) => sum + Number(sale.amount), 0)
  },

  get totalExpenses() {
    return this.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0)
  },

  get netProfit() {
    return this.totalSales - this.totalExpenses
  }
})
