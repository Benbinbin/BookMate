import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function filterBooks(collectionType, key, state) {
  if (!state.booksList.length) return [];
  const arr = [];
  state.booksList.forEach((item) => {
    if (item.metadata[collectionType].includes(key)) {
      arr.push(item);
    }
  });
  return arr;
}

export default new Vuex.Store({
  state: {
    booksList: [],
    book: null,
    summariesListMode: 'chapter',
    quotesListMode: 'chapter',
    currentSummariesChapter: '',
    currentQuotesChapter: '',
    editingSummary: null,
    editingQuote: null,
    candidateQuote: null,
    insertQuote: false,
  },
  getters: {
    readingBooks(state) {
      return filterBooks('defaultCollections', 'reading', state);
    },
    laterReadingBooks(state) {
      return filterBooks('defaultCollections', 'later', state);
    },
    loveBooks(state) {
      return filterBooks('defaultCollections', 'love', state);
    },
    cartBooks(state) {
      return filterBooks('defaultCollections', 'cart', state);
    },
    collectionsBooks(state) {
      let arr = [];
      state.booksList.forEach((item) => {
        arr = arr.concat(item.metadata.collections);
      });
      const collections = new Set(arr);
      const collectionsBooks = [];
      collections.forEach((val) => {
        collectionsBooks.push({
          name: val,
          data: filterBooks('collections', val, state),
        });
      });
      return collectionsBooks;
    },
  },
  mutations: {
    // book
    SET_BOOKSLIST(state, payload) {
      state.booksList = payload;
    },
    SET_BOOK(state, payload) {
      state.book = payload;
    },
    CLEAR_BOOK(state) {
      state.book = null;
    },
    // quote and summary status
    CHANGE_QUOTES_MODE(state, payload) {
      state.quotesListMode = payload;
    },
    CHANGE_SUMMARIES_MODE(state, payload) {
      state.summariesListMode = payload;
    },
    SET_QUOTES_CHAPTER(state, payload) {
      state.currentQuotesChapter = payload;
    },
    SET_SUMMARIES_CHAPTER(state, payload) {
      state.currentSummariesChapter = payload;
    },
    // quote content
    ACTIVE_QUOTE_EDITING(state, payload) {
      state.editingQuote = payload;
    },
    CANCEL_QUOTE_EDITING(state) {
      state.editingQuote = null;
    },
    SAVE_QUOTE_EDITING(state, payload) {
      const index = state.book.quotes.findIndex((item) => item.id === state.editingQuote);

      if (index !== -1) {
        state.book.quotes[index].content = payload.body;
        if (state.book.quotes[index].comment || payload.comment) {
          state.book.quotes[index].comment = payload.comment;
        }
        state.editingQuote = null;
      }
    },
    // summary content
    ACTIVE_SUMMARY_EDITING(state, payload) {
      state.editingSummary = payload;
    },
    CANCEL_SUMMARY_EDITING(state) {
      state.editingSummary = null;
    },
    SAVE_SUMMARY_EDITING(state, payload) {
      const index = state.book.summaries.findIndex((item) => item.id === state.editingSummary);

      if (index !== -1) {
        state.book.summaries[index].content = payload;
        state.editingSummary = null;
      }
    },
    // insert quote
    SET_QUOTE(state, payload) {
      state.candidateQuote = payload;
    },
    INSERT_QUOTE(state) {
      if (state.candidateQuote) state.insertQuote = true;
    },
    CLEAR_INSERT_QUOTE(state) {
      state.insertQuote = false;
      state.candidateQuote = null;
    },
  },
  actions: {
    // book
    getBooksList(context) {
      Vue.axios.get('mooc.json')
        .then((res) => {
          context.commit('SET_BOOKSLIST', res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getBook(context, payload) {
      Vue.axios.get('mooc.json')
        .then((res) => {
          const result = res.data.find((item) => {
            if (item.metadata.isbn) {
              return item.metadata.isbn === payload.isbn;
            }
            return false;
          });
          if (result) {
            context.commit('SET_BOOK', result);
          }
        });
    },
    clearBook(context) {
      context.commit('CLEAR_BOOK');
    },
    // quote and summary status
    changeQuotesMode(context, payload) {
      context.commit('CHANGE_QUOTES_MODE', payload);
    },
    changeSummariesMode(context, payload) {
      context.commit('CHANGE_SUMMARIES_MODE', payload);
    },
    navQuotes(context, payload) {
      context.commit('SET_QUOTES_CHAPTER', payload);
    },
    navSummaries(context, payload) {
      context.commit('SET_SUMMARIES_CHAPTER', payload);
    },
    // quote content
    activeQuoteEditing(context, payload) {
      context.commit('ACTIVE_QUOTE_EDITING', payload);
    },
    cancelQuoteEditing(context) {
      context.commit('CANCEL_QUOTE_EDITING');
    },
    saveQuoteEditing(context, payload) {
      context.commit('SAVE_QUOTE_EDITING', payload);
    },
    // summary content
    activeSummaryEditing(context, payload) {
      context.commit('ACTIVE_SUMMARY_EDITING', payload);
    },
    cancelSummaryEditing(context) {
      context.commit('CANCEL_SUMMARY_EDITING');
    },
    saveSummaryEditing(context, payload) {
      context.commit('SAVE_SUMMARY_EDITING', payload);
    },
    setQuote(context, payload) {
      context.commit('SET_QUOTE', payload);
    },
    insertQuote(context) {
      context.commit('INSERT_QUOTE');
    },
    clearQuote(context) {
      context.commit('CLEAR_INSERT_QUOTE');
    },
  },
});
