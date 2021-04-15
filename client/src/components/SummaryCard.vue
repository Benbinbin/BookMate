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
          <button class="opacity-30 hover:opacity-80 flex items-center">
            <img
              src="@/assets/icons/bookmark.svg"
              alt="bookmark icon"
              class="w-5 h-5"
            />
            <span class="text-sm font-bold">2</span>
          </button>
        </div>
        <div class="right flex items-center space-x-1.5">
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
        </div>
      </div>
    </div>
    <slot name="body">
      <div class="card-body mx-8" v-html="summary.content"></div>
    </slot>
    <div class="card-footer-container h-14 flex items-end">
      <div
        class="card-footer pb-4 px-4 flex-grow justify-between items-end"
        :class="{
          hidden: summary._id !== editingSummary,
          flex: summary._id === editingSummary,
        }"
      >
        <div class="left flex items-center">
          <slot name="location">
            <div class="summary-location text-xs opacity-30">
              <p>章节：{{ summary.chapter || "未分类" }}</p>
            </div>
          </slot>
        </div>
        <div class="right flex-shrink-0 flex items-center space-x-1.5">
          <!-- <button class="opacity-30">
              <img
                src="@/assets/icons/add.svg"
                alt="add icon"
                class="w-5 h-5"
              />
            </button> -->
          <button
            :class="{
              'opacity-30 hover:opacity-80': !editingSummary,
              'opacity-10': editingSummary,
            }"
            :disabled="editingSummary"
            @click="$emit('active-editor')"
          >
            <img
              src="@/assets/icons/edit.svg"
              alt="edit icon"
              class="w-5 h-5"
            />
          </button>
          <button class="opacity-30 hover:opacity-80">
            <img
              src="@/assets/icons/copy.svg"
              alt="copy icon"
              class="w-5 h-5"
            />
          </button>
          <button class="opacity-30 hover:opacity-80">
            <img
              src="@/assets/icons/export.svg"
              alt="export icon"
              class="w-5 h-5"
            />
          </button>
          <button
            :class="{
              'opacity-70 hover:opacity-100': !editingSummary,
              'opacity-30': editingSummary,
            }"
            :disabled="editingSummary"
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
          @click="$store.dispatch('deleteSummary', summary._id)"
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
import hljs from 'highlight.js';

export default {
  props: ['summary'],
  data() {
    return {
      showDeleteModal: false,
    };
  },
  computed: {
    ...mapState(['editingSummary']),
  },
  updated() {
    hljs.highlightAll();
  },
  mounted() {
    hljs.highlightAll();
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
    .card-header,
    .card-footer {
      display: flex;
    }
  }
}
</style>
