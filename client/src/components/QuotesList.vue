<template>
  <div class="flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16 px-6 border-b-2 border-gray-20">
      <div
        v-if="!editingQuote"
        class="default w-full h-full flex justify-between items-center"
      >
        <button
          class="flex items-center opacity-30 hover:opacity-80"
          @click="addNewQuote('whole_book_new')"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/add.svg"
            alt="add quote icon"
          />
        </button>
        <h2 class="text-xl font-bold">书摘</h2>
        <button class="flex items-center opacity-30 hover:opacity-80">
          <img class="w-6 h-6" src="@/assets/icons/menu.svg" alt="menu icon" />
        </button>
      </div>
      <quote-editor-menu
        v-if="editingQuote"
        :editor="editor"
        @inactive-editor="inactiveEditor"
      ></quote-editor-menu>
    </nav>
    <div
      ref="quotesList"
      class="flex-grow quotes-list px-3 py-6 h-full"
      v-if="quotes.length > 0"
    >
      <quote-card
        v-if="newQuote && newQuote.id === 'whole_book_new'"
        ref="whole_book_new"
        :quote="newQuote"
        @inactive-editor="inactiveEditor"
      >
        <template v-slot:body>
          <div class="quote-editor-container card-body mx-8">
            <quote-editor-floating-menu
              :editor="editor"
            ></quote-editor-floating-menu>
            <editor-content :editor="editor"></editor-content>
          </div>
        </template>
        <template v-slot:type>
          <div class="quote-type flex-shrink-0 relative">
            <button
              class="border p-1 border-gray-300 rounded"
              @click="showTypesModal = true"
            >
              <img
                :src="require(`@/assets/icons/${quoteType}.svg`)"
                :alt="`${quoteType} icon`"
                class="w-5 h-5"
              />
            </button>
            <div
              v-show="showTypesModal"
              class="types-modal-container absolute top-8 z-10 flex flex-col space-y-1 bg-gray-100 rounded shadow"
            >
              <button
                v-for="type of types"
                :key="type"
                class="p-1 hover:bg-gray-200 rounded"
                @click="changeQuoteType(type)"
              >
                <img
                  :src="require(`@/assets/icons/${type}.svg`)"
                  :alt="`${type} icon`"
                  class="w-5 h-5"
                />
              </button>
            </div>
          </div>
        </template>
        <template v-slot:location>
          <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
            <div class="flex items-center">
              <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                >章节：</label
              >
              <treeselect
                class="w-4/5 z-10"
                v-model="quoteChapter"
                placeholder="请选择章节"
                :multiple="false"
                :options="category"
                :normalizer="categoryNormalizer"
                :searchable="true"
                :flatten-search-results="true"
                :close-on-select="true"
                :default-expand-level="1"
              />
            </div>
            <div class="flex items-center">
              <label class="flex-shrink-0 opacity-30" for="quote-location">
                页码：</label
              >
              <input
                class="w-4/5"
                id="quote-location"
                type="number"
                v-model="quoteLocation"
                placeholder="请输入页码"
              />
            </div>
          </div>
        </template>
        <template
          v-slot:comment
          v-if="
            (newQuote.id === editingQuote &&
              newQuote.comment &&
              newQuote.comment !== '<p></p>') ||
            newQuote.id === quoteAddingComment
          "
        >
          <div
            class="comment-editor-container px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
          >
            <quote-editor-floating-menu
              :editor="commentEditor"
            ></quote-editor-floating-menu>
            <editor-content :editor="commentEditor"></editor-content>
          </div>
        </template>
      </quote-card>
      <div v-if="quotesListMode === 'default'" class="quotes space-y-3">
        <quote-card
          v-for="quote of item.quotes"
          :key="quote.id"
          :ref="quote.id"
          :quote="quote"
          @active-editor="activeEditor(quote)"
          @inactive-editor="inactiveEditor"
        >
          <template
            v-slot:body
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="quote-editor-container card-body mx-8">
              <quote-editor-floating-menu
                :editor="editor"
              ></quote-editor-floating-menu>
              <editor-content :editor="editor"></editor-content>
            </div>
          </template>
          <template
            v-slot:type
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="quote-type flex-shrink-0 relative">
              <button
                class="border p-1 border-gray-300 rounded"
                @click="showTypesModal = true"
              >
                <img
                  :src="require(`@/assets/icons/${quoteType}.svg`)"
                  :alt="`${quoteType} icon`"
                  class="w-5 h-5"
                />
              </button>
              <div
                v-show="showTypesModal"
                class="types-modal-container absolute top-8 z-10 flex flex-col space-y-1 bg-gray-100 rounded shadow"
              >
                <button
                  v-for="type of types"
                  :key="type"
                  class="p-1 hover:bg-gray-200 rounded"
                  @click="changeQuoteType(type)"
                >
                  <img
                    :src="require(`@/assets/icons/${type}.svg`)"
                    :alt="`${type} icon`"
                    class="w-5 h-5"
                  />
                </button>
              </div>
            </div>
          </template>
          <template
            v-slot:location
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                  >章节：</label
                >
                <treeselect
                  class="w-4/5 z-10"
                  v-model="quoteChapter"
                  placeholder="请选择章节"
                  :multiple="false"
                  :options="category"
                  :normalizer="categoryNormalizer"
                  :searchable="true"
                  :flatten-search-results="true"
                  :close-on-select="true"
                  :default-expand-level="1"
                />
              </div>
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-location">
                  页码：</label
                >
                <input
                  class="w-4/5"
                  id="quote-location"
                  type="number"
                  v-model="quoteLocation"
                  placeholder="请输入页码"
                />
              </div>
            </div>
          </template>
          <template
            v-slot:comment
            v-if="
              (quote.id === editingQuote &&
                quote.comment &&
                quote.comment !== '<p></p>') ||
              quote.id === quoteAddingComment
            "
          >
            <div
              class="comment-editor-container px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
            >
              <quote-editor-floating-menu
                :editor="commentEditor"
              ></quote-editor-floating-menu>
              <editor-content :editor="commentEditor"></editor-content>
            </div>
          </template>
        </quote-card>
      </div>
      <div v-if="quotesListMode === 'chapter'">
        <section v-for="item of quotesSorted" :key="item.name" :ref="item.name">
          <div class="chapter py-3 flex justify-between opacity-50">
            <div class="flex items-center">
              <button
                class="flex items-center"
                @click="addNewQuote(`${item.name}_new`, item.name)"
              >
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-6 h-6"
                />
              </button>
              <span class="ml-1">{{
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
              v-if="newQuote && newQuote.id === `${item.name}_new`"
              :ref="`${item.name}_new`"
              :quote="newQuote"
              @inactive-editor="inactiveEditor"
            >
              <template v-slot:body>
                <div class="quote-editor-container card-body mx-8">
                  <quote-editor-floating-menu
                    :editor="editor"
                  ></quote-editor-floating-menu>
                  <editor-content :editor="editor"></editor-content>
                </div>
              </template>
              <template v-slot:type>
                <div class="quote-type flex-shrink-0 relative">
                  <button
                    class="border p-1 border-gray-300 rounded"
                    @click="showTypesModal = true"
                  >
                    <img
                      :src="require(`@/assets/icons/${quoteType}.svg`)"
                      :alt="`${quoteType} icon`"
                      class="w-5 h-5"
                    />
                  </button>
                  <div
                    v-show="showTypesModal"
                    class="types-modal-container absolute top-8 z-10 flex flex-col space-y-1 bg-gray-100 rounded shadow"
                  >
                    <button
                      v-for="type of types"
                      :key="type"
                      class="p-1 hover:bg-gray-200 rounded"
                      @click="changeQuoteType(type)"
                    >
                      <img
                        :src="require(`@/assets/icons/${type}.svg`)"
                        :alt="`${type} icon`"
                        class="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </template>
              <template v-slot:location>
                <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
                  <div class="flex items-center">
                    <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                      >章节：</label
                    >
                    <treeselect
                      class="w-4/5 z-10"
                      v-model="quoteChapter"
                      placeholder="请选择章节"
                      :multiple="false"
                      :options="category"
                      :normalizer="categoryNormalizer"
                      :searchable="true"
                      :flatten-search-results="true"
                      :close-on-select="true"
                      :default-expand-level="1"
                    />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="flex-shrink-0 opacity-30"
                      for="quote-location"
                    >
                      页码：</label
                    >
                    <input
                      class="w-4/5"
                      id="quote-location"
                      type="number"
                      v-model="quoteLocation"
                      placeholder="请输入页码"
                    />
                  </div>
                </div>
              </template>
              <template
                v-slot:comment
                v-if="
                  (newQuote.id === editingQuote &&
                    newQuote.comment &&
                    newQuote.comment !== '<p></p>') ||
                  newQuote.id === quoteAddingComment
                "
              >
                <div
                  class="comment-editor-container px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
                >
                  <quote-editor-floating-menu
                    :editor="commentEditor"
                  ></quote-editor-floating-menu>
                  <editor-content :editor="commentEditor"></editor-content>
                </div>
              </template>
            </quote-card>
            <quote-card
              v-for="quote of item.quotes"
              :key="quote.id"
              :ref="quote.id"
              :quote="quote"
              @active-editor="activeEditor(quote)"
              @inactive-editor="inactiveEditor"
            >
              <template
                v-slot:body
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="quote-editor-container card-body mx-8">
                  <quote-editor-floating-menu
                    :editor="editor"
                  ></quote-editor-floating-menu>
                  <editor-content :editor="editor"></editor-content>
                </div>
              </template>
              <template
                v-slot:type
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="quote-type flex-shrink-0 relative">
                  <button
                    class="border p-1 border-gray-300 rounded"
                    @click="showTypesModal = true"
                  >
                    <img
                      :src="require(`@/assets/icons/${quoteType}.svg`)"
                      :alt="`${quoteType} icon`"
                      class="w-5 h-5"
                    />
                  </button>
                  <div
                    v-show="showTypesModal"
                    class="types-modal-container absolute top-8 z-10 flex flex-col space-y-1 bg-gray-100 rounded shadow"
                  >
                    <button
                      v-for="type of types"
                      :key="type"
                      class="p-1 hover:bg-gray-200 rounded"
                      @click="changeQuoteType(type)"
                    >
                      <img
                        :src="require(`@/assets/icons/${type}.svg`)"
                        :alt="`${type} icon`"
                        class="w-5 h-5"
                      />
                    </button>
                  </div>
                </div>
              </template>
              <template
                v-slot:location
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
                  <div class="flex items-center">
                    <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                      >章节：</label
                    >
                    <treeselect
                      class="w-4/5 z-10"
                      v-model="quoteChapter"
                      placeholder="请选择章节"
                      :multiple="false"
                      :options="category"
                      :normalizer="categoryNormalizer"
                      :searchable="true"
                      :flatten-search-results="true"
                      :close-on-select="true"
                      :default-expand-level="1"
                    />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="flex-shrink-0 opacity-30"
                      for="quote-location"
                    >
                      页码：</label
                    >
                    <input
                      class="w-4/5"
                      id="quote-location"
                      type="number"
                      v-model="quoteLocation"
                      placeholder="请输入页码"
                    />
                  </div>
                </div>
              </template>
              <template
                v-slot:comment
                v-if="
                  (quote.id === editingQuote &&
                    quote.comment &&
                    quote.comment !== '<p></p>') ||
                  quote.id === quoteAddingComment
                "
              >
                <div
                  class="comment-editor-container px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
                >
                  <quote-editor-floating-menu
                    :editor="commentEditor"
                  ></quote-editor-floating-menu>
                  <editor-content :editor="commentEditor"></editor-content>
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
import { Editor, EditorContent } from 'tiptap';
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
  Image,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

import { mapState } from 'vuex';
import QuoteCard from './QuoteCard.vue';
import QuoteEditorMenu from './QuoteEditorMenu.vue';
import QuoteEditorFloatingMenu from './QuoteEditorFloatingMenu.vue';

export default {
  props: ['category', 'quotes', 'quotesChapters'],
  components: {
    QuoteCard,
    QuoteEditorMenu,
    QuoteEditorFloatingMenu,
    EditorContent,
    Treeselect,
  },
  data() {
    return {
      hiddenQuotes: [],
      HTMLtemp: null,
      JSONtemp: null,
      commentJSONtemp: null,
      quoteChapter: null,
      quoteLocation: 0,
      quoteType: 'annotation',
      newQuote: null,
      convertor: null,
      editor: null,
      commentEditor: null,
      showTypesModal: false,
      types: ['annotation', 'question', 'deep-reading', 'inspiration'],
    };
  },
  computed: {
    ...mapState([
      'quotesListMode',
      'currentQuotesChapter',
      'editingQuote',
      'quoteAddingComment',
    ]),
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
      if (
        this.quotesListMode === 'chapter'
        && this.currentQuotesChapter !== null
      ) {
        const top = this.$refs[this.currentQuotesChapter][0].offsetTop;
        this.$refs.quotesList.scrollTop = top - 6 * 14;
      }
    },
    quoteAddingComment() {
      if (this.quoteAddingComment) {
        this.commentEditor.focus();
      }
    },
  },
  methods: {
    categoryNormalizer(node) {
      return {
        id: node.name,
        label: node.name,
        children: node.children,
      };
    },
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
      if (!this.editingQuote) {
        this.editor.setContent(quote.content, true);
        if (quote.comment) {
          this.commentEditor.setContent(quote.comment, true);
        }
        if (quote.chapter) this.quoteChapter = quote.chapter;
        if (quote.location) this.quoteLocation = quote.location;
        this.quoteType = quote.type;
        this.$store.dispatch('activeQuoteEditing', quote.id);
      }

      this.$nextTick(() => {
        // console.log(this.$refs[this.editingSummary]);
        if (this.editingQuote === 'whole_book_new') {
          this.$refs[this.editingQuote].$el.focus();
        } else if (
          /new$/.test(this.editingQuote)
          && this.editingQuote !== 'whole_book_new'
        ) {
          this.$refs[this.editingQuote][0].$el.focus();
        }

        if (this.quoteAddingComment) {
          this.commentEditor.focus();
        } else {
          this.editor.focus();
        }
      });
    },
    addNewQuote(newID, newChapter = null) {
      if (!newChapter || newChapter === '未分类(NoChapter)') {
        this.newQuote = {
          id: newID,
          chapter: null,
          content: null,
          location: 0,
          type: 'annotation',
        };
      } else {
        this.newQuote = {
          id: newID,
          chapter: newChapter,
          content: null,
          location: 0,
          type: 'annotation',
        };
      }

      this.activeEditor(this.newQuote);
    },
    changeQuoteType(type) {
      this.quoteType = type;
      this.showTypesModal = false;
    },
    inactiveEditor(type) {
      let target = this.editingQuote;

      if (type === 'cancel') {
        this.$store.dispatch('cancelQuoteEditing');
        if (!/new$/.test(target)) {
          // focus the editing quote
          this.$nextTick(() => {
            this.$refs[target][0].$el.focus();
          });
        }
      } else if (type === 'save') {
        this.$store
          .dispatch('saveQuoteEditing', {
            id: this.editingQuote,
            chapter: this.quoteChapter,
            location: this.quoteLocation,
            content: this.JSONtemp,
            comment: this.commentJSONtemp,
            type: this.quoteType,
          })
          .then((id) => {
            target = id;
            // focus the editing quote
            this.$nextTick(() => {
              this.$refs[target][0].$el.focus();
            });
          });
      }
      this.editor.clearContent();
      this.commentEditor.clearContent();
      this.JSONtemp = null;
      this.commentJSONtemp = null;
      this.quoteChapter = null;
      this.quoteLocation = 0;
      this.newQuote = null;
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
        new Image(),
      ],
      onUpdate: ({ getHTML }) => {
        this.HTMLtemp = getHTML();
      },
    });
    this.editor = new Editor({
      dropCursor: {
        color: 'rgba(252, 211, 77, 50%)',
        width: 5,
      },
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
        new Image(),
      ],
      onUpdate: ({ getJSON }) => {
        this.JSONtemp = getJSON();
      },
    });
    this.commentEditor = new Editor({
      dropCursor: {
        color: 'rgba(252, 211, 77, 50%)',
        width: 5,
      },
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
        new Image(),
      ],
      onUpdate: ({ getJSON }) => {
        this.commentJSONtemp = getJSON();
      },
    });
  },
  beforeDestroy() {
    this.convertor.destroy();
    this.editor.destroy();
    this.commentEditor.destroy();
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

.menubar {
  .is-active {
    background: #e5e7eb;
  }
}

#quote-location {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 0 0 10px;
  &:focus {
    outline: none;
  }
}
</style>

<style lang="scss">
.quote-editor-container,
.comment-editor-container {
  position: relative;
}
</style>
