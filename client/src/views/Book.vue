<template>
  <div class="book-container h-screen w-screen flex">
    <aside
      class="w-16 flex-shrink-0 flex flex-col justify-center items-center bg-gray-100"
    >
      <div class="profile flex-shrink-0 h-16 flex justify-center items-center">
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
      </div>
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
          class="w-9 h-9 flex-shrink-0 flex justify-center items-center rounded-full hover:opacity-80"
          :class="{
            'bg-gray-200 opacity-60': !item.active,
            'bg-white': item.active,
          }"
          @click="toggle(item)"
        >
          <img
            :src="require(`@/assets/icons/${item.icon}.svg`)"
            :alt="`${item.icon} icon`"
            class="w-6 h-6"
          />
        </button>
      </div>
      <div class="back flex-shrink-0 py-4">
        <button
          class="w-9 h-9 flex justify-center items-center rounded-full bg-gray-200 opacity-60 hover:opacity-80"
          @click="$router.push({ name: 'Home' })"
        >
          <img
            :src="require(`@/assets/icons/bookmate.svg`)"
            alt="back to home icon"
            class="w-6 h-6"
          />
        </button>
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
    <share-pic-modal
      v-if="showSharePicModal"
      class="fixed w-screen h-screen inset-0"
    ></share-pic-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Split from 'split.js';
import 'highlight.js/styles/googlecode.css'; // 样式文件

import BookInfo from '../components/BookInfo.vue';
import QuotesList from '../components/QuotesList.vue';
import SummariesList from '../components/SummariesList.vue';
import SharePicModal from '../components/modal/SharePicModal.vue';

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
    SharePicModal,
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
        {
          icon: 'mind-map',
          active: false,
        },
        {
          icon: 'library',
          active: false,
        },
      ],
      spliter: null,
      containersArr: ['#split-left', '#split-middle', '#split-right'],
    };
  },
  computed: {
    ...mapState({
      showSharePicModal: (state) => state.showSharePicModal,
      book: (state) => state.book.book,
      quotes: (state) => state.quote.quotes,
      summaries: (state) => state.summary.summaries,
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
      return 'url(@/assets/icons/bookmate.svg)';
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
          });
        }
        if (book.summary_ids.length > 0) {
          this.$store.dispatch('getSummaries', { book_id: id })
            .then((summaries) => {
              this.$store.dispatch('setSummaries', summaries);
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
  },
  mounted() {
    this.spliter = Split(this.containersArr, {
      sizes: [20, 50, 30],
      minSize: [280, 350, 350],
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
</style>

<style lang="scss">
@import "../assets/styles/card.scss";

.book-container {
  background-color: #fcfcfd;
}

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
