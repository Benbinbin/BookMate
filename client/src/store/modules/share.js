export default {
  state: {
    showShareQuotesSetting: false,
    shareQuotesType: '',
    shareQuotesFormat: '',
    shareQuotesContent: null,
    shareQuotesAction: 'show',
  },
  getters: {},
  mutations: {
    // share quotes
    SHARE_QUOTES_AS_PIC(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.showSharePicModal = true;
      state.sharePicContent = payload.content;
      state.sharePicAction = payload.action;
    },
    CLOSE_SHARE_PIC_MODAL(state) {
      state.showSharePicModal = false;
      state.sharePicContent = [];
      state.sharePicAction = '';
    },
  },
  actions: {
    // share
    shareQuotesAsPic(context, payload) {
      context.commit('SHARE_QUOTES_AS_PIC', payload);
    },
    clearShareQuotes(context) {
      context.commit('CLEAR_SHARE_QUOTES');
    },
  },
};
