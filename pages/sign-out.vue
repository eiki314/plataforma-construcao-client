<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Sign Out</v-card-title>
      <v-card-text>
        <v-alert v-if="alert" :type="alert.type" :value="true">{{
          alert.message
        }}</v-alert>
        Are you sure you want to Sign Out? You must be logged in to access most
        features.
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" :disabled="loading" @click="signout">
          Confirm
        </v-btn>
        <v-btn @click="$router.go(-1)"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "LogIn",
  layout: "full-screen",
  auth: false,
  data() {
    return {
      alert: null,
      loading: false,
    };
  },
  methods: {
    async signout() {
      this.alert = null;
      this.loading = true;
      try {
        await this.$auth.logout();
        this.alert = {
          type: "success",
          message: "Signed out successfully",
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
