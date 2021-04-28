import Vue from 'vue';
import Vuex from 'vuex';
import Qs from 'qs';
import book from './modules/book';
import quote from './modules/quote';
import summary from './modules/summary';

const APIBASE = 'http://localhost:3000/api/';

Vue.use(Vuex);

function capFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default new Vuex.Store({
  modules: {
    book,
    quote,
    summary,
  },
  state: {
    booksList: [],
    quotesListMode: 'chapter',
    currentQuotesChapter: '',
    summariesListMode: 'chapter',
    currentSummariesChapter: '',
    showSharePicModal: false,
    sharePicContent: [],
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
    // display mode of quotes or summaries
    CHANGE_DISPLAY_MODE(state, payload) {
      state[`${payload.type}ListMode`] = payload.mode;
    },
    SET_NAV_CHAPTER(state, payload) {
      state[`current${capFirstLetter(payload.type)}Chapter`] = payload.chapter;
    },
    CLEAR_NAV_CHAPTER(state, payload) {
      state[`current${capFirstLetter(payload.type)}Chapter`] = null;
    },
    // share picture
    SHARE_PIC(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.showSharePicModal = true;
      state.sharePicContent = payload;
    },
    CLOSE_SHARE_PIC_MODAL(state) {
      state.showSharePicModal = false;
      state.sharePicContent = [];
    },
  },
  actions: {
    // get all books information
    getBooksList(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          // can explicitly declare which field(s) to get
          // * metadata (titles, covers, default_collections, collections, etc)
          // * quote_ids
          // * summary_ids
          Vue.axios.get(`${APIBASE}books`, {
            params: payload,
            paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat' }),
          })
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // return all fields by default
          Vue.axios.get(`${APIBASE}books`)
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    // set booksList
    setBooksList(context, payload) {
      context.commit('SET_BOOKSLIST', payload);
    },
    // display mode of quotes or summaries
    changeDisplayMode(context, payload) {
      context.commit('CHANGE_DISPLAY_MODE', payload);
    },
    setNavChapter(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit('SET_NAV_CHAPTER', payload);
        resolve('set quotes chapter success');
      });
    },
    clearNavChapter(context, payload) {
      context.commit('CLEAR_NAV_CHAPTER', payload);
    },
    // share
    sharePic(context, payload) {
      // const content = [];
      // if (payload.type === 'quote') {
      //   payload.ids.forEach((id) => {
      //     const target = context.rootState.quote.quotes.find((item) => item._id === id);
      //     if (target) content.push(target);
      //   });
      // } else if (payload.type === 'summary') {
      //   payload.ids.forEach((id) => {
      //     const target = context.rootState.summary.summaries.find((item) => item._id === id);
      //     content.push(target);
      //   });
      // }
      context.commit('SHARE_PIC', payload);
    },
    closeSharePicModal(context) {
      context.commit('CLOSE_SHARE_PIC_MODAL');
    },
  },
});
