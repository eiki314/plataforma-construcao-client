export const state = () => ({
  isLoading: false,
});

export const mutations = {
  setLoading(state, loading) {
    state.isLoading = loading;
  },
};

export const actions = {
  startLoading({ commit }) {
    commit("setLoading", true);
  },

  stopLoading({ commit }) {
    commit("setLoading", false);
  },
};
