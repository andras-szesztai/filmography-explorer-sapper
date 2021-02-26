<script lang="ts">
  import { beforeUpdate } from 'svelte'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { select } from 'd3-selection'
  import gsap from 'gsap'
  import chroma from 'chroma-js'

  import { mainChartMargins } from '../../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
  } from '../../../../types/person'
  import { color } from '../../../../styles/variables'

  export let data: (IPersonCrewCredits | IPersonCastCredits)[] | undefined
  export let xScale: ScaleTime<number, number, never>
  export let yScale: ScaleLinear<number, number, never>
  export let sizeScale: ScalePower<number, number, never>

  let chartArea: SVGGElement

  beforeUpdate(() => {
    if (data && xScale?.domain()) {
      console.log(
        '🚀 ~ file: MainChartCircles.svelte ~ line 23 ~ beforeUpdate ~ data',
        data
      )
      const sortedData = data.sort(
        (a, b) => b.unified_date.getTime() - a.unified_date.getTime()
      )
      console.log(
        '🚀 ~ file: MainChartCircles.svelte ~ line 30 ~ beforeUpdate ~ sortedData',
        sortedData
      )
      select<SVGGElement, Array<IPersonCrewCredits | IPersonCastCredits>>(
        chartArea
      )
        .selectAll<SVGCircleElement, IPersonCrewCredits | IPersonCastCredits>(
          'circle'
        )
        .data(data, (d) => d.credit_id)
        .join((enter) =>
          enter
            .append('circle')
            .style('fill', chroma(color.light).alpha(0.4).hex())
            .style('stroke', color.light)
            // .style('stroke-width', 2)
            .style('opacity', 0)
            .attr('r', (d) => sizeScale(d.vote_count))
            .attr('cx', (d) => xScale(d.unified_date))
            .attr('cy', (d) => yScale(d.vote_average))
            .call((enter) => {
              gsap.to(enter.nodes(), {
                opacity: 1,
                duration: 1,
                stagger: {
                  from: 0,
                  axis: 'x',
                  amount: 2,
                  ease: 'power1.in',
                },
              })
            })
        )
      //   (update) =>
      //     update
      //       .attr('fill', 'black')
      //       .attr('y', 0)
      //       .call((update) =>
      //         update.transition(t).attr('x', (d, i) => i * 16)
      //       ),
      //   (exit) =>
      //     exit
      //       .attr('fill', 'brown')
      //       .call((exit) => exit.transition(t).attr('y', 30).remove())
      // )
    }
  })
</script>

<g
  bind:this={chartArea}
  transform="translate({mainChartMargins.left} {mainChartMargins.top})"
/>
