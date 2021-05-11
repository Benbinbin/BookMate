<template>
  <div v-html="summary.content"></div>
</template>

<script>
export default {
  props: {
    summary: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
