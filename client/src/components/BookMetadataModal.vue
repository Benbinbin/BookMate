<template>
  <div class="bg-gray-500 bg-opacity-50 flex justify-center items-center">
    <div
      class="book-modal-container w-11/12 h-4/5 flex flex-col rounded-lg bg-white"
    >
      <div
        class="book-modal-header px-1 flex justify-between items-center border-b-2 border-gray-100"
      >
        <button
          class="left w-8 h-8 flex items-center rounded-full p-1 text-red-300 opacity-60 hover:opacity-100"
          @click="closeBookModalHandler('cancel')"
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
        <h1 class="font-bold text-sm text-gray-400">编辑元数据</h1>
        <button
          class="right w-8 h-8 flex items-center rounded-full p-1 text-green-500 opacity-60 hover:opacity-100"
          @click="closeBookModalHandler('save')"
        >
          <svg
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
        class="book-modal-body w-full flex-grow flex"
        style="max-height: calc(100% - 34px)"
      >
        <div
          ref="left"
          id="body-left"
          class="flex flex-col rounded-bl-lg bg-gray-50"
        >
          <h2 class="font-bold text-center m-2 text-lg">目录</h2>
          <hr class="w-1/2 mx-auto border-gray-300 mb-4" />
          <div class="m-2 flex justify-between items-center">
            <button
              class="flex-grow flex justify-center p-1 hover:bg-gray-200 rounded"
            >
              <img
                class="w-5 h-5"
                src="@/assets/icons/refresh.svg"
                alt="refresh icon"
                @click="refreshTree"
              />
            </button>
            <button
              class="flex-grow flex justify-center p-1 hover:bg-gray-200 rounded"
              @click="addNewNode('before')"
            >
              <img
                class="w-5 h-5"
                src="@/assets/icons/add-before.svg"
                alt="add before icon"
              />
            </button>
            <button
              class="flex-grow flex justify-center p-1 hover:bg-gray-200 rounded"
              @click="addNewNode('inside')"
            >
              <img
                class="w-5 h-5"
                src="@/assets/icons/add-circle.svg"
                alt="add inside icon"
              />
            </button>
            <button
              class="flex-grow flex justify-center p-1 hover:bg-gray-200 rounded"
              @click="addNewNode('after')"
            >
              <img
                class="w-5 h-5"
                src="@/assets/icons/add-after.svg"
                alt="add after icon"
              />
            </button>
            <button
              class="flex-grow flex justify-center p-1 hover:bg-gray-200 rounded"
            >
              <img
                class="w-5 h-5"
                src="@/assets/icons/delete.svg"
                alt="delete icon"
                @click="deleteNode"
              />
            </button>
          </div>
          <div
            class="tree-container px-2 flex-grow"
            @dblclick="editNode"
            @keydown="treeKeyHandler"
          >
            <TWTree
              ref="tree"
              class="tree"
              :tree="categoryArr"
              :animationDuration="'10ms'"
              :defaultAttrs="attr"
              :multiSelect="true"
              @click="clickNode"
              @move="customDropHandler"
              @keydown="editorKeyHandler"
            >
              <template v-slot:switcher="{ node }">
                <svg
                  v-if="node.hasChild"
                  :class="{ 'rotate-90': node.directoryState === 'expanded' }"
                  class="w-5 h-5 transform"
                  viewBox="0 0 50 50"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.3958 13.9792C19.2027 14.1719 19.0495 14.4009 18.9449 14.6529C18.8404 14.9049 18.7866 15.1751 18.7866 15.4479C18.7866 15.7208 18.8404 15.991 18.9449 16.243C19.0495 16.495 19.2027 16.724 19.3958 16.9167L27.4791 25L19.3958 33.0834C19.0063 33.4729 18.7874 34.0012 18.7874 34.5521C18.7874 35.103 19.0063 35.6313 19.3958 36.0209C19.7854 36.4104 20.3137 36.6292 20.8646 36.6292C21.4155 36.6292 21.9438 36.4104 22.3333 36.0209L31.8958 26.4584C32.089 26.2656 32.2422 26.0367 32.3467 25.7847C32.4513 25.5326 32.5051 25.2625 32.5051 24.9896C32.5051 24.7168 32.4513 24.4466 32.3467 24.1946C32.2422 23.9425 32.089 23.7136 31.8958 23.5209L22.3333 13.9584C21.5417 13.1667 20.2083 13.1667 19.3958 13.9792Z"
                  />
                </svg>
                <svg
                  v-if="!node.hasChild"
                  class="w-5 h-5 inline"
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
              </template>
              <template v-slot:contextmenu="{ node }">
                <div
                  class="flex flex-col rounded border border-gray-300 divide-y-2 divide-gray-300 bg-gray-100 shadow-md text-xs"
                >
                  <button
                    class="p-2 flex justify-center items-center space-x-1 opacity-80 hover:opacity-100"
                    @click="
                      customPasteHandler({ target: node, position: 'before' })
                    "
                  >
                    <img
                      class="w-4 h-4"
                      src="@/assets/icons/add-before.svg"
                      alt="add before icon"
                    />
                    <span>粘贴到该节点前</span>
                  </button>
                  <button
                    class="p-2 flex justify-center items-center space-x-1 opacity-80 hover:opacity-100"
                    @click="
                      customPasteHandler({ target: node, position: 'inside' })
                    "
                  >
                    <img
                      class="w-4 h-4"
                      src="@/assets/icons/add-circle.svg"
                      alt="add inside icon"
                    />
                    <span>粘贴到该节点内</span>
                  </button>
                  <button
                    class="p-2 flex justify-center items-center space-x-1 opacity-80 hover:opacity-100"
                    @click="
                      customPasteHandler({ target: node, position: 'after' })
                    "
                  >
                    <img
                      class="w-4 h-4"
                      src="@/assets/icons/add-after.svg"
                      alt="add after icon"
                    />
                    <span>粘贴到该节点后</span>
                  </button>
                </div>
              </template>
            </TWTree>
          </div>
        </div>
        <div ref="right" id="body-right" class="flex-grow rounded-br-lg">
          <div
            class="content-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max w-full"
          >
            <div class="infomation-left col-span-1 px-8 py-4 space-y-4">
              <div class="book-titles space-y-2">
                <div class="flex items-end relative">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">书名</span>
                  </h2>
                  <button class="tooltip ml-2 flex">
                    <img
                      class="w-5 h-5"
                      src="@/assets/icons/question.svg"
                      alt="question icon"
                    />
                  </button>
                </div>
                <vue-tags-input
                  v-model="title"
                  placeholder="添加书名"
                  :tags="titles"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="(newTitles) => (titles = newTitles)"
                ></vue-tags-input>
              </div>

              <div class="book-authors space-y-2">
                <h2>
                  <span class="highlight pr-2 text-lg font-bold">作者</span>
                </h2>
                <vue-tags-input
                  v-model="author"
                  placeholder="添加作者"
                  :tags="authors"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="(newAuthors) => (authors = newAuthors)"
                >
                  <div slot="tag-left">
                    <svg
                      class="w-5 h-5 mr-0.5 opacity-60"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M41.9189 37.2852C40.9979 35.1034 39.6612 33.1216 37.9834 31.4502C36.3107 29.774 34.3292 28.4375 32.1484 27.5146C32.1289 27.5049 32.1094 27.5 32.0898 27.4902C35.1318 25.293 37.1094 21.7139 37.1094 17.6758C37.1094 10.9863 31.6895 5.56641 25 5.56641C18.3105 5.56641 12.8906 10.9863 12.8906 17.6758C12.8906 21.7139 14.8682 25.293 17.9102 27.4951C17.8906 27.5049 17.8711 27.5098 17.8516 27.5195C15.6641 28.4424 13.7012 29.7656 12.0166 31.4551C10.3404 33.1278 9.00393 35.1092 8.08105 37.29C7.17442 39.4251 6.68546 41.7141 6.64063 44.0332C6.63932 44.0853 6.64846 44.1372 6.66751 44.1857C6.68656 44.2342 6.71512 44.2784 6.75153 44.3158C6.78793 44.3531 6.83143 44.3827 6.87947 44.403C6.92751 44.4232 6.97912 44.4336 7.03125 44.4336H9.96094C10.1758 44.4336 10.3467 44.2627 10.3516 44.0527C10.4492 40.2832 11.9629 36.7529 14.6387 34.0772C17.4072 31.3086 21.084 29.7852 25 29.7852C28.916 29.7852 32.5928 31.3086 35.3613 34.0772C38.0371 36.7529 39.5508 40.2832 39.6484 44.0527C39.6533 44.2676 39.8242 44.4336 40.0391 44.4336H42.9688C43.0209 44.4336 43.0725 44.4232 43.1205 44.403C43.1686 44.3827 43.2121 44.3531 43.2485 44.3158C43.2849 44.2784 43.3134 44.2342 43.3325 44.1857C43.3515 44.1372 43.3607 44.0853 43.3594 44.0332C43.3105 41.6992 42.8271 39.4287 41.9189 37.2852ZM25 26.0742C22.7588 26.0742 20.6494 25.2002 19.0625 23.6133C17.4756 22.0264 16.6016 19.917 16.6016 17.6758C16.6016 15.4346 17.4756 13.3252 19.0625 11.7383C20.6494 10.1514 22.7588 9.27734 25 9.27734C27.2412 9.27734 29.3506 10.1514 30.9375 11.7383C32.5244 13.3252 33.3984 15.4346 33.3984 17.6758C33.3984 19.917 32.5244 22.0264 30.9375 23.6133C29.3506 25.2002 27.2412 26.0742 25 26.0742Z"
                      />
                    </svg>
                  </div>
                </vue-tags-input>
              </div>
              <div class="book-translators space-y-2">
                <h2>
                  <span class="highlight pr-2 text-lg font-bold">译者</span>
                </h2>
                <vue-tags-input
                  v-model="translator"
                  placeholder="添加译者"
                  :tags="translators"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="
                    (newTranslators) => (translators = newTranslators)
                  "
                >
                  <div slot="tag-left">
                    <svg
                      class="w-5 h-5 mr-0.5 opacity-60"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M41.9189 37.2852C40.9979 35.1034 39.6612 33.1216 37.9834 31.4502C36.3107 29.774 34.3292 28.4375 32.1484 27.5146C32.1289 27.5049 32.1094 27.5 32.0898 27.4902C35.1318 25.293 37.1094 21.7139 37.1094 17.6758C37.1094 10.9863 31.6895 5.56641 25 5.56641C18.3105 5.56641 12.8906 10.9863 12.8906 17.6758C12.8906 21.7139 14.8682 25.293 17.9102 27.4951C17.8906 27.5049 17.8711 27.5098 17.8516 27.5195C15.6641 28.4424 13.7012 29.7656 12.0166 31.4551C10.3404 33.1278 9.00393 35.1092 8.08105 37.29C7.17442 39.4251 6.68546 41.7141 6.64063 44.0332C6.63932 44.0853 6.64846 44.1372 6.66751 44.1857C6.68656 44.2342 6.71512 44.2784 6.75153 44.3158C6.78793 44.3531 6.83143 44.3827 6.87947 44.403C6.92751 44.4232 6.97912 44.4336 7.03125 44.4336H9.96094C10.1758 44.4336 10.3467 44.2627 10.3516 44.0527C10.4492 40.2832 11.9629 36.7529 14.6387 34.0772C17.4072 31.3086 21.084 29.7852 25 29.7852C28.916 29.7852 32.5928 31.3086 35.3613 34.0772C38.0371 36.7529 39.5508 40.2832 39.6484 44.0527C39.6533 44.2676 39.8242 44.4336 40.0391 44.4336H42.9688C43.0209 44.4336 43.0725 44.4232 43.1205 44.403C43.1686 44.3827 43.2121 44.3531 43.2485 44.3158C43.2849 44.2784 43.3134 44.2342 43.3325 44.1857C43.3515 44.1372 43.3607 44.0853 43.3594 44.0332C43.3105 41.6992 42.8271 39.4287 41.9189 37.2852ZM25 26.0742C22.7588 26.0742 20.6494 25.2002 19.0625 23.6133C17.4756 22.0264 16.6016 19.917 16.6016 17.6758C16.6016 15.4346 17.4756 13.3252 19.0625 11.7383C20.6494 10.1514 22.7588 9.27734 25 9.27734C27.2412 9.27734 29.3506 10.1514 30.9375 11.7383C32.5244 13.3252 33.3984 15.4346 33.3984 17.6758C33.3984 19.917 32.5244 22.0264 30.9375 23.6133C29.3506 25.2002 27.2412 26.0742 25 26.0742Z"
                      />
                    </svg>
                  </div>
                </vue-tags-input>
              </div>

              <div class="book-collections space-y-2">
                <h2>
                  <span class="highlight pr-2 text-lg font-bold"
                    >自定义收藏夹</span
                  >
                </h2>
                <vue-tags-input
                  v-model="collection"
                  placeholder="添加收藏夹"
                  :tags="collections"
                  :autocomplete-items="suggestionCollections"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="
                    (newCollections) => (collections = newCollections)
                  "
                >
                  <div slot="tag-left">
                    <svg
                      class="w-5 h-5 mr-0.5 opacity-60"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.25 14.5833V35.4166C6.25 36.5217 6.68899 37.5815 7.47039 38.3629C8.25179 39.1443 9.3116 39.5833 10.4167 39.5833H39.5833C40.6884 39.5833 41.7482 39.1443 42.5296 38.3629C43.311 37.5815 43.75 36.5217 43.75 35.4166V18.75C43.75 17.6449 43.311 16.5851 42.5296 15.8037C41.7482 15.0223 40.6884 14.5833 39.5833 14.5833H27.0833L22.9167 10.4166H10.4167C9.3116 10.4166 8.25179 10.8556 7.47039 11.637C6.68899 12.4184 6.25 13.4782 6.25 14.5833V14.5833Z"
                        stroke-width="4.16667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </vue-tags-input>
              </div>
              <div class="book-tags space-y-2">
                <h2>
                  <span class="highlight pr-2 text-lg font-bold"
                    >描叙性标签</span
                  >
                </h2>
                <vue-tags-input
                  v-model="tag"
                  placeholder="添加标签"
                  :tags="tags"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="(newTags) => (tags = newTags)"
                >
                  <div slot="tag-left">
                    <svg
                      class="w-5 h-5 mr-0.5 opacity-60"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.16667 16.6666V33.3333C4.16667 33.8858 4.38616 34.4157 4.77686 34.8064C5.16756 35.1971 5.69747 35.4166 6.25 35.4166H34.625C34.9259 35.4166 35.2233 35.3515 35.4966 35.2256C35.7699 35.0997 36.0127 34.9161 36.2083 34.6875L43.35 26.3541C43.6728 25.9768 43.8501 25.4965 43.8501 25C43.8501 24.5034 43.6728 24.0232 43.35 23.6458L36.2083 15.3125C36.0127 15.0838 35.7699 14.9002 35.4966 14.7743C35.2233 14.6484 34.9259 14.5833 34.625 14.5833H6.25C5.69747 14.5833 5.16756 14.8028 4.77686 15.1935C4.38616 15.5842 4.16667 16.1141 4.16667 16.6666ZM0 16.6666V33.3333C0 34.9909 0.65848 36.5806 1.83058 37.7527C3.00268 38.9248 4.5924 39.5833 6.25 39.5833H34.625C35.5267 39.5833 36.4178 39.3881 37.237 39.0112C38.0562 38.6344 38.7841 38.0847 39.3708 37.4L46.5125 29.0666C47.483 27.934 48.0165 26.4916 48.0165 25C48.0165 23.5084 47.483 22.066 46.5125 20.9333L39.3708 12.6C38.7841 11.9152 38.0562 11.3655 37.237 10.9887C36.4178 10.6118 35.5267 10.4167 34.625 10.4166H6.25C4.5924 10.4166 3.00268 11.0751 1.83058 12.2472C0.65848 13.4193 0 15.009 0 16.6666H0Z"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M31.25 27.0833C31.8025 27.0833 32.3324 26.8638 32.7231 26.4731C33.1138 26.0824 33.3333 25.5525 33.3333 25C33.3333 24.4475 33.1138 23.9176 32.7231 23.5269C32.3324 23.1362 31.8025 22.9167 31.25 22.9167C30.6975 22.9167 30.1676 23.1362 29.7769 23.5269C29.3862 23.9176 29.1667 24.4475 29.1667 25C29.1667 25.5525 29.3862 26.0824 29.7769 26.4731C30.1676 26.8638 30.6975 27.0833 31.25 27.0833ZM31.25 31.25C32.9076 31.25 34.4973 30.5915 35.6694 29.4194C36.8415 28.2473 37.5 26.6576 37.5 25C37.5 23.3424 36.8415 21.7527 35.6694 20.5806C34.4973 19.4085 32.9076 18.75 31.25 18.75C29.5924 18.75 28.0027 19.4085 26.8306 20.5806C25.6585 21.7527 25 23.3424 25 25C25 26.6576 25.6585 28.2473 26.8306 29.4194C28.0027 30.5915 29.5924 31.25 31.25 31.25Z"
                      />
                    </svg>
                  </div>
                </vue-tags-input>
              </div>
              <div class="book-links space-y-2">
                <h2>
                  <span class="highlight pr-2 text-lg font-bold">相关链接</span>
                </h2>
                <vue-tags-input
                  v-model="link"
                  placeholder="添加链接"
                  :tags="links"
                  :add-on-blur="false"
                  :allow-edit-tags="true"
                  @tags-changed="(newLinks) => (links = newLinks)"
                ></vue-tags-input>
              </div>
            </div>

            <div
              class="information-right col-span-1 lg:col-span-2 px-8 py-4 space-y-4"
            >
              <div class="book-covers space-y-2">
                <div class="flex items-end relative">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">封面</span>
                  </h2>
                  <button class="tooltip ml-2 flex">
                    <img
                      class="w-5 h-5"
                      src="@/assets/icons/question.svg"
                      alt="question icon"
                    />
                  </button>
                </div>
                <div class="covers px-2 py-1 flex space-x-2 overflow-x-auto">
                  <draggable
                    v-model="covers"
                    @start="drag = true"
                    @end="drag = false"
                    :animation="200"
                    :disabled="false"
                    :ghostClass="'ghost'"
                  >
                    <transition-group
                      class="flex space-x-2"
                      type="transition"
                      tag="div"
                      :name="!drag ? 'flip-list' : null"
                    >
                      <div
                        v-for="cover of covers"
                        :key="cover"
                        class="cover flex-shrink-0 relative w-24 h-32 bg-center bg-no-repeat bg-contain"
                        :style="{
                          backgroundImage: coverURL(cover),
                        }"
                        tabindex="0"
                      >
                        <button
                          class="delete-cover-btn w-5 h-5 hidden absolute top-1 right-1 z-10 text-red-500 opacity-80 hover:opacity-100"
                          @click="deleteCover(cover)"
                        >
                          <!-- <img
                        src="@/assets/icons/delete.svg"
                        alt="delete cover icon"
                      /> -->
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
                    </transition-group>
                  </draggable>

                  <div
                    class="cover-input-container flex-shrink-0 w-24 h-32 relative flex justify-center items-center bg-gray-100 text-gray-300 hover:bg-gray-200 hover:text-gray-400 rounded transition-all duration-300"
                    :class="{ dropping: isDropping }"
                    @dragover="isDropping = true"
                    @drop="isDropping = false"
                    @dragleave="isDropping = false"
                  >
                    <svg
                      class="w-8 h-8"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M37.5 27.0833H27.0834V37.5C27.0834 38.6458 26.1459 39.5833 25 39.5833C23.8542 39.5833 22.9167 38.6458 22.9167 37.5V27.0833H12.5C11.3542 27.0833 10.4167 26.1458 10.4167 25C10.4167 23.8541 11.3542 22.9166 12.5 22.9166H22.9167V12.5C22.9167 11.3541 23.8542 10.4166 25 10.4166C26.1459 10.4166 27.0834 11.3541 27.0834 12.5V22.9166H37.5C38.6459 22.9166 39.5834 23.8541 39.5834 25C39.5834 26.1458 38.6459 27.0833 37.5 27.0833Z"
                      />
                    </svg>
                    <input
                      ref="covers"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      type="file"
                      multiple
                      accept="image/*"
                      @change="inputCovers"
                    />
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-6">
                <div class="book-isbn space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">ISBN</span>
                  </h2>
                  <div class="px-2 py-1">
                    <input
                      class="w-full px-2 py-0.5 border text-sm rounded"
                      type="number"
                      v-model="isbn"
                      placeholder="输入 ISBN 码"
                    />
                  </div>
                </div>
                <div class="book-press space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">出版社</span>
                  </h2>
                  <div class="px-2 py-1">
                    <input
                      class="w-full px-2 py-0.5 border text-sm rounded"
                      type="text"
                      v-model="press"
                      placeholder="输入出版社"
                    />
                  </div>
                </div>
                <div class="book-date space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold"
                      >出版日期</span
                    >
                  </h2>
                  <div class="px-2 py-1">
                    <input
                      class="w-full px-2 py-0.5 border text-sm rounded"
                      type="date"
                      v-model="date"
                    />
                  </div>
                </div>
                <div class="book-stars space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">评分</span>
                  </h2>
                  <star-rating
                    class="px-2"
                    :rating="metadata.stars"
                    :star-size="15"
                    :show-rating="false"
                    :active-color="'rgba(243, 238, 102, 1)'"
                    :inactive-color="'#E5E7EB'"
                    :clearable="true"
                    @rating-selected="setStars"
                  >
                  </star-rating>
                </div>
                <div class="book-defaultCollections space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold"
                      >默认收藏夹</span
                    >
                  </h2>
                  <div class="px-2 py-1 space-x-1">
                    <button
                      v-for="item of defaultCollections"
                      :key="item.name"
                      :title="item.name"
                      class="w-8 h-8 p-1 border border-gray-300 rounded"
                      @click="toggleDefaultCollections(item.name)"
                    >
                      <img
                        :class="{
                          'opacity-60': item.active,
                          'opacity-10': !item.active,
                        }"
                        :src="require(`@/assets/icons/${item.name}.svg`)"
                        :alt="`${item.icon} icon`"
                      />
                    </button>
                  </div>
                </div>
                <div></div>
                <div class="book-description space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">简介</span>
                  </h2>
                  <div class="px-2 py-1">
                    <textarea
                      ref="description"
                      class="w-full overflow-y-hidden p-2 border text-sm rounded"
                      name="description"
                      id="description"
                      rows="1"
                      v-model="description"
                      placeholder="输入简介"
                    ></textarea>
                  </div>
                </div>
                <div class="book-review space-y-2">
                  <h2>
                    <span class="highlight pr-2 text-lg font-bold">短评</span>
                  </h2>
                  <div class="px-2 py-1">
                    <textarea
                      ref="review"
                      class="w-full overflow-y-hidden p-2 border text-sm rounded"
                      name="review"
                      id="review"
                      rows="1"
                      v-model="review"
                      placeholder="输入短评"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer class="mt-8 mb-4 items-center">
            <hr class="mx-auto w-1/2" />
            <div class="flex justify-center items-center">
              <button
                @click="backToTopHandler('right')"
                class="text-blue-400 font-bold text-sm my-4"
              >
                返回顶部
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Split from 'split.js';
import { VueTagsInput, createTags } from '@johmun/vue-tags-input';
import draggable from 'vuedraggable';
import StarRating from 'vue-star-rating';
import TWTree from 'twtree';
import { mapGetters } from 'vuex';

