<template>
  <div class="input-container">
    <input
      type="text"
      :value="value"
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
        @change="handleChange"
        :style="{
          background: `linear-gradient(to right, #2c5bd1 0%, #2c5bd1 ${valuePercentage}%, #434b5266 ${valuePercentage}%, #434b5266 100%)`,
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderInput",
  props: {
    name: String,
    min: Number,
    max: Number,
    value: Number,
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
    width: 2rem;
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
      width: 5rem;
    }

    .slider {
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
