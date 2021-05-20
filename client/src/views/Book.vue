<template>
  <div class="book-container h-screen w-screen flex">
    <aside
      class="w-16 flex-shrink-0 flex flex-col justify-center items-center relative bg-gray-100"
    >
      <!-- <div class="profile flex-shrink-0 h-16 flex justify-center items-center">
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
      </div> -->
      <button
        class="back-to-home flex-shrink-0 p-2 my-4 flex justify-center items-center hover:bg-gray-200 rounded-md"
        @click="$router.push({ name: 'Home' })"
      >
        <img
          :src="require(`@/assets/icons/bookmate.svg`)"
          alt="back to home icon"
          class="w-8 h-8"
        />
      </button>
      <div
        class="book-cover w-14 h-16 bg-center bg-no-repeat bg-contain"
        :style="{
          backgroundImage: bookCover,
        }"
      ></div>
      <div class="menu flex-grow py-4 space-y-4 overflow-y-auto">
        <button
          v-for="item of menuButtons"
          :key="item.icon"
          class="w-9 h-9 flex-shrink-0 flex justify-center items-center rounded-full"
          :class="{
            'bg-gray-200 hover:bg-gray-300': !item.active,
            'bg-white hover:bg-gray-300': item.active,
          }"
          @click="toggle(item)"
        >
          <img
            :src="require(`@/assets/icons/${item.icon}.svg`)"
            :alt="`${item.icon} icon`"
            class="w-5 h-5"
          />
        </button>
      </div>
      <div class="flex-shrink-0 space-y-4 pb-4">
        <button
          class="pin relative text-gray-500 w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
          @click="showPinModal = !showPinModal"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.9167 24.7917V35.4167C22.9167 35.9692 23.1362 36.4991 23.5269 36.8898C23.9176 37.2805 24.4475 37.5 25 37.5C25.5525 37.5 26.0824 37.2805 26.4731 36.8898C26.8638 36.4991 27.0833 35.9692 27.0833 35.4167V24.7917C29.6126 24.2754 31.86 22.8384 33.39 20.7592C34.9199 18.68 35.6234 16.1069 35.3639 13.5385C35.1045 10.9702 33.9006 8.58967 31.9857 6.8585C30.0709 5.12732 27.5814 4.16882 25 4.16882C22.4186 4.16882 19.9291 5.12732 18.0143 6.8585C16.0994 8.58967 14.8955 10.9702 14.6361 13.5385C14.3766 16.1069 15.0801 18.68 16.61 20.7592C18.1399 22.8384 20.3874 24.2754 22.9167 24.7917ZM25 8.33336C26.2361 8.33336 27.4445 8.69992 28.4723 9.38668C29.5001 10.0734 30.3012 11.0496 30.7742 12.1916C31.2473 13.3336 31.3711 14.5903 31.1299 15.8027C30.8888 17.0151 30.2935 18.1287 29.4194 19.0028C28.5453 19.8769 27.4317 20.4721 26.2193 20.7133C25.0069 20.9544 23.7503 20.8307 22.6082 20.3576C21.4662 19.8846 20.4901 19.0835 19.8033 18.0557C19.1166 17.0279 18.75 15.8195 18.75 14.5834C18.75 12.9258 19.4085 11.336 20.5806 10.1639C21.7527 8.99184 23.3424 8.33336 25 8.33336ZM33.7708 30.0417C33.4972 29.9842 33.215 29.9812 32.9403 30.0329C32.6655 30.0845 32.4036 30.1897 32.1696 30.3425C31.9355 30.4954 31.7338 30.6928 31.576 30.9236C31.4182 31.1544 31.3075 31.4139 31.25 31.6875C31.1925 31.9611 31.1895 32.2433 31.2412 32.5181C31.2928 32.7928 31.398 33.0547 31.5508 33.2888C31.7037 33.5229 31.9011 33.7246 32.1319 33.8824C32.3627 34.0401 32.6222 34.1509 32.8958 34.2084C37.625 35.1459 39.5833 36.8334 39.5833 37.5C39.5833 38.7084 34.4792 41.6667 25 41.6667C15.5208 41.6667 10.4167 38.7084 10.4167 37.5C10.4167 36.8334 12.375 35.1459 17.1042 34.125C17.3778 34.0676 17.6373 33.9568 17.8681 33.799C18.0989 33.6412 18.2963 33.4396 18.4492 33.2055C18.602 32.9714 18.7072 32.7095 18.7588 32.4348C18.8105 32.16 18.8075 31.8778 18.75 31.6042C18.6925 31.3306 18.5818 31.071 18.424 30.8402C18.2662 30.6095 18.0645 30.412 17.8304 30.2592C17.5964 30.1064 17.3345 30.0011 17.0597 29.9495C16.785 29.8979 16.5028 29.9009 16.2292 29.9584C9.89583 31.4167 6.25 34.1459 6.25 37.5C6.25 42.9792 15.6875 45.8334 25 45.8334C34.3125 45.8334 43.75 42.9792 43.75 37.5C43.75 34.1459 40.1042 31.4167 33.7708 30.0417Z"
            />
          </svg>
          <div
            v-show="pinSum > 0"
            class="pin-sum w-8 h-8 p-1 absolute -top-3 -right-3 flex justify-center items-center transform scale-50 bg-blue-500 text-white rounded-full"
          >
            <span v-show="pinSum < 10" class="font-bold">{{ pinSum }}</span>
            <svg
              v-show="pinSum >= 10"
              class="w-6 h-6"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.6719 22.2168C37.9467 22.2168 37.2512 22.5049 36.7384 23.0177C36.2256 23.5305 35.9375 24.226 35.9375 24.9512C35.9375 25.6764 36.2256 26.3719 36.7384 26.8847C37.2512 27.3975 37.9467 27.6855 38.6719 27.6855C39.3971 27.6855 40.0926 27.3975 40.6054 26.8847C41.1182 26.3719 41.4063 25.6764 41.4063 24.9512C41.4063 24.226 41.1182 23.5305 40.6054 23.0177C40.0926 22.5049 39.3971 22.2168 38.6719 22.2168ZM25 22.2168C24.2748 22.2168 23.5793 22.5049 23.0665 23.0177C22.5537 23.5305 22.2657 24.226 22.2657 24.9512C22.2657 25.6764 22.5537 26.3719 23.0665 26.8847C23.5793 27.3975 24.2748 27.6855 25 27.6855C25.7252 27.6855 26.4207 27.3975 26.9335 26.8847C27.4463 26.3719 27.7344 25.6764 27.7344 24.9512C27.7344 24.226 27.4463 23.5305 26.9335 23.0177C26.4207 22.5049 25.7252 22.2168 25 22.2168ZM11.3282 22.2168C10.603 22.2168 9.90746 22.5049 9.39466 23.0177C8.88187 23.5305 8.59378 24.226 8.59378 24.9512C8.59378 25.6764 8.88187 26.3719 9.39466 26.8847C9.90746 27.3975 10.603 27.6855 11.3282 27.6855C12.0534 27.6855 12.7489 27.3975 13.2616 26.8847C13.7744 26.3719 14.0625 25.6764 14.0625 24.9512C14.0625 24.226 13.7744 23.5305 13.2617 23.0177C12.7489 22.5049 12.0534 22.2168 11.3282 22.2168Z"
              />
            </svg>
          </div>
        </button>
        <!-- <button
          class="back-to-home w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300"
          @click="$router.push({ name: 'Home' })"
        >
          <img
            :src="require(`@/assets/icons/bookmate.svg`)"
            alt="back to home icon"
            class="w-5 h-5"
          />
        </button> -->
      </div>
      <div
        v-show="showPinModal"
        class="pin-modal px-3 absolute bottom-4 -right-36 z-10 bg-gray-100 rounded shadow-md"
      >
        <div class="my-4">
          <h3 class="text-sm font-bold my-3">
            <span class="highlight"
              >Pin
              <span class="text-blue-500">{{ pinQuotesSet.size }}</span>
              篇书摘</span
            >
          </h3>
          <div class="flex flex-col space-y-2">
            <button
              class="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
            >
              查看所有 <span class="text-blue-500">Pin</span> 书摘
            </button>
            <button
              class="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
              @click="clearPinContent('Quotes')"
            >
              取消所有 <span class="text-blue-500">Pin</span> 书摘
            </button>

            <div class="grid grid-cols-3 gap-1">
              <button
                v-for="item of shareFormatList"
                :key="item.title"
                :title="item.title"
                :disabled="pinQuotesSet.size === 0"
                class="w-7 p-1 bg-gray-200 hover:bg-gray-300 text-xs rounded"
                :class="{ 'opacity-10': pinQuotesSet.size === 0 }"
                @click="
                  shareHandler({
                    type: 'quotes',
                    format: item.title,
                  })
                "
              >
                <img :src="`apps/${item.image}`" :alt="`${item.title} icon`" />
              </button>
            </div>
          </div>
        </div>
        <!-- <div class="my-4">
          <h3 class="text-sm font-bold my-3">
            <span class="highlight"
              >Pin
              <span class="text-blue-500">{{ pinSummariesSet.size }}</span>
              篇概述</span
            >
          </h3>
          <div class="flex flex-col space-y-1">
            <button class="p-1 bg-gray-200 hover:bg-gray-300 text-xs rounded">
              查看
            </button>
            <button class="p-1 bg-gray-200 hover:bg-gray-300 text-xs rounded">
              取消
            </button>
            <button class="p-1 bg-gray-200 hover:bg-gray-300 text-xs rounded">
              分享
            </button>
          </div>
        </div> -->
      </div>
    </aside>
    <div
      class="split-container flex flex-grow"
      style="max-width: calc(100% - 4rem)"
    >
      <div
        v-show="menuButtons.find((item) => item.icon === 'info').active"
        id="split-left"
        class="border-gray-200 flex-grow flex flex-col"
      >
        <book-info
          v-if="book"
          :metadata="book.metadata"
          :quotes-chapters="flattenChaptersWithQuotes"
          :summaries-chapters="flattenChaptersWithSummaries"
          class="flex-grow"
        ></book-info>
      </div>
      <div
        v-show="menuButtons.find((item) => item.icon === 'notes').active"
        id="split-middle"
        class="border-gray-200 flex-grow h-full flex"
      >
        <summaries-list
          v-if="book"
          :category="
            book.metadata.category ? book.metadata.category.children : []
          "
          :summaries="summaries"
          :summaries-chapters="flattenChaptersWithSummaries"
          class="flex-grow"
        ></summaries-list>
      </div>
      <div
        v-show="menuButtons.find((item) => item.icon === 'quote').active"
        id="split-right"
        class="border-gray-200 flex-grow h-full flex"
      >
        <quotes-list
          v-if="book"
          :category="
            book.metadata.category ? book.metadata.category.children : []
          "
          :quotes="quotes"
          :quotes-chapters="flattenChaptersWithQuotes"
        ></quotes-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Split from 'split.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css'; // 样式文件

