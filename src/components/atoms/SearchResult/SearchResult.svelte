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
</script>

<div
  in:fade={{ delay }}
  class={`result-container ${marginBottom && 'margin-bottom'}`}
>
  {#if 'title' in result}
    <Image src={result.poster_path} alt="" size="small" />
    <div>{result.title}</div>
  {:else}
    <Image src={result.profile_path} alt="" size="small" />
    <div>{result.name}</div>
  {/if}
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';
  .result-container {
    background-color: $colorLight;
    border-radius: 3px;
    padding: 8px 8px;

    display: flex;
  }
  .margin-bottom {
    margin-bottom: 8px;
  }
</style>
