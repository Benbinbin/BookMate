<template>
  <div>
    <div id="main" class="w-full">
      <div
        class="input-container relative h-48 mx-40 mt-10 flex justify-center items-center border-2 border-gray-100 border-dashed hover:bg-gray-300 text-gray-500 hover:text-white transition-all duration-300"
        :class="{ dropping: isDropping }"
        @dragover="isDropping = true"
        @drop="isDropping = false"
        @dragleave="isDropping = false"
      >
        <p class="font-bold">
          add
          <code class="font-light p-2 bg-yellow-200 rounded-lg">*.html</code>
          files
        </p>
        <input
          id="file_upload"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          type="file"
          multiple
          accept=".html"
          @change="inputFile"
        />
      </div>
    </div>
    <div class="help-information-container mx-20 my-4 text-gray-500">
      <button
        class="mx-auto flex items-center opacity-50 hover:opacity-100 p-1"
        :class="{ 'opacity-100': showHelp }"
        @click="showHelp = !showHelp"
      >
        <img
          class="w-4 h-4"
          src="@/assets/icons/question.svg"
          alt="help icon"
        />
        <span class="ml-1 text-xs">操作指南</span>
      </button>
      <div v-show="showHelp" class="help-information text-sm">
        <ol class="m-4 list-decimal list-inside space-y-2">
          <li>从 Kindle 移动端 App <strong class="text-blue-500">导出笔记</strong>，并发送到指定的邮箱</li>
          <li>
            将从邮箱附件下载<code
              class="mx-1 px-1 py-0.5 text-sm bg-yellow-200 rounded"
              >.HTML</code
            >后缀的文档，并拖拽笔记到上方输入框中（或点击上方输入框添加）
          </li>
          <li>
            程序会自动<strong class="text-blue-500">匹配</strong>书库已存在的<strong class="text-blue-500">书籍</strong>，书摘笔记将会归类到该书籍之下，也可手动修改指定的书籍
          </li>
          <li>
            避免重复笔记的导入，程序会将待导入的笔记与已导入的笔记进行比对，可以调节参数以<strong class="text-blue-500">筛选</strong>出合适的<strong class="text-blue-500">书摘笔记</strong>
          </li>
          <li>在导入前可以对书摘笔记进行<strong class="text-blue-500">修改</strong></li>
          <li>
            筛选出合适书摘笔记卡片后，点击<span
              class="mx-1 px-2 py-0.5 text-xs font-bold text-white bg-green-300 rounded"
              >导入</span
            >按钮即可完成导入
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { getMetaData, getNotes } from '../assets/js/kindleParse';

export default {
  data() {
    return {
      isDropping: false,
      showHelp: false,
      // files: [],
      result: [],
    };
  },
  methods: {
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
          const { name } = file;
          const data = e.target.result;

          const domParser = new DOMParser();
          const dom = domParser.parseFromString(data, 'text/html');
          // validate: whether the given HTML is a valid Kindle notes export
          const notesNode = dom.querySelectorAll('.noteText');
          if (!notesNode.length) {
            resolve({
              fileName: name,
              warnning: `cannot get notes from ${name}.`,
            });
          } else {
            const metadata = getMetaData(dom);
            const notes = getNotes(dom);
            resolve({
              fileName: name,
              metadata,
              notes,
            });
          }
        };
      });
    },
    async inputFile(event) {
      if (!event.target.files) return;

      const temp = [];
      event.target.files.forEach((file) => {
        temp.push(this.readFile(file));
        // this.files.push(file.name);
      });
      const arr = await Promise.all(temp);
      // this.result.push(...arr);
      this.$emit('add-files', arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-container {
  &:hover {
    border: none;
  }
}
.dropping {
  background-color: rgba(209, 213, 219, 1);
  color: white;
}
</style>
