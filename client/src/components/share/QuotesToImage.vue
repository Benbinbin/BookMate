<template>
  <div ref="shareQuotesContainer">
    <!-- single quote -->
    <div
      v-if="quote"
      class="quote-card p-8 bg-white border-0"
      :style="{ width: `${quoteWidth}rem` }"
    >
      <div
        class="card-main border relative rounded-t-lg"
        :class="{
          'bg-white': quoteType === 'default',
          'bg-gray-600 border-gray-600': quoteType === 'defaultDark',
        }"
      >
        <div
          class="absolute inset-0"
          :class="{
            'text-gray-600': quoteType === 'default',
            'text-white': quoteType === 'defaultDark',
          }"
        >
          <svg
            class="quote-icon w-20 h-20 m-4 opacity-5"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.25 10.9375C6.25 10.5231 6.41462 10.1257 6.70765 9.83265C7.00067 9.53962 7.3981 9.375 7.8125 9.375H42.1875C42.6019 9.375 42.9993 9.53962 43.2924 9.83265C43.5854 10.1257 43.75 10.5231 43.75 10.9375C43.75 11.3519 43.5854 11.7493 43.2924 12.0424C42.9993 12.3354 42.6019 12.5 42.1875 12.5H7.8125C7.3981 12.5 7.00067 12.3354 6.70765 12.0424C6.41462 11.7493 6.25 11.3519 6.25 10.9375ZM21.875 20.3125C21.875 19.8981 22.0396 19.5007 22.3326 19.2076C22.6257 18.9146 23.0231 18.75 23.4375 18.75H42.1875C42.6019 18.75 42.9993 18.9146 43.2924 19.2076C43.5854 19.5007 43.75 19.8981 43.75 20.3125C43.75 20.7269 43.5854 21.1243 43.2924 21.4174C42.9993 21.7104 42.6019 21.875 42.1875 21.875H23.4375C23.0231 21.875 22.6257 21.7104 22.3326 21.4174C22.0396 21.1243 21.875 20.7269 21.875 20.3125ZM21.875 29.6875C21.875 29.2731 22.0396 28.8757 22.3326 28.5826C22.6257 28.2896 23.0231 28.125 23.4375 28.125H42.1875C42.6019 28.125 42.9993 28.2896 43.2924 28.5826C43.5854 28.8757 43.75 29.2731 43.75 29.6875C43.75 30.1019 43.5854 30.4993 43.2924 30.7924C42.9993 31.0854 42.6019 31.25 42.1875 31.25H23.4375C23.0231 31.25 22.6257 31.0854 22.3326 30.7924C22.0396 30.4993 21.875 30.1019 21.875 29.6875ZM6.25 39.0625C6.25 38.6481 6.41462 38.2507 6.70765 37.9576C7.00067 37.6646 7.3981 37.5 7.8125 37.5H42.1875C42.6019 37.5 42.9993 37.6646 43.2924 37.9576C43.5854 38.2507 43.75 38.6481 43.75 39.0625C43.75 39.4769 43.5854 39.8743 43.2924 40.1674C42.9993 40.4604 42.6019 40.625 42.1875 40.625H7.8125C7.3981 40.625 7.00067 40.4604 6.70765 40.1674C6.41462 39.8743 6.25 39.4769 6.25 39.0625Z"
            />
            <path
              d="M11.6687 19.85C11.194 20.1179 10.7301 20.4046 10.2781 20.7094C9.88213 20.9771 9.5192 21.2908 9.19688 21.6438C8.87348 21.9828 8.60749 22.3723 8.40937 22.7969C8.22812 23.2 8.09688 23.7188 8.025 24.3531H8.90625C9.6625 24.3531 10.2531 24.5406 10.6813 24.9219C11.1188 25.2875 11.3375 25.8281 11.3375 26.55C11.3281 27.0879 11.1199 27.6033 10.7531 27.9969C10.3781 28.4344 9.85 28.6531 9.18125 28.6531C8.13125 28.6531 7.37812 28.3156 6.92813 27.6313C6.475 26.9344 6.25 26.025 6.25 24.9031C6.25 24.1094 6.42188 23.3875 6.7625 22.7406C7.10625 22.0844 7.51875 21.4969 8.00625 20.9844C8.50625 20.4594 9.0375 20.0156 9.6 19.6469C10.1625 19.2813 10.6312 18.9813 11.0094 18.75L11.6687 19.85ZM18.4437 19.85C17.969 20.1179 17.5051 20.4046 17.0531 20.7094C16.6571 20.9771 16.2942 21.2908 15.9719 21.6438C15.6188 22.0188 15.35 22.4125 15.1688 22.8156C14.972 23.3076 14.8478 23.8255 14.8 24.3531H15.6813C16.4375 24.3531 17.0281 24.5406 17.4563 24.9219C17.8938 25.2875 18.1125 25.8281 18.1125 26.55C18.1031 27.0879 17.8949 27.6033 17.5281 27.9969C17.1531 28.4344 16.625 28.6531 15.9531 28.6531C14.9062 28.6531 14.1531 28.3156 13.7031 27.6313C13.25 26.9344 13.025 26.025 13.025 24.9031C13.025 24.1094 13.1969 23.3875 13.5375 22.7406C13.8812 22.0844 14.2937 21.4969 14.7812 20.9844C15.2812 20.4594 15.8125 20.0156 16.375 19.6469C16.9375 19.2813 17.4062 18.9813 17.7844 18.75L18.4437 19.85Z"
            />
          </svg>
        </div>
        <div class="card-header pt-4 px-5 flex justify-end"></div>
        <div class="m-8">
          <div
            class="card-body my-4 text-lg"
            :class="{
              'text-gray-800 ': quoteType === 'default',
              'text-gray-300': quoteType === 'defaultDark',
            }"
            v-html="quote.content"
          ></div>
          <div
            v-if="
              quoteShow.comment && quote.comment && quote.comment !== '<p></p>'
            "
            class="m-4"
          >
            <div class="mt-8 mb-4 flex items-center opacity-20">
              <div class="flex-grow h-0.5 bg-gray-400"></div>

              <div
                class="flex justify-center items-center"
                :class="{
                  'text-gray-600': quoteType === 'default',
                  'text-gray-100': quoteType === 'defaultDark',
                }"
              >
                <svg
                  class="w-4 mx-2"
                  viewBox="0 0 50 50"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30.7042 16.6083L11.875 35.4375L10.6438 39.6375L14.7583 38.4479L33.65 19.5562L30.7042 16.6083ZM33.9167 13.3958L36.8625 16.3416L39.6083 13.5958C39.8036 13.4005 39.9133 13.1356 39.9133 12.8593C39.9133 12.5831 39.8036 12.3182 39.6083 12.1229L38.1333 10.65C37.938 10.4547 37.6731 10.345 37.3969 10.345C37.1207 10.345 36.8558 10.4547 36.6604 10.65L33.9188 13.3958H33.9167ZM41.0813 7.70414L42.5542 9.17705C43.5306 10.1538 44.0791 11.4783 44.0791 12.8593C44.0791 14.2404 43.5306 15.5649 42.5542 16.5416L16.9458 42.1521L8.15417 44.6937C7.79581 44.797 7.41629 44.8023 7.05522 44.7089C6.69415 44.6155 6.36478 44.4268 6.10149 44.1627C5.83819 43.8985 5.65063 43.5686 5.55839 43.2072C5.46615 42.8458 5.47261 42.4663 5.57709 42.1083L8.17709 33.2437L33.7188 7.70205C34.6955 6.72564 36.02 6.17712 37.401 6.17712C38.7821 6.17712 40.1066 6.72564 41.0833 7.70205L41.0813 7.70414Z"
                  />
                </svg>
              </div>
              <div class="flex-grow h-0.5 bg-gray-400"></div>
            </div>

            <div
              class="quote-comment text-sm"
              :class="{
                'text-blue-900': quoteType === 'default',
                'text-blue-300': quoteType === 'defaultDark',
              }"
              v-html="quote.comment"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="card-footer py-6 px-5 flex justify-between rounded-b-lg"
        :class="{
          'bg-gray-200': quoteType === 'default',
          'bg-gray-300 ': quoteType === 'defaultDark',
        }"
      >
        <div class="left flex items-end">
          <img
            v-if="quoteShow.cover && cover"
            :src="cover"
            alt="book cover"
            class="w-12"
          />
          <div class="ml-2 text-xs text-gray-400 space-y-1">
            <p v-if="quoteShow.title">书籍：《{{ title }}》</p>
            <p v-if="quoteShow.chapter && quote.chapter">
              章节：{{ quote.chapter }}
            </p>
            <p v-if="quoteShow.location && quote.location">
              页码：{{ quote.location }}
            </p>
          </div>
        </div>
        <div v-if="quoteShow.logo" class="right flex items-end">
          <img
            src="logos/BookMate-logo-font.svg"
            alt="BookMate Logo"
            class="w-20"
          />
        </div>
      </div>
    </div>

    <!-- multiple quotes -->
    <div
      v-if="quotes.length > 0"
      class="p-20"
      :class="{
        'bg-gray-50': quotesType === 'default',
        'bg-gray-500': quotesType === 'defaultDark',
      }"
    >
      <div v-if="quotesShow.metadata" class="flex justify-between relative">
        <!-- <div class="quote-icon absolute -top-8 right-0 opacity-20 text-gray-300">
          <svg
            class="w-60 h-60"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.25 10.9375C6.25 10.5231 6.41462 10.1257 6.70765 9.83265C7.00067 9.53962 7.3981 9.375 7.8125 9.375H42.1875C42.6019 9.375 42.9993 9.53962 43.2924 9.83265C43.5854 10.1257 43.75 10.5231 43.75 10.9375C43.75 11.3519 43.5854 11.7493 43.2924 12.0424C42.9993 12.3354 42.6019 12.5 42.1875 12.5H7.8125C7.3981 12.5 7.00067 12.3354 6.70765 12.0424C6.41462 11.7493 6.25 11.3519 6.25 10.9375ZM21.875 20.3125C21.875 19.8981 22.0396 19.5007 22.3326 19.2076C22.6257 18.9146 23.0231 18.75 23.4375 18.75H42.1875C42.6019 18.75 42.9993 18.9146 43.2924 19.2076C43.5854 19.5007 43.75 19.8981 43.75 20.3125C43.75 20.7269 43.5854 21.1243 43.2924 21.4174C42.9993 21.7104 42.6019 21.875 42.1875 21.875H23.4375C23.0231 21.875 22.6257 21.7104 22.3326 21.4174C22.0396 21.1243 21.875 20.7269 21.875 20.3125ZM21.875 29.6875C21.875 29.2731 22.0396 28.8757 22.3326 28.5826C22.6257 28.2896 23.0231 28.125 23.4375 28.125H42.1875C42.6019 28.125 42.9993 28.2896 43.2924 28.5826C43.5854 28.8757 43.75 29.2731 43.75 29.6875C43.75 30.1019 43.5854 30.4993 43.2924 30.7924C42.9993 31.0854 42.6019 31.25 42.1875 31.25H23.4375C23.0231 31.25 22.6257 31.0854 22.3326 30.7924C22.0396 30.4993 21.875 30.1019 21.875 29.6875ZM6.25 39.0625C6.25 38.6481 6.41462 38.2507 6.70765 37.9576C7.00067 37.6646 7.3981 37.5 7.8125 37.5H42.1875C42.6019 37.5 42.9993 37.6646 43.2924 37.9576C43.5854 38.2507 43.75 38.6481 43.75 39.0625C43.75 39.4769 43.5854 39.8743 43.2924 40.1674C42.9993 40.4604 42.6019 40.625 42.1875 40.625H7.8125C7.3981 40.625 7.00067 40.4604 6.70765 40.1674C6.41462 39.8743 6.25 39.4769 6.25 39.0625Z"
            />
            <path
              d="M11.6687 19.85C11.194 20.1179 10.7301 20.4046 10.2781 20.7094C9.88213 20.9771 9.5192 21.2908 9.19688 21.6438C8.87348 21.9828 8.60749 22.3723 8.40937 22.7969C8.22812 23.2 8.09688 23.7188 8.025 24.3531H8.90625C9.6625 24.3531 10.2531 24.5406 10.6813 24.9219C11.1188 25.2875 11.3375 25.8281 11.3375 26.55C11.3281 27.0879 11.1199 27.6033 10.7531 27.9969C10.3781 28.4344 9.85 28.6531 9.18125 28.6531C8.13125 28.6531 7.37812 28.3156 6.92813 27.6313C6.475 26.9344 6.25 26.025 6.25 24.9031C6.25 24.1094 6.42188 23.3875 6.7625 22.7406C7.10625 22.0844 7.51875 21.4969 8.00625 20.9844C8.50625 20.4594 9.0375 20.0156 9.6 19.6469C10.1625 19.2813 10.6312 18.9813 11.0094 18.75L11.6687 19.85ZM18.4437 19.85C17.969 20.1179 17.5051 20.4046 17.0531 20.7094C16.6571 20.9771 16.2942 21.2908 15.9719 21.6438C15.6188 22.0188 15.35 22.4125 15.1688 22.8156C14.972 23.3076 14.8478 23.8255 14.8 24.3531H15.6813C16.4375 24.3531 17.0281 24.5406 17.4563 24.9219C17.8938 25.2875 18.1125 25.8281 18.1125 26.55C18.1031 27.0879 17.8949 27.6033 17.5281 27.9969C17.1531 28.4344 16.625 28.6531 15.9531 28.6531C14.9062 28.6531 14.1531 28.3156 13.7031 27.6313C13.25 26.9344 13.025 26.025 13.025 24.9031C13.025 24.1094 13.1969 23.3875 13.5375 22.7406C13.8812 22.0844 14.2937 21.4969 14.7812 20.9844C15.2812 20.4594 15.8125 20.0156 16.375 19.6469C16.9375 19.2813 17.4062 18.9813 17.7844 18.75L18.4437 19.85Z"
            />
          </svg>
        </div> -->

        <div class="left flex space-x-6">
          <img
            v-if="quotesShow.cover && cover"
            :src="cover"
            alt="book cover"
            class="w-36"
          />
          <div
            class="flex flex-col justify-between space-y-4"
            :class="{
              'text-gray-800': quotesType === 'default',
              'text-gray-200': quotesType === 'defaultDark',
            }"
          >
            <h1 v-if="quotesShow.title" class="text-3xl font-bold">
              <span class="highlight">《{{ title }}》</span>
            </h1>
            <div class="space-y-2">
              <p v-if="quotesShow.authors && authors.length > 0">
                作者：{{ authors.join("、") }}
              </p>
              <p v-if="quotesShow.translators && translators.length > 0">
                译者：{{ translators.join("、") }}
              </p>
              <p v-if="quotesShow.isbn && isbn">ISBN：{{ isbn }}</p>
            </div>
          </div>
        </div>
        <div v-if="quotesShow.logo" class="right flex items-end">
          <img
            src="logos/BookMate-logo-font.svg"
            alt="BookMate Logo"
            class="w-24"
          />
        </div>
      </div>

      <div v-if="quotesShow.metadata" class="flex items-center m-10">
        <div class="h-0.5 flex-grow bg-gray-300"></div>
        <div
          :class="{
            'text-gray-500': quotesType === 'default',
            'text-white': quotesType === 'defaultDark',
          }"
        >
          <svg
            class="w-8 h-8 mx-4 opacity-50"
            viewBox="0 0 50 50"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.25 10.9375C6.25 10.5231 6.41462 10.1257 6.70765 9.83265C7.00067 9.53962 7.3981 9.375 7.8125 9.375H42.1875C42.6019 9.375 42.9993 9.53962 43.2924 9.83265C43.5854 10.1257 43.75 10.5231 43.75 10.9375C43.75 11.3519 43.5854 11.7493 43.2924 12.0424C42.9993 12.3354 42.6019 12.5 42.1875 12.5H7.8125C7.3981 12.5 7.00067 12.3354 6.70765 12.0424C6.41462 11.7493 6.25 11.3519 6.25 10.9375ZM21.875 20.3125C21.875 19.8981 22.0396 19.5007 22.3326 19.2076C22.6257 18.9146 23.0231 18.75 23.4375 18.75H42.1875C42.6019 18.75 42.9993 18.9146 43.2924 19.2076C43.5854 19.5007 43.75 19.8981 43.75 20.3125C43.75 20.7269 43.5854 21.1243 43.2924 21.4174C42.9993 21.7104 42.6019 21.875 42.1875 21.875H23.4375C23.0231 21.875 22.6257 21.7104 22.3326 21.4174C22.0396 21.1243 21.875 20.7269 21.875 20.3125ZM21.875 29.6875C21.875 29.2731 22.0396 28.8757 22.3326 28.5826C22.6257 28.2896 23.0231 28.125 23.4375 28.125H42.1875C42.6019 28.125 42.9993 28.2896 43.2924 28.5826C43.5854 28.8757 43.75 29.2731 43.75 29.6875C43.75 30.1019 43.5854 30.4993 43.2924 30.7924C42.9993 31.0854 42.6019 31.25 42.1875 31.25H23.4375C23.0231 31.25 22.6257 31.0854 22.3326 30.7924C22.0396 30.4993 21.875 30.1019 21.875 29.6875ZM6.25 39.0625C6.25 38.6481 6.41462 38.2507 6.70765 37.9576C7.00067 37.6646 7.3981 37.5 7.8125 37.5H42.1875C42.6019 37.5 42.9993 37.6646 43.2924 37.9576C43.5854 38.2507 43.75 38.6481 43.75 39.0625C43.75 39.4769 43.5854 39.8743 43.2924 40.1674C42.9993 40.4604 42.6019 40.625 42.1875 40.625H7.8125C7.3981 40.625 7.00067 40.4604 6.70765 40.1674C6.41462 39.8743 6.25 39.4769 6.25 39.0625Z"
            />
            <path
              d="M11.6687 19.85C11.194 20.1179 10.7301 20.4046 10.2781 20.7094C9.88213 20.9771 9.5192 21.2908 9.19688 21.6438C8.87348 21.9828 8.60749 22.3723 8.40937 22.7969C8.22812 23.2 8.09688 23.7188 8.025 24.3531H8.90625C9.6625 24.3531 10.2531 24.5406 10.6813 24.9219C11.1188 25.2875 11.3375 25.8281 11.3375 26.55C11.3281 27.0879 11.1199 27.6033 10.7531 27.9969C10.3781 28.4344 9.85 28.6531 9.18125 28.6531C8.13125 28.6531 7.37812 28.3156 6.92813 27.6313C6.475 26.9344 6.25 26.025 6.25 24.9031C6.25 24.1094 6.42188 23.3875 6.7625 22.7406C7.10625 22.0844 7.51875 21.4969 8.00625 20.9844C8.50625 20.4594 9.0375 20.0156 9.6 19.6469C10.1625 19.2813 10.6312 18.9813 11.0094 18.75L11.6687 19.85ZM18.4437 19.85C17.969 20.1179 17.5051 20.4046 17.0531 20.7094C16.6571 20.9771 16.2942 21.2908 15.9719 21.6438C15.6188 22.0188 15.35 22.4125 15.1688 22.8156C14.972 23.3076 14.8478 23.8255 14.8 24.3531H15.6813C16.4375 24.3531 17.0281 24.5406 17.4563 24.9219C17.8938 25.2875 18.1125 25.8281 18.1125 26.55C18.1031 27.0879 17.8949 27.6033 17.5281 27.9969C17.1531 28.4344 16.625 28.6531 15.9531 28.6531C14.9062 28.6531 14.1531 28.3156 13.7031 27.6313C13.25 26.9344 13.025 26.025 13.025 24.9031C13.025 24.1094 13.1969 23.3875 13.5375 22.7406C13.8812 22.0844 14.2937 21.4969 14.7812 20.9844C15.2812 20.4594 15.8125 20.0156 16.375 19.6469C16.9375 19.2813 17.4062 18.9813 17.7844 18.75L18.4437 19.85Z"
            />
          </svg>
        </div>
        <div class="h-0.5 flex-grow bg-gray-300"></div>
      </div>
      <div v-for="item of quotesReArrange" :key="item.chapter">
        <div v-if="item.quotes.length > 0">
          <div
            v-if="quotesShow.chapter && quotesShow.chapterType === 'heading'"
          >
            <h2
              class="font-bold text-xl py-8"
              :class="{
                'text-gray-800': quotesType === 'default',
                'text-gray-300': quotesType === 'defaultDark',
              }"
            >
              <span class="highlight">{{ item.chapter }}</span>
            </h2>
          </div>

          <div
            ref="quoteCardsContainer"
            class="quote-cards-container"
            :class="gridLayout"
            :style="{
              width: `${quotesWidth * quotesCols + quotesCols - 1}rem`,
            }"
          >
            <div
              v-for="quote of item.quotes"
              :key="quote._id"
              class="quote-card mb-4"
              :style="{ width: `${quotesWidth}rem` }"
            >
              <div
                class="card-main relative border border-gray-300"
                :class="{
                  'bg-gray-100': quotesType === 'default',
                  'bg-gray-600': quotesType === 'defaultDark',
                  'rounded-t-lg':
                    quotesShow.comment &&
                    quote.comment &&
                    quote.comment !== '<p></p>',
                  'rounded-lg':
                    !quotesShow.comment ||
                    !quote.comment ||
                    quote.comment === '<p></p>',
                }"
              >
                <div
                  class="card-header pt-4 px-5 flex items-center space-x-2"
                  :class="{
                    'text-gray-800 ': quotesType === 'default',
                    'text-gray-300': quotesType === 'defaultDark',
                  }"
                >
                  <div
                    v-if="
                      (quote.chapter && quotesShow.chapter) ||
                      (quote.location && quotesShow.location)
                    "
                  >
                    <svg
                      class="w-4"
                      viewBox="0 0 50 50"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6667 8.33329C16.1142 8.33329 15.5842 8.55279 15.1935 8.94349C14.8028 9.33419 14.5834 9.86409 14.5834 10.4166V41.6666L20.7875 36.0062C21.9389 34.9557 23.4414 34.3733 25 34.3733C26.5587 34.3733 28.0611 34.9557 29.2125 36.0062L35.4167 41.6666V10.4166C35.4167 9.86409 35.1972 9.33419 34.8065 8.94349C34.4158 8.55279 33.8859 8.33329 33.3334 8.33329H16.6667ZM16.6667 4.16663H33.3334C34.991 4.16663 36.5807 4.82511 37.7528 5.99721C38.9249 7.16931 39.5834 8.75902 39.5834 10.4166V41.6666C39.5832 42.4744 39.3482 43.2647 38.907 43.9413C38.4658 44.618 37.8375 45.1518 37.0985 45.4778C36.3594 45.8039 35.5415 45.9081 34.7444 45.7777C33.9472 45.6474 33.2051 45.2881 32.6084 44.7437L26.4042 39.0833C26.0204 38.7331 25.5196 38.539 25 38.539C24.4805 38.539 23.9797 38.7331 23.5959 39.0833L17.3917 44.7437C16.795 45.2881 16.0529 45.6474 15.2557 45.7777C14.4585 45.9081 13.6406 45.8039 12.9016 45.4778C12.1625 45.1518 11.5342 44.618 11.093 43.9413C10.6519 43.2647 10.4169 42.4744 10.4167 41.6666V10.4166C10.4167 8.75902 11.0752 7.16931 12.2473 5.99721C13.4194 4.82511 15.0091 4.16663 16.6667 4.16663Z"
                      />
                    </svg>
                  </div>
                  <div class="text-sm">
                    <span
                      v-if="
                        quote.chapter &&
                        quotesShow.chapter &&
                        quotesShow.chapterType !== 'heading'
                      "
                    >
                      {{ quote.chapter }}
                    </span>
                    <span
                      v-if="
                        quote.chapter &&
                        quotesShow.chapter &&
                        quote.location &&
                        quotesShow.location &&
                        quotesShow.chapterType !== 'heading'
                      "
                    >
                      -
                    </span>
                    <span v-if="quote.location && quotesShow.location"
                      >页码：{{ quote.location }}</span
                    >
                  </div>
                </div>
                <div class="p-8">
                  <div
                    class="card-body my-4 text-lg"
                    :class="{
                      'text-gray-800 ': quotesType === 'default',
                      'text-gray-300': quotesType === 'defaultDark',
                    }"
                    v-html="quote.content"
                  ></div>
                </div>
              </div>
              <div
                v-if="
                  quotesShow.comment &&
                  quote.comment &&
                  quote.comment !== '<p></p>'
                "
                class="card-footer p-8 flex space-x-4 rounded-b-lg"
                :class="{
                  'bg-gray-200': quotesType === 'default',
                  'bg-gray-400': quotesType === 'defaultDark',
                }"
              >
                <div
                  :class="{
                    'text-blue-900': quotesType === 'default',
                    'text-blue-800': quotesType === 'defaultDark',
                  }"
                >
                  <svg
                    class="w-4 opacity-60"
                    viewBox="0 0 50 50"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.7042 16.6083L11.875 35.4375L10.6438 39.6375L14.7583 38.4479L33.65 19.5562L30.7042 16.6083ZM33.9167 13.3958L36.8625 16.3416L39.6083 13.5958C39.8036 13.4005 39.9133 13.1356 39.9133 12.8593C39.9133 12.5831 39.8036 12.3182 39.6083 12.1229L38.1333 10.65C37.938 10.4547 37.6731 10.345 37.3969 10.345C37.1207 10.345 36.8558 10.4547 36.6604 10.65L33.9188 13.3958H33.9167ZM41.0813 7.70414L42.5542 9.17705C43.5306 10.1538 44.0791 11.4783 44.0791 12.8593C44.0791 14.2404 43.5306 15.5649 42.5542 16.5416L16.9458 42.1521L8.15417 44.6937C7.79581 44.797 7.41629 44.8023 7.05522 44.7089C6.69415 44.6155 6.36478 44.4268 6.10149 44.1627C5.83819 43.8985 5.65063 43.5686 5.55839 43.2072C5.46615 42.8458 5.47261 42.4663 5.57709 42.1083L8.17709 33.2437L33.7188 7.70205C34.6955 6.72564 36.02 6.17712 37.401 6.17712C38.7821 6.17712 40.1066 6.72564 41.0833 7.70205L41.0813 7.70414Z"
                    />
                  </svg>
                </div>
                <div
                  class="quote-comment text-sm"
                  :class="{
                    'text-blue-900': quotesType === 'default',
                    'text-blue-800': quotesType === 'defaultDark',
                  }"
                  v-html="quote.comment"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js';
