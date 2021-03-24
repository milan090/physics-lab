<template>
  <div
    class="collection-item"
    :style="{ 'background-image': 'url(' + img + ')' }"
  >
    <div class="collection-item-container">
      <div class="collection-item-content">
        <h4>{{ name }}</h4>

        <nuxt-link :to="url">
          <PlayIcon class="play-button" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { PlayIcon } from "vue-feather-icons";

export default {
  name: "SimulationPreview",
  components: {
    PlayIcon,
  },
  props: {
    name: {
      type: String,
      default: "Simulation Preview Name",
    },
    url: {
      type: String,
      default: "/",
    },
    img: {
      type: String,
      default: "/img/preview/newtons-cradle.jpg",
    },
  },
};
</script>

<style lang="scss" scoped>
$background-color: #151719;
$primary-dark: #2c5bd1;
$text-primary: #eceded;
$primary: #4d7bf2;
$gray: #393939;

$rounded-sm: 0.25rem;
$rounded-base: 0.5rem;
$rounded-lg: 1rem;

$screen-sm: 350px;
$screen-md: 768px;

.collection-item {
  box-sizing: content-box;
  height: 17rem;
  border: solid #90969a 3px;
  border-radius: $rounded-base;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;

  .collection-item-container {
    padding: 1rem 0.75rem;
    display: flex;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, black, transparent 50%);
    opacity: 0;
    transition: opacity 200ms ease-out;

    .collection-item-content {
      margin-top: auto;
      display: none;
      width: 100%;
      display: flex;
      justify-content: space-between;

      h4 {
        font-weight: normal;
      }

      .play-button {
        padding: 0.25rem;
        border-radius: 100%;
        fill: white;
        background-color: #4d7bf2;
        cursor: pointer;
        stroke: none;
      }
    }
  }

  &:hover {
    .collection-item-container {
      opacity: 1;
    }
    .background-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
}
</style>
