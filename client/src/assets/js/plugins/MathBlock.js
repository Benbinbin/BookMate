/**
 * reference: https://gist.github.com/BrianHung/60efde8536f3fa76334f759c33a741e5
 */
import { Node } from 'tiptap';
import { toggleBlockType, setBlockType, textblockTypeInputRule } from 'tiptap-commands';

import MathBlockView from '@/components/editor/MathBlockView.vue';
import {
  lineIndent, lineUndent, newlineIndent, deleteMathBlock,
} from './MathBlockKeymaps';

export default class MathBlock extends Node {
  get name() {
    return 'math_block';
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
        ['pre', ['code', 0]],
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
      textblockTypeInputRule(/^\$\$\$\$$/, type),
    ];
  }

  get view() {
    // Defines a ComponentView for MathBlock
    return MathBlockView;
  }
}
