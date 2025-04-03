import { createStore } from 'vuex'

export default createStore({
  state: {
    stockItems: []
  },
  mutations: {
    ADD_STOCK_ITEM(state, payload) {
      state.stockItems.push(payload)
    }
  },
  actions: {
    addStockItem({ commit }, newItem) {
      commit('ADD_STOCK_ITEM', newItem)
    }
  },
  getters: {
    getStockItems: (state) => state.stockItems
  }
})
