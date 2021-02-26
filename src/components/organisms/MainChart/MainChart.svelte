<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { isEqual } from 'lodash'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { scaleTime, scaleLinear, scaleSqrt } from 'd3-scale'
  import { extent } from 'd3-array'

  import { MainChartCircles } from '../../atoms/chartElements'

  import { mainChartMargins } from '../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'

  export let data: (IPersonCrewCredits | IPersonCastCredits)[] | undefined

  let prevData = data

  let wrapperHeight: number
  let updatedWrapperHeight: number
  let prevUpdatedWrapperHeight: number
  let wrapperWidth: number
  let updatedWrapperWidth: number
  let prevUpdatedWrapperWidth: number

  let xScale: ScaleTime<number, number, never>
  let yScale: ScaleLinear<number, number, never>
  let sizeScale: ScalePower<number, number, never>

  afterUpdate(() => {
    if (
      wrapperHeight &&
      wrapperWidth &&
      data?.length &&
      !isEqual(data, prevData)
    ) {
      const chartWidth =
        wrapperWidth - mainChartMargins.left - mainChartMargins.right
      const chartHeight =
        wrapperHeight - mainChartMargins.top - mainChartMargins.bottom
      const xDomain = extent(data, (d) => d.unified_date)
      if (!!xDomain[0]) {
        xScale = scaleTime().domain(xDomain).range([0, chartWidth])
      }
      const yDomain = extent(data, (d) => d.vote_average)
      if (!!yDomain[0]) {
        yScale = scaleLinear().domain(yDomain).range([chartHeight, 0])
      }
      const sizeDomain = extent(data, (d) => d.vote_count)
      if (!!sizeDomain[0]) {
        sizeScale = scaleSqrt().domain(sizeDomain).range([4, 32])
      }
      prevData = data
      prevUpdatedWrapperHeight = wrapperHeight
      prevUpdatedWrapperWidth = wrapperWidth
    }
    if (
      updatedWrapperWidth &&
      prevUpdatedWrapperWidth !== updatedWrapperWidth
    ) {
      const chartWidth =
        wrapperWidth - mainChartMargins.left - mainChartMargins.right
      xScale = scaleTime().range([0, chartWidth]).domain(xScale.domain())
      prevUpdatedWrapperWidth = wrapperWidth
    }
    if (
      updatedWrapperHeight &&
      prevUpdatedWrapperHeight !== updatedWrapperHeight
    ) {
      const chartHeight =
        wrapperHeight - mainChartMargins.top - mainChartMargins.bottom
      yScale = yScale.range([chartHeight, 0]).domain(yScale.domain())
      prevUpdatedWrapperHeight = wrapperHeight
    }
  })

  $: updatedWrapperWidth = wrapperWidth
  $: updatedWrapperHeight = wrapperHeight
</script>

<div
  class="chart-container"
  bind:clientHeight={wrapperHeight}
  bind:clientWidth={wrapperWidth}
>
  {#if data?.length}
    <svg>
      <MainChartCircles {xScale} {yScale} {sizeScale} {data} />
    </svg>
  {:else if prevData?.length}
    <p>Sorry, no data</p>
  {/if}
</div>

<style lang="scss">
  @import '../../../styles/variables.scss';

  .chart-container {
    grid-area: chart;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }
</style>
