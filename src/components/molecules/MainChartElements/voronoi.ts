import { select } from 'd3-selection'
import { Delaunay } from 'd3-delaunay'
import type { ScaleTime, ScaleLinear } from 'd3-scale'

import hoverStore from '../../../stores/mainChartHover'

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
  height: number
  width: number
}

const enterUpdateExitDelaunay = ({
  delaunayArea,
  data,
  xScale,
  yScale,
  height,
  width,
}: IParams) => {
  const delaunay = Delaunay.from(
    data,
    (d) => xScale(d.unified_date) + mainChartMargins.left,
    (d) => yScale(d.vote_average) + mainChartMargins.top
  ).voronoi([0, 0, width, height])

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
          // .attr('stroke', 'red')
          // .attr('cursor', (d) =>
          //   activeMovieID === d.id ? 'default' : 'pointer'
          // )
          .attr('d', (_, i) => delaunay.renderCell(i))
          .call((e) => e),
      (update) => update.attr('d', (_, i) => delaunay.renderCell(i)),
      (exit) => exit.remove()
    )
}

// function addUpdateInteractions() {
//   const { voronoiArea, xScale } = storedValues.current
//   const populateHoveredFunc = isBookmarkChart ? populateBookmarkedHoveredMovie : populateHoveredMovie
//   const emptyHoveredFunc = isBookmarkChart ? emptyBookmarkedHoveredMovie : emptyHoveredMovie
//   const setActiveMovieIDFunc = isBookmarkChart ? setBookmarkedActiveMovieID : setActiveMovieID
//   voronoiArea
//     .selectAll('.voronoi-path')
//     .on('mouseover', (d: any) => {
//       const hovered = {
//         id: d.id as number,
//         data: d as MovieObject,
//         yPosition: props.tooltipYPosition,
//         xPosition: getXPosition({
//           data: d,
//           left: margin.left,
//           width,
//           xScale
//         })
//       }
//       if (!props.isFirstEntered) {
//         dispatch(populateHoveredFunc(hovered))
//       }
//       if (props.isFirstEntered) {
//         timeOut.current = setTimeout(() => {
//           props.setIsFirstEntered(false)
//           dispatch(populateHoveredFunc(hovered))
//         }, duration.md)
//       }
//     })
//     .on('mouseout', () => {
//       clearTimeout(timeOut.current)
//       if (hoveredMovieID) {
//         dispatch(emptyHoveredFunc())
//       }
//     })
//     .on('click', (d: any) => {
//       if (activeMovieID !== d.id) {
//         dispatch(
//           setActiveMovieIDFunc({
//             id: d.id,
//             position: getXPosition({
//               data: d,
//               left: margin.left,
//               width,
//               xScale
//             }),
//             mediaType: d.media_type
//           })
//         )
//         clearTimeout(timeOut.current)
//         props.setIsFirstEntered(true)
//       }
//     })
// }

export default enterUpdateExitDelaunay
