<template>
  <div class="home-container h-screen w-screen flex">
    <aside class="flex flex-col bg-gray-100 min-w-max">
      <div
        class="profile flex-shrink-0 border-b-2 h-20 lg:h-24 flex justify-center items-center"
      >
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
        <p class="text-3xl ml-2">{{ user }}</p>
      </div>
      <div
        class="category flex-grow px-4 xl:px-14 py-12 space-y-6 overflow-y-auto"
      >
        <button
          v-for="item of asideButtons"
          :key="item.icon"
          class="flex items-center px-4 py-3 rounded-lg w-full text-gray-600 hover:opacity-100"
          :class="asideButtonColor(item)"
          @click="changeTab(item)"
        >
          <img
            :src="require(`@/assets/icons/${item.icon}.svg`)"
            :alt="item.name"
            class="w-8 h-8"
            :class="{ 'opacity-50': item.icon !== activeTab.icon }"
          />
          <p class="ml-4 xl:text-lg font-bold">{{ item.name }}</p>
        </button>
      </div>
      <div
        class="add flex-shrink-0 border-t-2 h-20 relative flex items-center px-4 xl:px-14"
      >
        <button
          class="flex items-center justify-center px-4 py-3 rounded-lg w-full text-gray-800 bg-gray-200 opacity-60 hover:opacity-100"
          @click="showAddBookModalHandler('customAddBook')"
        >
          <img src="@/assets/icons/add.svg" alt="add" class="w-8 h-8" />
          <p class="font-bold">添加书籍</p>
          <img
            src="@/assets/icons/close-circle.svg"
            alt="close"
            class="w-8 h-8"
            v-show="showAddModal"
          />
        </button>
        <!-- <button
          v-show="!showAddModal"
          class="flex items-center justify-center px-4 py-3 rounded-lg w-full text-gray-800 bg-gray-200 opacity-60 hover:opacity-100"
          @click="showAddModal = true"
        >
          <img src="@/assets/icons/add.svg" alt="add" class="w-8 h-8" />
          <p class="font-bold">添加书籍</p>
          <img
            src="@/assets/icons/close-circle.svg"
            alt="close"
            class="w-8 h-8"
            v-show="showAddModal"
          />
        </button>
        <button
          v-show="showAddModal"
          class="w-full flex items-center justify-center"
          @click="showAddModal = false"
        >
          <img
            src="@/assets/icons/close-circle.svg"
            alt="close"
            class="w-8 h-8"
          />
        </button> -->
        <!-- <div
          class="modal-container absolute inset-x-0 bottom-16 z-10 mx-2"
          v-show="showAddModal"
        >
          <div
            class="modal flex flex-col rounded-xl border-2 border-gray-300 divide-y-2 divide-gray-300 bg-gray-100 shadow-md"
          >
            <button
              class="px-2 py-4 flex justify-center items-center font-bold opacity-40 hover:opacity-80"
              @click="showAddBookModalHandler('scanAddBook')"
            >
              <img
                src="@/assets/icons/scan.svg"
                alt="scan ISBN add book"
                class="w-6"
              />
              <span class="ml-2">扫描条形码</span>
            </button>
            <button
              class="px-2 py-4 flex justify-center items-center font-bold opacity-40 hover:opacity-80"
              @click="showAddBookModalHandler('searchAddBook')"
            >
              <img
                src="@/assets/icons/search.svg"
                alt="search ISBN add book"
                class="w-6"
              />
              <span class="ml-2">搜索 ISBN</span>
            </button>
            <button
              class="px-2 py-4 flex justify-center items-center font-bold opacity-40 hover:opacity-80"
              @click="showAddBookModalHandler('customAddBook')"
            >
              <img
                src="@/assets/icons/edit.svg"
                alt="custom add book"
                class="w-6"
              />
              <span class="ml-2">自定义输入</span>
            </button>
          </div>
        </div> -->
      </div>
    </aside>
    <div class="flex-grow min-w-0 flex flex-col">
      <nav
        class="flex-shrink-0 border-b-2 profile w-full h-20 lg:h-24 px-8 flex items-center justify-between"
      >
        <h1 class="text-5xl">{{ activeTab.name }}</h1>
        <div class="flex items-center">
          <form action="" class="search flex items-center">
            <input
              type="search"
              class="bg-gray-200 rounded-l-lg border-0 h-12 pl-4"
              placeholder="输入关键字进行搜索"
            />
            <button
              type="submit"
              class="bg-gray-200 rounded-r-lg border-0 h-12 pr-2"
            >
              <img
                src="@/assets/icons/search.svg"
                alt="search button"
                class="w-8 h-8"
              />
            </button>
          </form>
          <button class="ml-4">
            <img
              src="@/assets/icons/filter.svg"
              alt="filter button"
              class="w-8 h-8"
            />
          </button>
        </div>
      </nav>
      <main class="px-8 overflow-y-auto" ref="main">
        <keep-alive>
          <component
            :is="activeTab.component"
            @backToTop="backToTopHandler"
          ></component>
        </keep-alive>
      </main>
    </div>
    <book-metadata-modal
      v-if="showModal === 'customAddBook'"
      class="fixed w-screen h-screen inset-0"
      :metadata="newBookMetadata"
      @close-book-modal="closeBookModalHandler"
    ></book-metadata-modal>
  </div>
