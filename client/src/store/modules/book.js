import Vue from 'vue';
import Qs from 'qs';

const APIBASE = 'http://localhost:3000/api/';

export default {
  state: {
    book: null,
  },
  getters: {},
  mutations: {
    // set current book
    SET_BOOK(state, payload) {
      state.book = payload;
    },
    // clear current book
    CLEAR_BOOK(state) {
      state.book = null;
    },
    // set metadata field
    TOGGLE_DEFAULT_COLLECTIONS(state, payload) {
      state.book.metadata.default_collections = payload;
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
    // set metadata almost all fields
    SAVE_BOOK_METADATA(state, payload) {
      state.book.metadata = payload;
    },
  },
  actions: {
    // set current book
    setBook(context, payload) {
      context.commit('SET_BOOK', payload);
    },
    // get book information by id
    getBook(context, payload) {
      return new Promise((resolve, reject) => {
        // can explicitly declare which field(s) to get
        // * metadata (titles, covers, default_collections, collections, etc)
        // * quote_ids
        // * summary_ids
        if (payload.query) {
          // get particular field of book
          Vue.axios.get(`${APIBASE}books/${payload.id}`, {
            params: payload.query,
            paramsSerializer: (params) => Qs.stringify(params, { arrayFormat: 'repeat' }),
          })
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // get all fields of book by default
          Vue.axios.get(`${APIBASE}books/${payload.id}`)
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    // clear current book before the book component destroy
    clearBook(context) {
      context.commit('CLEAR_BOOK');
    },
    // add new book
    // just contain metadata
    addBook(context, payload) {
      Vue.axios.post(`${APIBASE}books`, { metadata: payload.metadata })
        .then(() => {
          // if user add covers of book, upload them
          if (payload.addCovers.length > 0) {
            const formData = new FormData();

            payload.addCovers.forEach((cover) => {
              formData.append('cover', cover.file, cover.name);
            });

            Vue.axios.post(`${APIBASE}covers`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }).then(() => {
              // refresh the bookList
              context.dispatch('getBooksList', { metadata: ['titles', 'covers', 'default_collections', 'collections'] });
            })
              .catch((error) => {
                console.log(error);
              });
          } else {
            // refresh the bookList
            context.dispatch('getBooksList', { metadata: ['titles', 'covers', 'default_collections', 'collections'] });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // save the book metadata field modification
    // * default_collections
    // * collections
    // * tags
    // * stars
    toggleDefaultCollections(context, payload) {
      const defaultCollectionsClone = JSON.parse(JSON.stringify(context.state.book.metadata.default_collections));
      const target = defaultCollectionsClone.find((item) => item.name === payload.name);
      target.active = !target.active; // toggle default collection

      Vue.axios.put(`${APIBASE}books/${context.state.book._id}/metadata`,
        {
          field: 'metadata.default_collections',
          value: defaultCollectionsClone,
        })
        .then((res) => {
          context.commit('TOGGLE_DEFAULT_COLLECTIONS', res.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setCollections(context, payload) {
      Vue.axios.put(`${APIBASE}books/${context.state.book._id}/metadata`,
        {
          field: 'metadata.collections',
          value: payload.collections,
        })
        .then((res) => {
          context.commit('SET_COLLECTIONS', res.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setTags(context, payload) {
      Vue.axios.put(`${APIBASE}books/${context.state.book._id}/metadata`,
        {
          field: 'metadata.tags',
          value: payload.tags,
        })
        .then((res) => {
          context.commit('SET_TAGS', res.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setStars(context, payload) {
      Vue.axios.put(`${APIBASE}books/${context.state.book._id}/metadata`,
        {
          field: 'metadata.stars',
          value: payload.stars,
        })
        .then((res) => {
          context.commit('SET_STARS', res.data.value);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // save the book metadata of almost all fields modification
    saveBookMetadata(context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.put(`${APIBASE}books/${context.state.book._id}/metadata`,
          {
            field: 'metadata',
            value: payload.metadata,
          })
          .then((res) => {
            // if user add covers of book, upload them
            if (payload.addCovers.length > 0) {
              const formData = new FormData();

              payload.addCovers.forEach((cover) => {
                formData.append('cover', cover.file, cover.name);
              });

              Vue.axios.post(`${APIBASE}covers`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              })
                .then(() => {
                  // refresh book metadata
                  context.commit('SAVE_BOOK_METADATA', res.data.value);
                  resolve('save book metadata editing');
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              // refresh book metadata
              context.commit('SAVE_BOOK_METADATA', res.data.value);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // if user remove covers of book, delete them
        if (payload.removeCovers.length > 0) {
          Vue.axios.delete(`${APIBASE}covers`, {
            data: { removeCovers: payload.removeCovers },
          })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
  },
};
