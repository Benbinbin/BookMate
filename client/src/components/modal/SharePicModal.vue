<template>
  <div class="bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div
      class="share-modal-container w-11/12 h-4/5 flex flex-col rounded-lg bg-white"
    >
      <div
        class="modal-header px-1 flex justify-between items-center border-b-2 border-gray-100"
      >
        <div></div>
        <h1 class="font-bold text-sm text-gray-400">分享</h1>
        <button
          class="left w-8 h-8 flex items-center rounded-full p-1 text-red-300 opacity-60 hover:opacity-100"
          @click="$store.dispatch('closeSharePicModal')"
        >
          <svg
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 4.16669C20.8795 4.16669 16.8516 5.38854 13.4256 7.67774C9.99956 9.96693 7.3293 13.2207 5.75248 17.0274C4.17565 20.8342 3.76308 25.0231 4.56694 29.0644C5.3708 33.1057 7.35498 36.8178 10.2686 39.7314C13.1822 42.645 16.8943 44.6292 20.9356 45.433C24.9769 46.2369 29.1657 45.8243 32.9725 44.2475C36.7793 42.6707 40.0331 40.0004 42.3222 36.5744C44.6114 33.1484 45.8333 29.1205 45.8333 25C45.8333 22.2641 45.2944 19.5551 44.2475 17.0274C43.2005 14.4998 41.6659 12.2032 39.7314 10.2686C37.7968 8.33407 35.5002 6.7995 32.9725 5.75253C30.4449 4.70556 27.7358 4.16669 25 4.16669ZM25 41.6667C21.7036 41.6667 18.4813 40.6892 15.7405 38.8578C12.9996 37.0265 10.8634 34.4235 9.60198 31.3781C8.34052 28.3326 8.01046 24.9815 8.65355 21.7485C9.29663 18.5155 10.884 15.5458 13.2149 13.2149C15.5457 10.884 18.5154 9.29669 21.7485 8.6536C24.9815 8.01051 28.3326 8.34057 31.378 9.60203C34.4235 10.8635 37.0264 12.9997 38.8578 15.7405C40.6891 18.4813 41.6666 21.7037 41.6666 25C41.6666 29.4203 39.9107 33.6595 36.7851 36.7851C33.6595 39.9107 29.4202 41.6667 25 41.6667Z"
            />
            <path
              d="M30.6458 19.3542C30.4522 19.1589 30.2217 19.0039 29.9679 18.8981C29.714 18.7924 29.4417 18.7379 29.1667 18.7379C28.8916 18.7379 28.6193 18.7924 28.3655 18.8981C28.1116 19.0039 27.8812 19.1589 27.6875 19.3542L25 22.0625L22.3125 19.3542C21.9202 18.9619 21.3881 18.7415 20.8333 18.7415C20.2785 18.7415 19.7465 18.9619 19.3542 19.3542C18.9619 19.7465 18.7415 20.2785 18.7415 20.8333C18.7415 21.3881 18.9619 21.9202 19.3542 22.3125L22.0625 25L19.3542 27.6875C19.1589 27.8812 19.0039 28.1116 18.8981 28.3655C18.7924 28.6193 18.7379 28.8916 18.7379 29.1667C18.7379 29.4417 18.7924 29.714 18.8981 29.9679C19.0039 30.2217 19.1589 30.4522 19.3542 30.6458C19.5478 30.8411 19.7783 30.9961 20.0321 31.1019C20.286 31.2076 20.5583 31.2621 20.8333 31.2621C21.1084 31.2621 21.3807 31.2076 21.6345 31.1019C21.8884 30.9961 22.1188 30.8411 22.3125 30.6458L25 27.9375L27.6875 30.6458C27.8812 30.8411 28.1116 30.9961 28.3655 31.1019C28.6193 31.2076 28.8916 31.2621 29.1667 31.2621C29.4417 31.2621 29.714 31.2076 29.9679 31.1019C30.2217 30.9961 30.4522 30.8411 30.6458 30.6458C30.8411 30.4522 30.9961 30.2217 31.1019 29.9679C31.2076 29.714 31.2621 29.4417 31.2621 29.1667C31.2621 28.8916 31.2076 28.6193 31.1019 28.3655C30.9961 28.1116 30.8411 27.8812 30.6458 27.6875L27.9375 25L30.6458 22.3125C30.8411 22.1188 30.9961 21.8884 31.1019 21.6345C31.2076 21.3807 31.2621 21.1084 31.2621 20.8333C31.2621 20.5583 31.2076 20.286 31.1019 20.0321C30.9961 19.7783 30.8411 19.5478 30.6458 19.3542Z"
            />
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="cards-container m-4 flex justify-center space-x-4">
          <div
            v-for="item of sharePicContent"
            :key="item._id"
            class="card-container relative"
          >
            <div :ref="item._id" class="share-card p-8 bg-white">
              <div class="border relative rounded-t-lg">
                <div class="absolute inset-0">
                  <img
                    src="@/assets/icons/quote.svg"
                    alt="quote icon"
                    class="quote-icon w-20 h-20 m-4"
                  />
                </div>
                <div class="card-header pt-4 px-5 flex justify-end"></div>
                <div class="card-body m-8">
                  <div
                    class="my-4 text-gray-800 text-lg"
                    v-html="item.quote"
                  ></div>
                  <div v-if="item.comment" class="my-4 flex">
                    <img
                      src="@/assets/icons/edit.svg"
                      alt="comment icon"
                      class="w-5 h-5 mt-3 opacity-20"
                    />
                    <div
                      class="comment-content ml-1.5 text-blue-900 text-sm"
                      v-html="item.comment"
                    ></div>
                  </div>
                </div>
              </div>

              <div
                class="card-footer py-6 px-5 flex justify-between bg-gray-200 rounded-b-lg"
              >
                <div class="left flex items-end">
                  <img
                    v-if="book && book.metadata.covers.length > 0"
                    :src="`${coverBase}${book.metadata.covers[0]}`"
                    alt="book cover"
                    class="w-12"
                    crossorigin="anonymous"
                  />
                  <div class="ml-2 text-xs text-gray-400 space-y-1">
                    <p>书籍：《{{ book.metadata.titles[0] }}》</p>
                    <p v-if="item.chapter">章节：{{ item.chapter }}</p>
                    <p v-if="item.location">页码：{{ item.location }}</p>
                  </div>
                </div>
                <div class="right flex items-end">
                  <img
                    src="logos/BookMate-logo-font-2.svg"
                    alt="BookMate Logo"
                    class="w-20"
                  />
                </div>
              </div>
            </div>
            <div
              class="download hidden absolute inset-0 bg-gray-300 opacity-80 z-10"
            >
              <button
                class="w-full h-full flex justify-center items-center"
                @click="downloadHandler(item)"
              >
                <img
                  src="@/assets/icons/export.svg"
                  alt="download icon"
                  class="w-1/5 z-10"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as htmlToImage from 'html-to-image';

