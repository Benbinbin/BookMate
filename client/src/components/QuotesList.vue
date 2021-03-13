<template>
  <div ref="quotesList" class="quotes-list px-3 py-6 h-full">
    <section v-for="item of quotesSorted" :key="item.name" :ref="item.name">
      <div class="chapter py-3 flex justify-between opacity-50">
        <div class="flex items-center">
          <button>
            <img
              src="@/assets/icons/add-circle.svg"
              alt="add icon"
              class="flex-shrink-0 w-6 h-6"
            />
          </button>
          <span>{{
            item.name !== "未分类(NoChapter)" ? item.name : "未分类"
          }}</span>
        </div>
        <button
          class="flex items-center"
          :class="{
            'text-blue-500': !hiddenQuotes.includes(item.name),
            'text-black': hiddenQuotes.includes(item.name),
          }"
          @click="toggleQuotes(item.name)"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6667 8.33329C16.1142 8.33329 15.5842 8.55279 15.1935 8.94349C14.8028 9.33419 14.5834 9.86409 14.5834 10.4166V41.6666L20.7875 36.0062C21.9389 34.9557 23.4414 34.3733 25 34.3733C26.5587 34.3733 28.0611 34.9557 29.2125 36.0062L35.4167 41.6666V10.4166C35.4167 9.86409 35.1972 9.33419 34.8065 8.94349C34.4158 8.55279 33.8859 8.33329 33.3334 8.33329H16.6667ZM16.6667 4.16663H33.3334C34.991 4.16663 36.5807 4.82511 37.7528 5.99721C38.9249 7.16931 39.5834 8.75902 39.5834 10.4166V41.6666C39.5832 42.4744 39.3482 43.2647 38.907 43.9413C38.4658 44.618 37.8375 45.1518 37.0985 45.4778C36.3594 45.8039 35.5415 45.9081 34.7444 45.7777C33.9472 45.6474 33.2051 45.2881 32.6084 44.7437L26.4042 39.0833C26.0204 38.7331 25.5196 38.539 25 38.539C24.4805 38.539 23.9797 38.7331 23.5959 39.0833L17.3917 44.7437C16.795 45.2881 16.0529 45.6474 15.2557 45.7777C14.4585 45.9081 13.6406 45.8039 12.9016 45.4778C12.1625 45.1518 11.5342 44.618 11.093 43.9413C10.6519 43.2647 10.4169 42.4744 10.4167 41.6666V10.4166C10.4167 8.75902 11.0752 7.16931 12.2473 5.99721C13.4194 4.82511 15.0091 4.16663 16.6667 4.16663Z"
            />
          </svg>
          <span>{{ item.quotes.length }}</span>
        </button>
      </div>
      <div v-show="!hiddenQuotes.includes(item.name)" class="quotes space-y-3">
        <div
          v-for="(quote, index) of item.quotes"
          :key="index"
          class="quote-card rounded-lg outline-none"
          tabindex="0"
        >
          <div
            class="quote-content border"
            :class="{
              'rounded-lg': !quote.comment,
              'rounded-t-lg': quote.comment,
            }"
          >
            <div class="card-header-container h-12">
              <div
                class="card-header pt-3 px-3 hidden justify-between items-start"
              >
                <div class="left">
                  <button class="opacity-30 flex items-center">
                    <img
                      src="@/assets/icons/notes.svg"
                      alt="note icon"
                      class="w-5 h-5"
                    />
                    <span class="text-sm font-bold">2</span>
                  </button>
                </div>
                <div class="right flex items-center space-x-1.5">
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/flip.svg"
                      alt="flip icon"
                      class="w-5 h-5"
                    />
                  </button>
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/pin.svg"
                      alt="pin icon"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body mx-8" v-html="quote.content"></div>
            <div class="card-footer-container h-14 flex items-end">
              <div
                class="card-footer pb-3 px-3 flex justify-between items-end flex-grow"
              >
                <div class="left flex items-center">
                  <img
                    :src="require(`@/assets/icons/${quote.type}.svg`)"
                    :alt="`${quote.type} icon`"
                    class="quote-type w-5 h-5"
                    :class="{
                      'hidden opacity-30':
                        quote.type === 'annotation' && !quote.comment,
                    }"
                  />
                  <div class="quote-location ml-1.5 hidden opacity-30">
                    <p class="text-xs">章节：{{ quote.chapter || "未分类" }}</p>
                    <p class="text-xs">页数：{{ quote.location || "未知" }}</p>
                  </div>
                </div>
                <div class="btns right hidden items-center space-x-1.5">
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/add.svg"
                      alt="add icon"
                      class="w-5 h-5"
                    />
                  </button>
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/edit.svg"
                      alt="edit icon"
                      class="w-5 h-5"
                    />
                  </button>
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/copy.svg"
                      alt="copy icon"
                      class="w-5 h-5"
                    />
                  </button>
                  <button class="opacity-30">
                    <img
                      src="@/assets/icons/share.svg"
                      alt="share icon"
                      class="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="quote.comment"
            class="quote-comment px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
            v-html="quote.comment"
          ></div>
        </div>
      </div>
      <hr class="mx-auto my-8 border-gray-300 w-1/2" />
    </section>
    <footer class="my-12 items-center">
      <hr class="mx-auto w-1/2" />
      <div class="flex justify-center items-center">
        <button @click="backToTopHandler" class="text-blue-400 font-bold my-4">
          返回顶部
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { Editor } from 'tiptap';
import { mapState } from 'vuex';