function getText(arr) {
  const tempArr = [];
  arr.forEach((item) => {
    tempArr.push(item.text);
  });
  return tempArr;
}

/* eslint-disable no-param-reassign */
function setTreeData(node) {
  if (node && Array.isArray(node)) {
    node.forEach((item) => {
      setTreeData(item);
    });
  } else if (node && node.children) {
    node.id = node.name;
    node.title = node.name;
    node.hasChild = true;
    setTreeData(node.children);
  } else if (node) {
    node.id = node.name;
    node.title = node.name;
  }
}

function getCategoryData(node) {
  let name = node.title || 'node';
  if (name === '根节点') name = '__root__';
  if (node.children && node.children.length > 0) {
    const children = [];
    node.children.forEach((item) => {
      children.push(getCategoryData(item));
    });
    return { name, children };
  }
  return { name };
}
/* eslint-enable no-param-reassign */

export default {
  props: ['metadata'],
  components: {
    VueTagsInput,
    draggable,
    StarRating,
    TWTree,
  },
  data() {
    return {
      isDropping: false,
      title: '',
      titles: createTags(this.metadata.titles) || [],
      author: '',
      authors: createTags(this.metadata.authors) || [],
      translator: '',
      translators: createTags(this.metadata.translators) || [],
      defaultCollections: [],
      collection: '',
      collections: createTags(this.metadata.collections) || [],
      tag: '',
      tags: createTags(this.metadata.tags) || [],
      sources: createTags(this.metadata.sources) || [],
      link: '',
      links: createTags(this.metadata.links) || [],
      isbn: this.metadata.isbn,
      press: this.metadata.press,
      date: this.metadata.date || new Date(),
      description: this.metadata.description || '',
      review: this.metadata.review || '',
      stars: this.metadata.stars || 0,
      files: [],
      coversTemp: [],
      covers: [],
      drag: false,
      categoryArr: [],
      tree: null,
      attr: {
        style: {
          showIcon: false,
          switcherMarginRight: '0',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          titleMaxWidth: '100%',
          hoverBgColor: '#EFF6FF',
          selectedBgColor: '#BFDBFE',
        },
      },
      moveManual: true,
      nodeEdting: false,
      selectNodes: [],
      titleTemp: '',
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
    closeBookModalHandler(type) {
      if (type === 'save') {
        const removeCovers = [];
        const addCovers = [];
        this.metadata.covers.forEach((item) => {
          if (!this.covers.includes(item)) removeCovers.push(item);
        });
        this.covers.forEach((cover) => {
          const target = this.files.find((item) => item.name === cover);
          if (target) addCovers.push(target);
        });

        const titles = getText(this.titles);
        const authors = getText(this.authors);
        const translators = getText(this.translators);
        const collections = getText(this.collections);
        const tags = getText(this.tags);
        const sources = getText(this.sources);
        const links = getText(this.links);

        // const categoryTree = this.tree.getNestedTree();
        const category = getCategoryData(this.tree.getNestedTree()[0]);

        const payload = {
          removeCovers,
          addCovers,
          metadata: {
            titles,
            authors,
            translators,
            covers: this.covers,
            defaultCollections: this.defaultCollections,
            collections,
            tags,
            sources,
            links,
            press: this.press,
            isbn: this.isbn,
            date: this.data,
            description: this.description,
            review: this.review,
            category,
            createdDate: this.metadata.createdDate,
            stars: this.stars,
          },
        };
        // console.log(payload);
        this.$store.dispatch('saveMetadata', payload);
      }
      this.$emit('close-book-modal');
    },
    backToTopHandler(target) {
      this.$refs[target].scrollTop = 0;
    },
    async inputCovers() {
      // set name as id of each file and push them to array this.files
      const temp = [];
      const filesArr = this.$refs.covers.files;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < filesArr.length; i++) {
        const file = filesArr[i];
        const fileName = `${
          this.titles[0].text || 'book'
        }_${Date.now()}${Math.floor(Math.random() * 100)}.${
          file.name.split('.')[1]
        }`;
        const originName = file.name.split('.')[0];

        this.files.push({
          originName,
          name: fileName,
          file,
        });

        temp.push(this.readImg(originName, fileName, file));
      }

      const arr = await Promise.all(temp);
      this.coversTemp.push(...arr);
      arr.forEach((item) => {
        this.covers.push(item.name);
      });
    },
    readImg(originName, name, file) {
      // async read each file data and push them to array this.filesTemp
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          resolve({
            originName,
            name,
            data: event.target.result,
          });
        };
      });
    },
    coverURL(cover) {
      if (this.metadata.covers.includes(cover)) {
        return `url(covers/${cover})`;
      }
      const index = this.coversTemp.findIndex((item) => item.name === cover);
      return `url(${this.coversTemp[index].data})`;
    },
    deleteCover(cover) {
      const index = this.covers.findIndex((item) => item === cover);
      this.covers.splice(index, 1);
    },
    textareaResize(target) {
      const dom = this.$refs[target];
      dom.style.height = 'auto';
      dom.style.height = `${dom.scrollHeight}px`;
    },
    toggleDefaultCollections(val) {
      const index = this.defaultCollections.findIndex(
        (item) => item.name === val,
      );
      const item = this.defaultCollections[index];
      this.$set(this.defaultCollections, index, {
        name: item.name,
        active: !item.active,
      });
    },
    setStars(stars) {
      this.stars = stars;
    },
    refreshTree() {
      this.tree.reload();
      this.nodeEdting = false;
      this.titleTemp = '';
      const root = this.tree.getById('__root__');
      this.tree.setTitle(root, '根节点');
    },
    addNewNode(position) {
      if (this.nodeEdting) return false;
      const id = Date.now();
      const title = '';
      this.titleTemp = title;
      this.nodeEdting = true;
      const rootNode = this.tree.getById('__root__');

      if (this.tree.getSelected().length === 0) {
        this.tree.createAndEdit({ title, id }, rootNode);
      } else if (this.tree.getSelected().length === 1) {
        const targetNode = this.tree.getSelected()[0];
        this.tree.deselect(targetNode);
        if (targetNode.id === '__root__') {
          // eslint-disable-next-line no-param-reassign
          position = 'inside';
        }
        // eslint-disable-next-line no-underscore-dangle
        const parentNode = targetNode.__.parent;
        // eslint-disable-next-line no-underscore-dangle
        let { pos } = targetNode.__;

        switch (position) {
          case 'inside':
            this.tree.createAndEdit({ title, id }, targetNode);
            break;
          case 'before':
            // pos -= 1;
            if (pos < 0) pos = 0;
            this.tree.createAndEdit({ title, id }, parentNode, pos);
            break;
          default:
            pos += 1;
            this.tree.createAndEdit({ title, id }, parentNode, pos);
            break;
        }
      }

      const newNode = this.tree.getById(id);
      this.tree.select(newNode);
      return id;
    },
    deleteNode() {
      const nodes = this.tree.getSelected();
      nodes.forEach((item) => {
        if (item.id === '__root__') return;
        this.tree.remove(item);
      });

      this.nodeEdting = false;
      this.titleTemp = '';
    },
    clickNode(node, event) {
      if (!event.ctrlKey && this.tree.getSelected().length) {
        while (this.tree.getSelected().length > 0) {
          const selectNode = this.tree.getSelected()[0];
          this.tree.deselect(selectNode);
        }
      }
    },
    customDropHandler(node, fromParent, fromPos, toParent, toPos) {
      this.tree.select(node);

      if (this.tree.getSelected().length > 1) {
        const nodes = this.tree.getSelected();
        if (nodes.includes(toParent)) return;

        let pos = toPos || 0;
        nodes.forEach((item) => {
          // eslint-disable-next-line no-underscore-dangle
          if (item.__.parent === toParent && item.__.pos < toPos) {
            pos -= 1;
          }
        });
        if (pos < 0) pos = 0;

        nodes.forEach((item) => {
          this.tree.remove(item);
        });
        nodes.forEach((item) => {
          this.tree.create(item, toParent, pos);
          pos += 1;
        });
      }
    },
    editNode(event) {
      if (!this.nodeEdting && this.tree.getSelected().length === 1) {
        const node = this.tree.getSelected()[0];
        this.tree.edit(node);
        this.titleTemp = node.title;
        this.nodeEdting = true;
      }
    },
    editorKeyHandler(node, event) {
      if (event.key === 'Escape') {
        this.tree.setTitle(node, this.titleTemp);
        this.tree.quitEdit(node);
        if (this.titleTemp === '') {
          this.$nextTick(() => {
            this.tree.remove(node);
          });
        }
        this.nodeEdting = false;
        this.titleTemp = '';
      } else if (event.key === 'Enter') {
        this.tree.quitEdit(node);
        this.nodeEdting = false;
        this.titleTemp = '';
      }
    },
    treeKeyHandler(event) {
      if (!this.nodeEdting) {
        //  remove selected nodes
        if (event.key === 'Delete') {
          this.deleteNode();
        } else if (
          event.key === 'Enter'
          && this.tree.getSelected().length === 1
        ) {
          this.addNewNode('after');
        } else if (
          event.key === 'Tab'
          && this.tree.getSelected().length === 1
        ) {
          const id = this.addNewNode('inside');
          const newNode = this.tree.getById(id);
          const timer = setTimeout(() => {
            this.tree.focus(newNode);
            clearTimeout(timer);
          }, 0);
        }
      }
    },
    async customPasteHandler({ target, position }) {
      try {
        const text = await navigator.clipboard.readText();
        const arr = text.split('\n');
        // eslint-disable-next-line no-underscore-dangle
        const parentNode = target.__.parent;
        // eslint-disable-next-line no-underscore-dangle
        let { pos } = target.__;

        if (target.id === '__root__') {
          // eslint-disable-next-line no-param-reassign
          position = 'inside';
        }

        switch (position) {
          case 'before':
            if (pos < 0) pos = 0;
            arr.forEach((title) => {
              this.tree.create({ title }, parentNode, pos);
              pos += 1;
            });
            break;
          case 'inside':
            arr.forEach((title) => {
              this.tree.create({ title }, target);
            });
            break;
          default:
            pos += 1;
            arr.forEach((title) => {
              this.tree.create({ title }, parentNode, pos);
              pos += 1;
            });
        }
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    },
  },
  mounted() {
    Split(['#body-left', '#body-right'], {
      sizes: [20, 80],
      minSize: 100,
      expandToMin: true,
      gutterSize: 5,
      snapOffset: 0,
      onDragEnd: () => {
        this.textareaResize('description');
        this.textareaResize('review');
      },
    });
    this.textareaResize('description');
    this.textareaResize('review');

    const { description } = this.$refs;
    const { review } = this.$refs;
    description.addEventListener('input', () => {
      this.textareaResize('description');
    });
    review.addEventListener('input', () => {
      this.textareaResize('review');
    });

    let timer = null;
    window.onresize = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.textareaResize('description');
        this.textareaResize('review');
      }, 300);
    };

    this.tree = this.$refs.tree;
    const root = this.tree.getById('__root__');
    this.tree.setTitle(root, '根节点');
  },
  created() {
    this.defaultCollections = JSON.parse(
      JSON.stringify(this.metadata.defaultCollections),
    ) || [
      {
        name: 'like',
        active: false,
      },
      {
        name: 'reading',
        active: false,
      },
      {
        name: 'read-it-later',
        active: false,
      },
      {
        name: 'buy',
        active: false,
      },
    ];
    this.covers = [...this.metadata.covers];
    const categoryClone = JSON.parse(JSON.stringify(this.metadata.category));
    setTreeData(categoryClone);
    this.categoryArr = [categoryClone];
  },
};
</script>

