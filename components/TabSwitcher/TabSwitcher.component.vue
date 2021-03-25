<template>
  <nav>
    <div class="tabs">
      <Tab
        tabName="Simulation"
        value="SIMULATION"
        :isActive="isSimulationTabActive"
      />
      <Tab
        v-if="hasGraph"
        tabName="Graph View"
        value="GRAPH"
        :isActive="isGraphTabActive"
      />
      <Tab
        v-if="hasMath"
        tabName="Math Formula"
        value="MATH"
        :isActive="isMathTabActive"
      />
    </div>
  </nav>
</template>

<script>
import Tab from "./Tab.component";

export default {
  name: "TabSwitcher",
  components: {
    Tab,
  },
  props: {
    hasGraph: {
      type: Boolean,
      default: false,
    },
    hasMath: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isSimulationTabActive() {
      return this.$store.state.tabs.activeTab === "SIMULATION";
    },
    isGraphTabActive() {
      return this.$store.state.tabs.activeTab === "GRAPH";
    },
    isMathTabActive() {
      return this.$store.state.tabs.activeTab === "MATH";
    },
  },
};
</script>

<style lang="scss" scoped>
$font-base: 1.1rem;
$background-light: #20272f;

nav {
  display: flex;
  margin: 2rem;

  .tabs {
    // width: 100%;
    max-width: 450px;
    margin: 0 auto;
    background: $background-light;
    padding: 0.5rem 0.75rem;
    border-radius: 1rem;
    display: flex;
    column-gap: 0.5rem;
  }
}
</style>
