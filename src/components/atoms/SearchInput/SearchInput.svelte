<script lang="ts">
  export let placeholder: string
  export let value: string
</script>

<input type="text" bind:value on:input aria-label={placeholder} {placeholder} />

<style lang="scss">
  @import '../../../styles/variables.scss';
  input {
    background-color: transparent;
    border: none;
    padding: 2px;
    flex: 1;

    font-family: 'Nunito', sans-serif;
    font-weight: $normal;
    font-size: $fs-base;
    color: $colorLight;

    &::placeholder {
      color: $colorLight;
    }

    &:focus {
      outline: none;
    }
  }
</style>
