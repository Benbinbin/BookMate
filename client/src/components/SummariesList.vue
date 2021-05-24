<template>
  <div class="max-w-full flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16 px-8 border-b-2 border-gray-100">
      <div
        v-if="!summaryEditing"
        class="default w-full h-full flex justify-between items-center"
      >
        <button
          class="flex items-center p-1 hover:bg-gray-100 opacity-30 hover:opacity-100 rounded-md"
          title="新增概述"
          :disabled="summaryEditing"
          @click="addNewSummary('whole_book_new')"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/add.svg"
            alt="add summary icon"
          />
        </button>
        <h2 class="text-xl font-bold">概述</h2>
        <button
          class="w-6 h-6 flex items-center p-1 rounded-md"
          title="更多选项"
        >
          <!-- <img class="w-6 h-6" src="@/assets/icons/menu.svg" alt="menu icon" /> -->
        </button>
      </div>
      <summary-editor-menu
        v-if="summaryEditing"
        :editor="editor"
        @focus-target="focusTarget"
        @inactive-editor="inactiveEditor"
      ></summary-editor-menu>
    </nav>
    <div ref="summariesList" class="summaries-list px-6 py-6 h-full">
      <summary-card
        v-if="newSummary && newSummary._id === 'whole_book_new'"
        ref="whole_book_new"
        :category="category"
        :summary="newSummary"
        :summary-chapter.sync="summaryChapter"
        :editor="editor"
      >
      </summary-card>
      <div
        v-if="summaries.length > 0 && summariesListMode === 'default'"
        class="summaries space-y-3"
      >
        <summary-card
          v-for="summary of item.summaries"
          :key="summary._id"
          :ref="summary._id"
          :category="category"
          :summary="summary"
          :summary-chapter.sync="summaryChapter"
          :editor="editor"
          @active-editor="activeEditor(summary)"
          @share-summary-as-markdown="downloadHandler(summary)"
        >
        </summary-card>
      </div>
      <div v-if="summaries.length > 0 && summariesListMode === 'chapter'">
        <section
          v-for="item of summariesSorted"
          :key="item.name"
          :ref="item.name"
        >
          <div class="chapter py-3 flex justify-between">
            <div class="flex items-center">
              <button
                class="flex items-center hover:bg-gray-200 p-1 rounded"
                :class="{
                  'opacity-50': !summaryEditing,
                  'opacity-10': summaryEditing,
                }"
                :disabled="summaryEditing"
                @click="addNewSummary(`${item.name}_new`, item.name)"
              >
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-6 h-6"
                />
              </button>
              <span class="ml-1 text-gray-500">{{
                item.name !== "整书(whole)" ? item.name : "整书"
              }}</span>
            </div>
            <div class="flex-shrink-0 flex items-center space-x-0.5">
              <!-- <button
                class="flex justify-center items-center hover:bg-gray-100 p-1 rounded"
                :class="{
                  'text-blue-500': chapterPinState(item.summaries),
                  'text-gray-500': !chapterPinState(item.summaries),
                }"
                @click="chapterPinHandler(item.summaries)"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.9167 24.7917V35.4167C22.9167 35.9692 23.1362 36.4991 23.5269 36.8898C23.9176 37.2805 24.4475 37.5 25 37.5C25.5525 37.5 26.0824 37.2805 26.4731 36.8898C26.8638 36.4991 27.0833 35.9692 27.0833 35.4167V24.7917C29.6126 24.2754 31.86 22.8384 33.39 20.7592C34.9199 18.68 35.6234 16.1069 35.3639 13.5385C35.1045 10.9702 33.9006 8.58967 31.9857 6.8585C30.0709 5.12732 27.5814 4.16882 25 4.16882C22.4186 4.16882 19.9291 5.12732 18.0143 6.8585C16.0994 8.58967 14.8955 10.9702 14.6361 13.5385C14.3766 16.1069 15.0801 18.68 16.61 20.7592C18.1399 22.8384 20.3874 24.2754 22.9167 24.7917ZM25 8.33336C26.2361 8.33336 27.4445 8.69992 28.4723 9.38668C29.5001 10.0734 30.3012 11.0496 30.7742 12.1916C31.2473 13.3336 31.3711 14.5903 31.1299 15.8027C30.8888 17.0151 30.2935 18.1287 29.4194 19.0028C28.5453 19.8769 27.4317 20.4721 26.2193 20.7133C25.0069 20.9544 23.7503 20.8307 22.6082 20.3576C21.4662 19.8846 20.4901 19.0835 19.8033 18.0557C19.1166 17.0279 18.75 15.8195 18.75 14.5834C18.75 12.9258 19.4085 11.336 20.5806 10.1639C21.7527 8.99184 23.3424 8.33336 25 8.33336ZM33.7708 30.0417C33.4972 29.9842 33.215 29.9812 32.9403 30.0329C32.6655 30.0845 32.4036 30.1897 32.1696 30.3425C31.9355 30.4954 31.7338 30.6928 31.576 30.9236C31.4182 31.1544 31.3075 31.4139 31.25 31.6875C31.1925 31.9611 31.1895 32.2433 31.2412 32.5181C31.2928 32.7928 31.398 33.0547 31.5508 33.2888C31.7037 33.5229 31.9011 33.7246 32.1319 33.8824C32.3627 34.0401 32.6222 34.1509 32.8958 34.2084C37.625 35.1459 39.5833 36.8334 39.5833 37.5C39.5833 38.7084 34.4792 41.6667 25 41.6667C15.5208 41.6667 10.4167 38.7084 10.4167 37.5C10.4167 36.8334 12.375 35.1459 17.1042 34.125C17.3778 34.0676 17.6373 33.9568 17.8681 33.799C18.0989 33.6412 18.2963 33.4396 18.4492 33.2055C18.602 32.9714 18.7072 32.7095 18.7588 32.4348C18.8105 32.16 18.8075 31.8778 18.75 31.6042C18.6925 31.3306 18.5818 31.071 18.424 30.8402C18.2662 30.6095 18.0645 30.412 17.8304 30.2592C17.5964 30.1064 17.3345 30.0011 17.0597 29.9495C16.785 29.8979 16.5028 29.9009 16.2292 29.9584C9.89583 31.4167 6.25 34.1459 6.25 37.5C6.25 42.9792 15.6875 45.8334 25 45.8334C34.3125 45.8334 43.75 42.9792 43.75 37.5C43.75 34.1459 40.1042 31.4167 33.7708 30.0417Z"
                  />
                </svg>
              </button> -->
              <button
                class="flex items-center hover:bg-gray-200 p-1 rounded"
                :class="{
                  'text-blue-500': !hiddenSummaries.includes(item.name),
                  'text-gray-500': hiddenSummaries.includes(item.name),
                }"
                @click="toggleSummaries(item.name)"
              >
                <svg
                  class="w-6 h-6"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M27.0833 29.1666H18.75C18.1975 29.1666 17.6676 29.3861 17.2769 29.7768C16.8862 30.1675 16.6667 30.6974 16.6667 31.25C16.6667 31.8025 16.8862 32.3324 17.2769 32.7231C17.6676 33.1138 18.1975 33.3333 18.75 33.3333H27.0833C27.6359 33.3333 28.1658 33.1138 28.5565 32.7231C28.9472 32.3324 29.1667 31.8025 29.1667 31.25C29.1667 30.6974 28.9472 30.1675 28.5565 29.7768C28.1658 29.3861 27.6359 29.1666 27.0833 29.1666ZM35.4167 8.33329H32.9583C32.5285 7.11756 31.7332 6.06454 30.6814 5.31858C29.6296 4.57262 28.3728 4.17025 27.0833 4.16663H22.9167C21.6272 4.17025 20.3704 4.57262 19.3186 5.31858C18.2668 6.06454 17.4715 7.11756 17.0417 8.33329H14.5833C12.9257 8.33329 11.336 8.99177 10.1639 10.1639C8.99182 11.336 8.33334 12.9257 8.33334 14.5833V39.5833C8.33334 41.2409 8.99182 42.8306 10.1639 44.0027C11.336 45.1748 12.9257 45.8333 14.5833 45.8333H35.4167C37.0743 45.8333 38.664 45.1748 39.8361 44.0027C41.0082 42.8306 41.6667 41.2409 41.6667 39.5833V14.5833C41.6667 12.9257 41.0082 11.336 39.8361 10.1639C38.664 8.99177 37.0743 8.33329 35.4167 8.33329ZM20.8333 10.4166C20.8333 9.86409 21.0528 9.33419 21.4435 8.94349C21.8342 8.55279 22.3641 8.33329 22.9167 8.33329H27.0833C27.6359 8.33329 28.1658 8.55279 28.5565 8.94349C28.9472 9.33419 29.1667 9.86409 29.1667 10.4166V12.5H20.8333V10.4166ZM37.5 39.5833C37.5 40.1358 37.2805 40.6657 36.8898 41.0564C36.4991 41.4471 35.9692 41.6666 35.4167 41.6666H14.5833C14.0308 41.6666 13.5009 41.4471 13.1102 41.0564C12.7195 40.6657 12.5 40.1358 12.5 39.5833V14.5833C12.5 14.0308 12.7195 13.5009 13.1102 13.1102C13.5009 12.7195 14.0308 12.5 14.5833 12.5H16.6667V14.5833C16.6667 15.1358 16.8862 15.6657 17.2769 16.0564C17.6676 16.4471 18.1975 16.6666 18.75 16.6666H31.25C31.8025 16.6666 32.3324 16.4471 32.7231 16.0564C33.1138 15.6657 33.3333 15.1358 33.3333 14.5833V12.5H35.4167C35.9692 12.5 36.4991 12.7195 36.8898 13.1102C37.2805 13.5009 37.5 14.0308 37.5 14.5833V39.5833ZM31.25 20.8333H18.75C18.1975 20.8333 17.6676 21.0528 17.2769 21.4435C16.8862 21.8342 16.6667 22.3641 16.6667 22.9166C16.6667 23.4692 16.8862 23.9991 17.2769 24.3898C17.6676 24.7805 18.1975 25 18.75 25H31.25C31.8025 25 32.3324 24.7805 32.7231 24.3898C33.1138 23.9991 33.3333 23.4692 33.3333 22.9166C33.3333 22.3641 33.1138 21.8342 32.7231 21.4435C32.3324 21.0528 31.8025 20.8333 31.25 20.8333Z"
                  />
                </svg>
                <!-- <span>{{ item.summaries.length }}</span> -->
              </button>
            </div>
          </div>
          <div
            v-show="!hiddenSummaries.includes(item.name)"
            class="summaries space-y-3"
          >
            <summary-card
              v-if="newSummary && newSummary._id === `${item.name}_new`"
              :ref="`${item.name}_new`"
              :category="category"
              :summary="newSummary"
              :summary-chapter.sync="summaryChapter"
              :editor="editor"
            >
            </summary-card>
            <summary-card
              v-for="summary of item.summaries"
              :key="summary._id"
              :ref="summary._id"
              :category="category"
              :summary="summary"
              :summary-chapter.sync="summaryChapter"
              :editor="editor"
              @active-editor="activeEditor(summary)"
              @share-summary-as-markdown="downloadHandler(summary)"
            >
            </summary-card>
          </div>
          <hr class="mx-auto my-8 border-gray-300 w-1/2" />
        </section>
      </div>
      <footer class="my-12 items-center">
        <div class="flex justify-center items-center">
          <button
            @click="backToTopHandler"
            class="hover:bg-gray-300 text-gray-300 hover:text-white p-3 rounded-md font-bold my-4"
          >
            返回顶部
          </button>
        </div>
      </footer>
    </div>
    <div v-show="false">
      <summary-to-markdown
        v-if="shareSummary"
        ref="shareDom"
        :summary="shareSummary"
      ></summary-to-markdown>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TurndownService from 'turndown';
