<template>
  <div class="bg-gray-500 bg-opacity-50 grid grid-rows-6">
    <div
      class="result row-span-5 relative flex justify-center items-center overflow-y-auto"
    >
      <quotes-image
        ref="target"
        :width="width"
        :quote="shareQuote"
        :cover="shareQuotesContent.cover"
        :title="shareQuotesContent.title"
        :type="type"
        :show="show"
      ></quotes-image>
      <button
        class="download-btn w-full h-full absolute inset-0 z-10 focus:outline-none hidden justify-center items-center bg-white bg-opacity-50"
        @click="downloadHandler"
      >
        <img src="@/assets/icons/export.svg" alt="download icon" />
      </button>
    </div>
    <div
      class="types row-span-1 bg-gray-600 bg-opacity-80 flex justify-center items-center space-x-4"
    >
      <button
        class="w-12 h-12 rounded-full bg-white text-xs focus:outline-none"
        :class="{ 'border-4 border-blue-300': type === 'default' }"
        @click="type = 'default'"
      >
        默认
      </button>
      <button
        class="w-12 h-12 rounded-full bg-gray-800 text-xs text-white focus:outline-none"
        :class="{ 'border-4 border-blue-300': type === 'defaultDark' }"
        @click="type = 'defaultDark'"
      >
        暗黑
      </button>
      <button
        class="w-12 h-12 rounded-full bg-white text-xs text-white focus:outline-none"
        @click="$emit('close-share-quotes-as-image-modal')"
      >
        <img src="@/assets/icons/close-circle.svg" alt="close icon" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import * as htmlToImage from 'html-to-image';

import QuotesImage from './share/QuotesImage.vue';

export default {
  components: {
    QuotesImage,
  },
  data() {
    return {
      width: 36,
      type: 'default',
      //   cover: 'logos/BookMate.svg',
      //   title: '书名',
      //   quote: {
      //     content: '书摘内容',
      //     comment: '批注内容',
      //     chapter: '第一章',
      //     location: '1',
      //   },
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
  computed: {
    ...mapState({
      shareQuotesContent: (state) => state.share.shareQuotesContent,
    }),
    shareQuote() {
      if (this.shareQuotesContent.quotes.length === 1) {
        return this.shareQuotesContent.quotes[0];
      }
      return this.shareQuotesContent.quotes;
    },
  },
  methods: {
    downloadHandler() {
      const dom = this.$refs.target.$el;
      //   console.log(dom);

      const scale = 4;
      const style = {
        transform: `scale(${scale})`,
        'transform-origin': 'top left',
        width: `${dom.offsetWidth}px`,
        height: `${dom.offsetHeight}px`,
      };
      const param = {
        height: dom.offsetHeight * scale,
        width: dom.offsetWidth * scale,
        style,
      };
      htmlToImage
        .toPng(dom, param)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `书名-《${
            this.shareQuotesContent.title || 'book'
          }》-章节-${this.shareQuote.chapter || '未分类'}-页码-${
            this.shareQuote.location || '未知'
          }.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
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
.result {
  &:hover {
    .download-btn {
      display: flex;
    }
  }
}
</style>
