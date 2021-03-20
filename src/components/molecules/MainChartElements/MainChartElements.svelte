<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import { stores } from '@sapper/app'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { isEqual } from 'lodash'

  import enterUpdateExitCircles from './circles'
  import enterUpdateExitDelaunay from './voronoi'
  import enterUpdateExitGridLines from './gridLines'

  import { mainChartMargins } from '../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCastCredits,
    IPersonCrewCredits,
  } from '../../../types/person'
  import enterUpdateExitXAxis from './xAxis'

  export let data:
    | Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
    | undefined
  export let width: number
  export let height: number
  export let xScale: ScaleTime<number, number, never>
  let prevXScale = xScale
  export let yScale: ScaleLinear<number, number, never>
  let prevYScale = yScale
  export let sizeScale: ScalePower<number, number, never>
  let prevSizeScale = sizeScale

  const { session } = stores()
  const apiKey = $session.MOVIE_DB_API_KEY

  let circlesArea: SVGGElement
  let delaunayArea: SVGGElement
  let yGridArea: SVGGElement
  let xAxisArea: SVGGElement

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
      enterUpdateExitDelaunay({
        delaunayArea,
        data,
        xScale,
        yScale,
        sizeScale,
        height,
        width,
        apiKey,
      })
      enterUpdateExitGridLines({
        yGridArea,
        yScale,
        width,
      })
      enterUpdateExitGridLines({
        yGridArea,
        yScale,
        width,
      })
      enterUpdateExitXAxis({
        xAxisArea,
        xScale,
      })
      prevXScale = xScale
      prevYScale = yScale
      prevSizeScale = sizeScale
    }
  })
</script>

<g bind:this={yGridArea} transform="translate(0 {mainChartMargins.top})" />
{#if height}
  <g
    bind:this={xAxisArea}
    transform="translate({mainChartMargins.left}  {height -
      mainChartMargins.top / 2})"
  />
{/if}
<g
  bind:this={circlesArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
<g bind:this={delaunayArea} />
