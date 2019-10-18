<template>
  <v-container>
    <v-layout row wrap class="mb-2">
        <v-flex xs12 class="mb-2">
            <v-btn large class="primary"
            to="/events">Посмотреть мероприятия</v-btn>
        </v-flex>
        <v-flex xs12 class="mb-2">
            <v-btn large class="primary"
            to="/events/new">Создать мероприятие</v-btn>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12>
         <v-carousel>
            <v-carousel-item
                v-for="event in events"
                :src="event.imageURL"
                :key="event.id"
                @click="onLoadEvent(event.id)">
                <div class="title" >
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
  data: () => ({
     }),
    computed:{
        events(){
            return this.$store.getters.featuredEvents
        }
    },
  methods:{
      onLoadEvent(id){
          this.$router.push('/events/' + id);
      }
  }
};
</script>
<style scoped>
.title {
    position: absolute;
    bottom: 50px;
    background-color: red;
}
</style>
