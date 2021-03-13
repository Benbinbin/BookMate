<template>
  <div class="editor-container">Summary</div>
</template>

<script>
import { Editor } from 'tiptap';

export default {
  props: [],
  data() {
    return {
      temp: null,
      editor: null,
    };
  },
  methods: {
    // summarySorted() {
    //   const container = this.chaptersContainer();
    //   this.summaries.forEach((summary) => {
    //     // use tiptap editor getHTML() render HTML from JSON content
    //     const quoteTemp = { ...quote };
    //     this.editor.setContent(quoteTemp.content, true);
    //     quoteTemp.content = this.temp;
    //     if (quoteTemp.comment) {
    //       this.editor.setContent(quoteTemp.comment, true);
    //       quoteTemp.comment = this.temp;
    //     }

    //     // sorted quotes into container
    //     const index = container.findIndex(
    //       (item) => item.name === quoteTemp.chapter,
    //     );
    //     if (index !== -1) {
    //       container[index].quotes.push(quoteTemp);
    //     } else {
    //       container[container.length - 1].quotes.push(quoteTemp);
    //     }
    //     this.temp = null;
    //   });
    //   return container;
    // },
    // chaptersContainer() {
    //   const chaptersContainer = [];
    //   this.chapters.forEach((chapter) => {
    //     chaptersContainer.push({
    //       name: chapter,
    //       summaries: [],
    //     });
    //   });
    //   chaptersContainer.push({
    //     name: '整书(whole)',
    //     summaries: [],
    //   });
    //   return chaptersContainer;
    // },
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

<style>
</style>
