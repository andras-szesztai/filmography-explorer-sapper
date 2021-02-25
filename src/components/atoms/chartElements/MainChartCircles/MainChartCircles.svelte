<script lang="ts">
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'

  import { mainChartMargins } from '../../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
  } from '../../../../types/person'

  export let data: (IPersonCrewCredits | IPersonCastCredits)[] | undefined

  let chartArea: SVGGElement

  export let xScale: ScaleTime<number, number, never>
  export let yScale: ScaleLinear<number, number, never>
  export let sizeScale: ScalePower<number, number, never>
</script>

<g
  bind:this={chartArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
