<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Sign In</v-card-title>
      <v-form ref="loginForm" lazy-validation @submit.prevent="submit">
        <v-card-text>
          <v-alert v-if="alert" :type="alert.type" :value="true">{{
            alert.message
          }}</v-alert>
          <v-text-field
            v-model="login.username"
            label="Username"
            :rules="rules.username"
            autofocus
          />
          <v-text-field
            v-model="login.password"
            label="Password"
            type="password"
            :rules="rules.password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" :loading="loading" :disabled="loading">
            Submit
          </v-btn>
          <v-spacer />
          <v-btn text @click="$router.push('/sign-up')">
            Don't have an account yet?
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "LogIn",
  layout: "full-screen",
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      alert: null,
      loading: false,
      rules: {
        username: [(v) => !!v || "Username required"],
        password: [(v) => !!v || "Password required"],
      },
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.go(-1);
    }
  },
  methods: {
    async submit() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      this.alert = null;
      this.loading = true;
      try {
        const response = await this.$auth.loginWith("cookie", {
          data: this.login,
        });
        this.$auth.setUser(response.data);
        this.alert = {
          type: "success",
          message: "You are now logged in",
        };
        setTimeout(() => this.$router.push("/"), 1000);
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.data) {
          this.alert = {
            type: "error",
            message: error.response.data.message || error.reponse.status,
          };
        }
      }
    },
  },
};
</script>
