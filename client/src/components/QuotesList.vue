<template>
  <div class="max-w-full flex-grow flex flex-col relative">
    <nav class="flex-shrink-0 h-16 px-6 relative border-b-2 border-gray-100">
      <div
        v-if="!quoteEditing"
        class="default w-full h-full flex justify-between items-center"
      >
        <button
          v-show="!showPinQuotes"
          class="flex items-center p-1 hover:bg-gray-100 opacity-30 hover:opacity-100 rounded-md"
          title="新增书摘"
          :disabled="quoteEditing || showPinQuotes"
          @click="addNewQuote('whole_book_new')"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/add.svg"
            alt="add quote icon"
          />
        </button>
        <button
          v-show="showPinQuotes"
          class="flex items-center p-1 text-blue-500 bg-blue-100 rounded-md hover:text-red-400 hover:bg-red-100"
          title="新增书摘"
          :disabled="quoteEditing"
          @click="$store.dispatch('showPinQuotes')"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.9167 24.7917V35.4167C22.9167 35.9692 23.1362 36.4991 23.5269 36.8898C23.9176 37.2805 24.4475 37.5 25 37.5C25.5525 37.5 26.0824 37.2805 26.4731 36.8898C26.8638 36.4991 27.0833 35.9692 27.0833 35.4167V24.7917C29.6126 24.2754 31.86 22.8384 33.39 20.7592C34.9199 18.68 35.6234 16.1069 35.3639 13.5385C35.1045 10.9702 33.9006 8.58967 31.9857 6.8585C30.0709 5.12732 27.5814 4.16882 25 4.16882C22.4186 4.16882 19.9291 5.12732 18.0143 6.8585C16.0994 8.58967 14.8955 10.9702 14.6361 13.5385C14.3766 16.1069 15.0801 18.68 16.61 20.7592C18.1399 22.8384 20.3874 24.2754 22.9167 24.7917ZM25 8.33336C26.2361 8.33336 27.4445 8.69992 28.4723 9.38668C29.5001 10.0734 30.3012 11.0496 30.7742 12.1916C31.2473 13.3336 31.3711 14.5903 31.1299 15.8027C30.8888 17.0151 30.2935 18.1287 29.4194 19.0028C28.5453 19.8769 27.4317 20.4721 26.2193 20.7133C25.0069 20.9544 23.7503 20.8307 22.6082 20.3576C21.4662 19.8846 20.4901 19.0835 19.8033 18.0557C19.1166 17.0279 18.75 15.8195 18.75 14.5834C18.75 12.9258 19.4085 11.336 20.5806 10.1639C21.7527 8.99184 23.3424 8.33336 25 8.33336ZM33.7708 30.0417C33.4972 29.9842 33.215 29.9812 32.9403 30.0329C32.6655 30.0845 32.4036 30.1897 32.1696 30.3425C31.9355 30.4954 31.7338 30.6928 31.576 30.9236C31.4182 31.1544 31.3075 31.4139 31.25 31.6875C31.1925 31.9611 31.1895 32.2433 31.2412 32.5181C31.2928 32.7928 31.398 33.0547 31.5508 33.2888C31.7037 33.5229 31.9011 33.7246 32.1319 33.8824C32.3627 34.0401 32.6222 34.1509 32.8958 34.2084C37.625 35.1459 39.5833 36.8334 39.5833 37.5C39.5833 38.7084 34.4792 41.6667 25 41.6667C15.5208 41.6667 10.4167 38.7084 10.4167 37.5C10.4167 36.8334 12.375 35.1459 17.1042 34.125C17.3778 34.0676 17.6373 33.9568 17.8681 33.799C18.0989 33.6412 18.2963 33.4396 18.4492 33.2055C18.602 32.9714 18.7072 32.7095 18.7588 32.4348C18.8105 32.16 18.8075 31.8778 18.75 31.6042C18.6925 31.3306 18.5818 31.071 18.424 30.8402C18.2662 30.6095 18.0645 30.412 17.8304 30.2592C17.5964 30.1064 17.3345 30.0011 17.0597 29.9495C16.785 29.8979 16.5028 29.9009 16.2292 29.9584C9.89583 31.4167 6.25 34.1459 6.25 37.5C6.25 42.9792 15.6875 45.8334 25 45.8334C34.3125 45.8334 43.75 42.9792 43.75 37.5C43.75 34.1459 40.1042 31.4167 33.7708 30.0417Z"
            />
          </svg>
        </button>
        <h2 class="text-xl font-bold">
          <span v-show="showPinQuotes" class="mx-1 text-blue-500">Pin</span>书摘
        </h2>
        <button
          v-show="!showMoreModal"
          class="flex items-center p-1 hover:bg-gray-100 opacity-30 hover:opacity-100 rounded-md"
          title="更多选项"
          @click="showMoreModal = !showMoreModal"
        >
          <img class="w-6 h-6" src="@/assets/icons/menu.svg" alt="menu icon" />
        </button>
        <button
          v-show="showMoreModal"
          class="flex items-center p-1 hover:bg-gray-100 opacity-100 rounded-md"
          @click="showMoreModal = !showMoreModal"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/close-circle.svg"
            alt="menu icon"
          />
        </button>
      </div>
      <!-- <quote-editor-menu
        v-if="quoteEditing"
        :editor="editor"
        :commentEditor="commentEditor"
        @inactive-editor="inactiveEditor"
      ></quote-editor-menu> -->
      <div
        v-if="quoteEditing"
        class="default w-full h-full flex justify-between items-center"
      >
        <button
          class="flex items-center justify-center bg-red-500 opacity-30 hover:opacity-100 text-white p-1.5 rounded"
          @click="inactiveEditor('cancel')"
        >
          <svg
            class="w-6 h-6"
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
        <button
          class="flex items-center justify-center hover:bg-gray-200 p-1.5 rounded"
          @click="focusTarget"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/target.svg"
            alt="target icon"
          />
        </button>
        <button
          class="flex items-center justify-center bg-green-500 opacity-60 hover:opacity-100 text-white p-1.5 rounded"
          @click="inactiveEditor('save')"
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
      <div
        v-show="showMoreModal"
        class="more-modal p-4 absolute top-12 right-6 z-10 flex flex-col rounded bg-gray-100 shadow-md"
      >
        <div v-show="showPinQuotes" class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight"
              >分享 Pin<span class="mx-1 text-blue-500">{{
                pinQuotesSet.size
              }}</span
              >篇书摘</span
            >
          </h3>
          <div class="flex space-x-3 justify-start">
            <!-- <button
              v-for="app of importAppList"
              :key="app.name"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              @click="showImportQuotesModalHandler(app.name)"
            >
              <img
                class="w-10"
                :src="`apps/${app.img}`"
                :alt="`${app.name} logo`"
              />
            </button> -->

            <button
              v-for="item of shareAppList"
              :key="item.name"
              :title="item.name"
              :disabled="pinQuotesSet.size === 0"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              :class="{ 'opacity-10': pinQuotesSet.size === 0 }"
              @click="
                $store.dispatch('toggleSharePinQuotes', item.name);
              "
            >
              <img
                class="w-10"
                :src="`apps/${item.img}`"
                :alt="`${item.name} icon`"
              />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">批量导入书摘</span>
          </h3>
          <div class="flex space-x-3 justify-start">
            <button
              v-for="app of importAppList"
              :key="app.name"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              @click="showImportQuotesModalHandler(app.name)"
            >
              <img
                class="w-10"
                :src="`apps/${app.img}`"
                :alt="`${app.name} logo`"
              />
            </button>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">书摘展示模式</span>
          </h3>
          <div class="flex flex-col space-y-1">
            <div>
              <input
                type="checkbox"
                name="sort-by-chapter"
                id="sort-by-chapter"
                v-model="classifyByChapter"
              />
              <label
                for="sort-by-chapter"
                class="ml-2"
                style="user-select: none"
                >按章节分类书摘</label
              >
            </div>
            <div>
              <input
                type="checkbox"
                name="side-by-side"
                id="side-by-side"
                v-model="sideBySide"
              />
              <label for="side-by-side" class="ml-2" style="user-select: none"
                >并列排布</label
              >
              <input
                class="w-11 text-sm mx-1 pl-1 border-2 rounded-md"
                type="number"
                name="cols"
                v-model="cols"
                min="1"
                max="5"
                @input="colsInputHandler"
              />
              <span>篇书摘</span>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">书摘排序方式</span>
          </h3>
          <div class="flex items-stretch space-x-6">
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-by-location"
                  name="sort-by-location"
                  value="location"
                  v-model="sortBy"
                />
                <label class="ml-2" for="sort-by-location">按页码顺序</label>
              </div>
              <div class="flex items-center">
                <input
                  type="radio"
                  id="sort-by-updated-date"
                  name="sort-by-updated-date"
                  value="updated_date"
                  v-model="sortBy"
                />
                <label class="ml-2" for="sort-by-updated-date"
                  >按更新时间</label
                >
              </div>
            </div>
            <div class="space-x-2">
              <button
                class="w-12 h-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                :class="{ 'bg-gray-300': rank === 'ascending' }"
                @click="rank = 'ascending'"
              >
                <img
                  class="mx-auto"
                  src="@/assets/icons/sort-ascend.svg"
                  alt="sort ascending icon"
                />
              </button>
              <button
                class="w-12 h-full p-2 bg-gray-200 hover:bg-gray-300 rounded"
                :class="{ 'bg-gray-300': rank === 'descending' }"
                @click="rank = 'descending'"
              >
                <img
                  class="mx-auto"
                  src="@/assets/icons/sort-descend.svg"
                  alt="sort descending icon"
                />
              </button>
            </div>
          </div>
          <!-- <div class="flex mt-2 items-center">
            <input
              type="radio"
              id="sort-by-custom"
              name="sort-by-custom"
              value="custom"
              v-model="sortBy"
            />
            <label class="ml-2" for="sort-by-custom"
              >自定义排序<span class="text-xs">（可拖拽实现重排）</span></label
            >
          </div> -->
        </div>
        <div class="mb-4">
          <h3 class="font-bold my-4">
            <span class="highlight">分享书摘设置</span>
          </h3>
          <div class="flex space-x-2 mt-2">
            <button
              v-for="app of shareAppList"
              :key="app.name"
              :title="app.name"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded"
              @click="showShareSettingModalHandler(app.name)"
            >
              <img
                class="w-10"
                :src="`apps/${app.img}`"
                :alt="`${app.name} logo`"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div
      ref="quotesList"
      class="flex-grow quotes-list px-3 py-6 h-full relative"
    >
      <div
        v-if="newQuote && newQuote._id === 'whole_book_new'"
        class="quote-card-container"
      >
        <quote-card
          ref="whole_book_new"
          :category="category"
          :quote="newQuote"
          :quote-chapter.sync="quoteChapter"
          :quote-location.sync="quoteLocation"
          :quote-type="quoteType"
          :editor="editor"
          :commentEditor="commentEditor"
          @inactive-editor="inactiveEditor"
        >
        </quote-card>
      </div>
      <div
        v-if="quotes.length > 0 && quotesListMode === 'default'"
        class="quotes space-y-3"
        :class="gridLayout"
      >
        <div
          v-for="quote of quotesRendered"
          :key="quote._id"
          class="quote-card-container"
        >
          <quote-card
            v-show="
              !showPinQuotes || (showPinQuotes && pinQuotesSet.has(quote._id))
            "
            :ref="quote._id"
            :category="category"
            :quote="quote"
            :quote-chapter.sync="quoteChapter"
            :quote-location.sync="quoteLocation"
            :quote-type="quoteType"
            :editor="editor"
            :commentEditor="commentEditor"
            @active-editor="activeEditor(quote)"
            @inactive-editor="inactiveEditor"
            @share-quotes-as-image="shareQuotesHandler(quote, 'image')"
            @share-quotes-as-markdown="shareQuotesHandler(quote, 'markdown')"
            @share-quotes-as-json="shareQuotesHandler([quote], 'json')"
          >
          </quote-card>
        </div>
      </div>
      <div v-if="quotes.length > 0 && quotesListMode === 'chapter'">
        <section
          v-for="item of quotesClassifyByChapter"
          :key="item.name"
          :ref="item.name"
        >
          <div class="chapter py-3 flex justify-between">
            <div class="flex items-center">
              <button
                class="flex justify-center items-center hover:bg-gray-200 p-1 rounded"
                :class="{
                  'opacity-50': !quoteEditing && !showPinQuotes,
                  'opacity-10': quoteEditing || showPinQuotes,
                }"
                :disabled="quoteEditing || showPinQuotes"
                @click="addNewQuote(`${item.name}_new`, item.name)"
              >
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-5 h-5"
                />
              </button>
              <span class="text-gray-500">{{
                item.name !== "未分类(NoChapter)" ? item.name : "未分类"
              }}</span>
            </div>
            <div class="flex-shrink-0 flex items-center space-x-0.5">
              <button
                class="flex justify-center items-center hover:bg-gray-100 p-1 rounded"
                :class="{
                  'text-blue-500': chapterPinState(item.quotes),
                  'text-gray-500': !chapterPinState(item.quotes),
                }"
                @click="chapterPinHandler(item.quotes)"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.9167 24.7917V35.4167C22.9167 35.9692 23.1362 36.4991 23.5269 36.8898C23.9176 37.2805 24.4475 37.5 25 37.5C25.5525 37.5 26.0824 37.2805 26.4731 36.8898C26.8638 36.4991 27.0833 35.9692 27.0833 35.4167V24.7917C29.6126 24.2754 31.86 22.8384 33.39 20.7592C34.9199 18.68 35.6234 16.1069 35.3639 13.5385C35.1045 10.9702 33.9006 8.58967 31.9857 6.8585C30.0709 5.12732 27.5814 4.16882 25 4.16882C22.4186 4.16882 19.9291 5.12732 18.0143 6.8585C16.0994 8.58967 14.8955 10.9702 14.6361 13.5385C14.3766 16.1069 15.0801 18.68 16.61 20.7592C18.1399 22.8384 20.3874 24.2754 22.9167 24.7917ZM25 8.33336C26.2361 8.33336 27.4445 8.69992 28.4723 9.38668C29.5001 10.0734 30.3012 11.0496 30.7742 12.1916C31.2473 13.3336 31.3711 14.5903 31.1299 15.8027C30.8888 17.0151 30.2935 18.1287 29.4194 19.0028C28.5453 19.8769 27.4317 20.4721 26.2193 20.7133C25.0069 20.9544 23.7503 20.8307 22.6082 20.3576C21.4662 19.8846 20.4901 19.0835 19.8033 18.0557C19.1166 17.0279 18.75 15.8195 18.75 14.5834C18.75 12.9258 19.4085 11.336 20.5806 10.1639C21.7527 8.99184 23.3424 8.33336 25 8.33336ZM33.7708 30.0417C33.4972 29.9842 33.215 29.9812 32.9403 30.0329C32.6655 30.0845 32.4036 30.1897 32.1696 30.3425C31.9355 30.4954 31.7338 30.6928 31.576 30.9236C31.4182 31.1544 31.3075 31.4139 31.25 31.6875C31.1925 31.9611 31.1895 32.2433 31.2412 32.5181C31.2928 32.7928 31.398 33.0547 31.5508 33.2888C31.7037 33.5229 31.9011 33.7246 32.1319 33.8824C32.3627 34.0401 32.6222 34.1509 32.8958 34.2084C37.625 35.1459 39.5833 36.8334 39.5833 37.5C39.5833 38.7084 34.4792 41.6667 25 41.6667C15.5208 41.6667 10.4167 38.7084 10.4167 37.5C10.4167 36.8334 12.375 35.1459 17.1042 34.125C17.3778 34.0676 17.6373 33.9568 17.8681 33.799C18.0989 33.6412 18.2963 33.4396 18.4492 33.2055C18.602 32.9714 18.7072 32.7095 18.7588 32.4348C18.8105 32.16 18.8075 31.8778 18.75 31.6042C18.6925 31.3306 18.5818 31.071 18.424 30.8402C18.2662 30.6095 18.0645 30.412 17.8304 30.2592C17.5964 30.1064 17.3345 30.0011 17.0597 29.9495C16.785 29.8979 16.5028 29.9009 16.2292 29.9584C9.89583 31.4167 6.25 34.1459 6.25 37.5C6.25 42.9792 15.6875 45.8334 25 45.8334C34.3125 45.8334 43.75 42.9792 43.75 37.5C43.75 34.1459 40.1042 31.4167 33.7708 30.0417Z"
                  />
                </svg>
              </button>
              <button
                class="flex justify-center items-center hover:bg-gray-200 p-1 rounded"
                :class="{
                  'text-blue-500': !hiddenQuotes.includes(item.name),
                  'text-gray-500': hiddenQuotes.includes(item.name),
                }"
                @click="toggleQuotes(item.name)"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.6667 8.33329C16.1142 8.33329 15.5842 8.55279 15.1935 8.94349C14.8028 9.33419 14.5834 9.86409 14.5834 10.4166V41.6666L20.7875 36.0062C21.9389 34.9557 23.4414 34.3733 25 34.3733C26.5587 34.3733 28.0611 34.9557 29.2125 36.0062L35.4167 41.6666V10.4166C35.4167 9.86409 35.1972 9.33419 34.8065 8.94349C34.4158 8.55279 33.8859 8.33329 33.3334 8.33329H16.6667ZM16.6667 4.16663H33.3334C34.991 4.16663 36.5807 4.82511 37.7528 5.99721C38.9249 7.16931 39.5834 8.75902 39.5834 10.4166V41.6666C39.5832 42.4744 39.3482 43.2647 38.907 43.9413C38.4658 44.618 37.8375 45.1518 37.0985 45.4778C36.3594 45.8039 35.5415 45.9081 34.7444 45.7777C33.9472 45.6474 33.2051 45.2881 32.6084 44.7437L26.4042 39.0833C26.0204 38.7331 25.5196 38.539 25 38.539C24.4805 38.539 23.9797 38.7331 23.5959 39.0833L17.3917 44.7437C16.795 45.2881 16.0529 45.6474 15.2557 45.7777C14.4585 45.9081 13.6406 45.8039 12.9016 45.4778C12.1625 45.1518 11.5342 44.618 11.093 43.9413C10.6519 43.2647 10.4169 42.4744 10.4167 41.6666V10.4166C10.4167 8.75902 11.0752 7.16931 12.2473 5.99721C13.4194 4.82511 15.0091 4.16663 16.6667 4.16663Z"
                  />
                </svg>
                <!-- <span>{{ item.quotes.length }}</span> -->
              </button>
            </div>
          </div>
          <div
            v-show="!hiddenQuotes.includes(item.name)"
            class="quotes"
            :class="gridLayout"
          >
            <div
              v-if="newQuote && newQuote._id === `${item.name}_new`"
              class="quote-card-container"
            >
              <quote-card
                class="h-auto"
                :ref="`${item.name}_new`"
                :category="category"
                :quote="newQuote"
                :quote-chapter.sync="quoteChapter"
                :quote-location.sync="quoteLocation"
                :quote-type="quoteType"
                :editor="editor"
                :commentEditor="commentEditor"
                @inactive-editor="inactiveEditor"
              >
              </quote-card>
            </div>
            <div
              v-for="quote of item.quotes"
              :key="quote._id"
              class="quote-card-container"
            >
              <quote-card
                v-show="
                  !showPinQuotes ||
                  (showPinQuotes && pinQuotesSet.has(quote._id))
                "
                :ref="quote._id"
                :category="category"
                :quote="quote"
                :quote-chapter.sync="quoteChapter"
                :quote-location.sync="quoteLocation"
                :quote-type="quoteType"
                :editor="editor"
                :commentEditor="commentEditor"
                @active-editor="activeEditor(quote)"
                @inactive-editor="inactiveEditor"
                @share-quotes-as-image="shareQuotesHandler(quote, 'image')"
                @share-quotes-as-markdown="
                  shareQuotesHandler(quote, 'markdown')
                "
                @share-quotes-as-json="shareQuotesHandler([quote], 'json')"
              >
              </quote-card>
            </div>
          </div>
          <hr class="mx-auto my-8 border-gray-300 w-1/2" />
        </section>
      </div>
      <footer class="my-12 items-center">
        <div class="flex justify-center items-center">
          <button
            @click="backToTopHandler"
            class="hover:bg-gray-300 text-gray-300 hover:text-white p-3 rounded-md font-bold my-4"
          >
            返回顶部
          </button>
        </div>
      </footer>
    </div>
    <import-quotes-modal
      v-if="book && book.metadata && showImportQuotesModal"
      class="fixed w-screen h-screen inset-0"
      :book-id="book._id"
      :import-quotes-init-tab="importQuotesInitTab"
      @close-import-quotes-modal="closeImportQuoteModelHandler"
    ></import-quotes-modal>
    <share-quotes-setting-modal
      v-if="showShareQuotesSettingModal"
      class="fixed w-screen h-screen inset-0 z-20"
      :share-quotes-init-tab="shareQuotesInitTab"
      @close-share-quotes-setting-modal="showShareQuotesSettingModal = false"
    ></share-quotes-setting-modal>
    <div
      v-show="shareQuotesComponent === 'quotes-to-image'"
      class="share-quotes-container w-screen h-screen fixed inset-0 bg-gray-500 bg-opacity-50"
      :class="{ 'flex justify-center items-center': shareQuoteContent }"
    >
      <component
        :style="shareQuotesStyle"
        v-if="shareQuotesComponent"
        :is="shareQuotesComponent"
        ref="shareDom"
        :quote="shareQuoteContent"
        :quotes="shareQuotesContent"
        :cover="shareQuotesCover"
        :title="shareQuotesTitle"
        :authors="shareQuotesAuthors"
        :translators="shareQuotesTranslators"
        :isbn="shareQuotesIsbn"
      ></component>

      <div
        class="btns w-full pl-2 py-2 fixed top-0 right-2 z-10 flex justify-center space-x-4"
      >
        <button
          v-if="shareQuotesComponent === 'quotes-to-image'"
          class="download-btn h-12 p-10 focus:outline-none flex justify-center items-center bg-green-500 bg-opacity-80 hover:bg-opacity-100 rounded-lg"
          @click="downloadShareQuotesAsImageHandler('save')"
        >
          <p class="text-xl font-bold text-gray-100">点击下载</p>
        </button>
        <button
          v-if="shareQuotesComponent === 'quotes-to-image'"
          class="download-btn h-12 p-10 focus:outline-none flex justify-center items-center bg-red-500 bg-opacity-80 hover:bg-opacity-100 rounded-lg"
          @click="downloadShareQuotesAsImageHandler('cancel')"
        >
          <p class="text-xl font-bold text-gray-100">点击取消</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { Editor } from 'tiptap';
