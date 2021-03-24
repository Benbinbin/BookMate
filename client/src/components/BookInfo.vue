<template>
  <div ref="introductionMain" class="introduction-main px-3 py-6 flex flex-col">
    <div class="grid grid-cols-2 gap-3">
      <div
        class="cover bg-contain bg-no-repeat bg-top"
        :style="{
          backgroundImage: `url(covers/${metadata.covers[0]})`,
        }"
      ></div>
      <div class="space-y-3">
        <div class="space-y-1.5">
          <h2 class="text-2xl font-bold">
            {{ metadata.titles[0] }}
          </h2>
          <star-rating
            :rating="metadata.stars"
            :star-size="15"
            :show-rating="false"
            :read-only="true"
            :active-color="'#9CA3AF'"
            :inactive-color="'#E5E7EB'"
          >
          </star-rating>
        </div>
        <div class="space-y-1.5 text-xs">
          <p>作者：{{ metadata.authors.join("、") }}</p>
          <p>ISBN：{{ metadata.isbn }}</p>
        </div>
        <button
          class="flex justify-center items-center py-1 px-2 rounded text-white"
          :class="{
            'bg-blue-300': !showCategory,
            'bg-blue-500': showCategory,
          }"
          @click="showCategory = !showCategory"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33333 16.6667C9.48393 16.6667 10.4167 15.7339 10.4167 14.5833C10.4167 13.4327 9.48393 12.5 8.33333 12.5C7.18274 12.5 6.25 13.4327 6.25 14.5833C6.25 15.7339 7.18274 16.6667 8.33333 16.6667Z"
            />
            <path
              d="M8.33333 27.0833C9.48393 27.0833 10.4167 26.1506 10.4167 25C10.4167 23.8494 9.48393 22.9166 8.33333 22.9166C7.18274 22.9166 6.25 23.8494 6.25 25C6.25 26.1506 7.18274 27.0833 8.33333 27.0833Z"
            />
            <path
              d="M8.33333 37.5C9.48393 37.5 10.4167 36.5673 10.4167 35.4167C10.4167 34.2661 9.48393 33.3334 8.33333 33.3334C7.18274 33.3334 6.25 34.2661 6.25 35.4167C6.25 36.5673 7.18274 37.5 8.33333 37.5Z"
            />
            <path
              d="M41.7916 22.9166H16.5416C15.4601 22.9166 14.5833 23.7934 14.5833 24.875V25.125C14.5833 26.2065 15.4601 27.0833 16.5416 27.0833H41.7916C42.8732 27.0833 43.75 26.2065 43.75 25.125V24.875C43.75 23.7934 42.8732 22.9166 41.7916 22.9166Z"
            />
            <path
              d="M41.7916 33.3334H16.5416C15.4601 33.3334 14.5833 34.2102 14.5833 35.2917V35.5417C14.5833 36.6233 15.4601 37.5 16.5416 37.5H41.7916C42.8732 37.5 43.75 36.6233 43.75 35.5417V35.2917C43.75 34.2102 42.8732 33.3334 41.7916 33.3334Z"
            />
            <path
              d="M41.7916 12.5H16.5416C15.4601 12.5 14.5833 13.3768 14.5833 14.4583V14.7083C14.5833 15.7899 15.4601 16.6667 16.5416 16.6667H41.7916C42.8732 16.6667 43.75 15.7899 43.75 14.7083V14.4583C43.75 13.3768 42.8732 12.5 41.7916 12.5Z"
            />
          </svg>
          <span class="text-sm font-bold ml-1.5">目录</span>
        </button>
        <div class="space-x-1">
          <button
            v-for="item of metadata.defaultCollections"
            :key="item.name"
            :class="{
              'opacity-60': item.active,
              'opacity-10': !item.active,
            }"
            @click="toggleDefaultCollections(item.name)"
          >
            <img
              class="w-6 h-6"
              :src="require(`@/assets/icons/${item.name}.svg`)"
              :alt="`${item.icon} icon`"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="collections-container flex items-start space-x-2 my-3">
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
          class="flex-shrink-0 py-1 px-1.5 bg-blue-300 text-white text-xs rounded"
        >
          {{ item }}
        </li>
      </ul>
      <button
        v-show="!showCollectionsInput"
        class="add-collection flex-shrink-0 opacity-10 hover:opacity-60"
        @click="activeEditCollections"
      >
        <img
          class="w-6 h-6"
          src="@/assets/icons/add-circle.svg"
          alt="add collection icon"
        />
      </button>
      <vue-tags-input
        v-show="showCollectionsInput"
        v-model="collection"
        placeholder="添加标签"
        :tags="collections"
        :autocomplete-items="suggestionCollections"
        :add-on-blur="false"
        :autocomplete-always-open="true"
        @tags-changed="(newCollections) => (collections = newCollections)"
      />
      <button
        v-show="showCollectionsInput"
        class="add-collection flex-shrink-0 opacity-50 hover:opacity-80 text-green-500"
        @click="inactiveEditCollections"
      >
        <svg
          class="w-6 h-6"
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
    <div class="tags-container flex items-start space-x-2 mb-3">
      <img
        src="@/assets/icons/tag.svg"
        alt="tag icon"
        class="w-6 h-6 opacity-60"
      />
      <ul class="tags flex space-x-1.5 pb-3">
        <li
          v-for="item in metadata.tags"
          :key="item"
          class="flex-shrink-0 py-1 px-1.5 bg-gray-200 text-gray-400 text-xs rounded overflow-x-auto"
        >
          #{{ item }}
        </li>
      </ul>
      <button class="add-tag flex-shrink-0 opacity-10 hover:opacity-60">
        <img
          class="w-6 h-6"
          src="@/assets/icons/add-circle.svg"
          alt="add tag icon"
        />
      </button>
    </div>
    <p class="my-8 leading-87" v-show="!showCategory">
      {{ metadata.description }}
    </p>
    <ul class="category" v-show="showCategory">
      <category-tree
        v-for="(item, index) of metadata.category.children"
        :key="index"
        :item="item"
        :quotes-chapters="quotesChapters"
        :summaries-chapters="summariesChapters"
      ></category-tree>
    </ul>
    <footer class="my-12 items-center">
      <hr class="mx-auto w-1/2" />
      <div class="flex justify-center items-center">
        <button
          @click="backToTopHandler('introductionMain')"
          class="text-blue-400 font-bold my-4"
        >
          返回顶部
        </button>
      </div>
    </footer>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating';
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';
import { mapGetters } from 'vuex';
import CategoryTree from './CategoryTree.vue';

