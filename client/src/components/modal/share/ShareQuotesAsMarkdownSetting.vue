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
            <div class="mb-4 space-y-4">
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="blockquote"
                  v-model="show.blockquote"
                />
                <label class="text-sm" for="blockquote">显示引用符</label>
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="cover" v-model="show.cover" />
                <label class="text-sm" for="cover">显示封面</label>
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="chapter" v-model="show.chapter" />
                <label class="text-sm" for="chapter">显示章节</label>
              </div>
              <div class="ml-4 flex items-center space-x-2">
                <input
                  type="radio"
                  id="chapter-as-heading"
                  name="chapter-as-heading"
                  value="heading"
                  v-model="show.chapterType"
                />
                <label class="ml-2" for="chapter-as-heading">按章节分类</label>
              </div>
              <div class="ml-4 flex items-center">
                <input
                  type="radio"
                  id="chapter-as-paragraph"
                  name="chapter-as-paragraph"
                  value="paragraph"
                  v-model="show.chapterType"
                />
                <label class="ml-2" for="chapter-as-paragraph"
                  >章节作为段落</label
                >
              </div>
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="location" v-model="show.location" />
                <label class="text-sm" for="location">显示页码</label>
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
          <div class="border rounded-md my-4 p-4">
            <quotes-to-markdown
              :cover="cover"
              :title="title"
              :quotes="quotes"
              :show="show"
            ></quotes-to-markdown>
          </div>
        </div>
        <div>
          <h3 class="font-bold">
            <span class="highlight">多篇书摘</span>
          </h3>
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
import QuotesToMarkdown from '../../share/QuotesToMarkdown.vue';

export default {
  components: {
    QuotesToMarkdown,
  },
  data() {
    return {
      cover: 'logos/BookMate.svg',
      title: '书名',
      quotes: [
        {
          content: '书摘内容',
          comment: '批注内容',
          chapter: '第一章',
          location: '1',
        },
      ],
      show: {
        blockquote: true,
        cover: false,
        comment: true,
        location: true,
        chapter: true,
        chapterType: 'heading',
      },
    };
  },
  watch: {
    show: {
      handler() {
        localStorage.setItem(
          'shareQuotesAsMarkdownShow',
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
