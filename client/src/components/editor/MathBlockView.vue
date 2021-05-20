<template>
  <div class="MathBlock">
    <div
      class="katex-render overflow-x-auto"
      ref="render"
      :contenteditable="false"
    ></div>
    <div class="katex-editor" v-bind:class="visibleClass">
      <p class="decoration-block-math">$$</p>
      <pre class="border rounded p-4"><code ref="content"></code></pre>
      <p class="decoration-block-math">$$</p>
    </div>
  </div>
</template>

<script>
import katex from 'katex';

export default {
  name: 'mathblock',
  props: ['node', 'view', 'getPos'],
  computed: {
    textContent() {
      return this.node.textContent;
    },
    visibleClass() {
      return this.hasProseMirrorSelection() ? 'active' : 'hidden';
    },
  },
  watch: {
    textContent() {
      this.updateKatex(this.textContent);
    },
  },
  methods: {
    updateKatex(content) {
      katex.render(
        /\S/.test(content) ? content : '\\text{MathBlock}',
        this.$refs.render,
        {
          throwOnError: false,
          displayMode: true,
        },
      );
    },
    hasProseMirrorSelection() {
      const { anchor } = this.view.state.selection;
      return (
        this.getPos() <= anchor
        && anchor < this.node.nodeSize + this.getPos()
        && this.view.focused
      );
    },
  },
  mounted() {
    this.updateKatex(this.node.textContent);
  },
};
</script>

<style lang="scss" scoped>
.MathBlock {
  .katex-render {
    position: relative;
    transition: all 120ms ease-in-out, height 1s ease-in;
    cursor: pointer;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  .katex-editor {
    .decoration-block-math {
      color: #8e9297;
    }
    pre {
      white-space: pre-wrap;
      overflow-x: auto;
      margin: 0.5rem 0;
      padding: 6px 10px;
      border-radius: 3px;

      code {
        margin: 0;
        padding: 0;
        white-space: pre;
        border: none;
        background: transparent;
      }
    }
  }
  .katex-editor.hidden {
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
  .katex-editor.active {
    position: static;

    width: auto;
    height: auto;
    margin: 0;

    clip: auto;
    overflow: visible;
  }
}

// .ProseMirror .MathBlock {
//   display: flex;
//   flex-wrap: wrap;
//   margin-block-end: 0.50em;
//   margin-block-start: 0.50em;
// }

// .MathBlock .katex-render {
//   display: flex;
//   flex: 0 0 100%;
//   box-sizing: border-box;
//   overflow-y: overlay;
// }

// .MathBlock .katex-editor {
//   border-bottom-left-radius: 0px;
//   border-bottom-right-radius: 0px;
//   flex-grow: 1;
//   margin: 0 auto;
// }

// .MathBlock .katex-render .katex-error {
//   margin: 0 auto;
//   padding: 1em;
//   width: 100%;
//   font-family: "Fira Code", monospace;
//   font-size: 0.8em;
// }

// .katex-render .katex-display {
//   margin: 0 auto;
//   padding: 1em;
//   width: 100%;
//   overflow-x: auto;
//   overflow-y: hidden;
// }

// .katex-render .katex {
//   font-size: 1em;
// }

// .MathBlock .katex-render * {
//   user-select: none;
// }

// .MathBlock.empty-node code::before {
//   content: "mathblock";
//   float: left;
//   pointer-events: none;
//   height: 0;
// }

// .MathBlock .cm-tag {
// }
</style>
