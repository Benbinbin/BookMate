/**
 * reference: https://gist.github.com/BrianHung/60efde8536f3fa76334f759c33a741e5
 */
import { Node } from 'tiptap';
import katex from 'katex';

function generateMath(content) {
  return katex.renderToString(content, {
    throwOnError: false,
  });
}

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
      toDOM: (node) => {
        const mathBlock = document.createElement('div');
        mathBlock.classList.add('MathBlock');

        const render = document.createElement('div');
        render.classList.add('katex-render');
        render.innerHTML = generateMath(node.textContent);

        const origin = document.createElement('div');
        origin.classList.add('katex-origin');
        origin.classList.add('hidden');
        origin.innerHTML = `$$${node.textContent}$$`;

        mathBlock.append(render);
        mathBlock.append(origin);
        return mathBlock;
      },
    };
  }
}
