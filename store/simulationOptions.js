export const state = () => ({
  options: {},
});

export const mutations = {
  setOptions(state, newOptions) {
    state.options = { ...state.options, ...newOptions };
  },
  resetOptions(state) {
    state.options = {};
  },
};
