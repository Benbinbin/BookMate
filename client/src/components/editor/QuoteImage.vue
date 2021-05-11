<template>
  <img
    class="my-4"
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
      imageBase: process.env.VUE_APP_QUOTE_IMAGES_BASE,
    };
  },
  computed: {
    ...mapState({
      editingQuote: (state) => state.quote.editingQuote,
      quoteEditingState: (state) => state.quote.quoteEditingState,
      changeQuoteImagesSrc: (state) => state.quote.changeQuoteImagesSrc,
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
    changeQuoteImagesSrc() {
      if (this.changeQuoteImagesSrc && this.dataType && this.dataSrc) {
        this.src = this.dataSrc;
      }
      if (this.dataType === 'dropped') {
        this.dataType = 'uploaded';
      }
    },
  },
  beforeDestroy() {
    if (!this.quoteEditingState) return;
    if (this.dataType === 'dropped') {
      this.$store.dispatch('addQuoteImages', {
        action: 'remove',
        imageName: this.dataSrc,
        type: 'Quote',
      });
    } else if (this.dataType === 'uploaded') {
      this.$store.dispatch('removeQuoteImages', {
        action: 'add',
        imageName: this.dataSrc,
        type: 'Quote',
      });
    }
  },
};
</script>

<style>
</style>
