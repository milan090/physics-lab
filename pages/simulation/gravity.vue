<template>
  <main>
    <SimulationPageHeader title="Gravity" />
    <TabSwitcher :hasMath="true" />
    <div v-if="isMathTab" id="math">
      <div class="content">
        <img
          src="https://www.gstatic.com/education/formulas2/355397047/en/newton_s_law_of_universal_gravitation.svg"
          alt="gravity equation"
        />
      </div>
    </div>
    <div v-if="activeTab !== 'MATH'" id="view">
      <canvas id="simulation"></canvas>
      <SimulationControls :simulationOptions="simulationOptions" />
    </div>
  </main>
</template>

<script>
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher.component";
import SimulationPageHeader from "../../components/SimulationPageHeader";
import SimulationControls from "../../components/SimulationControls/SimulationControls.component.vue";
const gravityModule = import("../../utils/gravity.matter");

export default {
  components: {
    TabSwitcher,
    SimulationPageHeader,
    SimulationControls,
  },
  data() {
    return {
      simulationOptions: {
        gravityMultiplier: {
          label: "Gravity",
          id: 1,
          defaultValue: 10,
          min: -10,
          max: 100,
          step: 0.5,
        },
        restitution: {
          label: "Restitution",
          id: 2,
          defaultValue: 1,
          min: 0,
          max: 1.5,
          step: 0.05,
        },
        planetsCount: {
          label: "Planets Count",
          id: 3,
          defaultValue: 15,
          min: 0,
          max: 100,
          step: 1,
        },
        includeBoundaries: {
          label: "Boundaries",
          id: 4,
          defaultValue: true,
        },
      },
    };
  },
  computed: {
    simulationOptionsValue() {
      return this.$store.state.simulationOptions.options;
    },
    activeTab() {
      return this.$store.state.tabs.activeTab;
    },
    isMathTab() {
      return this.activeTab === "MATH";
    },
  },
  watch: {
    async simulationOptionsValue() {
      await this.initializeSimulation();
    },
  },
  async mounted() {
    await this.initializeSimulation();
  },
  methods: {
    async initializeSimulation() {
      const { initializeGravity } = await gravityModule;
      initializeGravity(this.simulationOptionsValue);
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 2rem;

  #view {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    width: 90%;

    canvas#simulation {
      border: rgb(165, 165, 165) solid 0.1rem;
    }
  }
}
</style>
