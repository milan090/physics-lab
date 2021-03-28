<template>
  <main>
    <SimulationPageHeader title="Pendulum" />
    <TabSwitcher :hasGraph="true" />
    <div v-if="activeTab === 'GRAPH'" id="graph">
      <Graph :chartData="graphData" :options="graphOptions" />
    </div>
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
import Graph from "../../components/Graph";
const pendulumModule = import("../../utils/pendulum.matter");

export default {
  components: {
    TabSwitcher,
    SimulationPageHeader,
    SimulationControls,
    Graph,
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
          defaultValue: 1,
          min: 0,
          max: 1.5,
          step: 0.05,
        },
        frictionAir: {
          label: "Air Friction",
          id: 3,
          defaultValue: 0.5,
          min: 0,
          max: 1,
          step: 0.05,
        },
        damping: {
          label: "Damping",
          id: 4,
          defaultValue: 0,
          min: 0,
          max: 1,
          step: 0.05,
        },
      },
      graphOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Time in seconds (T)",
                fontColor: "#fff",
                fontSize: 10,
              },
              ticks: {
                fontColor: "#fffE6",
                fontSize: 14,
                autoSkip: true,
                maxTicksLimit: 15,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Velocity (v)",
                fontColor: "#fff",
                fontSize: 10,
              },
              ticks: {
                fontColor: "#fffE6",
                fontSize: 14,
              },
            },
          ],
        },
      },
      graphData: null,

      // The interval at which data is pushed to the graph
      // clear this interval after rerender
      interval: null,
    };
  },
  computed: {
    simulationOptionsValue() {
      return this.$store.state.simulationOptions.options;
    },
    activeTab() {
      return this.$store.state.tabs.activeTab;
    },
  },
  watch: {
    async simulationOptionsValue(newOptions) {
      this.resetGraph();
      const { initializePendulum } = await pendulumModule; // DO this before clearing or might run into watch and mounted running simultaneously
      clearInterval(this.interval);
      this.interval = initializePendulum(this.addData, newOptions);
    },
  },
  async mounted() {
    this.resetGraph();
    const { initializePendulum } = await pendulumModule;
    this.interval = initializePendulum(this.addData, this.addData);
  },
  methods: {
    resetGraph() {
      this.graphData = {
        labels: [],
        datasets: [
          {
            label: "Velocity",
            borderColor: "#f87979",
            // borderWidth: 5,
            pointRadius: 0,
            data: [],
          },
        ],
      };
    },
    addData(x, y) {
      const newLabels = [...this.graphData.labels, x];
      const newData = [...this.graphData.datasets[0].data, y];
      if (newLabels.length > 100) {
        newLabels.shift();
        newData.shift();
      }
      this.graphData = {
        labels: newLabels,
        datasets: [
          {
            ...this.graphData.datasets[0],
            data: newData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  margin-top: 2rem;

  #graph {
    margin: 0 auto;
    margin-bottom: 150px;
    border-radius: 0.5rem;
    padding: 2rem;
    background: #434b5266;
    width: 800px;
    position: relative;

    & > div {
      // padding: 2rem;
      height: 400px;
      width: 750px;
    }
  }

  #view {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    width: 80%;

    canvas#simulation {
      border: rgb(165, 165, 165) solid 0.1rem;
    }
  }
}
</style>
