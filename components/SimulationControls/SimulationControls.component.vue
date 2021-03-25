<template>
  <div id="controls">
    <SimulationControlInput
      v-for="simulationOption in simulationsOptionsComputed"
      :key="simulationOption.id"
      :defaultValue="simulationOption.defaultValue"
      :label="simulationOption.label"
      :name="simulationOption.name"
      :max="simulationOption.max"
      :min="simulationOption.min"
      :step="simulationOption.step"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SimulationControlInput from "./SimulationControlInput.component";

export default {
  name: "SimulationControls",
  components: {
    SimulationControlInput,
  },
  props: {
    simulationOptions: Object,
  },
  computed: {
    simulationsOptionsComputed() {
      return Object.keys(this.simulationOptions).map((e) => {
        const { defaultValue, label, min, max, step } = this.simulationOptions[
          e
        ];

        return {
          name: e,
          defaultValue,
          label,
          min,
          max,
          step,
        };
      });
    },
  },
  mounted() {
    this.resetOptions();
    const options = {};
    this.simulationsOptionsComputed.forEach((e) => {
      options[e.name] = e.defaultValue;
    });
    this.setOptions(options);
  },
  methods: {
    ...mapMutations({
      setOptions: "simulationOptions/setOptions",
      resetOptions: "simulationOptions/resetOptions",
    }),
  },
};
</script>

<style lang="scss" scoped>
$background-light: #20272f;

#controls {
  width: 18rem;
  background-color: $background-light;
  padding: 1rem 1rem;
  border-radius: 0.5rem;
}
</style>
