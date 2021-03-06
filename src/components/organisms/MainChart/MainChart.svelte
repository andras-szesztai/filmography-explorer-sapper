<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { isEqual, isUndefined } from 'lodash'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { scaleTime, scaleLinear, scaleSqrt } from 'd3-scale'
  import { extent } from 'd3-array'

  import { TooltipRight } from '../../atoms/tooltips'
  import { MovieDetailsOnHover } from '../../atoms/tooltipContents'
  import { MainChartElements } from '../../molecules'

  import hoverStore from '../../../stores/mainChartHover'

  import { mainChartMargins } from '../../../constants/chart'

  // TODO: fix after movie select, does not populate only on window update
  import type {
    IPersonCastCredits,
    IPersonCrewCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'

  export let data:
    | Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
    | undefined
  export let selectedMovie: number
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
      data?.length &&
      updatedWrapperWidth &&
      prevUpdatedWrapperWidth !== updatedWrapperWidth
    ) {
      const chartWidth =
        wrapperWidth - mainChartMargins.left - mainChartMargins.right
      xScale = scaleTime().range([0, chartWidth]).domain(xScale.domain())
      prevUpdatedWrapperWidth = wrapperWidth
    }
    if (
      data?.length &&
      updatedWrapperHeight &&
      prevUpdatedWrapperHeight !== updatedWrapperHeight
    ) {
      const chartHeight =
        wrapperHeight - mainChartMargins.top - mainChartMargins.bottom
      yScale = scaleLinear().range([chartHeight, 0]).domain(yScale?.domain())
      prevUpdatedWrapperHeight = wrapperHeight
    }
  })

  $: hoveredStore = $hoverStore
  $: hoveredData = hoveredStore.hoveredData

  $: updatedWrapperWidth = wrapperWidth
  $: updatedWrapperHeight = wrapperHeight
</script>

<div
  class="chart-container"
  bind:clientHeight={wrapperHeight}
  bind:clientWidth={wrapperWidth}
>
  {#if hoveredStore.isHovered && hoveredData}
    <div
      class="tooltip-container"
      style="top: {hoveredData.yPosition -
        hoveredData.radius}px; left: {hoveredData.xPosition -
        hoveredData.radius}px; width: {hoveredData.radius *
        2}px; height: {hoveredData.radius * 2}px;"
    >
      <TooltipRight isParentHovered={hoveredStore.isHovered}>
        <div slot="content">
          <MovieDetailsOnHover data={hoveredData.data} />
        </div>
      </TooltipRight>
    </div>
  {/if}
  <div />
  {#if data?.length}
    <svg>
      <MainChartElements
        {xScale}
        {yScale}
        {sizeScale}
        {data}
        {selectedMovie}
        width={wrapperWidth}
        height={wrapperHeight}
      />
    </svg>
  {:else if !isUndefined(data)}
    <p class="no-data">Sorry, no data available</p>
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
    z-index: 1;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .tooltip-container {
    position: absolute;
    pointer-events: none;
  }

  .no-data {
    color: $colorLight;
  }
</style>
