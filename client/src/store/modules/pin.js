export default {
  state: {
    pinQuotesSet: new Set(),
    pinQuotesSetTracker: true,
    showPinQuotes: false,
    sharePinQuotes: false,
    sharePinQuotesFormat: '',
    pinSummariesSet: new Set(),
    pinSummariesSetTracker: true,
    showPinSummaries: false,
    sharePinSummaries: false,
    sharePinSummariesFormat: '',
  },
  getters: {},
  mutations: {
    SET_PIN_QUOTES(state, payload) {
      if (payload && payload.length === 1) {
        const id = payload[0];
        if (state.pinQuotesSet.has(id)) {
          state.pinQuotesSet.delete(id);
        } else {
          state.pinQuotesSet.add(id);
        }
      } else if (payload && payload.length > 1) {
        const arr = [...state.pinQuotesSet];
        const unionSet = new Set([...arr, ...payload]);
        if (unionSet.size === state.pinQuotesSet.size) {
          const complement = arr.filter((item) => !new Set(payload).has(item));
          const complementSet = new Set(complement);
          state.pinQuotesSet = complementSet;
        } else {
          state.pinQuotesSet = unionSet;
        }
      } else {
        console.log('clear pin quotes');
        state.pinQuotesSet.clear();
      }
      state.pinQuotesSetTracker = !state.pinQuotesSetTracker;
    },
    SET_PIN_SUMMARIES(state, payload) { },
    TOGGLE_SHARE_PIN_QUOTES(state, payload) {
      if (payload) {
        state.sharePinQuotes = true;
        state.sharePinQuotesFormat = payload;
      } else {
        state.sharePinQuotes = false;
      }
    },
    TOGGLE_SHARE_PIN_SUMMARIES(state, payload) {

    },
  },
  actions: {
    setPinQuotes(context, payload) {
      context.commit('SET_PIN_QUOTES', payload);
    },
    setPinSummaries(context, payload) {
      context.commit('SET_PIN_SUMMARIES', payload);
    },
    toggleSharePinQuotes(context, payload) {
      context.commit('TOGGLE_SHARE_PIN_QUOTES', payload);
    },
    toggleSharePinSummaries(context, payload) {
      context.commit('TOGGLE_SHARE_PIN_SUMMARIES', payload);
    },
  },
};
