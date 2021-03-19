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
      insertHTML: (value, pos) => (state, dispatch) => {
        const { selection } = state;
        console.log(selection);
        let element = null;
        if (selection.$from.nodeBefore || selection.$to.nodeAfter) {
          element = document.createElement('div');
          element.innerHTML = value.inlineDom;
          // element = value.inlineDom;
          // console.log(element);
        } else {
          element = document.createElement('div');
          element.innerHTML = value.blockDom;
          // element = value.blockDom;
          // console.log(element);
        }
        const slice = DOMParser.fromSchema(state.schema).parseSlice(element);

        if (selection.empty) {
          const insertTransaction = state.tr.insert(selection.head, slice.content);
          dispatch(insertTransaction);
        } else {
          const replaceTransaction = state.tr.replaceSelection(slice);
          dispatch(replaceTransaction);
        }
      },
    };
  }
}
