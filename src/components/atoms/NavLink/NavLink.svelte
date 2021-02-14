<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import { currPath } from '../../../stores/pathname'

  import { animateUnderline } from './utils'

  import type { TLinkNames, TPathNames } from '../../../types/links'

  // Props
  export let href: TPathNames
  export let text: TLinkNames
  export let delay: number
  export let noMargin: boolean = false

  // State
  let previouslyActive = false
  let isInitialized = false
  $: isActive = $currPath === href

  let underLineSpan: HTMLSpanElement

  onMount(() => {
    isInitialized = true
  })
  beforeUpdate(() => {
    if (isActive) {
      previouslyActive = true
      animateUnderline(underLineSpan, 1, 0.3)
    }
  })
  afterUpdate(() => {
    if (!isActive && previouslyActive) {
      previouslyActive = false
      animateUnderline(underLineSpan, 0, 0.2)
    }
  })
</script>

<li>
  {#if isInitialized}
    <a
      in:fade={{ delay }}
      on:click
      {href}
      class:margin-right={!noMargin}
      class:active={isActive}
      >{text}
      <span class="underline" bind:this={underLineSpan} />
    </a>
  {/if}
</li>

<style lang="scss">
  @import '../../../styles/variables.scss';

  li {
    display: block;
    float: left;
  }

  a {
    text-decoration: none;
    font-weight: $normal;
    font-size: $fs-h5;
    padding: 0.8em 0.4em;
    display: block;
    transition: color 0.2s ease;

    color: $colorLight;
    position: relative;

    &:hover,
    &:focus {
      color: $colorSecondary;
    }

    @media (max-width: $breakpoint-mobile) {
      font-size: $fs-h6;
      padding: 0.6em 0.3em;
    }
  }

  .margin-right {
    margin-right: 16px;
    @media (max-width: $breakpoint-mobile) {
      margin-right: 10px;
    }
  }

  .active {
    color: $colorSecondary;
  }

  .underline {
    position: absolute;
    bottom: 12px;
    left: 0px;
    height: 2px;
    width: 100%;
    background-color: $colorSecondary;
    border-radius: 8px;

    transform: scaleX(0);

    @media (max-width: $breakpoint-mobile) {
      bottom: 6px;
    }
  }
</style>