export default {
  props: ['quotes', 'quotesChapters'],
  data() {
    return {
      sortBy: 'chapter',
      hiddenQuotes: [],
      temp: null,
      editor: null,
    };
  },
  computed: {
    ...mapState(['currentChapter']),
    quotesSorted() {
      // if (this.sortBy === 'chapter') {
      const chaptersContainer = [];
      this.quotesChapters.forEach((chapter) => {
        chaptersContainer.push({
          name: chapter,
          quotes: [],
        });
      });
      chaptersContainer.push({
        name: '未分类(NoChapter)',
        quotes: [],
      });
      this.quotes.forEach((quote) => {
        // use tiptap editor getHTML() render HTML from JSON content
        const quoteTemp = { ...quote };

        quoteTemp.content = this.convert(quote.content, true);
        if (quote.comment) {
          quoteTemp.comment = this.convert(quote.comment, true);
        }

        const index = chaptersContainer.findIndex(
          (item) => item.name === quote.chapter,
        );

        if (index !== -1) {
          chaptersContainer[index].quotes.push(quoteTemp);
        } else {
          chaptersContainer[chaptersContainer.length - 1].quotes.push(
            quoteTemp,
          );
        }
      });
      return chaptersContainer;
      // }
    },
  },
  watch: {
    currentChapter() {
      const top = this.$refs[this.currentChapter][0].offsetTop;

      this.$refs.quotesList.scrollTop = top - 6 * 14;
    },
  },
  methods: {
    backToTopHandler() {
      this.$refs.quotesList.scrollTop = 0;
    },
    toggleQuotes(val) {
      const index = this.hiddenQuotes.indexOf(val);
      if (index !== -1) {
        this.hiddenQuotes.splice(index, 1);
      } else {
        this.hiddenQuotes.push(val);
      }
    },
    convert(content) {
      // use tiptap editor getHTML() render HTML from JSON content
      this.editor.setContent(content, true);
      const tempContent = this.temp;
      this.temp = null;
      return tempContent;
    },
  },
  created() {
    this.editor = new Editor({
      onUpdate: ({ getHTML }) => {
        this.temp = getHTML();
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.quotes-list {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.quote-card {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url("../assets/icons/quote.svg");
    background-repeat: no-repeat;
    background-position: 10px 10px;
    opacity: 0.05;
    z-index: -10;
  }

  &:focus {
    box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.15);
    .card-header {
      display: flex;
    }
    .quote-type,
    .quote-location,
    .btns {
      display: block;
    }
  }
}
</style>
