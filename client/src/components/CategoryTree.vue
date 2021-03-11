<template>
  <li>
    <div class="flex items-center">
      <button
        v-if="isParent"
        :class="{ 'rotate-90': isSpan }"
        class="transform"
        @click="isSpan = !isSpan"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 50 50"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.3958 13.9792C19.2027 14.1719 19.0495 14.4009 18.9449 14.6529C18.8404 14.9049 18.7866 15.1751 18.7866 15.4479C18.7866 15.7208 18.8404 15.991 18.9449 16.243C19.0495 16.495 19.2027 16.724 19.3958 16.9167L27.4791 25L19.3958 33.0834C19.0063 33.4729 18.7874 34.0012 18.7874 34.5521C18.7874 35.103 19.0063 35.6313 19.3958 36.0209C19.7854 36.4104 20.3137 36.6292 20.8646 36.6292C21.4155 36.6292 21.9438 36.4104 22.3333 36.0209L31.8958 26.4584C32.089 26.2656 32.2422 26.0367 32.3467 25.7847C32.4513 25.5326 32.5051 25.2625 32.5051 24.9896C32.5051 24.7168 32.4513 24.4466 32.3467 24.1946C32.2422 23.9425 32.089 23.7136 31.8958 23.5209L22.3333 13.9584C21.5417 13.1667 20.2083 13.1667 19.3958 13.9792Z"
          />
        </svg>
      </button>
      <svg
        v-if="!isParent"
        class="w-6 h-6 flex-shrink-0"
        viewBox="0 0 50 50"
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25 29.6875C26.2432 29.6875 27.4355 29.1936 28.3146 28.3146C29.1936 27.4355 29.6875 26.2432 29.6875 25C29.6875 23.7568 29.1936 22.5645 28.3146 21.6854C27.4355 20.8064 26.2432 20.3125 25 20.3125C23.7568 20.3125 22.5645 20.8064 21.6854 21.6854C20.8064 22.5645 20.3125 23.7568 20.3125 25C20.3125 26.2432 20.8064 27.4355 21.6854 28.3146C22.5645 29.1936 23.7568 29.6875 25 29.6875Z"
          fill="black"
        />
      </svg>
      <button
        class="my-1 text-left"
        :class="{
          'font-bold': isParent,
          'text-blue-300': chapters.includes(item.name),
        }"
        :disabled="!chapters.includes(item.name)"
        @click="clickHandler(item.name)"
      >
        {{ item.name }}
      </button>
    </div>

    <ul v-show="isSpan" v-if="isParent" class="pl-4">
      <tree-item
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :chapters="chapters"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'tree-item',
  props: {
    item: Object,
    chapters: Array,
  },
  data() {
    return {
      isSpan: true,
    };
  },
  computed: {
    isParent() {
      return this.item.children;
    },
  },
  methods: {
    clickHandler(chapter) {
      this.$store.dispatch('navChapter', chapter);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
