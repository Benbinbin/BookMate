import { Node, Plugin } from 'tiptap';
import { nodeInputRule } from 'tiptap-commands';
import store from '@/store/index';
import QuoteImage from '@/components/editor/QuoteImage.vue';

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export default class Image extends Node {
  get name() {
    return 'image';
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        'data-src': {
          default: null,
        },
        'data-type': {
          default: null,
        },
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: (dom) => ({
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
            'data-src': dom.getAttribute('data-src'),
            'data-type': dom.getAttribute('data-type'),
          }),
        },
      ],
      toDOM: (node) => ['img', { class: 'content-image', ...node.attrs }],
    };
  }

  commands({ type }) {
    return (attrs) => (state, dispatch) => {
      const { selection } = state;
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
      const node = type.create(attrs);
      const transaction = state.tr.insert(position, node);
      dispatch(transaction);
    };
  }

  inputRules({ type }) {
    return [
      nodeInputRule(IMAGE_INPUT_REGEX, type, (match) => {
        const [, alt, src, title] = match;
        return {
          src,
          alt,
          title,
        };
      }),
    ];
  }

  get plugins() {
    // const upload = this.uploadFunc;
    return [
      new Plugin({
        props: {
          handleDOMEvents: {
            drop(view, event) {
              const hasFiles = event.dataTransfer
                && event.dataTransfer.files
                && event.dataTransfer.files.length;

              if (!hasFiles) {
                return;
              }

              const images = Array
                .from(event.dataTransfer.files)
                .filter((file) => (/image/i).test(file.type));

              if (images.length === 0) {
                return;
              }

              event.preventDefault();

              const { schema } = view.state;
              const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });

              images.forEach((image) => {
                const imageName = `${Date.now()}${Math.round(Math.random() * 100)}.${image.name.split('.')[1]}`;
                store.dispatch('addImages', {
                  action: 'add',
                  target: {
                    file: image,
                    imageName,
                  },
                  type: 'Quote',
                });
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = (readerEvent) => {
                  const node = schema.nodes.image.create({
                    src: readerEvent.target.result,
                    'data-src': imageName,
                    'data-type': 'dropped',
                  });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  view.dispatch(transaction);
                };
              });
            },
          },
          handlePaste(view, event, slice) {
            //   const { items } = event.clipboardData || event.originalEvent.clipboardData;
            //   for (const item of items) {
            //     if (item.type.indexOf('image') === 0) {
            //       event.preventDefault();
            //       const { schema } = view.state;

            //       const image = item.getAsFile();

            //       if (upload) {
            //         // upload(image).then((src) => {
            //         //   const node = schema.nodes.image.create({
            //         //     src,
            //         //   });
            //         //   const transaction = view.state.tr.replaceSelectionWith(node);
            //         //   view.dispatch(transaction);
            //         // });
            //       } else {
            //         const reader = new FileReader();
            //         reader.onload = (readerEvent) => {
            //           const node = schema.nodes.image.create({
            //             src: readerEvent.target.result,
            //
            //           });
            //           const transaction = view.state.tr.replaceSelectionWith(node);
            //           view.dispatch(transaction);
            //         };
            //         reader.readAsDataURL(image);
            //       }
            //     }
            //   }
            //   return false;
          },
        },
      }),
    ];
  }

  get view() {
    return QuoteImage;
  }
}
