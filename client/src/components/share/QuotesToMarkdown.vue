import TurndownService from 'turndown';

<template>
  <div v-if="quotes.length > 0">
    <!-- single quote -->
    <div v-if="quotes.length === 1" ref="singleQuote">
      <h1>《{{ title }}》书摘</h1>
      <img v-if="show.cover && cover" :src="cover" alt="book cover" />
      <h2
        v-if="
          show.chapter && show.chapterType === 'heading' && quotes[0].chapter
        "
      >
        章节：{{ quotes[0].chapter || "未分类" }}
      </h2>
      <blockquote
        v-if="show.blockquote"
        v-html="quotes[0].content"
      ></blockquote>
      <p v-if="!show.blockquote" v-html="quotes[0].content"></p>
      <p
        v-if="
          show.chapter && show.chapterType === 'paragraph' && quotes[0].chapter
        "
      >
        <i>章节：第 {{ quotes[0].location || 0 }} 章</i>
      </p>
      <p v-if="show.location && quotes[0].location">
        <i>页码：第 {{ quotes[0].location }} 页</i>
      </p>
      <div v-if="show.comment && quotes[0].comment && quotes[0].comment !== '<p></p>'">
        <p><strong>批注：</strong></p>
        <p v-html="quotes[0].comment"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cover: {
      type: String,
    },
    title: {
      type: String,
    },
    quotes: {
      type: Array,
    },
    show: {
      type: Object,
      default: () => JSON.parse(localStorage.getItem('shareQuotesAsMarkdownShow')),
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  font-weight: bold;
  line-height: 3.5rem;
}

h2 {
  font-size: 1.8rem;
  font-weight: bold;
}

h3 {
  font-size: 1.6rem;
  font-weight: bold;
}

h4 {
  font-size: 1.4rem;
  font-weight: bold;
}

h5 {
  font-size: 1.2rem;
  font-weight: bold;
}

h6 {
  font-weight: bold;
}

p {
  margin: 0.5rem 0;
  line-height: 1.65rem;
  word-break: break-all;
}
ul,
ol {
  padding-left: 30px;
}

ul :first-child,
ol :first-child {
  margin-top: 0;
}

ul :last-child,
ol :last-child {
  margin-bottom: 0;
}
ul li {
  list-style: disc;
}
ol li {
  list-style: decimal;
}

blockquote {
  margin: 0.5rem 0;
  padding: 5px 10px;
  border-left: 4px solid #dddddd;
  color: #777777;
}

code {
  margin: 0 2px;
  padding: 0 5px;
  border: 1px solid #d1d5db;
  background-color: #f8f8f8;
  border-radius: 3px;
}

pre {
  white-space: pre-wrap;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: #f8f8f8;
  border: 1px solid #cccccc;
  font-size: 13px;
  line-height: 19px;
  overflow: auto;
  padding: 6px 10px;
  border-radius: 3px;

  &::before {
    content: attr(data-language);
    text-transform: uppercase;
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 0.6rem;
  }
  code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent;
  }
}
</style>
