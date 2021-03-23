<template>
  <Nuxt />
</template>

<style lang="scss">
// Variables
// Variables
$background-color: #151719;
$primary-dark: #2c5bd1;
$gray: #393939;
$text-primary: #eceded;
$text-dim: #9ca9b3;

$font-xl: 3rem;
$font-base: 1rem;
$font-sm: 1.125rem;
$font-xsm: 1rem;

$rounded-sm: 0.25rem;
$rounded-base: 0.5rem;
$rounded-lg: 1rem;

html {
  scroll-behavior: smooth;
}

body,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

body {
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;800&display=swap");
  font-family: "Inter", sans-serif;
  background-color: $background-color;
  color: $text-primary;
  font-size: $font-base;
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
</style>
