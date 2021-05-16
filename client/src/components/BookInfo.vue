<template>
  <div class="max-w-full flex flex-col h-full">
    <nav
      class="flex-shrink-0 h-16 px-3 flex items-center justify-between border-b-2 border-gray-100"
    >
      <button
        class="flex items-center opacity-30 hover:opacity-80"
        @click="showBookMetadataModal = true"
      >
        <img class="w-6 h-6" src="@/assets/icons/edit.svg" alt="edit icon" />
      </button>
      <h2 class="text-xl font-bold">简介</h2>
      <button class="flex items-center opacity-30 hover:opacity-80">
        <img class="w-6 h-6" src="@/assets/icons/menu.svg" alt="menu icon" />
      </button>
    </nav>
    <div
      ref="introductionMain"
      class="introduction-main px-3 py-6 flex flex-col"
    >
      <div class="book-infomation">
        <h2 class="text-3xl text-center font-bold mb-6">
          <span class="highlight">{{ metadata.titles[0] }}</span>
        </h2>
        <div class="w-full flex justify-center">
          <star-rating
            :rating="metadata.stars"
            :star-size="16"
            :show-rating="false"
            :active-color="'rgba(243, 238, 102, 1)'"
            :inactive-color="'#E5E7EB'"
            :clearable="true"
            :rounded-corners="true"
            :padding="4"
            @rating-selected="setStars"
          >
          </star-rating>
        </div>

        <div class="my-4 space-y-2 text-sm text-center">
          <p v-if="metadata.authors.length > 0">
            作者：{{ metadata.authors.join("、") }}
          </p>
          <p v-if="metadata.translators.length > 0">
            译者：{{ metadata.translators.join("、") }}
          </p>
          <p v-if="metadata.isbn">ISBN：{{ metadata.isbn }}</p>
        </div>

        <div class="w-full flex justify-center">
          <button
            v-for="item of metadata.default_collections"
            :key="item.name"
            :title="item.name"
            class="hover:bg-gray-100 rounded p-1 flex justify-center items-center"
            @click="toggleDefaultCollections(item.name)"
          >
            <img
              class="w-5 h-5"
              :class="{ 'opacity-20': !item.active }"
              :src="require(`@/assets/icons/${item.name}.svg`)"
              :alt="`${item.name} icon`"
            />
          </button>
        </div>
      </div>

      <div class="my-6">
        <div class="collections-container h-10 flex items-start space-x-2">
          <img
            src="@/assets/icons/folder.svg"
            alt="folder icon"
            class="w-6 h-6 opacity-60"
          />
          <ul
            v-show="!showCollectionsInput"
            class="collections flex space-x-1.5 pb-3"
          >
            <li
              v-for="item in metadata.collections"
              :key="item"
              class="flex-shrink-0 py-1 px-1.5 bg-blue-500 text-white text-xs rounded"
            >
              {{ item }}
            </li>
          </ul>
          <button
            v-show="!showCollectionsInput"
            class="add-collection hidden flex-shrink-0 hover:bg-gray-100 p-1 rounded"
            @click="activeEditCollections"
          >
            <img
              class="w-5 h-5 opacity-60"
              src="@/assets/icons/add-circle.svg"
              alt="add collection icon"
            />
          </button>
          <vue-tags-input
            v-show="showCollectionsInput"
            v-model="collection"
            placeholder="添加收藏夹"
            :tags="collections"
            :autocomplete-items="suggestionCollections"
            :add-on-blur="false"
            :autocomplete-always-open="true"
            @tags-changed="(newCollections) => (collections = newCollections)"
          />
          <button
            v-show="showCollectionsInput"
            class="add-collection flex-shrink-0 opacity-80 text-green-500 hover:bg-gray-100 p-1 rounded"
            @click="inactiveEditCollections"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8333 8.16667C20.4131 8.16667 16.1738 9.92261 13.0482 13.0482C9.92261 16.1738 8.16667 20.4131 8.16667 24.8333C8.16667 29.2536 9.92261 33.4928 13.0482 36.6184C16.1738 39.7441 20.4131 41.5 24.8333 41.5C29.2536 41.5 33.4928 39.7441 36.6184 36.6184C39.7441 33.4928 41.5 29.2536 41.5 24.8333C41.5 20.4131 39.7441 16.1738 36.6184 13.0482C33.4928 9.92261 29.2536 8.16667 24.8333 8.16667V8.16667ZM4 24.8333C4 13.3271 13.3271 4 24.8333 4C36.3396 4 45.6667 13.3271 45.6667 24.8333C45.6667 36.3396 36.3396 45.6667 24.8333 45.6667C13.3271 45.6667 4 36.3396 4 24.8333Z"
              />
              <path
                d="M32.5562 19.1938C32.9468 19.5845 33.1662 20.1143 33.1662 20.6667C33.1662 21.2191 32.9468 21.7489 32.5562 22.1396L24.2229 30.4729C23.8322 30.8635 23.3024 31.0829 22.75 31.0829C22.1976 31.0829 21.6678 30.8635 21.2771 30.4729L17.1104 26.3063C16.9114 26.1141 16.7527 25.8842 16.6435 25.63C16.5343 25.3759 16.4769 25.1025 16.4745 24.8259C16.4721 24.5492 16.5248 24.2749 16.6295 24.0189C16.7343 23.7628 16.889 23.5302 17.0846 23.3346C17.2802 23.139 17.5128 22.9843 17.7688 22.8796C18.0249 22.7748 18.2992 22.7221 18.5758 22.7245C18.8525 22.7269 19.1258 22.7844 19.38 22.8936C19.6342 23.0027 19.8641 23.1615 20.0562 23.3604L22.75 26.0542L29.6104 19.1938C30.0011 18.8032 30.5309 18.5838 31.0833 18.5838C31.6358 18.5838 32.1656 18.8032 32.5562 19.1938V19.1938Z"
              />
            </svg>
          </button>
        </div>
        <div class="tags-container h-10 flex items-start space-x-2">
          <img
            src="@/assets/icons/tag.svg"
            alt="tag icon"
            class="w-6 h-6 opacity-60"
          />
          <ul v-show="!showTagsInput" class="tags flex space-x-1.5 pb-3">
            <li
              v-for="item in metadata.tags"
              :key="item"
              class="flex-shrink-0 py-1 px-1.5 bg-gray-200 text-gray-400 text-xs rounded overflow-x-auto"
            >
              #{{ item }}
            </li>
          </ul>
          <button
            v-show="!showTagsInput"
            class="add-tag hidden flex-shrink-0 hover:bg-gray-100 p-1 rounded"
            @click="activeEditTags"
          >
            <img
              class="w-5 h-5 opacity-60"
              src="@/assets/icons/add-circle.svg"
              alt="add tag icon"
            />
          </button>
          <vue-tags-input
            v-show="showTagsInput"
            v-model="tag"
            placeholder="添加标签"
            :tags="tags"
            :add-on-blur="false"
            :allow-edit-tags="true"
            @tags-changed="(newTags) => (tags = newTags)"
          >
            <div slot="tag-left">#</div>
          </vue-tags-input>
          <button
            v-show="showTagsInput"
            class="add-tag flex-shrink-0 text-green-500 hover:bg-gray-100 p-1 rounded"
            @click="inactiveEditTags"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 50 50"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8333 8.16667C20.4131 8.16667 16.1738 9.92261 13.0482 13.0482C9.92261 16.1738 8.16667 20.4131 8.16667 24.8333C8.16667 29.2536 9.92261 33.4928 13.0482 36.6184C16.1738 39.7441 20.4131 41.5 24.8333 41.5C29.2536 41.5 33.4928 39.7441 36.6184 36.6184C39.7441 33.4928 41.5 29.2536 41.5 24.8333C41.5 20.4131 39.7441 16.1738 36.6184 13.0482C33.4928 9.92261 29.2536 8.16667 24.8333 8.16667V8.16667ZM4 24.8333C4 13.3271 13.3271 4 24.8333 4C36.3396 4 45.6667 13.3271 45.6667 24.8333C45.6667 36.3396 36.3396 45.6667 24.8333 45.6667C13.3271 45.6667 4 36.3396 4 24.8333Z"
              />
              <path
                d="M32.5562 19.1938C32.9468 19.5845 33.1662 20.1143 33.1662 20.6667C33.1662 21.2191 32.9468 21.7489 32.5562 22.1396L24.2229 30.4729C23.8322 30.8635 23.3024 31.0829 22.75 31.0829C22.1976 31.0829 21.6678 30.8635 21.2771 30.4729L17.1104 26.3063C16.9114 26.1141 16.7527 25.8842 16.6435 25.63C16.5343 25.3759 16.4769 25.1025 16.4745 24.8259C16.4721 24.5492 16.5248 24.2749 16.6295 24.0189C16.7343 23.7628 16.889 23.5302 17.0846 23.3346C17.2802 23.139 17.5128 22.9843 17.7688 22.8796C18.0249 22.7748 18.2992 22.7221 18.5758 22.7245C18.8525 22.7269 19.1258 22.7844 19.38 22.8936C19.6342 23.0027 19.8641 23.1615 20.0562 23.3604L22.75 26.0542L29.6104 19.1938C30.0011 18.8032 30.5309 18.5838 31.0833 18.5838C31.6358 18.5838 32.1656 18.8032 32.5562 19.1938V19.1938Z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div>
        <div class="mb-6 flex justify-center">
          <button
            class="p-2 rounded-l-md hover:bg-gray-300 hover:text-white"
            :class="{
              'bg-gray-400 text-white': showContent === 'category',
              'bg-gray-100': showContent !== 'category',
            }"
            @click="showContent = 'category'"
          >
            目录
          </button>
          <button
            class="p-2 hover:bg-gray-300 hover:text-white"
            :class="{
              'bg-gray-400 text-white': showContent === 'description',
              'bg-gray-100': showContent !== 'description',
            }"
            @click="showContent = 'description'"
          >
            简介
          </button>
          <button
            class="p-2 rounded-r-md hover:bg-gray-300 hover:text-white"
            :class="{
              'bg-gray-400 text-white': showContent === 'review',
              'bg-gray-100': showContent !== 'review',
            }"
            @click="showContent = 'review'"
          >
            短评
          </button>
        </div>

        <div v-show="showContent === 'description'">
          <div v-if="metadata.description" class="book-description">
            <p class="leading-87">
              {{ metadata.description }}
            </p>
          </div>
        </div>

        <div v-show="showContent === 'review'">
          <div v-if="metadata.review" class="book-review">
            <p class="leading-87">
              {{ metadata.review }}
            </p>
          </div>
        </div>

        <div v-show="showContent === 'category'">
          <ul class="category">
            <category-tree
              v-for="(item, index) of metadata.category.children"
              :key="index"
              :item="item"
              :quotes-chapters="quotesChapters"
              :summaries-chapters="summariesChapters"
            ></category-tree>
          </ul>
        </div>
      </div>

      <footer class="my-12 items-center">
        <div class="flex justify-center items-center">
          <button
            @click="backToTopHandler('introductionMain')"
            class="font-bold my-4 hover:bg-gray-300 text-gray-300 hover:text-white p-3 rounded-md"
          >
            返回顶部
          </button>
        </div>
      </footer>
    </div>
    <book-metadata-modal
      v-if="showBookMetadataModal"
      class="fixed w-screen h-screen inset-0"
      :metadata="metadata"
      @close-book-modal="closeBookModalHandler"
    ></book-metadata-modal>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';
