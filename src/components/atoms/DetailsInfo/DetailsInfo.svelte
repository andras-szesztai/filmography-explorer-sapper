<script lang="ts">
  import type { IMovieDetails, ISeriesDetails } from '../../../types/media'
  import numeral from 'numeral'

  export let details: IMovieDetails | ISeriesDetails
</script>

{#if 'title' in details}
  <div class="row">
    <span> Release date: </span>
    {details.release_date}
  </div>
  <div class="row">
    <span>Budget: </span>
    {details.budget ? numeral(details.budget).format('($0.0a)') : 'unknown'}
  </div>
  <div class="row">
    <span>Revenue: </span>
    {details.revenue ? numeral(details.revenue).format('($0.0a)') : 'unknown'}
  </div>
  <div class="row">
    <span>Runtime: </span>
    {details.runtime ? `${details.runtime} minutes` : 'unknown'}
  </div>
{:else}
  <div class="row">
    <span> First air date: </span>
    {details.first_air_date}
  </div>
  <div class="row">
    <span> Last air date: </span>
    {details.last_air_date || 'On air'}
  </div>
  <div class="row">
    <span>Number of episodes: </span>
    {details.number_of_episodes}
  </div>
  <div class="row">
    <span>Number of seasons: </span>
    {details.number_of_seasons}
  </div>
{/if}

<style lang="scss">
  @import '../../../styles/variables.scss';

  .row {
    color: $colorLight;
    font-weight: $thin;
    font-size: $fs-milli;
    span {
      font-weight: $semibold;
    }
  }
</style>
