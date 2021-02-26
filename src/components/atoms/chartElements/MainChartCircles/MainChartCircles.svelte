<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { select } from 'd3-selection'
  import gsap from 'gsap'
  import chroma from 'chroma-js'
  import { isEqual } from 'lodash'

  import { mainChartMargins } from '../../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCastCredits,
    IPersonCrewCredits,
  } from '../../../../types/person'

  import { color, durationInSeconds } from '../../../../styles/variables'

  export let data:
    | Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
    | undefined
  export let xScale: ScaleTime<number, number, never>
  let prevXScale = xScale
  export let yScale: ScaleLinear<number, number, never>
  export let sizeScale: ScalePower<number, number, never>

  let chartArea: SVGGElement

  beforeUpdate(() => {
    if (
      data &&
      xScale?.domain() &&
      !isEqual(xScale.domain(), prevXScale?.domain())
    ) {
      data.sort((a, b) => b.unified_date.getTime() - a.unified_date.getTime())
      select<SVGGElement, Array<IPersonCrewCredits | IPersonCastCredits>>(
        chartArea
      )
        .selectAll<SVGCircleElement, IPersonCrewCredits | IPersonCastCredits>(
          'circle'
        )
        .data(data, (d) => d.credit_id)
        .join(
          (enter) =>
            enter
              .append('circle')
              .style('fill', chroma(color.light).alpha(0.3).hex())
              .style('stroke', color.light)
              .style('opacity', 0)
              .attr('r', (d) => sizeScale(d.vote_count))
              .attr('cx', (d) => xScale(d.unified_date))
              .attr('cy', (d) => yScale(d.vote_average))
              .call((enter) => {
                gsap.to(enter.nodes(), {
                  opacity: 1,
                  duration: durationInSeconds.lg,
                  stagger: {
                    from: 0,
                    axis: 'x',
                    amount: durationInSeconds.xxl,
                    ease: 'power2.out',
                  },
                })
              }),
          (update) => update,
          (exit) =>
            exit.call((exit) => {
              gsap.to(exit.nodes(), {
                opacity: 0,
                duration: durationInSeconds.lg,
                stagger: {
                  from: 0,
                  axis: 'x',
                  amount: durationInSeconds.xxl,
                  ease: 'power2.in',
                },
              })
            })
        )
      prevXScale = xScale
    }
  })
</script>

<g
  bind:this={chartArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
