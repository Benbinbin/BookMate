<template>
  <div class="bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div
      class="book-modal-container w-4/5 h-4/5 flex flex-col rounded-lg bg-white"
    >
      <div
        class="book-modal-header px-1 flex justify-between items-center border-b-2 border-gray-100"
      >
        <button
          class="left w-8 h-8 flex items-center rounded-full p-1 text-red-300 opacity-60 hover:opacity-100"
          @click="closeBookModalHandler('cancel')"
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
        <h1 class="font-bold text-sm text-gray-400">编辑元数据</h1>
        <button
          class="right w-8 h-8 flex items-center rounded-full p-1 text-green-500 opacity-60 hover:opacity-100"
          @click="closeBookModalHandler('save')"
        >
          <svg
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.8333 8.16667C20.4131 8.16667 16.1738 9.92261 13.0482 13.0482C9.92261 16.1738 8.16667 20.4131 8.16667 24.8333C8.16667 29.2536 9.92261 33.4928 13.0482 36.6184C16.1738 39.7441 20.4131 41.5 24.8333 41.5C29.2536 41.5 33.4928 39.7441 36.6184 36.6184C39.7441 33.4928 41.5 29.2536 41.5 24.8333C41.5 20.4131 39.7441 16.1738 36.6184 13.0482C33.4928 9.92261 29.2536 8.16667 24.8333 8.16667V8.16667ZM4 24.8333C4 13.3271 13.3271 4 24.8333 4C36.3396 4 45.6667 13.3271 45.6667 24.8333C45.6667 36.3396 36.3396 45.6667 24.8333 45.6667C13.3271 45.6667 4 36.3396 4 24.8333Z"
            />
            <path
              d="M32.5562 19.1938C32.9468 19.5845 33.1662 20.1143 33.1662 20.6667C33.1662 21.2191 32.9468 21.7489 32.5562 22.1396L24.2229 30.4729C23.8322 30.8635 23.3024 31.0829 22.75 31.0829C22.1976 31.0829 21.6678 30.8635 21.2771 30.4729L17.1104 26.3063C16.9114 26.1141 16.7527 25.8842 16.6435 25.63C16.5343 25.3759 16.4769 25.1025 16.4745 24.8259C16.4721 24.5492 16.5248 24.2749 16.6295 24.0189C16.7343 23.7628 16.889 23.5302 17.0846 23.3346C17.2802 23.139 17.5128 22.9843 17.7688 22.8796C18.0249 22.7748 18.2992 22.7221 18.5758 22.7245C18.8525 22.7269 19.1258 22.7844 19.38 22.8936C19.6342 23.0027 19.8641 23.1615 20.0562 23.3604L22.75 26.0542L29.6104 19.1938C30.0011 18.8032 30.5309 18.5838 31.0833 18.5838C31.6358 18.5838 32.1656 18.8032 32.5562 19.1938V19.1938Z"
            />
          </svg>
        </button>
      </div>
      <div
        class="book-modal-body w-full flex-grow flex"
        style="max-height: calc(100% - 34px)"
      >
        <div ref="left" class="left w-1/5 rounded-bl-lg bg-gray-50 p-2">
          <h2 class="font-bold text-center m-2 text-lg">目录</h2>
          <hr class="w-1/2 mx-auto border-gray-300 mb-4" />
        </div>
        <div ref="right" class="right p-4 flex-grow rounded-br-lg">
          <div class="content-container flex">
            <div class="infomation space-y-4 w-4/5">
              <div class="book-titles text-lg flex flex-col space-y-2">
                <div class="flex items-end">
                  <span class="highlight pr-2 font-bold">书名</span>
                  <button class="tooltip ml-2 flex">
                    <img
                      class="w-5 h-5"
                      src="@/assets/icons/question.svg"
                      alt="question icon"
                    />
                  </button>
                </div>
                <vue-tags-input
                  v-model="title"
                  placeholder="添加书名"
                  :tags="titles"
                  :add-on-blur="false"
                  @tags-changed="(newTitles) => (titles = newTitles)"
                ></vue-tags-input>
              </div>
              <div class="book-authors text-lg space-y-2">
                <h2><span class="highlight pr-2 font-bold">作者</span></h2>
                <vue-tags-input
                  v-model="author"
                  placeholder="添加作者"
                  :tags="authors"
                  :add-on-blur="false"
                  @tags-changed="(newAuthors) => (authors = newAuthors)"
                ></vue-tags-input>
              </div>
              <div class="book-translators text-lg space-y-2">
                <h2><span class="highlight pr-2 font-bold">译者</span></h2>
                <vue-tags-input
                  v-model="translator"
                  placeholder="添加译者"
                  :tags="translators"
                  :add-on-blur="false"
                  @tags-changed="
                    (newTranslators) => (translators = newTranslators)
                  "
                ></vue-tags-input>
              </div>
              <div class="book-isbn text-lg space-y-2">
                <h2><span class="highlight pr-2 font-bold">ISBN</span></h2>
                <input
                  class="block w-full px-2 py-0.5 border text-sm rounded"
                  type="number"
                  v-model="isbn"
                  placeholder="输入 ISBN 码"
                />
              </div>
              <div class="book-press text-lg space-y-2">
                <h2><span class="highlight pr-2 font-bold">出版社</span></h2>
                <input
                  class="block w-full px-2 py-0.5 border text-sm rounded"
                  type="text"
                  v-model="press"
                  placeholder="输入出版社"
                />
              </div>
              <div class="book-date text-lg space-y-2">
                <h2><span class="highlight pr-2 font-bold">出版日期</span></h2>
                <input
                  class="block w-full px-2 py-0.5 border text-sm rounded"
                  type="date"
                  v-model="date"
                />
              </div>
            </div>
            <div class="felx-grow">
              <div class="covers"></div>
              <div class="flex">
                <div class="description">
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="review">
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
              </div>
            </div>
          </div>

          <footer class="mt-8 mb-4 items-center">
            <hr class="mx-auto w-1/2" />
            <div class="flex justify-center items-center">
              <button
                @click="backToTopHandler('right')"
                class="text-blue-400 font-bold text-sm my-4"
              >
                返回顶部
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';

