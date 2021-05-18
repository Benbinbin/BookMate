/**
 * reference: https://gist.github.com/BrianHung/b72126c98fa08cb1c09170b1394771a0
 */
import { InputRule } from 'prosemirror-inputrules';
import { Node } from 'tiptap';

import MathInlineView from '@/components/editor/MathInlineView.vue';
import { deleteMath } from './MathInlineKeymaps';

export default class Math extends Node {
  get name() {
    return 'math_inline';
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
        ['span', { class: 'katex-editor' }, 0],
      ],
    };
  }

  get view() {
    // Defines a ComponentView for Math
    return MathInlineView;
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
