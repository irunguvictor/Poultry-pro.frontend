
import { reactive } from 'vue'

export const healthStore = reactive({
  
  healthLogs: [],
  addHealthLog(log) {
    this.healthLogs.push(log)
  },

  
  get totalLogs() {
    return this.healthLogs.length
  }
})