import { mapGetters } from 'vuex';
import CategoryTree from './CategoryTree.vue';
import BookMetadataModal from './modal/BookMetadataModal.vue';

export default {
  props: ['metadata', 'quotesChapters', 'summariesChapters'],
  components: {
    StarRating,
    VueTagsInput,
    CategoryTree,
    BookMetadataModal,
  },
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      showBookMetadataModal: false,
      showContent: 'description',
      showCollectionsInput: false,
      showTagsInput: false,
      collection: '',
      collections: [],
      tag: '',
      tags: [],
    };
  },
  computed: {
    ...mapGetters(['allCollections']),
    bookCover() {
      if (this.metadata.covers[0]) {
        return `url(${this.coverBase}${this.metadata.covers[0]})`;
      }
      return 'url(@/assets/icons/bookmate.svg)';
    },
    suggestionCollections() {
      // console.log([...this.allCollections]);
      const arr = createTags([...this.allCollections]);
      return arr.filter(
        (collection) => collection.text
          .toLowerCase()
          .indexOf(this.collection.toLowerCase()) !== -1,
      );
    },
  },
  methods: {
    backToTopHandler(el) {
      this.$refs[el].scrollTop = 0;
    },
    closeBookModalHandler(payload) {
      if (payload) {
        this.$store.dispatch('saveBookMetadata', payload);
      }
      this.showBookMetadataModal = false;
    },
    setStars(stars) {
      this.$store.dispatch('setStars', { stars });
    },
    toggleDefaultCollections(val) {
      this.$store.dispatch('toggleDefaultCollections', { name: val });
    },
    activeEditCollections() {
      this.collections = createTags(this.metadata.collections);
      this.showCollectionsInput = true;
      this.$nextTick(() => {
        const inputEle = document.querySelector(
          '.collections-container .ti-new-tag-input',
        );
        // console.log(inputEle);
        inputEle.focus();
      });
    },
    inactiveEditCollections() {
      const collections = [];
      this.collections.forEach((collection) => {
        collections.push(collection.text);
      });
      this.$store.dispatch('setCollections', { collections });
      this.showCollectionsInput = false;
      this.collection = '';
      this.collections = [];
    },
    activeEditTags() {
      this.tags = createTags(this.metadata.tags);
      this.showTagsInput = true;
      this.$nextTick(() => {
        const inputEle = document.querySelector(
          '.tags-container .ti-new-tag-input',
        );
        // console.log(inputEle);
        inputEle.focus();
      });
    },
    inactiveEditTags() {
      const tags = [];
      this.tags.forEach((tag) => {
        tags.push(tag.text);
      });
      this.$store.dispatch('setTags', { tags });
      this.showTagsInput = false;
      this.tag = '';
      this.tags = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.introduction-main {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.highlight {
  text-decoration: none;
  box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 0.8);
  color: inherit;
}

.collections {
  overflow-x: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.tags {
  overflow-x: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}
</style>

<style lang="scss">
// custom the collection and tag input UI
.introduction-main {
  .vue-tags-input {
    max-width: calc(100% - 4rem) !important;
    background-color: transparent !important;

    &::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0);
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
    }

    .ti-input {
      overflow-x: overlay;
      border: none;
      padding: 0 0 0.75rem 0;
      .ti-tags {
        flex-wrap: nowrap !important;
        align-items: flex-start;

        .ti-tag {
          padding: 0.25rem 0.375rem 0.25rem 0.375rem;
          flex-shrink: 0;
          // background: #93c5fd;
          // color: white;
          font-size: 0.75rem;
          line-height: 1rem;
          border-radius: 0.25rem;
          margin: 0 0 0 0.375rem;
          // &:hover {
          //   background: #3b82f6;
          // }
        }
        .ti-deletion-mark {
          background: #fca5a5;
        }
        .ti-new-tag-input-wrapper {
          margin: 0 0 0 0.375rem;
          padding: 0;
          input {
            background-color: transparent;
          }
        }
      }
    }

    .ti-autocomplete {
      border-radius: 0.25rem;
      background: #f3f4f6;
      border: none !important;
      box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, 0 0 #0000,
        0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

      li {
        padding: 0.25rem 0.375rem 0.25rem 0.375rem;
        border-radius: 0.25rem;
        font-size: 0.75rem;
        line-height: 1rem;
      }
      // .ti-selected-item {
      //   background: #3b82f6;
      // }
    }
  }
}

.collections-container {
  &:hover {
    .add-collection {
      display: flex;
    }
  }
  .ti-tag {
    background: #93c5fd;
    color: white;

    &:hover {
      background: #3b82f6;
    }
  }
  .ti-selected-item {
    background: #3b82f6;
  }
}

.tags-container {
  &:hover {
    .add-tag {
      display: flex;
    }
  }
  .ti-tag {
    background: #e5e7eb;
    color: #9ca3af;
    &:hover {
      background: #d1d5db;
      color: #6b7280;
    }
  }

  .ti-new-tag-input-wrapper::before {
    content: "#";
    padding: 2px;
    color: #9ca3af;
  }

  .ti-deletion-mark {
    color: white;
  }
}
</style>