export default {
  props: ['metadata', 'quotesChapters', 'summariesChapters'],
  components: {
    StarRating,
    VueTagsInput,
    CategoryTree,
  },
  data() {
    return {
      showCategory: false,
      showCollectionsInput: false,
      collection: '',
      collections: [],
      tag: '',
      tags: [],
    };
  },
  computed: {
    ...mapGetters(['allCollections']),
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
    toggleDefaultCollections(val) {
      this.$store.dispatch('toggleDefaultCollections', val);
    },
    activeEditCollections() {
      this.collections = createTags(this.metadata.collections);
      this.showCollectionsInput = true;
      this.$nextTick(() => {
        const inputEle = document.getElementsByClassName('ti-new-tag-input')[0];
        // console.log(inputEle);
        inputEle.focus();
      });
    },
    inactiveEditCollections() {
      const collections = [];
      this.collections.forEach((collection) => {
        collections.push(collection.text);
      });
      this.$store.dispatch('setCollections', collections);
      this.showCollectionsInput = false;
    },
  },

  created() {
    this.$store.dispatch('getBooksList');
  },
};
</script>

<style lang="scss" scoped>
.introduction-main {
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
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
        background: #93c5fd;
        color: white;
        font-size: 0.75rem;
        line-height: 1rem;
        border-radius: 0.25rem;
        margin: 0 0 0 0.375rem;
        &:hover {
          background: #3b82f6;
        }
      }
      .ti-deletion-mark {
        background: #fca5a5;
      }
    }
    .ti-new-tag-input-wrapper {
      margin: 0 0 0 0.375rem;
      padding: 0;
      input {
        background-color: transparent;
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
    .ti-selected-item {
      background: #3b82f6;
    }
  }
}
</style>
