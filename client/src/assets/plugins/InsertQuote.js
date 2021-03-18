import { Node } from 'tiptap';

import { DOMParser } from 'prosemirror-model';

export default class InsertQuote extends Node {
  get name() {
    return 'insert_quote';
  }

  get schema() {
    return {};
  }

  commands() {
    return {
      insertHTML: (value) => (state, dispatch) => {
        const { selection } = state;
        // console.log(selection.$to);
        let element = null;
        if (selection.$from.nodeBefore || selection.$from.nodeAfter) {
          element = document.createElement('div');
          element.innerHTML = value.inlineDom;
          // element = value.inlineDom;
          console.log(element);
        } else {
          element = document.createElement('div');
          element.innerHTML = value.blockDom;
          // element = value.blockDom;
          console.log(element);
        }

        const slice = DOMParser.fromSchema(state.schema).parseSlice(element);
        const transaction = state.tr.insert(selection.head, slice.content);
        dispatch(transaction);
      },
    };
  }
}
