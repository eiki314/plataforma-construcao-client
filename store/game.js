export const state = () => ({
  games: null,
});

export const getters = {
  gameById(state) {
    return (id) => {
      return state.games.find((game) => game.id === id);
    };
  },
};

export const mutations = {
  setGames(state, games) {
    state.games = games;
  },
};

export const actions = {
  async fetchGames({ commit }) {
    try {
      const fetchedGames = await this.$axios.$get("/api/public/game");
      commit("setGames", fetchedGames);
    } catch (error) {}
  },
};
