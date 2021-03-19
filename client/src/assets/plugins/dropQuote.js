import { Node } from 'tiptap';

// import { DOMParser } from 'prosemirror-model';

export default class DropQuote extends Node {
  get name() {
    return 'drop_quote';
  }

  get schema() {
    return {};
  }

  commands() {
    return {
      moveCursor: (selection) => (state, dispatch) => {
        const { selection } = state;
        console.log(selection);
        let element = null;
        if (selection.$from.nodeBefore || selection.$from.nodeAfter) {
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
        const transaction = state.tr.insert(selection.head, slice.content);
        // const transaction = state.tr.replaceSelection
        dispatch(transaction);
        console.log(transaction);
        const moveCursorTr = state.tr.setSelection(transaction.selection);
        dispatch(moveCursorTr);
      },
    };
  }
}