import {
  Bold,
  Blockquote,
  BulletList,
  Code,
  CodeBlockHighlight,
  Italic,
  // Link,
  ListItem,
  OrderedList,
  Heading,
  TodoItem,
  TodoList,
  // Image,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';
import hljs from 'highlight.js';
import Link from '@/assets/js/plugins/Link';
import QuoteImage from '@/assets/js/plugins/QuoteImage';
import MathInline from '@/assets/js/plugins/MathInline';
import MathInlineShow from '@/assets/js/plugins/MathInlineShow';
import MathBlock from '@/assets/js/plugins/MathBlock';
import MathBlockShow from '@/assets/js/plugins/MathBlockShow';

import * as htmlToImage from 'html-to-image';
import TurndownService from 'turndown';
import { saveAs } from 'file-saver';
import QuoteCard from './QuoteCard.vue';
// import QuoteEditorMenu from './editor/QuoteEditorMenu.vue';
// import QuoteEditorFloatingMenu from "./editor/QuoteEditorFloatingMenu.vue";

import QuotesToImage from './share/QuotesToImage.vue';
import QuotesToMarkdown from './share/QuotesToMarkdown.vue';

// modal
import ImportQuotesModal from './modal/ImportQuotesModal.vue';
import ShareQuotesSettingModal from './modal/ShareQuotesSettingModal.vue';
// import ShareQuotesAsImageModal from "./modal/ShareQuotesAsImageModal.vue";

const importQuotesAppsMap = {
  kindle: 'kindle-notes-parse',
  duokan: 'duokan-notes-parse',
  douban: 'douban-notes-parse',
  douban_reading: 'douban-reading-notes-parse',
  wechat_reading: 'wechat-reading-notes-parse',
};

const shareQuotesAppsMap = {
  image: 'share-quotes-as-image-setting',
  markdown: 'share-quotes-as-markdown-setting',
  json: 'share-quotes-as-json-setting',
  html: 'share-quotes-as-html-setting',
  word: 'share-quotes-as-word-setting',
};

export default {
  props: ['category', 'quotes', 'quotesChapters'],
  components: {
    // Treeselect,
    // EditorContent,
    QuoteCard,
    // QuoteEditorMenu,
    // QuoteEditorFloatingMenu,
    ImportQuotesModal,
    ShareQuotesSettingModal,
    // ShareQuotesAsImageModal,
    QuotesToImage,
    QuotesToMarkdown,
  },
  data() {
    return {
      coverBase: process.env.VUE_APP_COVER_BASE,
      imageBase: process.env.VUE_APP_QUOTE_IMAGES_BASE,
      showMoreModal: false,
      importAppList: [
        {
          name: 'kindle',
          img: 'kindle.png',
        },
        // {
        //   name: 'duokan',
        //   img: 'duokan.png',
        // },
        // {
        //   name: 'douban',
        //   img: 'douban.png',
        // },
        // {
        //   name: 'douban_reading',
        //   img: 'douban_reading.png',
        // },
        // {
        //   name: 'wechat_reading',
        //   img: 'wechat_reading.png',
        // },
      ],
      importQuotesInitTab: 'kindle-notes-parse',
      showImportQuotesModal: false,
      classifyByChapter: false,
      sideBySide: false,
      cols: 2,
      sortBy: 'location',
      rank: 'ascending',
      selectQuotes: [],
      shareAppList: [
        {
          name: 'image',
          img: 'image.png',
        },
        {
          name: 'markdown',
          img: 'markdown.png',
        },
        {
          name: 'json',
          img: 'json.png',
        },
        // {
        //   name: 'html',
        //   img: 'html.png',
        // },
        // {
        //   name: 'word',
        //   img: 'word.png',
        // },
      ],
      shareQuotesInitTab: 'share-quote-as-image',
      showShareQuotesSettingModal: false,
      // showShareQuotesAsImageModal: false,
      shareQuoteContent: undefined,
      shareQuotesContent: [],
      shareQuotesTitle: '',
      shareQuotesCover: '',
      shareQuotesAuthors: [],
      shareQuotesTranslators: [],
      shareQuotesIsbn: undefined,
      shareQuotesComponent: '',
      hiddenQuotes: [],
      HTMLtemp: null,
      JSONtemp: null,
      commentJSONtemp: null,
      quoteChapter: '',
      quoteLocation: 0,
      quoteType: 'annotation',
      newQuote: null,
      convertor: null,
      editor: null,
      commentEditor: null,
      showTypesModal: false,
      types: ['annotation', 'question', 'deep-reading', 'inspiration'],
    };
  },
  computed: {
    ...mapState({
      quotesListMode: (state) => state.quotesListMode,
      currentQuotesChapter: (state) => state.currentQuotesChapter,
      book: (state) => state.book.book,
      quoteEditing: (state) => state.quote.quoteEditing,
      editingQuote: (state) => state.quote.editingQuote,
      addingCommentQuote: (state) => state.quote.addingCommentQuote,
      showShareQuotesSetting: (state) => state.share.showShareQuotesSetting,
      pinQuotesSet: (state) => state.pin.pinQuotesSet,
      pinQuotesSetTracker: (state) => state.pin.pinQuotesSetTracker,
      showPinQuotes: (state) => state.pin.showPinQuotes,
      sharePinQuotes: (state) => state.pin.sharePinQuotes,
      sharePinQuotesFormat: (state) => state.pin.sharePinQuotesFormat,
    }),
    quotesRendered() {
      const quotesRendered = [];
      const regexp = /<img([^>]*)\ssrc="([^">]+)"\s([^>]*)\sdata-type="uploaded"([^>]*)>/gi;
      this.quotes.forEach((quote) => {
        const quoteTemp = { ...quote };
        const content = this.convert(quote.content, true);
        quoteTemp.content = content.replace(
          regexp,
          (match, p1, p2, p3, p4) => `<img${p1} src="${this.imageBase}${p2}" ${p3} data-type="uploaded" ${p4}>`,
        );
        if (quote.comment) {
          const comment = this.convert(quote.comment, true);
          quoteTemp.comment = comment.replace(
            regexp,
            (match, p1, p2, p3, p4) => `<img${p1} src="${this.imageBase}${p2}" ${p3} data-type="uploaded" ${p4}>`,
          );
        }
        quotesRendered.push(quoteTemp);
      });

      if (this.quotesListMode === 'default') {
        if (this.rank === 'ascending') {
          quotesRendered.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(a[this.sortBy]) - new Date(b[this.sortBy]);
            }
            return a[this.sortBy] - b[this.sortBy];
          });
        } else if (this.rank === 'descending') {
          quotesRendered.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(b[this.sortBy]) - new Date(a[this.sortBy]);
            }
            return b[this.sortBy] - a[this.sortBy];
          });
        }
      }
      return quotesRendered;
    },
    quotesClassifyByChapter() {
      const chaptersContainer = [];
      this.quotesChapters.forEach((chapter) => {
        chaptersContainer.push({
          name: chapter,
          quotes: [],
        });
      });
      chaptersContainer.push({
        name: '未分类(NoChapter)',
        quotes: [],
      });
      this.quotesRendered.forEach((quote) => {
        const index = chaptersContainer.findIndex(
          (item) => item.name === quote.chapter,
        );

        if (index !== -1) {
          chaptersContainer[index].quotes.push(quote);
        } else {
          chaptersContainer[chaptersContainer.length - 1].quotes.push(quote);
        }
      });

      chaptersContainer.forEach((item) => {
        if (this.rank === 'ascending') {
          item.quotes.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(a[this.sortBy]) - new Date(b[this.sortBy]);
            }
            return a[this.sortBy] - b[this.sortBy];
          });
        } else if (this.rank === 'descending') {
          item.quotes.sort((a, b) => {
            if (this.sortBy === 'updated_date') {
              return new Date(b[this.sortBy]) - new Date(a[this.sortBy]);
            }
            return b[this.sortBy] - a[this.sortBy];
          });
        }
      });
      return chaptersContainer;
    },
    gridLayout() {
      if (this.sideBySide) {
        return `grid gap-x-2 gap-y-3 grid-cols-${this.cols}`;
      }
      return 'space-y-3';
    },
    shareQuotesStyle() {
      if (this.shareQuotesContent.length > 0) {
        return 'padding: 10rem; margin: auto; width: fit-content';
      }
      return '';
    },
  },
  watch: {
    classifyByChapter() {
      if (this.classifyByChapter) {
        this.$store.dispatch('changeDisplayMode', {
          type: 'quotes',
          mode: 'chapter',
        });
      } else {
        this.$store.dispatch('changeDisplayMode', {
          type: 'quotes',
          mode: 'default',
        });
      }
      this.$nextTick(() => {
        hljs.highlightAll();
      });
    },
    currentQuotesChapter() {
      if (
        this.quotesListMode === 'chapter'
        && this.currentQuotesChapter !== null
      ) {
        const top = this.$refs[this.currentQuotesChapter][0].offsetTop;
        this.$refs.quotesList.scrollTop = top - 6 * 14;
      }
    },
    addingCommentQuote() {
      if (this.addingCommentQuote) {
        this.commentEditor.focus();
      }
    },
    pinQuotesSetTracker() {
      this.$forceUpdate();
    },
    sharePinQuotes() {
      if (this.sharePinQuotes) {
        const quotesSortByChapter = [];
        this.quotesChapters.forEach((chapter) => {
          quotesSortByChapter.push({
            chapter,
            quotes: [],
          });
        });
        quotesSortByChapter.push({
          chapter: '未分类',
          quotes: [],
        });

        const quotes = [];

        [...this.pinQuotesSet].forEach((id) => {
          const target = this.quotesRendered.find((item) => item._id === id);
          quotes.push(target);
          if (
            this.sharePinQuotesFormat === 'image'
            || this.sharePinQuotesFormat === 'markdown'
          ) {
            const index = quotesSortByChapter.findIndex(
              (item) => item.chapter === target.chapter,
            );
            if (index !== -1) {
              quotesSortByChapter[index].quotes.push(target);
            } else {
              quotesSortByChapter[quotesSortByChapter.length - 1].quotes.push(
                target,
              );
            }
          }
        });
        quotesSortByChapter.forEach((item) => {
          if (item.quotes.length > 1) {
            item.quotes.sort((a, b) => a.location - b.location);
          }
        });

        if (this.sharePinQuotesFormat === 'image') {
          this.shareQuotesHandler(quotesSortByChapter, 'image');
        } else if (this.sharePinQuotesFormat === 'markdown') {
          this.shareQuotesHandler(quotesSortByChapter, 'markdown');
        } else if (this.sharePinQuotesFormat === 'json') {
          this.shareQuotesHandler(quotes, 'json');
        }
      }
      this.$store.dispatch('toggleSharePinQuotes');
    },
  },
  methods: {
    getQuotes() {
      const { id } = this.$route.params;
      this.$store.dispatch('getBook', { id }).then((book) => {
        if (book.quote_ids.length > 0) {
          this.$store.dispatch('getQuotes', { book_id: id }).then((quotes) => {
            this.$store.dispatch('setQuotes', quotes);
            this.$nextTick(() => {
              hljs.highlightAll();
            });
          });
        }
      });
    },
    colsInputHandler() {
      if (this.cols > 5) {
        this.cols = 5;
      }
    },
    showImportQuotesModalHandler(val) {
      this.importQuotesInitTab = importQuotesAppsMap[val];
      this.showImportQuotesModal = true;
      this.showMoreModal = false;
    },
    closeImportQuoteModelHandler() {
      this.showImportQuotesModal = false;
      this.getQuotes();
    },
    showShareSettingModalHandler(val) {
      this.shareQuotesInitTab = shareQuotesAppsMap[val];
      this.showShareQuotesSettingModal = true;
      this.showMoreModal = false;
    },
    chapterPinState(quotes) {
      const ids = [];
      quotes.forEach((quote) => {
        ids.push(quote._id);
      });
      const arr = [...this.pinQuotesSet];
      const unionSet = new Set([...arr, ...ids]);
      return unionSet.size === this.pinQuotesSet.size;
    },
    chapterPinHandler(quotes) {
      const ids = [];
      quotes.forEach((quote) => {
        ids.push(quote._id);
      });
      // console.log(ids);
      this.$store.dispatch('setPinQuotes', ids);
      this.$forceUpdate();
    },
    clearShareContent() {
      this.shareQuoteContent = undefined;
      this.shareQuotesContent = [];
      this.shareQuotesTitle = '';
      this.shareQuotesCover = '';
      this.shareQuotesAuthors = [];
      this.shareQuotesTranslators = [];
      this.shareQuotesIsbn = undefined;
      this.shareQuotesComponent = '';
    },
    shareQuotesHandler(quotes, format) {
      const title = this.book.metadata.titles[0];
      this.shareQuotesTitle = title;

      if (this.book.metadata.covers.length > 0) this.shareQuotesCover = `${this.coverBase}${this.book.metadata.covers[0]}`;

      if (this.book.metadata.authors.length > 0) this.shareQuotesAuthors = this.book.metadata.authors;

      if (this.book.metadata.translators.length > 0) this.shareQuotesTranslators = this.book.metadata.translators;

      if (this.book.metadata.isbn) this.shareQuotesIsbn = this.book.metadata.isbn;

      if (quotes instanceof Array) {
        this.shareQuotesContent = quotes;
      } else {
        this.shareQuoteContent = quotes;
      }

      if (format === 'image' || format === 'markdown') {
        this.shareQuotesComponent = `quotes-to-${format}`;

        this.$nextTick(() => {
          const dom = this.$refs.shareDom.$el;

          if (format === 'markdown') {
            const turndownService = new TurndownService({
              headingStyle: 'atx',
              codeBlockStyle: 'fenced',
              fence: '```',
              emDelimiter: '*',
            });
            turndownService.remove((node) => node.classList.contains('katex-render'));
            TurndownService.prototype.escape = (string) => string;
            const markdownContent = turndownService.turndown(dom);
            // console.log(markdownContent);
            const blob = new Blob([markdownContent], {
              type: 'text/plain;charset=utf-8',
            });
            saveAs(blob, `《${title}》书摘.md`);
            this.clearShareContent();
          }
        });
      } else if (format === 'json') {
        const quotesArr = [];
        const show = JSON.parse(localStorage.getItem('shareQuotesAsJsonShow'));

        quotes.forEach((quote) => {
          const quoteTemp = { ...quote };
          // show book title
          if (show.title) quoteTemp.title = title;
          // quote conent
          quoteTemp.content = this.quotes.find(
            (item) => item._id === quote._id,
          ).content;
          if (show.content_rendered) quoteTemp.content_rendered = quote.content;
          // quote comment
          if (quote.comment) {
            quoteTemp.comment = this.quotes.find(
              (item) => item._id === quote._id,
            ).comment;
          }
          if (
            quote.comment
            && quote.comment !== '<p></p>'
            && show.comment_rendered
          ) {
            quoteTemp.comment_rendered = quote.comment;
          }
          quotesArr.push(quoteTemp);
        });
        const blob = new Blob([JSON.stringify(quotesArr, null, 2)], {
          type: 'application/json',
        });
        saveAs(blob, `《${title}》书摘.json`);
        this.clearShareContent();
      }
    },
    downloadShareQuotesAsImageHandler(val) {
      if (val === 'save') {
        const title = this.book.metadata.titles[0];
        const dom = this.$refs.shareDom.$el;
        const scale = 1.5;
        const style = {
          transform: `scale(${scale})`,
          'transform-origin': 'top left',
          width: `${dom.offsetWidth}px`,
          height: `${dom.offsetHeight}px`,
        };
        const param = {
          height: dom.offsetHeight * scale,
          width: dom.offsetWidth * scale,
          style,
        };
        htmlToImage
          .toPng(dom, param)
          .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = `《${title || 'book'}》书摘.png`;
            link.href = dataUrl;
            link.click();
            // clear share content
            this.clearShareContent();
          })
          .catch((error) => {
            console.error('oops, something went wrong!', error);
          });
      } else if (val === 'cancel') {
        this.clearShareContent();
      }
    },
    backToTopHandler() {
      this.$refs.quotesList.scrollTop = 0;
    },
    toggleQuotes(val) {
      const index = this.hiddenQuotes.indexOf(val);
      if (index !== -1) {
        this.hiddenQuotes.splice(index, 1);
      } else {
        this.hiddenQuotes.push(val);
      }
    },
    convert(content) {
      // use tiptap editor getHTML() render HTML from JSON content
      this.convertor.setContent(content, true);
      const tempContent = this.HTMLtemp;
      this.HTMLtemp = null;

      return tempContent;
    },
    changeMode(mode) {
      this.$store.dispatch('changeDisplayMode', { type: 'quotes', mode });
    },
    addNewQuote(newID, newChapter = '') {
      if (!newChapter || newChapter === '未分类(NoChapter)') {
        this.newQuote = {
          _id: newID,
          chapter: '',
          content: null,
          location: 0,
          type: 'annotation',
        };
      } else {
        this.newQuote = {
          _id: newID,
          chapter: newChapter,
          content: null,
          location: 0,
          type: 'annotation',
        };
      }

      this.activeEditor(this.newQuote);
    },
    activeEditor(quote) {
      if (this.editingQuote) return;
      const target = this.quotes.find((item) => item._id === quote._id);

      if (quote.chapter) this.quoteChapter = quote.chapter;
      if (quote.location) this.quoteLocation = quote.location;
      this.quoteType = quote.type;
      this.editor.setContent(target ? target.content : quote.content, true);
      if (quote.comment) {
        this.commentEditor.setContent(
          target ? target.comment : quote.content,
          true,
        );
      }
      this.$store.dispatch('setEditingQuote', quote._id);
      this.$store.dispatch('toggleQuoteEditing');

      this.$nextTick(() => {
        if (this.editingQuote === 'whole_book_new') {
          this.$refs[this.editingQuote].$el.focus();
        } else if (
          /new$/.test(this.editingQuote)
          && this.editingQuote !== 'whole_book_new'
        ) {
          this.$refs[this.editingQuote][0].$el.focus();
        }

        if (this.addingCommentQuote) {
          this.commentEditor.focus();
        } else {
          this.editor.focus();
        }

        // the tiptap mounted the Vue component as view twice
        // so add addition state to mark the real editing state
        const delayTimer = setTimeout(() => {
          this.$store.dispatch('toggleQuoteEditingState');
          clearTimeout(delayTimer);
        }, 0);
      });
    },

    focusTarget() {
      // console.log(this.$refs[this.editingQuote]);
      if (this.editingQuote === 'whole_book_new') {
        this.$refs[this.editingQuote].$el.focus();
      } else {
        this.$refs[this.editingQuote][0].$el.focus();
      }

      // this.editor.focus();
    },
    async inactiveEditor(type) {
      this.$store.dispatch('toggleQuoteEditing');
      this.$store.dispatch('toggleQuoteEditingState');

      await this.$store.dispatch('saveQuoteImagesChange');

      let target = this.editingQuote;
      if (type === 'cancel') {
        this.$store.dispatch('cancelQuoteEditing');
        this.$store.dispatch('changeQuoteImagesSrc');
        if (!/new$/.test(target)) {
          // focus the editing quote
          this.$nextTick(() => {
            this.$refs[target][0].$el.focus();
            hljs.highlightAll();
          });
        }
      } else if (type === 'save') {
        this.$store
          .dispatch('saveQuoteEditing', {
            id: this.editingQuote,
            book: this.book._id,
            chapter: this.quoteChapter,
            location: this.quoteLocation,
            content: this.JSONtemp,
            comment: this.commentJSONtemp,
            type: this.quoteType,
          })
          .then((quotes) => {
            if (/new$/.test(this.editingQuote)) this.$store.dispatch('addQuotes', quotes);
            this.$store.dispatch('changeQuoteImagesSrc');
            return quotes[0]._id;
          })
          .then((id) => {
            target = id;
            // focus the editing quote
            this.$nextTick(() => {
              this.$refs[target][0].$el.focus();
              hljs.highlightAll();
            });
          });
      }
      this.editor.clearContent();
      this.commentEditor.clearContent();
      this.JSONtemp = null;
      this.commentJSONtemp = null;
      this.quoteChapter = '';
      this.quoteLocation = 0;
      this.newQuote = null;
    },
  },
  created() {
    this.classifyByChapter = this.quotesListMode === 'chapter';
    this.convertor = new Editor({
      extensions: [
        new Bold(),
        new Blockquote(),
        new BulletList(),
        new Code(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            markdown,
          },
        }),
        new Italic(),
        new Link(),
        new ListItem(),
        new OrderedList(),
        new Heading({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        new TodoItem(),
        new TodoList(),
        new QuoteImage(),
        new MathInlineShow(),
        new MathBlockShow(),
      ],
      onUpdate: ({ getHTML }) => {
        this.HTMLtemp = getHTML();
      },
    });
    this.editor = new Editor({
      dropCursor: {
        color: 'rgba(252, 211, 77, 50%)',
        width: 5,
      },
      extensions: [
        new Bold(),
        new Blockquote(),
        new BulletList(),
        new Code(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            markdown,
          },
        }),
        new Italic(),
        new Link(),
        new ListItem(),
        new OrderedList(),
        new Heading({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        new TodoItem(),
        new TodoList(),
        new QuoteImage(),
        new MathInline(),
        new MathBlock(),
      ],
      onUpdate: ({ getJSON }) => {
        this.JSONtemp = getJSON();
      },
    });
    this.commentEditor = new Editor({
      dropCursor: {
        color: 'rgba(252, 211, 77, 50%)',
        width: 5,
      },
      extensions: [
        new Bold(),
        new Blockquote(),
        new BulletList(),
        new Code(),
        new CodeBlockHighlight({
          languages: {
            javascript,
            css,
            xml,
            markdown,
          },
        }),
        new Italic(),
        new Link(),
        new ListItem(),
        new OrderedList(),
        new Heading({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        new TodoItem(),
        new TodoList(),
        new QuoteImage(),
        new MathInline(),
        new MathBlock(),
      ],
      onUpdate: ({ getJSON }) => {
        this.commentJSONtemp = getJSON();
      },
    });
  },
  beforeDestroy() {
    this.convertor.destroy();
    this.editor.destroy();
    this.commentEditor.destroy();
  },
};
</script>

<style lang="scss" scoped>
.highlight {
  text-decoration: none;
  box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 0.8);
  color: inherit;
}

.quotes-list {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.more-modal {
  max-height: 90vh;
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.share-quotes-container {
  overflow: auto;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(31, 41, 55, 0.6);
  }
}

// .menubar {
//   .is-active {
//     background: #e5e7eb;
//   }
// }

#quote-location {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 0 0 10px;
  &:focus {
    outline: none;
  }
}

// .share-quotes-container {
//   &:hover {
//     .download-btn {
//       display: flex;
//     }
//   }
// }
</style>

<style lang="scss">
.quote-editor-container,
.comment-editor-container {
  position: relative;
}

.vue-treeselect__control {
  height: 100%;
  .vue-treeselect__placeholder,
  .vue-treeselect__single-value {
    font-size: 0.75rem;
    line-height: 1rem;
  }
}
</style>