import { saveAs } from 'file-saver';

import { Editor } from 'tiptap';
import {
  Bold,
  Blockquote,
  BulletList,
  Code,
  CodeBlockHighlight,
  Italic,
  // Link,
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
import Link from '@/assets/js/plugins/Link';
import InsertQuote from '@/assets/js/plugins/InsertQuote';
import SummaryImage from '@/assets/js/plugins/SummaryImage';
import QuoteBlock from '@/assets/js/plugins/QuoteBlock';
import QuoteInline from '@/assets/js/plugins/QuoteInline';
import MathInline from '@/assets/js/plugins/MathInline';
import MathInlineShow from '@/assets/js/plugins/MathInlineShow';
import MathBlock from '@/assets/js/plugins/MathBlock';
import MathBlockShow from '@/assets/js/plugins/MathBlockShow';

import SummaryCard from './SummaryCard.vue';
import SummaryEditorMenu from './editor/SummaryEditorMenu.vue';
import SummaryToMarkdown from './share/SummaryToMarkdown.vue';

export default {
  props: ['category', 'summaries', 'summariesChapters'],
  components: {
    SummaryCard,
    // EditorContent,
    SummaryEditorMenu,
    // Treeselect,
    SummaryToMarkdown,
  },
  data() {
    return {
      imageBase: process.env.VUE_APP_SUMMARY_IMAGES_BASE,
      hiddenSummaries: [],
      HTMLtemp: null,
      JSONtemp: null,
      summaryChapter: '',
      newSummary: null,
      convertor: null,
      editor: null,
      shareSummary: null,
    };
  },
  computed: {
    ...mapState({
      summariesListMode: (state) => state.summariesListMode,
      currentSummariesChapter: (state) => state.currentSummariesChapter,
      book: (state) => state.book.book,
      summaryEditing: (state) => state.summary.summaryEditing,
      editingSummary: (state) => state.summary.editingSummary,
      candidateQuote: (state) => state.summary.candidateQuote,
      insertQuote: (state) => state.summary.insertQuote,
    }),
    summariesRendered() {
      const summariesRendered = [];
      const regexp = /<img([^>]*)\ssrc="([^">]+)"\s([^>]*)\sdata-type="uploaded"([^>]*)>/gi;
      this.summaries.forEach((summary) => {
        const summaryTemp = { ...summary };
        const content = this.convert(summary.content, true);
        summaryTemp.content = content.replace(
          regexp,
          (match, p1, p2, p3, p4) => `<img${p1} src="${this.imageBase}${p2}" ${p3} data-type="uploaded" ${p4}>`,
        );
        summariesRendered.push(summaryTemp);
      });
      return summariesRendered;
    },
    summariesSorted() {
      if (this.summariesListMode === 'chapter') {
        const chaptersContainer = [];
        this.summariesChapters.forEach((chapter) => {
          chaptersContainer.push({
            name: chapter,
            summaries: [],
          });
        });
        chaptersContainer.push({
          name: '整书(whole)',
          summaries: [],
        });
        this.summariesRendered.forEach((summary) => {
          const index = chaptersContainer.findIndex(
            (item) => item.name === summary.chapter,
          );

          if (index !== -1) {
            chaptersContainer[index].summaries.push(summary);
          } else {
            chaptersContainer[chaptersContainer.length - 1].summaries.push(
              summary,
            );
          }
        });
        return chaptersContainer;
      }
      return this.summariesRendered;
    },
  },
  watch: {
    currentSummariesChapter() {
      if (
        this.summariesListMode === 'chapter'
        && this.currentSummariesChapter !== null
      ) {
        const top = this.$refs[this.currentSummariesChapter][0].offsetTop;
        this.$refs.summariesList.scrollTop = top - 6 * 14;
      }
    },
    insertQuote() {
      if (this.editingSummary && this.candidateQuote && this.insertQuote) {
        this.insert();
      }
    },
  },
  methods: {
    // categoryNormalizer(node) {
    //   return {
    //     id: encodeURIComponent(node.name),
    //     label: node.name,
    //     children: node.children,
    //   };
    // },
    // chapterPinState() {},
    // chapterPinHandler() {},
    backToTopHandler() {
      this.$refs.summariesList.scrollTop = 0;
    },
    toggleSummaries(val) {
      const index = this.hiddenSummaries.indexOf(val);
      if (index !== -1) {
        this.hiddenSummaries.splice(index, 1);
      } else {
        this.hiddenSummaries.push(val);
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
      this.$store.dispatch('changeDisplayMode', { type: 'summaries', mode });
    },
    downloadHandler(summary) {
      this.shareSummary = summary;

      this.$nextTick(() => {
        const dom = this.$refs.shareDom.$el;

        const turndownService = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced',
          fence: '```',
          emDelimiter: '*',
        });

        const markdownContent = turndownService.turndown(dom);
        const blob = new Blob([markdownContent], {
          type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, `《${this.book.metadata.titles[0]}》阅读笔记.md`);
      });
    },
    addNewSummary(newID, newChapter = '') {
      if (!newChapter || newChapter === '整书(whole)') {
        this.newSummary = {
          chapter: '',
          content: null,
          _id: newID,
        };
      } else {
        this.newSummary = {
          chapter: newChapter,
          content: null,
          _id: newID,
        };
      }

      this.activeEditor(this.newSummary);
    },
    activeEditor(summary) {
      if (this.editingSummary) return;
      const target = this.summaries.find((item) => item._id === summary._id);

      if (summary.chapter) this.summaryChapter = summary.chapter;
      this.editor.setContent(target ? target.content : summary.content, true);

      this.$store.dispatch('setEditingSummary', summary._id);
      this.$store.dispatch('toggleSummaryEditing');

      this.$nextTick(() => {
        if (this.editingSummary === 'whole_book_new') {
          this.$refs[this.editingSummary].$el.focus();
        } else if (
          /new$/.test(this.editingSummary)
          && this.editingSummary !== 'whole_book_new'
        ) {
          this.$refs[this.editingSummary][0].$el.focus();
        }
        this.editor.focus();
        // the tiptap mounted the Vue component as view twice
        // so add addition state to mark the real editing state
        const delayTimer = setTimeout(() => {
          this.$store.dispatch('toggleSummaryEditingState');
          clearTimeout(delayTimer);
        }, 0);
      });
    },
    focusTarget() {
      if (this.editingSummary === 'whole_book_new') {
        this.$refs[this.editingSummary].$el.focus();
      } else {
        this.$refs[this.editingSummary][0].$el.focus();
      }
    },
    async inactiveEditor(type) {
      this.$store.dispatch('toggleSummaryEditing');
      this.$store.dispatch('toggleSummaryEditingState');

      await this.$store.dispatch('saveSummaryImagesChange');

      let target = this.editingSummary;
      if (type === 'cancel') {
        this.$store.dispatch('cancelSummaryEditing');
        this.$store.dispatch('changeSummaryImagesSrc');
        if (!/new$/.test(target)) {
          // focus the editing summary
          this.$nextTick(() => {
            this.$refs[target][0].$el.focus();
            hljs.highlightAll();
          });
        }
      } else if (type === 'save') {
        this.$store
          .dispatch('saveSummaryEditing', {
            id: this.editingSummary,
            book: this.book._id,
            chapter: this.summaryChapter,
            content: this.JSONtemp,
          })
          .then((summaries) => {
            if (/new$/.test(this.editingSummary)) this.$store.dispatch('addSummaries', summaries);
            this.$store.dispatch('changeSummaryImagesSrc');
            return summaries[0]._id;
          })
          .then((id) => {
            target = id;
            // focus the editing summary
            this.$nextTick(() => {
              this.$refs[target][0].$el.focus();
              hljs.highlightAll();
            });
          });
      }
      this.editor.clearContent();
      this.JSONtemp = null;
      this.summaryChapter = '';
      this.newSummary = null;
    },
    insert() {
      this.editor.commands.insertHTML(this.candidateQuote);
      this.$store.dispatch('clearInsertQuote');
    },
  },
  mounted() {
    hljs.highlightAll();
  },
  created() {
    this.convertor = new Editor({
      extensions: [
        new QuoteBlock(),
        new QuoteInline(),
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
        new SummaryImage(),
        new MathInlineShow(),
        new MathBlockShow(),
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
        new QuoteBlock(),
        new QuoteInline(),
        new InsertQuote(),
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
        new SummaryImage(),
        new MathInline(),
        new MathBlock(),
      ],
      onUpdate: ({ getJSON, transaction }) => {
        this.JSONtemp = getJSON();
        // console.log(this.JSONtemp);
        // console.log(transaction);
      },
      onDrop: (view, event, slice, moved) => {
        // console.log(slice);
        if (
          slice.size === 1
          && slice.content.content[0].attrs.alt === 'quote icon'
        ) {
          setTimeout(() => {
            if (this.editingSummary && this.candidateQuote) {
              this.insert();
            }
          }, 0);
        }
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
.summaries-list {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}
</style>

<style lang="scss">
.vue-treeselect__control {
  height: 100%;
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
