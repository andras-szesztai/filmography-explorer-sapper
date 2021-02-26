import { select } from 'd3-selection'
import type { ScaleTime, ScaleLinear, ScalePower } from 'd3-scale'
import gsap from 'gsap'
import chroma from 'chroma-js'
import type {
  IPersonCastCredits,
  IPersonCrewCastCredits,
  IPersonCrewCredits,
} from '../../../types/person'
import { color, durationInSeconds } from '../../../styles/variables'

interface IParams {
  circlesArea: SVGGElement
  data: Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
  xScale: ScaleTime<number, number, never>
  yScale: ScaleLinear<number, number, never>
  sizeScale: ScalePower<number, number, never>
}

const enterUpdateExitCircles = ({
  circlesArea,
  data,
  xScale,
  yScale,
  sizeScale,
}: IParams) => {
  select<
    SVGGElement,
    Array<IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits>
  >(circlesArea)
    .selectAll<
      SVGCircleElement,
      IPersonCrewCredits | IPersonCastCredits | IPersonCrewCastCredits
    >('circle')
    .data(data, (d) => d.id)
    .join(
      (enter) =>
        enter
          .append('circle')
          .style('fill', chroma(color.light).alpha(0.25).hex())
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
      (update) =>
        update.each((d, i, n) => {
          const el = select(n[i])
          gsap.to(n[i], {
            x: xScale(d.unified_date) - +el.attr('cx'),
            y: yScale(d.vote_average) - +el.attr('cy'),
            duration: durationInSeconds.lg,
            ease: 'power2.inOut',
          })
        }),
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
}

export default enterUpdateExitCircles
