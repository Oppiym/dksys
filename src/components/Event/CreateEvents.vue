<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 >
          <h2>Добавить мероприятие</h2>
      </v-flex>
    </v-layout>
    <v-layout row >
        <v-flex xs12>
            <form>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                          name="title"
                          label="Название"
                          id="title"
                          required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                          name="location"
                          label="Место"
                          id="location"
                          required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                          name="imageURL"
                          label="Картинка"
                          id="imageURL"
                          required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <img :src="imageURL">
                    </v-flex>
                </v-layout>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field
                          name="description"
                          label="Описание"
                          id="description"
                          multi-line
                          required
                        ></v-text-field>
                    </v-flex>

                </v-layout>
                <v-layout row >
                    <v-flex xs12 sm6 offset-sm3>
                        <v-btn color="primary">Создать мероприятие</v-btn>
                        </v-text-field>
                    </v-flex>
                </v-layout>
            </form>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            location:'',
            imageURL:'',
            description:''
        }
    }
}

</script>
