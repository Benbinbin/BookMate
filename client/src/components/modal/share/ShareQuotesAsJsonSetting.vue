<template>
  <div class="grid grid-cols-2" style="height: calc(100% - 160px)">
    <div class="left col-span-1 max-h-full border-r">
      <h2 class="mb-4 text-lg text-center font-bold">参数设置</h2>
      <div class="px-4">
        <div>
          <h3 class="font-bold">
            <span class="highlight">可选字段</span>
          </h3>
          <div class="m-4 flex flex-col justify-center items-center">
            <div>
              <div
                v-for="(value, name) in show"
                :key="name"
                class="px-2 py-2 hover:bg-gray-100 rounded-md flex items-center space-x-2"
              >
                <input type="checkbox" :id="name" v-model="show[name]" />
                <label class="flex-grow text-sm select-none" :for="name"
                  >导出<span
                    class="ml-2 bg-green-300 py-0.5 px-1 text-xs rounded"
                  >
                    {{ name }}</span
                  ></label
                >
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
            <span class="highlight">可选字段</span>
          </h3>
          <div class="m-4 p-4 space-y-2 border rounded-md">
            {
            <p class="ml-4" v-for="(value, name) in options" :key="name">
              <span
                class="bg-green-300 py-0.5 px-1 text-sm rounded"
                :class="{ 'opacity-30': !show[name] }"
                >"{{ name }}":</span
              ><span
                class="ml-2 underline text-blue-400 text-sm"
                :class="{ 'opacity-30': !show[name] }"
                >{{ value }}</span
              >
            </p>
            }
          </div>
        </div>
        <div>
          <h3 class="font-bold">
            <span class="highlight">必选字段</span>
          </h3>
          <div class="m-4 p-4 space-y-2 border rounded-md">
            {
            <p class="ml-4" v-for="(value, name) in required" :key="name">
              <span class="bg-green-300 py-0.5 px-1 text-sm rounded"
                >"{{ name }}":</span
              ><span class="ml-2 underline text-blue-400 text-sm">{{
                value
              }}</span>
            </p>
            }
          </div>
        </div>

        <footer class="mt-8 mb-4 items-center">
          <div class="flex justify-center items-center">
            <button
              @click="backToTopHandler"
              class="hover:bg-gray-300 text-gray-300 hover:text-white p-3 rounded-md font-bold text-sm my-4"
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
export default {
  data() {
    return {
      required: {
        _id: '书摘的 id 值，数值',
        book: '书摘所属书籍的 id 值，数值',

        chapter: '章节，字符串（可能存在）',
        location: '页码，数值（可能存在）',
        content: '书摘内容，一个 ProseMirror 生成的对象',
        content_origin: '原始的书摘内容，字符串（可能存在）',

        comment: '批注内容，一个 ProseMirror 生成的对象（可能存在）',
        comment_origin: '原始的批注内容，字符串（可能存在）',

        tags: '标签，数组',
        type: '类型，字符串',
        summary_links: '引用该书摘的概述 _id 值，数组',
        note_links: '引用该书摘的笔记 _id 值，数组',
        created_date: '创建书摘时间戳',
        updated_date: '最近更新书摘时间戳',
      },
      options: {
        title: '书名，书摘所属书籍的书名，字符串',
        content_rendered: '书摘内容的 HTML 格式，字符串',
        comment_rendered: '批注内容的 HTML 格式，字符串（可能存在）',
      },
      show: {
        // _id: true,
        // book: true,
        title: true,
        // chapter: true,
        // location: true,
        // content: true,
        // content_origin: true,
        content_rendered: true,
        // comment: true,
        // comment_origin: true,
        comment_rendered: true,
        // tags: true,
        // type: true,
        // summary_links: true,
        // note_links: true,
        // created_date: true,
        // updated_date: true,
      },
    };
  },
  watch: {
    show: {
      handler() {
        localStorage.setItem(
          'shareQuotesAsJsonShow',
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
  created() {
    this.show = JSON.parse(localStorage.getItem('shareQuotesAsJsonShow'));
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
