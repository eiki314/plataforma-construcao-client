<template>
  <v-form ref="form" @submit.prevent="$emit('submit')">
    <v-card-text>
      <slot name="alert"></slot>
      <v-text-field
        v-model="register.username"
        label="Username"
        :rules="rules.username"
        :autofocus="autofocus"
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
      <slot name="actions"></slot>
    </v-card-actions>
  </v-form>
</template>

<script>
import { USER_ROLES } from "~/services/consts";
export default {
  name: "UserAccountForm",
  props: {
    value: {
      type: Object,
      default: () => ({
        username: "",
        email: "",
        role: [USER_ROLES.ROLE_USER],
        password: "",
        age: undefined,
      }),
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
    validation: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      register: this.value,
      confirmPassword: "",
      dataRules: {
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
  computed: {
    rules() {
      return this.validation ? this.dataRules : {};
    },
  },
  methods: {
    async validate() {
      await this.$nextTick();
      return this.$refs.form.validate();
    },
  },
};
</script>
