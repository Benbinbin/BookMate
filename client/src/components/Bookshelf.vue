<template>
  <div class="bookshelf">
    <section class="selected" :class="currentList">
      <div class="mt-14 mb-6 flex items-center relative">
        <h2 class="text-xl leading-5 font-bold">{{ currentList.name }}</h2>
        <button
          class="ml-2"
          @click="showMoreModal = true"
          v-show="!showMoreModal"
        >
          <img
            src="@/assets/icons/down.svg"
            alt="show more button"
            class="w-6 h-6"
          />
        </button>
        <button
          class="ml-2"
          @click="showMoreModal = false"
          v-show="showMoreModal"
        >
          <img
            src="@/assets/icons/close-circle.svg"
            alt="close show more button"
            class="w-6 h-6"
          />
        </button>
        <div
          class="modal-container absolute top-8 left-12 z-20"
          v-show="showMoreModal"
        >
          <div
            class="modal flex flex-col rounded-xl border-2 border-gray-300 divide-y-2 divide-gray-300 bg-gray-100 shadow-md"
          >
            <button
              v-for="item of moreModalList"
              :key="item.val"
              class="py-2 flex justify-center items-center w-24 font-bold hover:opacity-80"
              :class="{
                'bg-white': item.val === selected,
                'opacity-40': item.val !== selected,
              }"
              @click="changeSelected(item.val)"
            >
              <img
                :src="require(`@/assets/icons/${item.icon}.svg`)"
                :alt="item.icon"
                class="w-6"
              />
              <span class="ml-2">{{ item.name }}</span>
            </button>
          </div>
        </div>
      </div>
      <ul
        class="selected-list flex flex-nowrap w-full py-4 space-x-8"
        :class="{ dragging: dragging }"
      >
        <li
          v-for="book of currentList.data"
          :key="book._id.$oid"
          class="book flex-shrink-0 relative w-32 flex flex-col justify-start items-center"
        >
          <div
            class="cover w-28 h-32 bg-center bg-no-repeat bg-contain transition-all"
            :style="{
              backgroundImage: `url(covers/${book.metadata.covers[0]})`,
            }"
          ></div>
          <p class="mt-8 text-center font-bold">
            {{ book.metadata.titles[0] }}
          </p>
          <router-link
            :to="`/note/${book.metadata.isbn}`"
            class="absolute inset-0 z-10"
          ></router-link>
        </li>
      </ul>
    </section>
    <section v-for="collection of collectionsBooks" :key="collection.name">
      <div class="mt-14 mb-6 items-center">
        <h2 class="text-xl leading-5 font-bold">{{ collection.name }}</h2>
      </div>
      <ul class="collection">
        <li
          v-for="book of collection.data"
          :key="book._id.$oid"
          class="book w-32 relative flex flex-col justify-start items-center"
        >
          <div
            class="cover w-28 h-32 bg-center bg-no-repeat bg-contain transition-all"
            :style="{
              backgroundImage: `url(covers/${book.metadata.covers[0]})`,
            }"
          ></div>
          <p class="mt-8 text-center font-bold">
            {{ book.metadata.titles[0] }}
          </p>
          <router-link
            :to="`/note/${book.metadata.isbn}`"
            class="absolute inset-0 z-10"
          ></router-link>
        </li>
      </ul>
    </section>
    <footer class="my-24 items-center">
      <hr class="mx-auto w-1/2" />
      <div class="h-full flex justify-center items-center">
        <button @click="$emit('backToTop')" class="text-blue-400 font-bold my-4">
          返回顶部
        </button>
      </div>
    </footer>
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
      showMoreModal: false,
      moreModalList: [
        {
          icon: 'reading',
          name: '在读',
          val: 'readingBooks',
        },
        {
          icon: 'read-it-later',
          name: '待读',
          val: 'laterReadingBooks',
        },
        {
          icon: 'like',
          name: '喜欢',
          val: 'loveBooks',
        },
        {
          icon: 'buy',
          name: '待购',
          val: 'cartBooks',
        },
      ],
      dragging: false,
      originX: 0,
    };
  },
  computed: {
    ...mapGetters([
      'readingBooks',
      'laterReadingBooks',
      'loveBooks',
      'cartBooks',
      'collectionsBooks',
    ]),
    currentList() {
      return {
        name: filterMap[this.selected],
        data: this[this.selected],
      };
    },
  },
  methods: {
    changeSelected(val) {
      this.selected = val;
      this.showMoreModal = false;
    },
  },
  created() {
    this.$store.dispatch('getBooksList');
  },
};
</script>

<style lang="scss" scoped>
.selected {
  min-height: 18rem;
}

.selected-list {
  overflow-x: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar {
    height: 13px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.dragging {
  cursor: grab;
  user-select: none;
}

.book {
  &::after {
    content: "";
    display: block;
    height: 100px;
    position: absolute;
    top: 50px;
    left: 0px;
    right: 0px;
    background: #ececec;
    border-radius: 5px;
    z-index: -1;
  }
  &:hover {
    .cover {
      transform: translateY(-5px);
    }
  }
}

.modal {
  button:first-child {
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }
  button:last-child {
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }
}

.collection {
  display: grid;
  grid-template-columns: repeat(auto-fill, 8rem);
  gap: 2rem;
}
</style>
