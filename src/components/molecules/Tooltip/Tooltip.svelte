<script lang="ts">
  import { fade } from 'svelte/transition'

  export let topOffset: number
  let isHovered = false
</script>

<div
  on:mouseenter={() => (isHovered = true)}
  on:mouseleave={() => (isHovered = false)}
  class="relative-container"
>
  <slot />
  {#if isHovered}
    <div
      transition:fade={{ duration: 200 }}
      class="absolute-container"
      style="top: -{topOffset}px"
    >
      <div class="arrow-container">
        <slot name="content" />
      </div>
    </div>
  {/if}
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .relative-container {
    position: relative;
    display: inline;
  }

  .absolute-container {
    position: absolute;
    background: $colorLight;
    padding: 4px 8px;
    border-radius: 3px;
    left: calc(12px + 100%);
    filter: drop-shadow(1px 1px 2px rgba($colorPrimary, 0.6));
    pointer-events: none;
  }

  .arrow-container {
    position: relative;
    &:after {
      right: calc(100% + 7px);
      top: 8px;
      border: solid transparent;
      content: '';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-color: rgba(136, 183, 213, 0);
      border-right-color: $colorLight;
      border-width: 8px;
      margin-top: -8px;
    }
  }
</style>
