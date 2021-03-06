<script lang="ts">
  import { stores } from '@sapper/app'
  import axios, { AxiosResponse } from 'axios'
  import { afterUpdate, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import gsap from 'gsap'

  import { Search } from '../../atoms/icons'
  import { SearchInput } from '../../atoms'
  import { SwitchButton, SearchResult } from '../../molecules'

  import personStore from '../../../stores/personStore'
  import movieStore from '../../../stores/movieStore'

  import { MOVIE_DB_URL } from '../../../constants/requests'
  import {
    LAST_SEARCHED_ID,
    LAST_SEARCHED_TYPE,
  } from '../../../constants/localStorageKeys'

  import type {
    IMovieSearchResult,
    IPersonSearchResult,
    ISeriesSearchResult,
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
  let data: Array<
    IMovieSearchResult | IPersonSearchResult | ISeriesSearchResult
  > = []
  let loading: boolean = false
  let error: string
  let isFocused = false
  let prevFocused = false
  let dropdownElement: HTMLDivElement

  let activeResult = 0

  onMount(() => {
    const id = localStorage.getItem(LAST_SEARCHED_ID)
    const type = localStorage.getItem(LAST_SEARCHED_TYPE)
    if (id && type) {
      if (type === SearchTypes.person) {
        personStore.populate(id, apiKey)
      } else {
        movieStore.populate(+id, type, apiKey)
      }
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

  // TODO: split it up into smaller chuncks
  const handleInput = () => {
    clearTimeout(timer)
    timer = setTimeout(async () => {
      const mainRequest = `${MOVIE_DB_URL}/search/${selected}?api_key=${$session.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchString}`
      if (searchString) {
        error = ''
        loading = true
        if (selected === SearchTypes.person) {
          try {
            const res = await fetch(mainRequest)
            const json = await (res.json() as Promise<{
              results: Array<IPersonSearchResult>
            }>)
            data = json.results
            loading = false
          } catch (error) {
            loading = false
            error = 'Sorry, something went wrong, please try again later.'
            data = []
          }
        } else {
          axios
            .all([
              axios.get(mainRequest),
              axios.get(
                `${MOVIE_DB_URL}/search/tv?api_key=${$session.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchString}`
              ),
            ])
            .then(
              axios.spread(
                (movies: AxiosResponse<any>, tv: AxiosResponse<any>) => {
                  const moviesData = movies.data.results as Omit<
                    IMovieSearchResult,
                    'media_type'
                  >[]
                  const seriesData = tv.data.results as Omit<
                    ISeriesSearchResult,
                    'media_type'
                  >[]
                  data = [
                    ...moviesData.map((d) => ({ ...d, media_type: 'movie' })),
                    ...seriesData.map((d) => ({ ...d, media_type: 'tv' })),
                  ].sort((a, b) => b.popularity - a.popularity)
                  loading = false
                }
              )
            )
            .catch(() => {
              loading = false
              error = 'Sorry, something went wrong, please try again later.'
              data = []
            })
        }
      } else if (!data.length) {
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
        const selectedData = data[activeResult]
        handleSearch(
          selectedData.id,
          'media_type' in selectedData ? selectedData.media_type : ''
        )
      }
    }
  }
  const handleSearch = (id: string, mediaType: string) => {
    localStorage.setItem(LAST_SEARCHED_ID, id)
    localStorage.setItem(LAST_SEARCHED_TYPE, mediaType || 'person')
    if (selected === SearchTypes.person) {
      personStore.populate(id, apiKey)
      movieStore.empty()
    } else {
      movieStore.populate(+id, mediaType, apiKey)
      personStore.empty()
    }
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
                  on:click={() => {
                    const selectedData = data[activeResult]
                    handleSearch(
                      selectedData.id,
                      'media_type' in selectedData
                        ? selectedData.media_type
                        : ''
                    )
                  }}
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
    z-index: 2;
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

    border: 2px solid $colorSecondary;

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
    border-left: 2px solid $colorSecondary;
    border-bottom: 2px solid $colorSecondary;
    border-right: 2px solid $colorSecondary;

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
  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba($colorLight, 0.15);
  }

  ::-webkit-scrollbar-thumb {
    background: $colorSecondary;
    border-radius: 2px;
  }
</style>
