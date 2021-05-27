<template>
  <div
    class="quote-card relative rounded-lg outline-none"
    :class="{ editing: quote._id === editingQuote }"
    tabindex="0"
  >
    <div
      class="quote-content bg-white border"
      :class="{
        'rounded-lg': !showComment && quote._id !== addingCommentQuote,
        'rounded-t-lg': showComment || quote._id === addingCommentQuote,
      }"
    >
      <div class="card-header-container h-12">
        <div
          v-if="!quoteEditing || quote._id !== editingQuote"
          class="card-header pt-3 px-3 flex justify-between items-start"
        >
          <div class="left flex items-center space-x-0.5">
            <button
              class="quote-link flex items-center hover:bg-gray-100 p-1 rounded opacity-80"
              @click="insertQuote(quote)"
              @drag="setCandidateQuote(quote)"
            >
              <img
                src="@/assets/icons/quote.svg"
                alt="quote icon"
                class="w-5 h-5"
              />
            </button>
            <button
              class="hover:bg-gray-100 p-1 rounded"
              :class="{
                'text-blue-500': pinQuotesSet.has(quote._id),
                'text-gray-500': !pinQuotesSet.has(quote._id),
              }"
              @click="pinHandler"
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
            <!-- <button
              class="notes-link hover:bg-gray-100 p-1 rounded opacity-60 hidden items-center"
            >
              <img
                src="@/assets/icons/notes.svg"
                alt="note icon"
                class="w-5 h-5"
              />
              <span class="text-sm font-bold">2</span>
            </button> -->
          </div>
          <div class="right hidden items-center space-x-0.5">
            <button class="hover:bg-gray-100 p-1 rounded opacity-60">
              <img
                src="@/assets/icons/flip.svg"
                alt="flip icon"
                class="w-5 h-5"
              />
            </button>
            <button
              class="hover:bg-gray-100 p-1 rounded"
              :class="{
                'opacity-10': quoteEditing,
              }"
              :disabled="quoteEditing"
              @click="showDeleteModal = true"
            >
              <img
                src="@/assets/icons/delete.svg"
                alt="delete icon"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
        <div
          v-if="quoteEditing && quote._id === editingQuote"
          class="card-header pt-3 px-3 flex justify-between items-start"
        >
          <button
            class="left flex items-center bg-red-500 rounded p-1 text-white opacity-30 hover:opacity-100"
            @click="$emit('inactive-editor', 'cancel')"
          >
            <svg
              class="w-5 h-5"
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
            <span class="ml-0.5 text-xs">Cancel</span>
          </button>
          <button
            class="right flex items-center bg-green-500 rounded p-1 text-white opacity-60 hover:opacity-100"
            @click="$emit('inactive-editor', 'save')"
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
            <span class="ml-0.5 text-xs">Save</span>
          </button>
        </div>
      </div>
      <!-- <slot name="body"> -->
      <div
        v-if="!quoteEditing || quote._id !== editingQuote"
        class="card-body mx-8"
        v-html="quote.content"
      ></div>
      <div
        v-if="quoteEditing && quote._id === editingQuote"
        class="quote-editor-container card-body mx-8"
      >
        <quote-editor-floating-menu
          :editor="editor"
        ></quote-editor-floating-menu>
        <editor-menu-bubble
          :editor="editor"
          v-slot="{ commands, isActive, getMarkAttrs, menu }"
        >
          <div
            class="menububble bg-gray-100 rounded-md"
            :class="{ 'is-active': menu.isActive }"
            :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
          >
            <form
              class="flex flex-col bg-gray-100"
              v-if="linkMenuIsActive"
              @submit.prevent="setLinkUrl(commands.link, linkUrl)"
            >
              <button
                class="flex-shrink-0 h-6 p-1 flex items-center justify-center bg-red-400 hover:bg-red-500 text-white rounded-t"
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
                class="h-8 p-1 border-2 border-gray-200 text-sm"
                type="text"
                v-model="linkUrl"
                placeholder="https://"
                ref="linkInput"
                @keydown.esc="hideLinkMenu"
              />
              <div class="flex-shrink-0 flex">
                <button
                  class="flex-grow h-6 p-1 flex items-center justify-center bg-green-400 hover:bg-green-500 text-white rounded-bl"
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
                  class="flex-grow h-6 p-1 flex items-center justify-center bg-red-400 hover:bg-red-500 text-white rounded-br"
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
              </div>
            </form>
            <template v-else>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1.5 rounded-md"
                :class="{ 'is-active bg-gray-200': isActive.paragraph() }"
                @click="commands.paragraph"
              >
                <img
                  src="@/assets/icons/editor/paragraph.svg"
                  alt="paragraph icon"
                />
              </button>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1 rounded-md"
                :class="{ 'is-active bg-gray-200': isActive.code() }"
                @click="commands.code"
              >
                <img src="@/assets/icons/editor/code.svg" alt="code icon" />
              </button>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1 rounded-md"
                :class="{ 'is-active bg-gray-200': isActive.bold() }"
                @click="commands.bold"
              >
                <img src="@/assets/icons/editor/bold.svg" alt="bold icon" />
              </button>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1 rounded-md"
                :class="{ 'is-active bg-gray-200': isActive.italic() }"
                @click="commands.italic"
              >
                <img src="@/assets/icons/editor/italic.svg" alt="italic icon" />
              </button>
              <button
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center hover:bg-gray-200 p-1 rounded-md"
                :class="{ 'is-active bg-gray-200': isActive.link() }"
                @click="showLinkMenu(getMarkAttrs('link'))"
              >
                <img src="@/assets/icons/editor/link.svg" alt="link icon" />
              </button>
            </template>
          </div>
        </editor-menu-bubble>
        <editor-content :editor="editor"></editor-content>
      </div>
      <!-- </slot> -->
      <div class="card-footer-container flex items-end">
        <div
          class="card-footer pb-3 px-3 flex justify-between items-end flex-grow space-x-2"
        >
          <div class="left flex items-center">
            <!-- <slot name="type"> -->
            <div
              v-if="!quoteEditing || quote._id !== editingQuote"
              class="quote-type p-1 flex-shrink-0"
              :class="{
                'hidden opacity-30':
                  quote.type === 'annotation' && !showComment,
              }"
            >
              <img
                :src="require(`@/assets/icons/${quote.type}.svg`)"
                :alt="`${quote.type} icon`"
                class="w-5 h-5"
              />
            </div>
            <div
              v-if="quoteEditing && quote._id === editingQuote"
              class="quote-type flex-shrink-0 relative"
            >
              <button
                class="border p-1 border-gray-300 rounded"
                @click="showTypesModal = true"
              >
                <img
                  :src="require(`@/assets/icons/${quoteType}.svg`)"
                  :alt="`${quoteType} icon`"
                  class="w-5 h-5"
                />
              </button>
              <div
                v-show="showTypesModal"
                class="types-modal-container absolute top-8 z-10 flex flex-col space-y-1 bg-gray-100 rounded shadow"
              >
                <button
                  v-for="type of types"
                  :key="type"
                  class="p-1 hover:bg-gray-200 rounded"
                  @click="changeQuoteType(type)"
                >
                  <img
                    :src="require(`@/assets/icons/${type}.svg`)"
                    :alt="`${type} icon`"
                    class="w-5 h-5"
                  />
                </button>
              </div>
            </div>
            <!-- </slot> -->

            <!-- <slot name="location"> -->
            <div
              v-if="!quoteEditing || quote._id !== editingQuote"
              class="quote-location ml-1.5 text-xs flex flex-col space-y-1"
            >
              <p class="opacity-0">章节：{{ quote.chapter || "未分类" }}</p>
              <p class="opacity-0">页码：{{ quote.location || "未知" }}</p>
            </div>
            <div
              v-if="quoteEditing && quote._id === editingQuote"
              class="quote-location ml-1.5 text-xs flex-col space-y-1"
            >
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-chapter"
                  >章节：</label
                >
                <treeselect
                  v-if="category.length > 0"
                  class="w-4/5 z-10"
                  v-model="quoteChapterTemp"
                  placeholder="请选择章节"
                  :multiple="false"
                  :options="category"
                  :normalizer="categoryNormalizer"
                  :searchable="true"
                  :flatten-search-results="true"
                  :close-on-select="true"
                  :default-expand-level="1"
                  :max-height="150"
                />
                <p v-else class="opacity-30">请先为该书籍添加目录</p>
              </div>
              <div class="flex items-center">
                <label class="flex-shrink-0 opacity-30" for="quote-location">
                  页码：</label
                >
                <input
                  class="w-4/5"
                  id="quote-location"
                  type="number"
                  v-model.number="quoteLocationTemp"
                  placeholder="请输入页码"
                />
              </div>
            </div>
            <!-- </slot> -->
          </div>
          <div
            class="right relative flex-shrink-0 items-center space-x-0.5"
            :class="{
              hidden: !quoteEditing || quote._id !== editingQuote,
              flex: quoteEditing && quote._id === editingQuote,
            }"
          >
            <button
              class="hover:bg-gray-100 p-1 rounded"
              :class="{
                'opacity-80':
                  !quoteEditing ||
                  (quoteEditing &&
                    quote._id === editingQuote &&
                    !addingCommentQuote),
                'opacity-10':
                  addingCommentQuote ||
                  (quoteEditing && quote._id !== editingQuote),
              }"
              v-show="!showComment"
              :disabled="
                addingCommentQuote ||
                (quoteEditing && quote._id !== editingQuote)
              "
              @click="addCommentHandler"
            >
              <img
                src="@/assets/icons/add.svg"
                alt="add icon"
                class="w-5 h-5"
              />
            </button>
            <button
              class="hover:bg-gray-100 p-1 rounded"
              :class="{
                'opacity-80': !quoteEditing,
                'opacity-10': quoteEditing,
              }"
              :disabled="quoteEditing"
              @click="$emit('active-editor')"
            >
              <img
                src="@/assets/icons/edit.svg"
                alt="edit icon"
                class="w-5 h-5"
              />
            </button>
            <!-- <button class="opacity-30 hover:opacity-80">
              <img
                src="@/assets/icons/copy.svg"
                alt="copy icon"
                class="w-5 h-5"
              />
            </button> -->
            <button
              class="hover:bg-gray-100 p-1 rounded opacity-80"
              @click="showShareModal = !showShareModal"
            >
              <img
                src="@/assets/icons/share.svg"
                alt="share icon"
                class="w-5 h-5"
              />
            </button>
            <div
              v-show="showShareModal"
              class="share-modal absolute bottom-8 right-0 z-10 flex items-center space-x-0.5 bg-gray-100 p-1 rounded"
            >
              <button
                v-for="item of shareFormatList"
                :key="item.title"
                class="w-7 p-1 rounded hover:bg-gray-200"
                :title="item.title"
                @click="shareHandler(item.title)"
              >
                <img :src="`apps/${item.image}`" :alt="`${item.title} icon`" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <slot name="comment"> -->
    <div
      v-if="editingQuote !== quote._id && showComment"
      class="quote-comment px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
      v-html="quote.comment"
    ></div>
    <div
      v-if="
        quoteEditing &&
        ((quote._id === editingQuote && showComment) ||
          quote._id === addingCommentQuote)
      "
      class="comment-editor-container px-8 py-6 rounded-b-lg m-0 bg-gray-200 text-blue-900"
    >
      <quote-editor-floating-menu
        :editor="commentEditor"
      ></quote-editor-floating-menu>
      <editor-content :editor="commentEditor"></editor-content>
    </div>
    <!-- </slot> -->

    <div
      v-show="showDeleteModal"
      class="delete-modal absolute inset-0 flex flex-col justify-center items-center rounded-lg bg-opacity-90 bg-gray-200 border-2 border-red-400"
    >
      <p class="text-gray-700 font-bold">是否删除该书摘？</p>
      <div class="flex mt-4 space-x-4">
        <button
          class="p-2 rounded-lg bg-red-400 hover:bg-red-500 text-white"
          @click="
            $store.dispatch('deleteQuotes', {
              quote_ids: [quote._id],
              book_id: book._id,
            })
          "
        >
          确定
        </button>
        <button
          class="p-2 rounded-lg bg-gray-400 hover:bg-gray-600 text-white"
          @click="showDeleteModal = false"
        >
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import 'katex/dist/katex.min.css';

