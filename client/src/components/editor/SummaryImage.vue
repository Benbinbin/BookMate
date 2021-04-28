<template>
  <div class="m-4">
    <img
      :src="src"
      :alt="node.attrs.alt"
      :title="node.attrs.title"
      :data-src="dataSrc"
      :data-type="dataType"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['editor', 'node', 'updateAttrs'],
  data() {
    return {
      imageBase: process.env.VUE_APP_SUMMARY_IMAGES_BASE,
    };
  },
  computed: {
    ...mapState({
      summaryEditing: (state) => state.summary.summaryEditing,
      changeSummaryImagesSrc: (state) => state.summary.changeSummaryImagesSrc,
    }),
    src: {
      get() {
        let src = '';
        if (this.dataType === 'uploaded') {
          src = `${this.imageBase}${this.node.attrs['data-src']}`;
        } else {
          src = this.node.attrs.src;
        }
        return src;
      },
      set(val) {
        // we cannot update `src` itself because `this.node.attrs` is immutable
        this.updateAttrs({
          src: val,
        });
      },
    },
    dataSrc: {
      get() {
        return this.node.attrs['data-src'];
      },
      set(val) {
        // we cannot update `src` itself because `this.node.attrs` is immutable
        this.updateAttrs({
          'data-src': val,
        });
      },
    },
    dataType: {
      get() {
        return this.node.attrs['data-type'];
      },
      set(val) {
        this.updateAttrs({
          'data-type': val,
        });
      },
    },
  },
  watch: {
    changeSummaryImagesSrc() {
      this.changeSrc();
    },
  },
  methods: {
    changeSrc() {
      if (this.changeSummaryImagesSrc && this.dataType && this.dataSrc) {
        this.src = this.dataSrc;
      }
      if (this.dataType === 'dropped') {
        this.dataType = 'uploaded';
      }
    },
  },
  beforeDestroy() {
    if (!this.summaryEditing) return;
    if (this.dataType === 'dropped') {
      this.$store.dispatch('addSummaryImages', {
        action: 'remove',
        imageName: this.dataSrc,
        type: 'Summary',
      });
    } else if (this.dataType === 'uploaded') {
      this.$store.dispatch('removeSummaryImages', {
        action: 'add',
        imageName: this.dataSrc,
        type: 'Summary',
      });
    }
  },
};
</script>

<style>
</style>
