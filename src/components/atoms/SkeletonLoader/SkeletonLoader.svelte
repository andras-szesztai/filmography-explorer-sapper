<script lang="ts">
  export let place: string
  export let borderRadius = 3

  let width: number
  let height: number
</script>

<div
  class="skeleton-loader"
  style="border-radius: {borderRadius}px; grid-area: {place};"
  bind:offsetWidth={width}
  bind:offsetHeight={height}
>
  <svg
    role="img"
    {width}
    {height}
    aria-labelledby="loading-aria"
    viewBox="0 0 {width} {height}"
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clip-path="url(#clip-path)"
      style="fill: url('#fill');"
    />
    <defs>
      <clipPath id="clip-path">
        <rect x="0" y="0" {width} {height} />
      </clipPath>
      <linearGradient id="fill">
        <stop offset="0.599964" stop-color="#f3f3f3" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="1.59996" stop-color="#a8a8a8" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="2.59996" stop-color="#f3f3f3" stop-opacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
    </defs>
  </svg>
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .skeleton-loader {
    overflow: hidden;
    position: relative;
  }
</style>
