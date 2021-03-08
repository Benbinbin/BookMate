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
      <div id="introduction" class="border-2 border-gray-200 flex flex-col">
        <nav class="h-16 border-b-2 border-gray-200">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">简介</h2>
          </div>
        </nav>
        <div ref="introduction-main" v-if="book" class="px-3 py-6 overflow-y-auto">
          <div class="grid grid-cols-2 gap-3">
            <div
              class="cover bg-contain bg-no-repeat bg-top"
              :style="{
                backgroundImage: `url(covers/${book.metadata.covers[0]})`,
              }"
            ></div>
            <div class="space-y-3">
              <div class="space-y-1.5">
                <h2 class="text-2xl font-bold">
                  {{ book.metadata.titles[0] }}
                </h2>
                <star-rating
                  :rating="book.metadata.stars"
                  :star-size="15"
                  :show-rating="false"
                  :read-only="true"
                  :active-color="'#9CA3AF'"
                  :inactive-color="'#E5E7EB'"
                >
                </star-rating>
              </div>
              <div class="space-y-1.5 text-xs">
                <p>作者：{{ book.metadata.authors.join("、") }}</p>
                <p>ISBN：{{ book.metadata.isbn }}</p>
              </div>
              <button
                class="flex justify-center items-center py-1 px-2 rounded text-white"
                :class="{
                  'bg-blue-300': !showCategory,
                  'bg-blue-500': showCategory,
                }"
                @click="showCategory = !showCategory"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33333 16.6667C9.48393 16.6667 10.4167 15.7339 10.4167 14.5833C10.4167 13.4327 9.48393 12.5 8.33333 12.5C7.18274 12.5 6.25 13.4327 6.25 14.5833C6.25 15.7339 7.18274 16.6667 8.33333 16.6667Z"
                  />
                  <path
                    d="M8.33333 27.0833C9.48393 27.0833 10.4167 26.1506 10.4167 25C10.4167 23.8494 9.48393 22.9166 8.33333 22.9166C7.18274 22.9166 6.25 23.8494 6.25 25C6.25 26.1506 7.18274 27.0833 8.33333 27.0833Z"
                  />
                  <path
                    d="M8.33333 37.5C9.48393 37.5 10.4167 36.5673 10.4167 35.4167C10.4167 34.2661 9.48393 33.3334 8.33333 33.3334C7.18274 33.3334 6.25 34.2661 6.25 35.4167C6.25 36.5673 7.18274 37.5 8.33333 37.5Z"
                  />
                  <path
                    d="M41.7916 22.9166H16.5416C15.4601 22.9166 14.5833 23.7934 14.5833 24.875V25.125C14.5833 26.2065 15.4601 27.0833 16.5416 27.0833H41.7916C42.8732 27.0833 43.75 26.2065 43.75 25.125V24.875C43.75 23.7934 42.8732 22.9166 41.7916 22.9166Z"
                  />
                  <path
                    d="M41.7916 33.3334H16.5416C15.4601 33.3334 14.5833 34.2102 14.5833 35.2917V35.5417C14.5833 36.6233 15.4601 37.5 16.5416 37.5H41.7916C42.8732 37.5 43.75 36.6233 43.75 35.5417V35.2917C43.75 34.2102 42.8732 33.3334 41.7916 33.3334Z"
                  />
                  <path
                    d="M41.7916 12.5H16.5416C15.4601 12.5 14.5833 13.3768 14.5833 14.4583V14.7083C14.5833 15.7899 15.4601 16.6667 16.5416 16.6667H41.7916C42.8732 16.6667 43.75 15.7899 43.75 14.7083V14.4583C43.75 13.3768 42.8732 12.5 41.7916 12.5Z"
                  />
                </svg>
                <span class="text-sm font-bold ml-1.5">目录</span>
              </button>
              <div class="flex items-start space-x-2">
                <img
                  src="@/assets/icons/folder.svg"
                  alt="folder icon"
                  class="w-6 h-6 opacity-60"
                />
                <ul
                  class="collections flex-grow flex space-x-1.5 overflow-x-auto"
                >
                  <li
                    v-for="item in book.metadata.collections"
                    :key="item"
                    class="flex-shrink-0 py-1 px-1.5 bg-blue-300 text-white text-xs rounded overflow-x-auto"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div class="space-x-1">
                <button v-for="item of infoButtons" :key="item.icon">
                  <img
                    :src="require(`@/assets/icons/${item.icon}.svg`)"
                    :alt="`${item.icon} icon`"
                    class="w-6 h-6"
                    :class="{
                      'opacity-60': item.active,
                      'opacity-30': !item.active,
                    }"
                  />
                </button>
              </div>
            </div>
          </div>
          <div class="flex items-start space-x-2 my-4">
            <img
              src="@/assets/icons/tag.svg"
              alt="tag icon"
              class="w-6 h-6 opacity-60"
            />
            <ul class="tags flex-grow flex space-x-1.5 overflow-x-auto">
              <li
                v-for="item in book.metadata.tags"
                :key="item"
                class="flex-shrink-0 py-1 px-1.5 bg-gray-200 text-gray-400 text-xs rounded overflow-x-auto"
              >
                #{{ item }}
              </li>
            </ul>
          </div>
          <p class="my-8">
            {{ book.metadata.description }}
          </p>
          <footer class="my-12 items-center">
            <hr class="mx-auto w-1/2" />
            <div class="h-full flex justify-center items-center">
              <button
                @click="backToTopHandler('introduction-main')"
                class="text-blue-400 font-bold my-4"
              >
                返回顶部
              </button>
            </div>
          </footer>
        </div>
      </div>
      <div id="notes-container" class="border-2 border-gray-200">
        <nav class="h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">笔记</h2>
          </div>
        </nav>
      </div>
      <div id="quotes-container" class="border-2 border-gray-200">
        <nav class="h-16 border-b-2 border-gray-20">
          <div class="default w-full h-full flex items-center justify-center">
            <h2 class="text-xl font-bold">书摘</h2>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Split from 'split.js';
import StarRating from 'vue-star-rating';

export default {
  components: {
    StarRating,
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
      infoButtons: [
        {
          icon: 'like',
          active: true,
        },
        {
          icon: 'reading',
          active: true,
        },
        {
          icon: 'read-it-later',
          active: false,
        },
        {
          icon: 'buy',
          active: false,
        },
      ],
      showCategory: false,
    };
  },
  computed: {
    ...mapState(['book']),
  },
  methods: {
    backToTopHandler(el) {
      console.log(this.$refs[el]);
      this.$refs[el].scrollTop = 0;
    },
  },
  mounted() {
    Split(['#introduction', '#notes-container', '#quotes-container'], {
      sizes: [20, 50, 30],
      minSize: [300, 400, 300],
      gutterSize: 4,
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

// .menu::-webkit-scrollbar {
//   display: none;
// }

.collections {
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.tags {
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}
</style>

<style lang="scss">
.gutter {
  cursor: ew-resize;
  background-color: rgba(243, 244, 246, 1);
  transition: all;
  transition-duration: 200ms;
  &:hover {
    transform: scaleX(3);
    background-color: rgba(209, 213, 219, 0.5);
  }
}
</style>
