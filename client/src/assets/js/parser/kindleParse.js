/**
 *
 * @param {Node} dom - the html document
 * @returns {Object} - the metadata of book, include title, authors, translator(option)
 */
function getMetaData(dom) {
  let metadata = {};
  const title = dom.querySelector('.bookTitle').textContent.trim();
  const authors = dom.querySelector('.authors')
    .textContent
    .trim()
    .split(/[;、；]/)
    .map((s) => s.trim());
  const translators = authors.filter((author) => {
    const regexp = /译$/;
    return regexp.test(author);
  });

  if (translators.length) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < translators.length; i++) {
      const item = translators[i];
      const index = authors.indexOf(item);
      if (index !== -1) {
        authors.splice(index, 1);
        translators[i] = item.replace('译', '');
      }
    }
    metadata = {
      title,
      authors,
      translators,
    };
  } else {
    metadata = {
      title,
      authors,
    };
  }

  return metadata;
}

/**
 *
 * @param {Node} heading - noteHeading element
 */
function getContent(heading) {
  const nextNode = heading.nextElementSibling;
  if (nextNode.classList.contains('noteText')) {
    return nextNode.textContent.trim();
  }
  return null;
}

/**
 *
 * @param {Node} dom - the html document
 * @returns {Array} - notes list, include chapter(option), heading, color, location, highlight content, comment(option)
 */
// Reference: https://github.com/sawyerh/kindle-email-to-json/blob/207d7f54826a0a75a16a498b4fa6e7eff4f120c2/Converter.js
function getNotes(dom) {
  const chapters = dom.querySelectorAll('.sectionHeading');
  const headings = dom.querySelectorAll('.noteHeading');
  // console.log(headings);
  const notes = [];

  headings.forEach((heading, index) => {
    // chapter
    let chapter = null;
    // 匹配 noteHeading 中是否含有章节信息
    const text = heading.textContent;
    const regexp = /-\s\S+\s>/;
    if (regexp.test(text)) {
      chapter = text.match(/-\s(\S+)\s>/)[1].trim();
    } else if (chapters.length) {
      let tempNode = heading;
      while (tempNode.nodeName !== 'HR') {
        if (tempNode.classList.contains('sectionHeading')) {
          chapter = tempNode.textContent.trim();
          break;
        }
        tempNode = tempNode.previousElementSibling;
      }
      // console.log(chapter);
    }

    // color
    let color = null;
    const spanNode = heading.querySelector("span[class^='highlight_']");
    if (spanNode) {
      color = spanNode.textContent.trim();
    }
    // console.log(color);

    let type = '';

    switch (color) {
      case 'yellow':
        type = 'annotation';
        break;
      case '黄色':
        type = 'annotation';
        break;

      case 'blue':
        type = 'deep-reading';
        break;

      case '蓝色':
        type = 'deep-reading';
        break;
      case 'pink':
        type = 'question';
        break;
      case '粉色':
        type = 'question';
        break;
      case 'orange':
        type = 'inspiration';
        break;
      case '橙色':
        type = 'inspiration';
        break;
      default:
        type = 'annotation';
    }

    // location
    let location = 0;
    const result = heading.textContent.trim().match(/\s(\d*)$/i);
    if (result) {
      location = result[0].trim();
    }
    // console.log(location);

    // content
    // 需要区分与 noteHeading 匹配的 noteText 是高亮标注 Highlight 还是评论笔记 note，后者没有 color 子节点。而且这里假设所有的评论笔记 note 都是在关联到高亮标注上（即前一个元素）
    if (!color && notes.length) {
      // 处理评论笔记，将它合并到前一个节点（高亮标注）中
      const note = notes[notes.length - 1];
      note.comment = getContent(heading);
      // console.log(comment);
    } else {
      const content = getContent(heading);
      // console.log(content);
      notes.push({
        chapter,
        type,
        location,
        content,
      });
    }
  });
  // console.log(notes);
  return notes;
}

export { getMetaData, getNotes };
