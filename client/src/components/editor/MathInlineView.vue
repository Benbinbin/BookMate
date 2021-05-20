<template>
  <span class="Math">
    <span
      class="katex-render"
      v-bind:class="hidden"
      ref="render"
      v-show="!parentHasSelection()"
      contenteditable="false"
    >
    </span>
    <span
      :contenteditable="false"
      class="decoration-inline-math"
      v-bind:class="active"
    >
      $
    </span>
    <span class="katex-editor" v-bind:class="active" ref="content"> </span>
    <span
      :contenteditable="false"
      class="decoration-inline-math"
      v-bind:class="active"
    >
      $
    </span>
  </span>
</template>

<script>
import katex from 'katex';
// import 'katex/dist/katex.min.css';

export default {
  name: 'Math',
  props: ['node', 'view', 'getPos'],
  computed: {
    active() {
      return this.parentHasSelection() ? 'active' : 'hidden';
    },
    hidden() {
      return this.parentHasSelection() ? 'hidden' : 'active';
    },
    textContent() {
      return this.node.textContent;
    },
  },
  watch: {
    textContent() {
      this.render(this.textContent);
    },
  },
  methods: {
    // Updates katex-render with node textContent.
    render(content) {
      katex.render(content, this.$refs.render, {
        throwOnError: false,
        displayMode: false,
      });
    },
    // Shows katex-render and hides katex-editor when selection is on parent.
    parentHasSelection() {
      const {
        doc,
        selection: { from, to, anchor },
      } = this.view.state;
      const rpos = doc.resolve(this.getPos());
      const parentNodeFrom = this.getPos() - rpos.parentOffset;
      const parentNodeTo = parentNodeFrom + rpos.parent.nodeSize;
      // decides whether the anchor is between the Math node or not
      const hasAnchor = this.getPos() < anchor && anchor < this.getPos() + this.node.nodeSize;
      //   const hasSelect = from < parentNodeTo && parentNodeFrom <= to;
      // some other cases where it is necessary like when the editor is out of focus OR displaying in non-editable mode.
      // I removed the selection as it doesn't change anything when I paste the math. It is adding extra $ at both ends. Don't know why.
      // return hasAnchor && this.view.focused && this.view.editable;
      // console.log(hasAnchor);
      return hasAnchor && this.view.focused;
    },
  },
  mounted() {
    if (this.node && this.node.textContent) this.render(this.node.textContent);
  },
};
</script>

<style lang="scss" scoped>
.Math {
  .decoration-inline-math {
    color: #8e9297;
  }
  .hidden {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;

    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }
  .active {
    position: static;

    width: auto;
    height: auto;
    margin: 0;

    clip: auto;
    overflow: visible;
  }
}
</style>
