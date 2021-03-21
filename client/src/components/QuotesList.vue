<template>
  <div class="flex-grow flex flex-col">
    <nav class="flex-shrink-0 h-16 px-6 border-b-2 border-gray-20">
      <div
        v-if="!editingQuote"
        class="default w-full h-full flex items-center justify-center"
      >
        <h2 class="text-xl font-bold">书摘</h2>
      </div>
      <editor-menu-bar
        v-if="editingQuote"
        :editor="editor"
        v-slot="{ commands, isActive }"
      >
        <div class="menubar w-full h-full flex items-center space-x-2">
          <button
            class="flex-grow flex items-center justify-center text-red-200 hover:bg-red-200 hover:text-white p-1.5 rounded"
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
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1.5 rounded"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/paragraph.svg"
              alt="paragraph icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/code.svg"
              alt="code icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/bold.svg"
              alt="bold icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/italic.svg"
              alt="italic icon"
            />
          </button>
          <button
            class="flex-grow flex items-center justify-center bg-green-500 text-white p-1.5 rounded"
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
      </editor-menu-bar>
    </nav>
    <div
      ref="quotesList"
      class="flex-grow quotes-list px-3 py-6 h-full"
      v-if="quotes.length > 0"
    >
      <div v-if="quotesListMode === 'default'" class="quotes space-y-3">
        <quote-card
          v-for="quote of item.quotes"
          :key="quote.id"
          :ref="quote.id"
          :quote="quote"
          @active-editor="activeEditor(quote)"
          @inactive-editor="inactiveEditor"
        >
          <template
            v-slot:body
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="editor card-body mx-8">
              <editor-floating-menu
                :editor="editor"
                v-slot="{ commands, isActive, menu }"
              >
                <div
                  class="floating-menubar flex items-center ml-2 space-x-0.5"
                  :class="{ 'is-active': menu.isActive }"
                  :style="`top: ${menu.top}px`"
                >
                  <div class="headings-container flex items-center relative">
                    <button
                      class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                      :class="{
                        'is-active':
                          isActive.heading() || showEditorHeadingsModal,
                      }"
                      @click="
                        showEditorHeadingsModal = !showEditorHeadingsModal
                      "
                    >
                      <img
                        src="@/assets/icons/editor/header.svg"
                        alt="header icon"
                      />
                    </button>

                    <div
                      class="modal-container absolute top-7 left-1 z-20"
                      v-show="showEditorHeadingsModal"
                    >
                      <div
                        class="modal flex space-x-1 rounded bg-gray-100 shadow-md"
                      >
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 1 }),
                          }"
                          @click="markHeading(1)"
                        >
                          <img
                            src="@/assets/icons/editor/h1.svg"
                            alt="heading 1 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 2 }),
                          }"
                          @click="markHeading(2)"
                        >
                          <img
                            src="@/assets/icons/editor/h2.svg"
                            alt="heading 2 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 3 }),
                          }"
                          @click="markHeading(3)"
                        >
                          <img
                            src="@/assets/icons/editor/h3.svg"
                            alt="heading 3 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 4 }),
                          }"
                          @click="markHeading(4)"
                        >
                          <img
                            src="@/assets/icons/editor/h4.svg"
                            alt="heading 4 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 5 }),
                          }"
                          @click="markHeading(5)"
                        >
                          <img
                            src="@/assets/icons/editor/h5.svg"
                            alt="heading 5 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 6 }),
                          }"
                          @click="markHeading(6)"
                        >
                          <img
                            src="@/assets/icons/editor/h6.svg"
                            alt="heading 6 icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <img
                      src="@/assets/icons/editor/unordered-list.svg"
                      alt="unordered list icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <img
                      src="@/assets/icons/editor/ordered-list.svg"
                      alt="ordered list icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <img
                      src="@/assets/icons/editor/codeblock.svg"
                      alt="codeblock icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                  >
                    <img src="@/assets/icons/quote.svg" alt="codeblock icon" />
                  </button>
                </div>
              </editor-floating-menu>
              <editor-content :editor="editor"></editor-content>
            </div>
          </template>
          <template
            v-slot:location
            v-if="editingQuote && quote.id === editingQuote"
          >
            <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                  >章节：</label
                >
                <treeselect
                  class="w-4/5 z-10"
                  v-model="quoteChapter"
                  placeholder="请选择章节"
                  :multiple="false"
                  :options="category"
                  :normalizer="categoryNormalizer"
                  :searchable="true"
                  :flatten-search-results="true"
                  :close-on-select="true"
                  :default-expand-level="1"
                />
              </div>
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-location">
                  页码：</label
                >
                <input
                  class="w-4/5"
                  id="quote-location"
                  type="number"
                  v-model="quoteLocation"
                  placeholder="请输入页码"
                />
              </div>
            </div>
          </template>
          <template
            v-slot:comment
            v-if="
              (quote.id === editingQuote &&
                quote.comment &&
                quote.comment !== '<p></p>') ||
              quote.id === quoteAddingComment
            "
          >
            <div
              class="editor quote-comment px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
            >
              <editor-floating-menu
                :editor="commentEditor"
                v-slot="{ commands, isActive, menu }"
              >
                <div
                  class="floating-menubar flex items-center ml-2 space-x-0.5"
                  :class="{ 'is-active': menu.isActive }"
                  :style="`top: ${menu.top}px`"
                >
                  <div class="headings-container flex items-center relative">
                    <button
                      class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                      :class="{
                        'is-active':
                          isActive.heading() || showcommentEditorHeadingsModal,
                      }"
                      @click="
                        showcommentEditorHeadingsModal = !showcommentEditorHeadingsModal
                      "
                    >
                      <img
                        src="@/assets/icons/editor/header.svg"
                        alt="header icon"
                      />
                    </button>

                    <div
                      class="modal-container absolute top-7 left-1 z-20"
                      v-show="showcommentEditorHeadingsModal"
                    >
                      <div
                        class="modal flex space-x-1 rounded bg-gray-100 shadow-md"
                      >
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 1 }),
                          }"
                          @click="markCommentHeading(1)"
                        >
                          <img
                            src="@/assets/icons/editor/h1.svg"
                            alt="heading 1 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 2 }),
                          }"
                          @click="markCommentHeading(2)"
                        >
                          <img
                            src="@/assets/icons/editor/h2.svg"
                            alt="heading 2 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 3 }),
                          }"
                          @click="markCommentHeading(3)"
                        >
                          <img
                            src="@/assets/icons/editor/h3.svg"
                            alt="heading 3 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 4 }),
                          }"
                          @click="markCommentHeading(4)"
                        >
                          <img
                            src="@/assets/icons/editor/h4.svg"
                            alt="heading 4 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 5 }),
                          }"
                          @click="markCommentHeading(5)"
                        >
                          <img
                            src="@/assets/icons/editor/h5.svg"
                            alt="heading 5 icon"
                          />
                        </button>
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active': isActive.heading({ level: 6 }),
                          }"
                          @click="markCommentHeading(6)"
                        >
                          <img
                            src="@/assets/icons/editor/h6.svg"
                            alt="heading 6 icon"
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.bullet_list() }"
                    @click="commands.bullet_list"
                  >
                    <img
                      src="@/assets/icons/editor/unordered-list.svg"
                      alt="unordered list icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.ordered_list() }"
                    @click="commands.ordered_list"
                  >
                    <img
                      src="@/assets/icons/editor/ordered-list.svg"
                      alt="ordered list icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.code_block() }"
                    @click="commands.code_block"
                  >
                    <img
                      src="@/assets/icons/editor/codeblock.svg"
                      alt="codeblock icon"
                    />
                  </button>
                  <button
                    class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                    :class="{ 'is-active': isActive.blockquote() }"
                    @click="commands.blockquote"
                  >
                    <img src="@/assets/icons/quote.svg" alt="codeblock icon" />
                  </button>
                </div>
              </editor-floating-menu>
              <editor-content :editor="commentEditor"></editor-content>
            </div>
          </template>
        </quote-card>
      </div>
      <div v-if="quotesListMode === 'chapter'">
        <section v-for="item of quotesSorted" :key="item.name" :ref="item.name">
          <div class="chapter py-3 flex justify-between opacity-50">
            <div class="flex items-center">
              <button>
                <img
                  src="@/assets/icons/add-circle.svg"
                  alt="add icon"
                  class="flex-shrink-0 w-6 h-6"
                />
              </button>
              <span>{{
                item.name !== "未分类(NoChapter)" ? item.name : "未分类"
              }}</span>
            </div>
            <button
              class="flex items-center"
              :class="{
                'text-blue-500': !hiddenQuotes.includes(item.name),
                'text-black': hiddenQuotes.includes(item.name),
              }"
              @click="toggleQuotes(item.name)"
            >
              <svg
                class="w-6 h-6"
                viewBox="0 0 50 50"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 8.33329C16.1142 8.33329 15.5842 8.55279 15.1935 8.94349C14.8028 9.33419 14.5834 9.86409 14.5834 10.4166V41.6666L20.7875 36.0062C21.9389 34.9557 23.4414 34.3733 25 34.3733C26.5587 34.3733 28.0611 34.9557 29.2125 36.0062L35.4167 41.6666V10.4166C35.4167 9.86409 35.1972 9.33419 34.8065 8.94349C34.4158 8.55279 33.8859 8.33329 33.3334 8.33329H16.6667ZM16.6667 4.16663H33.3334C34.991 4.16663 36.5807 4.82511 37.7528 5.99721C38.9249 7.16931 39.5834 8.75902 39.5834 10.4166V41.6666C39.5832 42.4744 39.3482 43.2647 38.907 43.9413C38.4658 44.618 37.8375 45.1518 37.0985 45.4778C36.3594 45.8039 35.5415 45.9081 34.7444 45.7777C33.9472 45.6474 33.2051 45.2881 32.6084 44.7437L26.4042 39.0833C26.0204 38.7331 25.5196 38.539 25 38.539C24.4805 38.539 23.9797 38.7331 23.5959 39.0833L17.3917 44.7437C16.795 45.2881 16.0529 45.6474 15.2557 45.7777C14.4585 45.9081 13.6406 45.8039 12.9016 45.4778C12.1625 45.1518 11.5342 44.618 11.093 43.9413C10.6519 43.2647 10.4169 42.4744 10.4167 41.6666V10.4166C10.4167 8.75902 11.0752 7.16931 12.2473 5.99721C13.4194 4.82511 15.0091 4.16663 16.6667 4.16663Z"
                />
              </svg>
              <span>{{ item.quotes.length }}</span>
            </button>
          </div>
          <div
            v-show="!hiddenQuotes.includes(item.name)"
            class="quotes space-y-3"
          >
            <quote-card
              v-for="quote of item.quotes"
              :key="quote.id"
              :ref="quote.id"
              :quote="quote"
              @active-editor="activeEditor(quote)"
              @inactive-editor="inactiveEditor"
            >
              <template
                v-slot:body
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="editor card-body mx-8">
                  <editor-floating-menu
                    :editor="editor"
                    v-slot="{ commands, isActive, menu }"
                  >
                    <div
                      class="floating-menubar flex items-center ml-2 space-x-0.5"
                      :class="{ 'is-active': menu.isActive }"
                      :style="`top: ${menu.top}px`"
                    >
                      <div
                        class="headings-container flex items-center relative"
                      >
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active':
                              isActive.heading() || showEditorHeadingsModal,
                          }"
                          @click="
                            showEditorHeadingsModal = !showEditorHeadingsModal
                          "
                        >
                          <img
                            src="@/assets/icons/editor/header.svg"
                            alt="header icon"
                          />
                        </button>

                        <div
                          class="modal-container absolute top-7 left-1 z-20"
                          v-show="showEditorHeadingsModal"
                        >
                          <div
                            class="modal flex space-x-1 rounded bg-gray-100 shadow-md"
                          >
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 1 }),
                              }"
                              @click="markHeading(1)"
                            >
                              <img
                                src="@/assets/icons/editor/h1.svg"
                                alt="heading 1 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 2 }),
                              }"
                              @click="markHeading(2)"
                            >
                              <img
                                src="@/assets/icons/editor/h2.svg"
                                alt="heading 2 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 3 }),
                              }"
                              @click="markHeading(3)"
                            >
                              <img
                                src="@/assets/icons/editor/h3.svg"
                                alt="heading 3 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 4 }),
                              }"
                              @click="markHeading(4)"
                            >
                              <img
                                src="@/assets/icons/editor/h4.svg"
                                alt="heading 4 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 5 }),
                              }"
                              @click="markHeading(5)"
                            >
                              <img
                                src="@/assets/icons/editor/h5.svg"
                                alt="heading 5 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 6 }),
                              }"
                              @click="markHeading(6)"
                            >
                              <img
                                src="@/assets/icons/editor/h6.svg"
                                alt="heading 6 icon"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                      >
                        <img
                          src="@/assets/icons/editor/unordered-list.svg"
                          alt="unordered list icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                      >
                        <img
                          src="@/assets/icons/editor/ordered-list.svg"
                          alt="ordered list icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.code_block() }"
                        @click="commands.code_block"
                      >
                        <img
                          src="@/assets/icons/editor/codeblock.svg"
                          alt="codeblock icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                      >
                        <img
                          src="@/assets/icons/quote.svg"
                          alt="codeblock icon"
                        />
                      </button>
                    </div>
                  </editor-floating-menu>
                  <editor-content :editor="editor"></editor-content>
                </div>
              </template>
              <template
                v-slot:location
                v-if="editingQuote && quote.id === editingQuote"
              >
                <div class="quote-location ml-1.5 text-xs flex-col space-y-1">
                  <div class="flex items-center">
                    <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                      >章节：</label
                    >
                    <treeselect
                      class="w-4/5 z-10"
                      v-model="quoteChapter"
                      placeholder="请选择章节"
                      :multiple="false"
                      :options="category"
                      :normalizer="categoryNormalizer"
                      :searchable="true"
                      :flatten-search-results="true"
                      :close-on-select="true"
                      :default-expand-level="1"
                    />
                  </div>
                  <div class="flex items-center">
                    <label
                      class="flex-shrink-0 opacity-30"
                      for="quote-location"
                    >
                      页码：</label
                    >
                    <input
                      class="w-4/5"
                      id="quote-location"
                      type="number"
                      v-model="quoteLocation"
                      placeholder="请输入页码"
                    />
                  </div>
                </div>
              </template>
              <template
                v-slot:comment
                v-if="
                  (quote.id === editingQuote &&
                    quote.comment &&
                    quote.comment !== '<p></p>') ||
                  quote.id === quoteAddingComment
                "
              >
                <div
                  class="editor quote-comment px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
                >
                  <editor-floating-menu
                    :editor="commentEditor"
                    v-slot="{ commands, isActive, menu }"
                  >
                    <div
                      class="floating-menubar flex items-center ml-2 space-x-0.5"
                      :class="{ 'is-active': menu.isActive }"
                      :style="`top: ${menu.top}px`"
                    >
                      <div
                        class="headings-container flex items-center relative"
                      >
                        <button
                          class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                          :class="{
                            'is-active':
                              isActive.heading() ||
                              showcommentEditorHeadingsModal,
                          }"
                          @click="
                            showcommentEditorHeadingsModal = !showcommentEditorHeadingsModal
                          "
                        >
                          <img
                            src="@/assets/icons/editor/header.svg"
                            alt="header icon"
                          />
                        </button>

                        <div
                          class="modal-container absolute top-7 left-1 z-20"
                          v-show="showcommentEditorHeadingsModal"
                        >
                          <div
                            class="modal flex space-x-1 rounded bg-gray-100 shadow-md"
                          >
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 1 }),
                              }"
                              @click="markCommentHeading(1)"
                            >
                              <img
                                src="@/assets/icons/editor/h1.svg"
                                alt="heading 1 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 2 }),
                              }"
                              @click="markCommentHeading(2)"
                            >
                              <img
                                src="@/assets/icons/editor/h2.svg"
                                alt="heading 2 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 3 }),
                              }"
                              @click="markCommentHeading(3)"
                            >
                              <img
                                src="@/assets/icons/editor/h3.svg"
                                alt="heading 3 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 4 }),
                              }"
                              @click="markCommentHeading(4)"
                            >
                              <img
                                src="@/assets/icons/editor/h4.svg"
                                alt="heading 4 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 5 }),
                              }"
                              @click="markCommentHeading(5)"
                            >
                              <img
                                src="@/assets/icons/editor/h5.svg"
                                alt="heading 5 icon"
                              />
                            </button>
                            <button
                              class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                              :class="{
                                'is-active': isActive.heading({ level: 6 }),
                              }"
                              @click="markCommentHeading(6)"
                            >
                              <img
                                src="@/assets/icons/editor/h6.svg"
                                alt="heading 6 icon"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list"
                      >
                        <img
                          src="@/assets/icons/editor/unordered-list.svg"
                          alt="unordered list icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list"
                      >
                        <img
                          src="@/assets/icons/editor/ordered-list.svg"
                          alt="ordered list icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.code_block() }"
                        @click="commands.code_block"
                      >
                        <img
                          src="@/assets/icons/editor/codeblock.svg"
                          alt="codeblock icon"
                        />
                      </button>
                      <button
                        class="w-6 h-6 hover:bg-gray-200 p-0.5 rounded"
                        :class="{ 'is-active': isActive.blockquote() }"
                        @click="commands.blockquote"
                      >
                        <img
                          src="@/assets/icons/quote.svg"
                          alt="codeblock icon"
                        />
                      </button>
                    </div>
                  </editor-floating-menu>
                  <editor-content :editor="commentEditor"></editor-content>
                </div>
              </template>
            </quote-card>
          </div>
          <hr class="mx-auto my-8 border-gray-300 w-1/2" />
        </section>
      </div>
      <footer class="my-12 items-center">
        <hr class="mx-auto w-1/2" />
        <div class="flex justify-center items-center">
          <button
            @click="backToTopHandler"
            class="text-blue-400 font-bold my-4"
          >
            返回顶部
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import {
  Editor,
  EditorContent,
  EditorMenuBar,
  EditorFloatingMenu,
} from 'tiptap';
import {
  Bold,
  Blockquote,
  BulletList,
  Code,
  CodeBlockHighlight,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Heading,
  TodoItem,
  TodoList,
  Image,
} from 'tiptap-extensions';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import markdown from 'highlight.js/lib/languages/markdown';

