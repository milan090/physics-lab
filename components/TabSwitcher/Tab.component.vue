<template>
  <button :class="[isActive && 'active', 'tab']" @click="setActiveTab(value)">
    {{ tabName }}
  </button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Tab",
  props: {
    tabName: {
      type: String,
      default: "Tab Name",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "TAB_VALUE",
    },
  },
  methods: {
    ...mapMutations({
      setActiveTab: "tabs/setActiveTab",
    }),
  },
};
</script>

<style lang="scss" scoped>
.tab {
  outline: none;
  padding: 0.35rem 0.25rem;
  border-radius: 0.5rem;
  transition: background-color 100ms ease-out;

  &:hover {
    background-color: #434b5266;
  }

  &.active {
    background-color: #434b52;
  }
}
</style>
