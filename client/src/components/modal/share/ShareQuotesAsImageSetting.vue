<template>
  <div class="grid grid-cols-7" style="height: calc(100% - 160px)">
    <div class="left col-span-2 max-h-full border-r">
      <h2 class="mb-4 text-lg text-center font-bold">参数设置</h2>
      <div class="px-4">
        <div>
          <h3 class="font-bold my-4">
            <span class="highlight">单篇书摘</span>
          </h3>
          <div class="flex flex-col justify-center items-center">
            <div class="mb-4 space-y-4">
              <div class="flex justify-center space-x-2">
                <button
                  class="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs focus:outline-none"
                  :class="{ 'ring-4 ring-blue-300': quoteType === 'default' }"
                  @click="setQuoteType('default')"
                >
                  默认
                </button>
                <button
                  class="w-12 h-12 rounded-full border border-gray-800 bg-gray-600 hover:bg-gray-700 text-xs text-white focus:outline-none"
                  :class="{
                    'ring-4 ring-blue-300': quoteType === 'defaultDark',
                  }"
                  @click="setQuoteType('defaultDark')"
                >
                  暗黑
                </button>
              </div>
              <div class="flex justify-start items-center space-x-2">
                <label class="text-sm" for="quoteWidth">卡片宽度</label>
                <input
                  type="range"
                  id="quoteWidth"
                  name="width"
                  v-model.number="quoteWidth"
                  min="25"
                  max="40"
                />
                <span class="text-xs">{{ quoteWidth }} rem</span>
              </div>
              <div class="grid grid-cols-2">
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteLogo"
                    v-model="quoteShow.logo"
                  />
                  <label class="flex-grow text-sm select-none" for="quoteLogo"
                    >显示 Logo</label
                  >
                </div>
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteCover"
                    v-model="quoteShow.cover"
                  />
                  <label class="flex-grow text-sm select-none" for="quoteCover"
                    >显示封面</label
                  >
                </div>
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteTitle"
                    v-model="quoteShow.title"
                  />
                  <label class="flex-grow text-sm select-none" for="quoteTitle"
                    >显示书名</label
                  >
                </div>
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteChapter"
                    v-model="quoteShow.chapter"
                  />
                  <label
                    class="flex-grow text-sm select-none"
                    for="quoteChapter"
                    >显示章节</label
                  >
                </div>
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteLocation"
                    v-model="quoteShow.location"
                  />
                  <label
                    class="flex-grow text-sm select-none"
                    for="quoteLocation"
                    >显示页码</label
                  >
                </div>
                <div
                  class="p-2 flex justify-start items-center space-x-2 hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    id="quoteComment"
                    v-model="quoteShow.comment"
                  />
                  <label
                    class="flex-grow text-sm select-none"
                    for="quoteComment"
                    >显示批注</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="font-bold my-4">
            <span class="highlight">多篇书摘</span>
          </h3>
          <div class="flex flex-col justify-center items-center">
            <div class="mb-4">
              <div class="p-2 flex justify-center space-x-2">
                <button
                  class="w-12 h-12 rounded-full border border-gray-300 bg-white hover:bg-gray-100 text-xs focus:outline-none"
                  :class="{ 'ring-4 ring-blue-300': quotesType === 'default' }"
                  @click="setQuotesType('default')"
                >
                  默认
                </button>
                <button
                  class="w-12 h-12 rounded-full border border-gray-800 bg-gray-600 hover:bg-gray-700 text-xs text-white focus:outline-none"
                  :class="{
                    'ring-4 ring-blue-300': quotesType === 'defaultDark',
                  }"
                  @click="setQuotesType('defaultDark')"
                >
                  暗黑
                </button>
              </div>
              <div class="p-2 flex justify-start items-center space-x-2">
                <label class="text-sm" for="quotesWidth">卡片宽度</label>
                <input
                  type="range"
                  id="quotesWidth"
                  name="width"
                  v-model.number="quotesWidth"
                  min="25"
                  max="30"
                />
                <span class="text-xs">{{ quotesWidth }} rem</span>
              </div>
              <div class="p-2 flex justify-start items-center space-x-2">
                <span class="text-sm">并列排布</span>
                <input
                  class="w-9 text-xs mx-1 pl-1 border-2 rounded-md"
                  type="number"
                  name="cols"
                  v-model.number="quotesCols"
                  min="1"
                  max="5"
                  @input="colsInputHandler"
                />
                <span class="text-sm">篇书摘</span>
              </div>
              <div class="p-2">
                <div class="flex justify-start items-center space-x-2">
                  <p class="py-2 text-sm">布局方式</p>
                </div>
                <div>
                  <div
                    class="ml-4 p-2 flex items-center hover:bg-gray-100 rounded-md"
                  >
                    <input
                      type="radio"
                      id="masonry"
                      name="masonry"
                      value="masonry"
                      v-model="quotesLayout"
                    />
                    <label
                      class="flex-grow ml-2 text-xs select-none"
                      for="masonry"
                      >紧凑</label
                    >
                  </div>
                  <div
                    class="ml-4 p-2 flex items-center hover:bg-gray-100 rounded-md"
                  >
                    <input
                      type="radio"
                      id="grid"
                      name="grid"
                      value="grid"
                      v-model="quotesLayout"
                    />
                    <label class="flex-grow ml-2 text-xs select-none" for="grid"
                      >网格</label
                    >
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id="quotesMetadata"
                    v-model="quotesShow.metadata"
                  />
                  <label
                    class="flex-grow text-sm select-none"
                    for="quotesMetadata"
                    >显示 metadata</label
                  >
                </div>
                <div
                  class="ml-4 grid grid-cols-3"
                  :class="{ 'opacity-10': !quotesShow.metadata }"
                >
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesLogo"
                      v-model="quotesShow.logo"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesLogo"
                      >Logo</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesCover"
                      v-model="quotesShow.cover"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesCover"
                      >封面</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesTitle"
                      v-model="quotesShow.title"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesTitle"
                      >书名</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesAuthors"
                      v-model="quotesShow.authors"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesAuthors"
                      >作者</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesTranslators"
                      v-model="quotesShow.translators"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesTranslators"
                      >译者</label
                    >
                  </div>
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id="quotesIsbn"
                      v-model="quotesShow.isbn"
                    />
                    <label
                      class="flex-grow text-sm select-none"
                      for="quotesIsbn"
                      >ISBN</label
                    >
                  </div>
                </div>
              </div>
              <div>
                <div
                  class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    id="quotesChapter"
                    v-model="quotesShow.chapter"
                  />
                  <label
                    class="flex-grow text-sm select-none"
                    for="quotesChapter"
                    >显示章节</label
                  >
                </div>
                <div :class="{ 'opacity-10': !quotesShow.chapter }">
                  <div
                    class="p-2 hover:bg-gray-100 rounded-md ml-4 flex items-center space-x-2"
                  >
                    <input
                      type="radio"
                      id="chapter-as-heading"
                      name="chapter-as-heading"
                      value="heading"
                      v-model="quotesShow.chapterType"
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
                      v-model="quotesShow.chapterType"
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
                class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="quotesLocation"
                  v-model="quotesShow.location"
                />
                <label
                  class="flex-grow text-sm select-none"
                  for="quotesLocation"
                  >显示页码</label
                >
              </div>
              <div
                class="p-2 hover:bg-gray-100 rounded-md flex justify-start items-center space-x-2"
              >
                <input
                  type="checkbox"
                  id="quotesComment"
                  v-model="quotesShow.comment"
                />
                <label class="flex-grow text-sm select-none" for="quotesComment"
                  >显示批注</label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="right" class="right col-span-5 max-h-full border-l">
      <h2 class="mb-4 text-lg text-center font-bold">参考样式</h2>
      <div class="px-4">
        <div>
          <h3 class="font-bold mb-4">
            <span class="highlight">单篇书摘</span>
          </h3>
          <div class="transform origin-top scale-75 flex justify-center">
            <quotes-to-image
              :quoteType="quoteType"
              :quoteWidth="quoteWidth"
              :cover="cover"
              :title="title"
              :quote="quote"
              :quoteShow="quoteShow"
            ></quotes-to-image>
          </div>
        </div>
        <div>
          <h3 class="font-bold mb-4">
            <span class="highlight">多篇书摘</span>
          </h3>
          <div class="transform origin-top scale-50 flex justify-center">
            <quotes-to-image
              :quotesType="quotesType"
              :quotesWidth="quotesWidth"
              :quotesCols="quotesCols"
              :cover="cover"
              :title="title"
              :authors="authors"
              :translators="translators"
              :isbn="isbn"
              :quotes="quotes"
              :quotesLayout="quotesLayout"
              :quotesShow="quotesShow"
            ></quotes-to-image>
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
import QuotesToImage from '../../share/QuotesToImage.vue';

