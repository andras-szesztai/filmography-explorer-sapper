<script lang="ts">
  import type {
    IPersonSearchResult,
    IMovieSearchResult,
  } from '../../../types/mainSearchResults'

  export let result: IMovieSearchResult | IPersonSearchResult
</script>

{#if 'title' in result}
  <div>{result.title}</div>
{:else}
  <div>{result.name}</div>
{/if}
