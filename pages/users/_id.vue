<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card>
        <v-img
          :src="`data:image/jpg;base64,${user.banner}`"
          height="200"
          :lazy-src="`https://placehold.co/1000?text=plataforma_construcao`"
        ></v-img>

        <v-card-title>
          <v-row>
            <v-col cols="3">
              <v-avatar class="ma-3" size="200">
                <v-img
                  :src="`data:image/jpg;base64,${user.profilePic}`"
                  height="200"
                  width="200"
                  class="mx-auto"
                  :lazy-src="`https://placehold.co/100?text=${user.username}`"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="9">
              <v-card flat>
                <v-card-title>
                  <h1>{{ user.username }}</h1>
                </v-card-title>
                <v-card-text>
                  {{ user.description }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-title>

        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab>
            <v-icon start> mdi-lock </v-icon>
            Skills
          </v-tab>
          <v-tab v-if="isLoggedInUser">
            <v-icon start> mdi-account </v-icon>
            Account
          </v-tab>
        </v-tabs>

        <v-window v-model="tab">
          <v-window-item :value="0"> one </v-window-item>
          <v-window-item :value="1">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="4">
                    <UserAccountForm
                      ref="accountForm"
                      v-model="user"
                      :autofocus="false"
                      :validation="validation"
                      @submit="saveAccount"
                    >
                      <template #alert>
                        <v-alert v-if="alert" :type="alert.type" :value="true">
                          {{ alert.message }}
                        </v-alert>
                      </template>
                      <template #actions>
                        <v-btn
                          type="submit"
                          :loading="loading"
                          :disabled="loading"
                        >
                          Save
                        </v-btn>
                        <v-spacer />
                        <v-btn color="error" outlined @click="deleteAccount">
                          Delete Account
                        </v-btn>
                      </template>
                    </UserAccountForm>
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-row
                      ><v-col>
                        <v-textarea
                          v-model="user.description"
                          outlined
                          label="Description"
                          counter="700"
                          max="700"
                          :rules="rules.description"
                        ></v-textarea> </v-col
                    ></v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-file-input
                          v-model="newProfilePic"
                          accept="image/*"
                          label="Update Profile Picture"
                          small-chips
                        >
                        </v-file-input>
                        <v-file-input
                          v-model="newBanner"
                          accept="image/*"
                          label="Update Banner"
                          small-chips
                        >
                        </v-file-input>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      user: {},
      newProfilePic: null,
      newBanner: null,
      titles: [
        { name: "Mira", color: "blue", width: "80%", percent: "80%" },
        { name: "Movimentação", color: "blue", width: "60%", percent: "60%" },
        { name: "Granada", color: "blue", width: "40%", percent: "40%" },
      ],
      tab: undefined,
      alert: null,
      loading: false,
      validation: false,
      rules: {
        description: [
          (v) =>
            !v ||
            v.length <= 700 ||
            "Description must not be above 700 characters long",
        ],
      },
    };
  },
  async fetch() {
    try {
      this.$store.dispatch("app/startLoading");
      this.user = await this.$axios.$get(`/api/user/${this.$route.params.id}`);
    } catch (ex) {
      if (ex.response.status === 404) this.$router.push("/error");
    } finally {
      this.$store.dispatch("app/stopLoading");
    }
  },
  computed: {
    isLoggedInUser() {
      return this.user.id === this.$auth.user.id;
    },
  },
  methods: {
    async saveAccount() {
      this.validation = true;
      if (!(await this.$refs.accountForm.validate())) {
        return;
      }

      this.alert = null;
      this.loading = true;

      try {
        const user = await this.$axios.$put(
          `/api/user/${this.$route.params.id}`,
          this.user
        );

        if (this.newProfilePic) {
          await this.saveProfilePic();
        }

        if (this.newBanner) {
          await this.saveBanner();
        }

        this.alert = {
          type: "success",
          message: "Profile updated",
        };
        const { password } = this.user;
        this.user = { ...user, password };

        if (this.$route.params.id === this.$auth.user.id) {
          const { data } = await this.$auth.loginWith("cookie", {
            data: {
              username: this.user.username,
              password: this.user.password,
            },
          });
          this.$auth.setUser(data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.alert = {
            type: "error",
            message: error.response.data.message || error.reponse.status,
          };
        }
      } finally {
        this.loading = false;
      }
    },
    async saveProfilePic() {
      const formData = new FormData();
      formData.append("file", this.newProfilePic);
      await this.$axios.$post(
        `/api/user/${this.$route.params.id}/profile-pic`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    async saveBanner() {
      const formData = new FormData();
      formData.append("file", this.newBanner);
      await this.$axios.$post(
        `/api/user/${this.$route.params.id}/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    deleteAccount() {},
  },
};
</script>
