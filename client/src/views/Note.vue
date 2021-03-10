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
          @click="item.active = !item.active"
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
        id="introduction"
        class="border-2 border-gray-200 flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-200">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">简介</h2>
          </div>
        </nav>
        <book-info
          v-if="book && book.metadata"
          :book="book"
          class="flex-grow"
        ></book-info>
      </div>
      <div
        id="notes-container"
        class="border-2 border-gray-200 flex-grow flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">笔记</h2>
          </div>
        </nav>
      </div>
      <div
        v-show="menuButtons.find((item) => item.icon === 'quote').active"
        id="quotes-container"
        class="border-2 border-gray-200 flex-grow flex flex-col"
      >
        <nav class="flex-shrink-0 h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">书摘</h2>
          </div>
        </nav>
        <quotes-list
          v-if="book && book.quotes.length > 1"
          :book="book"
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

export default {
  components: {
    BookInfo,
    QuotesList,
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
    };
  },
  computed: {
    ...mapState(['book']),
  },

  mounted() {
    Split(['#introduction', '#notes-container', '#quotes-container'], {
      sizes: [20, 50, 30],
      minSize: [300, 400, 300],
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
    // transform: scaleX(3);
    background-color: rgba(209, 213, 219, 0.5);
  }
}

// .gutter-horizontal {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   &::after {
//     content: "";
//     display: block;
//     border-radius: 1rem;
//     width: 100%;
//     height: 5rem;
//     background-color: rgba(209, 213, 219, 1);
//   }
// }
</style>
