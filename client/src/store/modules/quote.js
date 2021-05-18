import Vue from 'vue';

const APIBASE = 'http://localhost:3000/api/';

export default {
  state: {
    quotes: [],
    quoteEditing: false,
    quoteEditingState: false,
    editingQuote: null,
    addingCommentQuote: null,
    addQuoteImages: [],
    removeQuoteImages: [],
    changeQuoteImagesSrc: false,
  },
  getters: {},
  mutations: {
    SET_QUOTES(state, payload) {
      state.quotes = payload;
    },
    ADD_QUOTES(state, payload) {
      state.quotes.push(...payload);
      state.editingQuote = null;
      state.addingCommentQuote = null;
    },
    CLEAR_QUOTES(state) {
      state.quotes = [];
    },
    // import quote
    SET_CONTENT_ORIGIN(state, payload) {
      const book = state.booksList.find((item) => item.metadata.titles[0] === payload.bookTitle);
      if (book) {
        const index = book.quotes.findIndex((quote) => quote.id === payload.id);
        if (index === -1) return;
        if (payload.type === 'quote') {
          book.quotes[index].content_origin = payload.content;
        } else if (payload.type === 'comment') {
          book.quotes[index].commentOrigin = payload.content;
        }
      }
    },
    // editing quote
    TOGGLE_QUOTE_EDITING(state) {
      state.quoteEditing = !state.quoteEditing;
    },
    TOGGLE_QUOTE_EDITING_STATE(state) {
      state.quoteEditingState = !state.quoteEditingState;
    },
    SET_EDITING_QUOTE(state, payload) {
      state.editingQuote = payload;
    },
    ACTIVE_ADDING_COMMENT(state, payload) {
      state.addingCommentQuote = payload;
    },
    // quote images
    ADD_QUOTE_IMAGES(state, payload) {
      if (payload.action === 'add') {
        state.addQuoteImages.push(payload.target);
      } else if (payload.action === 'remove') {
        const index = state.addQuoteImages.find((item) => payload.imageName === item.imageName);
        if (index === -1) return;
        state.addQuoteImages.splice(index, 1);
      } else if (payload.action === 'clear') {
        state.addQuoteImages = [];
      }
    },
    CHANGE_QUOTE_IMAGES_SRC(state) {
      state.changeQuoteImagesSrc = !state.changeQuoteImagesSrc;
    },
    REMOVE_QUOTE_IMAGES(state, payload) {
      if (payload.action === 'add') {
        state.removeQuoteImages.push(payload.imageName);
      } else if (payload.action === 'clear') {
        // console.log('clear removeQuoteImages');
        state.removeQuoteImages = [];
      }
    },
    SAVE_QUOTE_EDITING(state, payload) {
      const index = state.quotes.findIndex((item) => item._id === payload._id);
      Vue.set(state.quotes, index, payload);
      state.editingQuote = null;
      state.addingCommentQuote = null;
    },
    CANCEL_QUOTE_EDITING(state) {
      state.editingQuote = null;
      state.addingCommentQuote = null;
    },
    // delete quote
    DELETE_QUOTES(state, payload) {
      payload.forEach((id) => {
        const index = state.quotes.findIndex((item) => item._id === id);
        state.quotes.splice(index, 1);
      });
    },
  },
  actions: {
    // get quote(s)
    getQuotes(context, payload) {
      return new Promise((resolve, reject) => {
        if (payload) {
          // get quote by quote id or get quotes by book id
          // payload should be { quote_id: id } or { book_id: id }
          Vue.axios.get(`${APIBASE}quotes`, { params: payload })
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // get all quotes by default
          Vue.axios.get(`${APIBASE}quotes`)
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    // set current quotes list
    setQuotes(context, payload) {
      context.commit('SET_QUOTES', payload);
    },
    // push quote(s) to current quotes list
    addQuotes(context, payload) {
      context.commit('ADD_QUOTES', payload);
    },
    // clear current quotes list before the book component destroy
    clearQuotes(context) {
      context.commit('CLEAR_QUOTES');
    },
    // import quote(s)
    // get match book information (metadata, quotes)
    // quotes will "import" to this match book
    getMatchBook(context, payload) {
      const matchBook = {};
      return new Promise((resolve, reject) => {
        context.dispatch('getBook', {
          id: payload.id,
          query: {
            fields: ['metadata', 'quote_ids'],
          },
        })
          .then((data) => {
            matchBook._id = data._id;
            matchBook.metadata = data.metadata;
            if (data.quote_ids.length > 0) {
              context.dispatch('getQuotes', { book_id: payload.id })
                .then((quotes) => {
                  matchBook.quotes = quotes;
                  resolve(matchBook);
                });
            } else {
              matchBook.quotes = [];
              resolve(matchBook);
            }
          });
      });
    },
    // import conflictive quote
    // by change original quote's content_origin or comment_origin
    setContentOrigin(context, payload) {
      return new Promise((resolve, reject) => {
        let field = '';
        if (payload.type === 'quote') {
          field = 'content_origin';
        } else if (payload.type === 'comment') {
          field = 'comment_origin';
        }

        Vue.axios.put(`${APIBASE}quotes/${payload.quote_id}/${field}`, { content: payload.content })
          .then((res) => {
            resolve(res.data[field]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    // import new quote(s)
    importQuotes(context, payload) {
      return new Promise((resolve, reject) => {
        Vue.axios.post(`${APIBASE}quotes`, { quotes: payload.quotes, book_id: payload.matchBookId })
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    // edit quote
    toggleQuoteEditing(context) {
      context.commit('TOGGLE_QUOTE_EDITING');
    },
    toggleQuoteEditingState(context, payload) {
      context.commit('TOGGLE_QUOTE_EDITING_STATE');
    },
    setEditingQuote(context, payload) {
      context.commit('SET_EDITING_QUOTE', payload);
    },
    activeAddingComment(context, payload) {
      context.commit('ACTIVE_ADDING_COMMENT', payload);
    },
    saveQuoteImagesChange(context) {
      return new Promise((resolve, reject) => {
        if (context.state.addQuoteImages.length > 0) {
          const formData = new FormData();

          context.state.addQuoteImages.forEach((image) => {
            formData.append('image', image.file, image.imageName);
          });

          Vue.axios.post(`${APIBASE}images/quote`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(() => {
              context.dispatch('changeQuoteImagesSrc');
              context.dispatch('addQuoteImages', { action: 'clear' });
              resolve('images uploaded');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          context.dispatch('changeQuoteImagesSrc');
          resolve('no images uploaded');
        }

        if (context.state.removeQuoteImages.length > 0) {
          console.log(`remove images: ${context.state.removeQuoteImages}`);
          Vue.axios.delete(`${APIBASE}images/quote`, {
            data: { removeImages: context.state.removeQuoteImages },
          })
            .then(() => {
              context.dispatch('removeQuoteImages', { action: 'clear' });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    changeQuoteImagesSrc(context) {
      context.commit('CHANGE_QUOTE_IMAGES_SRC');
    },
    addQuoteImages(context, payload) {
      context.commit('ADD_QUOTE_IMAGES', payload);
    },
    removeQuoteImages(context, payload) {
      context.commit('REMOVE_QUOTE_IMAGES', payload);
    },
    saveQuoteEditing(context, payload) {
      return new Promise((resolve, reject) => {
        if (/new$/.test(payload.id)) {
          // if the quote is new to create
          // don't send the _id field to backend
          const quote = {};
          quote.book = payload.book;
          quote.chapter = payload.chapter;
          quote.location = payload.location;
          quote.content = payload.content;
          quote.comment = payload.comment;
          quote.type = payload.type;
          Vue.axios.post(`${APIBASE}quotes`, { quotes: [quote], book_id: payload.book })
            .then((res) => {
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          // if the quote exist
          // send all the fields to backend
          Vue.axios.put(`${APIBASE}quotes/${payload.id}/all`,
            {
              field: 'all',
              quote: payload,
            })
            .then((res) => {
              context.commit('SAVE_QUOTE_EDITING', res.data);
              resolve([res.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    cancelQuoteEditing(context) {
      context.dispatch('addQuoteImages', { action: 'clear' });
      context.dispatch('removeQuoteImages', { action: 'clear' });
      context.commit('CANCEL_QUOTE_EDITING');
    },
    // delete quote
    deleteQuotes(context, payload) {
      Vue.axios.delete(`${APIBASE}quotes`, { data: payload })
        .then((res) => {
          context.commit('DELETE_QUOTES', res.data);
        });
    },

  },
};
