<template>
  <div>
    <section id="hero">
      <h1 class="title fade-up">
        <span class="gradient">Learn Your Physics With</span> <br />
        <span class="logo"
          ><img src="/img/logo-small.svg" alt="Logo small" />
          <span class="word-mark">PhysicsLab </span></span
        >
      </h1>
      <p class="text-dim text-center fade-up">
        Learning Physics by Visualising - the fastest, easiest, and retainable
        way of learning Physics
      </p>
      <div id="cta" class="fade-up">
        <nuxt-link to="/simulation/pendulum" class="cta-button">
          <button class="button blue">Try Now</button>
        </nuxt-link>
        <a href="/#collection" class="cta-button">
          <button class="button">View Collection</button>
        </a>
      </div>
      <canvas id="newtons-cradle-hero" class="fade-up"></canvas>
    </section>

    <section id="collection">
      <h2 id="collection" class="title gradient fade-up">All Simulations</h2>

      <div id="collection-grid">
        <SimulationPreview
          v-for="simulationPreview in simulationPreviews"
          :key="simulationPreview.id"
          :name="simulationPreview.name"
          :url="simulationPreview.url"
          :img="simulationPreview.img"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SimulationPreview from "../components/SimulationPreview";
const newtonsCradlePreviewModule = import(
  "../utils/newtons-cradle-preview.matter"
);

export default {
  components: {
    SimulationPreview,
  },
  data() {
    return {
      simulationPreviews: [
        {
          id: "1",
          url: "/simulation/newtons-cradle",
          name: "Newtons Cradle",
          img: "/img/preview/newtons-cradle.jpg",
        },
        {
          id: "2",
          url: "/simulation/pendulum",
          name: "Pendulum",
          img: "/img/preview/pendulum.png",
        },
        {
          id: "3",
          url: "/simulation/air-resistance",
          name: "Air Resistance",
          img: "/img/preview/air-resistance.jpg",
        },
        {
          id: "4",
          url: "/simulation/gravity",
          name: "Gravity",
          img: "/img/preview/gravity.jpg",
        },
        {
          id: "5",
          url: "/simulation/trajectory",
          name: "Trajectory",
          img: "/img/preview/trajectory.jpg",
        },
        {
          id: "6",
          url: "/simulation/friction",
          name: "Friction",
          img: "/img/preview/friction.jpg",
        },
      ],
    };
  },
  async mounted() {
    const { initializeNewtonsCradlePreview } = await newtonsCradlePreviewModule;
    initializeNewtonsCradlePreview();
  },
};
</script>

<style lang="scss">
// Variables
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

#hero {
  max-width: 800px;
  min-height: 100vh;

  margin: 0 auto;
  margin-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;

  p {
    margin: 0 25%;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
  }

  #cta {
    display: flex;
    gap: 1rem;

    button.button {
      width: 10rem;

      &.blue {
        background-color: $primary;
      }
    }
  }

  canvas {
    margin-top: 2.5rem;
  }

  @for $i from 0 to 10 {
    .fade-up:nth-child(#{$i + 1}) {
      opacity: 0;
      animation: fade-up
        1.5s
        cubic-bezier(0.215, 0.61, 0.355, 1)
        $i *
        0.25s +
        0.1s
        forwards;
    }
  }
}

#collection {
  #collection-grid {
    display: grid;
    max-width: 1200px;
    grid-template-columns: auto auto auto;
    margin: 0 auto;
    margin-top: 2.5rem;
    padding: 0 1rem;
    gap: 2rem;

    @media screen and (max-width: $screen-md) {
      & {
        grid-template-columns: auto auto;
      }
    }
  }
}

#newtons-cradle-hero {
  height: 350px;
}

@keyframes fade-up {
  0% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
  }
}
</style>
