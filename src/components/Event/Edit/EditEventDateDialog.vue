<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
    >
      Изменить дату
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">Редактировать дату</v-card-title>
 <v-divider></v-divider>
 <v-layout row wrap>
     <v-flex xs12>
        <v-date-picker v-model="editableDate" :landscape="true" :reactive="true" style="width:100%">
            <template scope ="{save, cancel}">
                <v-btn @click.native="dialog=false">Отмена</v-btn>
                <v-btn @click.native="onSaveChanges">Сохранить</v-btn>
            </template>

        </v-date-picker>
     </v-flex>
 </v-layout>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:['event'],
    data () {
      return {
        dialog: false,
        editableDate: null
      }
    },
    methods:{
        onSaveChanges(){
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editableDate)

            this.dialog = false
            this.$store.dispatch('updateEventData',{
                id: this.event.id,
                date:newDate

            })
        }
    },
    created(){
        this.editableDate = new Date(this.event.date)
    }
}
</script>

<style lang="css" scoped>
</style>
