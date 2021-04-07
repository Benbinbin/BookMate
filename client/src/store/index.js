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
    allCollections(state) {
      let arr = [];
      state.booksList.forEach((item) => {
        arr = arr.concat(item.metadata.collections);
      });
      return new Set(arr);
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
    // book metadata
    TOGGLE_DEFAULT_COLLECTIONS(state, payload) {
      const index = state.book.metadata.defaultCollections.findIndex((item) => item.name === payload);
      const item = state.book.metadata.defaultCollections[index];
      item.active = !item.active;
    },
    SET_COLLECTIONS(state, payload) {
      state.book.metadata.collections = payload;
    },
    SET_TAGS(state, payload) {
      state.book.metadata.tags = payload;
    },
    SET_STARS(state, payload) {
      state.book.metadata.stars = payload;
    },
    SAVE_METADATA(state, payload) {
      state.book.metadata = payload.metadata;
    },
    // quote and summary status
    ADD_QUOTES(state, payload) {
      console.log('ADD_QUOTES');
      const book = state.booksList.find((item) => item.metadata.titles[0] === payload.matchBookTitle);
      if (book) {
        book.quotes.push(...payload.quotes);
      }
    },
    SET_CONTENT_ORIGIN(state, payload) {
      const book = state.booksList.find((item) => item.metadata.titles[0] === payload.bookTitle);
      if (book) {
        const index = book.quotes.findIndex((quote) => quote.id === payload.id);
        if (index === -1) return;
        if (payload.type === 'quote') {
          book.quotes[index].contentOrigin = payload.content;
        } else if (payload.type === 'comment') {
          book.quotes[index].commentOrigin = payload.content;
        }
      }
    },
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
    SAVE_QUOTE_EDITING(state, {
      id, chapter, location, content, comment, type,
    }) {
      const index = state.book.quotes.findIndex((item) => item.id === id);

      if (index === -1) {
        state.book.quotes.push({
          id, chapter, location, content, comment, type,
        });
      } else {
        state.book.quotes[index].content = content;
        if (state.book.quotes[index].comment || comment) {
          state.book.quotes[index].comment = comment;
        }
        state.book.quotes[index].chapter = chapter;
        state.book.quotes[index].location = location;
        state.book.quotes[index].type = type;
      }
      state.editingQuote = null;
      state.quoteAddingComment = null;
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
    SAVE_SUMMARY_EDITING(state, { id, chapter, content }) {
      const index = state.book.summaries.findIndex((item) => item.id === id);

      if (index === -1) {
        state.book.summaries.push({
          id,
          chapter,
          content,
        });
      } else {
        state.book.summaries[index].content = content;
        state.book.summaries[index].chapter = chapter;
      }

      state.editingSummary = null;
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
    // book metadata
    toggleDefaultCollections(context, payload) {
      context.commit('TOGGLE_DEFAULT_COLLECTIONS', payload);
    },
    setCollections(context, payload) {
      context.commit('SET_COLLECTIONS', payload);
    },
    setTags(context, payload) {
      context.commit('SET_TAGS', payload);
    },
    setStars(context, payload) {
      context.commit('SET_STARS', payload);
    },
    saveMetadata(context, payload) {
      context.commit('SAVE_METADATA', payload);
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
    addQuotes(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('ADD_QUOTES', payload);
        resolve('add quotes');
      });
    },
    setContentOrigin(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('SET_CONTENT_ORIGIN', payload);
        resolve('set origin content');
      });
    },
    activeQuoteEditing(context, payload) {
      context.commit('ACTIVE_QUOTE_EDITING', payload);
    },
    cancelQuoteEditing(context) {
      context.commit('CANCEL_QUOTE_EDITING');
    },
    saveQuoteEditing(context, payload) {
      const {
        id, chapter, location, content, comment, type,
      } = payload;
      return new Promise((resolve, reject) => {
        if (/new$/.test(id)) {
          const newID = `quote_${+new Date()}`;
          context.commit('SAVE_QUOTE_EDITING', {
            id: newID, chapter, location, content, comment, type,
          });
          resolve(newID);
        } else {
          context.commit('SAVE_QUOTE_EDITING', payload);
          resolve(id);
        }
      });
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
      const { id, content, chapter } = payload;
      return new Promise((resolve, reject) => {
        if (/new$/.test(id)) {
          const newID = `summary_${+new Date()}`;
          context.commit('SAVE_SUMMARY_EDITING', { id: newID, chapter, content });
          resolve(newID);
        } else {
          context.commit('SAVE_SUMMARY_EDITING', payload);
          resolve(id);
        }
      });
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
