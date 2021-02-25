<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let placeholder: string
  export let value: string
  let inputElement: HTMLInputElement

  const dispatch = createEventDispatcher<{
    keydown: { event: KeyboardEvent; element: HTMLInputElement }
  }>()

  const handleKeydown = (e: KeyboardEvent) => {
    dispatch('keydown', { event: e, element: inputElement })
  }
</script>

<input
  type="text"
  bind:value
  bind:this={inputElement}
  on:input
  on:focus
  on:blur
  on:keydown={handleKeydown}
  aria-label={placeholder}
  {placeholder}
/>

<style lang="scss">
  @import '../../../styles/variables.scss';
  input {
    background-color: transparent;
    border: none;
    padding: 2px;
    flex: 1;
    width: 100%;

    font-family: 'Nunito', sans-serif;
    font-weight: $normal;
    font-size: $fs-h6;
    color: $colorLight;

    &::placeholder {
      color: $colorLight;
      opacity: 1;
    }

    &:focus {
      outline: none;
    }
  }
</style>
