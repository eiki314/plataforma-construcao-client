<template>
  <v-row justify="center" align="center">
    <v-col sm="12" md="11">
      <v-card>
        <v-card-title
          >Choose the game you want to become competitive on:</v-card-title
        >
        <v-sheet
          class="d-flex align-content-start flex-wrap bg-surface-variant"
        >
          <v-col v-for="game in games" :key="game.id" sm="12" md="4">
            <v-card
              :color="game.colorHex"
              class="game_card"
              @click.stop="
                $router.push({ name: 'games-id', params: { id: game.id } })
              "
            >
              <v-responsive aspect-ratio="1.5">
                <v-img
                  cover
                  height="275"
                  :src="`data:image/jpg;base64,${game.backgroundImage}`"
                ></v-img>
                <v-card-actions class="text-right" prepend-avatar>
                  <v-list-item class="w-100">
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
                </v-card-actions>
              </v-responsive>
            </v-card>
          </v-col>
        </v-sheet>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "IndexPage",
  auth: false,
  async fetch() {
    if (!this.$store.state.game.games) {
      await this.$store.dispatch("game/fetchGames");
    }
  },
  computed: {
    games() {
      return this.$store.state.game.games;
    },
  },
};
</script>

<style>
.game_card {
  transition: all 0.2s ease-out;
  opacity: 0.6;
}

.game_card:hover {
  opacity: 1;
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.14), 0 6px 30px rgba(0, 0, 0, 0.12),
    0 8px 10px rgba(0, 0, 0, 0.2);
}
</style>
