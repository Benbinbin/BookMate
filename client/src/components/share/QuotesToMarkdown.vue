import TurndownService from 'turndown';

<template>
  <div v-if="quotes.length > 0">
    <!-- single quote -->
    <div v-if="quotes.length === 1" ref="singleQuote">
      <h1>《{{ title }}》书摘</h1>
      <h2>章节：{{ quotes[0].chapter || "未分类" }}</h2>
      <blockquote v-html="quotes[0].content"></blockquote>
      <p>
        <i>引自：第 {{ quotes[0].location || 0 }} 页</i>
      </p>
      <div v-if="quotes[0].comment">
        <p><strong>批注：</strong></p>
        <p v-html="quotes[0].comment"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cover', 'title', 'quotes'],
};
</script>

<style>
</style>
