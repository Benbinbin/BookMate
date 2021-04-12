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
    // match book
    // SET_MATCH_BOOK(state, payload) {
    //   state.matchBook = payload
    // },
    // quote and summary status
    // ADD_QUOTES(state, payload) {
    //   console.log('ADD_QUOTES');
    //   const book = state.booksList.find((item) => item.metadata.titles[0] === payload.matchBookTitle);
    //   if (book) {
    //     book.quotes.push(...payload.quotes);
    //   }
    // },
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
    // books list
    getBooksList(context, payload) {
      if (payload) {
        Vue.axios.get(`${APIBASE}books?limit_field=${payload.limit_field}`)
          .then((res) => {
            context.commit('SET_BOOKSLIST', res.data);
            // console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Vue.axios.get(`${APIBASE}books`)
          .then((res) => {
            context.commit('SET_BOOKSLIST', res.data);
            // console.log(res.data);
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
      console.log(defaultCollectionsClone);
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
      // context.commit('SAVE_BOOK_METADATA', payload);

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
        }).then((res) => { })
          .catch((error) => {
            console.log(error);
          });
      }

      if (payload.removeCovers.length > 0) {
        Vue.axios.post(`${APIBASE}covers/remove`, { removeCovers: payload.removeCovers })
          .then((res) => {

          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    addBookMetadata(context, payload) {
      // context.commit('ADD_BOOK_METADATA', payload);
      Vue.axios.post(`${APIBASE}books/new`, { metadata: payload.metadata })
        .then((res) => {
          console.log(res);
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
          console.log(res);
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
      // return new Promise((resolve, reject) => {
      //   context.commit('SET_CONTENT_ORIGIN', payload);
      //   resolve('set origin content');
      // });

      // const book = state.booksList.find((item) => item.metadata.titles[0] === payload.bookTitle);
      // if (book) {
      //   const index = book.quotes.findIndex((quote) => quote.id === payload.id);
      //   if (index === -1) return;
      //   if (payload.type === 'quote') {
      //     book.quotes[index].contentOrigin = payload.content;
      //   } else if (payload.type === 'comment') {
      //     book.quotes[index].commentOrigin = payload.content;
      //   }
      // }
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
        // const book = state.booksList.find((item) => item.metadata.titles[0] === payload.matchBookTitle);
        // if (book) {
        //   book.quotes.push(...payload.quotes);
        // }

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
