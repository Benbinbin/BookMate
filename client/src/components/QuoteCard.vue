<template>
  <div class="quote-card bg-white rounded-lg outline-none" tabindex="0">
    <div
      class="quote-content border"
      :class="{
        'rounded-lg': !quote.comment,
        'rounded-t-lg': quote.comment,
      }"
    >
      <div class="card-header-container h-12">
        <div class="card-header pt-3 px-3 hidden justify-between items-start">
          <div class="left">
            <button class="opacity-30 flex items-center">
              <img
                src="@/assets/icons/notes.svg"
                alt="note icon"
                class="w-5 h-5"
              />
              <span class="text-sm font-bold">2</span>
            </button>
          </div>
          <div class="right flex items-center space-x-1.5">
            <button class="opacity-30">
              <img
                src="@/assets/icons/flip.svg"
                alt="flip icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/pin.svg"
                alt="pin icon"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="card-body mx-8" v-html="quote.content"></div>
      <div class="card-footer-container h-14 flex items-end">
        <div
          class="card-footer pb-3 px-3 flex justify-between items-end flex-grow"
        >
          <div class="left flex items-center">
            <img
              :src="require(`@/assets/icons/${quote.type}.svg`)"
              :alt="`${quote.type} icon`"
              class="quote-type w-5 h-5"
              :class="{
                'hidden opacity-30':
                  quote.type === 'annotation' && !quote.comment,
              }"
            />
            <div class="quote-location ml-1.5 hidden opacity-30">
              <p class="text-xs">章节：{{ quote.chapter || "未分类" }}</p>
              <p class="text-xs">页数：{{ quote.location || "未知" }}</p>
            </div>
          </div>
          <div class="btns right hidden items-center space-x-1.5">
            <!-- <button class="opacity-30">
              <img
                src="@/assets/icons/add.svg"
                alt="add icon"
                class="w-5 h-5"
              />
            </button> -->
            <button class="opacity-30">
              <img
                src="@/assets/icons/edit.svg"
                alt="edit icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/copy.svg"
                alt="copy icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/share.svg"
                alt="share icon"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="quote.comment"
      class="quote-comment px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
      v-html="quote.comment"
    ></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['quote'],
  computed: {
    ...mapState([
      'editingQuote',
    ]),
  },
};
</script>

<style lang="scss" scoped>
.quote-card {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-image: url("../assets/icons/quote.svg");
    background-repeat: no-repeat;
    background-position: 10px 10px;
    opacity: 0.05;
    z-index: -10;
  }

  &:focus-within {
    box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.15);
    .card-header {
      display: flex;
    }
    .quote-type,
    .quote-location,
    .btns {
      display: block;
    }
  }
}
</style>
