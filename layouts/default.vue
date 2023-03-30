<template>
  <v-app dark>
    <v-navigation-drawer :mini-variant="miniVariant" app>
      <v-list>
        <v-list-item router exact to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset></v-divider>
        <v-list>
          <v-list-item
            v-for="game in games"
            :key="game.id"
            router
            exact
            :style="`background: ${game.colorHex}`"
          >
            <v-list-item-action>
              <v-img
                v-if="game.icon"
                :src="`data:image/jpg;base64,${game.icon}`"
                max-width="25"
              />
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                ><b>{{ game.name }}</b></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" right temporary fixed>
      <v-list> </v-list>
    </v-navigation-drawer>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
      <v-spacer />
      <span
        >Icons by <a target="_blank" href="https://icons8.com">Icons8</a></span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: true,
      rightDrawer: false,
      title: "Plataforma Construção",
    };
  },
  async fetch() {
    if (!this.$store.state.game.games) {
      await this.$store.dispatch("game/fetchGames");
    }
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn;
    },
    user() {
      return this.$auth.user;
    },
    games() {
      return this.$store.state.game.games;
    },
  },
};
</script>
