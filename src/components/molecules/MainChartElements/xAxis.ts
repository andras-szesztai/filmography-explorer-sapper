import { select } from 'd3-selection'
import chroma from 'chroma-js'
import type { ScaleTime } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { Transition } from 'd3-transition'

import {
  color,
  durationInMilliseconds,
  opacity,
} from '../../../styles/variables'

interface IParams {
  xAxisArea: SVGGElement
  xScale: ScaleTime<number, number, never>
}

const enterUpdateExitXAxis = ({ xAxisArea, xScale }: IParams) => {
  select<SVGGElement, unknown>(xAxisArea)
    .call(axisBottom(xScale).ticks(5).tickSize(0))
    .call((g) => {
      g.select('.domain').remove()
      g.selectAll('line')
        .attr('stroke', chroma(color.light).alpha(opacity.low).hex())
        .attr('opacity', 0)
        .transition()
        .duration(durationInMilliseconds.lg)
        .attr('opacity', 1)
      g.selectAll('text')
        .attr('fill', chroma(color.light).alpha(opacity.midLow).hex())
        .attr('font-size', 14)
        .attr('opacity', 0)
        .transition()
        .duration(durationInMilliseconds.lg)
        .attr('opacity', 1)
    })
}

export default enterUpdateExitXAxis
