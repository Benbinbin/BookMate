<template>
  <img
    :src="src"
    :alt="node.attrs.alt"
    :title="node.attrs.title"
    :data-src="dataSrc"
    :data-type="dataType"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['node', 'updateAttrs'],
  data() {
    return {
      imageBase: process.env.VUE_APP_SUMMARY_IMAGES_BASE,
    };
  },
  computed: {
    ...mapState(['savingSummary', 'changeSummaryImagesSrc']),
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
      console.log('change src');
      console.log(this.changeSummaryImagesSrc);
      if (this.changeSummaryImagesSrc && this.dataType && this.dataSrc) {
        this.src = this.dataSrc;
      }
      if (this.dataType === 'dropped') {
        this.dataType = 'uploaded';
      }
    },
  },
  beforeDestroy() {
    console.log(`beforeDestroy: ${this.changeSummaryImagesSrc}`);

    if (this.changeSummaryImagesSrc) return;
    if (this.dataType === 'dropped') {
      this.$store.dispatch('addImages', {
        action: 'remove',
        imageName: this.dataSrc,
        type: 'Summary',
      });
    } else if (this.dataType === 'uploaded') {
      this.$store.dispatch('removeImages', {
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
