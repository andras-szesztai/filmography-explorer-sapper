<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { cubicOut, cubicIn } from 'svelte/easing'

  import { Image } from '../../atoms'
  import { ArrowRight } from '../../atoms/icons'

  import type {
    IPersonSearchResult,
    IMovieSearchResult,
  } from '../../../types/mainSearchResults'

  import { durationInMilliseconds } from '../../../styles/variables'

  export let result: IMovieSearchResult | IPersonSearchResult
  export let index: number
  export let isActive: boolean = false

  const delay = index < 3 ? (index + 1) * 100 : 0
</script>

<button
  in:fade={{ delay }}
  class="result-container"
  on:mouseenter
  on:mouseleave
  on:click
>
  {#if 'title' in result}
    <Image src={result.poster_path} alt="" size="small" />
    <div class="result-text">
      <span class="main">{result.title}</span>
      <div class="sub">
        Release date:
        <span>
          {result.release_date || '-'}
        </span>
      </div>
    </div>
  {:else}
    <Image src={result.profile_path} alt="" size="small" />
    <div class="result-text">
      <span class="main">{result.name}</span>
      <div class="sub">
        Known for:
        <span>
          {result.known_for_department || '-'}
        </span>
      </div>
    </div>
  {/if}
  {#if isActive}
    <div
      in:fly={{
        duration: durationInMilliseconds.sm,
        easing: cubicOut,
        x: 200,
        opacity: 1,
      }}
      out:fly={{
        duration: durationInMilliseconds.sm,
        delay: 100,
        easing: cubicIn,
        x: 200,
        opacity: 0,
      }}
      class="active"
    >
      <span> Show me more! &nbsp; <ArrowRight /> </span>
    </div>
  {/if}
</button>
<div class="spacer" />

<style lang="scss">
  @import '../../../styles/variables.scss';
  .result-container {
    background-color: $colorLight;
    border-radius: 3px;
    padding: 8px;
    display: flex;
    border: none;
    position: relative;
    overflow: hidden;
    min-height: 75px;
    cursor: pointer;
  }

  .result-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 60px;
    margin-left: 12px;
    .main {
      font-size: $fs-h6;
      font-weight: $semibold;
      width: 220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      text-align: left;
    }

    .sub {
      font-size: $fs-milli;
      margin-top: 2px;
      font-weight: $light;

      span {
        font-weight: $semibold;
      }
    }
  }

  .active {
    position: absolute;
    height: 100%;
    width: 70px;
    background-color: $colorSecondary;
    top: 0px;
    right: 0px;
    border: 2px solid $colorLight;
    border-radius: 0 3px 3px 0;
    padding: 8px;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: $fs-micro;
      font-weight: $semibold;
      text-align: left;
      color: $colorLight;
    }
  }
  .spacer {
    min-height: 8px;
    background-color: transparent;
  }
</style>
