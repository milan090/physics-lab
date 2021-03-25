<template>
  <main>
    <SimulationPageHeader title="Air Resistance" />
    <TabSwitcher />
    <div id="view">
      <div id="simulation-container">
        <canvas id="simulation"></canvas>
        <div class="buttons">
          <button class="button" @click="rewind">
            <RewindIcon size="1x" />
          </button>
        </div>
      </div>
      <SimulationControls :simulationOptions="simulationOptions" />
    </div>
  </main>
</template>

<script>
import { RewindIcon } from "vue-feather-icons";
import TabSwitcher from "../../components/TabSwitcher/TabSwitcher.component";
import SimulationPageHeader from "../../components/SimulationPageHeader";
import SimulationControls from "../../components/SimulationControls/SimulationControls.component.vue";
const airResistanceModule = import("../../utils/air-resistance.matter");

export default {
  components: {
    TabSwitcher,
    SimulationPageHeader,
    SimulationControls,
    RewindIcon,
  },
  data() {
    return {
      simulationOptions: {
        gravityMultiplier: {
          label: "Gravity",
          id: 1,
          defaultValue: 1,
          min: 0,
          max: 5,
          step: 0.5,
        },
        restitution: {
          label: "Restitution",
          id: 2,
          defaultValue: 0,
          min: 0,
          max: 1.5,
          step: 0.05,
        },
        frictionAir: {
          label: "Air Resistance",
          id: 3,
          defaultValue: 0.05,
          min: 0.0001,
          max: 1,
          step: 0.05,
        },
        size: {
          label: "Box Size",
          id: 4,
          defaultValue: 50,
          min: 10,
          max: 100,
          step: 1,
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
      const { initializeAirResistance } = await airResistanceModule;
      initializeAirResistance(newOptions);
    },
  },
  async mounted() {
    await this.rewind();
  },
  methods: {
    async rewind() {
      const { initializeAirResistance } = await airResistanceModule;
      initializeAirResistance(this.simulationOptionsValue);
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
    width: 80%;

    #simulation-container {
      display: flex;

      .buttons {
        button.button {
          width: 2.5rem;
          height: 2.5rem;
          padding: 0.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
          transition: background-color 100ms ease-out;
        }
      }
    }
    canvas#simulation {
      border: rgb(165, 165, 165) solid 0.1rem;
    }
  }
}
</style>
