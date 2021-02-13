<script lang="ts">
  import { NavBar } from '../components/molecules'

  // export let segment: string
</script>

<NavBar />

<main>
  <slot />
</main>

<style lang="scss">
  @import '../styles/variables.scss';
  main {
    max-width: 90vw;
    padding-top: 1em;
    margin: 0 auto;
  }

  :global(body) {
    background-color: $colorPrimary;
  }
  :global(h1) {
    font-size: $fs-h1;
  }
  :global(h2) {
    font-size: $fs-h2;
  }
  :global(h3) {
    font-size: $fs-h3;
  }
  :global(h4) {
    font-size: $fs-h4;
  }
  :global(h5) {
    font-size: $fs-h5;
  }
  :global(h6) {
    font-size: $fs-h6;
  }
</style>