import BookInfo from '../components/BookInfo.vue';
import QuotesList from '../components/QuotesList.vue';
import SummariesList from '../components/SummariesList.vue';

function flatten(root, arr) {
  if (root && Array.isArray(root)) {
    root.forEach((item) => {
      flatten(item, arr);
    });
  } else if (root && root.children) {
    arr.push(root.name);
    flatten(root.children, arr);
  } else if (root) {
    arr.push(root.name);
  }
}

export default {
  components: {
    BookInfo,
    QuotesList,
    SummariesList,
  },
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      avatar: require('@/assets/profile.png'),
      menuButtons: [
        {
          icon: 'info',
          active: true,
        },
        {
          icon: 'notes',
          active: true,
        },
        {
          icon: 'quote',
          active: true,
        },
        // {
        //   icon: 'mind-map',
        //   active: false,
        // },
        // {
        //   icon: 'library',
        //   active: false,
        // },
      ],
      spliter: null,
      containersArr: ['#split-left', '#split-middle', '#split-right'],
      showPinModal: false,
      shareFormatList: [
        {
          title: 'image',
          image: 'image.png',
        },
        {
          title: 'markdown',
          image: 'markdown.png',
        },
        {
          title: 'json',
          image: 'json.png',
        },
        // {
        //   title: 'html',
        //   image: 'html.png',
        // },
        // {
        //   title: 'word',
        //   image: 'word.png',
        // },
      ],
    };
  },
  computed: {
    ...mapState({
      book: (state) => state.book.book,
      quotes: (state) => state.quote.quotes,
      summaries: (state) => state.summary.summaries,
      pinQuotesSet: (state) => state.pin.pinQuotesSet,
      pinSummariesSet: (state) => state.pin.pinSummariesSet,
      pinQuotesSetTracker: (state) => state.pin.pinQuotesSetTracker,
      pinSummariesSetTracker: (state) => state.pin.pinSummariesSetTracker,
    }),
    // get the chapters array with quotes or summaries
    flattenChaptersWithQuotes() {
      return this.flattenChapters(this.quotes);
    },
    flattenChaptersWithSummaries() {
      return this.flattenChapters(this.summaries);
    },
    bookCover() {
      if (this.book && this.book.metadata.covers[0]) {
        return `url(${this.coverBase}${this.book.metadata.covers[0]})`;
      }
      return `url(${require('@/assets/icons/cover.png')})`;
    },
    // pin quotes and summaries
    pinSum() {
      const quotesPinState = this.pinQuotesSetTracker;
      const summariesPinState = this.pinSummariesSetTracker;
      return this.pinQuotesSet.size + this.pinSummariesSet.size;
    },
  },
  methods: {
    getBook() {
      const { id } = this.$route.params;
      this.$store.dispatch('getBook', { id }).then((book) => {
        this.$store.dispatch('setBook', book);
        if (book.quote_ids.length > 0) {
          this.$store.dispatch('getQuotes', { book_id: id }).then((quotes) => {
            this.$store.dispatch('setQuotes', quotes);
            this.$nextTick(() => {
              hljs.highlightAll();
            });
          });
        }
        if (book.summary_ids.length > 0) {
          this.$store
            .dispatch('getSummaries', { book_id: id })
            .then((summaries) => {
              this.$store.dispatch('setSummaries', summaries);
              this.$nextTick(() => {
                hljs.highlightAll();
              });
            });
        }
      });
    },
    toggle(btn) {
      // toggle the btn to show/hidde particular column
      const arr = ['info', 'notes', 'quote'];
      if (arr.includes(btn.icon)) {
        this.toggleSplitContainers(btn);
      } else {
        this.menuButtons.find((item) => item === btn).active = !btn.active;
      }
    },
    toggleSplitContainers(btn) {
      const selectorsMap = {
        info: '#split-left',
        notes: '#split-middle',
        quote: '#split-right',
      };

      if (this.containersArr.length > 1) {
        this.spliter.destroy(true);
      }

      this.menuButtons.find((item) => item === btn).active = !btn.active;

      // set the split containers
      this.containersArr = [];
      this.menuButtons.slice(0, 3).forEach((item) => {
        if (item.active) {
          this.containersArr.push(selectorsMap[item.icon]);
        }
      });

      if (this.containersArr.length > 1) {
        // set containers size
        let containersSize = [];
        let containersMinSize = [];
        switch (this.containersArr.length) {
          case 2:
            if (this.containersArr.includes('#split-left')) {
              containersSize = [30, 70];
              containersMinSize = [280, 350];
            } else {
              containersSize = [50, 50];
              containersMinSize = [350, 350];
            }
            break;
          case 3:
            containersSize = [20, 50, 30];
            containersMinSize = [280, 350, 350];
            break;
          default:
            break;
        }

        this.spliter = Split(this.containersArr, {
          sizes: containersSize,
          minSize: containersMinSize,
          expandToMin: true,
          gutterSize: 5,
          snapOffset: 0,
        });
      }
    },
    flattenChapters(arr) {
      const chaptersSorted = [];

      if (this.book.metadata.category) {
        const chaptersArr = [];
        arr.forEach((item) => {
          if (item.chapter) {
            chaptersArr.push(item.chapter);
          }
        });
        // chapters set extract from quotes or summaries
        const chaptersSet = new Set(chaptersArr);

        // flatten chapters from book category
        const categoryFlatten = [];
        flatten(this.book.metadata.category, categoryFlatten);

        // chapters with content in order
        categoryFlatten.forEach((chapter) => {
          if (chaptersSet.has(chapter)) {
            chaptersSorted.push(chapter);
          }
        });
      }

      return chaptersSorted;
    },
    clearPinContent(val) {
      this.$store.dispatch(`setPin${val}`);
      this.showPinModal = false;
    },
    shareHandler(val) {
      if (val.type === 'quotes') {
        this.$store.dispatch('toggleSharePinQuotes', val.format);
      } else if (val.type === 'summaries') {
        this.$store.dispatch('toggleSharePinQuotes', val.format);
      }
      this.showPinModal = false;
    },
  },
  mounted() {
    this.spliter = Split(this.containersArr, {
      sizes: [20, 50, 30],
      minSize: [250, 350, 350],
      expandToMin: true,
      gutterSize: 5,
      snapOffset: 0,
    });
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
    this.getBook();
  },
  destroyed() {
    // clear the data when leave the page
    this.$store.dispatch('clearBook');
    this.$store.dispatch('clearQuotes');
    this.$store.dispatch('clearSummaries');
  },
};
</script>

<style lang="scss" scoped>
.menu::-webkit-scrollbar {
  display: none;
}

.pin-modal {
  max-height: 10rem;
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.highlight {
  text-decoration: none;
  box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 0.8);
  color: inherit;
}

.book-container {
  background-color: #fcfcfd;
}
</style>

<style lang="scss">
@import "../assets/styles/card.scss";

.gutter {
  cursor: ew-resize;
  background-color: rgba(243, 244, 246, 1);
  transition: all;
  transition-duration: 200ms;
  &:hover {
    background-color: rgba(209, 213, 219, 0.5);
  }
}
</style>
