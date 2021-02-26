<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { createEventDispatcher } from 'svelte'
  import gsap from 'gsap'

  import { Persons, Movie } from '../../atoms/icons'

  import type { TSearchTypes } from '../../../types/mainSearchResults'
  import { SearchTypes } from '../../../types/mainSearchResults'
  import { durationInSeconds } from '../../../styles/variables'

  // Props
  export let selected: TSearchTypes

  const dispatch = createEventDispatcher<{
    toggle: TSearchTypes
  }>()

  let spanElement: HTMLSpanElement

  afterUpdate(() => {
    if (spanElement) {
      gsap.to(spanElement, {
        x: selected === 'movie' ? 43 : 0,
        duration: durationInSeconds.sm,
        ease: 'power4.inOut',
      })
    }
  })
</script>

<div class="switch">
  <button
    aria-label="Toggle to person search"
    on:click={() => dispatch('toggle', SearchTypes.person)}
  >
    <span class="persons-icon">
      <Persons />
    </span>
  </button>
  <button
    aria-label="Toggle to movie search"
    on:click={() => dispatch('toggle', SearchTypes.movie)}
  >
    <span class="movie-icon">
      <Movie />
    </span>
  </button>
  <span class={`active ${selected}`} bind:this={spanElement} />
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .switch {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 68px;

    button {
      display: flex;
      background-color: transparent;
      border: 1px solid transparent;
      padding: 0;
      z-index: 1;
      cursor: pointer;

      &:focus-visible {
        border: 1px solid darken($colorSecondary, 5%);
      }
      &:focus {
        outline: none;
      }
    }
    .persons-icon {
      transform: translateY(6px);
    }
    .movie-icon {
      transform: translateY(5px);
    }

    .active {
      position: absolute;
      background-color: darken($colorSecondary, 5%);
      left: -6px;
      top: -3px;
      width: 40px;
      height: 36px;
      border-radius: 3px;
    }
  }
</style>
