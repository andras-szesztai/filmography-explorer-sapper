<script lang="ts">
  import { fade } from 'svelte/transition'

  export let place: string
  export let loading: boolean
  export let borderRadius = 3
  export let duration = 2

  let width = 0
  let height = 0
</script>

{#if loading}
  <div
    transition:fade
    class="skeleton-loader"
    style="border-radius: {borderRadius}px; grid-area: {place};"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    {#if width}
      <svg
        role="img"
        width={100}
        height={10}
        aria-labelledby="loading-aria"
        viewBox="0 0 {width} {height}"
      >
        <title id="loading-aria">Loading...</title>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          clip-path="url(#clip-path-{place})"
          style="fill: url('#fill-{place}');"
        />
        <defs>
          <clipPath id="clip-path-{place}">
            <rect x="0" y="0" {width} {height} />
          </clipPath>
          <linearGradient id="fill-{place}">
            <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-2; -2; 1"
                keyTimes="0; 0.25; 1"
                dur="{duration}s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="1.59996" stop-color="#a8a8a8" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-1; -1; 2"
                keyTimes="0; 0.25; 1"
                dur="{duration}s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
              <animate
                attributeName="offset"
                values="0; 0; 3"
                keyTimes="0; 0.25; 1"
                dur="{duration}s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>
    {/if}
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';

  .skeleton-loader {
    overflow: hidden;
    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
