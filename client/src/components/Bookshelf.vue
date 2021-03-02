<template>
  <div class="bookshelf max-w-full">
    <section :class="currentList">
      <div class="flex items-center">
        <h2 class="text-xl leading-5 font-bold">{{ currentList.name }}</h2>
        <button class="ml-2 focus:outline-none">
          <img
            src="@/assets/icons/down.svg"
            alt="more button"
            class="w-6 h-6"
          />
        </button>
      </div>
      <ul class="flex space-x-8 overflow-x-hidden max-w-full">
        <li v-for="book of currentList.data" :key="book._id.$oid">
          <div class="cover w-28 h-32 bg-center bg-no-repeat bg-contain" :style="{backgroundImage: `url(covers/${book.metadata.covers[0]})`}"></div>
        </li>
      </ul>

    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const filterMap = {
  readingBooks: '在读',
  laterReadingBooks: '待读',
  loveBooks: '喜欢',
  cartBooks: '待购',
};

export default {
  data() {
    return {
      selected: 'readingBooks',
    };
  },
  computed: {
    ...mapGetters([
      'readingBooks',
      'laterReadingBooks',
      'loveBooks',
      'cartBooks',
    ]),
    currentList() {
      return {
        name: filterMap[this.selected],
        data: this[this.selected],
      };
    },
  },
  created() {
    this.$store.dispatch('get_books');
  },
};
</script>

<style lang="scss" scoped>
</style>
