import { Node } from 'tiptap';

export default class QuoteBlock extends Node {
  get name() {
    return 'quote_block';
  }

  get schema() {
    return {
      content: 'block*',
      group: 'block',
      defining: true,
      draggable: true,
      attrs: {
        'data-chapter': { default: '' },
        'data-location': { default: 0 },
        class: { default: 'block-quote' },
      },
      parseDOM: [
        {
          tag: 'blockquote.block-quote',
          getAttrs: (dom) => ({
            'data-chapter': dom.getAttribute('data-chapter'),
            'data-location': dom.getAttribute('data-location'),
            class: 'block-quote',
          }),
        },
      ],
      toDOM: (node) => ['blockquote', node.attrs, 0],
    };
  }
}
