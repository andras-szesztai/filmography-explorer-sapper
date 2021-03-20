<script lang="ts">
  import { stores } from '@sapper/app'
  import { isUndefined } from 'lodash'

  import { Button } from '../../atoms'

  import type {
    IPersonCastCredits,
    IPersonCrewCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'
  import movieStore from '../../../stores/movieStore'

  const { session } = stores()
  const apiKey = $session.MOVIE_DB_API_KEY

  export let credits: Array<
    IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  >
  export let currMovieId: number

  let currIndex: number | undefined
  let prevId: number | undefined
  $: if (currMovieId && currMovieId !== prevId) {
    currIndex = credits.findIndex((c) => c.id == currMovieId)
  }
</script>

<div class="controls-container">
  <Button
    size="sm"
    type="secondary"
    text="Previous"
    disabled={currIndex === credits.length - 1}
    on:click={() => {
      !isUndefined(currIndex) &&
        movieStore.populate(
          credits[currIndex + 1].id,
          credits[currIndex + 1].media_type,
          apiKey
        )
    }}
  />
  <Button
    size="sm"
    type="secondary"
    text="Next"
    disabled={currIndex === 0}
    on:click={() =>
      !isUndefined(currIndex) &&
      movieStore.populate(
        credits[currIndex - 1].id,
        credits[currIndex - 1].media_type,
        apiKey
      )}
  />
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .controls-container {
    display: grid;
    grid-template-columns: repeat(2, max-content);
    column-gap: 8px;
    justify-content: end;
  }
</style>
