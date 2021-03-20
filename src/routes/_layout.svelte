<script lang="ts">
  import { stores } from '@sapper/app'
  import { gsap } from 'gsap'
  import { onMount } from 'svelte'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

  import { NavBar } from '../components/molecules'

  import genreStore from '../stores/genreStore'

  const { session } = stores()
  const apiKey = $session.MOVIE_DB_API_KEY

  onMount(() => {
    genreStore.populate(apiKey)
  })

  gsap.registerPlugin(ScrollToPlugin)
</script>

<NavBar />

<main>
  <slot />
</main>

<style lang="scss">
  @import '../styles/variables.scss';
  main {
    width: 100vw;
    height: calc(100vh - 64px);
    margin: 0 auto;
    position: relative;
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
  :global(::-webkit-scrollbar) {
    width: 8px;
  }

  :global(::-webkit-scrollbar-track) {
    background: rgba($colorLight, 0.35);
  }

  :global(::-webkit-scrollbar-thumb) {
    background: $colorSecondary;
    border-radius: 2px;
  }
</style>
