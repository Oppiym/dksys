<template>
<v-container class="fill-height" fluid>
  <v-row align="center" justify="center">
      <v-layout row wrap v-if="error">
          <v-flex xs12 sm6 offset-sm3 >
              <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
          </v-flex>
      </v-layout>
    <v-flex sx="12" sm="8">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Зарегистрироваться</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-form @submit.prevent="onSingUp">
          <v-card-text>
            <v-text-field label="Mail" name="Mail" prepend-icon="person" id="email" v-model="email" type="email" required :rules="[rules.email]"></v-text-field>

            <v-text-field id="password" label="Пароль" name="password" prepend-icon="lock" type="password" v-model="password" required></v-text-field>
            <v-text-field id="confirmPassword" label="Подтвердите пароль" name="confirmPassword" prepend-icon="lock" type="password" v-model="confirmPassword" :rules="[comparePasswords]" required></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error">Зайти через mos.ru</v-btn>
            <v-btn color="primary" type="submit" :disabled="loading" :loading="loading">Регистрация
            <span slot="loader" class="custom-loader"> <v-icon>cached</v-icon> </span></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-row>
</v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Неверный e-mail";
        }
      }
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Пароли не совпадают' : true
    },
    user() {
      return this.$store.getters.user
  },
    error(){
        return this.$store.getters.error
    },
    loading(){
        return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSingUp() {
      this.$store.dispatch('signUserUp', {
        email: this.email,
        password: this.password
      })
  },
    onDismissed (){
        console.log ('Dismissed Alert!')
        this.$store.dispatch('clearError')
    }
  }

}
</script>
<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
