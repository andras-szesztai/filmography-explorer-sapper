<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import gsap from 'gsap'

  import { currPath } from '../../../stores/pathname'

  import type { TLinkNames, TPathNames } from '../../../types/links'

  export let href: TPathNames
  export let text: TLinkNames
  export let delay: number
  export let noMargin: boolean = false

  let underLineSpan: HTMLSpanElement

  let previouslyActive = false
  let isInitialized = false
  $: isActive = $currPath === href

  onMount(() => {
    isInitialized = true
  })
  beforeUpdate(() => {
    if (isActive) {
      previouslyActive = true
      animateUnderline(1, 0.3)
    }
  })
  afterUpdate(() => {
    if (!isActive && previouslyActive) {
      previouslyActive = false
      animateUnderline(0, 0.2)
    }
  })

  function animateUnderline(scaleX: number, duration: number) {
    gsap.to(underLineSpan, {
      scaleX: scaleX,
      duration: duration,
      delay: 0.1,
      ease: 'power2.inOut',
    })
  }
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
      <span id="underline" bind:this={underLineSpan} />
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

    &:hover {
      color: $colorSecondary;
    }
  }

  .margin-right {
    margin-right: 16px;
  }

  .active {
    color: $colorSecondary;
  }

  #underline {
    position: absolute;
    bottom: 12px;
    left: 0px;
    height: 2px;
    width: 100%;
    background-color: $colorSecondary;
    border-radius: 8px;

    transform: scaleX(0);
  }
</style>
