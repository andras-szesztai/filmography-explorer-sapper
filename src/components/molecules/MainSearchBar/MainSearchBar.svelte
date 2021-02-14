<script lang="ts">
  import { stores } from '@sapper/app'

  import { Search, Persons, Movie } from '../../atoms/icons'
  import { SearchInput } from '../../atoms'

  import { MOVIE_DB_URL } from '../../../constants/requests'

  import type { IPersonSearchResult } from '../../../types/mainSearchResults'

  const { session } = stores()

  // State
  let value: string
  let timer: number
  let data = [] as IPersonSearchResult[]
  let loading: boolean = false
  let eror: string

  const debounce = () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      try {
        if (value) {
          loading = true
          // let res = await fetch(
          //   `${MOVIE_DB_URL}/search/person?api_key=${$session.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${value}`
          // )
          // const json = await (res.json() as Promise<{
          //   results: IPersonSearchResult[]
          // }>)
          // searchResults = await json.results
          loading = false
        }
      } catch (error) {
        console.log(error)
      }
    }, 300)
  }
</script>

<div class="main-search-container">
  <span class="search-icon">
    <Search />
  </span>
  <div class="search-input">
    <SearchInput
      bind:value
      on:input={debounce}
      placeholder="Search for a person in the film industry"
    />
  </div>
  <div class="switch">
    <span class="persons-icon">
      <Persons />
    </span>
    <span class="movie-icon">
      <Movie />
    </span>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .main-search-container {
    position: absolute;
    top: 24px;
    left: 24px;
    width: 450px;

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

  .search-input {
    position: relative;
    margin-right: 16px;
    flex: 1;
  }
  .switch {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 64px;
    .persons-icon {
      transform: translateY(4px);
    }
    .movie-icon {
      transform: translateY(3px);
    }
  }
</style>
