import { Node } from 'tiptap';
import katex from 'katex';

function generateMath(content) {
  return katex.renderToString(content, {
    throwOnError: false,
  });
}

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
      toDOM: (node) => {
        const math = document.createElement('span');
        math.classList.add('Math');

        const render = document.createElement('span');
        render.classList.add('katex-render');
        render.innerHTML = generateMath(node.textContent);

        const origin = document.createElement('span');
        origin.classList.add('katex-origin');
        origin.classList.add('hidden');
        origin.innerHTML = `$${node.textContent}$`;

        math.append(render);
        math.append(origin);
        return math;
      },
    };
  }
}