import hljs from 'highlight.js';

export default {
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      imageBase: process.env.VUE_APP_QUOTE_IMAGES_BASE,
    };
  },
  computed: {
    ...mapState({
      book: (state) => state.book.book,
      sharePicContent: (state) => state.sharePicContent,
    }),
  },
  methods: {
    downloadHandler(item) {
      const dom = this.$refs[item._id][0];
      const scale = 4;
      const style = {
        transform: `scale(${scale})`,
        'transform-origin': 'top left',
        width: `${dom.offsetWidth}px`,
        height: `${dom.offsetHeight}px`,
      };

      const param = {
        height: dom.offsetHeight * scale,
        width: dom.offsetWidth * scale,
        style,
      };

      htmlToImage
        .toPng(dom, param)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `书名-《${
            this.book.metadata.titles[0] || 'book'
          }》-章节-${item.chapter || '未分类'}-页码-${
            item.location || '未知'
          }.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    },
  },
  mounted() {
    hljs.highlightAll();
  },
};
</script>

<style lang="scss" scoped>
.modal-body {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}
.cards-container {
  overflow-x: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.card-container {
  max-width: 40%;

  &:hover {
    .download {
      display: flex;
    }
  }
}

.share-card {
  // &::before {
  //   content: "";
  //   position: absolute;
  //   top: 0px;
  //   right: 0px;
  //   bottom: 0px;
  //   left: 0px;
  //   background-image: url("../assets/icons/quote.svg");
  //   background-repeat: no-repeat;
  //   background-position: 1rem 0.25rem;
  //   opacity: 0.03;
  //   z-index: 10;
  // }
  .quote-icon {
    opacity: 0.03;
  }
}
</style>
