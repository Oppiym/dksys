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
                :key="event.id">
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
      events:[{ imageURL: 'http://s7606.pcdn.co/wp-content/uploads/2016/04/New-Yorker-1_tcm87-19419.jpg', id: 'fdfsfd',title:'meetup in new york' },
  { imageURL: 'https://i3.photo.2gis.com/images/branch/1/140737493066473_b179.jpg', id: 'fd56d',title:'meetup ' }
]
  })
};
</script>
<style scoped>
.title {
    position: absolute;
    bottom: 50px;
    background-color: red;
}
</style>
