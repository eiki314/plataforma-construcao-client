<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Sign Up</v-card-title>
      <UserAccountForm ref="signupForm" v-model="register" @submit="submit">
        <template #alert>
          <v-alert v-if="alert" :type="alert.type" :value="true">
            {{ alert.message }}
          </v-alert>
        </template>
        <template #actions>
          <v-btn type="submit" :loading="loading" :disabled="loading">
            Submit
          </v-btn>
          <v-spacer />
          <v-btn text @click="$router.push('/log-in')">
            Already have an account?
          </v-btn>
        </template>
      </UserAccountForm>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "SignUp",
  layout: "full-screen",
  auth: false,
  data() {
    return {
      register: {},
      alert: null,
      loading: false,
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.signupForm.validate()) {
        return;
      }
      this.alert = null;
      this.loading = true;
      try {
        const response = await this.$axios.$post(
          "/api/auth/signup",
          this.register
        );
        this.alert = {
          type: "success",
          message: response.message,
        };
        const { data } = await this.$auth.loginWith("cookie", {
          data: {
            username: this.register.username,
            password: this.register.password,
          },
        });
        this.$auth.setUser(data);
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
