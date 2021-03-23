<template>
  <editor-floating-menu :editor="editor" v-slot="{ commands, isActive, menu }">
    <div
      class="floating-menubar flex items-center ml-2 space-x-0.5"
      :class="{ 'is-active': menu.isActive }"
      :style="`top: ${menu.top}px`"
    >
      <div class="headings-container flex items-center relative">
        <button
          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
          :class="{
            'is-active': isActive.heading() || showEditorHeadingsModal,
          }"
          @click="showEditorHeadingsModal = !showEditorHeadingsModal"
        >
          <img src="@/assets/icons/editor/header.svg" alt="header icon" />
        </button>

        <div
          class="modal-container absolute top-7 left-1 z-20"
          v-show="showEditorHeadingsModal"
        >
          <div class="modal flex space-x-1 rounded bg-gray-100 shadow-md">
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 1 }),
              }"
              @click="markHeading(1)"
            >
              <img src="@/assets/icons/editor/h1.svg" alt="heading 1 icon" />
            </button>
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 2 }),
              }"
              @click="markHeading(2)"
            >
              <img src="@/assets/icons/editor/h2.svg" alt="heading 2 icon" />
            </button>
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 3 }),
              }"
              @click="markHeading(3)"
            >
              <img src="@/assets/icons/editor/h3.svg" alt="heading 3 icon" />
            </button>
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 4 }),
              }"
              @click="markHeading(4)"
            >
              <img src="@/assets/icons/editor/h4.svg" alt="heading 4 icon" />
            </button>
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 5 }),
              }"
              @click="markHeading(5)"
            >
              <img src="@/assets/icons/editor/h5.svg" alt="heading 5 icon" />
            </button>
            <button
              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
              :class="{
                'is-active': isActive.heading({ level: 6 }),
              }"
              @click="markHeading(6)"
            >
              <img src="@/assets/icons/editor/h6.svg" alt="heading 6 icon" />
            </button>
          </div>
        </div>
      </div>

      <button
        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
        :class="{ 'is-active': isActive.bullet_list() }"
        @click="commands.bullet_list"
      >
        <img
          src="@/assets/icons/editor/unordered-list.svg"
          alt="unordered list icon"
        />
      </button>
      <button
        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
        :class="{ 'is-active': isActive.ordered_list() }"
        @click="commands.ordered_list"
      >
        <img
          src="@/assets/icons/editor/ordered-list.svg"
          alt="ordered list icon"
        />
      </button>
      <button
        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
        :class="{ 'is-active': isActive.code_block() }"
        @click="commands.code_block"
      >
        <img src="@/assets/icons/editor/codeblock.svg" alt="codeblock icon" />
      </button>
      <button
        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
        :class="{ 'is-active': isActive.blockquote() }"
        @click="commands.blockquote"
      >
        <img src="@/assets/icons/quote.svg" alt="codeblock icon" />
      </button>
    </div>
  </editor-floating-menu>
</template>

<script>
import { EditorFloatingMenu } from 'tiptap';

export default {
  props: ['editor'],
  components: { EditorFloatingMenu },
  data() {
    return {
      showEditorHeadingsModal: false,
    };
  },
  methods: {
    markHeading(headerLevel) {
      this.editor.commands.heading({ level: headerLevel });
      this.showEditorHeadingsModal = false;
    },
  },
};
</script>

<style lang="scss">
.floating-menubar {
  position: absolute;
  z-index: 1;
  margin-top: 0rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  &.is-active {
    opacity: 1;
    visibility: visible;
  }
}
</style>
