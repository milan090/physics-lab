<template>
  <div class="input-container">
    <input
      type="text"
      :value="(Math.round(value * 100) / 100).toFixed(2)"
      class="input-value"
      @change="handleChange"
    />
    <div class="slidecontainer">
      <input
        type="range"
        class="slider"
        :min="min"
        :max="max"
        :value="value"
        :step="step"
        :style="{
          background: `linear-gradient(to right, #2c5bd1 0%, #2c5bd1 ${valuePercentage}%, #434b5266 ${valuePercentage}%, #434b5266 100%)`,
        }"
        @change="handleChange"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderInput",
  props: {
    name: {
      default: "Field",
      type: String,
    },
    min: {
      default: 0,
      type: Number,
    },
    max: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: 5,
    },
    step: {
      type: Number,
      default: 0.5,
    },
  },
  computed: {
    valuePercentage() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },
  },
  methods: {
    handleChange(event) {
      const newValue = parseFloat(event.target.value);
      this.$emit("options-change", this.name, newValue);
    },
    handleInput(event) {
      const target = event.target;

      const valuePercentage =
        ((target.value - this.min) / (this.max - this.min)) * 100;
      event.target.style.background = `linear-gradient(to right, #2c5bd1 0%, #2c5bd1 ${valuePercentage}%, #434b5266 ${valuePercentage}%, #434b5266 100%)`;
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-dark: #2c5bd1;
$slider-height: 1.25rem;

.input-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 0.25rem;
  width: 8rem;

  .input-value {
    width: 2.5rem;
    height: $slider-height;
    text-align: center;
    background: #434b5266;
    border-radius: 0.5rem;
    color: gray;
    padding: 0.05rem 0.25rem;
    font-size: 0.75rem;

    &:focus {
      background: #434b52;
      // color: white;
    }
  }

  .slidecontainer {
    height: $slider-height;

    input {
      width: 4rem;
    }

    .slider {
      overflow: hidden;
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: $slider-height;
      border-radius: 0.25rem;
      opacity: 0.7;
      -webkit-transition: 0.2s;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: $slider-height;
        width: 0.25rem;
        background: #4d7bf2;
        cursor: pointer;
      }
    }
  }
}
</style>
