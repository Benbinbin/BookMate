<template>
  <div class="menubar w-full h-full flex items-center space-x-2">
    <button
      class="flex items-center justify-center bg-red-500 opacity-30 hover:opacity-100 text-white p-1.5 rounded"
      @click="$emit('inactive-editor', 'cancel')"
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

    <editor-menu-bar
      class="flex-grow"
      :editor="editor"
      v-slot="{ commands, getMarkAttrs, isActive }"
    >
      <div class="flex items-center space-x-2 relative">
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
        <div class="headings-container flex-grow flex relative">
          <button
            class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
            :class="{ 'is-active': isActive.heading() || showHeadingsModal }"
            @click="showHeadingsModal = !showHeadingsModal"
          >
            <img
              class="w-6 h-6"
              src="@/assets/icons/editor/header.svg"
              alt="header icon"
            />
          </button>
          <div
            class="headings-modal-container absolute top-9 inset-x-0 z-20"
            v-show="showHeadingsModal"
          >
            <div
              class="headings-modal flex flex-col rounded bg-gray-100 shadow-md"
            >
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="markHeading(1)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h1.svg"
                  alt="heading 1 icon"
                />
              </button>
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="markHeading(2)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h2.svg"
                  alt="heading 2 icon"
                />
              </button>
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="markHeading(3)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h3.svg"
                  alt="heading 3 icon"
                />
              </button>
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 4 }) }"
                @click="markHeading(4)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h4.svg"
                  alt="heading 4 icon"
                />
              </button>
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 5 }) }"
                @click="markHeading(5)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h5.svg"
                  alt="heading 5 icon"
                />
              </button>
              <button
                class="flex-grow flex items-center justify-center hover:bg-gray-200 p-2 rounded"
                :class="{ 'is-active': isActive.heading({ level: 6 }) }"
                @click="markHeading(6)"
              >
                <img
                  class="w-6 h-6"
                  src="@/assets/icons/editor/h6.svg"
                  alt="heading 6 icon"
                />
              </button>
            </div>
          </div>
        </div>
        <button
          class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/editor/unordered-list.svg"
            alt="unordered list icon"
          />
        </button>
        <button
          class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/editor/ordered-list.svg"
            alt="ordered list icon"
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
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/editor/codeblock.svg"
            alt="codeblock icon"
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
          class="flex-grow flex items-center justify-center hover:bg-gray-200 p-1 rounded"
          :class="{ 'is-active': isActive.link() }"
          @click="toggleLinkMenu(getMarkAttrs('link'))"
        >
          <img
            class="w-6 h-6"
            src="@/assets/icons/editor/link.svg"
            alt="link icon"
          />
        </button>
        <div
          class="link-modal absolute top-14 inset-x-0 z-20"
          v-if="linkMenuIsActive"
        >
          <form
            class="flex w-full"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <button
              class="flex-shrink-0 w-8 h-8 p-1.5 flex items-center justify-center bg-red-400 hover:bg-red-500 text-white rounded-l"
              @click="setLinkUrl(commands.link, null)"
            >
              <svg
                class="h-full"
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
            <input
              class="flex-grow h-8 p-1 border-2 border-gray-200 text-sm"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="flex-shrink-0 w-8 h-8 p-1 flex items-center justify-center bg-green-400 hover:bg-green-500 text-white"
              @click="setLinkUrl(commands.link, linkUrl)"
            >
              <svg
                class="h-full"
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
            <button
              class="flex-shrink-0 w-8 h-8 p-1 flex items-center justify-center bg-red-400 hover:bg-red-500 text-white rounded-r"
              @click="hideLinkMenu"
            >
              <svg
                class="h-full"
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
          </form>
        </div>
      </div>
    </editor-menu-bar>
    <button
      class="flex items-center justify-center hover:bg-gray-200 p-1.5 rounded"
      @click="$emit('focus-target')"
    >
      <img class="w-6 h-6" src="@/assets/icons/target.svg" alt="target icon" />
    </button>
    <button
      class="flex items-center justify-center bg-green-500 opacity-60 hover:opacity-100 text-white p-1.5 rounded"
      @click="$emit('inactive-editor', 'save')"
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
</template>

<script>
import { EditorMenuBar } from 'tiptap';

export default {
  props: ['editor'],
  components: {
    EditorMenuBar,
  },
  data() {
    return {
      showHeadingsModal: false,
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  methods: {
    markHeading(headerLevel) {
      this.editor.commands.heading({ level: headerLevel });
      this.showHeadingsModal = false;
    },
    toggleLinkMenu(attrs) {
      this.linkMenuIsActive = !this.linkMenuIsActive;
      if (this.linkMenuIsActive) {
        this.linkUrl = attrs.href;
        this.$nextTick(() => {
          this.$refs.linkInput.focus();
        });
      }
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.menubar {
  .is-active {
    background: #e5e7eb;
  }
}
</style>
