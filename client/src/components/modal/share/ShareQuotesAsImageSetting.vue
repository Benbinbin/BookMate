<template>
  <div class="grid grid-cols-3 gap-x-1" style="height: calc(100% - 160px)">
    <div class="left flex flex-col items-center col-span-1 max-h-full">
      <h2 class="text-lg text-center font-bold">参数设置</h2>
      <div class="py-8 space-y-4">
        <div class="flex items-center space-x-2">
          <label for="width">宽度</label>
          <input
            type="range"
            id="width"
            name="width"
            v-model.number="width"
            min="20"
            max="40"
          />
          <span class="text-xs">{{ width }} rem</span>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="logo" v-model="show.logo" />
          <label for="logo">显示 Logo</label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="cover" v-model="show.cover" />
          <label for="cover">显示封面</label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="title" v-model="show.title" />
          <label for="title">显示书名</label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="chapter" v-model="show.chapter" />
          <label for="chapter">显示章节</label>
        </div>
        <div class="flex items-center space-x-2">
          <input type="checkbox" id="location" v-model="show.location" />
          <label for="location">显示页码</label>
        </div>
      </div>
    </div>
    <div ref="right" class="right col-span-2 max-h-full">
      <h2 class="text-lg text-center font-bold">参考样式</h2>
      <div class="flex flex-col items-center space-y-4">
        <div class="card-container relative">
          <quotes-image
            class="transform scale-75"
            :class="{ 'ring-4 ring-blue-300': selected === 'default' }"
            :type="'default'"
            :width="width"
            :cover="cover"
            :title="title"
            :quote="quote"
            :show="show"
            :action="'show'"
          ></quotes-image>
          <button
            class="w-full h-full absolute inset-0 z-10 focus:outline-none"
            @click="setSelected('default')"
          ></button>
        </div>
        <div class="card-container relative">
          <quotes-image
            class="transform scale-75"
            :class="{ 'ring-4 ring-blue-300': selected === 'defaultDark' }"
            :type="'defaultDark'"
            :width="width"
            :cover="cover"
            :title="title"
            :quote="quote"
            :show="show"
            :action="'show'"
          ></quotes-image>
          <button
            class="w-full h-full absolute inset-0 z-10 focus:outline-none"
            @click="setSelected('defaultDark')"
          ></button>
        </div>

        <footer class="mt-8 mb-4 items-center">
          <hr class="mx-auto" />
          <div class="flex justify-center items-center">
            <button
              @click="backToTopHandler"
              class="text-blue-400 font-bold text-sm my-4"
            >
              返回顶部
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import QuotesImage from './QuotesImage.vue';

export default {
  components: {
    QuotesImage,
  },
  data() {
    return {
      width: 36,
      cover: 'logos/BookMate.svg',
      title: '书名',
      quote: {
        content: '书摘内容',
        comment: '批注内容',
        chapter: '第一章',
        location: '1',
      },
      selected: 'default',
      show: {
        logo: true,
        cover: true,
        comment: true,
        title: true,
        chapter: true,
        location: true,
      },
    };
  },
  watch: {
    width() {
      localStorage.setItem('shareQuoteAsImageWidth', this.width);
    },
    show: {
      handler() {
        localStorage.setItem(
          'shareQuotesAsImageShow',
          JSON.stringify(this.show),
        );
      },
      deep: true,
    },
  },
  methods: {
    backToTopHandler() {
      this.$refs.right.scrollTop = 0;
    },
    setSelected(val) {
      this.selected = val;
      localStorage.setItem('shareQuotesAsImageSelectedType', val);
    },
  },
  created() {
    this.width = +localStorage.getItem('shareQuoteAsImageWidth');
    this.selected = localStorage.getItem('shareQuotesAsImageSelectedType');
    this.show = JSON.parse(localStorage.getItem('shareQuotesAsImageShow'));
  },
};
</script>

<style lang="scss" scoped>
.left,
.right {
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
</style>
