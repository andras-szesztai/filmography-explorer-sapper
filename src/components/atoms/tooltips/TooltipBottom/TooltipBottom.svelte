<script lang="ts">
  import { fade } from 'svelte/transition'

  import { durationInMilliseconds } from '../../../../styles/variables'

  export let topOffset: number

  let isHovered = false
  let wrapperHeight: number
  let wrapperWidth: number
  let tooltipWidth: number

  $: leftPosition = tooltipWidth - wrapperWidth / 2 - 16
</script>

<div
  class="relative-container"
  bind:clientHeight={wrapperHeight}
  bind:clientWidth={wrapperWidth}
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
>
  <slot />
  {#if isHovered}
    <div
      class="absolute-container"
      transition:fade={{ duration: durationInMilliseconds.xs }}
      bind:clientWidth={tooltipWidth}
      style="top: {wrapperHeight + topOffset}px; left: -{leftPosition}px;"
    >
      <div class="arrow-container">
        <slot name="content" />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import '../../../../styles/variables.scss';
  .relative-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .absolute-container {
    position: absolute;
    background: $colorLight;
    padding: 4px 8px;
    border-radius: 3px;
    filter: drop-shadow(1px 1px 2px rgba($colorPrimary, 0.6));
    pointer-events: none;
  }

  .arrow-container {
    position: relative;
    &:after {
      bottom: calc(100% + 4px);
      right: 0px;
      border: solid transparent;
      content: '';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-color: rgba(136, 183, 213, 0);
      border-bottom-color: $colorLight;
      border-width: 8px;
      margin-top: -8px;
    }
  }
</style>
