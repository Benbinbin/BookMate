<template>
  <div class="bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div
      class="import-quotes-modal-container w-11/12 h-4/5 flex flex-col rounded-lg bg-white"
    >
      <div
        class="modal-header px-1 flex justify-between items-center border-b-2 border-gray-100"
      >
        <div></div>
        <h1 class="font-bold text-sm text-gray-400">导入书摘</h1>
        <button
          class="left w-8 h-8 flex items-center rounded-full p-1 text-red-300 opacity-60 hover:opacity-100"
          @click="$emit('close-import-quotes-modal')"
        >
          <svg
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25 4.16669C20.8795 4.16669 16.8516 5.38854 13.4256 7.67774C9.99956 9.96693 7.3293 13.2207 5.75248 17.0274C4.17565 20.8342 3.76308 25.0231 4.56694 29.0644C5.3708 33.1057 7.35498 36.8178 10.2686 39.7314C13.1822 42.645 16.8943 44.6292 20.9356 45.433C24.9769 46.2369 29.1657 45.8243 32.9725 44.2475C36.7793 42.6707 40.0331 40.0004 42.3222 36.5744C44.6114 33.1484 45.8333 29.1205 45.8333 25C45.8333 22.2641 45.2944 19.5551 44.2475 17.0274C43.2005 14.4998 41.6659 12.2032 39.7314 10.2686C37.7968 8.33407 35.5002 6.7995 32.9725 5.75253C30.4449 4.70556 27.7358 4.16669 25 4.16669ZM25 41.6667C21.7036 41.6667 18.4813 40.6892 15.7405 38.8578C12.9996 37.0265 10.8634 34.4235 9.60198 31.3781C8.34052 28.3326 8.01046 24.9815 8.65355 21.7485C9.29663 18.5155 10.884 15.5458 13.2149 13.2149C15.5457 10.884 18.5154 9.29669 21.7485 8.6536C24.9815 8.01051 28.3326 8.34057 31.378 9.60203C34.4235 10.8635 37.0264 12.9997 38.8578 15.7405C40.6891 18.4813 41.6666 21.7037 41.6666 25C41.6666 29.4203 39.9107 33.6595 36.7851 36.7851C33.6595 39.9107 29.4202 41.6667 25 41.6667Z"
            />
            <path
              d="M30.6458 19.3542C30.4522 19.1589 30.2217 19.0039 29.9679 18.8981C29.714 18.7924 29.4417 18.7379 29.1667 18.7379C28.8916 18.7379 28.6193 18.7924 28.3655 18.8981C28.1116 19.0039 27.8812 19.1589 27.6875 19.3542L25 22.0625L22.3125 19.3542C21.9202 18.9619 21.3881 18.7415 20.8333 18.7415C20.2785 18.7415 19.7465 18.9619 19.3542 19.3542C18.9619 19.7465 18.7415 20.2785 18.7415 20.8333C18.7415 21.3881 18.9619 21.9202 19.3542 22.3125L22.0625 25L19.3542 27.6875C19.1589 27.8812 19.0039 28.1116 18.8981 28.3655C18.7924 28.6193 18.7379 28.8916 18.7379 29.1667C18.7379 29.4417 18.7924 29.714 18.8981 29.9679C19.0039 30.2217 19.1589 30.4522 19.3542 30.6458C19.5478 30.8411 19.7783 30.9961 20.0321 31.1019C20.286 31.2076 20.5583 31.2621 20.8333 31.2621C21.1084 31.2621 21.3807 31.2076 21.6345 31.1019C21.8884 30.9961 22.1188 30.8411 22.3125 30.6458L25 27.9375L27.6875 30.6458C27.8812 30.8411 28.1116 30.9961 28.3655 31.1019C28.6193 31.2076 28.8916 31.2621 29.1667 31.2621C29.4417 31.2621 29.714 31.2076 29.9679 31.1019C30.2217 30.9961 30.4522 30.8411 30.6458 30.6458C30.8411 30.4522 30.9961 30.2217 31.1019 29.9679C31.2076 29.714 31.2621 29.4417 31.2621 29.1667C31.2621 28.8916 31.2076 28.6193 31.1019 28.3655C30.9961 28.1116 30.8411 27.8812 30.6458 27.6875L27.9375 25L30.6458 22.3125C30.8411 22.1188 30.9961 21.8884 31.1019 21.6345C31.2076 21.3807 31.2621 21.1084 31.2621 20.8333C31.2621 20.5583 31.2076 20.286 31.1019 20.0321C30.9961 19.7783 30.8411 19.5478 30.6458 19.3542Z"
            />
          </svg>
        </button>
      </div>
      <div
        ref="modal-body"
        class="modal-body w-full"
        style="max-height: calc(100% - 34px)"
      >
        <div class="tabs-list flex justify-center space-x-4 p-4">
          <button
            class="py-4 px-3 flex justify-center items-center rounded bg-gray-50 hover:bg-gray-200"
            :class="{ 'bg-gray-200': tab === 'kindle-notes-parse' }"
            @click="tab = 'kindle-notes-parse'"
          >
            <img class="w-8" src="apps/kindle.png" alt="kindle app icon" />
            <span class="ml-2 text-sm text-gray-800">Kindle</span>
          </button>
          <button
            class="py-4 px-3 flex justify-center items-center rounded bg-gray-50 hover:bg-gray-200"
            :class="{ 'bg-gray-200': tab === 'duokan-notes-parse' }"
            @click="tab = 'duokan-notes-parse'"
          >
            <img class="w-8" src="apps/duokan.png" alt="duokan app icon" />
            <span class="ml-2 text-sm text-gray-800">多看阅读</span>
          </button>
        </div>
        <component :is="tab" @add-files="setResult"></component>
        <hr class="w-1/2 mx-auto my-8" />
        <div class="result-container m-4 md:mx-10 lg:mx-20 space-y-4">
          <h2 class="text-center m-8 text-2xl font-bold">结果</h2>
          <div class="source-files-container">
            <h3 class="text-lg font-bold my-4">
              <span class="highlight">源文件</span>
            </h3>
            <div class="source-files flex items-start space-x-2">
              <button
                v-for="item of result"
                :key="item.fileName"
                class="py-2 px-3 flex-shrink-0 flex items-center truncate bg-gray-50 hover:bg-gray-200 rounded"
                :class="{ 'bg-gray-200': currentFileName === item.fileName }"
                @click="
                  currentFileName === item.fileName
                    ? (currentFileName = '')
                    : (currentFileName = item.fileName)
                "
              >
                <span class="source-file-name text-xs truncate">
                  {{ item.fileName }}</span
                >
                <button
                  class="delete-file w-5 h-5 ml-1 opacity-80 hover:opacity-100"
                  @click="deleteFile(item.fileName)"
                >
                  <img
                    src="@/assets/icons/close-circle.svg"
                    alt="delete icon"
                  />
                </button>
              </button>
            </div>
          </div>
          <div v-if="currentFile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="match-book-container h-60 flex-grow">
                <div class="header flex items-center">
                  <h3 class="text-lg font-bold my-4">
                    <span class="highlight">匹配书籍</span>
                  </h3>
                </div>
                <div
                  v-if="!currentFile.matchBook"
                  class="search-bar-container flex items-start relative"
                >
                  <input
                    ref="search-input"
                    type="search"
                    class="px-2 py-1 w-40 bg-gray-200 text-xs rounded focus:outline-none"
                    placeholder="搜索并选择已存书籍"
                    v-model="keyword"
                  />
                  <button class="p-1">
                    <img
                      class="w-4 h-4"
                      src="@/assets/icons/search.svg"
                      alt="search icon"
                    />
                  </button>
                  <div
                    v-show="suggestionBooks.length > 0"
                    class="suggestion-books-modal w-40 absolute top-7 left-0 bg-gray-100 shadow rounded"
                  >
                    <ul class="suggestion-books-list">
                      <li
                        v-for="book of suggestionBooks"
                        :key="book._id.$oid"
                        class="suggestion-book w-full"
                      >
                        <button
                          class="flex w-full items-center p-2 space-x-1 hover:bg-gray-200 rounded"
                          @click="setMatchBook(book)"
                        >
                          <div
                            class="cover w-7 h-8 bg-center bg-no-repeat bg-contain"
                            :style="{
                              backgroundImage: `url(${coverBase}${book.metadata.covers[0]})`,
                            }"
                          ></div>
                          <span class="text-xs font-bold text-gray-500">{{
                            book.metadata.titles[0]
                          }}</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  v-if="currentFile.matchBook"
                  class="match-book flex flex-col space-y-2"
                >
                  <div
                    class="cover flex-shrink-0 relative w-24 h-32 bg-center bg-no-repeat bg-contain"
                    :style="{
                      backgroundImage: `url(${coverBase}${currentFile.matchBook.metadata.covers[0]})`,
                    }"
                    tabindex="0"
                  >
                    <button
                      class="delete-cover-btn w-5 h-5 hidden absolute top-1 right-1 z-10 text-red-500 opacity-80 hover:opacity-100"
                      @click="deleteMatchBook"
                    >
                      <svg
                        viewBox="0 0 50 50"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 19.1875C17.9144 19.1875 18.3118 19.3521 18.6049 19.6451C18.8979 19.9382 19.0625 20.3356 19.0625 20.75V39.5C19.0625 39.9144 18.8979 40.3118 18.6049 40.6049C18.3118 40.8979 17.9144 41.0625 17.5 41.0625C17.0856 41.0625 16.6882 40.8979 16.3951 40.6049C16.1021 40.3118 15.9375 39.9144 15.9375 39.5V20.75C15.9375 20.3356 16.1021 19.9382 16.3951 19.6451C16.6882 19.3521 17.0856 19.1875 17.5 19.1875V19.1875ZM25.3125 19.1875C25.7269 19.1875 26.1243 19.3521 26.4174 19.6451C26.7104 19.9382 26.875 20.3356 26.875 20.75V39.5C26.875 39.9144 26.7104 40.3118 26.4174 40.6049C26.1243 40.8979 25.7269 41.0625 25.3125 41.0625C24.8981 41.0625 24.5007 40.8979 24.2076 40.6049C23.9146 40.3118 23.75 39.9144 23.75 39.5V20.75C23.75 20.3356 23.9146 19.9382 24.2076 19.6451C24.5007 19.3521 24.8981 19.1875 25.3125 19.1875V19.1875ZM34.6875 20.75C34.6875 20.3356 34.5229 19.9382 34.2299 19.6451C33.9368 19.3521 33.5394 19.1875 33.125 19.1875C32.7106 19.1875 32.3132 19.3521 32.0201 19.6451C31.7271 19.9382 31.5625 20.3356 31.5625 20.75V39.5C31.5625 39.9144 31.7271 40.3118 32.0201 40.6049C32.3132 40.8979 32.7106 41.0625 33.125 41.0625C33.5394 41.0625 33.9368 40.8979 34.2299 40.6049C34.5229 40.3118 34.6875 39.9144 34.6875 39.5V20.75Z"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M45.625 11.375C45.625 12.2038 45.2958 12.9987 44.7097 13.5847C44.1237 14.1708 43.3288 14.5 42.5 14.5H40.9375V42.625C40.9375 44.2826 40.279 45.8723 39.1069 47.0444C37.9348 48.2165 36.3451 48.875 34.6875 48.875H15.9375C14.2799 48.875 12.6902 48.2165 11.5181 47.0444C10.346 45.8723 9.6875 44.2826 9.6875 42.625V14.5H8.125C7.2962 14.5 6.50134 14.1708 5.91529 13.5847C5.32924 12.9987 5 12.2038 5 11.375V8.25C5 7.4212 5.32924 6.62634 5.91529 6.04029C6.50134 5.45424 7.2962 5.125 8.125 5.125H19.0625C19.0625 4.2962 19.3917 3.50134 19.9778 2.91529C20.5638 2.32924 21.3587 2 22.1875 2H28.4375C29.2663 2 30.0612 2.32924 30.6472 2.91529C31.2333 3.50134 31.5625 4.2962 31.5625 5.125H42.5C43.3288 5.125 44.1237 5.45424 44.7097 6.04029C45.2958 6.62634 45.625 7.4212 45.625 8.25V11.375ZM13.1813 14.5L12.8125 14.6844V42.625C12.8125 43.4538 13.1417 44.2487 13.7278 44.8347C14.3138 45.4208 15.1087 45.75 15.9375 45.75H34.6875C35.5163 45.75 36.3112 45.4208 36.8972 44.8347C37.4833 44.2487 37.8125 43.4538 37.8125 42.625V14.6844L37.4437 14.5H13.1813ZM8.125 11.375V8.25H42.5V11.375H8.125Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <h4
                    class="title w-24 text-xs font-bold text-center text-gray-500"
                  >
                    {{ currentFile.matchBook.metadata.titles[0] }}
                  </h4>
                </div>
              </div>
              <div class="settings-container flex-grow">
                <h3 class="text-lg font-bold my-4">
                  <span class="highlight">操作</span>
                </h3>
                <div class="settings space-y-2">
                  <div class="flex space-x-2">
                    <button
                      class="p-2 flex-shrink-0 text-sm text-white bg-blue-500 opacity-80 hover:opacity-100 rounded"
                      @click="selectAll"
                    >
                      全选（不重复）
                    </button>
                    <button
                      class="p-2 flex-shrink-0 text-sm text-white bg-blue-500 opacity-80 hover:opacity-100 rounded"
                      @click="unselectAll"
                    >
                      全不选
                    </button>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      v-show="!loading"
                      class="p-2 flex-shrink-0 text-sm text-white bg-green-500 rounded"
                      :class="{
                        'opacity-80 hover:opacity-100':
                          selectedQuotes.find(
                            (item) => item.fileName === currentFileName
                          ).quotesIndex.length !== 0 && currentFile.matchBook,
                        'opacity-10':
                          selectedQuotes.find(
                            (item) => item.fileName === currentFileName
                          ).quotesIndex.length === 0 || !currentFile.matchBook,
                      }"
                      :disabled="
                        selectedQuotes.find(
                          (item) => item.fileName === currentFileName
                        ).quotesIndex.length === 0 || !currentFile.matchBook
                      "
                      @click="importSelectQuotes"
                    >
                      导入（选中）
                    </button>
                    <div
                      v-show="loading"
                      class="p-2 flex-shrink-0 text-sm text-white bg-green-500 opacity-60 rounded"
                    >
                      导入中...
                    </div>
                    <!-- <button
                      class="p-2 flex-shrink-0 text-sm text-white bg-green-500 opacity-80 hover:opacity-100 rounded"
                    >
                      合并（所有重复）
                    </button>
                    <button
                      class="p-2 flex-shrink-0 text-sm text-white bg-green-500 opacity-80 hover:opacity-100 rounded"
                    >
                      覆盖（所有重复）
                    </button> -->
                  </div>
                </div>
              </div>
            </div>
            <div class="quotes-container">
              <h3 class="text-lg font-bold my-4">
                <span class="highlight">书摘笔记</span>
              </h3>
              <div class="quotes-header grid grid-cols-3 gap-6 my-4">
                <div>
                  <h4 class="font-bold text-center text-gray-600 my-2">
                    待导入
                  </h4>
                  <div class="my-2 flex justify-center items-center">
                    <span class="text-xs text-gray-500"
                      >共有 {{ currentFile.notes.length }}</span
                    >
                  </div>
                  <div class="my-2 flex justify-center items-center">
                    <span
                      class="px-1 text-xs text-gray-500 ring rounded-lg ring-blue-300"
                      >选中</span
                    >
                    <span class="ml-2 text-xs text-gray-500">{{
                      selectedQuotes.find(
                        (item) => item.fileName === currentFileName
                      ).quotesIndex.length
                    }}</span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-center text-gray-300 my-2">
                    比较（重复）
                  </h4>
                  <div class="my-2 flex justify-center items-center space-x-2">
                    <span
                      class="px-1 text-xs underline text-green-500 bg-green-100 rounded"
                      >新增</span
                    >

                    <span class="px-1 text-xs bg-gray-100 rounded">相同</span>
                    <span
                      class="px-1 text-xs line-through text-red-500 bg-red-100 rounded"
                      >删除</span
                    >
                  </div>
                  <div class="my-2 flex justify-center items-center">
                    <span
                      class="px-1 text-xs text-gray-500 ring rounded-lg ring-red-300"
                      >未处理冲突</span
                    >
                    <span class="ml-2 text-xs text-gray-500">
                      {{
                        currentFile.similarQuotes.reduce((sum, item) => {
                          if (
                            item.quote &&
                            (item.diff.quote.similarity !== 1 ||
                              (item.diff.comment &&
                                item.diff.comment.similarity !== 1))
                          )
                            sum += 1;
                          return sum;
                        }, 0)
                      }}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 class="font-bold text-center text-gray-600 my-2">
                    已导入
                  </h4>
                  <div class="flex justify-center items-center">
                    <span class="text-xs text-gray-500"
                      >重复：{{
                        currentFile.similarQuotes.reduce((sum, item) => {
                          if (item.quote) sum += 1;
                          return sum;
                        }, 0)
                      }}</span
                    >
                  </div>
                </div>
              </div>

              <div class="quotes-body space-y-6">
                <div v-show="loading" class="my-20">
                  <p class="text-center text-gray-400 text-xs">解析中...</p>
                </div>
                <div
                  v-show="!loading"
                  v-for="(quote, index) of currentFile.notes"
                  :key="index"
                  class="quote grid grid-cols-3 gap-6 items-stretch"
                >
                  <div
                    class="uncommit-container flex flex-col relative"
                    :class="{
                      'ring-4 rounded-lg ring-blue-300': selectedQuotes
                        .find((item) => item.fileName === currentFileName)
                        .quotesIndex.includes(index),
                    }"
                  >
                    <button
                      class="w-full h-full absolute inset-0 z-10"
                      :disabled="currentFile.similarQuotes[index].quote"
                      @click="toggleSelect(index)"
                    ></button>
                    <p
                      class="quote-content flex-grow bg-white border px-8 py-6"
                      :class="{
                        'rounded-lg': !quote.comment,
                        'rounded-t-lg': quote.comment,
                      }"
                    >
                      {{ quote.content }}
                    </p>
                    <p
                      v-if="quote.comment"
                      class="quote-comment bg-gray-200 text-blue-900 rounded-b-lg px-8 py-6"
                    >
                      {{ quote.comment }}
                    </p>
                  </div>
                  <div
                    class="diff-container flex flex-col"
                    :class="{
                      'ring-4 rounded-lg ring-red-300':
                        currentFile.similarQuotes[index].quote &&
                        (currentFile.similarQuotes[index].diff.quote
                          .similarity !== 1 ||
                          (currentFile.similarQuotes[index].diff.comment &&
                            currentFile.similarQuotes[index].diff.comment
                              .similarity !== 1)),
                    }"
                  >
                    <div
                      v-if="currentFile.similarQuotes[index].quote"
                      class="quote-diff flex-grow bg-white border px-8 py-6"
                      :class="{
                        'rounded-lg': !quote.comment,
                        'rounded-t-lg': quote.comment,
                      }"
                    >
                      <div class="quote-diff-body">
                        <p
                          class="text-sm leading-6"
                          v-html="
                            currentFile.similarQuotes[index].diff.quote.diffHTML
                          "
                        ></p>
                      </div>
                      <div
                        class="quote-diff-footer mt-4 flex flex-col space-y-2 lg:space-y-0 lg:flex-row justify-between items-center"
                      >
                        <div class="left flex items-center">
                          <span class="text-xs text-gray-400">相似度：</span>
                          <div
                            class="similarity-bar w-12 h-2.5 hidden xl:flex bg-gray-200 rounded-full"
                          >
                            <span
                              class="h-2.5 rounded-full"
                              :class="{
                                'bg-green-300':
                                  currentFile.similarQuotes[index].diff.quote
                                    .similarity < 0.8,
                                'bg-red-300':
                                  currentFile.similarQuotes[index].diff.quote
                                    .similarity >= 0.8,
                              }"
                              :style="{
                                width: `${Math.round(
                                  currentFile.similarQuotes[index].diff.quote
                                    .similarity * 100
                                )}%`,
                              }"
                            ></span>
                          </div>
                          <span
                            class="text-xs text-gray-400 ml-1"
                            :class="{
                              'text-green-300':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity < 0.8,
                              'text-red-300':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity >= 0.8,
                            }"
                            >{{
                              `${Math.round(
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity * 100
                              )}%`
                            }}</span
                          >
                        </div>
                        <div class="right flex space-x-1">
                          <button
                            class="px-2 py-1 flex-shrink-0 text-xs text-white bg-green-500 rounded"
                            :disabled="
                              currentFile.similarQuotes[index].diff.quote
                                .similarity === 1
                            "
                            :class="{
                              'opacity-10':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity === 1,
                              'opacity-80 hover:opacity-100':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity !== 1,
                            }"
                            @click="
                              diffHandler({
                                index: index,
                                quote_id:
                                  currentFile.similarQuotes[index].quote._id,
                                content:
                                  currentFile.similarQuotes[index].diff.quote
                                    .diffText,
                                type: 'quote',
                                action: 'merge',
                              })
                            "
                          >
                            合并
                          </button>
                          <button
                            class="px-2 py-1 flex-shrink-0 text-xs text-white bg-green-500 rounded"
                            :disabled="
                              currentFile.similarQuotes[index].diff.quote
                                .similarity === 1
                            "
                            :class="{
                              'opacity-10':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity === 1,
                              'opacity-80 hover:opacity-100':
                                currentFile.similarQuotes[index].diff.quote
                                  .similarity !== 1,
                            }"
                            @click="
                              diffHandler({
                                index: index,
                                quote_id:
                                  currentFile.similarQuotes[index].quote._id,
                                content: quote.content,
                                type: 'quote',
                                action: 'override',
                              })
                            "
                          >
                            覆盖
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        currentFile.similarQuotes[index].quote &&
                        currentFile.similarQuotes[index].quote.comment_origin
                      "
                      class="comment-diff px-8 py-6 bg-gray-200 text-blue-900 rounded-b-lg"
                    >
                      <div class="comment-diff-body">
                        <p
                          class="text-sm leading-6"
                          v-html="
                            currentFile.similarQuotes[index].diff.comment
                              .diffHTML
                          "
                        ></p>
                      </div>
                      <div
                        class="comment-diff-footer mt-4 flex justify-end space-x-1"
                      >
                        <button
                          class="px-2 py-1 flex-shrink-0 text-xs text-white bg-green-500 rounded"
                          :disabled="
                            currentFile.similarQuotes[index].diff.comment
                              .similarity === 1
                          "
                          :class="{
                            'opacity-10':
                              currentFile.similarQuotes[index].diff.comment
                                .similarity === 1,
                            'opacity-80 hover:opacity-100':
                              currentFile.similarQuotes[index].diff.comment
                                .similarity !== 1,
                          }"
                          @click="
                            diffHandler({
                              index: index,
                              quote_id:
                                currentFile.similarQuotes[index].quote._id,
                              content:
                                currentFile.similarQuotes[index].diff.comment
                                  .diffText,
                              type: 'comment',
                              action: 'merge',
                            })
                          "
                        >
                          合并
                        </button>
                        <button
                          class="px-2 py-1 flex-shrink-0 text-xs text-white bg-green-500 rounded"
                          :disabled="
                            currentFile.similarQuotes[index].diff.comment
                              .similarity === 1
                          "
                          :class="{
                            'opacity-10':
                              currentFile.similarQuotes[index].diff.comment
                                .similarity === 1,
                            'opacity-80 hover:opacity-100':
                              currentFile.similarQuotes[index].diff.comment
                                .similarity !== 1,
                          }"
                          @click="
                            diffHandler({
                              index: index,
                              quote_id:
                                currentFile.similarQuotes[index].quote._id,
                              content: quote.comment,
                              type: 'comment',
                              action: 'override',
                            })
                          "
                        >
                          覆盖
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="committed-container flex flex-col">
                    <p
                      v-if="
                        currentFile.similarQuotes[index].quote &&
                        currentFile.similarQuotes[index].quote.content_origin
                      "
                      class="quote-content flex-grow h-auto bg-white border px-8 py-6"
                      :class="{
                        'rounded-lg': !quote.comment,
                        'rounded-t-lg': quote.comment,
                      }"
                    >
                      {{
                        currentFile.similarQuotes[index].quote
                          ? currentFile.similarQuotes[index].quote
                              .content_origin
                          : "no matching quote"
                      }}
                    </p>
                    <p
                      v-if="
                        currentFile.similarQuotes[index].quote &&
                        currentFile.similarQuotes[index].quote.comment_origin
                      "
                      class="quote-comment bg-gray-200 text-blue-900 rounded-b-lg px-8 py-6"
                    >
                      {{
                        currentFile.similarQuotes[index].quote.comment_origin
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="mt-8 mb-4 items-center">
          <hr class="mx-auto w-1/2" />
          <div class="flex justify-center items-center">
            <button
              @click="backToTopHandler"
              class="text-blue-400 font-bold text-sm my-4"
            >
              返回顶部
            </button>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import * as Diff from 'diff';
import { mapState } from 'vuex';
import { Editor } from 'tiptap';
import KindleNotesParse from '../parser/KindleNotesParse.vue';
import DuokanNotesParse from '../parser/DuokanNotesParse.vue';

function flatten(root, arr) {
  if (root && Array.isArray(root)) {
    root.forEach((item) => {
      flatten(item, arr);
    });
  } else if (root && root.children) {
    if (root.name !== '__root__') arr.push(root.name);
    flatten(root.children, arr);
  } else if (root) {
    if (root.name !== '__root__') arr.push(root.name);
  }
}

export default {
  components: {
    KindleNotesParse,
    DuokanNotesParse,
  },
  props: ['bookId', 'initTab'],
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      tab: this.initTab,
      loading: false,
      result: [],
      keyword: '',
      currentFileName: '',
      selectedQuotes: [],
      convertor: null,
      JSONtemp: null,
    };
  },
  computed: {
    ...mapState(['booksList']),
    currentFile() {
      const index = this.result.findIndex(
        (item) => this.currentFileName === item.fileName,
      );
      if (index !== -1) {
        return this.result[index];
      }
      return null;
    },

    suggestionBooks() {
      return this.booksList.filter((item) => {
        const result = item.metadata.titles.find((title) => {
          const regexp = new RegExp(this.keyword);
          return regexp.test(title);
        });
        if (result) {
          return true;
        }
        return false;
      });
    },
  },
  methods: {
    backToTopHandler() {
      this.$refs['modal-body'].scrollTop = 0;
    },

    deleteFile(fileName) {
      const index = this.result.findIndex((item) => item.fileName === fileName);
      if (index !== -1) {
        this.result.splice(index, 1);
      }

      const i = this.selectedQuotes.findIndex(
        (item) => item.fileName === fileName,
      );
      if (i !== -1) {
        this.selectedQuotes.splice(i, 1);
      }

      if (fileName === this.currentFileName) {
        this.currentFileName = '';
      }
    },
    deleteMatchBook() {
      this.currentFile.matchBook = null;
      // this.currentFile.matchBookTitle = "";
      // this.currentFile.matchBookCover = "";
      this.currentFile.similarQuotes = [];
      this.currentFile.notes.forEach(() => {
        this.currentFile.similarQuotes.push({
          quote: null,
          diff: { quote: { similarity: 0 } },
        });
      });
      this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex = [];
      this.$nextTick(() => {
        const input = this.$refs['search-input'];
        input.focus();
      });
    },
    SortQuotesByChapter(quotes) {
      const quotesSorted = [];
      quotes.forEach((quote) => {
        const index = quotesSorted.findIndex(
          (item) => item.chapter === quote.chapter,
        );
        if (index === -1) {
          quotesSorted.push({
            chapter: quote.chapter || '未分类(NoChapter)',
            quotes: [quote],
          });
        } else {
          quotesSorted[index].quotes.push(quote);
        }
      });
      return quotesSorted;
    },
    async setResult(arr) {
      const matchBooksTemp = [];
      arr.forEach((item) => {
        if (this.result.find((file) => file.fileName === item.fileName)) return;
        // let matchBookTitle = "";
        // let matchBookCover = "";
        matchBooksTemp.push(this.setInitMatchBook(item.metadata.title));
      });

      const matchBooks = await Promise.all(matchBooksTemp);
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < arr.length; index++) {
        const categoryFlatten = [];
        let matchBookQuotes = [];
        let matchBookQuotesSorted = [];
        if (matchBooks[index]) {
          const category = matchBooks[index].metadata;
          flatten(category, categoryFlatten);
          matchBookQuotes = matchBooks[index].quotes;
          matchBookQuotesSorted = this.SortQuotesByChapter(matchBookQuotes);
        }
        const inputQuotes = arr[index].notes;

        // this.setSimilarQuotes(
        //   inputQuotes,
        //   categoryFlatten,
        //   matchBookQuotes,
        //   matchBookQuotesSorted
        // ).then((similarQuotes) => {
        //   this.result.push({
        //     matchBookTitle,
        //     matchBookCover,
        //     ...item,
        //     similarQuotes,
        //   });
        // this.selectedQuotes.push({
        //   fileName: item.fileName,
        //   quotesIndex: [],
        // });
        // });

        this.result.push({
          ...arr[index],
          matchBook: matchBooks[index],
          similarQuotes: this.setSimilarQuotes(
            inputQuotes,
            categoryFlatten,
            matchBookQuotes,
            matchBookQuotesSorted,
          ),
        });
        this.selectedQuotes.push({
          fileName: arr[index].fileName,
          quotesIndex: [],
        });
      }
    },
    setInitMatchBook(bookName) {
      return new Promise((resolve, reject) => {
        if (this.bookId) {
          // const [title] = this.bookId.titles;
          this.$store
            .dispatch('getMatchBook', { id: this.bookId })
            .then((matchBook) => {
              resolve(matchBook);
            });
        } else {
          const target = this.booksList.find((item) => {
            const result = item.metadata.titles.find((title) => {
              const regexp = new RegExp(title);
              return regexp.test(bookName);
            });
            if (result) {
              return true;
            }
            return false;
          });
          if (target) {
            this.$store
              .dispatch('getMatchBook', { id: target._id })
              .then((matchBook) => {
                resolve(matchBook);
              });
          } else {
            resolve(null);
          }
        }
      });
    },
    setMatchBook(book) {
      this.loading = true;
      this.keyword = '';
      this.$store
        .dispatch('getMatchBook', { id: book._id })
        .then((matchBook) => {
          this.currentFile.matchBook = matchBook;

          const { category } = matchBook.metadata;
          const categoryFlatten = [];
          flatten(category, categoryFlatten);
          const matchBookQuotes = matchBook.quotes;
          const matchBookQuotesSorted = this.SortQuotesByChapter(
            matchBookQuotes,
          );

          // [this.currentFile.matchBookTitle] = titles;
          // if (covers.length > 0) {
          //   [this.currentFile.matchBookCover] = covers;
          // }
          // const delaySetMatchBookTimer = setTimeout(() => {
          //   this.setSimilarQuotes(
          //     this.currentFile.notes,
          //     categoryFlatten,
          //     matchBookQuotes,
          //     matchBookQuotesSorted
          //   ).then((similarQuotes) => {
          //     this.currentFile.similarQuotes = similarQuotes;
          //     this.loading = false;
          //   });
          //   clearTimeout(delaySetMatchBookTimer);
          // }, 0);
          this.currentFile.similarQuotes = this.setSimilarQuotes(
            this.currentFile.notes,
            categoryFlatten,
            matchBookQuotes,
            matchBookQuotesSorted,
          );
          this.loading = false;
        });
    },
    setSimilarQuotes(
      inputQuotes,
      categoryFlatten,
      matchBookQuotes,
      matchBookQuotesSorted,
    ) {
      const similarQuotes = [];

      inputQuotes.forEach((quote) => {
        const similarQuote = {
          quote: null,
          diff: { quote: { similarity: 0 } },
        };

        let comparedQuotes = matchBookQuotes;
        // 从特定章节寻找相似的书摘
        const { chapter } = quote;
        if (chapter) {
          const targetChapter = categoryFlatten.find(
            (item) => chapter === item,
          );
          if (targetChapter) {
            const index = matchBookQuotesSorted.findIndex(
              (item) => item.chapter === targetChapter,
            );
            if (index !== -1) {
              comparedQuotes = matchBookQuotesSorted[index].quotes;
            }
          }
        }
        comparedQuotes.find((item) => {
          const newQuote = quote.content;
          const oldQuote = item.content_origin || '';

          const quoteDiff = this.diffContent(oldQuote, newQuote);
          const { similarity } = quoteDiff;

          if (similarity >= 0.5) {
            similarQuote.diff.quote = quoteDiff;
            similarQuote.quote = item;
            return true;
          }
          if (
            similarity > 0.3
            && similarity > similarQuote.diff.quote.similarity
          ) {
            similarQuote.diff.quote = quoteDiff;
            similarQuote.quote = item;
            return false;
          }
          return false;
        });

        if (
          similarQuote.quote
          && (similarQuote.quote.comment_origin || quote.comment)
        ) {
          const newComment = quote.comment || '';
          const oldComment = similarQuote.quote.comment_origin || '';
          similarQuote.diff.comment = this.diffContent(oldComment, newComment);
        }
        similarQuotes.push(similarQuote);
      });
      return similarQuotes;
    },
    diffContent(oldStr, newStr) {
      // eslint-disable-next-line no-param-reassign
      if (!oldStr) oldStr = '';
      const diff = Diff.diffChars(oldStr, newStr);
      let diffHTML = '';
      let diffText = '';
      const len = Math.max(newStr.length, oldStr.length);
      let unchangeLen = 0;

      diff.forEach((el) => {
        diffText += `${el.value}`;
        if (!el.added && !el.removed) {
          unchangeLen += el.count;
          diffHTML += `<span class=" px-1 bg-gray-100 rounded">${el.value}</span>`;
        } else if (el.removed) {
          diffHTML += `<span class="px-1 line-through text-red-500 bg-red-100 rounded">${el.value}</span>`;
        } else if (el.added) {
          diffHTML += `<span class=" px-1 underline text-green-500 bg-green-100 rounded">${el.value}</span>`;
        }
      });
      const similarity = unchangeLen / len;
      return { diffText, diffHTML, similarity };
    },
    diffHandler(payload) {
      // const matchBookId = this.currentFile.matchBook._id;
      const {
        index, quote_id, content, type, action,
      } = payload;
      this.$store
        .dispatch('setContentOrigin', {
          // matchBookId,
          quote_id,
          content,
          type,
        })
        .then((data) => {
          if (type === 'quote') {
            const quote = this.currentFile.matchBook.quotes.find(
              (item) => item._id === quote_id,
            );
            quote.content_origin = data;

            if (action === 'merge') {
              this.currentFile.notes[index].content = data;
            }
            this.currentFile.similarQuotes[index].diff.quote = this.diffContent(
              this.currentFile.similarQuotes[index].quote.content_origin,
              this.currentFile.notes[index].content,
            );
          } else if (type === 'comment') {
            const quote = this.currentFile.matchBook.quotes.find(
              (item) => item._id === quote_id,
            );
            quote.comment_origin = data;
            if (action === 'merge') {
              this.currentFile.notes[index].comment = data;
            }
            this.currentFile.similarQuotes[
              index
            ].diff.comment = this.diffContent(
              this.currentFile.similarQuotes[index].quote.comment_origin,
              this.currentFile.notes[index].comment,
            );
          }
        });
    },
    toggleSelect(index) {
      const arr = this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex;
      const i = arr.findIndex((item) => item === index);
      if (i !== -1) {
        arr.splice(i, 1);
      } else {
        arr.push(index);
      }
    },
    selectAll() {
      this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex = [];
      const arr = this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex;
      for (
        let i = 0;
        i < this.currentFile.similarQuotes.length;
        // eslint-disable-next-line no-plusplus
        i++
      ) {
        const element = this.currentFile.similarQuotes[i];
        if (!element.quote) {
          arr.push(i);
        }
      }
    },
    unselectAll() {
      this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex = [];
    },
    importSelectQuotes() {
      this.loading = true;
      const indexArr = this.selectedQuotes.find(
        (item) => item.fileName === this.currentFileName,
      ).quotesIndex;
      const quotes = [];
      const matchBookId = this.currentFile.matchBook._id;
      indexArr.forEach((index) => {
        // const id = `${Date.now()}${index}`;
        const { location, type, chapter } = this.currentFile.notes[index];
        const content_origin = this.currentFile.notes[index].content;
        this.convertor.setContent(content_origin, true);
        const content = this.JSONtemp;
        if (this.currentFile.notes[index].comment) {
          const comment_origin = this.currentFile.notes[index].comment;
          this.convertor.setContent(comment_origin, true);
          const comment = this.JSONtemp;
          quotes.push({
            book: matchBookId,
            chapter,
            type,
            location,
            content_origin,
            content,
            comment_origin,
            comment,
          });
        } else {
          quotes.push({
            book: matchBookId,
            chapter,
            type,
            location,
            content_origin,
            content,
          });
        }
      });
      this.$store
        .dispatch('importQuotes', { quotes, matchBookId })
        .then((data) => {
          this.selectedQuotes.find(
            (item) => item.fileName === this.currentFileName,
          ).quotesIndex = [];
          // refesh
          // const book = this.booksList.find(
          //   (item) => item.metadata.titles[0] === this.currentFile.matchBookTitle
          // );
          // const { metadata } = book;
          this.currentFile.matchBook.quotes.push(...data);
          // refesh similarQuotes
          const matchBookQuotes = this.currentFile.matchBook.quotes;
          const matchBookQuotesSorted = this.SortQuotesByChapter(
            matchBookQuotes,
          );
          const { category } = this.currentFile.matchBook.metadata;
          const categoryFlatten = [];
          flatten(category, categoryFlatten);
          // const delayImportSelectQuotesTimer = setTimeout(() => {
          //   this.setSimilarQuotes(
          //     this.currentFile.notes,
          //     categoryFlatten,
          //     matchBookQuotes,
          //     matchBookQuotesSorted
          //   ).then((similarQuotes) => {
          //     this.currentFile.similarQuotes = similarQuotes;
          //     this.loading = false;
          //   });
          //   clearTimeout(delayImportSelectQuotesTimer);
          // }, 0);
          this.currentFile.similarQuotes = this.setSimilarQuotes(
            this.currentFile.notes,
            categoryFlatten,
            matchBookQuotes,
            matchBookQuotesSorted,
          );
          this.loading = false;
        });
    },
  },
  created() {
    this.convertor = new Editor({
      onUpdate: ({ getJSON }) => {
        this.JSONtemp = getJSON();
      },
    });
  },
  beforeDestroy() {
    this.convertor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.import-quotes-modal-container {
  .modal-body {
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

  .source-files-container {
    .source-files {
      overflow-y: overlay;
      &::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0);
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
      }
    }
    .source-file-name {
      max-width: 8rem;
    }
  }
  .match-book-container {
    .cover {
      &:focus-within {
        &::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(249, 250, 251, 0.8);
        }
        .delete-cover-btn {
          display: block;
        }
      }
    }
  }
  .suggestion-books-modal {
    .suggestion-books-list {
      max-height: 8rem;
      overflow-y: overlay;
      &::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0);
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
      }
    }
  }
}
</style>
