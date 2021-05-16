import { Node } from 'tiptap';
import { toggleBlockType, setBlockType, textblockTypeInputRule } from 'tiptap-commands';

// import './MathBlock.css'
import katex from 'katex';
import {
  lineIndent, lineUndent, newlineIndent, deleteMathBlock,
} from './MathBlockKeymaps';

// import "katex/dist/katex.min.css"

/*
 * Defines a ComponentView for MathBlock.
 */
export default class MathBlock extends Node {
  get name() {
    return 'mathblock';
  }

  get view() {
    return {
      name: 'mathblock',
      props: ['node', 'view', 'getPos'],
      watch: {
        'node.textContent': function (text) { this.updateKatex(text); },
      },
      computed: {
        visibleClass() {
          return (this.hasProseMirrorSelection() || true) ? 'active' : 'hidden';
        },
      },
      mounted() {
        this.updateKatex(this.node.textContent);
      },
      methods: {
        updateKatex(text) {
          katex.render(/\S/.test(text) ? text : '\\text{MathBlock}', this.$refs.render, {
            throwOnError: false, displayMode: true,
          });
        },
        hasProseMirrorSelection() {
          const { anchor } = this.view.state.selection;
          return this.getPos() <= anchor && anchor < this.node.nodeSize + this.getPos();
        },
      },
      template: `
        <div class="MathBlock">
          <div class="katex-render" ref="render" :contenteditable="false"></div>
          <pre class="katex-editor" v-bind:class="visibleClass" :data-lang="node.attrs.lang"><code ref="content"></code></pre>
        </div>`,
    };
  }

  get schema() {
    return {
      attrs: { lang: { default: 'stex' } },
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      selectable: true,
      draggable: true,
      parseDOM: [{ tag: 'div', class: 'MathBlock' }],
      toDOM: (node) => ['div', { class: 'MathBlock' },
        ['div', { class: 'katex-render', contenteditable: 'false' }],
        ['pre', { class: 'katex-editor' }, ['code', 0]],
      ],
    };
  }

  commands({ type, schema }) {
    return () => toggleBlockType(type, schema.nodes.paragraph);
  }

  keys({ type }) {
    return {
      'Shift-Ctrl-\\': setBlockType(type),
      Tab: lineIndent,
      'Shift-Tab': lineUndent,
      Enter: newlineIndent,
      Backspace: deleteMathBlock,
    };
  }

  inputRules({ type }) {
    return [
      textblockTypeInputRule(/^\$\$\$$/, type),
    ];
  }
}
