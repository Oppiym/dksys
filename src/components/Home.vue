<template>
  <v-container>
    <v-layout row wrap>
        <v-flex xs12 sm6>
            <v-btn large class="primary"
            to="/events">Посмотреть мероприятия</v-btn>
        </v-flex>
        <v-flex xs12 sm6>
            <v-btn large class="primary"
            to="/events/new">Создать мероприятие</v-btn>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-carousel>
            <v-carousel-item
                 src="src"
            ></v-carousel-item>
        <v-carousel>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  })
};
</script>