import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

import { mapState } from 'vuex';
import QuoteCard from './QuoteCard.vue';

export default {
  props: ['category', 'quotes', 'quotesChapters'],
  components: {
    QuoteCard,
    EditorContent,
    EditorMenuBar,
    EditorFloatingMenu,
    Treeselect,
  },
  data() {
    return {
      hiddenQuotes: [],
      HTMLtemp: null,
      JSONtemp: null,
      commentJSONtemp: null,
      quoteChapter: null,
      quoteLocation: 0,
      convertor: null,
      editor: null,
      commentEditor: null,
      showEditorHeadingsModal: false,
      showcommentEditorHeadingsModal: false,
    };
  },
  computed: {
    ...mapState([
      'quotesListMode',
      'currentQuotesChapter',
      'editingQuote',
      'quoteAddingComment',
    ]),
    quotesRendered() {
      const quotesRendered = [];
      this.quotes.forEach((quote) => {
        const quoteTemp = { ...quote };

        quoteTemp.content = this.convert(quote.content, true);
        if (quote.comment) {
          quoteTemp.comment = this.convert(quote.comment, true);
        }
        quotesRendered.push(quoteTemp);
      });
      return quotesRendered;
    },
    quotesSorted() {
      if (this.quotesListMode === 'chapter') {
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
        return chaptersContainer;
      }
      return this.quotesRendered;
    },
  },
  watch: {
    currentQuotesChapter() {
      if (
        this.quotesListMode === 'chapter'
        && this.currentQuotesChapter !== null
      ) {
        const top = this.$refs[this.currentQuotesChapter][0].offsetTop;
        this.$refs.quotesList.scrollTop = top - 6 * 14;
      }
    },
    quoteAddingComment() {
      if (this.quoteAddingComment) {
        this.commentEditor.focus();
      }
    },
  },
  methods: {
    categoryNormalizer(node) {
      return {
        id: node.name,
        label: node.name,
        children: node.children,
      };
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
      this.$store.dispatch('changeQuotesMode', mode);
    },
    activeEditor(quote) {
      this.editor.setContent(quote.content, true);
      if (quote.comment) {
        this.commentEditor.setContent(quote.comment, true);
      }
      if (quote.chapter) this.quoteChapter = quote.chapter;
      if (quote.location) this.quoteLocation = quote.location;
      this.$store.dispatch('activeQuoteEditing', quote.id);
      if (this.quoteAddingComment) {
        this.commentEditor.focus();
      } else {
        this.editor.focus();
      }
    },
    inactiveEditor(type) {
      const target = this.editingQuote;

      if (type === 'cancel') {
        this.$store.dispatch('cancelQuoteEditing');
        this.editor.clearContent();
        this.commentEditor.clearContent();
        this.JSONtemp = null;
        this.commentJSONtemp = null;
        this.quoteChapter = null;
        this.quoteLocation = 0;
      } else if (type === 'save') {
        this.$store.dispatch('saveQuoteEditing', {
          chapter: this.quoteChapter,
          location: this.quoteLocation,
          body: this.JSONtemp,
          comment: this.commentJSONtemp,
        });
        this.editor.clearContent();
        this.commentEditor.clearContent();
        this.JSONtemp = null;
        this.commentJSONtemp = null;
        this.quoteChapter = null;
        this.quoteLocation = 0;
      }

      // focus the editing quote
      this.$nextTick(() => {
        this.$refs[target][0].$el.focus();
      });
    },
    markHeading(headerLevel) {
      this.editor.commands.heading({ level: headerLevel });
      this.showEditorHeadingsModal = false;
    },
    markCommentHeading(headerLevel) {
      this.commentEditor.commands.heading({ level: headerLevel });
      this.showcommentEditorHeadingsModal = false;
    },
  },
  created() {
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
        new Image(),
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
        new Image(),
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
        new Image(),
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
.quotes-list {
  overflow-y: overlay;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0);
  }
  &:hover::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
  }
}

.menubar {
  .is-active {
    background: #e5e7eb;
  }
}

.editor {
  position: relative;
  .floating-menubar {
    position: absolute;
    z-index: 1;
    // margin-top: -0.5rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}

#quote-location {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 0 0 10px;
  &:focus {
    outline: none;
  }
}
</style>
