<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { isEqual, min } from 'lodash'
  import { select } from 'd3-selection'
  import { scaleTime } from 'd3-scale'
  import { extent } from 'd3-array'

  import personStore from '../../../stores/personStore'
  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'

  $: store = $personStore
  $: credits = store.credits
  let prevCredits = credits

  let wrapperHeight: number
  let wrapperWidth: number

  let xScale, yScale, sizeScale

  beforeUpdate(() => {
    if (credits?.length && !isEqual(credits, prevCredits)) {
      xScale = scaleTime()
        // .domain(extent(credits, (d) => d.unified_date))
        .range([0, wrapperWidth])
      prevCredits = credits
    }
  })
</script>

<div
  bind:clientHeight={wrapperHeight}
  bind:clientWidth={wrapperWidth}
  class="chart-container"
>
  <svg />
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .chart-container {
    grid-area: chart;
    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
