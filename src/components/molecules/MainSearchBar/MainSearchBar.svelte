<script lang="ts">
  import SearchInput from '../../atoms/SearchInput/SearchInput.svelte'
</script>

<div class="main-search-container">
  <SearchInput
    on:change={(e) => console.log(e)}
    placeholder="Search for a person in the film industry"
  />
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .main-search-container {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 400px;

    display: grid;
    column-gap: 16px;

    padding: 8px 16px;
    border-radius: 4px;

    background-color: $colorLight;

    font-family: 'Nunito', sans-serif;
  }
</style>
