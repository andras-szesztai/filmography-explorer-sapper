<script lang="ts">
  import type { IMovieDetails, ISeriesDetails } from '../../../types/media'
  import { fade } from 'svelte/transition'

  import { SkeletonLoader } from '../../atoms'

  export let loading: boolean
  export let error: string
  export let details: IMovieDetails | ISeriesDetails | undefined
</script>

<div class="bottom-content-container">
  <div class="grid">
    {#if !error}
      {#if !loading}
        <div class="info">Info</div>
        <div class="genres">Genres</div>
        <div class="score">Score</div>
        <div class="crew">Crew</div>
        <div class="cast">Cast</div>
      {/if}
      <SkeletonLoader {loading} place="info" />
      <SkeletonLoader {loading} place="genres" />
      <SkeletonLoader {loading} place="score" />
      <SkeletonLoader {loading} place="crew" />
      <SkeletonLoader {loading} place="cast" />
    {:else if error && !loading}
      <div transition:fade={{ delay: 100 }} class="error">
        Sorry, something went wrong
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .bottom-content-container {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    .grid {
      display: grid;
      grid-template-rows: 100px 50px 100px;
      row-gap: 12px;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 16px;
      grid-template-areas:
        'info genres'
        'score score'
        'crew cast';
      padding: 6px 8px;
    }

    .info {
      grid-area: info;
    }

    .genres {
      grid-area: genres;
    }

    .score {
      grid-area: score;
    }

    .crew {
      grid-area: crew;
    }

    .cast {
      grid-area: cast;
    }
  }

  ::selection {
    color: $colorPrimary;
    background: $colorSecondary;
  }
</style>
