<template lang="html">
  <v-alert :value="true" @input="onClose">
{{text}}
  </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods:{
        onClose(){
            this.$emit('dismissed')
        }
    }
}
</script>

<style lang="css" scoped>
</style>
