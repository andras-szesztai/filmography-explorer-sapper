<script lang="ts">
  import { stores } from '@sapper/app'
  import { afterUpdate } from 'svelte'
  import { fade } from 'svelte/transition'
  import gsap from 'gsap'

  import { Search } from '../../atoms/icons'
  import { SearchInput, SwitchButton, SearchResult } from '../../atoms'

  import { MOVIE_DB_URL } from '../../../constants/requests'

  import type {
    IMovieSearchResult,
    IPersonSearchResult,
    TSearchTypes,
  } from '../../../types/mainSearchResults'
  import { SearchTypes } from '../../../types/mainSearchResults'

  const { session } = stores()

  // State
  let value: string
  let timer: number
  let selected: TSearchTypes = SearchTypes.person
  let data: Array<IMovieSearchResult | IPersonSearchResult> = []
  let loading: boolean = false
  let error: string
  let isFocused = false
  let prevFocused = false
  let dropdownElement: HTMLDivElement

  const handleInput = () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      if (value) {
        try {
          error = ''
          loading = true
          const res = await fetch(
            `${MOVIE_DB_URL}/search/${selected}?api_key=${$session.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${value}`
          )
          const json = await (res.json() as Promise<{
            results: Array<IPersonSearchResult>
          }>)
          data = json.results
          loading = false
        } catch (error) {
          loading = false
          error = 'Sorry, something went wrong, please try again later.'
        }
      } else {
        data = []
      }
    }, 300)
  }

  const handleToggle = (e: CustomEvent) => {
    isFocused = false
    data = []
    selected = e.detail
  }
  const handleBlur = () => {
    isFocused = false
  }
  $: placeholder =
    selected === SearchTypes.person
      ? 'person in the film industry'
      : 'movie or series'

  afterUpdate(() => {
    if (isFocused && !prevFocused) {
      prevFocused = true
      gsap.to(dropdownElement, {
        scaleY: 1,
        transformOrigin: 'top',
        duration: 0.3,
        ease: 'power3.inOut',
      })
    }
    if (!isFocused && prevFocused) {
      prevFocused = false
      gsap.to(dropdownElement, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.3,
        ease: 'power3.inOut',
      })
    }
  })
</script>

<div class="absolute-container">
  <div class="main-search-container">
    <span class="search-icon">
      <Search />
    </span>
    <div class="search-input">
      <SearchInput
        bind:value
        on:input={handleInput}
        on:focus={() => (isFocused = true)}
        on:blur={handleBlur}
        placeholder={!isFocused ? `Search for a ${placeholder}` : ''}
      />
    </div>
    <SwitchButton {selected} on:toggle={handleToggle} />
    <div bind:this={dropdownElement} class="results-dropdown">
      {#if isFocused}
        {#if !error}
          {#if !data.length}
            {#if !loading}
              <span in:fade={{ delay: 200 }} class="placeholder"
                >Search for a {placeholder}</span
              >
            {:else}
              <span in:fade class="placeholder">Loading..</span>
            {/if}
          {:else}
            <div class="results-container">
              {#each data as result, index}
                <SearchResult
                  {result}
                  marginBottom={index < data.length - 1}
                  {index}
                />
              {/each}
            </div>
          {/if}
        {:else}
          <div>{error}</div>
        {/if}
      {/if}
    </div>
    <span class="cover" />
  </div>
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .absolute-container {
    position: absolute;
    top: 24px;
    left: 24px;
  }

  .main-search-container {
    position: relative;
    width: 500px;

    display: flex;

    padding: 8px 16px;
    border-radius: 4px;

    border: 2px solid darken($colorSecondary, 5%);

    &:focus {
      outline: 1px solid red;
    }
  }

  .search-icon {
    margin-right: 14px;
    transform: translateY(5px);
  }

  .search-input {
    position: relative;
    margin-right: 16px;
    flex: 1;
  }

  .cover {
    position: absolute;
    bottom: 0px;
    left: calc(400px - 4px);
    background-color: $colorPrimary;
    width: 2px;
    height: 2px;
  }

  .results-dropdown {
    position: absolute;
    bottom: -198px;
    left: -2px;

    padding: 8px 16px;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    width: 400px;
    height: 200px;
    overflow-y: scroll;
    background-color: $colorPrimary;
    border-radius: 0 0 4px 4px;
    border-left: 2px solid darken($colorSecondary, 5%);
    border-bottom: 2px solid darken($colorSecondary, 5%);
    border-right: 2px solid darken($colorSecondary, 5%);

    transform: scaleY(0);

    .placeholder {
      font-weight: $normal;
      font-size: $fs-h6;
      color: $colorLight;
      padding-left: 21px;
    }
  }

  .results-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
