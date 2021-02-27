<script lang="ts">
  import { stores } from '@sapper/app'
  import { afterUpdate, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import gsap from 'gsap'

  import { Search } from '../../atoms/icons'
  import { SearchInput } from '../../atoms'
  import { SwitchButton, SearchResult } from '../../molecules'

  import personStore from '../../../stores/personStore'

  import { MOVIE_DB_URL } from '../../../constants/requests'
  import { LAST_SEARCHED } from '../../../constants/localStorageKeys'

  import type {
    IMovieSearchResult,
    IPersonSearchResult,
    TSearchTypes,
  } from '../../../types/mainSearchResults'
  import { SearchTypes } from '../../../types/mainSearchResults'

  import { durationInSeconds } from '../../../styles/variables'

  const { session } = stores()
  const apiKey = $session.MOVIE_DB_API_KEY

  // State
  let searchString: string
  let timer: number
  let selected: TSearchTypes = SearchTypes.person
  let data: Array<IMovieSearchResult | IPersonSearchResult> = []
  let loading: boolean = false
  let error: string
  let isFocused = false
  let prevFocused = false
  let dropdownElement: HTMLDivElement

  let activeResult = 0

  onMount(() => {
    const id = localStorage.getItem(LAST_SEARCHED)
    if (id) {
      personStore.populate(id, apiKey)
    }
  })

  afterUpdate(() => {
    if (isFocused && !prevFocused) {
      prevFocused = true
      if (dropdownElement) {
        gsap.to(dropdownElement, {
          scaleY: 1,
          transformOrigin: 'top',
          duration: durationInSeconds.sm,
          ease: 'power3.inOut',
        })
      }
    }
    if (!isFocused && prevFocused) {
      prevFocused = false
      if (dropdownElement) {
        gsap.to(dropdownElement, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: durationInSeconds.sm,
          delay: 0.4,
          ease: 'power3.inOut',
          onComplete: () => (activeResult = 0),
        })
      }
    }
  })

  const handleInput = () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      if (searchString) {
        try {
          error = ''
          loading = true
          const res = await fetch(
            `${MOVIE_DB_URL}/search/${selected}?api_key=${$session.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchString}`
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
    searchString = ''
    activeResult = 0
    data = []
    selected = e.detail
  }
  const handleBlur = () => {
    isFocused = false
  }
  const handleKeyDown = (e: CustomEvent) => {
    const key = e.detail.event.key
    if (data.length && isFocused) {
      const dataLength = data.length
      if (key === 'ArrowDown') {
        if (activeResult !== dataLength - 1) {
          activeResult = activeResult + 1
        } else {
          activeResult = 0
        }
      }
      if (key === 'ArrowUp') {
        if (activeResult === 0) {
          activeResult = dataLength - 1
        } else {
          activeResult = activeResult - 1
        }
      }
      if (dropdownElement) {
        gsap.to(dropdownElement, {
          duration: durationInSeconds.sm,
          ease: 'power2.inOut',
          scrollTo: activeResult * 83,
        })
      }
      if (key === 'Enter' || key === 'Space') {
        e.detail.element.blur()
        handleSearch(data[activeResult].id)
      }
    }
  }
  const handleSearch = (id: string) => {
    localStorage.setItem(LAST_SEARCHED, id)
    personStore.populate(id, apiKey)
    isFocused = false
    searchString = ''
    activeResult = 0
    data = []
  }

  $: placeholder =
    selected === SearchTypes.person
      ? 'person in the film industry'
      : 'movie or series'
</script>

<div class="absolute-container">
  <div class="main-search-container">
    <span class="search-icon">
      <Search />
    </span>
    <div class="search-input">
      <SearchInput
        bind:value={searchString}
        on:input={handleInput}
        on:focus={() => (isFocused = true)}
        on:blur={handleBlur}
        on:keydown={handleKeyDown}
        placeholder={!isFocused ? `Search for a ${placeholder}` : ''}
      />
    </div>
    <SwitchButton {selected} on:toggle={handleToggle} />
    <div bind:this={dropdownElement} class="results-dropdown">
      {#if isFocused}
        {#if !error}
          {#if !data.length}
            {#if !loading}
              {#if !searchString}
                <span in:fade={{ delay: 300 }} class="placeholder"
                  >Search for a {placeholder}</span
                >
              {:else}
                <span in:fade={{ delay: 800 }} class="placeholder"
                  >Sorry, no results found</span
                >
              {/if}
            {:else}
              <span in:fade class="placeholder">Loading...</span>
            {/if}
          {:else}
            <div class="results-container">
              {#each data as result, index}
                <SearchResult
                  {result}
                  {index}
                  isActive={activeResult === index}
                  on:mouseenter={() => (activeResult = index)}
                  on:click={() => handleSearch(data[activeResult].id)}
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
    z-index: 1;
    @media (max-width: $breakpoint-mobile) {
      top: 12px;
      left: 12px;
    }
  }

  .main-search-container {
    position: relative;
    width: 500px;

    display: flex;

    padding: 8px 16px;
    border-radius: 4px;

    @media (max-width: $breakpoint-mobile) {
      width: 320px;
      padding: 4px 8px;
    }

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
      position: absolute;
      font-weight: $normal;
      font-size: $fs-h6;
      color: $colorLight;
      padding-left: 36px;
    }
  }

  .results-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
