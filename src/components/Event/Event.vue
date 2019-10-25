<template lang="html">
  <v-container grid-list-xs,sm,md,lg,xl>
    <v-layout row wrap>
      <v-card>
        <v-card-title primary-title>
          <h4>{{ event.title }}</h4>
          <template v-if='true'>
              <v-spacer></v-spacer>
              <app-edit></app-edit>
          </template>
        </v-card-title>
        <v-img height="400px" :src="event.imageURL"> </v-img>
        <v-card-text>
          <div class="info--text">{{ event.location }}</div>
          <div>
            {{ event.date | date }}
            {{ event.time }}
          </div>
          <div>
            {{ event.description }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">Зарегистрироваться</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    event() {
      return this.$store.getters.loadedEvent(this.id);
  },
    userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
  };
</script>

<style lang="css" scoped></style>
