export default {
  state: {
    // showShareQuotesSetting: false,
    // shareQuotesType: '',
    // shareQuotesFormat: '',
    shareQuotesContent: null,
  },
  getters: {},
  mutations: {
    // share quotes
    SET_SHARE_QUOTES_CONTENT(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.shareQuotesContent = payload;
    },
    CLEAR_SHARE_QUOTES_CONTENT(state) {
      state.shareQuotesContent = null;
    },

  },
  actions: {
    setShareQuotesContent(context, payload) {
      context.commit('SET_SHARE_QUOTES_CONTENT', payload);
    },
    clearShareQuotesContent(context) {
      context.commit('CLEAR_SHARE_QUOTES_CONTENT');
    },
  },
};
