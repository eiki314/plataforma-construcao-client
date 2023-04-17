<template>
  <v-container
    fluid
    :style="`
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url(data:image/jpg;base64,${game.backgroundImage});
      background-size: cover;
      background-position: center;
      width: 100%;
    `"
  >
    <v-row align="center" justify="center">
      <v-col cols="8">
        <v-card transparent>
          <v-sheet width="100%" :color="game.colorHex">
            <v-list-item class="w-100">
              <v-list-item-action>
                <v-img
                  v-if="game.icon"
                  :src="`data:image/jpg;base64,${game.icon}`"
                  max-width="60"
                />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title
                  ><v-card-title
                    ><h1>{{ game.name.toUpperCase() }}</h1></v-card-title
                  >
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-sheet>
          <v-card-text>
            <v-card flat>
              <v-card-title><h2>Aulas Recentes</h2></v-card-title>
              <v-divider />
              <v-sheet
                class="d-flex align-content-start flex-wrap bg-surface-variant"
              >
                <v-col v-for="i in 7" :key="i" sm="3" md="4">
                  <v-card flat @click="$router.push('class-video')">
                    <v-row>
                      <v-col cols="9">
                        <v-img
                          :src="`https://placehold.co/300x200/${game.colorHex.substring(
                            1
                          )}/white`"
                          width="250"
                          height="150"
                        ></v-img>
                      </v-col>
                      <v-col
                        ><v-img
                          v-for="skill in skillsSample()"
                          :key="skill.id"
                          class="my-2"
                          :src="`data:image/jpg;base64,${skill.icon}`"
                          width="25"
                          height="25"
                          style="filter: invert(1)"
                        ></v-img
                      ></v-col>
                    </v-row>
                    <v-card-title class="py-2">
                      Descrição da aula {{ i }}
                    </v-card-title>
                  </v-card>
                </v-col>
              </v-sheet>
            </v-card>
            <v-card flat>
              <v-card-title><h2>Skills</h2></v-card-title>
              <v-divider />
              <v-card
                v-for="skillCategory in skills"
                :key="skillCategory.id"
                flat
              >
                <v-card-title>
                  <h4>{{ skillCategory.name }}</h4>
                </v-card-title>
                <v-sheet
                  class="d-flex align-content-start flex-wrap bg-surface-variant"
                >
                  <v-col
                    v-for="skill in skillCategory.skills"
                    :key="skill.id"
                    sm="4"
                    md="3"
                  >
                    <v-card flat>
                      <v-card-text class="text-center">
                        <v-progress-circular
                          class="px-8 py-8"
                          size="125"
                          width="15"
                          :value="Math.random() * 101"
                          rotate="90"
                          :color="game.colorHex"
                        >
                          <v-img
                            :src="`data:image/jpg;base64,${skill.icon}`"
                            width="75"
                            height="75"
                            style="filter: invert(1)"
                          ></v-img>
                        </v-progress-circular>
                      </v-card-text>
                      <v-card-title class="justify-center"
                        ><h6>{{ skill.name }}</h6></v-card-title
                      >
                    </v-card>
                  </v-col>
                </v-sheet>
              </v-card>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "GameDetails",
  data() {
    return {
      gameId: this.$route.params.id,
      tab: undefined,
      offsetTop: 0,
    };
  },
  async fetch() {
    try {
      await this.$store.dispatch("game/fetchGame", { id: this.gameId });
      await this.$store.dispatch("skill/fetchSkills", { gameId: this.gameId });
    } catch (ex) {
      if (ex.response.status === 404) this.$router.push("/error");
    } finally {
      this.$store.dispatch("app/stopLoading");
    }
  },
  computed: {
    game() {
      return this.$store.getters["game/gameById"](this.gameId);
    },
    skills() {
      return this.$store.getters["skill/skillsByGameId"](this.gameId);
    },
  },
  created() {
    this.$store.dispatch("app/startLoading");
  },
  methods: {
    skillsSample() {
      if (this.skills && this.skills[0]) {
        return this.skills[0].skills.slice(0, 3);
      } else {
        return [];
      }
    },
  },
};
</script>
