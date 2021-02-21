<script lang="ts">
  export let placeholder: string
  export let value: string
</script>

<input
  type="text"
  bind:value
  on:input
  on:focus
  on:blur
  on:keydown
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
