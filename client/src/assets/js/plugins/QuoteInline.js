import { Mark } from 'tiptap';

export default class InlineQuote extends Mark {
  get name() {
    return 'inline_quote';
  }

  get schema() {
    return {
      defining: true,
      draggable: true,
      attrs: {
        'data-chapter': { default: '' },
        'data-location': { default: 0 },
        class: { default: 'inline-quote' },
      },
      parseDOM: [
        {
          tag: 'span.inline-quote',
          getAttrs: (dom) => ({
            'data-chapter': dom.getAttribute('data-chapter'),
            'data-location': dom.getAttribute('data-location'),
            class: 'inline-quote',
          }),
        },
      ],
      toDOM: (node) => ['span', node.attrs, 0],
    };
  }
}