import Masonry from 'masonry-layout';

export default {
  props: {
    quoteWidth: {
      type: Number,
      default: () => +localStorage.getItem('shareQuoteAsImageWidth'),
    },
    quotesWidth: {
      type: Number,
      default: () => +localStorage.getItem('shareQuotesAsImageWidth'),
    },
    quotesCols: {
      type: Number,
      default: () => +localStorage.getItem('shareQuotesAsImageCols'),
    },
    cover: {
      type: String,
    },
    title: {
      type: String,
    },
    isbn: {
      type: Number,
    },
    authors: {
      type: Array,
      default: () => [],
    },
    translators: {
      Array,
      default: () => [],
    },
    quote: {
      Object,
    },
    quotes: {
      type: Array,
      default: () => [],
    },
    quoteType: {
      type: String,
      default: () => localStorage.getItem('shareQuoteAsImageType'),
    },
    quotesType: {
      type: String,
      default: () => localStorage.getItem('shareQuotesAsImageType'),
    },
    quoteShow: {
      type: Object,
      default: () => JSON.parse(localStorage.getItem('shareQuoteAsImageShow')),
    },
    quotesLayout: {
      type: String,
      default: () => localStorage.getItem('shareQuotesAsImageLayout'),
    },
    quotesShow: {
      type: Object,
      default: () => JSON.parse(localStorage.getItem('shareQuotesAsImageShow')),
    },
  },
  data() {
    return {
      imageBase: process.env.VUE_APP_QUOTE_IMAGES_BASE,
      masonryControllers: [],
    };
  },
  computed: {
    quotesReArrange() {
      if (this.quotesShow.chapterType === 'heading') {
        return this.quotes;
      }
      const quotesAssemble = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of this.quotes) {
        if (item.quotes.length > 0) {
          quotesAssemble.push(...item.quotes);
        }
      }
      return [
        {
          chapter: '合集',
          quotes: quotesAssemble,
        },
      ];
    },
    gridLayout() {
      if (this.quotesLayout === 'grid') {
        return `grid grid-cols-${this.quotesCols} gap-x-4`;
      }
      return '';
    },
  },
  watch: {
    // quotesWidth() {
    //   this.reLayout();
    // },
    // quotesCols() {
    //   this.reLayout();
    // },
    quotesLayout: {
      handler(val, oldVal) {
        if (oldVal === 'grid' && val === 'masonry') {
          this.$nextTick(() => {
            this.setMasonryControllers();
          });
        } else if (oldVal === 'masonry' && val === 'grid') {
          this.masonryControllers.forEach((masonry) => {
            masonry.destroy();
            this.$nextTick(() => {
              this.setQuotesWidth();
            });
          });
        }
      },
    },
    // quotesShow: {
    //   handler() {
    //     if (this.quotesLayout === "masonry") {
    //       this.$nextTick(() => {
    //         this.masonryControllers.forEach((masonry) => {
    //           masonry.layout();
    //         });
    //       });
    //     }
    //   },
    //   deep: true,
    // },
  },
  methods: {
    setQuotesWidth() {
      const doms = this.$refs.quoteCardsContainer;
      doms.forEach((dom) => {
        // eslint-disable-next-line no-param-reassign
        dom.style.width = `${
          this.quotesWidth * this.quotesCols + this.quotesCols - 1
        }rem`;
      });
    },
    setMasonryControllers() {
      const doms = this.$refs.quoteCardsContainer;

      doms.forEach((dom) => {
        const masonry = new Masonry(dom, {
          itemSelector: '.quote-card',
          gutter: 14,
          // horizontalOrder: true,
        });
        this.masonryControllers.push(masonry);
      });
    },
    reLayout() {
      if (this.quotesLayout === 'masonry') {
        this.$nextTick(() => {
          this.masonryControllers.forEach((masonry) => {
            masonry.layout();
          });
        });
      }
    },
  },
  updated() {
    if (this.quotes.length > 0 && this.quotesLayout === 'masonry') {
      this.$nextTick(() => {
        this.masonryControllers.forEach((masonry) => {
          masonry.layout();
        });
      });
    }
  },
  mounted() {
    hljs.highlightAll();
    // this.$nextTick(() => {
    //   const images = document.getElementsByClassName('cotent-image');
    //   const imagesNum = images.length;
    //   console.log(images);
    // });

    if (this.quotes.length > 0 && this.quotesLayout === 'masonry') {
      const container = this.$refs.shareQuotesContainer;
      const images = container.querySelectorAll('.content-image');

      const imagesNum = images.length;
      let imagesLoadedNum = 0;
      if (imagesNum > 0) {
        images.forEach((image) => {
          // eslint-disable-next-line no-param-reassign
          image.addEventListener('load', () => {
            imagesLoadedNum += 1;
            if (imagesLoadedNum === imagesNum) this.setMasonryControllers();
          });
        });
      } else {
        this.setMasonryControllers();
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.highlight {
  text-decoration: none;
  box-shadow: inset 0 -0.5em 0 rgba(243, 238, 102, 0.8);
  color: inherit;
}
</style>
