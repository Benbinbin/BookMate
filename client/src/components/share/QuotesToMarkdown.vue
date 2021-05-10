import TurndownService from 'turndown';

<template>
  <div>
    <h1>《{{ title }}》书摘</h1>
    <img v-if="show.cover && cover" :src="cover" alt="book cover" />
    <div v-for="item of quotesReArrange" :key="item.chapter">
      <div v-if="item.quotes.length > 0">
        <h2 v-if="show.chapterType === 'heading' && show.chapter">
          章节：{{ item.chapter }}
        </h2>
        <div v-for="quote of item.quotes" :key="quote._id">
          <blockquote
            v-if="show.blockquote"
            v-html="quote.content"
          ></blockquote>
          <p v-if="!show.blockquote" v-html="quote.content"></p>

          <i>
            <span
              v-if="
                show.chapter &&
                show.chapterType === 'paragraph' &&
                quote.chapter
              "
            >
            章节：{{ quote.chapter }}
            </span>
            <span
              v-if="
                show.chapter &&
                show.chapterType === 'paragraph' &&
                quote.chapter &&
                show.location
              "
            >
              -
            </span>
            <span v-if="show.location">页码：第 {{ quote.location }} 页</span>
          </i>

          <div
            v-if="show.comment && quote.comment && quote.comment !== '<p></p>'"
          >
            <p><strong>批注：</strong></p>
            <div v-html="quote.comment"></div>
          </div>
          <p></p>
          <hr>
          <p></p>
        </div>
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
    quote: {
      type: Object,
    },
    quotes: {
      type: Array,
    },
    show: {
      type: Object,
      default: () => JSON.parse(localStorage.getItem('shareQuotesAsMarkdownShow')),
    },
  },
  computed: {
    quotesReArrange() {
      // if (this.quotesShow.chapterType === 'heading') {
      if (this.quote) {
        return [
          {
            chapter: this.quote.chapter || '未分类',
            quotes: [this.quote],
          },
        ];
      }
      return this.quotes;

      // }
      // const quotesAssemble = [];
      // // eslint-disable-next-line no-restricted-syntax
      // for (const item of this.quotes) {
      //   if (item.quotes.length > 0) {
      //     quotesAssemble.push(...item.quotes);
      //   }
      // }
      // return [
      //   {
      //     chapter: '合集',
      //     quotes: quotesAssemble,
      //   },
      // ];
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
  padding: 0.5rem 0;
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

  code {
    margin: 0;
    padding: 0;
    white-space: pre;
    border: none;
    background: transparent;
  }
}
</style>
