const APIBASE = 'http://localhost:3000/api/';

export default {
  state: {
    summaries: [],
    summaryEditing: false,
    editingSummary: null,
    candidateQuote: null,
    insertQuote: false,
    addSummaryImages: [],
    removeSummaryImages: [],
    changeSummaryImagesSrc: false,
  },
  getters: {},
  mutations: {
    SET_SUMMARIES(state, payload) {
      state.summaries = payload;
    },
    ADD_SUMMARIES(state, payload) {
      state.summaries.push(...payload);
      state.editingSummary = null;
    },
    CLEAR_SUMMARIES(state) {
      state.summaries = [];
    },
    // editing summary
    TOGGLE_SUMMARY_EDITING(state) {
      state.summaryEditing = !state.summaryEditing;
    },
    SET_EDITING_SUMMARY(state, payload) {
      state.editingSummary = payload;
    },
    // summary images
    ADD_SUMMARY_IMAGES(state, payload) {
      if (payload.action === 'add') {
        state.addSummaryImages.push(payload.target);
      } else if (payload.action === 'remove') {
        const index = state.addSummaryImages.find((item) => payload.imageName === item.imageName);
        if (index === -1) return;
        state.addSummaryImages.splice(index, 1);
      } else if (payload.action === 'clear') {
        state.addSummaryImages = [];
      }
    },
    CHANGE_SUMMARY_IMAGES_SRC(state) {
      state.changeSummaryImagesSrc = !state.changeSummaryImagesSrc;
    },
    REMOVE_SUMMARY_IMAGES(state, payload) {
      if (payload.action === 'add') {
        state.removeSummaryImages.push(payload.imageName);
      } else if (payload.action === 'clear') {
        state.removeSummaryImages = [];
      }
    },
    SAVE_SUMMARY_EDITING(state, payload) {
      const index = state.summaries.findIndex((item) => item._id === payload._id);
      Vue.set(state.book.summaries, index, payload);
      state.editingSummary = null;
    },
    CANCEL_SUMMARY_EDITING(state) {
      state.editingSummary = null;
    },
    // insert quote
    SET_CANDIDATE_QUOTE(state, payload) {
      state.candidateQuote = payload;
    },
    INSERT_QUOTE(state) {
      if (state.candidateQuote) state.insertQuote = true;
    },
    CLEAR_INSERT_QUOTE(state) {
      state.insertQuote = false;
      state.candidateQuote = null;
    },
    // delete summary
    DELETE_SUMMARY(state, payload) {
      const index = state.summaries.findIndex((item) => item._id === payload._id);
      state.summaries.splice(index, 1);
    },
  },
  actions: {
    // get summary (summaries)
    getSummaries(context, payload) {
      if (payload) {
        // get summary by summary id or get summaries by book id
        // payload should be { summary_id: id } or { book_id: id }
        Vue.axios.get(`${APIBASE}summaries`, { params: payload })
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // get all summaries by default
        Vue.axios.get(`${APIBASE}summaries`)
          .then((res) => {
            resolve(res.data)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    // set current summaries list
    setSummaries(context, payload) {
      context.commit('SET_SUMMARIES', payload)
    },
    // push summary (summaries) to current summaries list
    addSummaries(context, payload) {
      context.commit('ADD_SUMMARIES', payload);
    },
    // clear current summaries list before the book component destroy
    clearQuotes() {
      context.commit('CLEAR_SUMMARIES')
    },
    // edit summary
    toggleSummaryEditing(context) {
      context.commit('TOGGLE_SUMMARY_EDITING');
    },
    setEditingSummary(context, payload) {
      context.commit('SET_EDITING_SUMMARY', payload);
    },
    saveSummaryImagesChange(context) {
      return new Promise((resolve, reject) => {
        if (context.state.addSummaryImages.length > 0) {
          const formData = new FormData();

          context.state.addSummaryImages.forEach((image) => {
            formData.append('image', image.file, image.imageName);
          });

          Vue.axios.post(`${APIBASE}images/summary`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(() => {
              context.dispatch('changeSummaryImagesSrc');
              context.commit('ADD_SUMMARY_IMAGES', { action: 'clear' });
              resolve('images uploaded');
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log('no images uploaded');
          context.dispatch('changeSummaryImagesSrc');
          resolve('no images uploaded');
        }

        if (context.state.removeSummaryImages.length > 0) {
          Vue.axios.post(`${APIBASE}images/summary`, { removeImages: context.state.removeSummaryImages })
            .then(() => {
              context.dispatch('removeImages', { action: 'clear' });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    changeSummaryImagesSrc(context) {
      context.commit('CHANGE_SUMMARY_IMAGES_SRC')
    },
    removeSummaryImages(context, payload) {
      context.commit('REMOVE_SUMMARY_IMAGES', payload);
    },
    saveSummaryEditing(context, payload) {
      return new Promise((resolve, reject) => {
        if (/new$/.test(payload.id)) {
          const summary = {};
          summary.chapter = payload.chapter;
          summary.content = payload.content;
          Vue.axios.post(`${APIBASE}summaries`, { summaries: [summary] })
            .then((res) => {
              // context.commit('ADD_BOOK_SUMMARY', res.data.summary);
              // context.commit('TOGGLE_CHANGE_IMAGES_SRC', { type: 'Summary' });
              resolve(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          Vue.axios.put(`${APIBASE}summaries/${payload.id}`, { summary: payload })
            .then((res) => {
              context.commit('SAVE_SUMMARY_EDITING', res.data);
              // context.commit('TOGGLE_CHANGE_IMAGES_SRC', { type: 'Summary' });
              resolve([res.data]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    // insert quote
    setCandidateQuote(context, payload) {
      context.commit('SET_CANDIDATE_QUOTE', payload);
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
    cancelSummaryEditing(context) {
      context.commit('CANCEL_SUMMARY_EDITING');
    },
    // delete summary
    deleteSummary(context, payload) {
      Vue.axios.delete(`${APIBASE}summaries`, { summary_ids: payload })
        .then((res) => {
          context.commit('DELETE_SUMMARY', res.data);
        });
    },
  }
}