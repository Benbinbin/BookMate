<template>
  <div class="note-container h-screen w-screen flex relative">
    <aside
      class="w-16 flex-shrink-0 flex flex-col justify-center items-center bg-gray-100"
    >
      <div class="profile flex-shrink-0 h-16 flex justify-center items-center">
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
      </div>
      <img
        v-if="book"
        :src="`covers/${book.metadata.covers[0]}`"
        alt="book cover"
        class="w-12 my-4"
      />
      <div class="menu flex-grow py-4 space-y-4 overflow-y-auto">
        <button
          v-for="item of menuButtons"
          :key="item.icon"
          class="w-8 h-8 flex-shrink-0 flex justify-center items-center rounded-full hover:opacity-80"
          :class="{
            'bg-gray-200 opacity-60': !item.active,
            'bg-white': item.active,
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
      <div class="back flex-shrink-0 py-4">
        <button
          class="w-8 h-8 flex justify-center items-center rounded-full bg-gray-200 opacity-60 hover:opacity-80"
          @click="$router.push({ name: 'Home' })"
        >
          <img
            :src="require(`@/assets/icons/home.svg`)"
            alt="back to home icon"
            class="w-5 h-5"
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
        <nav
          class="flex-shrink-0 h-16 px-3 flex items-center justify-between border-b-2 border-gray-100"
        >
          <button
            class="flex items-center opacity-30 hover:opacity-80"
            @click="showBookModal = true"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/edit.svg"
              alt="edit icon"
            />
          </button>
          <h2 class="text-xl font-bold">简介</h2>
          <button class="flex items-center opacity-30 hover:opacity-80">
            <img
              class="w-6 h-6"
              src="@/assets/icons/menu.svg"
              alt="menu icon"
            />
          </button>
        </nav>
        <book-info
          v-if="book && book.metadata"
          :metadata="book.metadata"
          :quotes-chapters="chaptersWithQuotes"
          :summaries-chapters="chaptersWithSummaries"
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
          :category="book.metadata.category.children"
          :summaries="book.summaries"
          :summaries-chapters="chaptersWithSummaries"
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
          :category="book.metadata.category.children"
          :quotes="book.quotes"
          :quotes-chapters="chaptersWithQuotes"
        ></quotes-list>
      </div>
    </div>
    <book-metadata-modal
      v-if="book && book.metadata && showBookModal"
      class="absolute inset-0"
      :metadata="book.metadata"
      @close-book-modal="showBookModal = false"
    ></book-metadata-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Split from 'split.js';
import BookInfo from '../components/BookInfo.vue';
import QuotesList from '../components/QuotesList.vue';
import SummariesList from '../components/SummariesList.vue';
import BookMetadataModal from '../components/BookMetadataModal.vue';

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
    BookMetadataModal,
  },
  data() {
    return {
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
      showBookModal: false,
    };
  },
  computed: {
    ...mapState(['book']),
    chaptersWithSummaries() {
      return this.flattenChapters(this.book.summaries);
    },
    chaptersWithQuotes() {
      return this.flattenChapters(this.book.quotes);
    },
  },
  methods: {
    toggle(btn) {
      // toggle the btn active state
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
      // chapters set extract from quotes or summaries
      const chaptersArr = [];
      arr.forEach((item) => {
        if (item.chapter) {
          chaptersArr.push(item.chapter);
        }
      });
      const chaptersSet = new Set(chaptersArr);

      // flatten chapters from book category
      const categoryFlatten = [];
      flatten(this.book.metadata.category, categoryFlatten);

      // chapters with content in order
      const chaptersSorted = [];
      categoryFlatten.forEach((chapter) => {
        if (chaptersSet.has(chapter)) {
          chaptersSorted.push(chapter);
        }
      });
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
    this.$store.dispatch('getBooksList');
    this.avatar = require('@/assets/avatar.png');
    const isbn = Number(this.$route.params.id);
    this.$store.dispatch('getBook', {
      isbn,
    });
  },
  destroyed() {
    this.$store.dispatch('clearBook');
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

.note-container {
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

<style lang="scss">
.vue-treeselect__control {
  height: 100%;
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
