<script lang="ts">
  import { fade } from 'svelte/transition'

  import Image from '../Image/Image.svelte'

  import type {
    IPersonSearchResult,
    IMovieSearchResult,
  } from '../../../types/mainSearchResults'

  export let result: IMovieSearchResult | IPersonSearchResult
  export let marginBottom: boolean = false
  export let index: number

  const delay = index < 3 ? (index + 1) * 100 : 0

  //TODO: add single line + ellipses
</script>

<div
  in:fade={{ delay }}
  class={`result-container ${marginBottom && 'margin-bottom'}`}
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
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .result-container {
    background-color: $colorLight;
    border-radius: 3px;
    padding: 8px;
    display: flex;
  }

  .result-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 60px;
    margin-left: 12px;
    .main {
      font-size: $fs-h6;
      font-weight: $semibold;
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
  .margin-bottom {
    margin-bottom: 8px;
  }
</style>
