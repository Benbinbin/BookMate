<template>
  <div class="flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16  px-6 border-b-2 border-gray-20">
      <div
        v-if="!editingQuote"
        class="default w-full h-full flex items-center justify-center"
      >
        <h2 class="text-xl font-bold">书摘</h2>
      </div>
      <editor-menu-bar
        v-if="editingQuote"
        :editor="editor"
        v-slot="{ commands, isActive }"
      >
        <div class="menubar w-full h-full flex items-center justify-between">
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1.5 rounded"
           :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
          >
            <img src="@/assets/icons/editor/paragraph.svg" alt="paragraph icon" />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img
              src="@/assets/icons/editor/code.svg"
              alt="code icon"
            />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img
              src="@/assets/icons/editor/bold.svg"
              alt="bold icon"
            />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img
              src="@/assets/icons/editor/italic.svg"
              alt="italic icon"
            />
          </button>
        </div>
      </editor-menu-bar>
    </nav>
    <div ref="quotesList" class="flex-grow quotes-list px-3 py-6 h-full">
      <div v-if="quotesListMode === 'default'" class="quotes space-y-3">
        <quote-card
          v-for="(quote, index) of item.quotes"
          :key="index"
          :quote="quote"
          @active-editor="activeEditor(quote)"
          @inactive-editor="inactiveEditor"
        >
          <template
            v-slot:body
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="editor card-body mx-8">
              <editor-floating-menu
                :editor="editor"
                v-slot="{ commands, isActive, menu }"
              >
                <div
                  class="editor__floating-menu ml-2 space-x-0.5"
                  :class="{ 'is-active': menu.isActive }"
                  :style="`top: ${menu.top}px`"
                >
                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                    @click="commands.heading({ level: 1 })"
                  >
                    <img
                      src="@/assets/icons/editor/h1.svg"
                      alt="heading 2 icon"
                    />
                  </button>

                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                    @click="commands.heading({ level: 2 })"
                  >
                    <img
                      src="@/assets/icons/editor/h2.svg"
                      alt="heading 2 icon"
                    />
                  </button>
                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                    @click="commands.heading({ level: 3 })"
                  >
                    <img
                      src="@/assets/icons/editor/h3.svg"
                      alt="heading 3 icon"
                    />
                  </button>
                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <img
                      src="@/assets/icons/editor/unordered-list.svg"
                      alt="unordered list icon"
                    />
                  </button>
                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <img
                      src="@/assets/icons/editor/ordered-list.svg"
                      alt="ordered list icon"
                    />
                  </button>
                  <button
                    class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <img
                      src="@/assets/icons/editor/codeblock.svg"
                      alt="codeblock icon"
                    />
                  </button>
                </div>
              </editor-floating-menu>
              <editor-content :editor="editor"></editor-content>
            </div>
          </template>
        </quote-card>
      </div>
      <div v-if="quotesListMode === 'chapter'">
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
          <div
            v-show="!hiddenQuotes.includes(item.name)"
            class="quotes space-y-3"
          >
            <quote-card
              v-for="(quote, index) of item.quotes"
              :key="index"
              :quote="quote"
              @active-editor="activeEditor(quote)"
              @inactive-editor="inactiveEditor"
            >
              <template
                v-slot:body
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="editor card-body mx-8">
                  <editor-floating-menu
                    :editor="editor"
                    v-slot="{ commands, isActive, menu }"
                  >
                    <div
                      class="editor__floating-menu ml-2 space-x-0.5"
                      :class="{ 'is-active': menu.isActive }"
                      :style="`top: ${menu.top}px`"
                    >
                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })"
                      >
                        <img
                          src="@/assets/icons/editor/h1.svg"
                          alt="heading 2 icon"
                        />
                      </button>

                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })"
                      >
                        <img
                          src="@/assets/icons/editor/h2.svg"
                          alt="heading 2 icon"
                        />
                      </button>
                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })"
                      >
                        <img
                          src="@/assets/icons/editor/h3.svg"
                          alt="heading 3 icon"
                        />
                      </button>
                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                      >
                        <img
                          src="@/assets/icons/editor/unordered-list.svg"
                          alt="unordered list icon"
                        />
                      </button>
                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                      >
                        <img
                          src="@/assets/icons/editor/ordered-list.svg"
                          alt="ordered list icon"
                        />
                      </button>
                      <button
                        class="menubar__button w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.code_block() }"
                        @click="commands.code_block"
                      >
                        <img
                          src="@/assets/icons/editor/codeblock.svg"
                          alt="codeblock icon"
                        />
                      </button>
                    </div>
                  </editor-floating-menu>
                  <editor-content :editor="editor"></editor-content>
                </div>
              </template>
            </quote-card>
          </div>
          <hr class="mx-auto my-8 border-gray-300 w-1/2" />
        </section>
      </div>
      <footer class="my-12 items-center">
        <hr class="mx-auto w-1/2" />
        <div class="flex justify-center items-center">
          <button
            @click="backToTopHandler"
            class="text-blue-400 font-bold my-4"
          >
            返回顶部
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBar,
  EditorFloatingMenu,
} from 'tiptap';
import {
  Bold,
  Blockquote,
  BulletList,
  Code,
  CodeBlockHighlight,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Heading,
  TodoItem,
  TodoList,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';

import { mapState } from 'vuex';
import QuoteCard from './QuoteCard.vue';

export default {
  props: ['quotes', 'quotesChapters'],
  components: {
    QuoteCard,
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
  },
  data() {
    return {
      hiddenQuotes: [],
      HTMLtemp: null,
      JSONtemp: null,
      convertor: null,
      editor: null,
    };
  },
  computed: {
    ...mapState(['quotesListMode', 'currentQuotesChapter', 'editingQuote']),
    quotesRendered() {
      const quotesRendered = [];
      this.quotes.forEach((quote) => {
        const quoteTemp = { ...quote };

        quoteTemp.content = this.convert(quote.content, true);
        if (quote.comment) {
          quoteTemp.comment = this.convert(quote.comment, true);
        }
        quotesRendered.push(quoteTemp);
      });
      return quotesRendered;
    },
    quotesSorted() {
      if (this.quotesListMode === 'chapter') {
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
        this.quotesRendered.forEach((quote) => {
          const index = chaptersContainer.findIndex(
            (item) => item.name === quote.chapter,
          );

          if (index !== -1) {
            chaptersContainer[index].quotes.push(quote);
          } else {
            chaptersContainer[chaptersContainer.length - 1].quotes.push(quote);
          }
        });
        return chaptersContainer;
      }
      return this.quotesRendered;
    },
  },
  watch: {
    currentQuotesChapter() {
      if (this.quotesListMode === 'chapter') {
        const top = this.$refs[this.currentQuotesChapter][0].offsetTop;
        this.$refs.quotesList.scrollTop = top - 6 * 14;
      }
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
      this.convertor.setContent(content, true);
      const tempContent = this.HTMLtemp;
      this.HTMLtemp = null;
      return tempContent;
    },
    changeMode(mode) {
      this.$store.dispatch('changeQuotesMode', mode);
    },
    activeEditor(quote) {
      this.editor.setContent(quote.content, true);
      this.$store.dispatch('activeQuoteEditing', quote.id);
      this.editor.focus();
    },
    inactiveEditor(type) {
      if (type === 'cancel') {
        this.$store.dispatch('cancelQuoteEditing');
        this.JSONtemp = null;
      } else if (type === 'save') {
        this.$store.dispatch('saveQuoteEditing', this.JSONtemp);
        this.JSONtemp = null;
      }
    },
  },
  created() {
    this.convertor = new Editor({
      extensions: [
        new Bold(),
        new Blockquote(),
        new BulletList(),
        new Code(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            markdown,
          },
        }),
        new Italic(),
        new Link(),
        new ListItem(),
        new OrderedList(),
        new Heading({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        new TodoItem(),
        new TodoList(),
      ],
      onUpdate: ({ getHTML }) => {
        this.HTMLtemp = getHTML();
      },
    });
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Blockquote(),
        new BulletList(),
        new Code(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            markdown,
          },
        }),
        new Italic(),
        new Link(),
        new ListItem(),
        new OrderedList(),
        new Heading({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        new TodoItem(),
        new TodoList(),
      ],
      onUpdate: ({ getJSON }) => {
        this.JSONtemp = getJSON();
      },
    });
  },
  beforeDestroy() {
    this.convertor.destroy();
    this.editor.destroy();
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
</style>
