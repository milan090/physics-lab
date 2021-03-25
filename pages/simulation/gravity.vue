<template>
  <main>
    <SimulationPageHeader title="Newtons Cradle" />
    <TabSwitcher />
    <div id="view">
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
  },
  watch: {
    async simulationOptionsValue(newOptions) {
      const { initializeGravity } = await gravityModule;
      initializeGravity(newOptions);
    },
  },
  async mounted() {
    const { initializeGravity } = await gravityModule;
    initializeGravity(this.simulationOptionsValue);
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
