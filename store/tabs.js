/**
 * @returns {{ activeTab: "SIMULATION" | "GRAPH" | "MATH" }}
 */
export const state = () => ({
  activeTab: "SIMULATION",
});

export const mutations = {
  /**
   *
   * @param {*} state
   * @param {"SIMULATION" | "GRAPH" | "MATH"} activeTab
   */
  setActiveTab(state, activeTab) {
    state.activeTab = activeTab;
  },
};