export default {
  props: ['metadata'],
  components: {
    VueTagsInput,
  },
  data() {
    return {
      title: '',
      titles: createTags(this.metadata.titles) || [],
      author: '',
      authors: createTags(this.metadata.authors) || [],
      translator: '',
      translators: createTags(this.metadata.translators) || [],
      defaultCollections: this.metadata.defaultCollections,
      collection: '',
      collections: createTags(this.metadata.collections) || [],
      tag: '',
      tags: createTags(this.metadata.tags) || [],
      sources: createTags(this.metadata.sources) || [],
      links: [],
      isbn: this.metadata.isbn,
      press: this.metadata.press,
      date: this.metadata.date || new Date(),
      description: this.metadata.description || '',
      review: this.metadata.review || '',
      stars: this.metadata.stars || 0,
      covers: this.metadata.covers || [],
    };
  },
  methods: {
    closeBookModalHandler(type) {
      this.$emit('close-book-modal');
    },
    backToTopHandler(target) {
      this.$refs[target].scrollTop = 0;
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.book-modal-body {
  .left,
  .right {
    overflow-y: overlay;
  }

  .left {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0);
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
    }
  }

  .highlight {
    text-decoration: none;
    box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 1);
    color: inherit;
  }

  .tooltip {
    &:hover::after {
      content: "第一个元素显示在页面上";
      margin-left: 0.25rem;
      font-size: 0.75rem;
      line-height: 1rem;
      background: #e5e7eb;
      padding: 0.125rem 0.25rem 0.125rem 0.25rem;
      border-radius: 0.25rem;
      opacity: 70%;
    }
  }
}
</style>

<style lang="scss">
.book-modal-body {
  .ti-input {
    overflow-x: overlay;
    border: none;
  }
  .ti-tags {
    flex-direction: column;
    .ti-tag {
      width: fit-content;
      padding: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-radius: 0.25rem;
      background: #f3f4f6;
      color: black;
      &:hover {
        background: #e5e7eb;
      }
    }
    .ti-deletion-mark {
      background: #fca5a5;
      color: white;
    }
    .ti-new-tag-input-wrapper {
      input {
        border-bottom: 1.5px solid #d1d5db;
        &:focus {
          border-bottom: 1.5px solid #000000;
        }
      }
    }
  }
}
</style>
