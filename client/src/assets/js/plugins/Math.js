import { InputRule } from 'prosemirror-inputrules';
import { Node } from 'tiptap';

import katex from 'katex';
// import 'katex/dist/katex.min.css';

// import './Math.css'
import { deleteMath } from './MathKeymaps';

/*
 * Defines a ComponentView for Math.
 */
export default class Math extends Node {
  get name() {
    return 'math';
  }

  get schema() {
    return {
      code: true,
      content: 'text*',
      marks: '',
      group: 'inline',
      inline: true,
      defining: true,
      isolating: true,
      parseDOM: [{ tag: 'span.Math' }],
      toDOM: (node) => ['span', { class: 'Math' },
        ['span', { class: 'katex-render', contenteditable: 'false' }],
        ['span', { contenteditable: 'false' }, '$'],
        ['span', { class: 'katex-editor' }, 0],
        ['span', { contenteditable: 'false' }, '$'],
      ],
    };
  }

  get view() {
    return {
      name: 'Math',
      props: ['node', 'view', 'getPos'],
      computed: {
        active() { return this.parentHasSelection() ? 'active' : 'hidden'; },
        hidden() { return this.parentHasSelection() ? 'hidden' : 'active'; },
      },
      watch: {
        // eslint-disable-next-line func-names
        'node.textContent': function (textContent) { this.render(textContent); },
      },
      mounted() {
        if (this.node && this.node.textContent) this.render(this.node.textContent);
      },
      methods: {
        // Updates katex-render with node textContent.
        render(textContent) {
          katex.render(textContent, this.$refs.render, {
            throwOnError: false, displayMode: false,
          });
        },
        // Shows katex-render and hides katex-editor when selection is on parent.
        parentHasSelection() {
          const { doc, selection: { from, to, anchor } } = this.view.state;
          const rpos = doc.resolve(this.getPos());
          const parentNodeFrom = this.getPos() - rpos.parentOffset;
          const parentNodeTo = parentNodeFrom + rpos.parent.nodeSize;
          // decides whether the anchor is between the Math node or not
          const hasAnchor = this.getPos() < anchor && anchor < this.getPos() + this.node.nodeSize;
          const hasSelect = from < parentNodeTo && parentNodeFrom <= to;
          // some other cases where it is necessary like when the editor is out of focus OR displaying in non-editable mode.
          // I removed the selection as it doesn't change anything when I paste the math. It is adding extra $ at both ends. Don't know why.
          return hasAnchor && this.view.focused && this.view.editable;
        },
      },
      template: `
        <span class="Math">
          <span class="katex-render" v-bind:class="hidden" ref="render" v-show="!parentHasSelection()" contenteditable="false"></span><span :contenteditable="false" class="decoration-inline-math" v-bind:class="active">$</span><span class="katex-editor" v-bind:class="active" ref="content"></span><span :contenteditable="false" class="decoration-inline-math" v-bind:class="active">$</span>
        </span>
      `,
    };
  }

  inputRules({ type, getAttrs }) {
    return [
      // eslint-disable-next-line no-useless-escape
      new InputRule(/(?:\$)([^\$\s]+(?:\s+[^\$\s]+)*)(?:\$)$/, (state, match, start, end) => {
        const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
        const [matchedText, content] = match;
        const { tr, schema } = state;
        if (matchedText) {
          // Create the new Math node.
          tr.replaceWith(start, end, type.create(attrs, schema.text(content)));
        }
        return tr;
      }),
    ];
  }

  keys({ type }) {
    return {
      Backspace: deleteMath,
    };
  }
}
