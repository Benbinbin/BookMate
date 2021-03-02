import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function filterBooks(key, state) {
  if (!state.booksList.length) return [];
  const arr = [];
  state.booksList.forEach((item) => {
    if (item.metadata.tags.includes(key)) {
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
      return filterBooks('reading', state);
    },
    laterReadingBooks(state) {
      return filterBooks('later', state);
    },
    loveBooks(state) {
      return filterBooks('love', state);
    },
    cartBooks(state) {
      return filterBooks('cart', state);
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