import { EditorContent, EditorMenuBubble } from 'tiptap';
import QuoteEditorFloatingMenu from './editor/QuoteEditorFloatingMenu.vue';

export default {
  props: [
    'editor',
    'commentEditor',
    'category',
    'quote',
    'quoteChapter',
    'quoteLocation',
    'quoteType',
  ],
  components: {
    EditorContent,
    EditorMenuBubble,
    Treeselect,
    QuoteEditorFloatingMenu,
  },
  data() {
    return {
      types: ['annotation', 'question', 'deep-reading', 'inspiration'],
      quoteChapterTemp: encodeURIComponent(this.quote.chapter || ''),
      quoteLocationTemp: this.quote.location || 0,
      addComment: false,
      showDeleteModal: false,
      showTypesModal: false,
      showShareModal: false,
      shareFormatList: [
        {
          title: 'image',
          image: 'image.png',
        },
        {
          title: 'markdown',
          image: 'markdown.png',
        },
        {
          title: 'json',
          image: 'json.png',
        },
        // {
        //   title: 'html',
        //   image: 'html.png',
        // },
        // {
        //   title: 'word',
        //   image: 'word.png',
        // },
      ],
      linkUrl: null,
      linkMenuIsActive: false,
    };
  },
  computed: {
    ...mapState({
      book: (state) => state.book.book,
      quoteEditing: (state) => state.quote.quoteEditing,
      editingQuote: (state) => state.quote.editingQuote,
      addingCommentQuote: (state) => state.quote.addingCommentQuote,
      pinQuotesSet: (state) => state.pin.pinQuotesSet,
      pinQuotesSetTracker: (state) => state.pin.pinQuotesSetTracker,
    }),
    showComment() {
      if (this.quote.comment && this.quote.comment !== '<p></p>') {
        return true;
      }
      return false;
    },
  },
  watch: {
    pinQuotesSetTracker() {
      this.$forceUpdate();
    },
    quoteChapterTemp() {
      this.$emit(
        'update:quoteChapter',
        decodeURIComponent(this.quoteChapterTemp),
      );
    },
    quoteLocationTemp() {
      this.$emit('update:quoteLocation', this.quoteLocationTemp);
    },
  },
  methods: {
    // pinState(id) {
    //   console.log(this.pinQuotesSet.has(id));
    //   return this.pinQuotesSet.has(id);
    // },
    changeQuoteType(type) {
      this.$emit('update:quoteType', type);
      this.showTypesModal = false;
    },
    categoryNormalizer(node) {
      return {
        id: encodeURIComponent(node.name),
        label: node.name,
        children: node.children,
      };
    },
    setCandidateQuote(quote) {
      const chapter = quote.chapter || '';
      const location = quote.location || 0;
      // block quote content
      const blockDom = `<blockquote class="block-quote" data-chapter="${chapter}" data-location="${location}" >
        ${quote.content}
        <p>章节：${chapter}</p>
        <p>页码：${location}</p>
      </blockquote>`;

      // inline quote text content
      const parser = new DOMParser();
      const dom = parser.parseFromString(quote.content, 'text/html');
      const content = dom.body.textContent;
      const inlineDom = `<span class="inline-quote" data-chapter="${chapter}" data-location="${location}" >${content}</span>`;

      this.$store.dispatch('setCandidateQuote', {
        blockDom,
        inlineDom,
      });
    },
    insertQuote(quote) {
      this.setCandidateQuote(quote);
      this.$store.dispatch('insertQuote').then(() => {
        this.$store.dispatch('clearInsertQuote');
      });
    },
    pinHandler() {
      this.$store.dispatch('setPinQuotes', [this.quote._id]);
      this.$forceUpdate();
    },
    addCommentHandler() {
      if (!this.quoteEditing) {
        this.$emit('active-editor');
      }
      this.$store.dispatch('activeAddingComment', this.quote._id);
    },
    shareHandler(val) {
      this.$emit(`share-quotes-as-${val}`);
      this.showShareModal = false;
    },
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
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
.editing {
  box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.2);
}

.quote-card {
  // .quote-link:hover {
  //   opacity: 80%;
  // }

  &:focus-within {
    box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.15);
    .card-header {
      .notes-link,
      .right {
        display: flex;
      }
    }

    .quote-type {
      display: block;
    }

    .quote-location {
      p {
        opacity: 30%;
      }
    }

    .card-footer {
      .right {
        display: flex;
      }
    }
  }

  .card-footer-container {
    min-height: 4rem;
  }
}

.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  // background: #000000;
  // border-radius: 5px;
  // padding: 0.3rem;
  margin-bottom: 0.2rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;

  &.is-active {
    opacity: 1;
    visibility: visible;
  }

  // &__button {
  //   display: inline-flex;
  //   background: transparent;
  //   border: 0;
  //   color: rgb(255, 255, 255);
  //   padding: 0.2rem 0.5rem;
  //   margin-right: 0.2rem;
  //   border-radius: 3px;
  //   cursor: pointer;

  //   &:last-child {
  //     margin-right: 0;
  //   }

  //   &:hover {
  //     background-color: rgba(255, 255, 255, 0.1);
  //   }

  //   &.is-active {
  //     background-color: rgba(255, 255, 255, 0.2);
  //   }
  // }

  // &__form {
  //   display: flex;
  //   align-items: center;
  // }

  // &__input {
  //   font: inherit;
  //   border: none;
  //   background: transparent;
  //   color: rgb(255, 255, 255);
  // }
}
</style>
