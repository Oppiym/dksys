<template lang="html">
  <v-dialog
    v-model="dialog"
    scrollable fullscreen
    persistent :overlay="false"
    max-width="500px"
    transition="dialog-transition"
  >
      <v-btn fab accent slot = "activator" color="primary">
          <v-icon>edit</v-icon></v-btn>
  </v-dialog>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>
