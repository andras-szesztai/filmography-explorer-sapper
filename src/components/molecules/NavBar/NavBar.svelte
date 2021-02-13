<script lang="ts">
  import { onMount } from 'svelte'
  import { NavLink } from '../../atoms'

  import { currPath } from '../../../stores/pathname'

  import type { TPathNames } from '../../../types/links'

  onMount(() => {
    currPath.set(window.location.pathname as TPathNames)
  })

  const handleClick = (newPath: TPathNames) => {
    currPath.set(newPath)
  }
</script>

<nav>
  <ul>
    <NavLink on:click={() => handleClick('/')} href="/" text="Explore" />
    <NavLink
      on:click={() => handleClick('/my-favorites')}
      href="/my-favorites"
      text="My Favorites"
    />
    <NavLink
      on:click={() => handleClick('/about')}
      href="/about"
      text="About"
      noMargin
    />
  </ul>
</nav>

<style lang="scss">
  @import '../../../styles/variables.scss';

  nav {
    border-bottom: 1px solid $colorLight;
    font-weight: $normal;
    height: 56px;
  }

  ul {
    margin: 0;
    padding: 0;
    width: calc(100vw - 48px);
    margin: 0 auto;
  }
</style>
