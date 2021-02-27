<script lang="ts">
  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
    IPersonCrewCastCredits,
  } from '../../../../types/person'

  export let data:
    | IPersonCrewCredits
    | IPersonCastCredits
    | IPersonCrewCastCredits
    | undefined

  $: console.log(data)

  // vote_average (vote_count)
  // unified_date (first_air_date, release_date)
  // media_type
  // character, job
  // Click to find out more!
</script>

<div class="content-container" />

<style lang="scss">
  @import '../../../../styles/variables.scss';

  .content-container {
  }
</style>
