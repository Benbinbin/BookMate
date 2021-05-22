import { Mark, Plugin } from 'tiptap';
import {
  updateMark, removeMark, pasteRule, markInputRule,
} from 'tiptap-commands';
import { getMarkAttrs } from 'tiptap-utils';

// const LINK_MARKDOWN_INPUT_REGEX = /(?!!)\[(.+|:?)]\((\S+)\)/;

const LINK_INPUT_REGEX = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*))[\s\n]$/gi;

const LINK_PASTE_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b([-a-zA-Z0-9@:%_+.~#?&//=,()!]*)/gi;

export default class Link extends Mark {
  get name() {
    return 'link';
  }

  get defaultOptions() {
    return {
      openOnClick: true,
      target: '_blank',
    };
  }

  get schema() {
    return {
      attrs: {
        href: {
          default: null,
        },
        target: {
          default: '_blank',
        },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: (dom) => ({
            href: dom.getAttribute('href'),
            target: dom.getAttribute('target'),
          }),
        },
      ],
      toDOM: (node) => ['a', {
        ...node.attrs,
        rel: 'noopener noreferrer nofollow',
        target: node.attrs.target || this.options.target,
      }, 0],
    };
  }

  commands({ type }) {
    return (attrs) => {
      if (attrs.href) {
        return updateMark(type, attrs);
      }

      return removeMark(type);
    };
  }

  inputRules({ type }) {
    return [
      markInputRule(
        LINK_INPUT_REGEX,
        type,
        (match) => {
          console.log(match);
          return { href: match[1] };
        },
      ),
      // markInputRule(
      //   LINK_MARKDOWN_INPUT_REGEX,
      //   type,
      //   (match) => {
      //     console.log(match);
      //     const [, text, url] = match;
      //     console.log(text);
      //     console.log(url);
      //     return {
      //       href: url,
      //     };
      //   },
      // ),
    ];
  }

  pasteRules({ type }) {
    return [
      pasteRule(
        LINK_PASTE_REGEX,
        type,
        (url) => ({ href: url }),
      ),
    ];
  }

  get plugins() {
    if (!this.options.openOnClick) {
      return [];
    }

    return [
      new Plugin({
        props: {
          handleClick: (view, pos, event) => {
            const { schema } = view.state;
            const attrs = getMarkAttrs(view.state, schema.marks.link);

            if (attrs.href && event.target instanceof HTMLAnchorElement) {
              event.stopPropagation();
              window.open(attrs.href, attrs.target);
            }
          },
        },
      }),
    ];
  }
}
