import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
    quoteAddingComment: null,
    candidateQuote: null,
    insertQuote: false,
  },
  getters: {

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
    CLEAR_QUOTES_CHAPTER(state) {
      state.currentQuotesChapter = null;
    },
    CLEAR_SUMMARIES_CHAPTER(state) {
      state.currentSummariesChapter = null;
    },
    // quote content
    ACTIVE_QUOTE_EDITING(state, payload) {
      state.editingQuote = payload;
    },
    CANCEL_QUOTE_EDITING(state) {
      state.editingQuote = null;
      state.quoteAddingComment = null;
    },
    SAVE_QUOTE_EDITING(state, payload) {
      const index = state.book.quotes.findIndex((item) => item.id === state.editingQuote);

      if (index !== -1) {
        state.book.quotes[index].content = payload.body;
        if (state.book.quotes[index].comment || payload.comment) {
          state.book.quotes[index].comment = payload.comment;
        }
        if (state.book.quotes[index].chapter || payload.chapter) {
          state.book.quotes[index].chapter = payload.chapter;
        }
        state.book.quotes[index].location = payload.location;
        state.editingQuote = null;
        state.quoteAddingComment = null;
      }
    },
    DELETE_QUOTE(state, payload) {
      const index = state.book.quotes.findIndex((item) => item.id === payload);

      if (index !== -1) {
        state.book.quotes.splice(index, 1);
      }
    },
    ACTIVE_ADDING_COMMENT(state, payload) {
      state.quoteAddingComment = payload;
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
    DELETE_SUMMARY(state, payload) {
      const index = state.book.summaries.findIndex((item) => item.id === payload);

      if (index !== -1) {
        state.book.summaries.splice(index, 1);
      }
    },
    // insert quote to summary
    SET_QUOTE(state, payload) {
      state.candidateQuote = payload;
    },
    INSERT_QUOTE(state) {
      if (state.candidateQuote) state.insertQuote = true;
    },
    CLEAR_INSERT_QUOTE(state) {
      console.log('clearing quote');
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
      return new Promise((resolve, reject) => {
        context.commit('SET_QUOTES_CHAPTER', payload);
        resolve('set quotes chapter success');
      });
    },
    clearNavQuotes(context) {
      context.commit('CLEAR_QUOTES_CHAPTER');
    },
    navSummaries(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('SET_SUMMARIES_CHAPTER', payload);
        resolve('set summaries chapter success');
      });
    },
    clearNavSummaries(context) {
      context.commit('CLEAR_SUMMARIES_CHAPTER');
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
    deleteQuote(context, payload) {
      context.commit('DELETE_QUOTE', payload);
    },
    activeAddingComment(context, payload) {
      context.commit('ACTIVE_ADDING_COMMENT', payload);
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
    deleteSummary(context, payload) {
      context.commit('DELETE_SUMMARY', payload);
    },
    // insert quote into summary
    setQuote(context, payload) {
      context.commit('SET_QUOTE', payload);
    },
    insertQuote(context) {
      return new Promise((resolve, reject) => {
        context.commit('INSERT_QUOTE');
        resolve('inserted');
      });
    },
    clearQuote(context) {
      context.commit('CLEAR_INSERT_QUOTE');
    },
  },
});
