<template>
<v-app id="inspire">
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list dense>
      <v-list-item v-for="item in menuItems" :key="item.title" :to="item.link">
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
    <v-list-item v-if ="userIsAuthenticated"
    @click="onLogout">
        <v-list-item-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Выход</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app clipped-left color="indigo" dark>
    <router-link to="/">
      <v-img :src="require('@/assets/logo.png')" contain height="48" width="48" max-width="48" @click="$vuetify.goTo(0)" />
    </router-link>

    <v-toolbar-title>
      <router-link to="/" tag="span" style="cursor: pointer">
        Культурный Центр Москворечье
      </router-link>
    </v-toolbar-title>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
      <v-btn text v-if ="userIsAuthenticated"
      @click="onLogout">
        <v-icon left>exit_to_app</v-icon>
        Выход
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>

  <v-content>
    <router-view></router-view>
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

  }),
  computed: {
    menuItems() {
      let menuItems = [{
          icon: "face",
          title: "Зарегистрироваться",
          link: "/signup"
        },
        {
          icon: "lock_open",
          title: "Войти",
          link: "/signin"
        }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [{
            icon: "supervisor_account",
            title: "Мероприятия",
            link: "/events"
          },
          {
            icon: "room",
            title: "Добавить мероприятие",
            link: "/events/new"
          },
          {
            icon: "person",
            title: "Профиль",
            link: "/profile"
          }
        ]
      }
      return menuItems

    },
    userIsAuthenticated() {
      return this.$store.getters.user.id !== null && this.$store.getters.user.id !== undefined
    }
},
methods: {
    onLogout() {
        this.$store.dispatch ('logout')
        this.$router.push("/");
    }
}

};
</script>
