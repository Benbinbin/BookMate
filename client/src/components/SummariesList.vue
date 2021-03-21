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
        <div class="menubar w-full h-full flex items-center space-x-2">
          <button
            class="flex-grow flex items-center justify-center text-red-200 hover:bg-red-200 hover:text-white p-1.5 rounded"
            @click="inactiveEditor('cancel')"
          >
            <svg
              class="w-6 h-6"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 4.16669C20.8795 4.16669 16.8516 5.38854 13.4256 7.67774C9.99956 9.96693 7.3293 13.2207 5.75248 17.0274C4.17565 20.8342 3.76308 25.0231 4.56694 29.0644C5.3708 33.1057 7.35498 36.8178 10.2686 39.7314C13.1822 42.645 16.8943 44.6292 20.9356 45.433C24.9769 46.2369 29.1657 45.8243 32.9725 44.2475C36.7793 42.6707 40.0331 40.0004 42.3222 36.5744C44.6114 33.1484 45.8333 29.1205 45.8333 25C45.8333 22.2641 45.2944 19.5551 44.2475 17.0274C43.2005 14.4998 41.6659 12.2032 39.7314 10.2686C37.7968 8.33407 35.5002 6.7995 32.9725 5.75253C30.4449 4.70556 27.7358 4.16669 25 4.16669ZM25 41.6667C21.7036 41.6667 18.4813 40.6892 15.7405 38.8578C12.9996 37.0265 10.8634 34.4235 9.60198 31.3781C8.34052 28.3326 8.01046 24.9815 8.65355 21.7485C9.29663 18.5155 10.884 15.5458 13.2149 13.2149C15.5457 10.884 18.5154 9.29669 21.7485 8.6536C24.9815 8.01051 28.3326 8.34057 31.378 9.60203C34.4235 10.8635 37.0264 12.9997 38.8578 15.7405C40.6891 18.4813 41.6666 21.7037 41.6666 25C41.6666 29.4203 39.9107 33.6595 36.7851 36.7851C33.6595 39.9107 29.4202 41.6667 25 41.6667Z"
              />
              <path
                d="M30.6458 19.3542C30.4522 19.1589 30.2217 19.0039 29.9679 18.8981C29.714 18.7924 29.4417 18.7379 29.1667 18.7379C28.8916 18.7379 28.6193 18.7924 28.3655 18.8981C28.1116 19.0039 27.8812 19.1589 27.6875 19.3542L25 22.0625L22.3125 19.3542C21.9202 18.9619 21.3881 18.7415 20.8333 18.7415C20.2785 18.7415 19.7465 18.9619 19.3542 19.3542C18.9619 19.7465 18.7415 20.2785 18.7415 20.8333C18.7415 21.3881 18.9619 21.9202 19.3542 22.3125L22.0625 25L19.3542 27.6875C19.1589 27.8812 19.0039 28.1116 18.8981 28.3655C18.7924 28.6193 18.7379 28.8916 18.7379 29.1667C18.7379 29.4417 18.7924 29.714 18.8981 29.9679C19.0039 30.2217 19.1589 30.4522 19.3542 30.6458C19.5478 30.8411 19.7783 30.9961 20.0321 31.1019C20.286 31.2076 20.5583 31.2621 20.8333 31.2621C21.1084 31.2621 21.3807 31.2076 21.6345 31.1019C21.8884 30.9961 22.1188 30.8411 22.3125 30.6458L25 27.9375L27.6875 30.6458C27.8812 30.8411 28.1116 30.9961 28.3655 31.1019C28.6193 31.2076 28.8916 31.2621 29.1667 31.2621C29.4417 31.2621 29.714 31.2076 29.9679 31.1019C30.2217 30.9961 30.4522 30.8411 30.6458 30.6458C30.8411 30.4522 30.9961 30.2217 31.1019 29.9679C31.2076 29.714 31.2621 29.4417 31.2621 29.1667C31.2621 28.8916 31.2076 28.6193 31.1019 28.3655C30.9961 28.1116 30.8411 27.8812 30.6458 27.6875L27.9375 25L30.6458 22.3125C30.8411 22.1188 30.9961 21.8884 31.1019 21.6345C31.2076 21.3807 31.2621 21.1084 31.2621 20.8333C31.2621 20.5583 31.2076 20.286 31.1019 20.0321C30.9961 19.7783 30.8411 19.5478 30.6458 19.3542Z"
              />
            </svg>
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1.5 rounded"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/paragraph.svg"
              alt="paragraph icon"
            />
          </button>
          <div class="headings-container flex-grow flex relative">
            <button
              class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
              :class="{ 'is-active': isActive.heading() || showHeadingsModal }"
              @click="showHeadingsModal = !showHeadingsModal"
            >
              <img
                class="w-6 h-6"
                src="@/assets/icons/editor/header.svg"
                alt="header icon"
              />
            </button>
            <div
              class="modal-container absolute top-9 inset-x-0 z-20"
              v-show="showHeadingsModal"
            >
              <div class="modal flex flex-col space-y-1 rounded bg-gray-100 shadow-md">
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="markHeading(1)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h1.svg"
                    alt="heading 1 icon"
                  />
                </button>
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                  @click="markHeading(2)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h2.svg"
                    alt="heading 2 icon"
                  />
                </button>
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                  @click="markHeading(3)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h3.svg"
                    alt="heading 3 icon"
                  />
                </button>
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 4 }) }"
                  @click="markHeading(4)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h4.svg"
                    alt="heading 4 icon"
                  />
                </button>
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 5 }) }"
                  @click="markHeading(5)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h5.svg"
                    alt="heading 5 icon"
                  />
                </button>
                <button
                  class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
                  :class="{ 'is-active': isActive.heading({ level: 6 }) }"
                  @click="markHeading(6)"
                >
                  <img
                    class="w-6 h-6"
                    src="@/assets/icons/editor/h6.svg"
                    alt="heading 6 icon"
                  />
                </button>
              </div>
            </div>
          </div>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/unordered-list.svg"
              alt="unordered list icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/ordered-list.svg"
              alt="ordered list icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/code.svg"
              alt="code icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/codeblock.svg"
              alt="codeblock icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/bold.svg"
              alt="bold icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/italic.svg"
              alt="italic icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center bg-green-500 text-white p-1.5 rounded"
            @click="inactiveEditor('save')"
          >
            <svg
              class="w-6 h-6"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8333 8.16667C20.4131 8.16667 16.1738 9.92261 13.0482 13.0482C9.92261 16.1738 8.16667 20.4131 8.16667 24.8333C8.16667 29.2536 9.92261 33.4928 13.0482 36.6184C16.1738 39.7441 20.4131 41.5 24.8333 41.5C29.2536 41.5 33.4928 39.7441 36.6184 36.6184C39.7441 33.4928 41.5 29.2536 41.5 24.8333C41.5 20.4131 39.7441 16.1738 36.6184 13.0482C33.4928 9.92261 29.2536 8.16667 24.8333 8.16667V8.16667ZM4 24.8333C4 13.3271 13.3271 4 24.8333 4C36.3396 4 45.6667 13.3271 45.6667 24.8333C45.6667 36.3396 36.3396 45.6667 24.8333 45.6667C13.3271 45.6667 4 36.3396 4 24.8333Z"
              />
              <path
                d="M32.5562 19.1938C32.9468 19.5845 33.1662 20.1143 33.1662 20.6667C33.1662 21.2191 32.9468 21.7489 32.5562 22.1396L24.2229 30.4729C23.8322 30.8635 23.3024 31.0829 22.75 31.0829C22.1976 31.0829 21.6678 30.8635 21.2771 30.4729L17.1104 26.3063C16.9114 26.1141 16.7527 25.8842 16.6435 25.63C16.5343 25.3759 16.4769 25.1025 16.4745 24.8259C16.4721 24.5492 16.5248 24.2749 16.6295 24.0189C16.7343 23.7628 16.889 23.5302 17.0846 23.3346C17.2802 23.139 17.5128 22.9843 17.7688 22.8796C18.0249 22.7748 18.2992 22.7221 18.5758 22.7245C18.8525 22.7269 19.1258 22.7844 19.38 22.8936C19.6342 23.0027 19.8641 23.1615 20.0562 23.3604L22.75 26.0542L29.6104 19.1938C30.0011 18.8032 30.5309 18.5838 31.0833 18.5838C31.6358 18.5838 32.1656 18.8032 32.5562 19.1938V19.1938Z"
              />
            </svg>
          </button>
        </div>
      </editor-menu-bar>
    </nav>
    <div ref="summariesList" v-if="summaries.length > 0" class="summaries-list px-6 py-6 h-full">
      <div v-if="summariesListMode === 'default'" class="summaries space-y-3">
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
// editor package
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
  Image,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';

