<template>
  <div class="grid grid-cols-2" style="height: calc(100% - 160px)">
    <div class="left col-span-1 max-h-full border-r">
      <h2 class="mb-4 text-lg text-center font-bold">参数设置</h2>
      <div class="px-4">
        <div>
          <!-- <h3 class="font-bold">
            <span class="highlight">单篇书摘</span>
          </h3> -->
          <div class="flex flex-col justify-center items-center">
            <div class="mb-4 space-y-2">
              <div
                class="p-2 hover:bg-gray-100 rounded-md flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="blockquote"
                  v-model="show.blockquote"
                />
                <label class="flex-grow text-sm select-none" for="blockquote"
                  >显示引用符</label
                >
              </div>
              <div
                class="p-2 hover:bg-gray-100 rounded-md flex items-center space-x-2"
              >
                <input type="checkbox" id="cover" v-model="show.cover" />
                <label class="flex-grow text-sm select-none" for="cover"
                  >显示封面</label
                >
              </div>
              <div>
                <div
                  class="p-2 hover:bg-gray-100 rounded-md flex items-center space-x-2"
                >
                  <input type="checkbox" id="chapter" v-model="show.chapter" />
                  <label class="flex-grow text-sm select-none" for="chapter"
                    >显示章节</label
                  >
                </div>
                <div :class="{ 'opacity-10': !show.chapter }">
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md ml-4 flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id="chapter-as-heading"
                      name="chapter-as-heading"
                      value="heading"
                      v-model="show.chapterType"
                    />
                    <label
                      class="flex-grow ml-2 text-xs select-none"
                      for="chapter-as-heading"
                      >按章节分类</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md ml-4 flex items-center"
                  >
                    <input
                      type="radio"
                      id="chapter-as-paragraph"
                      name="chapter-as-paragraph"
                      value="paragraph"
                      v-model="show.chapterType"
                    />
                    <label
                      class="flex-grow ml-2 text-xs select-none"
                      for="chapter-as-paragraph"
                      >章节作为段落</label
                    >
                  </div>
                </div>
              </div>

              <div
                class="p-2 hover:bg-gray-100 rounded-md flex items-center space-x-2"
              >
                <input type="checkbox" id="location" v-model="show.location" />
                <label class="flex-grow text-sm select-none" for="location"
                  >显示页码</label
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
          chapter: '第一章',
          quotes: [
            {
              content: '书摘内容',
              comment: '批注内容',
              chapter: '第一章',
              location: '1',
            },
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sunt qui at aperiam quae tempore repellendus molestiae ratione ex omnis magni, dolore nostrum ipsam, vero perferendis earum dolorum. Obcaecati, officiis.',
              chapter: '第一章',
              location: '10',
            },
            {
              content: '书摘内容',
              comment:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente consequuntur optio consectetur error? Assumenda obcaecati animi delectus sapiente accusamus beatae id itaque dicta totam facere, numquam nisi ex deleniti et. Amet, exercitationem magni voluptate laudantium odit neque libero deleniti dolorem aliquam esse, quo, velit quibusdam pariatur animi dignissimos voluptas beatae.',
              chapter: '第一章',
              location: '11',
            },
          ],
        },
        {
          chapter: '第二章',
          quotes: [
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum maxime quas cum quaerat hic tempora, exercitationem eveniet nesciunt amet harum ipsam modi dolore, commodi maiores expedita non enim vero ipsa repellat corporis illum doloremque deleniti voluptatum dolor? Sit vitae, doloremque molestiae, maxime fugit repudiandae, molestias sapiente iure nostrum magni expedita.',
              comment: '批注内容',
              chapter: '第二章',
              location: '20',
            },
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quia quas maiores dolorum optio natus. Est, nemo ipsum! Fugit, voluptatum. Tempora vel perspiciatis consequuntur voluptate sint explicabo reiciendis laborum minima!',
              comment: '批注内容',
              chapter: '第二章',
              location: '22',
            },
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quia quas maiores dolorum optio natus. Est, nemo ipsum! Fugit, voluptatum. Tempora vel perspiciatis consequuntur voluptate sint explicabo reiciendis laborum minima!',
              comment: '批注内容',
              chapter: '第二章',
              location: '22',
            },
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quia quas maiores dolorum optio natus. Est, nemo ipsum! Fugit, voluptatum. Tempora vel perspiciatis consequuntur voluptate sint explicabo reiciendis laborum minima!',
              comment: '批注内容',
              chapter: '第二章',
              location: '22',
            },
            {
              content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero quia quas maiores dolorum optio natus. Est, nemo ipsum! Fugit, voluptatum. Tempora vel perspiciatis consequuntur voluptate sint explicabo reiciendis laborum minima!',
              comment: '批注内容',
              chapter: '第二章',
              location: '22',
            },
          ],
        },
        {
          chapter: '第三章',
          quotes: [
            {
              content: '书摘内容',
              comment: '批注内容',
              chapter: '第三章',
              location: '30',
            },

            {
              content: '书摘内容',
              comment: '批注内容',
              chapter: '第三章',
              location: '30',
            },
            {
              content: '书摘内容',
              comment: '批注内容',
              chapter: '第三章',
              location: '30',
            },

            {
              content: '书摘内容',
              comment: '批注内容',
              chapter: '第三章',
              location: '30',
            },
          ],
        },
        {
          chapter: '未分类',
          quotes: [],
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
