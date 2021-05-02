<template>
  <div class="max-w-full flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16 px-6 relative border-b-2 border-gray-100">
      <div
        v-if="!quoteEditing"
        class="default w-full h-full flex justify-between items-center"
      >
        <button
          class="flex items-center"
          :class="{
            'opacity-30 hover:opacity-80': !quoteEditing,
            'opacity-10': quoteEditing,
          }"
          :disabled="quoteEditing"
          @click="addNewQuote('whole_book_new')"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/add.svg"
            alt="add quote icon"
          />
        </button>
        <h2 class="text-xl font-bold">书摘</h2>
        <button
          v-show="!showMoreModal"
          class="flex items-center opacity-30 hover:opacity-80"
          @click="showMoreModal = !showMoreModal"
        >
          <img class="w-6 h-6" src="@/assets/icons/menu.svg" alt="menu icon" />
        </button>
        <button
          v-show="showMoreModal"
          class="flex items-center opacity-60 hover:opacity-100"
          @click="showMoreModal = !showMoreModal"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/close-circle.svg"
            alt="menu icon"
          />
        </button>
      </div>
      <quote-editor-menu
        v-if="quoteEditing"
        :editor="editor"
        :commentEditor="commentEditor"
        @inactive-editor="inactiveEditor"
      ></quote-editor-menu>
      <div
        v-show="showMoreModal"
        class="more-modal p-4 absolute top-12 right-6 z-10 flex flex-col rounded bg-gray-100 shadow-md"
      >
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">批量导入书摘</span>
          </h3>
          <div class="flex space-x-3 justify-start">
            <button
              v-for="app of importAppList"
              :key="app.name"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              @click="showImportQuotesModalHandler(app.name)"
            >
              <img
                class="w-10"
                :src="`apps/${app.img}`"
                :alt="`${app.name} logo`"
              />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">书摘展示模式</span>
          </h3>
          <div class="flex flex-col space-y-1">
            <div>
              <input
                type="checkbox"
                name="sort-by-chapter"
                id="sort-by-chapter"
                v-model="classifyByChapter"
              />
              <label
                for="sort-by-chapter"
                class="ml-2"
                style="user-select: none"
                >按章节分类书摘</label
              >
            </div>
            <div>
              <input
                type="checkbox"
                name="side-by-side"
                id="side-by-side"
                v-model="sideBySide"
              />
              <label for="side-by-side" class="ml-2" style="user-select: none"
                >并列排布</label
              >
              <input
                class="w-11 text-sm mx-1 pl-1 border-2 rounded-md"
                type="number"
                name="cols"
                v-model="cols"
                min="1"
                max="5"
                @input="colsInputHandler"
              />
              <span>篇书摘</span>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">书摘排序方式</span>
          </h3>
          <div class="flex items-stretch space-x-6">
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-by-location"
                  name="sort-by-location"
                  value="location"
                  v-model="sortBy"
                />
                <label class="ml-2" for="sort-by-location">按页码顺序</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-by-updated-date"
                  name="sort-by-updated-date"
                  value="updated_date"
                  v-model="sortBy"
                />
                <label class="ml-2" for="sort-by-updated-date"
                  >按更新时间</label
                >
              </div>
            </div>
            <div class="space-x-2">
              <button
                class="w-12 h-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                :class="{ 'bg-gray-300': rank === 'ascending' }"
                @click="rank = 'ascending'"
              >
                <img
                  class="mx-auto"
                  src="@/assets/icons/sort-ascend.svg"
                  alt="sort ascending icon"
                />
              </button>
              <button
                class="w-12 h-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                :class="{ 'bg-gray-300': rank === 'descending' }"
                @click="rank = 'descending'"
              >
                <img
                  class="mx-auto"
                  src="@/assets/icons/sort-descend.svg"
                  alt="sort descending icon"
                />
              </button>
            </div>
          </div>
          <!-- <div class="flex mt-2 items-center">
            <input
              type="radio"
              id="sort-by-custom"
              name="sort-by-custom"
              value="custom"
              v-model="sortBy"
            />
            <label class="ml-2" for="sort-by-custom"
              >自定义排序<span class="text-xs">（可拖拽实现重排）</span></label
            >
          </div> -->
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">分享书摘设置</span>
          </h3>
          <div class="flex space-x-2 mt-2">
            <button
              v-for="app of shareAppList"
              :key="app.name"
              :title="app.name"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              @click="showShareSettingModalHandler(app.name)"
            >
              <img
                class="w-10"
                :src="`apps/${app.img}`"
                :alt="`${app.name} logo`"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div ref="quotesList" class="flex-grow quotes-list px-3 py-6 h-full">
      <div
        v-if="newQuote && newQuote._id === 'whole_book_new'"
        class="quote-card-container"
      >
        <quote-card
          ref="whole_book_new"
          :category="category"
          :quote="newQuote"
          :quote-chapter.sync="quoteChapter"
          :quote-location.sync="quoteLocation"
          :quote-type="quoteType"
          :editor="editor"
          :commentEditor="commentEditor"
          @inactive-editor="inactiveEditor"
        >
        </quote-card>
      </div>
      <div
        v-if="quotes.length > 0 && quotesListMode === 'default'"
        class="quotes space-y-3"
        :class="gridLayout"
      >
        <div
          v-for="quote of quotesRendered"
          :key="quote._id"
          class="quote-card-container"
        >
          <quote-card
            :ref="quote._id"
            :category="category"
            :quote="quote"
            :quote-chapter.sync="quoteChapter"
            :quote-location.sync="quoteLocation"
            :quote-type="quoteType"
            :editor="editor"
            :commentEditor="commentEditor"
            @active-editor="activeEditor(quote)"
            @inactive-editor="inactiveEditor"
          >
          </quote-card>
        </div>
      </div>
      <div v-if="quotes.length > 0 && quotesListMode === 'chapter'">
        <section
          v-for="item of quotesClassifyByChapter"
          :key="item.name"
          :ref="item.name"
        >
          <div class="chapter py-3 flex justify-between">
            <div class="flex items-center">
              <button
                class="flex items-center"
                :class="{
                  'opacity-40 hover:opacity-80': !quoteEditing,
                  'opacity-10': quoteEditing,
                }"
                :disabled="quoteEditing"
                @click="addNewQuote(`${item.name}_new`, item.name)"
              >
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-6 h-6"
                />
              </button>
              <span class="ml-1 text-gray-500">{{
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
            class="quotes"
            :class="gridLayout"
          >
            <div
              v-if="newQuote && newQuote._id === `${item.name}_new`"
              class="quote-card-container"
            >
              <quote-card
                class="h-auto"
                :ref="`${item.name}_new`"
                :category="category"
                :quote="newQuote"
                :quote-chapter.sync="quoteChapter"
                :quote-location.sync="quoteLocation"
                :quote-type="quoteType"
                :editor="editor"
                :commentEditor="commentEditor"
                @inactive-editor="inactiveEditor"
              >
              </quote-card>
            </div>
            <div
              v-for="quote of item.quotes"
              :key="quote._id"
              class="quote-card-container"
            >
              <quote-card
                :ref="quote._id"
                :category="category"
                :quote="quote"
                :quote-chapter.sync="quoteChapter"
                :quote-location.sync="quoteLocation"
                :quote-type="quoteType"
                :editor="editor"
                :commentEditor="commentEditor"
                @active-editor="activeEditor(quote)"
                @inactive-editor="inactiveEditor"
              >
              </quote-card>
            </div>
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
    <import-quotes-modal
      v-if="book && book.metadata && showImportQuotesModal"
      class="fixed w-screen h-screen inset-0"
      :book-id="book._id"
      :import-quotes-init-tab="importQuotesInitTab"
      @close-import-quotes-modal="closeImportQuoteModelHandler"
    ></import-quotes-modal>
    <share-quotes-setting-modal
      v-if="showShareQuotesSettingModal"
      class="fixed w-screen h-screen inset-0"
      :share-quotes-init-tab="shareQuotesInitTab"
      @close-share-quotes-setting-modal="showShareQuotesSettingModal = false"
    ></share-quotes-setting-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { Editor } from 'tiptap';
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
  // Image,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import hljs from 'highlight.js';
import QuoteImage from '@/assets/js/plugins/QuoteImage';

import QuoteCard from './QuoteCard.vue';
import QuoteEditorMenu from './editor/QuoteEditorMenu.vue';
// import QuoteEditorFloatingMenu from "./editor/QuoteEditorFloatingMenu.vue";

import ImportQuotesModal from './modal/ImportQuotesModal.vue';
import ShareQuotesSettingModal from './modal/ShareQuotesSettingModal.vue';

const importQuotesAppsMap = {
  kindle: 'kindle-notes-parse',
  duokan: 'duokan-notes-parse',
  douban: 'douban-notes-parse',
  douban_reading: 'douban-reading-notes-parse',
  wechat_reading: 'wechat-reading-notes-parse',
};

const shareQuotesAppsMap = {
  image: 'share-quotes-as-image',
  markdown: 'share-quotes-as-markdown',
  json: 'share-quotes-as-json',
  html: 'share-quotes-as-html',
  word: 'share-quotes-as-word',
};

export default {
  props: ['category', 'quotes', 'quotesChapters'],
  components: {
    // Treeselect,
    // EditorContent,
    QuoteCard,
    QuoteEditorMenu,
    // QuoteEditorFloatingMenu,
    ImportQuotesModal,
    ShareQuotesSettingModal,
  },
  data() {
    return {
      imageBase: process.env.VUE_APP_QUOTE_IMAGES_BASE,
      showMoreModal: false,
      importAppList: [
        {
          name: 'kindle',
          img: 'kindle.png',
        },
        {
          name: 'duokan',
          img: 'duokan.png',
        },
        {
          name: 'douban',
          img: 'douban.png',
        },
        {
          name: 'douban_reading',
          img: 'douban_reading.png',
        },
        {
          name: 'wechat_reading',
          img: 'wechat_reading.png',
        },
      ],
      importQuotesInitTab: 'kindle-notes-parse',
      showImportQuotesModal: false,
      classifyByChapter: false,
      sideBySide: false,
      cols: 2,
      sortBy: 'location',
      rank: 'ascending',
      selectQuotes: [],
      shareAppList: [
        {
          name: 'image',
          img: 'image.png',
        },
        {
          name: 'markdown',
          img: 'markdown.png',
        },
        {
          name: 'json',
          img: 'json.png',
        },
        {
          name: 'html',
          img: 'html.png',
        },
        {
          name: 'word',
          img: 'word.png',
        },
      ],
      shareQuotesInitTab: 'share-quote-as-image',
      showShareQuotesSettingModal: false,
      hiddenQuotes: [],
      HTMLtemp: null,
      JSONtemp: null,
      commentJSONtemp: null,
      quoteChapter: '',
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
    ...mapState({
      quotesListMode: (state) => state.quotesListMode,
      currentQuotesChapter: (state) => state.currentQuotesChapter,
      book: (state) => state.book.book,
      quoteEditing: (state) => state.quote.quoteEditing,
      editingQuote: (state) => state.quote.editingQuote,
      addingCommentQuote: (state) => state.quote.addingCommentQuote,
      showShareQuotesSetting: (state) => state.share.showShareQuotesSetting,
    }),
    quotesRendered() {
      const quotesRendered = [];
      const regexp = /<img([^>]*)\ssrc="([^">]+)"\s([^>]*)\sdata-type="uploaded"([^>]*)>/gi;
      this.quotes.forEach((quote) => {
        const quoteTemp = { ...quote };
        const content = this.convert(quote.content, true);
        quoteTemp.content = content.replace(
          regexp,
          (match, p1, p2, p3, p4) => `<img${p1} src="${this.imageBase}${p2}" ${p3} data-type="uploaded" ${p4}>`,
        );
        if (quote.comment) {
          const comment = this.convert(quote.comment, true);
          quoteTemp.comment = comment.replace(
            regexp,
            (match, p1, p2, p3, p4) => `<img${p1} src="${this.imageBase}${p2}" ${p3} data-type="uploaded" ${p4}>`,
          );
        }
        quotesRendered.push(quoteTemp);
      });

      if (this.quotesListMode === 'default') {
        if (this.rank === 'ascending') {
          quotesRendered.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(a[this.sortBy]) - new Date(b[this.sortBy]);
            }
            return a[this.sortBy] - b[this.sortBy];
          });
        } else if (this.rank === 'descending') {
          quotesRendered.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(b[this.sortBy]) - new Date(a[this.sortBy]);
            }
            return b[this.sortBy] - a[this.sortBy];
          });
        }
      }
      return quotesRendered;
    },
    quotesClassifyByChapter() {
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

      chaptersContainer.forEach((item) => {
        if (this.rank === 'ascending') {
          item.quotes.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(a[this.sortBy]) - new Date(b[this.sortBy]);
            }
            return a[this.sortBy] - b[this.sortBy];
          });
        } else if (this.rank === 'descending') {
          item.quotes.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(b[this.sortBy]) - new Date(a[this.sortBy]);
            }
            return b[this.sortBy] - a[this.sortBy];
          });
        }
      });
      return chaptersContainer;
    },
    gridLayout() {
      if (this.sideBySide) {
        return `grid gap-x-2 gap-y-3 grid-cols-${this.cols}`;
      }
      return 'space-y-3';
    },
  },
  watch: {
    classifyByChapter() {
      if (this.classifyByChapter) {
        this.$store.dispatch('changeDisplayMode', {
          type: 'quotes',
          mode: 'chapter',
        });
      } else {
        this.$store.dispatch('changeDisplayMode', {
          type: 'quotes',
          mode: 'default',
        });
      }
      this.$nextTick(() => {
        hljs.highlightAll();
      });
    },
    currentQuotesChapter() {
      if (
        this.quotesListMode === 'chapter'
        && this.currentQuotesChapter !== null
      ) {
        const top = this.$refs[this.currentQuotesChapter][0].offsetTop;
        this.$refs.quotesList.scrollTop = top - 6 * 14;
      }
    },
    addingCommentQuote() {
      if (this.addingCommentQuote) {
        this.commentEditor.focus();
      }
    },
  },
  methods: {
    getQuotes() {
      const { id } = this.$route.params;
      this.$store.dispatch('getBook', { id }).then((book) => {
        if (book.quote_ids.length > 0) {
          this.$store.dispatch('getQuotes', { book_id: id }).then((quotes) => {
            this.$store.dispatch('setQuotes', quotes);
            this.$nextTick(() => {
              hljs.highlightAll();
            });
          });
        }
      });
    },
    colsInputHandler() {
      if (this.cols > 5) {
        this.cols = 5;
      }
    },
    showImportQuotesModalHandler(val) {
      this.importQuotesInitTab = importQuotesAppsMap[val];
      this.showImportQuotesModal = true;
      this.showMoreModal = false;
    },
    closeImportQuoteModelHandler() {
      this.showImportQuotesModal = false;
      this.getQuotes();
    },
    showShareSettingModalHandler(val) {
      this.shareQuotesInitTab = shareQuotesAppsMap[val];
      this.showShareQuotesSettingModal = true;
      this.showMoreModal = false;
    },
    // closeShareQuoteSettingModelHandler() {
    //   this.showShareQuotesSettingModal = false;
    // },
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
      this.$store.dispatch('changeDisplayMode', { type: 'quotes', mode });
    },
    activeEditor(quote) {
      if (!this.editingQuote) {
        if (quote.chapter) this.quoteChapter = quote.chapter;
        if (quote.location) this.quoteLocation = quote.location;
        this.quoteType = quote.type;
        this.editor.setContent(quote.content, true);
        if (quote.comment) {
          this.commentEditor.setContent(quote.comment, true);
        }
        this.$store.dispatch('setEditingQuote', quote._id);
      }

      this.$nextTick(() => {
        if (this.editingQuote === 'whole_book_new') {
          this.$refs[this.editingQuote].$el.focus();
        } else if (
          /new$/.test(this.editingQuote)
          && this.editingQuote !== 'whole_book_new'
        ) {
          this.$refs[this.editingQuote][0].$el.focus();
        }

        if (this.addingCommentQuote) {
          this.commentEditor.focus();
        } else {
          this.editor.focus();
        }

        const delayTimer = setTimeout(() => {
          this.$store.dispatch('toggleQuoteEditing');
          clearTimeout(delayTimer);
        }, 0);
      });
    },
    addNewQuote(newID, newChapter = '') {
      if (!newChapter || newChapter === '未分类(NoChapter)') {
        this.newQuote = {
          _id: newID,
          chapter: '',
          content: null,
          location: 0,
          type: 'annotation',
        };
      } else {
        this.newQuote = {
          _id: newID,
          chapter: newChapter,
          content: null,
          location: 0,
          type: 'annotation',
        };
      }

      this.activeEditor(this.newQuote);
    },
    async inactiveEditor(type) {
      this.$store.dispatch('toggleQuoteEditing');
      await this.$store.dispatch('saveQuoteImagesChange');

      let target = this.editingQuote;
      if (type === 'cancel') {
        this.$store.dispatch('cancelQuoteEditing');
        this.$store.dispatch('changeQuoteImagesSrc');
        if (!/new$/.test(target)) {
          // focus the editing quote
          this.$nextTick(() => {
            this.$refs[target][0].$el.focus();
            hljs.highlightAll();
          });
        }
      } else if (type === 'save') {
        this.$store
          .dispatch('saveQuoteEditing', {
            id: this.editingQuote,
            book: this.book._id,
            chapter: this.quoteChapter,
            location: this.quoteLocation,
            content: this.JSONtemp,
            comment: this.commentJSONtemp,
            type: this.quoteType,
          })
          .then((quotes) => {
            if (/new$/.test(this.editingQuote)) this.$store.dispatch('addQuotes', quotes);
            this.$store.dispatch('changeQuoteImagesSrc');
            return quotes[0]._id;
          })
          .then((id) => {
            target = id;
            // focus the editing quote
            this.$nextTick(() => {
              this.$refs[target][0].$el.focus();
              hljs.highlightAll();
            });
          });
      }
      this.editor.clearContent();
      this.commentEditor.clearContent();
      this.JSONtemp = null;
      this.commentJSONtemp = null;
      this.quoteChapter = '';
      this.quoteLocation = 0;
      this.newQuote = null;
    },
  },
  created() {
    this.classifyByChapter = this.quotesListMode === 'chapter';
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
        new QuoteImage(),
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
        new QuoteImage(),
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
        new QuoteImage(),
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
.highlight {
  text-decoration: none;
  box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 0.8);
  color: inherit;
}

.quotes-list {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.more-modal {
  max-height: 90vh;
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

// .menubar {
//   .is-active {
//     background: #e5e7eb;
//   }
// }

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

.vue-treeselect__control {
  height: 100%;
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
