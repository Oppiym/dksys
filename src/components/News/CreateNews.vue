<template>
  <v-card flat>
    <v-snackbar v-model="snackbar" absolute top right color="success">
      <span>Мероприятие создано!</span>
      <v-icon dark>mdi-checkbox-marked-circle</v-icon>
    </v-snackbar>
    <v-form ref="form" @submit.prevent="onCreateEvent">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.title"
              :rules="rules.title"
              color="purple darken-2"
              label="Название мероприятия"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <h4>Дата и время мероприятия</h4>
            <v-date-picker v-model="form.date"></v-date-picker>
            <p>{{ form.date }}</p>
            <v-time-picker
              v-model="form.time"
              format="24hr"
              scrollable
              min="9:30"
              max="22:15"
            ></v-time-picker>
            <p>{{ form.time }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.location"
              :rules="rules.location"
              color="blue darken-2"
              label="Место проведения"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.imageURL"
              color="blue darken-2"
              label="Ссылка на картинку"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-img height="150px" :src="form.imageURL"></v-img>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.description" color="teal">
              <template v-slot:label>
                <div>
                  Описание
                </div>
              </template>
            </v-textarea>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="form.typeOfEvent"
              :items="eventTypes"
              :rules="rules.typeOfEvent"
              color="pink"
              label="Тип мероприятия"
              required
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-checkbox v-model="form.paid" color="green">
              <template v-slot:label>
                <div @click.stop="">
                  Мероприятие платное?
                </div>
              </template>
            </v-checkbox>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn text @click="resetForm">Отмена</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="!formIsValid" text color="primary" type="submit"
          >Создать мероприятие</v-btn
        >
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    const defaultForm = Object.freeze({
      title: "",
      location: "",
      description: "",
      typeOfEvent: "",
      imageURL: "",
      date: "",
      time: "",
      paid: false
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        typeOfEvent: [val => (val || "").length > 0 || "Необходимо заполнить"],
        title: [val => (val || "").length > 0 || "Необходимо заполнить"]
      },
      eventTypes: ["Концерт", "Конкурс", "Фестиваль", "Мастеркласс", "Лекция"],
      snackbar: false,
      defaultForm
    };
  },

  computed: {
    formIsValid() {
      return this.form.title && this.form.location && this.form.typeOfEvent;
    },
    /*subDate() {
      const goodDate = this.form.date + " " + this.form.time;
      console.log(goodDate);
      console.log(typeof goodDate);
      return goodDate;
  }*/
  },

  methods: {
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    onCreateEvent() {
      if (!this.formIsValid) {
        return;
      }
      const eventData = {
        title: this.form.title,
        location: this.form.location,
        description: this.form.description,
        imageURL: this.form.imageURL,
        date: this.subDate
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/events");
      this.snackbar = true;
      this.resetForm();
    }
  }
};
</script>