</template>

<script>
import Bookshelf from '@/components/Bookshelf.vue';
import NotesList from '@/components/NotesList.vue';
import Mindmap from '@/components/Mindmap.vue';
import DataAnalysis from '@/components/DataAnalysis.vue';
import BookMetadataModal from '../components/BookMetadataModal.vue';

export default {
  name: 'Home',
  components: {
    Bookshelf,
    NotesList,
    Mindmap,
    DataAnalysis,
    BookMetadataModal,
  },
  data() {
    return {
      width: 0,
      avatar: require('@/assets/profile.png'),
      user: 'User',
      activeTab: {
        icon: 'library',
        name: '书库',
        component: 'Bookshelf',
      },
      asideButtons: [
        {
          icon: 'library',
          name: '书库',
          component: 'Bookshelf',
        },
        {
          icon: 'notes',
          name: '笔记',
          component: 'NotesList',
        },
        {
          icon: 'mind-map',
          name: '可视化',
          component: 'Mindmap',
        },
        {
          icon: 'analysis',
          name: '分析',
          component: 'DataAnalysis',
        },
      ],
      showAddModal: false,
      showModal: '',
      newBookMetadata: {
        titles: [],
        authors: [],
        translators: [],
        covers: [],
        defaultCollections: [
          {
            name: 'like',
            active: false,
          },
          {
            name: 'reading',
            active: false,
          },
          {
            name: 'read-it-later',
            active: false,
          },
          {
            name: 'buy',
            active: false,
          },
        ],
        collections: [],
        tags: [],
        sources: [],
        links: [],
        press: '',
        isbn: null,
        date: '1970-01-01',
        description: '',
        review: '',
        category: {
          name: '__root__',
        },
        stars: 0,
      },
    };
  },
  methods: {
    asideButtonColor(item) {
      return item.component === this.activeTab.component
        ? 'bg-white'
        : 'bg-gray-200 opacity-60';
    },
    changeTab(btn) {
      this.activeTab = btn;
    },
    backToTopHandler() {
      this.$refs.main.scrollTop = 0;
    },
    showAddBookModalHandler(type) {
      this.showModal = type;
      this.showAddModal = false;
    },
    closeBookModalHandler(payload) {
      if (payload) {
        this.$store.dispatch('addBookMetadata', payload);
      }
      this.showModal = '';
    },
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
    this.user = 'Ben';
    const today = new Date().toISOString().substr(0, 10);
    this.newBookMetadata.date = today;
  },
};
</script>

<style lang="scss" scoped>
.modal {
  button:first-child {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  button:last-child {
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }
}
</style>
