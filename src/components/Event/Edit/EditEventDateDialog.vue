<template>
  <v-row justify="center">
    <v-dialog
       ref="dialog"
       v-model="modal"
       :return-value.sync="date"
       persistent
       width="290px"
     >
       <template v-slot:activator="{ on }">
         <v-text-field
           v-model="date"

           label="Изменить дату"
           prepend-icon="event"
           readonly
           v-on="on"
         ></v-text-field>
       </template>
       <v-date-picker v-model="date" scrollable locale="russian">
         <v-spacer></v-spacer>
         <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
         <v-btn text color="primary" @click="onSaveChanges ">OK</v-btn>
       </v-date-picker>
     </v-dialog>
  </v-row>
</template>

<script>
export default {
    props:['event'],
    data () {
      return {
        dialog: false,
        date: new Date().toISOString().substr(0, 10),
         modal: false
      }
    },
    methods:{
        onSaveChanges(){
            this.dialog = false
            this.$store.dispatch('updateEventData',{
                id: this.event.id,
                date:this.date

            })
        }
    },
    created(){
        console.log(this.event.date, typeof this.event.date)
    }
}
</script>

<style lang="css" scoped>
</style>
