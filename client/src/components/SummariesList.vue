<template>
  <div ref="summariesList" class="summaries-list px-3 py-6 h-full">
    <div v-if="summariesListMode === 'default'" class="quotes space-y-3">
      <summary-card
        v-for="(summary, index) of summariesSorted"
        :key="index"
        :summary="summary"
      ></summary-card>
    </div>
    <div v-if="summariesListMode === 'chapter'">
      <section
        v-for="item of summariesSorted"
        :key="item.name"
        :ref="item.name"
      >
        <div class="chapter">{{ item.name }}</div>
        <div
          v-for="(summary, index) of item.summaries"
          :key="index"
          class="summary-card rounded-lg outline-none"
          tabindex="0"
        >
          <div class="card-body mx-8" v-html="summary.content"></div>
        </div>
      </section>
    </div>
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
import SummaryCard from './SummaryCard.vue';

export default {
  props: ['summaries', 'summariesChapters'],
  components: { SummaryCard },
  data() {
    return {
      temp: null,
      editor: null,
    };
  },
  computed: {
    ...mapState(['summariesListMode', 'currentSummariesChapter']),
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
    convert(content) {
      // use tiptap editor getHTML() render HTML from JSON content
      this.editor.setContent(content, true);
      const tempContent = this.temp;
      this.temp = null;
      return tempContent;
    },
    changeMode(mode) {
      this.$store.dispatch('changeSummariesMode', mode);
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
