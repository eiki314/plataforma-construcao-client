export const state = () => ({
  skills: null,
});

export const getters = {
  skillsByGameId(state) {
    return (id) => {
      if (state.skills) {
        return state.skills.filter((skill) => skill.game === id);
      }
    };
  },
};

export const mutations = {
  setSkills(state, { gameId, skills }) {
    if (state.skills) {
      const oldSkills = state.skills.filter((s) => s.game !== gameId);
      Array.prototype.push.apply(oldSkills, skills);
      state.skills = oldSkills;
    } else {
      state.skills = skills;
    }
  },
};

export const actions = {
  async fetchSkills({ commit }, { gameId }) {
    try {
      const skills = await this.$axios.$get(`/api/game/${gameId}/skills`);
      commit("setSkills", { gameId, skills });
    } catch (error) {}
  },
};
