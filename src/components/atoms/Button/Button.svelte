<script lang="ts">
  import { createEventDispatcher, SvelteComponent } from 'svelte'
  import capitalize from 'lodash/capitalize'

  const dispatch = createEventDispatcher()

  function handleClick() {
    dispatch('click')
  }

  // Props
  export let text: string | undefined = undefined
  export let type: 'primary' | 'secondary' = 'primary'
  export let size: 'default' | 'sm' = 'default'
  export let icon: typeof SvelteComponent | undefined = undefined
  export let disabled: boolean = false
  export let translateIconY: number = 3

  let buttonElement: HTMLButtonElement
</script>

<button
  class={`${size} ${type}`}
  class:disabled
  {disabled}
  bind:this={buttonElement}
  on:click={() => !disabled && handleClick()}
>
  {#if text}
    <span class:text-container={icon} on:click={() => buttonElement.blur()}>
      {capitalize(text)}
    </span>
  {/if}
  {#if icon}
    <span
      style="transform: translateY({translateIconY}px);"
      class:icon-container={!!text}
    >
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
    background-color: $colorSecondary;
    border: 2px solid transparent;
    color: lighten($colorLight, 5%);
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      outline: none;
      background-color: $colorPrimary;
      border: 2px solid $colorSecondary;
    }
  }

  .secondary {
    background-color: $colorPrimary;
    border: 2px solid $colorSecondary;
    color: $colorLight;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
      outline: none;
      background-color: $colorSecondary;
      border: 2px solid transparent;
    }
  }

  .disabled {
    opacity: 0.35;
    background-color: $colorPrimary;
    border: 2px solid $colorLight;
    color: $colorLight;
    cursor: not-allowed;

    &:hover,
    &:focus {
      outline: none;
      background-color: $colorPrimary;
      border: 2px solid $colorLight;
    }
  }

  .default {
    padding: 2px 20px;
    border-radius: 4px;
    font-weight: $semibold;
    font-size: $fs-h5;

    @media (max-width: $breakpoint-mobile) {
      padding: 1px 16px;
      font-size: $fs-h6;
    }
  }

  .sm {
    padding: 1px 12px;
    border-radius: 3px;
    font-weight: $semibold;
    font-size: $fs-h6;

    @media (max-width: $breakpoint-mobile) {
      padding: 1px 8px;
      font-size: $fs-base;
    }
  }

  .text-container {
    @media (max-width: $breakpoint-mobile) {
      display: none;
    }
  }
  .icon-container {
    margin-left: 12px;

    @media (max-width: $breakpoint-mobile) {
      margin-left: 0px;
    }
  }

  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
</style>
