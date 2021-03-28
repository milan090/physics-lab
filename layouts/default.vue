<template>
  <div>
    <div id="body">
      <Nuxt />
    </div>
    <footer>
      <div class="text-center">
        <span>Made by a nerd for nerds</span>
        <span>|</span>
        <a href="https://github.com/milan090/physics-lab" target="_blank "
          >Find Physics Lab on Github</a
        >
        <div>
          <a href="https://www.youtube.com/watch?v=j5a0jTc9S10" target="_blank"
            >About</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  computed: {
    url() {
      return this.$route;
    },
  },
  watch: {
    url() {
      this.setActiveTab("SIMULATION");
    },
  },
  methods: {
    ...mapMutations({
      setActiveTab: "tabs/setActiveTab",
    }),
  },
};
</script>

<style lang="scss">
// Variables
// Variables
$background-color: #151719;
$primary-dark: #2c5bd1;
$gray: #393939;
$text-primary: #eceded;
$text-dim: #9ca9b3;

$font-xl: 3rem;
$font-base: 1.1rem;
$font-sm: 1rem;

$rounded-sm: 0.25rem;
$rounded-base: 0.5rem;
$rounded-lg: 1rem;

html {
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
input {
  margin: 0;
  padding: 0;
}

input,
button {
  outline: none;
  border: none;
}

body {
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");
  font-family: "Inter", sans-serif;
  background-color: $background-color;
  color: $text-primary;
  font-size: $font-base;
}

.text-center {
  text-align: center;
}

#body {
  min-height: 100vh;
}

footer {
  margin-top: 5rem;
  width: 100%;
  height: 14rem;
  background: #20272f;
  display: flex;

  div {
    margin: 0 auto;
    margin-top: 3rem;
  }

  a {
    color: #4d7bf2;

    &:hover {
      text-decoration: underline;
    }
  }
}

h1.title,
h2.title {
  font-weight: 800;
  font-size: $font-xl;
  line-height: 4rem;
  text-align: center;
}
.gradient {
  background: -webkit-linear-gradient(#ffffff 30.73%, #6b88d2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-center {
  text-align: center;
}

.text-dim {
  color: $text-dim;
}

a {
  text-decoration: none;
  color: currentColor;
}

button {
  border: none;
  background: none;
  color: white;
}

#math {
  display: flex;

  div.content {
    margin: 0 auto;
  }
  img {
    filter: invert(100%) hue-rotate(180deg) !important;
  }
}

.button {
  background-color: $gray;
  outline: none;
  border: none;
  color: $text-primary;
  font-size: $font-base;
  border-radius: $rounded-base;
  padding: 0.35rem 1rem;
  padding-bottom: 0.45rem;
  cursor: pointer;

  transition: opacity 200ms ease-in-out;

  &:hover {
    opacity: 0.85;
    border: $primary-dark;
  }
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  img {
    width: 65px;
    height: 65px;
    animation: spin 5000ms linear infinite;
  }

  .word-mark {
    color: $primary-dark;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Scrollbar
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1e2833;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #3c4b5b;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
