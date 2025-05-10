import { defineStore } from 'pinia'

export const useAlertsStore = defineStore('alerts', {
  state: () => ({
    alerts: []
  }),
  actions: {
    addAlert(type, message, timeout = 5000) {
      const id = Date.now()
      this.alerts.push({ id, type, message })
      
      setTimeout(() => {
        this.removeAlert(id)
      }, timeout)
    },
    removeAlert(id) {
      this.alerts = this.alerts.filter(alert => alert.id !== id)
    }
  }
})