import { mapState } from 'vuex';
import QuoteBlock from '../assets/plugins/QuoteBlock';
import QuoteInline from '../assets/plugins/QuoteInline';
import InsertQuote from '../assets/plugins/InsertQuote';
import SummaryCard from './SummaryCard.vue';

export default {
  props: ['category', 'summaries', 'summariesChapters'],
  components: { SummaryCard, EditorContent, EditorMenuBar },
  data() {
    return {
      hiddenSummaries: [],
      HTMLtemp: null,
      JSONtemp: null,
      convertor: null,
      editor: null,
      showHeadingsModal: false,
    };
  },
  computed: {
    ...mapState([
      'summariesListMode',
      'currentSummariesChapter',
      'editingSummary',
      'candidateQuote',
      'insertQuote',
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
      if (this.summariesListMode === 'chapter' && this.currentSummariesChapter !== null) {
        const top = this.$refs[this.currentSummariesChapter][0].offsetTop;
        this.$refs.summariesList.scrollTop = top - 6 * 14;
      }
    },
    insertQuote() {
      if (this.editingSummary && this.candidateQuote && this.insertQuote) {
        // console.log('inserting');
        this.insert();
      }
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
    insert() {
      this.editor.commands.insertHTML(this.candidateQuote);
      this.$store.dispatch('clearQuote');
    },
    markHeading(headerLevel) {
      this.editor.commands.heading({ level: headerLevel });
      this.showHeadingsModal = false;
    },
  },
  mounted() {},
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
        new Image(),
      ],
      onUpdate: ({ getJSON }) => {
        this.JSONtemp = getJSON();
      },
      onDrop: (view, event, slice) => {
        console.log(slice);
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

.menubar {
  .is-active {
    background: #e5e7eb;
  }
}
</style>
