<script lang="ts">
  import type { SvelteComponent } from 'svelte'
  import capitalize from 'lodash/capitalize'

  // Props
  export let text: string = 'Button'
  export let type: 'primary' = 'primary'
  export let size: 'default' = 'default'
  export let icon: typeof SvelteComponent | undefined = undefined
</script>

<button class={`${size} ${type}`}>
  <span class:text-container={icon}>
    {capitalize(text)}
  </span>
  {#if icon}
    <span class="icon-container">
      <svelte:component this={icon} />
    </span>
  {/if}
</button>

<style lang="scss">
  @import '../../../styles/variables.scss';
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .primary {
    background-color: darken($colorSecondary, 6%);
    border: 2px solid transparent;
    color: lighten($colorLight, 5%);
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      background-color: $colorPrimary;
      border: 2px solid $colorSecondary;
    }
  }

  .default {
    padding: 2px 24px;
    border-radius: 4px;
    font-weight: $normal;
    font-size: $fs-h5;

    @media (max-width: $breakpoint-mobile) {
      padding: 1px 18px;
      font-size: $fs-h6;
    }
  }

  .text-container {
    @media (max-width: $breakpoint-mobile) {
      display: none;
    }
  }
  .icon-container {
    margin-left: 12px;
    transform: translateY(3px);

    @media (max-width: $breakpoint-mobile) {
      margin-left: 0px;
    }
  }
</style>
