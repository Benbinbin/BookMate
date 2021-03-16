<template>
  <div class="flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16 px-8 border-b-2 border-gray-20">
      <div
        v-if="!editingSummary"
        class="default w-full h-full flex items-center justify-center"
      >
        <h2 class="text-xl font-bold">概述</h2>
      </div>
      <editor-menu-bar
        v-if="editingSummary"
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
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <img src="@/assets/icons/editor/h1.svg" alt="heading 1 icon" />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <img src="@/assets/icons/editor/h2.svg" alt="heading 2 icon" />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <img src="@/assets/icons/editor/h3.svg" alt="heading 3 icon" />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <img
              src="@/assets/icons/editor/unordered-list.svg"
              alt="unordered list icon"
            />
          </button>
          <button
            class="w-8 h-8 hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img
              src="@/assets/icons/editor/ordered-list.svg"
              alt="ordered list icon"
            />
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
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <img
              src="@/assets/icons/editor/codeblock.svg"
              alt="codeblock icon"
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
    <div ref="summariesList" class="summaries-list px-6 py-6 h-full">
      <div v-if="summariesListMode === 'default'" class="quotes space-y-3">
        <summary-card
          v-for="(summary, index) of item.summaries"
          :key="index"
          :summary="summary"
          @active-editor="activeEditor(summary)"
          @inactive-editor="inactiveEditor"
        >
          <template
            v-slot:body
            v-if="editingSummary && summary.id === editingSummary"
          >
            <div class="card-body mx-8">
              <editor-content :editor="editor"></editor-content>
            </div>
          </template>
        </summary-card>
      </div>
      <div v-if="summariesListMode === 'chapter'">
        <section
          v-for="item of summariesSorted"
          :key="item.name"
          :ref="item.name"
        >
          <div class="chapter py-3 flex justify-between opacity-50">
            <div class="flex items-center">
              <button>
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-6 h-6"
                />
              </button>
              <span class="ml-1">{{
                item.name !== "整书(whole)" ? item.name : "整书"
              }}</span>
            </div>
            <button
              class="flex items-center"
              :class="{
                'text-blue-500': !hiddenSummaries.includes(item.name),
                'text-black': hiddenSummaries.includes(item.name),
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
              <span>{{ item.summaries.length }}</span>
            </button>
          </div>
          <div
            v-show="!hiddenSummaries.includes(item.name)"
            class="summaries space-y-3"
          >
            <summary-card
              v-for="(summary, index) of item.summaries"
              :key="index"
              :summary="summary"
              @active-editor="activeEditor(summary)"
              @inactive-editor="inactiveEditor"
            >
              <template
                v-slot:body
                v-if="editingSummary && summary.id === editingSummary"
              >
                <div class="card-body mx-8">
                  <editor-content :editor="editor"></editor-content>
                </div>
              </template>
            </summary-card>
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
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
import SummaryCard from './SummaryCard.vue';

export default {
  props: ['summaries', 'summariesChapters'],
  components: { SummaryCard, EditorContent, EditorMenuBar },
  data() {
    return {
      hiddenSummaries: [],
      HTMLtemp: null,
      JSONtemp: null,
      convertor: null,
      editor: null,
    };
  },
  computed: {
    ...mapState([
      'summariesListMode',
      'currentSummariesChapter',
      'editingSummary',
    ]),
    summariesRendered() {
      const summariesRendered = [];
      this.summaries.forEach((summary) => {
        const summaryTemp = { ...summary };
        summaryTemp.content = this.convert(summary.content, true);
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
      // const top = this.$refs[this.currentChapter][0].offsetTop;
      // this.$refs.quotesList.scrollTop = top - 6 * 14;
    },
  },
  methods: {
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
      this.$store.dispatch('changeSummariesMode', mode);
    },
    activeEditor(summary) {
      this.editor.setContent(summary.content, true);
      this.$store.dispatch('activeSummaryEditing', summary.id);
      this.editor.focus();
    },
    inactiveEditor(type) {
      if (type === 'cancel') {
        this.$store.dispatch('cancelSummaryEditing');
        this.JSONtemp = null;
      } else if (type === 'save') {
        this.$store.dispatch('saveSummaryEditing', this.JSONtemp);
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