<script lang="ts">
  import dayjs from 'dayjs'
  import { capitalize } from 'lodash'
  import numeral from 'numeral'

  import { ArrowRight } from '../../icons'

  import { FULL_FORMAT } from '../../../../constants/dates'
  import { BIG_NUM_FORMAT, NUM_FORMAT } from '../../../../constants/numbers'

  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
    IPersonCrewCastCredits,
  } from '../../../../types/person'

  import { color } from '../../../../styles/variables'

  export let data:
    | IPersonCrewCredits
    | IPersonCastCredits
    | IPersonCrewCastCredits

  // TODO: UPDATE with active movie stor
</script>

<div class="content-container">
  <p class="title">{data.title || data.name}</p>
  <p>
    <span>
      {#if 'release_date' in data}
        Release date:
      {:else}
        First air date:
      {/if}
    </span>
    {dayjs(data.first_air_date || data.release_date).format(FULL_FORMAT)}
  </p>
  <p><span> Type: </span> {capitalize(data.media_type)}</p>
  {#if 'job' in data}
    <p>
      <span> Role: </span>
      {data.job}
    </p>
  {/if}
  {#if 'character' in data}
    <p>
      <span> Character: </span>
      {data.character}
    </p>
  {/if}
  <p>
    <span> Score: </span>
    {data.vote_average} / 10 ({numeral(data.vote_count).format(
      data.vote_count >= 1000 ? BIG_NUM_FORMAT : NUM_FORMAT
    )} vote{data.vote_count > 1 ? 's' : ''})
  </p>
  <p>
    <span> Click </span>
    to find ot more! &nbsp;<ArrowRight fill={color.primary} size={8} />
  </p>
</div>

<style lang="scss">
  @import '../../../../styles/variables.scss';

  .content-container {
    padding: 8px;
    display: grid;
    /* grid-template-rows: repeat(, min-content); */
    row-gap: 4px;
    white-space: nowrap;
    color: $colorPrimary;
    font-weight: $light;
    font-size: $fs-milli;
    .title {
      font-size: $fs-h6;
      font-weight: $semibold;
    }

    span {
      font-weight: $semibold;
    }
  }
</style>
