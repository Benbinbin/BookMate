<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
// Import the basic building blocks
import { Editor } from "tiptap";

const notes = [
  {
    chapter: "《待宰的羔羊》",
    color: "yellow",
    location: "4",
    content:
      "有种人认为好消息只能通过期待中的电话传来，打电话的还得是你已经认识的人，她不想成为那种人。",
  },
  {
    chapter: "《待宰的羔羊》",
    color: "yellow",
    location: "9",
    content:
      "我每年见他三次，还不够称他是朋友。而每次见到他，他都是想卖什么东西给我。这不是友谊。”",
  },
];

export default {
  data() {
    return {
      temp: null,
      result: null,
    };
  },
  created() {
    const editor = new Editor({
      onUpdate: ({ getJSON }) => {
        this.temp = getJSON();
      },
    });
    let arr = [];
    notes.forEach((item) => {
      const { chapter, color, location, content } = item;
      editor.setContent(content, true);
      const contentTemp = this.temp;

      if (item.comment) {
        editor.setContent(content, true);
        const commentTemp = this.temp;
        arr.push({
          chapter,
          color,
          location,
          content: contentTemp,
          comment: commentTemp,
        });
      } else {
        arr.push({
          chapter,
          color,
          location,
          content: contentTemp,
        });
      }
    });
    this.result = arr;
  },
};
</script>