import Vue from 'vue';
import Vuex from 'vuex';

const APIBASE = 'http://localhost:3000/api/';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    booksList: [],
    book: null,
    // matchBook: null,
    summariesListMode: 'chapter',
    quotesListMode: 'chapter',
    currentSummariesChapter: '',
    currentQuotesChapter: '',
    editingSummary: null,
    editingQuote: null,
    quoteAddingComment: null,
    candidateQuote: null,
    insertQuote: false,
    showShareModal: false,
    shareContent: [],
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
    // books list
    SET_BOOKSLIST(state, payload) {
      state.booksList = payload;
    },
    // book
    SET_BOOK(state, payload) {
      state.book = payload;
    },
    CLEAR_BOOK(state) {
      state.book = null;
    },
    // book metadata
    TOGGLE_DEFAULT_COLLECTIONS(state, payload) {
      state.book.metadata.defaultCollections = payload;
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
    SAVE_BOOK_METADATA(state, payload) {
      state.book.metadata = payload;
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
    SAVE_QUOTE_EDITING(state, payload) {
      const index = state.book.quotes.findIndex((item) => item._id === payload._id);
      Vue.set(state.book.quotes, index, payload);
      state.editingQuote = null;
      state.quoteAddingComment = null;
    },
    ADD_BOOK_QUOTE(state, payload) {
      state.book.quotes.push(payload);
      state.editingQuote = null;
      state.quoteAddingComment = null;
    },
    DELETE_QUOTE(state, payload) {
      const index = state.book.quotes.findIndex((item) => item._id === payload.quote_id);
      state.book.quotes.splice(index, 1);
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
      const index = state.book.summaries.findIndex((item) => item._id === payload._id);
      Vue.set(state.book.summaries, index, payload);
      state.editingSummary = null;
    },
    ADD_BOOK_SUMMARY(state, payload) {
      state.book.summaries.push(payload);
      state.editingSummary = null;
    },
    DELETE_SUMMARY(state, payload) {
      const index = state.book.summaries.findIndex((item) => item._id === payload.summary_id);
      state.book.summaries.splice(index, 1);
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
    // share
    SHARE(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.showShareModal = true;
      if (payload.type === 'quote') {
        payload.ids.forEach((id) => {
          const quote = state.book.quotes.find((item) => item._id === id);
          state.shareContent.push(quote);
        });
      } else if (payload.type === 'summary') {
        payload.ids.forEach((id) => {
          const summary = state.book.summaries.find((item) => item._id === id);
          state.shareContent.push(summary);
        });
      }
    },
    CLOSE_SHARE_MODAL(state) {
      state.showShareModal = false;
      state.shareContent = [];
    },
  },
  actions: {
    // books list
    getBooksList(context, payload) {
      if (payload) {
        Vue.axios.get(`${APIBASE}books?limit_field=${payload.limit_field}`)
          .then((res) => {
            context.commit('SET_BOOKSLIST', res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Vue.axios.get(`${APIBASE}books`)
          .then((res) => {
            context.commit('SET_BOOKSLIST', res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // book
    getBook(context, payload) {
      Vue.axios.get(`${APIBASE}books/${payload.id}`)
        .then((res) => {
          context.commit('SET_BOOK', res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearBook(context) {
      context.commit('CLEAR_BOOK');
    },
    // book metadata
    toggleDefaultCollections(context, payload) {
      const defaultCollectionsClone = JSON.parse(JSON.stringify(context.state.book.metadata.defaultCollections));
      const target = defaultCollectionsClone.find((item) => item.name === payload.name);

      target.active = !target.active;
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/metadata/defaultCollections`, { defaultCollections: defaultCollectionsClone })
        .then((res) => {
          context.commit('TOGGLE_DEFAULT_COLLECTIONS', res.data.defaultCollections);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCollections(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/metadata/collections`, { collections: payload.collections })
        .then((res) => {
          context.commit('SET_COLLECTIONS', res.data.collections);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setTags(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/metadata/tags`, { tags: payload.tags })
        .then((res) => {
          context.commit('SET_TAGS', res.data.tags);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setStars(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/metadata/stars`, { stars: payload.stars })
        .then((res) => {
          context.commit('SET_STARS', res.data.stars);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveBookMetadata(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/metadata`, { metadata: payload.metadata })
        .then((res) => {
          context.commit('SAVE_BOOK_METADATA', res.data.metadata);
        })
        .catch((error) => {
          console.log(error);
        });

      if (payload.addCovers.length > 0) {
        const formData = new FormData();

        payload.addCovers.forEach((cover) => {
          formData.append('cover', cover.file, cover.name);
        });

        Vue.axios.post(`${APIBASE}covers/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .catch((error) => {
            console.log(error);
          });
      }

      if (payload.removeCovers.length > 0) {
        Vue.axios.post(`${APIBASE}covers/remove`, { removeCovers: payload.removeCovers })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addBookMetadata(context, payload) {
      Vue.axios.post(`${APIBASE}books/new`, { metadata: payload.metadata })
        .then((res) => {
          context.dispatch('getBooksList', { limit_field: 'metadata' });
        })
        .catch((error) => {
          console.log(error);
        });

      if (payload.addCovers.length > 0) {
        const formData = new FormData();

        payload.addCovers.forEach((cover) => {
          formData.append('cover', cover.file, cover.name);
        });

        Vue.axios.post(`${APIBASE}covers/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then((res) => {
          context.dispatch('getBooksList', { limit_field: 'metadata' });
        })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // match book
    getMatchBook(context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.get(`${APIBASE}books/${payload.id}`)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    setContentOrigin(context, payload) {
      return new Promise((resolve, reject) => {
        let field = '';
        if (payload.type === 'quote') {
          field = 'content_origin';
        } else if (payload.type === 'comment') {
          field = 'comment_origin';
        }

        Vue.axios.post(`${APIBASE}books/${payload.matchBookId}/quotes/${payload.quoteId}/${field}`, { content: payload.content })
          .then((res) => {
            resolve(res.data[field]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    importQuotes(context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(`${APIBASE}books/${payload.matchBookId}/quotes/new`, { quotes: payload.quotes })
          .then((res) => {
            resolve(res.data.quotes);
          })
          .catch((error) => {
            console.log(error);
          });
      });
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
      return new Promise((resolve, reject) => {
        if (/new$/.test(payload.id)) {
          const quote = {};
          quote.chapter = payload.chapter;
          quote.location = payload.location;
          quote.content = payload.content;
          quote.comment = payload.comment;
          quote.type = payload.type;
          Vue.axios.post(`${APIBASE}books/${context.state.book._id}/quotes/new`, { quotes: [quote] })
            .then((res) => {
              context.commit('ADD_BOOK_QUOTE', res.data.quote);
              resolve(res.data.quote._id);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Vue.axios.post(`${APIBASE}books/${context.state.book._id}/quotes/${payload.id}/all`, { quote: payload })
            .then((res) => {
              context.commit('SAVE_QUOTE_EDITING', res.data.quote);
              resolve(res.data.quote._id);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    deleteQuote(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/quotes/delete/`, { quote_id: payload })
        .then((res) => {
          context.commit('DELETE_QUOTE', res.data);
        });
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
      return new Promise((resolve, reject) => {
        if (/new$/.test(payload.id)) {
          const summary = {};
          summary.chapter = payload.chapter;
          summary.content = payload.content;
          Vue.axios.post(`${APIBASE}books/${context.state.book._id}/summaries/new`, { summaries: [summary] })
            .then((res) => {
              context.commit('ADD_BOOK_SUMMARY', res.data.summary);
              resolve(res.data.summary._id);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Vue.axios.post(`${APIBASE}books/${context.state.book._id}/summaries/${payload.id}`, { summary: payload })
            .then((res) => {
              context.commit('SAVE_SUMMARY_EDITING', res.data.summary);
              resolve(res.data.summary._id);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    deleteSummary(context, payload) {
      Vue.axios.post(`${APIBASE}books/${context.state.book._id}/summaries/delete/`, { summary_id: payload })
        .then((res) => {
          context.commit('DELETE_SUMMARY', res.data);
        });
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
    // share
    share(context, payload) {
      context.commit('SHARE', payload);
    },
    closeShareModal(context) {
      context.commit('CLOSE_SHARE_MODAL');
    },
  },
});
