<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Мероприятия</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Коллективы</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Залы и аудитории</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Подать заявление</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/contacts" @click="">
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Контакты</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action> <v-icon>mdi-home</v-icon> </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Войти</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />
      <v-spacer></v-spacer>
      <v-img
        :src="require('@/assets/logo.png')"
        class="mr-5"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title>Культурный Центр Москворечье</v-toolbar-title>
      <v-btn
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        class="ml-0 hidden-sm-and-down"
        flat
        @click="onClick($event, item)"
      >
        {{ link.text }}
      </v-btn>
      <v-spacer />
      <v-text-field
        append-icon="mdi-magnify"
        flat
        hide-details
        solo-inverted
        style="max-width: 300px;"
      />
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019 Oppiym</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
