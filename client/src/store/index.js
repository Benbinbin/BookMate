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
    summariesListMode: 'default',
    quotesListMode: 'chapter',
    currentSummariesChapter: '',
    currentQuotesChapter: '',
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
    SET_BOOKSLIST(state, payload) {
      state.booksList = payload;
    },
    SET_BOOK(state, payload) {
      state.book = payload;
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
  },
  actions: {
    getBooksList(context) {
      Vue.axios.get('mooc.json')
        .then((res) => {
          // console.log(res.data);
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
  },
});
