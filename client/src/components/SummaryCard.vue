 <template>
  <div class="summary-card rounded-lg outline-none" tabindex="0">
    <div class="summary-content border rounded-lg">
      <div class="card-header-container h-14 flex">
        <div class="card-header pt-3 px-3 flex-grow hidden justify-between items-start ">
          <div class="left"></div>
          <div class="right flex items-center space-x-1.5">
            <button class="opacity-30">
              <img
                src="@/assets/icons/minus-rectangle.svg"
                alt="minimize icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/expand-rectangle.svg"
                alt="show more icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/large-rectangle.svg"
                alt="maximize icon"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
      <div class="card-body mx-8" v-html="summary.content"></div>
      <div class="card-footer-container h-14 flex items-end">
        <div class="card-footer pb-3 px-3 flex-grow hidden justify-between items-end">
          <div class="left">
            <button class="opacity-30 flex items-center">
              <img
                src="@/assets/icons/bookmark.svg"
                alt="bookmark icon"
                class="w-5 h-5"
              />
              <span class="text-sm font-bold">2</span>
            </button>
          </div>
          <div class="right flex items-center space-x-1.5">
            <button class="opacity-30">
              <img
                src="@/assets/icons/add.svg"
                alt="add icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/edit.svg"
                alt="edit icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/copy.svg"
                alt="copy icon"
                class="w-5 h-5"
              />
            </button>
            <button class="opacity-30">
              <img
                src="@/assets/icons/export.svg"
                alt="export icon"
                class="w-5 h-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['summary'],
};
</script>

<style lang="scss" scoped>
.summary-card:focus {
  box-shadow: 0px 8px 32px rgba(43, 41, 46, 0.15);
  .card-header,
  .card-footer {
    display: flex;
  }
}
</style>
