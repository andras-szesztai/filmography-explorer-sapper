<script lang="ts">
  import { stores } from '@sapper/app'
  import { Search } from '../../atoms/icons'
  import { SearchInput } from '../../atoms'

  const { session } = stores()

  // State
  let value: string
  let timer: number

  const debounce = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      console.log($session)
    }, 300)
  }
</script>

<div class="main-search-container">
  <span class="search-icon">
    <Search />
  </span>
  <SearchInput
    bind:value
    on:input={debounce}
    placeholder="Search for a person in the film industry"
  />
  <div class="switch" />
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .main-search-container {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 400px;

    display: flex;

    padding: 8px 16px;
    border-radius: 4px;

    /* background-color: $colorSecondary; */
    border: 2px solid $colorSecondary;

    &:focus {
      outline: 1px solid red;
    }
  }

  .search-icon {
    margin-right: 14px;
    transform: translateY(3px);
  }

  .switch {
    position: relative;
    display: flex;
  }
</style>
