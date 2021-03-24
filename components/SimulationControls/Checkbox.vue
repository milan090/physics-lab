<template>
  <span class="container">
    <input type="checkbox" :checked="value" @change="handleChange" />
    <span class="checkmark"></span>
  </span>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    name: String,
    value: Boolean,
  },
  methods: {
    handleChange(event) {
      const newValue = event.target.checked;
      this.$emit("options-change", this.name, newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1rem;
}
</style>
