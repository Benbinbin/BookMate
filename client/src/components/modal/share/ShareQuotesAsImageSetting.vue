<template>
  <div class="grid grid-cols-2" style="height: calc(100% - 160px)">
    <div class="left col-span-1 max-h-full border-r">
      <h2 class="mb-4 text-lg text-center font-bold">参数设置</h2>
      <div class="px-4">
        <div>
          <h3 class="font-bold">
            <span class="highlight">单篇书摘</span>
          </h3>
          <div class="flex flex-col justify-center items-center">
            <div class=" mb-4 space-y-4">
              <div class="flex justify-center space-x-2">
                <button
                  class="w-12 h-12 rounded-full border border-gray-800 bg-white text-xs focus:outline-none"
                  :class="{ 'ring-4 ring-blue-300': type === 'default' }"
                  @click="setType('default')"
                >
                  默认
                </button>
                <button
                  class="w-12 h-12 rounded-full border border-gray-800 bg-gray-600 text-xs text-white focus:outline-none"
                  :class="{
                    'ring-4 ring-blue-300': type === 'defaultDark',
                  }"
                  @click="setType('defaultDark')"
                >
                  暗黑
                </button>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <label class="text-sm" for="width">宽度</label>
                <input
                  type="range"
                  id="width"
                  name="width"
                  v-model.number="width"
                  min="25"
                  max="40"
                />
                <span class="text-xs">{{ width }} rem</span>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <input type="checkbox" id="logo" v-model="show.logo" />
                <label class="text-sm select-none" for="logo">显示 Logo</label>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <input type="checkbox" id="cover" v-model="show.cover" />
                <label class="text-sm select-none" for="cover">显示封面</label>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <input type="checkbox" id="title" v-model="show.title" />
                <label class="text-sm select-none" for="title">显示书名</label>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <input type="checkbox" id="chapter" v-model="show.chapter" />
                <label class="text-sm select-none" for="chapter">显示章节</label>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <input type="checkbox" id="location" v-model="show.location" />
                <label class="text-sm select-none" for="location">显示页码</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="right" class="right col-span-1 max-h-full border-l">
      <h2 class="mb-4 text-lg text-center font-bold">参考样式</h2>
      <div class="px-4">
        <div>
          <h3 class="font-bold">
            <span class="highlight">单篇书摘</span>
          </h3>
          <div class="w-full transform origin-top scale-75 flex justify-center">
            <quotes-to-image
              :type="type"
              :width="width"
              :cover="cover"
              :title="title"
              :quotes="quotes"
              :show="show"
            ></quotes-to-image>
          </div>
        </div>
        <div>
          <h3 class="font-bold">
            <span class="highlight">多篇书摘</span>
          </h3>
          <div class="w-full transform origin-top scale-75 flex justify-center">

          </div>
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
import QuotesToImage from '../../share/QuotesToImage.vue';

export default {
  components: {
    QuotesToImage,
  },
  data() {
    return {
      width: 36,
      type: 'default',
      cover: 'logos/BookMate.svg',
      title: '书名',
      quotes: [{
        content: '书摘内容',
        comment: '批注内容',
        chapter: '第一章',
        location: '1',
      }],
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
    setType(val) {
      this.type = val;
      localStorage.setItem('shareQuotesAsImageSelectedType', val);
    },
  },
  created() {
    this.width = +localStorage.getItem('shareQuoteAsImageWidth');
    this.type = localStorage.getItem('shareQuotesAsImageSelectedType');
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
