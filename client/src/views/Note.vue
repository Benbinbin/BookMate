<template>
  <div class="h-screen w-screen flex">
    <aside
      class="w-20 flex-shrink-0 flex flex-col justify-center items-center bg-gray-100"
    >
      <div class="profile flex-shrink-0 h-16 flex justify-center items-center">
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
      </div>
      <img
        v-if="book"
        :src="`covers/${book.metadata.covers[0]}`"
        alt="book cover"
        class="w-16 my-4"
      />
      <div class="menu flex-grow py-4 space-y-4 overflow-y-auto">
        <button
          v-for="item of menuButtons"
          :key="item.icon"
          class="w-12 h-12 flex-shrink-0 flex justify-center items-center rounded-full hover:opacity-80"
          :class="{
            'bg-gray-200 opacity-60': !item.active,
            'bg-white': item.active,
          }"
          @click="toggle(item)"
        >
          <img
            :src="require(`@/assets/icons/${item.icon}.svg`)"
            :alt="`${item.icon} icon`"
            class="w-7 h-7"
          />
        </button>
      </div>
      <div class="back flex-shrink-0 py-4">
        <button
          class="w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 opacity-60 hover:opacity-80"
          @click="$router.push({ name: 'Home' })"
        >
          <img
            :src="require(`@/assets/icons/home.svg`)"
            alt="back to home icon"
            class="w-7 h-7"
          />
        </button>
      </div>
    </aside>
    <div class="split-container flex flex-grow">
      <div
        v-show="menuButtons.find((item) => item.icon === 'info').active"
        id="split-left"
        class="border-2 border-gray-200 flex-grow flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-200">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">简介</h2>
          </div>
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
        class="border-2 border-gray-200 flex-grow flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">概述</h2>
          </div>
        </nav>
        <!-- <summaries-list
          v-if="book && book.summaries.length > 1"
          :summaries="book.summaries"
          :summaries-chapters="chaptersWithSummaries"
          class="flex-grow"
        ></summaries-list> -->
      </div>
      <div
        v-show="menuButtons.find((item) => item.icon === 'quote').active"
        id="split-right"
        class="border-2 border-gray-200 flex-grow flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">书摘</h2>
          </div>
        </nav>
        <quotes-list
          v-if="book && book.quotes.length > 1"
          :quotes="book.quotes"
          :quotes-chapters="chaptersWithQuotes"
          class="flex-grow"
        ></quotes-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Split from 'split.js';
import BookInfo from '../components/BookInfo.vue';
import QuotesList from '../components/QuotesList.vue';
// import SummariesList from '../components/SummariesList.vue';

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
    // SummariesList,
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

      console.log(this.containersArr);

      if (this.containersArr.length > 1) {
        // set containers size
        let containersSize = [];

        switch (this.containersArr.length) {
          case 2:
            if (this.containersArr.includes('#split-left')) {
              containersSize = [30, 70];
            } else {
              containersSize = [50, 50];
            }
            break;
          case 3:
            containersSize = [20, 50, 30];
            break;
          default:
            break;
        }

        console.log(containersSize);

        this.spliter = Split(this.containersArr, {
          sizes: containersSize,
          minSize: 300,
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
      minSize: 300,
      expandToMin: true,
      gutterSize: 5,
      snapOffset: 0,
    });
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
    const isbn = Number(this.$route.params.id);
    this.$store.dispatch('getBook', {
      isbn,
    });
  },
};
</script>

<style lang="scss" scoped>
.menu::-webkit-scrollbar {
  display: none;
}
</style>

<style lang="scss">
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
