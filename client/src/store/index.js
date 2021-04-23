import Vue from 'vue';
import Vuex from 'vuex';
import Qs from 'qs';
import book from './modules/book'
import quote from './modules/quote'
import summary from './modules/summary'

const APIBASE = 'http://localhost:3000/api/';

Vue.use(Vuex);

function capFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default new Vuex.Store({
  modules: {
    book,
    quote,
    summary
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
    // quote images
    // ADD_IMAGES(state, payload) {
    //   if (payload.action === 'add') {
    //     state[`add${payload.type}Images`].push(payload.target);
    //   } else if (payload.action === 'remove') {
    //     const index = state[`add${payload.type}Images`].find((item) => payload.imageName === item.imageName);
    //     if (index === -1) return;
    //     state[`add${payload.type}Images`].splice(index, 1);
    //   } else if (payload.action === 'clear') {
    //     state[`add${payload.type}Images`] = [];
    //   }
    // },
    // REMOVE_IMAGES(state, payload) {
    //   if (payload.action === 'add') {
    //     state[`remove${payload.type}Images`].push(payload.imageName);
    //   } else if (payload.action === 'clear') {
    //     state[`remove${payload.type}Images`] = [];
    //   }
    // },
    // TOGGLE_CHANGE_IMAGES_SRC(state, payload) {
    //   state[`change${payload.type}ImagesSrc`] = !state[`change${payload.type}ImagesSrc`];
    // },

    // share picture
    SHARE_PIC(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.showSharePicModal = true;
      if (payload.type === 'quote') {
        payload.ids.forEach((id) => {
          const quote = state.book.quotes.find((item) => item._id === id);
          state.sharePicContent.push(quote);
        });
      } else if (payload.type === 'summary') {
        payload.ids.forEach((id) => {
          const summary = state.book.summaries.find((item) => item._id === id);
          state.sharePicContent.push(summary);
        });
      }
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
            paramsSerializer: (params) => {
              return Qs.stringify(params, { arrayFormat: 'repeat' })
            }
          })
            .then((res) => {
              resolve(res.data)
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // return all fields by default
          Vue.axios.get(`${APIBASE}books`)
            .then((res) => {
              resolve(res.data)
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
    },
    // set booksList
    setBooksList(context, payload) {
      context.commit(SET_BOOKSLIST, payload)
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
    // content images
    // addImages(context, payload) {
    //   context.commit('ADD_IMAGES', payload);
    // },
    // removeImages(context, payload) {
    //   context.commit('REMOVE_IMAGES', payload);
    // },
    // saveContentImagesChange(context, payload) {
    //   return new Promise((resolve, reject) => {
    //     if (context.state[`add${payload.type}Images`].length > 0) {
    //       const formData = new FormData();

    //       context.state[`add${payload.type}Images`].forEach((image) => {
    //         formData.append('image', image.file, image.imageName);
    //       });

    //       Vue.axios.post(`${APIBASE}images/${payload.type.toLowerCase()}/add`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //       })
    //         .then(() => {
    //           context.commit('TOGGLE_CHANGE_IMAGES_SRC', { type: payload.type });
    //           context.commit('ADD_IMAGES', { action: 'clear', type: payload.type });
    //           resolve('images uploaded');
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     } else {
    //       console.log('no images uploaded');
    //       context.commit('TOGGLE_CHANGE_IMAGES_SRC', { type: payload.type });
    //       resolve('no images uploaded');
    //     }

    //     if (context.state[`remove${payload.type}Images`].length > 0) {
    //       Vue.axios.post(`${APIBASE}images/${payload.type.toLowerCase()}/remove`, { removeImages: context.state[`remove${payload.type}Images`] })
    //         .then(() => {
    //           context.dispatch('removeImages', {
    //             action: 'clear',
    //             type: payload.type,
    //           });
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
    //   });
    // },
    // share
    sharePic(context, payload) {
      context.commit('SHARE_PIC', payload);
    },
    closeSharePicModal(context) {
      context.commit('CLOSE_SHARE_PIC_MODAL');
    },
  },
});
