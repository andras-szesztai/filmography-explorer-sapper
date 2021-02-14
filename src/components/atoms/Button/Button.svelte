<script lang="ts">
  import capitalize from 'lodash/capitalize'
  import type { SvelteComponent } from 'svelte'
  export let text: string = 'Button'
  export let type: 'primary' = 'primary'
  export let size: 'default' = 'default'
  export let icon: typeof SvelteComponent | undefined = undefined
</script>

<button class={`${size} ${type}`}>
  {capitalize(text)}
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
    border-radius: 8px;
    font-weight: $normal;
    font-size: $fs-h5;
  }

  .icon-container {
    margin-left: 12px;
    transform: translateY(3px);
  }
</style>
