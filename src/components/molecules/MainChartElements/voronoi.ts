import { select } from 'd3-selection'
import { Delaunay } from 'd3-delaunay'
import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'

import hoverStore from '../../../stores/mainChartHover'
import movieStore from '../../../stores/movieStore'

import { mainChartMargins } from '../../../constants/chart'

import type {
  IPersonCastCredits,
  IPersonCrewCastCredits,
  IPersonCrewCredits,
} from '../../../types/person'

interface IParams {
  delaunayArea: SVGGElement
  data: Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
  xScale: ScaleTime<number, number, never>
  yScale: ScaleLinear<number, number, never>
  sizeScale: ScalePower<number, number, never>
  height: number
  width: number
  apiKey: string
}

const enterUpdateExitDelaunay = ({
  delaunayArea,
  data,
  xScale,
  yScale,
  sizeScale,
  height,
  width,
  apiKey,
}: IParams) => {
  const delaunay = Delaunay.from(
    data,
    (d) => xScale(d.unified_date) + mainChartMargins.left,
    (d) => yScale(d.vote_average) + mainChartMargins.top
  ).voronoi([0, 0, width, height])
  const getHoveredData = (
    d: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
  ) => {
    return {
      data: d,
      yPosition: yScale(d.vote_average) + mainChartMargins.top,
      xPosition: xScale(d.unified_date) + mainChartMargins.left,
      radius: sizeScale(d.vote_count),
    }
  }

  select(delaunayArea)
    .selectAll<
      SVGCircleElement,
      IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
    >('.delaunay-path')
    .data(data, (d) => d.id)
    .join(
      (enter) =>
        enter
          .append('path')
          .attr('class', 'delaunay-path')
          .attr('fill', 'transparent')
          .attr('cursor', 'pointer')
          .attr('d', (_, i) => delaunay.renderCell(i))
          .call(addInteractions),
      (update) =>
        update
          .call(addInteractions)
          .attr('d', (_, i) => delaunay.renderCell(i)),
      (exit) => exit.remove()
    )

  function addInteractions(e: any) {
    e.on(
      'mouseover',
      (
        _e: Event,
        d: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
      ) => {
        hoverStore.set({ isHovered: true, hoveredData: getHoveredData(d) })
      }
    )
      .on('mouseout', () =>
        hoverStore.update((s) => ({ ...s, isHovered: false }))
      )
      .on(
        'click',
        (
          _e: Event,
          d: IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
        ) => movieStore.populate(d.id, d.media_type, apiKey)
      )
  }
}

export default enterUpdateExitDelaunay
