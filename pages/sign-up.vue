<template>
  <v-layout justify-center align-center>
    <v-card class="elevation-10" style="flex: 0 1 400px">
      <v-card-title class="headline">Sign Up</v-card-title>
      <v-form ref="signupForm" lazy-validation @submit.prevent="submit">
        <v-card-text>
          <v-alert v-if="alert" :type="alert.type" :value="true">{{
            alert.message
          }}</v-alert>
          <v-text-field
            v-model="register.username"
            label="Username"
            :rules="rules.username"
            autofocus
          />
          <v-text-field
            v-model="register.email"
            label="E-mail"
            :rules="rules.email"
            email
          />
          <v-text-field
            v-model="register.password"
            label="Password"
            type="password"
            :rules="rules.password"
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm password"
            type="password"
            :rules="rules.confirmPassword"
          />
          <v-text-field
            v-model="register.age"
            label="Age"
            type="number"
            :rules="rules.age"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" :loading="loading" :disabled="loading">
            Submit
          </v-btn>
          <v-spacer />
          <v-btn text @click="$router.push('/log-in')">
            Already have an account?
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
import { USER_ROLES } from "~/services/consts";
export default {
  name: "SignUp",
  layout: "full-screen",
  auth: false,
  data() {
    return {
      register: {
        username: "",
        email: "",
        role: [USER_ROLES.ROLE_USER],
        password: "",
        age: undefined,
      },
      confirmPassword: "",
      alert: null,
      loading: false,
      rules: {
        username: [
          (v) => !!v || "Username required",
          (v) =>
            (v && v.length >= 3) ||
            "Username must be at least 3 characters long",
          (v) =>
            (v && v.length <= 20) ||
            "Username must not be above 20 characters long",
        ],
        email: [
          (v) => !!v || "E-mail is required",
          (v) =>
            (v && v.length <= 50) ||
            "Username must not be above 50 characters long",
          (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-mail must be valid",
        ],
        password: [
          (v) => !!v || "Password required",
          (v) =>
            (v && v.length >= 6) ||
            "Password must be at least 6 characters long",
          (v) =>
            (v && v.length <= 40) ||
            "Password must not be above 40 characters long",
          (v) =>
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
            "Password must contain at least lowercase letter, one number, a special character and one uppercase letter",
        ],
        confirmPassword: [
          (v) => !!v || "Please confirm your password",
          (v) =>
            v === this.register.password ||
            "Confirmation must match given password",
        ],
        age: [
          (v) => !!v || "Age required",
          (v) => (v && v >= 18) || "You must be at least 18 years old",
        ],
      },
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
        await this.$auth.loginWith("cookie", {
          data: {
            username: this.register.username,
            password: this.register.password,
          },
        });
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
