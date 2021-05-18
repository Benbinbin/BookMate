 <template>
  <div
    class="summary-card relative bg-white rounded-lg outline-none"
    :class="{
      'editing border-2 border-gray-300': summary._id === editingSummary,
      border: summary._id !== editingSummary,
    }"
    tabindex="0"
  >
    <div class="card-header-container h-14 flex">
      <div
        class="card-header pt-4 px-4 flex-grow hidden justify-between items-start"
      >
        <div class="left">
          <button class="opacity-60 flex items-center hover:bg-gray-100 p-1 rounded">
            <img
              src="@/assets/icons/bookmark.svg"
              alt="bookmark icon"
              class="w-5 h-5"
            />
            <span class="text-sm font-bold">2</span>
          </button>
        </div>
        <!-- <div class="right flex items-center space-x-1.5">
          <button class="opacity-30 hover:opacity-80">
            <img
              src="@/assets/icons/minus-rectangle.svg"
              alt="minimize icon"
              class="w-5 h-5"
            />
          </button>
          <button class="opacity-30 hover:opacity-80">
            <img
              src="@/assets/icons/expand-rectangle.svg"
              alt="show more icon"
              class="w-5 h-5"
            />
          </button>
          <button class="opacity-30 hover:opacity-80">
            <img
              src="@/assets/icons/large-rectangle.svg"
              alt="maximize icon"
              class="w-5 h-5"
            />
          </button>
        </div> -->
      </div>
    </div>
    <!-- <slot name="body"> -->
    <div
      v-if="!summaryEditing || summary._id !== editingSummary"
      class="card-body mx-8"
      v-html="summary.content"
    ></div>
    <div
      v-if="summaryEditing && summary._id === editingSummary"
      class="card-body mx-8"
    >
      <editor-content :editor="editor"></editor-content>
    </div>
    <!-- </slot> -->
    <div class="card-footer-container h-14 flex items-end">
      <div
        class="card-footer pb-4 px-4 flex-grow flex justify-between items-center space-x-2"
      >
        <div class="left flex items-center">
          <!-- <slot name="location"> -->
          <div
            v-if="!summaryEditing || summary._id !== editingSummary"
            class="summary-location text-xs"
          >
            <p class="opacity-0">章节：{{ summary.chapter || "未分类" }}</p>
          </div>
          <div
            v-if="summaryEditing && summary._id === editingSummary"
            class="summary-location text-xs flex items-center"
          >
            <label class="flex-shrink-0 opacity-30" for="summary-chapter"
              >章节：</label
            >
            <treeselect
              class="w-4/5 z-10"
              v-model="summaryChapterTemp"
              placeholder="请选择章节"
              :multiple="false"
              :options="category"
              :normalizer="categoryNormalizer"
              :searchable="true"
              :flatten-search-results="true"
              :close-on-select="true"
              :default-expand-level="1"
              :max-height="150"
            />
          </div>
          <!-- </slot> -->
        </div>
        <div
          class="right flex-shrink-0 flex items-center space-x-1.5"
          :class="{
            hidden: !summaryEditing || summary._id !== editingSummary,
            flex: summaryEditing && summary._id === editingSummary,
          }"
        >
          <button
            class="hover:bg-gray-100 p-1 rounded"
            :class="{
              'opacity-60': !summaryEditing,
              'opacity-10': summaryEditing,
            }"
            :disabled="summaryEditing"
            @click="$emit('active-editor')"
          >
            <img
              src="@/assets/icons/edit.svg"
              alt="edit icon"
              class="w-5 h-5"
            />
          </button>
          <!-- <button class="opacity-80 hover:bg-gray-100 p-1 rounded">
            <img
              src="@/assets/icons/copy.svg"
              alt="copy icon"
              class="w-5 h-5"
            />
          </button> -->
          <button class="opacity-60 hover:bg-gray-100 p-1 rounded" @click="$emit('share-summary-as-markdown')">
            <img
              src="@/assets/icons/export.svg"
              alt="export icon"
              class="w-5 h-5"
            />
          </button>
          <button
          class="hover:bg-gray-100 p-1 rounded"
            :class="{
              'opacity-10': summaryEditing,
            }"
            :disabled="summaryEditing"
            @click="showDeleteModal = true"
          >
            <img
              src="@/assets/icons/delete.svg"
              alt="delete icon"
              class="w-5 h-5"
            />
          </button>
        </div>
      </div>
    </div>

    <div
      class="delete-modal absolute inset-0 flex-col justify-center items-center rounded-lg bg-opacity-90 bg-gray-200"
      :class="{ hidden: !showDeleteModal, flex: showDeleteModal }"
    >
      <p class="text-gray-700 font-bold">是否删除该概述？</p>
      <div class="flex mt-4 space-x-4">
        <button
          class="p-2 rounded-lg bg-red-400 hover:bg-red-500 text-white"
          @click="
            $store.dispatch('deleteSummaries', {
              summary_ids: [summary._id],
              book_id: book._id,
            })
          "
        >
          确定
        </button>
        <button
          class="p-2 rounded-lg bg-gray-400 hover:bg-gray-600 text-white"
          @click="showDeleteModal = false"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import 'katex/dist/katex.min.css';

import { EditorContent } from 'tiptap';

export default {
  props: ['editor', 'category', 'summary', 'summaryChapter'],
  components: {
    EditorContent,
    Treeselect,
  },
  data() {
    return {
      summaryChapterTemp: encodeURIComponent(this.summary.chapter || ''),
      showDeleteModal: false,
    };
  },
  computed: {
    ...mapState({
      book: (state) => state.book.book,
      summaryEditing: (state) => state.summary.summaryEditing,
      editingSummary: (state) => state.summary.editingSummary,
    }),
  },
  watch: {
    summaryChapterTemp() {
      this.$emit(
        'update:summaryChapter',
        decodeURIComponent(this.summaryChapterTemp),
      );
    },
  },
  methods: {
    categoryNormalizer(node) {
      return {
        id: encodeURIComponent(node.name),
        label: node.name,
        children: node.children,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.editing {
  box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.2);
}

.summary-card {
  &:focus-within {
    box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.15);
    .card-header {
      display: flex;
    }
    .summary-location > p {
      opacity: 30%;
    }
    .card-footer {
      .right {
        display: flex;
      }
    }
  }
}
</style>
