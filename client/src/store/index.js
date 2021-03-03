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
  },
  actions: {
    get_books(context) {
      Vue.axios.get('mooc.json')
        .then((response) => {
          console.log(response.data);
          context.commit('SET_BOOKSLIST', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
