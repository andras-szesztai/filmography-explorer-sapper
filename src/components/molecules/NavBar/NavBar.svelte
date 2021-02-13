<script lang="ts">
  import { onMount } from 'svelte'
  import { NavLink } from '../../atoms'

  import { currPath } from '../../../stores/pathname'

  import type { TLinkNames, TPathNames } from '../../../types/links'

  onMount(() => {
    currPath.set(window.location.pathname as TPathNames)
  })

  const handleClick = (newPath: TPathNames) => {
    currPath.set(newPath)
  }

  const links: { href: TPathNames; text: TLinkNames }[] = [
    { href: '/', text: 'Explore' },
    { href: '/my-favorites', text: 'My Favorites' },
    { href: '/about', text: 'About' },
  ]
</script>

<nav>
  <ul>
    {#each links as { href, text }}
      <NavLink on:click={() => handleClick('/')} {href} {text} />
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '../../../styles/variables.scss';

  nav {
    border-bottom: 1px solid $colorLight;
    font-weight: $normal;
    height: 64px;
  }

  ul {
    margin: 0;
    padding: 0;
    width: calc(100vw - 48px);
    margin: 0 auto;
  }
</style>
