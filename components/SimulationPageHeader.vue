<template>
  <div class="simulation-header">
    <h1 class="title gradient">Newtons Cradle</h1>

    <nuxt-link to="/#collection" class="go-back">
      <ArrowLeftIcon />
      <span class="text">Try Something Else</span>
    </nuxt-link>
  </div>
</template>

<script>
import { ArrowLeftIcon } from "vue-feather-icons";
export default {
  name: "SimulationPageHeader",
  components: {
    ArrowLeftIcon,
  },
  props: {
    title: {
      type: String,
      default: "Title Goes Here",
    },
  },
};
</script>

<style lang="scss" scoped>
$font-base: 0.85rem;
$font-sm: 0.75rem;
$text-dim: #7c858c4d;

.simulation-header {
  font-size: $font-sm;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  position: relative;

  .go-back {
    float: right;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: absolute;
    right: 0;
    transition: background-color 100ms ease-out;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;

    &:hover {
      background-color: $text-dim;
    }

    .text {
      @media only screen and (max-width: 900px) {
        display: none;
      }
    }
  }
}
</style>
