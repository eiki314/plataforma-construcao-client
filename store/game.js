export const state = () => ({
  games: null,
});

export const getters = {
  gameById(state) {
    return (id) => {
      if (state.games) {
        return state.games.filter((game) => game.id === id)[0];
      }
    };
  },
};

export const mutations = {
  setGames(state, games) {
    state.games = games;
  },
  setGame(state, { id, game }) {
    const idx = state.games.map((g) => g.id).indexOf(id);
    if (idx !== -1) {
      state.games[idx] = game;
    } else {
      state.games = [game];
    }
  },
};

export const actions = {
  async fetchGames({ commit }) {
    try {
      const fetchedGames = await this.$axios.$get("/api/public/game");
      commit("setGames", fetchedGames);
    } catch (error) {}
  },
  async fetchGame({ commit }, { id }) {
    try {
      const game = await this.$axios.$get(`/api/game/${id}`);
      commit("setGame", { id, game });
    } catch (error) {}
  },
};
