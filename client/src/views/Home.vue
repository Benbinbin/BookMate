<template>
  <div class="home flex h-screen">
    <aside class="col-span-2 flex flex-col bg-gray-100 max-h-full">
      <div class="profile h-24 lg:h-32 flex justify-center items-center">
        <img :src="avatar" alt="avatar" class="rounded-full w-10 h-10" />
        <p class="text-3xl ml-2">{{ user }}</p>
      </div>
      <div
        class="category flex-grow border-t-2 border-b-2 px-4 xl:px-14 py-14 space-y-6 overflow-x-auto"
      >
        <button
          v-for="item of asideButtons"
          :key="item.icon"
          class="flex items-center px-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none"
          :class="asideButtonColor(item)"
          @click="changeTab(item)"
        >
          <img
            :src="require(`../assets/icons/${item.icon}.svg`)"
            :alt="item.name"
            class="w-8 h-8"
            :class="{ 'opacity-50': item.icon !== activeTab.icon }"
          />
          <p class="ml-4 xl:text-lg font-bold">{{ item.name }}</p>
        </button>
      </div>
      <div class="add h-20 flex items-center px-4 xl:px-14">
        <button
          class="flex items-center justify-center px-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none bg-gray-200 opacity-60 hover:opacity-100"
          @click="addBook"
        >
          <img src="@/assets/icons/add.svg" alt="add" class="w-8 h-8" />
          <p class="ml-4 xl:text-lg font-bold">添加书籍</p>
        </button>
      </div>
    </aside>
    <div class="flex-grow border-2 border-yellow-400">
      <nav
        class="profile h-24 lg:h-32 px-8 border-b-2 flex items-center justify-between"
      >
        <h1 class="text-5xl lg:text-6xl font-medium">{{ activeTab.name }}</h1>
        <div class="flex items-center">
          <form action="" class="search flex items-center">
            <input
              type="search"
              class="bg-gray-200 rounded-l-lg border-0 h-12 pl-4 focus:outline-none"
              placeholder="输入关键字进行搜索"
            />
            <button
              type="submit"
              class="bg-gray-200 rounded-r-lg border-0 h-12 pr-2 focus:outline-none"
            >
              <img
                src="@/assets/icons/search.svg"
                alt="search button"
                class="w-8 h-8"
              />
            </button>
          </form>
          <button class="ml-4 focus:outline-none">
            <img
              src="@/assets/icons/filter.svg"
              alt="filter button"
              class="w-8 h-8"
            />
          </button>
        </div>
      </nav>
      <main class="px-8 py-14">
        <keep-alive>
          <component :is="activeTab.component"></component>
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script>
import Bookshelf from '@/components/Bookshelf.vue';

export default {
  name: 'Home',
  components: {
    Bookshelf,
  },
  data() {
    return {
      avatar: require('@/assets/profile.png'),
      user: 'User',
      activeTab: {
        icon: 'liberray',
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
    };
  },
  methods: {
    asideButtonColor(btn) {
      return btn === this.activeTab
        ? 'bg-white'
        : 'bg-gray-200 text-opacity-50';
    },
    changeTab(btn) {
      this.activeTab = btn;
    },
    addBook() {},
  },
  created() {
    this.avatar = require('@/assets/avatar.png');
    this.user = 'Ben';
  },
};
</script>
