<script lang="ts">
  import { onMount } from 'svelte'
  import { NavLink } from '../../atoms'

  import { currPath } from '../../../stores/pathname'

  import type { TLinkNames, TPathNames } from '../../../types/links'
  import Button from '../../atoms/Button/Button.svelte'
  import UserIcon from '../../atoms/icons/UserIcon/UserIcon.svelte'

  onMount(() => {
    currPath.set(window.location.pathname as TPathNames)
  })

  const handleClick = (newPath: TPathNames) => {
    currPath.set(newPath)
  }

  const links: { href: TPathNames; text: TLinkNames; delay: number }[] = [
    { href: '/', text: 'Explore', delay: 0 },
    { href: '/watchlist', text: 'Watchlist', delay: 100 },
    { href: '/about', text: 'About', delay: 200 },
  ]
  // TODO: add Login button to other side (opens modal later)
</script>

<nav>
  <ul>
    {#each links as { href, text, delay }}
      <NavLink on:click={() => handleClick(href)} {href} {text} {delay} />
    {/each}
  </ul>
  <Button text="Login" icon={UserIcon} />
</nav>

<style lang="scss">
  @import '../../../styles/variables.scss';

  nav {
    border-bottom: 2px solid $colorLight;
    font-weight: $normal;
    height: 64px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;

    @media (max-width: $breakpoint-mobile) {
      height: 56px;
      padding: 0 12px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    width: calc(100vw - 48px);
    margin: 0 auto;
  }
</style>
