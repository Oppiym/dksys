<template>
<v-card flat>
  <v-snackbar v-model="snackbar" absolute top right color="success">
    <span>Мероприятие создано!</span>
    <v-icon dark>mdi-checkbox-marked-circle</v-icon>
  </v-snackbar>
  <v-form ref="form" @submit.prevent="onCreateEvent">
    <v-container fluid>
      <v-row>
        <v-col xs="12" sm="6" md="4">
          <v-text-field v-model="form.title" :rules="rules.title" color="purple darken-2" label="Название мероприятия" required></v-text-field>
          <v-select v-model="form.typeOfEvent" :items="eventTypes" :rules="rules.typeOfEvent" color="pink" label="Тип мероприятия" required></v-select>
        </v-col>
        <v-col xs="12" sm="6" md="4">
          <v-select v-model="form.location" :items="eventPlaces" :rules="rules.location" color="blue darken-2" label="Место проведения" required></v-select>
        </v-col>

        <v-col xs="12" sm="6" md="4">
          <h4>Дата и время мероприятия</h4>
          <v-menu v-model="datepick" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field v-model="form.date" label="Дата" prepend-icon="event" readonly v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="form.date" locale="russian" @input="datepick = false" min-width="290px"></v-date-picker>
          </v-menu>

          <v-menu ref="timepick" v-model="timepick2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field v-model="form.time" label="Время" prepend-icon="access_time" readonly v-on="on"></v-text-field>
            </template>
            <v-time-picker v-if="timepick2" v-model="form.time" format="24hr" full-width @click:minute="$refs.timepick.save(form.time)"></v-time-picker>
          </v-menu>
        </v-col>

        <v-col xs="12" sm="6" md="4">
          <v-text-field v-model="form.imageURL" color="blue darken-2" label="Ссылка на картинку" required></v-text-field>
          <v-img height="150px" :src="form.imageURL"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-flex xs="12" sm="6" md="4">
          <v-textarea v-model="form.description" color="teal">
            <template v-slot:label>
              <div>
                Описание
              </div>
            </template>
          </v-textarea>
        </v-flex>
      </v-row>
    </v-container>

    <v-card-actions>
      <v-btn text @click="resetForm">Отмена</v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!formIsValid" text color="primary" type="submit">Создать мероприятие</v-btn>
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
      date: new Date().toISOString().substring(10, 0),
      time: null,
      paid: false
    });

    return {
      form: Object.assign({}, defaultForm),
      rules: {
        typeOfEvent: [val => (val || "").length > 0 || "Необходимо заполнить"],
        title: [val => (val || "").length > 0 || "Необходимо заполнить"]
      },
      eventTypes: [
        "Концерт",
        "Выставка",
        "Конкурс",
        "Фестиваль",
        "Мастеркласс",
        "Лекция"
      ],
      eventPlaces: ["Большой зал", "Малый зал", "Фойе", "Холл"],
      snackbar: false,
      datepick: false,
      timepick2: false,
      defaultForm
    };
  },

  computed: {
    formIsValid() {
      return this.form.title && this.form.location && this.form.typeOfEvent;
    }
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
        date: this.form.date,
        time: this.form.time
      };
      this.$store.dispatch("createEvent", eventData);
      this.$router.push("/events");
      this.snackbar = true;
      this.resetForm();
    }
  }
};
</script>