<style lang="scss" scoped>
.book-modal-body {
  #body-left {
    .tree-container {
      overflow: overlay;

      &::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0);
      }
      &:hover::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.5);
      }
    }
  }
  #body-right {
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

  .tooltip {
    &:hover::after {
      content: "第一个元素显示在页面上";
      position: absolute;
      bottom: 0;
      left: 4.3rem;
      z-index: 999;
      margin-left: 0.25rem;
      font-size: 0.75rem;
      line-height: 1rem;
      background: #e5e7eb;
      padding: 0.125rem 0.25rem 0.125rem 0.25rem;
      border-radius: 0.25rem;
      opacity: 70%;
    }
  }

  .covers {
    .dropping {
      background: #e5e7eb;
      color: #9ca3af;
    }
    .cover {
      &:hover {
        cursor: grab;
      }
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

  .book-description,
  .book-review {
    textarea {
      resize: none;
    }
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
</style>

<style lang="scss">
.book-modal-body {
  .ti-input {
    overflow-x: overlay;
    border: none;
  }
  .ti-tags {
    .ti-tag {
      width: fit-content;
      padding: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      border-radius: 0.25rem;
      background: #f3f4f6;
      color: black;
      &:hover {
        background: #e5e7eb;
      }
      .ti-tag-left {
        flex-shrink: 0;
      }
    }
    .ti-deletion-mark {
      background: #fca5a5;
      color: white;
    }
    .ti-new-tag-input-wrapper {
      width: 100%;
      input {
        border-bottom: 1.5px solid #d1d5db;
        &:focus {
          border-bottom: 1.5px solid #000000;
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

  .book-titles {
    .ti-tags {
      flex-direction: column;
    }
  }

  .flip-list-move {
    transition: transform 300ms;
  }

  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0;
  }
}
</style>
