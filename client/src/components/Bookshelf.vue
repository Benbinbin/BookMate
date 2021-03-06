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
          :key="book._id"
          class="book flex-shrink-0 relative w-32 flex flex-col justify-start items-center"
        >
          <div
            class="cover w-28 h-32 bg-center bg-no-repeat bg-contain transition-all"
            :style="{
              backgroundImage: bookCover(book),
            }"
          ></div>
          <p class="mt-8 text-center font-bold">
            {{ book.metadata.titles[0] }}
          </p>
          <router-link
            :to="`/book/${book._id}`"
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
          :key="book._id"
          class="book w-32 relative flex flex-col justify-start items-center"
        >
          <div
            class="cover w-28 h-32 bg-center bg-no-repeat bg-contain transition-all"
            :style="{
              backgroundImage: `url(${coverBase}${book.metadata.covers[0]})`,
            }"
          ></div>
          <p class="mt-8 text-center font-bold">
            {{ book.metadata.titles[0] }}
          </p>
          <router-link
            :to="`/book/${book._id}`"
            class="absolute inset-0 z-10"
          ></router-link>
        </li>
      </ul>
    </section>
    <footer class="my-24 items-center">
      <div class="h-full flex justify-center items-center">
        <button
          @click="$emit('backToTop')"
          class="hover:bg-gray-300 text-gray-300 hover:text-white p-3 rounded-md font-bold my-4"
        >
          返回顶部
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

const filterMap = {
  allBooks: '所有',
  readingBooks: '在读',
  laterReadingBooks: '待读',
  loveBooks: '喜欢',
  cartBooks: '待购',
};

function filterBooks(collectionType, key, books) {
  if (books.length === 0) return [];
  const arr = [];
  books.forEach((book) => {
    if (
      collectionType === 'default_collections'
      && book.metadata[collectionType].find((item) => item.name === key).active
    ) {
      arr.push(book);
    } else if (
      collectionType === 'collections'
      && book.metadata[collectionType].includes(key)
    ) {
      arr.push(book);
    }
  });
  return arr;
}

export default {
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      selected: 'allBooks',
      showMoreModal: false,
      moreModalList: [
        {
          icon: 'category',
          name: '所有',
          val: 'allBooks',
        },
        {
          icon: 'reading',
          name: '在读',
          val: 'readingBooks',
        },
        {
          icon: 'later',
          name: '待读',
          val: 'laterReadingBooks',
        },
        {
          icon: 'like',
          name: '喜欢',
          val: 'loveBooks',
        },
        {
          icon: 'cart',
          name: '待购',
          val: 'cartBooks',
        },
      ],
      dragging: false,
      originX: 0,
    };
  },
  computed: {
    ...mapState(['booksList']),
    ...mapGetters(['allCollections']),
    currentList() {
      return {
        name: filterMap[this.selected],
        data: this[this.selected],
      };
    },
    allBooks() {
      return this.booksList;
    },
    readingBooks() {
      return filterBooks('default_collections', 'reading', this.booksList);
    },
    laterReadingBooks() {
      return filterBooks('default_collections', 'later', this.booksList);
    },
    loveBooks() {
      return filterBooks('default_collections', 'like', this.booksList);
    },
    cartBooks() {
      return filterBooks('default_collections', 'cart', this.booksList);
    },
    collectionsBooks() {
      const collectionsBooks = [];
      this.allCollections.forEach((val) => {
        collectionsBooks.push({
          name: val,
          data: filterBooks('collections', val, this.booksList),
        });
      });
      return collectionsBooks;
    },
  },
  methods: {
    changeSelected(val) {
      this.selected = val;
      this.showMoreModal = false;
    },
    bookCover(book) {
      if (book.metadata.covers.length > 0) {
        return `url(${this.coverBase}${book.metadata.covers[0]})`;
      }
      return `url(${require('@/assets/icons/cover.png')})`;
    },
  },
  created() {
    this.$store
      .dispatch('getBooksList', {
        metadata: ['titles', 'covers', 'default_collections', 'collections'],
      })
      .then((books) => {
        this.$store.dispatch('setBooksList', books);
      });
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
