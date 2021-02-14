<script lang="ts">
  export let placeholder: string
</script>

<input type="text" on:change aria-label={placeholder} {placeholder} />

<style lang="scss">
  @import '../../../styles/variables.scss';
  input {
    background-color: transparent;
    border: none;
    padding: 2px 0px;

    &:focus {
      outline: 1px solid $colorSecondary;
    }
  }
</style>
