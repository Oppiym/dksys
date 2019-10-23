<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 class="mb-2">
        <v-btn large class="primary" to="/events">Посмотреть мероприятия</v-btn>
      </v-flex>
      <v-flex xs12 class="mb-2">
        <v-btn large class="primary" to="/events/new"
          >Создать мероприятие</v-btn
        >
      </v-flex>
    </v-layout>
    <v-layout xs12 row wrap>
        <v-flex xs12>
        <v-progress-circular
      indeterminate
          color="primary"

          class="primary-text"
          :width="7"
          :size="70"
      v-if="loading"
    ></v-progress-circular>

</v-flex>

    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel v-if="!loading">
          <v-carousel-item
            v-for="event in events"
            :src="event.imageURL"
            :key="event.id"
            @click="onLoadEvent(event.id)"
          >
            <div class="title">
              {{ event.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    events() {
      return this.$store.getters.featuredEvents;
  },
  loading () {
      return this.$store.getters.loading
  }
  },
  methods: {
    onLoadEvent(id) {
      this.$router.push("/events/" + id);
    }
  }
};
</script>
<style>

</style>
