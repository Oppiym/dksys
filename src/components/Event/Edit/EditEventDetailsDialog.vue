<template>
  <v-row justify="center">
    <v-btn
      color="primary"
      dark
      @click.stop="dialog = true"
      fab
    >
      <v-icon>edit</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="350"
    >
      <v-card>
        <v-card-title class="headline">Редактировать</v-card-title>

        <v-card-text>
            <v-text-field
              v-model="editedTitle"
              color="purple darken-2"
              label="Название мероприятия"
              required
              ></v-text-field>
            <v-textarea
            v-model="editedDescription"
             color="teal">
            </v-textarea>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            text
            @click="dialog = false"
          >
            Отменить
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="onSaveChanges"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
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
        editedTitle: this.event.title,
        editedDescription: this.event.description
      }
    },
    methods:{
        onSaveChanges(){
            if (this.editedTitle.trim()===''||this.editedDescription.trim()===''){
                return
            }
            this.dialog = false
            this.$store.dispatch('updateEventData',{
                id: this.event.id,
                title : this.editedTitle,
                description : this.editedDescription

            })
        }
    }
}
</script>

<style lang="css" scoped>
</style>
