import { select } from 'd3-selection'
import chroma from 'chroma-js'
import type { ScaleLinear } from 'd3-scale'
import { axisRight } from 'd3-axis'
import { Transition } from 'd3-transition'

import {
  color,
  durationInMilliseconds,
  opacity,
} from '../../../styles/variables'

interface IParams {
  yGridArea: SVGGElement
  yScale: ScaleLinear<number, number, never>
  width: number
}

const enterUpdateExitGridLines = ({ yGridArea, yScale, width }: IParams) => {
  select<SVGGElement, unknown>(yGridArea)
    .call(axisRight(yScale).ticks(4).tickSize(width))
    .call((g) => {
      g.select('.domain').remove()
      g.selectAll('line')
        .attr('stroke', chroma(color.light).alpha(opacity.low).hex())
        .attr('opacity', 0)
        .transition()
        .duration(durationInMilliseconds.lg)
        .attr('opacity', 1)
      g.selectAll('text')
        .attr('dx', -16)
        .attr('dy', -8)
        .attr('fill', chroma(color.light).alpha(opacity.midLow).hex())
        .attr('font-size', 14)
        .attr('opacity', 0)
        .transition()
        .duration(durationInMilliseconds.lg)
        .attr('opacity', 1)
    })
}

export default enterUpdateExitGridLines
