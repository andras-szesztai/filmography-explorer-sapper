<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { isEqual } from 'lodash'

  import enterUpdateExitCircles from './circles'

  import { mainChartMargins } from '../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'

  export let data:
    | Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
    | undefined
  export let xScale: ScaleTime<number, number, never>
  let prevXScale = xScale
  export let yScale: ScaleLinear<number, number, never>
  let prevYScale = yScale
  export let sizeScale: ScalePower<number, number, never>
  let prevSizeScale = sizeScale

  let circlesArea: SVGGElement
  let voronoiArea: SVGGElement
  let yGridArea: SVGGElement

  beforeUpdate(() => {
    if (
      data &&
      xScale &&
      (!isEqual(xScale.domain(), prevXScale?.domain()) ||
        !isEqual(xScale.range(), prevXScale?.range()) ||
        !isEqual(yScale.domain(), prevYScale?.domain()) ||
        !isEqual(yScale.range(), prevYScale?.range()) ||
        !isEqual(sizeScale.domain(), prevSizeScale?.domain()))
    ) {
      data.sort((a, b) => b.unified_date.getTime() - a.unified_date.getTime())
      enterUpdateExitCircles({
        circlesArea,
        data,
        xScale,
        yScale,
        sizeScale,
      })
      prevXScale = xScale
      prevYScale = yScale
      prevSizeScale = sizeScale
    }
  })
</script>

<g
  bind:this={circlesArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
<g
  bind:this={voronoiArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
<g
  bind:this={yGridArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
