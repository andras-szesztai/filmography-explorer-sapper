<script lang="ts">
  import { afterUpdate } from 'svelte'
  import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
  import { select } from 'd3-selection'
  import gsap from 'gsap'

  import { mainChartMargins } from '../../../../constants/chart'

  import type {
    IPersonCastCredits,
    IPersonCrewCredits,
  } from '../../../../types/person'
  import { random } from 'lodash'

  export let data: (IPersonCrewCredits | IPersonCastCredits)[] | undefined

  let chartArea: SVGGElement

  export let xScale: ScaleTime<number, number, never>
  export let yScale: ScaleLinear<number, number, never>
  export let sizeScale: ScalePower<number, number, never>

  afterUpdate(() => {
    if (data) {
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
            .attr('r', 10)
            .attr('cx', 10)
            .attr('cy', 10)
            .attr('class', 'circle')
            .call((enter, d) => {
              // get individual el
              gsap.to(enter.nodes(), {
                fill: 'green',
                x: random(0, 100),
                y: random(0, 100),
                duration: 1,
                ease: 'power2.inOut',
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