export default {
  components: {
    QuotesToImage,
  },
  data() {
    return {
      cover: 'logos/BookMate.svg',
      title: '书名',
      authors: ['作者1', '作者2', '作者3'],
      translators: ['译者1', '译者2'],
      isbn: 1234567890,
      quoteWidth: 36,
      quoteType: 'default',
      quote: {
        content: '书摘内容',
        comment: '批注内容',
        chapter: '第一章',
        location: '1',
      },
      quoteShow: {
        logo: true,
        cover: true,
        comment: true,
        title: true,
        chapter: true,
        location: true,
      },
      quotesWidth: 25,
      quotesCols: 3,
      quotesType: 'default',
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
      quotesLayout: 'masonry',
      quotesShow: {
        metadata: true,
        title: true,
        cover: true,
        authors: true,
        translators: true,
        isbn: true,
        logo: true,
        comment: true,
        chapterType: 'heading',
        chapter: true,
        location: true,
      },
    };
  },
  watch: {
    quoteWidth() {
      localStorage.setItem('shareQuoteAsImageWidth', this.quoteWidth);
    },
    quotesWidth() {
      localStorage.setItem('shareQuotesAsImageWidth', this.quotesWidth);
    },
    quotesCols() {
      localStorage.setItem('shareQuotesAsImageCols', this.quotesCols);
    },
    quoteShow: {
      handler() {
        localStorage.setItem(
          'shareQuoteAsImageShow',
          JSON.stringify(this.quoteShow),
        );
      },
      deep: true,
    },
    quotesLayout() {
      localStorage.setItem('shareQuotesAsImageLayout', this.quotesLayout);
    },
    quotesShow: {
      handler() {
        localStorage.setItem(
          'shareQuotesAsImageShow',
          JSON.stringify(this.quotesShow),
        );
      },
      deep: true,
    },
  },
  methods: {
    backToTopHandler() {
      this.$refs.right.scrollTop = 0;
    },
    colsInputHandler() {
      if (this.quotesCols > 5) {
        this.quotesCols = 5;
      }
    },
    setQuoteType(val) {
      this.quoteType = val;
      localStorage.setItem('shareQuoteAsImageType', val);
    },
    setQuotesType(val) {
      this.quotesType = val;
      localStorage.setItem('shareQuotesAsImageType', val);
    },
  },
  created() {
    this.quoteWidth = +localStorage.getItem('shareQuoteAsImageWidth');
    this.quotesWidth = +localStorage.getItem('shareQuotesAsImageWidth');
    this.quotesCols = +localStorage.getItem('shareQuotesAsImageCols');
    this.quoteType = localStorage.getItem('shareQuoteAsImageType');
    this.quotesLayout = localStorage.getItem('shareQuotesAsImageLayout');
    this.quotesType = localStorage.getItem('shareQuotesAsImageType');
    this.quoteShow = JSON.parse(localStorage.getItem('shareQuoteAsImageShow'));
    this.quotesShow = JSON.parse(
      localStorage.getItem('shareQuotesAsImageShow'),
    );
  },
};
</script>

<style lang="scss" scoped>
.left,
.right {
  overflow: overlay;
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
