<template>
  <div class="input">
    <label>{{ label }}</label>
    <SliderInput
      v-if="typeof defaultValue === 'number'"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      :name="name"
      @options-change="handleChange"
    />
    <Checkbox
      v-if="typeof defaultValue === 'boolean'"
      :value="value"
      :name="name"
      @options-change="handleChange"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SliderInput from "./SliderInput";
import Checkbox from "./Checkbox";

export default {
  name: "SimulationControlInput",
  components: {
    SliderInput,
    Checkbox,
  },
  props: {
    name: {
      type: String,
      default: "INPUT_NAME",
    },
    label: {
      type: String,
      default: "LABEL",
    },
    min: Number,
    max: Number,
    defaultValue: [Number, String, Boolean],
    step: Number,
  },
  computed: {
    optionName() {
      return this.name
        .split(" ")
        .map((e) => e.toLowerCase())
        .join("-");
    },
    value() {
      return this.$store.state.simulationOptions.options[this.name];
    },
  },
  methods: {
    handleChange(name, value) {
      this.setOptions({ [name]: value });
    },
    ...mapMutations({
      setOptions: "simulationOptions/setOptions",
    }),
  },
};
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  width: 100%;
  font-size: 0.85rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.45rem;
  color: rgb(206, 206, 206);

  input {
    width: 50%;
  }
}
</style>
