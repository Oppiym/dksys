<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="indigo" dark>
      <v-img
        :src="require('@/assets/logo.png')"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />
      <v-img
        :src="require('@/assets/logo.png')"
        contain
        height="48"
        width="48"
        max-width="48"
        @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title>Культурный Центр Москворечье</v-toolbar-title>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-items v-for="item in menuItems" :key="item.title">
        <v-btn flat color="indigo" @click="onClick($event, item)">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
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
    drawer: false,
    menuItems: [
      { icon: "supervisor_account", title: "Мероприятия" },
      { icon: "room", title: "Добавить мероприятие" },
      { icon: "person", title: "Профиль" },
      { icon: "face", title: "Зарегестрироваться" },
      { icon: "lock_open", title: "Войти" }
    ]
  })
};
</script>
